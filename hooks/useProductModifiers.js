import { useContext, useState } from "react";
import MerchantContext from "@/contexts/MerchantContext";
import Cookies from "universal-cookie";
import { API, graphqlOperation } from "aws-amplify";
import { updateProductModifierSelectionInCustomerCart } from "@/graphql/mutations";
import { setToastState } from "@/states/toastBarState";

export const useProductModifiers = (merchantId) => {
  const cookie = new Cookies();
  const [updateProductModifierIsLoading, setUpdateProductModifierIsLoading] =
    useState(false);

  const [productModifierModalState, setProductModifierModalState] = useState({
    visible: true,
    data: null,
  });

  const handleAddItemToCart = (quantity) => {
    setProductModifierModalState((prevState) => ({
      ...prevState,
      data: { ...prevState.data, quantity: prevState.data.quantity + 1 },
    }));
  };

  const handleMinusItemFromCart = () => {
    productModifierModalState.data.quantity > 1 &&
      setProductModifierModalState((prevState) => ({
        ...prevState,
        data: { ...prevState.data, quantity: prevState.data.quantity - 1 },
      }));
  };

  const handleCloseProductModifierModal = () => {
    setProductModifierModalState({
      visible: false,
      data: null,
    });
  };

  const handleToggleEditModifier = (selectedItem) => {
    setProductModifierModalState({
      visible: true,
      data: selectedItem,
    });
  };

  const handleUpdateProductModifierSelectionInCustomerCart = async (
    customerCartId,
    quantity,
    selectedModifierGroups
  ) => {
    try {
      setUpdateProductModifierIsLoading(true);
      let signInData = cookie.get("signIn");
      const params = {
        accessToken: signInData?.accessToken ?? "",
        customerCartId: customerCartId,
        merchantId: merchantId,
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
          message: "Cart successfully updated.",
        });
        setUpdateProductModifierIsLoading(false);
        return res.data.updateProductModifierSelectionInCustomerCart;
      } else {
        setToastState({
          show: true,
          severity: "error",
          message: "An unexpected error occurred, please try again later.",
        });
        setUpdateProductModifierIsLoading(false);
        return null;
      }
    } catch (error) {
      console.log({ error });
      setToastState({
        show: true,
        severity: "error",
        message: "An unexpected error occurred, please try again later.",
      });
      setUpdateProductModifierIsLoading(false);
      return null;
    }
  };

  return {
    handleUpdateProductModifierSelectionInCustomerCart,
    updateProductModifierIsLoading,
    handleToggleEditModifier,
    handleCloseProductModifierModal,
    productModifierModalState,
    handleCloseProductModifierModal,
    handleAddItemToCart,
    handleMinusItemFromCart,
  };
};
