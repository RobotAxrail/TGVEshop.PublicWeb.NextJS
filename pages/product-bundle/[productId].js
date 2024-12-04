import { useState, useContext, useEffect } from "react";
import dynamic from "next/dynamic";
import SEO from "@/components/seo/SEO";
import { Loader } from "@/components/loader/Loader";
import Custom404 from "../404";

//API
import { API, graphqlOperation, withSSRContext } from "aws-amplify";
import {
  getProductBundleDetails,
  listSimilarItems,
  listItemReviews,
} from "@/graphql/queries";
import { getMerchantData } from "../../apis/merchant";

//Content
import { useCart } from "@/contexts/CartContext";
import MerchantContext from "@/contexts/MerchantContext";

// components
const ProductDetail = dynamic(() =>
  import("@/components/productDetail/ProductDetail")
);

// states
import { setToastState } from "@/states/toastBarState";
// hooks
import { generateAdwordPayload } from "@/apis/anaytics";
import { getRecommendations } from "@/apis/recommendations";

//constants
import { StoreTypes } from "@/enums/enums";

// utils
import { totalPagination, getDomainForSSR, isLocalHost } from "@/utils/util";
import { useOrder } from "@/contexts/OrderContext";
import useMultiStoreDelivery from "@/components/AxrailCommerce/MultiStoreDeliverySelector/hooks/useMultiStoreDelivery";
import useSWR from "swr";
import { useRouter } from "next/router";

