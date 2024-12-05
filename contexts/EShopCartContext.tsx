import React, { createContext, useState, useContext, useEffect } from "react";
import MerchantContext from "@/contexts/MerchantContext";
import { API, graphqlOperation } from "aws-amplify";
import {
  getCustomerCarts,
  getCustomerOrderPaymentMessage,
} from "@/graphql/queries";
import Cookies from "universal-cookie";

import {
  checkCart,
  checkCartLimit,
  placeCustomerOrderToSQS,
} from "@/graphql/mutations";
import { useMutation } from "@tanstack/react-query";

interface CartContextType {
  cart: any[];
  fetchCheckCart: (cartIds: string[]) => void;
  customerCart: any[];
  triggerCheckout: () => void;
  isCheckoutLoading: boolean;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  fetchCheckCart: () => {},
  customerCart: [],
  triggerCheckout: () => {},
  isCheckoutLoading: false,
});

interface CartProviderProps {
  children: React.ReactNode;
}

type CheckCartResponse = {
  data: {
    checkCart: {
      message: string;
      status: string;
      cartItems: Record<string, any>[];
      subtotal: number;
      subtotalWithTax: number;
    };
  };
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const merchantInfoContext = useContext(MerchantContext);
  const cookie = new Cookies();
  const sessionId = cookie.get("sessionId");
  const [isLoading, setIsLoading] = useState(false);

  const [customerCart, setCustomerCart] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [customerCartIds, setCustomerCardIds] = useState<string[]>([]);

  //Getting cart
  const fetchCart = async () => {
    // Check if required values exist before making the API call
    if (!merchantInfoContext?.merchantId || !sessionId) {
      console.log("Missing required values for fetch cart");
      return;
    }
    try {
      let params = {
        merchantId: merchantInfoContext.merchantId,
        customerId: sessionId,
      };

      let res = (await API.graphql(
        graphqlOperation(getCustomerCarts, params)
      )) as {
        data: { getCustomerCarts: { items: { customerCartId: string }[] } };
      };
      setCart(res.data.getCustomerCarts.items);
    } catch (error) {
      console.error("Add to cart failed: ", error);
    }
  };

  useEffect(() => {
    if (merchantInfoContext?.merchantId && sessionId) {
      fetchCart();
    }
  }, [merchantInfoContext?.merchantId, sessionId]); // Use merchantId specifically instead of entire context

  useEffect(() => {
    console.log("Cart state changed:", cart);
  }, [cart]);

  //CheckCart
  const fetchCheckCart = async (cartIds) => {
    setIsLoading(true);
    try {
      let params = {
        customerCartIds: cartIds, // Use the passed cartIds
        customerId: sessionId,
        isOwnTransportOption: false,
        merchantId: merchantInfoContext.merchantId,
        orderType: merchantInfoContext.orderOption[1]?.toLocaleLowerCase(),
        postalCode: "12345",
        promoCode: "",
        storeId: merchantInfoContext.storeId,
        truckCapacityIds: "",
      };

      const res = (await API.graphql(
        graphqlOperation(checkCart, params)
      )) as CheckCartResponse;
      if (res.data?.checkCart?.cartItems) {
        setCustomerCart(res.data.checkCart.cartItems);
      }
    } catch (error) {
      console.error("Error during CheckCart:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // console.log(cart)
  console.log(cart);
  // Checkout Cart
  const { mutate: triggerCheckout, isLoading: isCheckoutLoading } = useMutation(
    {
      mutationKey: ["trigger checkout"],
      mutationFn: async () => {
        let params = {
          billingCountry: "",
          // deliveryLongitude: deliveryAddress?.selectedLatLng?.lng,
          // deliveryLatitude: deliveryAddress?.selectedLatLng?.lat,
          customerMobileNo: `60123123123`,
          deliveryPostalCode: "58000",
          deliveryCountry: "",
          deliveryAddress: "Menara MBMR",
          deliveryCity: "Kuala Lumpur",
          accessToken: "",
          deliveryState: "Kuala Lumpur",
          salesChannelName: "Online Store",
          billingPostalCode: "58000",
          customerFavouriteAddressId: "",
          customerFavouritePaymentId: "",
          paymentType: "",
          storeId: merchantInfoContext?.storeId,
          customerPrimaryEmail: "asdf@axrail.com",
          customerAccountNo: "",
          deliveryOptionSelected: "",
          isCustomerSignedIn: "",
          platform: "ecommerce",
          requiredCutlery: "",
          noteToRider: "",
          storeName: "",
          // promoCode,
          // scheduledDateTime,
          customerFirstName: "ant",
          customerLastName: "man",
          customerCartIds: cart.map((item) => item?.customerCartId),
          isAdvancedOrder: false,
          billingAddress: "Menara MBMR",
          billingState: "Kuala Lumpur",
          billingCity: "Kuala Lumpur",
          // tableNumber,
          // customerId,
          orderType: "pickup",
          remarks: "",
          // scheduledDate: scheduledDate,
          // scheduledTime: scheduledTime,
          // truckCapacityId: truckCapacityId,
          // paymentMethod,
          // voucherCode: (currentVoucher as any)?.voucherId,
          // voucherExpiryDate: (currentVoucher as any)?.expiryDate,
        };
        const { data } = (await API.graphql(
          graphqlOperation(placeCustomerOrderToSQS, params)
        )) as any;
        console.log("get payment details", data?.placeCustomerOrderToSQS);
        if (data?.placeCustomerOrderToSQS?.messageId) {
          await checkOutPayment(data?.placeCustomerOrderToSQS?.messageId);
        }
        return data?.placeCustomerOrderToSQS;
      },
    }
  );

  const checkOutPayment = async (checkOutId: string) => {
    let params = {
      accessToken: "",
      messageId: checkOutId,
    };
    const { data } = (await API.graphql(
      graphqlOperation(getCustomerOrderPaymentMessage, params)
    )) as any;
    console.log("payment redirect", data?.getCustomerOrderPaymentMessage);
    if (data?.getCustomerOrderPaymentMessage?.gatewayPaymentUrl) {
      const url = `${data?.getCustomerOrderPaymentMessage?.gatewayPaymentUrl}?${data?.getCustomerOrderPaymentMessage?.gatewayPaymentParams}`;
      window.location.assign(url);
    }
  };

  const value = {
    cart,
    fetchCheckCart,
    customerCart,
    triggerCheckout,
    isCheckoutLoading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;
