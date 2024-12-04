import React, { useEffect, useState } from "react";
// components
import Cart from "@/components/cart/Cart";
import SEO from "@/components/seo/SEO";
// contexts
import { useContext } from "react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { useAuth } from "@/contexts/AuthContext";
import { API, graphqlOperation } from "aws-amplify";
import { updateProductModifierSelectionInCustomerCart } from "@/graphql/mutations";
import MerchantContext from "@/contexts/MerchantContext";
import { setToastState } from "@/states/toastBarState";

const ViewCartScreen = () => {
  const merchantInfoContext = useContext(MerchantContext);
  const {
    cartList,
    removeItemCartList,
    updateItemQtyCartList,
    isCartFetching,
    getCartList,
  } = useCart();
  const { handleSignOut } = useAuth();
  const router = useRouter();
  const cookie = new Cookies();
  const [selectedItemList, setSelectedItemList] = useState(
    cartList.map((cartItem) => cartItem.customerCartId)
  );

  const getProductDetails = async (productId) => {
    try {
      const res = await API.graphql(
        graphqlOperation(getProductDetails, {
          merchantId: merchantInfoContext.merchantId,
          storeId: merchantInfoContext.storeId,
          seoUrl: "product/" + productId,
        })
      );
      if (res.data.getProductDetails.status === "true") {
        return res.data.getProductDetails;
      } else {
        setToastState({
          show: true,
          severity: "error",
          message: t("An unexpected error occurred please try again later"),
        });
        return null;
      }
    } catch (error) {
      setToastState({
        show: true,
        severity: "error",
        message: t("An unexpected error occurred please try again later"),
      });
      return null;
    }
  };

  const handleUpdateProductModifierSelectionInCustomerCart = async (
    customerCartId,
    quantity,
    selectedModifierGroups
  ) => {
    try {
      let signInData = cookie.get("signIn");
      const params = {
        accessToken: signInData?.accessToken ?? "",
        customerCartId: customerCartId,
        merchantId: merchantInfoContext.merchantId,
        quantity: quantity,
        selectedModifierGroups: selectedModifierGroups,
      };
      const res = await API.graphql(
        graphqlOperation(updateProductModifierSelectionInCustomerCart, params)
      );
      if (
        res.data.updateProductModifierSelectionInCustomerCart.status === "true"
      ) {
        setToastState({
          show: true,
          severity: "success",
          message: t("Cart successfully updated"),
        });
        return res.data.updateProductModifierSelectionInCustomerCart;
      } else {
        setToastState({
          show: true,
          severity: "error",
          message: t("An unexpected error occurred please try again later"),
        });
        return null;
      }
    } catch (error) {
      setToastState({
        show: true,
        severity: "error",
        message: t("An unexpected error occurred please try again later"),
      });
      return null;
    }
  };

  useEffect(() => {
    sessionStorage.clear("selectedItems");
    if (router.query.cId !== undefined) {
      cookie.set("sessionId", router.query.cId, { path: "/" });
      if (cookie.get("signIn") !== undefined) {
        cookie.remove("signIn");
      }
    }
  }, []);

  return (
    <>
      <SEO title={t("Shopping Cart")} keywords="" description="Shopping Cart" />
      <Cart
        isCartFetching={isCartFetching}
        cartList={cartList}
        removeItemCartList={removeItemCartList}
        updateItemQtyCartList={updateItemQtyCartList}
        selectedItemList={selectedItemList}
        setSelectedItemList={setSelectedItemList}
        getProductDetails={getProductDetails}
        handleUpdateProductModifierSelectionInCustomerCart={
          handleUpdateProductModifierSelectionInCustomerCart
        }
        getCartList={getCartList}
      />
    </>
  );
};

export default ViewCartScreen;