function ProductBundleScreen(props) {
  const merchantInfoContext = useContext(MerchantContext);
  const { orderType } = useOrder();
  const { deliveryMode } = useMultiStoreDelivery();
  const { recommendationsList } = getRecommendations(
    merchantInfoContext.merchantId,
    merchantInfoContext.storeId,
    merchantInfoContext.storeType === StoreTypes.MULTISTORE_STORETYPE
      ? deliveryMode
      : orderType === "Delivery"
      ? "delivery"
      : "pickup"
  );
  const { addItemCartList, cartList } = useCart();
  const [selectedProductUOMObject, setSelectedProductUOMObject] = useState({});
  const [cartIsLoading, setCartIsLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  // review rating state
  const [averageReviewRating, setAverageReviewRating] = useState(0);
  const [currentReviewList, setCurrentReviewList] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);
  const LIMIT = 10;
  const TOTAL_PAGES = totalPagination(totalReviews, LIMIT);
  const INIT_NEXT_TOKEN = 0;

  const router = useRouter();
  const routerData = router.query;
  // fetch bundle details
  const productBundleDetailFetcher = async () => {
    try {
      let params = {
        domain: merchantInfoContext.domain,
        merchantId: merchantInfoContext.merchantId,
        orderType: "",
        seoUrl: "product-bundle/" + routerData.productId,
        storeId: merchantInfoContext.storeId,
      };
      if (merchantInfoContext.storeType === StoreTypes.MULTISTORE_STORETYPE) {
        params["orderType"] = deliveryMode;
      } else if (merchantInfoContext.storeType === StoreTypes.AC_STORETYPE) {
        params["orderType"] = orderType === "Delivery" ? "delivery" : "pickup";
      } else if (merchantInfoContext.storeType === StoreTypes.B2B_STORETYPE) {
        params["orderType"] = "delivery";
      }
      if (isLocalHost()) {
        params["merchantId"] = merchantInfoContext.merchantId;
      }
      const { data } = await API.graphql(
        graphqlOperation(getProductBundleDetails, params)
      );
      console.log(data)
      if (
        data.getProductBundleDetails.status === "false" ||
        !Boolean(data.getProductBundleDetails.productBundlePricing[0])
      ) {
        return { notFound: true }; //product not found
      }
      generateAdwordPayload(
        "/product-bundle",
        selectedProductUOMObject.productBundleId,
        merchantInfoContext.merchantId
      );
      if (
        data.getProductBundleDetails.totalRatings &&
        data.getProductBundleDetails.totalReviews
      ) {
        let averageRating =
          data.getProductBundleDetails.totalRatings /
          data.getProductBundleDetails.totalReviews;
        setAverageReviewRating(averageRating);
      }
      setSelectedProductUOMObject(data.getProductBundleDetails);
      return data.getProductBundleDetails;
    } catch (error) {
      console.log(error);
    }
  };

  const { data: productBundleDetail, isValidating } = useSWR(
    "getProductBundleDetails",
    productBundleDetailFetcher
  );

  // fetch similar items
  const similarItemFetcher = async () => {
    let similarItemsPayload = {
      domain: merchantInfoContext.domain,
      seoUrl: "product-bundle/" + routerData.productId,
      itemProperty: "productbundle",
      storeId: merchantInfoContext.storeId,
      orderType:
        merchantInfoContext.storeType === StoreTypes.MULTISTORE_STORETYPE
          ? deliveryMode
          : orderType === "Delivery"
          ? "delivery"
          : "pickup",
    };
    if (isLocalHost()) {
      similarItemsPayload["merchantId"] = merchantInfoContext.merchantId;
    }
    const { data } = await API.graphql(
      graphqlOperation(listSimilarItems, similarItemsPayload)
    );

    const status = data?.listSimilarItems.status;
    if (status === "true") {
      return data.listSimilarItems?.items ?? [];
    } else if (status === "false") {
      return [];
    }
  };

  const { data: similarItemsList } = useSWR(
    "listSimilarItems",
    similarItemFetcher
  );

  const checkIsItemExceedQuantityForSales = (
    itemId,
    quantityToAdd,
    quantityForSales
  ) => {
    const itemIndexToAddInCart = cartList.findIndex(
      (cartItem) => cartItem.itemId === itemId
    );

    const generateResponseObject = (status, availableQuantity = 0) => {
      return {
        isExceed: status,
        message: status
          ? `The selected quantity exceeded the available stock 
            quantity of item, available quantity : ${
              availableQuantity >= 0 ? availableQuantity : 0
            }`
          : "",
      };
    };

    //if item to add to cart is already existed in cart
    if (itemIndexToAddInCart >= 0) {
      return quantityToAdd + cartList[itemIndexToAddInCart].quantity >
        quantityForSales
        ? generateResponseObject(
            true,
            quantityForSales - cartList[itemIndexToAddInCart].quantity
          )
        : generateResponseObject(false);
    } else {
      return quantityToAdd > quantityForSales
        ? generateResponseObject(true, quantityForSales)
        : generateResponseObject(false);
    }
  };

  //add to cart API call
  async function handleStoreAddCartData(quantity) {
    setCartIsLoading(true);

    const checkItemExceedQuantityForSalesRes =
      await checkIsItemExceedQuantityForSales(
        selectedProductUOMObject.productBundleId,
        quantity,
        selectedProductUOMObject.quantityForSales
      );

    if (checkItemExceedQuantityForSalesRes.isExceed) {
      setToastState({
        show: true,
        severity: "error",
        message: checkItemExceedQuantityForSalesRes.message,
      });
      setCartIsLoading(false);
      return false;
    }

    const itemIsInCart =
      cartList?.findIndex(
        (item) => item.itemId === selectedProductUOMObject?.productBundleId
      ) !== -1;
    const existingCartId = cartList?.find(
      (item) => item.itemId === selectedProductUOMObject?.productBundleId
    )?.customerCartId;

    if (itemIsInCart) {
      const res = await updateItemQtyCartList(
        existingCartId,
        quantity,
        "detail"
      );
      setCartIsLoading(false);
      return {
        status: res,
        customerCartId: existingCartId,
        message: "Successfully updated cart",
      };
    }

    const response = await addItemCartList(
      selectedProductUOMObject.productBundleId,
      quantity,
      "ProductBundle",
      orderType,
      []
    );
    if (response.status) setIsInCart(true);

    setCartIsLoading(false);
    return response;
  }

  // fetch listItemReviews
  const fetchListItemReviews = async (nextToken = INIT_NEXT_TOKEN) => {
    try {
      const { productBundleId } = await productBundleDetailFetcher;
      let params = {
        itemId: productBundleId,
        itemProperty: "ProductBundle",
        limit: LIMIT,
        nextToken: nextToken,
      };
      if (isLocalHost()) params["merchantId"] = merchantInfoContext.merchantId;
      const { data } = await API.graphql(
        graphqlOperation(listItemReviews, params)
      );
      setCurrentReviewList(data.listItemReviews.items);
      setTotalReviews(data.listItemReviews.total);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchListItemReviews((selectedPage - 1) * LIMIT);
  }, [selectedPage]);

  return (
    <>
      <SEO
        title={routerData.productId}
        keywords=""
        description="product bundle"
      />
      {productBundleDetail?.notFound ? (
        <Custom404 showButton={true} />
      ) : !productBundleDetail || isValidating ? (
        <Loader divhHeight="h-screen" />
      ) : (
        <ProductDetail
          currentPath="product-bundle"
          handleStoreAddCartData={handleStoreAddCartData}
          productImage={productBundleDetail?.image}
          productDetail={productBundleDetail}
          selectedProductUOMObject={productBundleDetail}
          cartIsLoading={cartIsLoading}
          setCartIsLoading={setCartIsLoading}
          recommendationsList={recommendationsList}
          similarItemsList={similarItemsList}
          averageReviewRating={averageReviewRating}
          currentUrl={"product-bundle/" + routerData.productId}
          currentReviewList={currentReviewList}
          totalReviews={totalReviews}
          totalReviewPages={TOTAL_PAGES}
          nextToken={INIT_NEXT_TOKEN}
          limit={LIMIT}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          cartList={cartList}
          isInCart={isInCart}
          setIsInCart={setIsInCart}
        />
      )}
    </>
  );
}

export default ProductBundleScreen;
