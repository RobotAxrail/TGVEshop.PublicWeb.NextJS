import {
  useContext,
  useEffect,
  useReducer,
  useState,
  useCallback,
} from "react";
import CollectionsMenu from "@/components/collections-menu/CollectionsMenu";
import { useDebounce } from "@/hooks/useDebounce";
import MerchantContext from "@/contexts/MerchantContext";
import { getCollections, getProductDetails } from "@/graphql/queries";
import { API, graphqlOperation, withSSRContext } from "aws-amplify";
import SEO from "@/components/seo/SEO";
import _ from "lodash";
import { useCart } from "@/contexts/CartContext";
import { useOrder } from "@/contexts/OrderContext";
import axios from "axios";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { fetchCollections } from "@/apis/getCollections";
import { isLocalHost } from "@/utils/util";
import { useProductModifiers } from "@/hooks/useProductModifiers";

const CollectionsMenuScreen = () => {
  const merchantInfoContext = useContext(MerchantContext);
  const { addItemCartList, cartList } = useCart();
  const { orderType } = useOrder();
  const [collectionMenuItemList, setCollectionMenuItemList] = useState([]);
  const [totalCollectionMenuItemList, setTotalCollectionMenuList] = useState(0);

  const [collectionsIsLoading, setCollectionsIsLoading] = useState(false);
  const [searchedCollectionMenuItemList, setSearchedCollectionMenuItemList] =
    useState([]);
  const [collectionMenuList, setCollectionMenuList] = useState([]);

  const [productDetailStatus, setProductDetailStatus] = useState("none");
  const [addToCartIsLoading, setAddToCartIsLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [currentCartId, setCurrentCartId] = useState(null);
  const LIMIT = 20;

  const INITIAL_COLLECTIONS_MENU_STATE = {
    homeCollectionId: "",
    title: "",
    nextToken: 0,
    searchKeyword: "",
  };

  const collectionsMenuReducer = (state, action) => {
    switch (action.type) {
      case "select":
        return {
          ...INITIAL_COLLECTIONS_MENU_STATE,
          homeCollectionId: action.homeCollectionId,
          title: action.title,
          initial: action?.initial ?? false,
        };
      case "paginate collection":
        return {
          ...state,
          nextToken: state.nextToken + LIMIT,
          searchKeyword: "",
          action: "",
          initial: false,
        };
      case "paginate search":
        return {
          ...state,
          nextToken: state.nextToken + LIMIT,
          action: "search",
          initial: false,
        };
      case "search":
        return {
          ...state,
          nextToken: 0,
          searchKeyword: action.searchKeyword,
          action: "search",
          initial: false,
        };
      default:
        throw new Error();
    }
  };

  const [collectionsMenuState, dispatchCollectionsMenuState] = useReducer(
    collectionsMenuReducer,
    INITIAL_COLLECTIONS_MENU_STATE
  );

  const [selectedProductSeoUrl, setSelectedProductSeoUrl] = useState("");
  const [selectedProductDetail, setSelectedProductDetail] = useState("");
  const sortField = {
    field: "updatedAt",
    direction: "desc",
  };
  const [productModifierModalState, setProductModifierModalState] = useState({
    visible: false,
    seoUrl: "",
  });

  const { handleUpdateProductModifierSelectionInCustomerCart } =
    useProductModifiers();

  const debouncedSearchKeyword = useDebounce(
    collectionsMenuState.searchKeyword,
    800
  );
  const enabledStatus = () => {
    if (collectionsMenuState?.initial) {
      return false;
    }
    if (collectionsMenuState?.action !== "search") {
      return true;
    } else {
      return debouncedSearchKeyword === collectionsMenuState?.searchKeyword;
    }
  };

  const { data, fetchStatus } = useQuery(
    ["fetchCollections", { collectionsMenuState: collectionsMenuState }],
    () =>
      fetchCollections(
        LIMIT,
        collectionsMenuState,
        sortField,
        merchantInfoContext.merchantId,
        merchantInfoContext.storeId
      ),
    {
      refetchOnWindowFocus: false,
      enabled: enabledStatus(),
      onSuccess: (data) => {
        if (!collectionsMenuState.homeCollectionId) {
          setCollectionMenuList(data.collections);
          dispatchCollectionsMenuState({
            type: "select",
            homeCollectionId: data.collections?.[0].homeCollectionId,
            title: data.collections?.[0].title,
            initial: true,
          });
        }
        if (collectionsMenuState?.nextToken > 0) {
          setCollectionMenuItemList((prevList) => [
            ...prevList,
            ...data?.selectedCollectionsItems.products,
          ]);
        } else {
          setCollectionMenuItemList(
            () => data?.selectedCollectionsItems.products
          );
        }
        setTotalCollectionMenuList(data?.selectedCollectionsItems.total);
      },
    }
  );

  const fetchProductDetails = async () => {
    try {
      setProductDetailStatus("loading");
      let params = {
        seoUrl: productModifierModalState.seoUrl,
        storeId: merchantInfoContext.storeId,
      };
      if (isLocalHost()) {
        params["merchantId"] = merchantInfoContext.merchantId;
      }
      const res = await API.graphql(
        graphqlOperation(getProductDetails, params)
      );
      if (res.data.getProductDetails.status === "true") {
        setSelectedProductDetail(res.data.getProductDetails);
        setProductDetailStatus("loaded");
      } else {
        setProductDetailStatus("error");
      }
    } catch (error) {
      setProductDetailStatus("error");
    }
  };

  async function handleAddItemToCart(quantity, selectedModifierGroups = []) {
    setAddToCartIsLoading(true);

    if (isInCart) {
      const res = await handleUpdateProductModifierSelectionInCustomerCart(
        currentCartId,
        quantity,
        selectedModifierGroups
      );
      setAddToCartIsLoading(false);
      return res;
    }

    const response = await addItemCartList(
      selectedProductDetail.productUOMs[0].productUOMId,
      quantity,
      "ProductUOM",
      orderType,
      selectedModifierGroups
    );

    setAddToCartIsLoading(false);
    return response;
  }

  async function findInCart(selectedModifierGroups) {
    const cartCanditate = cartList?.filter((item) => {
      if (selectedProductDetail?.productUOMs?.length)
        return (
          item.itemId === selectedProductDetail?.productUOMs[0]?.productUOMId
        );

      return false;
    });

    if (cartCanditate?.length > 0) {
      if (!selectedModifierGroups?.length) {
        setCurrentCartId(cartList[0].customerCartId);
        return true;
      }

      // all available modifiers
      const productModifierArray = selectedProductDetail.modifierGroups;

      const match = cartCanditate?.find((cart) => {
        // cartItems, with modifiers sorted
        const cartArray = cart?.selectedModifierGroups?.map((item) => {
          const sortedModifiers = _.sortBy(item.modifier, "modifierId");
          return {
            ...item,
            modifier: sortedModifiers,
          };
        });

        // Sorted modifiers array based on a unique identifier in each map
        const sortedCartModifiers = _.sortBy(cartArray, "modifierGroupId");
        const sortedProductModifiers = _.sortBy(
          productModifierArray,
          "modifierGroupId"
        );
        const selectionModifiers = _.sortBy(
          selectedModifierGroups,
          "modifierGroupId"
        );

        const processedModifiers = sortedProductModifiers.map((item, index) => {
          const selectedModifiers = selectionModifiers[index]?.modifier;
          const remark = selectionModifiers[index]?.requestRemark;

          const newArr = item.modifier.map((ele, arrIndex) => {
            return {
              ...ele,
              isSelected:
                selectionModifiers[index]?.inputType === "radio"
                  ? selectionModifiers[index]?.radioChecked === ele.modifierId
                  : selectedModifiers[arrIndex]?.isSelected || false,
            };
          });

          const processedModifierItems = _.sortBy(newArr, "modifierId");

          return {
            ...item,
            requestRemark: remark,
            modifier: processedModifierItems,
            isSelected:
              item.modifierGroupType === "text"
                ? null
                : processedModifierItems.some((e) => e.isSelected),
          };
        });

        if (_.isEqual(processedModifiers, sortedCartModifiers)) {
          setCurrentCartId(cart.customerCartId);
          return true;
        }

        return false;
      });

      return match;
    }

    setCurrentCartId(null);
    return false;
  }

  useEffect(() => {
    if (productModifierModalState.visible) {
      fetchProductDetails();
    }
  }, [productModifierModalState]);

  //set overflow hidden to body and html, overflow visible when component unmounts
  useEffect(() => {
    const docStyle = document.documentElement.style;
    docStyle.setProperty("--app-overflow", "hidden");

    return () => {
      docStyle.setProperty("--app-overflow", "visible");
    };
  }, []);

  return (
    <>
      <SEO title="Menu" keywords="" description="Menu" />
      <CollectionsMenu
        collectionMenuItemList={collectionMenuItemList}
        totalCollectionMenuItemList={totalCollectionMenuItemList}
        searchedCollectionMenuItemList={searchedCollectionMenuItemList}
        sideBarMenuList={collectionMenuList}
        collectionsMenuState={collectionsMenuState}
        dispatchCollectionsMenuState={dispatchCollectionsMenuState}
        limit={LIMIT}
        handleAddItemToCart={handleAddItemToCart}
        addToCartIsLoading={addToCartIsLoading}
        productModifierModalState={productModifierModalState}
        setProductModifierModalState={setProductModifierModalState}
        selectedProductDetail={selectedProductDetail}
        setSelectedProductDetail={setSelectedProductDetail}
        productDetailStatus={productDetailStatus}
        setProductDetailStatus={setProductDetailStatus}
        collectionsIsLoading={fetchStatus === "fetching"}
        currentCartId={currentCartId}
        findInCart={findInCart}
        isInCart={isInCart}
        setIsInCart={setIsInCart}
      />
    </>
  );
};

export default CollectionsMenuScreen;
