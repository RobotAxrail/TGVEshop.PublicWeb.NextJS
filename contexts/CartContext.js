import { createContext, useContext, useEffect, useState } from "react";

// apis
import { API, graphqlOperation } from "aws-amplify";
import { getCustomerCarts } from "@/graphql/queries";
import {
  addItemToCustomerCart,
  updateItemInCustomerCart,
  removeItemFromCustomerCart,
} from "@/graphql/mutations";
// utils
import Cookies from "universal-cookie";
import produce from "immer";
import { isLocalHost, isQLEggs } from "@/utils/util";
import { useRouter } from "next/router";
// contexts
import { useAuth } from "@/contexts/AuthContext";
import MerchantContext from "@/contexts/MerchantContext";

import { setToastState } from "@/states/toastBarState";
import useMultiStoreDelivery from "@/components/AxrailCommerce/MultiStoreDeliverySelector/hooks/useMultiStoreDelivery";
import { StoreTypes } from "@/enums/enums";

const CartContext = createContext({
  cart: [],
});

const QL_EXCLUSIVE_ITEM_CODE_LIST = [
  "EG-A",
  "EG-AA",
  "EG-B",
  "EG-C",
  "EG-D",
  "EG-E",
  "EG-F",
];

const CartContextProvider = ({ children }) => {
  const merchantInfoContext = useContext(MerchantContext);
  const cookie = new Cookies();
  const { isAuthenticated } = useAuth();
  const [isCartFetching, setIsCartFetching] = useState(true);
  const [cartList, setCartList] = useState([]);
  const orderLimit = merchantInfoContext.qtyLimitPerOrder;
  const exclusiveOrderLimit = merchantInfoContext.exclusiveQtyLimitPerOrder;
  const [reachedCartLimit, setReachedCartLimit] = useState(false); //Overall order limit
  const { isMultistore, showModalInMultistoreOnAddCart } =
    useMultiStoreDelivery();

  const signInData = cookie.get("signIn");
  const router = useRouter();

  const IS_QL_EGGS = Boolean(isQLEggs(merchantInfoContext.domain));
  useEffect(() => {
    if (merchantInfoContext.storeType === StoreTypes.WHATSAPP_CRM_STORETYPE)
      return;
    getCartList();
  }, [isAuthenticated]);

  // fetch customer cart list
  const getCartList = async () => {
    setIsCartFetching(true);
    const sessionId = cookie.get("sessionId");
    const { query } = router;
    const tempCheckoutCId = query?.id;
    const redirect = query?.redirect;
    try {
      let params = {
        customerId: tempCheckoutCId ? tempCheckoutCId : sessionId,
        // cartChannel: redirect ? "WhatsApp": null
      };

      if (isLocalHost()) {
        params["merchantId"] = merchantInfoContext.merchantId;
      }
      let res = await API.graphql(graphqlOperation(getCustomerCarts, params));
      let responseProductItem = res.data.getCustomerCarts.items;
      setCartList(responseProductItem ?? []);
      setIsCartFetching(false);
    } catch (error) {
      setIsCartFetching(false);
    }
  };

  //check exclusive item limit & overall order limit
  const checkCartQtyLimit = () => {
    let qlExclusiveItemsQty = 0;
    let exclusiveItemCodeList = ["EG-A", "EG-B", "EG-C", "EG-D"];

    let total = 0;

    for (let item in cartList) {
      //check exclusive items limit per order
      if (
        IS_QL_EGGS &&
        exclusiveItemCodeList.includes(cartList[item]?.itemCode)
      ) {
        let quantity = cartList[item].quantity;
        qlExclusiveItemsQty = qlExclusiveItemsQty + quantity;
        if (qlExclusiveItemsQty >= exclusiveOrderLimit) {
          setReachedCartLimit(true);
          if (qlExclusiveItemsQty > exclusiveOrderLimit) {
            return true;
          }
        }
      }

      //check overall item limit per order
      if (IS_QL_EGGS) {
        if (QL_EXCLUSIVE_ITEM_CODE_LIST.includes(cartList[item]?.itemCode)) {
          let quantity = cartList[item].quantity;
          total = total + quantity;
        }
      } else {
        let quantity = cartList[item].quantity;
        total = total + quantity;
      }
    }
    if (orderLimit) {
      if (total >= orderLimit) {
        setReachedCartLimit(true);
        if (total > orderLimit) {
          return true;
        } else {
          return false;
        }
      } else {
        setReachedCartLimit(false);
        return false;
      }
    }
  };

  //check SKU limit per order
  const checkCartItemQtyLimit = (quantity, limitPerOrder) => {
    if (merchantInfoContext.storeType === "b2b") {
      if (limitPerOrder && quantity >= limitPerOrder) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  // remove item from cart
  const removeItemCartList = async (customerCartId) => {
    try {
      var params = {
        merchantId: merchantInfoContext.merchantId,
        accessToken: signInData?.accessToken ?? "",
        customerCartId: customerCartId,
      };
      const res = await API.graphql(
        graphqlOperation(removeItemFromCustomerCart, params)
      );
      if (res.data.removeItemFromCustomerCart.status === "true") {
        setCartList(
          cartList.filter((obj) => obj.customerCartId !== customerCartId)
        );
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const updateItemQtyCartList = async (
    customerCartId,
    quantity,
    page = "checkout"
  ) => {
    try {
      const sessionId = cookie.get("sessionId");
      var params = {
        merchantId: merchantInfoContext.merchantId,
        customerCartId: customerCartId,
        accessToken: signInData?.accessToken ?? "",
        quantity: quantity,
      };
      const res = await API.graphql(
        graphqlOperation(updateItemInCustomerCart, params)
      );

      if (res.data.updateItemInCustomerCart.status === "true") {
        // update by id
        const updatedCartList = produce(cartList, (draft) => {
          const index = draft.findIndex(
            (obj) => obj.customerCartId === customerCartId
          );
          if (index !== -1) {
            draft[index].quantity = quantity;
            draft[index].subtotal = quantity * draft[index].deliveryPrice;
            draft[index].subtotalWithTax =
              quantity * draft[index].deliveryPriceWithTax;
          }
        });

        if (page === "detail") {
          setToastState({
            show: true,
            severity: "success",
            message: res.data.updateItemInCustomerCart.message,
          });
        }

        setCartList(updatedCartList);
        return true;
      } else if (res.data.updateItemInCustomerCart.status === "false") {
        setToastState({
          show: true,
          severity: "error",
          message: res.data.updateItemInCustomerCart.message,
        });
        return false;
      }
    } catch (error) {
      setToastState({
        show: true,
        severity: "error",
        message: "An unexpected error occurred, please try again later.",
      });
    }
  };

  // add new item to cart
  const addItemCartList = async (
    itemId,
    quantity,
    itemProperty,
    orderType,
    selectedModifierGroups = [],
    showToast = true
  ) => {
    if (isMultistore) {
      const inflateMultistoreModal = showModalInMultistoreOnAddCart();
      if (inflateMultistoreModal) return;
    }
    try {
      const sessionId = cookie.get("sessionId");
      let params = {
        merchantId: merchantInfoContext.merchantId,
        accessToken: signInData?.accessToken ?? "",
        mandatoryItem: true,
        itemId: itemId,
        quantity: quantity,
        customerId: sessionId,
        itemProperty: itemProperty,
        selectedModifierGroups: selectedModifierGroups,
        storeId: merchantInfoContext?.storeId || "",
        salesChannelName: "Online Store",
        type: orderType,
      };
      let res = await API.graphql(
        graphqlOperation(addItemToCustomerCart, params)
      );

      const resData = res.data.addItemToCustomerCart;
      if (resData?.status) {
        // to update the list
        getCartList();
        if (showToast) {
          setToastState({
            show: true,
            severity: "success",
            message: res.data.addItemToCustomerCart.message,
          });
        }
        return resData;
      } else {
        if (showToast) {
          setToastState({
            show: true,
            severity: "error",
            message: res.data.addItemToCustomerCart.message,
          });
        }
        return resData;
      }
    } catch (error) {
      return null;
    }
  };

  function sum(items, prop) {
    return items.reduce(function (a, b) {
      return a + b[prop];
    }, 0);
  }

  // todo: temporary handling for ql. need to relook to make dynamic
  const QLExclusiveItemsHandling = (item) => {
    if (!QL_EXCLUSIVE_ITEM_CODE_LIST.includes(item.itemCode)) {
      return null;
    }
    const filteredItems = cartList.filter(
      (obj) =>
        QL_EXCLUSIVE_ITEM_CODE_LIST.includes(obj.itemCode) &&
        item.itemCode !== obj.itemCode
    );
    let remainingAvailable = 20 - sum(filteredItems, "quantity");
    if (remainingAvailable < 0) {
      remainingAvailable = 0;
    }
    return remainingAvailable;
  };

  return (
    <CartContext.Provider
      value={{
        getCartList,
        cartList,
        setCartList,
        removeItemCartList,
        addItemCartList,
        updateItemQtyCartList,
        isCartFetching,
        reachedCartLimit,
        setReachedCartLimit,
        checkCartItemQtyLimit,
        checkCartQtyLimit,
        QLExclusiveItemsHandling,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
const useCart = () => {
  return useContext(CartContext);
};
export { CartContext, CartContextProvider, useCart };
