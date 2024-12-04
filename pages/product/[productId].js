import { useState, useContext, useEffect } from "react";
import dynamic from "next/dynamic";
import { getContactUsInfo } from "@/graphql/queries";
import useTranslation from "next-translate/useTranslation";
import { Loader } from "@/components/loader/Loader";
import useMultiStoreDelivery from "@/components/AxrailCommerce/MultiStoreDeliverySelector/hooks/useMultiStoreDelivery";
import { StoreTypes } from "@/enums/enums";

//API
import { API, graphqlOperation, withSSRContext } from "aws-amplify";
import {
  getProductDetails,
  listSimilarItems,
  listItemReviews,
} from "@/graphql/queries";
import { getMerchantData } from "../../apis/merchant";

//Content
import { useCart } from "@/contexts/CartContext";
import MerchantContext from "@/contexts/MerchantContext";
import ProductDetails from "@/components/productDetail/ProductDetails";
// components
// const ProductDetail = dynamic(() =>
//   import("@/components/productDetail/ProductDetail")
// );
import SEO from "@/components/seo/SEO";
// states
import { setToastState } from "@/states/toastBarState";
// hooks
import { generateAdwordPayload } from "@/apis/anaytics";
import { getRecommendations } from "@/apis/recommendations";
import { FaArrowLeft } from "react-icons/fa";

