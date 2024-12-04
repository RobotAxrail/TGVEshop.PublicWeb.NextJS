import ProductModifierModal from "@/components/productDetail/ProductModifier/ProductModifierModal";
import ProductDetailVariant2 from "./variants/ProductDetails2/ProductDetailVariant2";
import ProductDetailSection1 from "./variants/ProductDetails1/ProductDetailSection1";
import DescriptionSection1 from "./variants/ProductDetails1/DescriptionSection1";
import ReviewComponent1 from "./variants/ProductDetails1/ReviewComponent1";
import Recommendation from "@/components/recommendation/Recommendation";
import DynamicRenderer from "../DynamicRenderer/DynamicRenderer";
import { useWishlist } from "@/contexts/WishlistContext";
import { setToastState } from "@/states/toastBarState";
import { useOrder } from "@/contexts/OrderContext";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";

import _ from "lodash";

export function Divider() {
  return (
    <hr
      style={{ height: "1.5px", border: "none" }}
      className="w-full bg-primary"
    />
  );
}

export default function ProductDetails(props) {
  const {
    recommendationsList,
    similarItemsList,
    productDetail,
    productImage,
    currentPath,
    currentUrl,
    layout,
    isQLEggs,
  } = props;
  const [showProductModifierModal, setShowProductModifierModal] =
    useState(false);
  const [selectedProductUOMObject, setSelectedProductUOMObject] =
    useState<any>();
  const [selectedVariantMap, setSelectedVariantMap] = useState({});
  const [carouselImageIndex, setCarouselImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const isProjectBundle = currentPath === "product-bundle";
  const { addItemCartList, cartList, reachedCartLimit, updateItemQtyCartList } =
    useCart() as any;
  const [isLoading, setIsLoading] = useState(false);
  const { orderType } = useOrder() as any;
  const { isAuthenticated } = useAuth();
  const cookie = new Cookies();
  const router = useRouter();
  const {
    handleUpdateCustomerWishlist,
    getCustomerWishListIdOfItem,
    fetchCustomerWishList,
    getFavouriteStatus,
  } = useWishlist() as any;
  const { t } = useTranslation("common");

  useEffect(() => {
    if (productDetail?.productUOMs?.length === 1)
      setSelectedProductUOMObject(
        (productDetail?.productUOMs || [undefined])[0]
      );
  }, [productDetail?.productUOMs]);

  const _generateVariantStructure = (productDetail: any) => {
    const { variantName1, variantName2, variantName3 } = productDetail;
    const { variantValues1, variantValues2, variantValues3 } = productDetail;
    return [
      {
        name: variantName1,
        id: variantName1,
        selections: variantValues1?.map((v) => ({
          label: v,
          id: v,
        })),
      },
      {
        name: variantName2,
        id: variantName2,
        selections: variantValues2?.map((v) => ({
          label: v,
          id: v,
        })),
      },
      {
        name: variantName3,
        id: variantName3,
        selections: variantValues3?.map((v) => ({
          label: v,
          id: v,
        })),
      },
    ].filter(({ name, selections }) => Boolean(name) && Boolean(selections));
  };

  function _checkIfItemExceedSalesQuantity({
    selectedQuantity,
    quantityForSales,
    productUOMId,
    cartList,
  }: any) {
    // const { productUOMId, quantityForSales } = selectedProductUOMObject;
    const getItemInCart = cartList.filter(
      ({ itemId }) => itemId === productUOMId
    );
    let newItemQuantity = selectedQuantity;
    if (getItemInCart?.length > 0)
      newItemQuantity += getItemInCart[0]?.quantity;
    const passedTest = !(newItemQuantity > quantityForSales);
    return {
      message: !passedTest
        ? `${t("The selected quantity exceeded")} : ${quantityForSales}`
        : "",
      passedTest,
    };
  }

  function _checkIfAllVariantSelected({
    selectedVariantMap,
    productDetail,
  }: any) {
    const { variantName1, variantName2, variantName3 } = productDetail;
    const variantNumber = [variantName1, variantName2, variantName3].filter(
      (a) => Boolean(a)
    ).length;

    return {
      message: t("Please select the product variation first"),
      passedTest: !(
        variantNumber !== Object.keys(selectedVariantMap)?.length &&
        variantNumber > 0
      ),
    };
  }

  const onAddToWishList = () => {
    const productVariant = productDetail?.productUOMs || [];
    const type = isProjectBundle ? "ProductBundle" : "Product";
    const itemId = isProjectBundle
      ? selectedProductUOMObject.productBundleId
      : productVariant[0].productId;
    const wishListId = getCustomerWishListIdOfItem(itemId);
    if (!isAuthenticated) router.push("/login");
    else
      handleUpdateCustomerWishlist(itemId, type, wishListId).then(
        (val: any) => val && fetchCustomerWishList()
      );
  };

  const onBuyNow = async () => {
    setIsLoading(true);
    const signInData = cookie.get("signIn");
    let response = await onAddCartItem(selectedQuantity);
    console.log(response, "This is the buy now state");
    if (!response?.status) {
      setIsLoading(false);
      return;
    }
    sessionStorage.setItem(
      "selectedItems",
      JSON.stringify([response.customerCartId])
    );
    if (signInData !== undefined && signInData?.accessToken !== "")
      router.push({ pathname: "/checkout" });
    else router.push({ pathname: "/redirect", query: `to=checkout` });
    setIsLoading(false);
  };

  const isOutOfStock = () => {
    const { quantityForSales } = selectedProductUOMObject || {
      quantityForSales: 0,
    };
    const { productUOMs } = productDetail;
    return (
      (productUOMs.length > 0 &&
        productUOMs?.length ===
          _.filter(productUOMs, { quantityForSales: 0 }).length) ||
      quantityForSales === 0
    );
  };

  const onVariantSelected = (variantMap, UOM) => {
    setSelectedVariantMap(variantMap);
    setSelectedProductUOMObject(UOM);
  };

  useEffect(() => {
    const itemIsInCart =
      cartList?.findIndex(
        (item: any) => item.itemId === selectedProductUOMObject?.productUOMId
      ) !== -1;
      
    const existingQuantity = cartList?.find(
      (item: any) => item.itemId === selectedProductUOMObject?.productUOMId
    )?.quantity;

    setIsInCart(itemIsInCart);

    if (itemIsInCart) {
      setSelectedQuantity(existingQuantity);
    } else {
      setSelectedQuantity(1);
    }
  }, [selectedProductUOMObject]);

  const handleOnSubmitModifierModal = async (modifierGroupsState: any) =>
    await onAddCartItem(
      modifierGroupsState.quantity,
      modifierGroupsState.selectedModifierGroups
    );

  async function onAddCartItem(quantity: number, selectedModifierGroups = []) {
    const { productUOMs } = productDetail;
    setIsLoading(true);
    const failedCases = [
      _checkIfAllVariantSelected({
        selectedVariantMap,
        productDetail,
      }),
      _checkIfItemExceedSalesQuantity({
        ...selectedProductUOMObject,
        selectedQuantity: quantity,
        cartList,
      }),
    ].filter(({ passedTest }) => !passedTest);
    if (failedCases.length > 0) {
      setIsLoading(false);
      failedCases.forEach(({ message }) => {
        setToastState({
          show: true,
          severity: "error",
          message: message,
        });
      });
      return false;
    } else {
      const itemIsInCart =
        cartList?.findIndex(
          (item: any) => item.itemId === selectedProductUOMObject?.productUOMId
        ) !== -1;
      const existingCartId = cartList?.find(
        (item: any) => item.itemId === selectedProductUOMObject?.productUOMId
      )?.customerCartId;

      if (itemIsInCart) {
        const res = await updateItemQtyCartList(
          existingCartId,
          selectedQuantity,
          "detail"
        );
        setIsLoading(false);
        return {
          status: res,
          customerCartId: existingCartId,
          message: "Successfully updated cart"
        };
      }

      const res = await addItemCartList(
        (selectedProductUOMObject || productUOMs[0]).productUOMId,
        quantity,
        "ProductUOM",
        orderType,
        selectedModifierGroups
      );
      if (res?.status) setIsInCart(true);

      setIsLoading(false);
      return res;
    }
  }

  const productDetailProps = {
    _generateVariantStructure,
    selectedProductUOMObject,
    setSelectedQuantity,
    getFavouriteStatus,
    selectedVariantMap,
    carouselImageIndex,
    onVariantSelected,
    reachedCartLimit,
    selectedQuantity,
    isProjectBundle,
    onAddToWishList,
    onAddCartItem,
    productDetail,
    productImage,
    currentPath,
    currentUrl,
    isLoading,
    onBuyNow,
    isQLEggs,
    isInCart,
  };

  return (
    <>
      <DynamicRenderer
        structure={layout}
        rootClassNames=""
        dynamicProps={{
          Recommendation2: { recommendationsList: recommendationsList },
          ProductDetailSection2: productDetailProps,
          ProductDetailSection1: productDetailProps,
          Recommendation1: {
            recommendationsList: recommendationsList,
            title: t("You may also like"),
          },
          SimilarProduct: {
            recommendationsList: similarItemsList,
            title: t("Similar products"),
          },
          ReviewComponent1: {
            productId: (productDetail?.productUOMs || [{}])[0]?.productId,
          },
        }}
        componentMap={{
          ProductDetailSection2: ProductDetailVariant2,
          Recommendation2: Recommendation,
          Recommendation1: Recommendation,
          SimilarProduct: Recommendation,
          ProductDetailSection1,
          ReviewComponent1,
          Divider,
        }}
      />
      <br />
      <br />
      <br />
      {productDetail?.modifierGroups?.length > 0 && (
        <ProductModifierModal
          handleCloseModal={() => setShowProductModifierModal(false)}
          initialModifierGroups={productDetail.modifierGroups}
          handleOnSubmit={handleOnSubmitModifierModal}
          showModal={showProductModifierModal}
          submitIsLoading={isLoading}
          outOfStock={isOutOfStock()}
          quantity={selectedQuantity}
          item={productDetail}
          productOriginalPrice={
            selectedProductUOMObject?.deliveryPriceWithTax
              ? selectedProductUOMObject?.deliveryPriceWithTax
              : selectedProductUOMObject?.deliveryPrice
          }
        />
      )}
    </>
  );
}