// utils
import {
  totalPagination,
  getDomainForSSR,
  isLocalHost,
  isQLEggs,
} from "@/utils/util";
import { useOrder } from "@/contexts/OrderContext";
import useSWR from "swr";
import { useRouter } from "next/router";
function ProductDetailScreen(props) {
  const merchantInfoContext = useContext(MerchantContext);

  const { addItemCartList, cartList } = useCart();
  const { orderType } = useOrder();
  const IS_QL_EGGS = Boolean(isQLEggs(merchantInfoContext.domain));
  const { deliveryMode } = useMultiStoreDelivery();
  const { t } = useTranslation("common");
  // fetch product details
  const productDetailFetcher = async () => {
    let params = {
      seoUrl: `product/${routerData.productId}`,
      storeId: merchantInfoContext.storeId,
      domain: merchantInfoContext.domain,
    };
    if (merchantInfoContext.storeType === StoreTypes.MULTISTORE_STORETYPE) {
      params["orderType"] = deliveryMode;
    } else if (merchantInfoContext.storeType === StoreTypes.AC_STORETYPE) {
      params["orderType"] = orderType === "Delivery" ? "delivery" : "pickup";
    }
    if (isLocalHost()) {
      params["merchantId"] = merchantInfoContext.merchantId;
    }
    const { data } = await API.graphql(
      graphqlOperation(getProductDetails, params)
    );

    if (data.getProductDetails.status === "false") {
      setNotFound(true);
      return { notFound: true }; //product not found
    }

    const itemData = data.getProductDetails;

    setItemId(itemData.productUOMs[0].productId);

    const variantMapping = () => {
      let tempVariants = [];

      if (!!itemData.variantName1 && !!itemData.variantValues1) {
        tempVariants.push({
          name: itemData.variantName1,
          values: itemData.variantValues1,
        });
      }
      if (!!itemData.variantName2 && !!itemData.variantValues2) {
        tempVariants.push({
          name: itemData.variantName2,
          values: itemData.variantValues2,
        });
      }
      if (!!itemData.variantName3 && !!itemData.variantValues3) {
        tempVariants.push({
          name: itemData.variantName3,
          values: itemData.variantValues3,
        });
      }
      return tempVariants;
    };

    const variants = variantMapping();

    const mediaMapping = () => {
      let tempMedia = [];

      const vid = itemData.video;

      if (itemData) {
        if (itemData.cover) {
          tempMedia.push(itemData.cover);
        }
        if (itemData.video !== "") {
          tempMedia.push({ isVideo: true, vid });
        }
        if (itemData.image) {
          itemData.image.forEach((item) => tempMedia.push(item));
        }
      }
      return tempMedia;
    };
    const productImage = mediaMapping();

    var tempListOosVariantCombination = [];

    if (variants.length > 0) {
      // check oos variant combination
      itemData.productUOMs.forEach((item) => {
        if (item.quantityForSales === 0) {
          let tempObjVariantCombination = {};
          if (!!item.variantName1 && !!item.variantValue1) {
            tempObjVariantCombination[item.variantName1] = item.variantValue1;
          }
          if (!!item.variantName2 && !!item.variantValue2) {
            tempObjVariantCombination[item.variantName2] = item.variantValue2;
          }
          if (!!item.variantName3 && !!item.variantValue3) {
            tempObjVariantCombination[item.variantName3] = item.variantValue3;
          }
          tempListOosVariantCombination.push(tempObjVariantCombination);
        }
      });
      setOutOfStockVariantCombination(tempListOosVariantCombination);
    } else {
      // no variant === default uom
      setSelectedProductUOMObject(itemData.productUOMs);
    }

    setProductVariant(itemData.productUOMs);
    if (itemData.totalRatings && itemData.totalReviews) {
      let averageRating = itemData.totalRatings / itemData.totalReviews;
      setAverageReviewRating(averageRating);
    }

    generateAdwordPayload(
      "/product",
      productVariant[0].productId,
      merchantInfoContext.merchantId
    );

    return {
      data: data.getProductDetails,
      variants: variants,
      productImage: productImage,
    };
  };
  const { data: productDetail, isValidating } = useSWR(
    "getProductDetails",
    productDetailFetcher
  );
  const { recommendationsList } = getRecommendations(
    merchantInfoContext.merchantId,
    merchantInfoContext.storeId,
    merchantInfoContext.storeType === StoreTypes.MULTISTORE_STORETYPE
      ? deliveryMode
      : orderType === "Delivery"
      ? "delivery"
      : "pickup"
  );
  // selected product uom object
  const [selectedProductUOMObject, setSelectedProductUOMObject] = useState({});

  // selected variant option eg: {color: r , size: small}
  const [variantsSelected, setVariantsSelected] = useState({});
  const [cartIsLoading, setCartIsLoading] = useState(false);

  const [itemID, setItemId] = useState(null);

  const [productVariant, setProductVariant] = useState([{}]);

  const router = useRouter();
  const routerData = router.query;

  const [outOfStockVariantCombination, setOutOfStockVariantCombination] =
    useState([]);

  // review rating state
  const [averageReviewRating, setAverageReviewRating] = useState(0);
  const [currentReviewList, setCurrentReviewList] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);
  const LIMIT = 10;
  const TOTAL_PAGES = totalPagination(totalReviews, LIMIT);
  const INIT_NEXT_TOKEN = 0;

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
  async function handleStoreAddCartData(quantity, selectedModifierGroups = []) {
    setCartIsLoading(true);

    // check if user select variant
    if (variants.length > 0) {
      if (variants.length !== Object.keys(variantsSelected).length) {
        setToastState({
          show: true,
          severity: "error",
          message: `${t("Please select the product variation first")}`,
        });
        setCartIsLoading(false);
        return false;
      }
    }

    const checkItemExceedQuantityForSalesRes =
      await checkIsItemExceedQuantityForSales(
        selectedProductUOMObject.productUOMId,
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

    const response = await addItemCartList(
      selectedProductUOMObject.productUOMId,
      quantity,
      "ProductUOM",
      orderType,
      selectedModifierGroups
    );

    setCartIsLoading(false);
    return response;
  }

  // fetch listItemReviews
  const fetchListItemReviews = async (nextToken = INIT_NEXT_TOKEN) => {
    const { data } = await API.graphql(
      graphqlOperation(listItemReviews, {
        merchantId: merchantInfoContext.merchantId,
        itemId: itemID,
        itemProperty: "Product",
        limit: LIMIT,
        nextToken: nextToken,
      })
    );

    setCurrentReviewList(data.listItemReviews.items);
    setTotalReviews(data.listItemReviews.total);
  };

  // fetch similar items
  const similarItemFetcher = async () => {
    // setFetchListItemStatus("loading");

    let similarItemsPayload = {
      domain: merchantInfoContext.domain,
      seoUrl: `product/${routerData.productId}`,
      itemProperty: "product",
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

  useEffect(() => {
    fetchListItemReviews((selectedPage - 1) * LIMIT);
  }, [selectedPage]);

  return (
    <>
      <SEO title={routerData.productId} keywords="" description="product" />
      <div className="w-full">
        <div className="max-w-6xl px-2 sm:px-4 m-auto">
          <button
            className="mr-auto px-2 hover:bg-white min-h-4 min-w-5 rounded-md flex items-center"
            onClick={() => router.back()}
          >
            <FaArrowLeft />
            <div className="ml-1">{t("go-back")}</div>
          </button>
        </div>
      </div>
      {/* if fetching show loading */}
      {productDetail?.notFound && <Custom404 showButton={true} />}
      {!productDetail?.notFound && (
        <>
          {!productDetail || isValidating ? (
            <Loader divhHeight="h-screen" />
          ) : (
            <ProductDetails
              currentPath="product"
              layout={!props.layout ? productDetail.layout : props.layout}
              handleStoreAddCartData={handleStoreAddCartData}
              variants={productDetail.variants}
              productImage={productDetail.productImage}
              productDetail={productDetail.data}
              productVariant={productVariant}
              outOfStockVariantCombination={outOfStockVariantCombination}
              cartIsLoading={cartIsLoading}
              setCartIsLoading={setCartIsLoading}
              variantsSelected={variantsSelected}
              setVariantsSelected={setVariantsSelected}
              selectedProductUOMObject={selectedProductUOMObject}
              setSelectedProductUOMObject={setSelectedProductUOMObject}
              cartList={cartList}
              recommendationsList={recommendationsList}
              similarItemsList={similarItemsList}
              averageReviewRating={averageReviewRating}
              currentUrl={productDetail.currentUrl}
              currentReviewList={currentReviewList}
              totalReviews={totalReviews}
              totalReviewPages={TOTAL_PAGES}
              nextToken={INIT_NEXT_TOKEN}
              limit={LIMIT}
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              modifierGroups={productDetail?.data?.modifierGroups}
              isQLEggs={IS_QL_EGGS}
            />
          )}
        </>
      )}
    </>
  );
}

export default ProductDetailScreen;

export async function getServerSideProps(context) {
  const { domain } = getDomainForSSR(context);
  let merchantId = "";

  if (context.req.cookies["merchantId"]) {
    merchantId = context.req.cookies["merchantId"];
  } else {
    const merchantJsonData = await getMerchantData(domain);
    merchantId = merchantJsonData.merchantId;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ECS_API_ENDPOINT}/getLayout`,
      {
        headers: { "Content-Type": "application/json" },
        referrerPolicy: "no-referrer",
        credentials: "same-origin",
        redirect: "follow",
        cache: "no-cache",
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          merchantId: domain,
          pageType: "product",
        }),
      }
    );
    const { body, statusCode } = await response.json();
    let res = body.layout;
    // Returns the default layout if no layout is found
    if (statusCode !== 200)
      res = [
        {
          sectionName: "Remaining Sections",
          isFullWidth: false,
          sectionStyles: "my-6 px-3",
          children: [
            {
              blockType: "ProductDetailSection1",
              gridStyles: "col-span-12",
              blockProps: {},
            },
            {
              blockType: "DescriptionSection1",
              gridStyles: "col-span-12",
              blockProps: {},
            },
            {
              blockType: "ReviewComponent1",
              gridStyles: "col-span-12",
              blockProps: {},
            },
            {
              blockType: "Recommendation1",
              gridStyles: "col-span-12",
              blockProps: {},
            },
            {
              blockType: "SimilarProduct",
              gridStyles: "col-span-12",
              blockProps: {},
            },
          ],
        },
      ];

    return {
      props: {
        domain: domain,
        merchantId: merchantId,
        layout: res,
      },
    };
  } catch (err) {
    return { notFound: true };
  }
}
