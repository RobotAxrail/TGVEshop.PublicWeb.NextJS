import { generateAdwordPayload } from "@/apis/anaytics";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import MerchantContext from "@/contexts/MerchantContext";
import { useOrder } from "@/contexts/OrderContext";
import { useStoreOperatingHour } from "@/contexts/StoreOperatingHourContext";
import { OrderTypes, StoreTypes } from "@/enums/enums";
import {
  checkCart,
  checkCartLimit,
  placeCustomerOrderToSQS,
} from "@/graphql/mutations";
import {
  getCustomerOrderPaymentMessage,
  getDeliveryQuotation,
  getStandardDeliveryQuotation,
} from "@/graphql/queries";
import { setToastState } from "@/states/toastBarState";
import { API, graphqlOperation } from "aws-amplify";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import Cookies from "universal-cookie";
import useVoucherCart from "modules/rewards/components/context/VoucherStoreContext";
import UseCheckoutVoucherModal from "../components/UseCheckoutVoucherModal";
import { isQLEggs } from "@/utils/util";

type DeliveryDiscount = {
  discountType: string;
  discountValue: number;
};

export default function useCheckoutPageController() {
  const {
    merchantId,
    storeId,
    paymentType,
    storeType,
    qtyLimitPerOrder,
    minimumOrderValue,
    domain,
  } = useContext(MerchantContext);

  const IS_QL_EGGS = Boolean(isQLEggs(domain));

  const [advancedOrderTimeSelection, setAdvanceOrderTimeSelection] = useState();
  const [redirectingToGateway, setRedirectingToGateway] = useState(false);
  const [isFetchingCheckCart, setFetchingCheckCart] = useState(false);
  const [isFetchingDeliveryOptions, setFetchingDeliveryOptions] =
    useState(false);
  const { voucherCart } = useVoucherCart();
  const { orderType, deliveryAddress, setDeliveryAddress, tableNumber } =
    useOrder();
  const [checkCartResponse, setCheckCartResponse] = useState({
    subtotal: 0,
    subtotalWithTax: 0,
  });
  const { landingPageData } = useStoreOperatingHour() as any;
  const warungStoreIsOpen = landingPageData?.warungStoreStatus === "open";
  const IS_MANUAL_PAYMENT = paymentType === "ManualPayment";
  const [deliveryOptions, setDeliveryOptions] = useState();
  const [paymentMethodOptions, setPaymentMethodOptions] = useState([
    {
      id: "1",
      name: "E-Wallet",
      value: "WA",
    },
    {
      id: "2",
      name: "Credit/Debit Card",
      value: "CC",
    },
    {
      id: "3",
      name: "Bank Transfer",
      value: "DD",
    },
  ]);
  const {
    cartList,
    setCartList,
    isCartFetching,
    checkCartQtyLimit,
    getCartList,
  } = useCart() as any;
  const [promoCode, setPromocode] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState("");
  const [appliedDeliveryDiscount, setAppliedDeliveryDiscount] =
    useState<DeliveryDiscount>(null);

  const { isAuthenticated, user } = useAuth();
  const retryCount = useRef(0);
  const [isDeliveryOptionsLoading, setIsDeliveryOptionsLoading] =
    useState(false);
  const [checkoutCustomerId, setCheckoutCustomerId] = useState(null);
  const [redirectUserDetail, setRedirectUserDetail] = useState(null);
  const [truckScheduleSelection, setTruckScheduleSelection] = useState(null);
  //check if order total reached min amount configured by merchant
  const [minOrder, setMinOrder] = useState(true);
  // check if exceed SKU/Truck limit
  const [exceedLimit, setExceedLimit] = useState(false);
  const [disableCheckout, setDisableCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const defaultCustomerInfo = {
    dineInPaymentMethod: "PayOnline",
    deliveryOptionSelected: "",
    billingCountry: "Malaysia",
    mobileCountryCode: "+60",
    customerPrimaryEmail: "",
    customerMobileNo: "+60",
    deliveryFullAddress: deliveryAddress,
    customerFirstName: "",
    customerLastName: "",
    billingPostcode: "",
    billingAddress: "",
    scheduledDate: "",
    scheduledTime: "",
    mobileNumber: "",
    billingState: "",
    billingCity: "",
    tableNumber,
    remarks: "",
    truckCapacityId: "",
    paymentMethod: "",
  };

  const {
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    clearErrors,
    getValues,
    setValue,
    register,
    reset,
    watch,
  } = useForm({
    defaultValues: defaultCustomerInfo,
  });

  useFormPersist("checkout-form", {
    watch,
    setValue,
    exclude: [
      "deliveryOptionSelected",
      "dineInPaymentMethod",
      "deliveryFullAddress",
      "truckCapacityId",
      "paymentMethod",
      "billingCountry",

      "billingPostcode",
      "billingAddress",
      "scheduledDate",
      "scheduledTime",
      "billingState",
      "billingCity",
      "tableNumber",
      "remarks",
    ],
  });

  const errorMsgMap = {
    "Truck Schedule Not Found":
      "No delivery service available in your area. Please select a different address.",
    "Truck Capacity Limit Exceeded": `We have reached maximum capacity for our orders. Kindly reduce the order quantity or choose alternate delivery date to proceed.`,
    "SKU Quantity Limit Per Order Exceeded":
      "You have exceeded the product limit. Please reduce cart item quantity.",
    "Order Quantity Limit Exceeded":
      "You have exceeded the order limit. Please reduce cart item quantity.",
    "SKU Quantity Limit Per Day Exceeded":
      "You have exceeded the product limit. Please reduce cart item quantity.",
    "QL Exclusive Items Quantity Limit Per Order Exceeded":
      "These items (Egg A - Tray, Egg B - Tray, Egg C - Tray, Egg D - Tray) are limited to a total of 20 trays per order only. Kindly reduce the order quantity to proceed.",
  };

  const {
    CheckoutVoucherModal,
    toggleVoucherModal,
    currentVoucher,
    setCurrentVoucherWithID,
  } = UseCheckoutVoucherModal({
    merchantId,
    onCurrentVoucherChange: () => {
      const cartIds = cartList?.map(({ customerCartId }) => customerCartId);
      if (!isFetchingCheckCart) getCheckCart(cartIds);
    },
  });

  function waitForCheckCart(msg: string) {
    return new Promise<void>((resolve) => {
      if (!isFetchingCheckCart) {
        resolve();
      } else {
        setTimeout(() => {
          waitForCheckCart(msg).then(resolve);
        }, 1000);
      }
    });
  }

  function waitForToast(message: any) {
    return new Promise<void>((resolve) => {
      if (!!message) {
        setTimeout(() => {
          setToastState({
            severity: "error",
            message: message,
            show: !!message,
          });
          resolve();
        }, 1000);
      }
    });
  }

  const UpdateVoucherDataFromCheckCart = async (value: any) => {
    if (value.voucherValidation === "Valid voucher") {
      setToastState({
        severity: "success",
        message: value.voucherValidation,
        show: true,
      });
      setCurrentVoucherWithID(value.voucherCode);
    } else {
      waitForToast(value.voucherValidation);
      waitForCheckCart(value.voucherValidation).then(() => {
        setCurrentVoucherWithID("");
      });
    }
  };

  useEffect(() => {
    if (storeType === StoreTypes.B2B_STORETYPE) {
      let tempPaymentOptios = [...paymentMethodOptions];
      setPaymentMethodOptions(
        tempPaymentOptios.filter((method) => method.value !== "CC")
      );
    }
  }, []);

  // Side Effects
  useEffect(() => {
    if (isAuthenticated) {
      setValue("customerPrimaryEmail", user?.primaryEmail);
      setValue("mobileCountryCode", user?.mobileNo?.substring(0, 3));
      setValue("mobileNumber", user?.mobileNo?.substring(3));
      setValue("customerFirstName", user?.firstName || "");
      setValue("customerLastName", user?.lastName || "");
    } else {
      reset(defaultCustomerInfo);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    const cookie = new Cookies();
    const { query } = router;
    const tempCustomerId = query?.id;
    const redirect = query?.redirect;
    if (redirect && tempCustomerId) {
      setCheckoutCustomerId(tempCustomerId);
      cookie.set("sessionId", tempCustomerId, { path: "/" });
    }
    if (!isCartFetching && cartList?.length === 0 && voucherCart?.length === 0)
      router.push("/no-order");
  }, [isCartFetching]);

  useEffect(() => {
    const cartIds = cartList?.map(({ customerCartId }) => customerCartId);
    if (!isFetchingCheckCart) getCheckCart(cartIds);
  }, [
    cartList,
    promoCode,
    orderType,
    deliveryAddress,
    watch("deliveryOptionSelected"),
  ]);

  useEffect(() => {
    if (storeType === StoreTypes.B2B_STORETYPE) {
      const cartIds = cartList?.map(({ customerCartId }) => customerCartId);
      const { scheduledDate } = getValues();
      if (cartIds.length > 0 && scheduledDate) {
        getCheckCartLimit(cartIds, scheduledDate);
      }
    }
  }, [cartList, watch("scheduledDate")]);

  //trigger the api if not own transport option selected to check if exceed sku
  useEffect(() => {
    if (!(storeType === StoreTypes.B2B_STORETYPE)) {
      getDeliveryQuotations();
    }
  }, [
    `${watch("scheduledDate")}${watch("scheduledTime")}`,
    watch("deliveryOptionSelected"),
    JSON.stringify(deliveryAddress),
    orderType,
    cartList,
    storeId,
  ]);

  useEffect(() => {
    //Disable checkout if exceed SKU/Truck/Order limit or less than min order value
    if (storeType === StoreTypes.B2B_STORETYPE) {
      let exceedOrderLimit = checkCartQtyLimit();
      if (exceedOrderLimit || !minOrder || exceedLimit) {
        setDisableCheckout(true);
      } else {
        setDisableCheckout(false);
      }
    }
  }, [cartList, exceedLimit, minOrder]);

  useEffect(() => {
    //Disable checkout if exceed SKU/Truck/Order limit
    if (
      storeType !== StoreTypes.B2B_STORETYPE &&
      orderType === OrderTypes.DELIVERY
    ) {
      if (exceedLimit) {
        setDisableCheckout(true);
      } else {
        setDisableCheckout(false);
      }
    }
  }, [cartList, exceedLimit]);

  const checkOrderValue = (cartResp: any) => {
    let item = cartResp;
    if (!cartResp) {
      item = checkCartResponse;
    }
    let total: number =
      item?.subtotalWithTax === 0 ? item.subtotal : item?.subtotalWithTax;
    if (!cartResp) {
      total = total + getDeliveryFee();
    }
    if (minimumOrderValue && total < Number(minimumOrderValue)) {
      setMinOrder(false);
    } else {
      setMinOrder(true);
    }
  };

  // API Fetcher

  async function getDeliveryQuotations() {
    if (orderType === OrderTypes.DELIVERY) {
      setIsDeliveryOptionsLoading(true);
      if (cartList?.length <= 0) {
        setValue("deliveryOptionSelected", "");
        setIsDeliveryOptionsLoading(false);
        setDeliveryOptions([] as any);
        return;
      }
      const cartIds = cartList?.map(({ customerCartId }) => customerCartId);
      const res = await Promise.all([
        getStandardDeliveryQuote({ customerCartIds: cartIds }),
        getDeliveryQuote({ customerCartIds: cartIds }),
      ]);
      const options = res.reduce(
        (p, c) => (c?.length > 0 ? [...p, ...c] : p),
        []
      );
      if (options?.length > 0 && !watch("deliveryOptionSelected"))
        setValue("deliveryOptionSelected", options[0]?.name);
      setDeliveryOptions(options);
      setIsDeliveryOptionsLoading(false);
    }
  }

  async function getDeliveryQuote({
    customerCartIds,
  }: {
    customerCartIds: string[];
  }) {
    const { scheduledDate, scheduledTime } = getValues();
    const { selectedLatLng, postalCode, country, state, city, address } =
      deliveryAddress;

    const { isAdvancedOrder, scheduledDateTime } =
      IS_QL_EGGS || orderType !== OrderTypes.DELIVERY
        ? {
            isAdvancedOrder: false,
            scheduledDateTime: "",
          }
        : getAdvanceOrderFormatting(scheduledDate, scheduledTime);

    if (
      customerCartIds?.length > 0 &&
      postalCode?.length > 0 &&
      country?.length > 0 &&
      state?.length > 0 &&
      city?.length > 0
      // I don't think this one needs lat and lng
      /* &&
      selectedLatLng?.lat &&
      selectedLatLng?.lng */
    ) {
      setFetchingDeliveryOptions(true);
      const { hasError, value } = await getOnDemandDeliveryQuote({
        customerFirstName: "publicWeb",
        customerMobileNo: "publicWeb",
        customerLastName: "publicWeb",
        longitude: selectedLatLng?.lng,
        latitude: selectedLatLng?.lat,
        deliveryPostalCode: postalCode,
        deliveryAddress: address,
        deliveryCountry: country,
        deliveryState: state,
        deliveryCity: city,
        customerCartIds,
        promoCode,
        storeId,
        isAdvancedOrder: isAdvancedOrder,
        scheduledDateTime: scheduledDateTime,
      });
      if (!hasError) {
        setFetchingDeliveryOptions(false);
        const { deliveryOptions } = value;
        return deliveryOptions;
      } else {
        setFetchingDeliveryOptions(false);
        setValue("deliveryOptionSelected", "");
        setToastState({
          severity: "error",
          message: value,
          show: true,
          autoClose: false,
        });
        return [];
      }
    }
  }

  async function getStandardDeliveryQuote({
    customerCartIds,
  }: {
    customerCartIds: string[];
  }) {
    const { postalCode, country, address, state, city } = deliveryAddress;

    if (
      customerCartIds?.length > 0 &&
      postalCode?.length > 0 &&
      country?.length > 0 &&
      address?.length > 0 &&
      state?.length > 0 &&
      city?.length > 0
    ) {
      const { hasError, value } = await getStdDeliveryQuote({
        deliveryPostalCode: postalCode,
        customerFirstName: "publicWeb",
        customerMobileNo: "publicWeb",
        customerLastName: "publicWeb",
        deliveryAddress: address,
        deliveryCountry: country,
        deliveryState: state,
        deliveryCity: city,
        customerCartIds,
        promoCode,
        storeId,
      });

      if (!hasError) {
        const { deliveryOptions } = value;
        return deliveryOptions;
      } else {
        setToastState({
          severity: "error",
          message: value,
          show: true,
        });
        return [];
      }
    }
  }

  async function getCheckCart(customerCartIds: string[]) {
    setFetchingCheckCart(true);
    const isDelivery = orderType === OrderTypes.DELIVERY;
    const cookie = new Cookies();
    if (!(customerCartIds?.length > 0)) {
      setAdvanceOrderTimeSelection(null);
      setTruckScheduleSelection(null);
      setCheckCartResponse(null);
    } else {
      const customerId = cookie.get("sessionId");
      const { hasError, errorMessage, value } = await checkCartService({
        merchantId,
        customerCartIds,
        customerId,
        promoCode,
        postalCode: deliveryAddress?.postalCode,
        storeId,
        orderType,
        voucherCode: (currentVoucher as any)?.voucherId,
        voucherExpiryDate: (currentVoucher as any)?.expiryDate,
        isOwnTransportOption:
          isDelivery && watch("deliveryOptionSelected").includes("Transport"),
      });
      if (!hasError) {
        setCheckoutError(false);
        const {
          advancedOrderDateTimeSelection,
          customerOrderDetail,
          truckSelection,
          deliveryDiscount,
          ...remaining
        } = value;
        setAdvanceOrderTimeSelection(advancedOrderDateTimeSelection);
        setCheckCartResponse(remaining);
        setAppliedPromoCode(promoCode);
        setAppliedDeliveryDiscount(deliveryDiscount);
        setTruckScheduleSelection(truckSelection);
        setAppliedPromoCode(promoCode);
        if (storeType === StoreTypes.B2B_STORETYPE) {
          checkOrderValue(remaining);
        }
        if (customerOrderDetail && !redirectUserDetail) {
          setRedirectUserDetail(customerOrderDetail);
          setValue(
            "mobileCountryCode",
            customerOrderDetail?.phoneNumber?.substring(0, 3)
          );
          setValue(
            "mobileNumber",
            customerOrderDetail?.phoneNumber?.substring(3)
          );
          // setValue("deliveryFullAddress", deliveryAdd);
          setDeliveryAddress({
            ...deliveryAddress,
            selectedLatLng: {
              lat: customerOrderDetail.latitude,
              lng: customerOrderDetail.longitude,
            },
            address: customerOrderDetail.address,
            city: "Kuala Lumpur",
            country: "Malaysia",
            postalCode: customerOrderDetail.postalCode,
            state: "Kuala Lumpur",
          });
          setExceedLimit(false);
        }
        await hideToast();
        setErrorMessage("");
        if (
          storeType === StoreTypes.B2B_STORETYPE &&
          (!truckSelection || truckSelection.length === 0)
        ) {
          let msgKey = "Truck Capacity Limit Exceeded";
          setToastState({
            message: errorMsgMap[msgKey],
            severity: "error",
            show: true,
            autoClose:
              errorMessage ===
              "QL Exclusive Items Quantity Limit Per Order Exceeded"
                ? false
                : true,
          });
          setExceedLimit(true);
          setErrorMessage(errorMsgMap[msgKey]);
        }

        if (
          storeType !== StoreTypes.B2B_STORETYPE &&
          orderType === OrderTypes.DELIVERY &&
          watch("deliveryOptionSelected").includes("Transport") &&
          (!truckSelection || truckSelection.length === 0) &&
          !isFetchingDeliveryOptions
        ) {
          let msgKey = "Truck Capacity Limit Exceeded";
          setToastState({
            message: errorMsgMap[msgKey],
            severity: "error",
            show: true,
          });
          setExceedLimit(true);
          setErrorMessage(errorMsgMap[msgKey]);
        } else {
          setExceedLimit(false);
        }

        UpdateVoucherDataFromCheckCart(remaining);
      } else {
        if (errorMessage !== "Invalid promo code") {
          setCheckoutError(errorMessage !== "Purchase must exceed the minimum specified amount/item quantity");
        } else if (errorMessage === "Invalid promo code") {
          setPromocode("");
        }

        if (errorMessage === "Truck Schedule Not Found") {
          setExceedLimit(true);
          setTruckScheduleSelection(null);
        }

        if (errorMessage in errorMsgMap) {
          setAppliedPromoCode("");
          setToastState({
            message: errorMsgMap[errorMessage],
            severity: "error",
            show: true,
            autoClose:
              errorMessage ===
              "QL Exclusive Items Quantity Limit Per Order Exceeded"
                ? false
                : true,
          });

          if (
            errorMsgMap[errorMessage].includes(
              "Please reduce cart item quantity."
            )
          ) {
            setExceedLimit(true);
            if (errorMessage === "SKU Quantity Limit Per Order Exceeded") {
              getCartList();
            }
          } else {
            setExceedLimit(false);
          }
        } else {
          setExceedLimit(false);
          setAppliedPromoCode("");
          setToastState({
            message: errorMessage,
            severity: "error",
            autoClose:
              errorMessage ===
              "QL Exclusive Items Quantity Limit Per Order Exceeded"
                ? false
                : true,
            show: true,
          });
        }
        setErrorMessage("");
      }
    }
    setFetchingCheckCart(false);
  }

  async function getCheckCartLimit(
    customerCartIds: string[],
    scheduledDate: string
  ) {
    setFetchingCheckCart(true);

    const { hasError, errorMessage } = await checkCartLimitService({
      customerCartIds,
      scheduledDate,
    });

    if (hasError) {
      if (errorMessage in errorMsgMap) {
        setToastState({
          message: errorMsgMap[errorMessage],
          severity: "error",
          show: true,
        });
        if (
          errorMsgMap[errorMessage].includes(
            "Please reduce cart item quantity."
          )
        ) {
          setExceedLimit(true);
        } else {
          setExceedLimit(false);
        }
      } else {
        setExceedLimit(false);
        setToastState({
          message: "An error has occured while checking your cart.",
          severity: "error",
          show: true,
        });
      }
    } else {
      setExceedLimit(false);
    }
    setFetchingCheckCart(false);
  }

  // Place order functions

  async function placeCustomerOrder(value: any) {
    const IS_PAY_AT_COUNTER = value?.dineInPaymentMethod === "PayAtCounter";
    const IS_DINE_IN = orderType === OrderTypes.DINEIN;
    if (IS_DINE_IN && IS_PAY_AT_COUNTER) await handlePayAtCounter();
    else if (IS_MANUAL_PAYMENT) await handleManualPayment();
    else await handleGatewayPayment();
  }

  const callPlaceCustomerOrderToSQS = async (paymentType = "") => {
    try {
      const {
        deliveryOptionSelected,
        customerPrimaryEmail,
        customerFirstName,
        customerLastName,
        mobileCountryCode,
        billingCountry,
        billingPostcode,
        billingAddress,
        scheduledDate,
        scheduledTime,
        mobileNumber,
        billingState,
        billingCity,
        tableNumber,
        remarks,
        truckCapacityId,
        paymentMethod,
      } = getValues();

      const IS_B2B = storeType === StoreTypes.B2B_STORETYPE;

      const { isAdvancedOrder, scheduledDateTime } =
        IS_QL_EGGS || orderType === OrderTypes.DINEIN
          ? {
              isAdvancedOrder: false,
              scheduledDateTime: "",
            }
          : getAdvanceOrderFormatting(scheduledDate, scheduledTime);

      const customerCartIds = cartList?.map(({ customerCartId: id }) => id);
      const cookie = new Cookies();
      const customerId = cookie.get("sessionId");
      const signInData = cookie.get("signIn");
      return await API.graphql(
        graphqlOperation(placeCustomerOrderToSQS, {
          billingCountry:
            orderType === OrderTypes.DELIVERY ? billingCountry : "",
          deliveryLongitude: deliveryAddress?.selectedLatLng?.lng,
          deliveryLatitude: deliveryAddress?.selectedLatLng?.lat,
          customerMobileNo: `${mobileCountryCode}${mobileNumber}`,
          deliveryPostalCode: deliveryAddress?.postalCode || "",
          deliveryCountry: deliveryAddress?.country || "",
          deliveryAddress: deliveryAddress?.address || "",
          deliveryCity: deliveryAddress?.city || "",
          accessToken: signInData?.accessToken ?? "",
          deliveryState: deliveryAddress?.state,
          salesChannelName: _salesChannelName(),
          billingPostalCode: billingPostcode,
          customerFavouriteAddressId: "",
          customerFavouritePaymentId: "",
          paymentType: paymentType,
          storeId: storeId ?? "",
          customerPrimaryEmail,
          customerAccountNo: "",
          deliveryOptionSelected:
            orderType === OrderTypes.DELIVERY ? deliveryOptionSelected : "",
          isCustomerSignedIn: "",
          platform: "ecommerce",
          requiredCutlery: "",
          noteToRider: remarks,
          storeName: "",
          promoCode,
          scheduledDateTime,
          customerFirstName,
          customerLastName,
          customerCartIds,
          isAdvancedOrder:
            orderType === OrderTypes.DELIVERY &&
            watch("deliveryOptionSelected").includes("Transport")
              ? false
              : isAdvancedOrder,
          billingAddress,
          billingState,
          billingCity,
          tableNumber,
          customerId,
          orderType,
          remarks,
          scheduledDate: scheduledDate,
          scheduledTime: scheduledTime,
          truckCapacityId: truckCapacityId,
          paymentMethod,
          voucherCode: (currentVoucher as any)?.voucherId,
          voucherExpiryDate: (currentVoucher as any)?.expiryDate,
        })
      );
    } catch (err) {
      setToastState({
        message: "Something went wrong. Please try again later.",
        severity: "error",
        show: true,
      });
      return {
        data: { placeCustomerOrderToSQS: { status: "false" } },
      };
    }
  };

  const handlePayAtCounter = async () => {
    setRedirectingToGateway(true);
    const res = (await callPlaceCustomerOrderToSQS("PayAtCounter")) as any;
    if (res.data.placeCustomerOrderToSQS.status === "true") {
      const userCheckOutData = res.data.placeCustomerOrderToSQS.messageId;
      await new Promise((resolve) => setTimeout(resolve, 500));
      const paymentRes = await checkoutManualPayment(userCheckOutData);
      if (paymentRes?.orderNumber) {
        router.push({
          pathname: "/payment-confirmation",
          query: `orderNumber=${paymentRes.orderNumber}`,
        });
      } else {
        setToastState({
          show: true,
          severity: "error",
          message: "Something went wrong. Please try again later.",
        });
      }
    } else {
      setToastState({
        show: true,
        severity: "error",
        message: "Something went wrong. Please try again later.",
      });
    }
  };

  const handleGatewayPayment = async () => {
    const {
      data: { placeCustomerOrderToSQS },
    } = (await callPlaceCustomerOrderToSQS()) as any;
    if (placeCustomerOrderToSQS?.status === "true") {
      setRedirectingToGateway(true);
      await checkOutPayment(placeCustomerOrderToSQS?.messageId);
    } else {
      setToastState({
        message: "Something went wrong. Please try again later.",
        severity: "error",
        show: true,
      });
    }
  };

  const handleManualPayment = async () => {
    setRedirectingToGateway(true);
    const res = (await callPlaceCustomerOrderToSQS("ManualPayment")) as any;
    if (res.data.placeCustomerOrderToSQS.status === "true") {
      const userCheckOutData = res.data.placeCustomerOrderToSQS.messageId;
      await new Promise((resolve) => setTimeout(resolve, 500));
      const paymentRes = await checkoutManualPayment(userCheckOutData);

      if (paymentRes?.orderNumber) {
        router.push({
          pathname: "/mp",
          query: `id=${paymentRes.orderNumber}`,
        });
      } else {
        setToastState({
          show: true,
          severity: "error",
          message: "Something went wrong. Please try again later.",
        });
      }
    } else {
      setToastState({
        show: true,
        severity: "error",
        message: "Something went wrong. Please try again later.",
      });
    }
  };

  const checkoutManualPayment = async (checkOutId: string) => {
    const cookie = new Cookies();
    let signInData = cookie.get("signIn");
    try {
      if (retryCount.current < 10) {
        var params = {
          accessToken: signInData?.accessToken ?? "",
          messageId: checkOutId,
        };

        let { data: paymentResponse } = (await API.graphql(
          graphqlOperation(getCustomerOrderPaymentMessage, params)
        )) as any;

        retryCount.current += 1;
        if (paymentResponse.getCustomerOrderPaymentMessage !== null) {
          if (paymentResponse.getCustomerOrderPaymentMessage.errorMessage) {
            setToastState({
              show: true,
              severity: "error",
              message:
                paymentResponse.getCustomerOrderPaymentMessage.errorMessage,
            });
            return false;
          } else {
            generateAdwordPayload(
              "/payment",
              cookie.get("platformAccountId") ?? cookie.get("sessionId"),
              merchantId
            );
            return paymentResponse.getCustomerOrderPaymentMessage;
          }
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          if (checkOutId !== null) {
            return checkoutManualPayment(checkOutId);
          }
        }
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const checkOutPayment = async (checkOutId: string) => {
    const cookie = new Cookies();
    let signInData = cookie.get("signIn");
    try {
      if (retryCount.current < 10) {
        var params = {
          accessToken: signInData?.accessToken ?? "",
          messageId: checkOutId,
        };
        let { data: paymentResponse } = (await API.graphql(
          graphqlOperation(getCustomerOrderPaymentMessage, params)
        )) as any;
        retryCount.current += 1;
        if (paymentResponse.getCustomerOrderPaymentMessage !== null) {
          let platform = "ecommerce"; //temporary
          let url = "";
          let orderPaymentMessage =
            paymentResponse.getCustomerOrderPaymentMessage;
          if (paymentType !== "ManualPayment") {
            if (
              platform === "tngmp" ||
              (orderPaymentMessage.gatewayType &&
                orderPaymentMessage.gatewayType === "Stripe")
            ) {
              url = orderPaymentMessage.gatewayPaymentUrl;
            } else {
              url =
                orderPaymentMessage.gatewayPaymentUrl +
                "?" +
                orderPaymentMessage.gatewayPaymentParams;
            }
          }
          if (
            paymentResponse.getCustomerOrderPaymentMessage.errorMessage !== null
          ) {
            setToastState({
              show: true,
              severity: "error",
              message:
                paymentResponse.getCustomerOrderPaymentMessage.errorMessage,
            });
          } else {
            generateAdwordPayload(
              "/payment",
              cookie.get("platformAccountId") ?? cookie.get("sessionId"),
              merchantId
            );
            if (platform !== "tngmp") {
              setTimeout(() => {
                window.location.assign(url);
              }, 2000);
            }
          }
        } else {
          setTimeout(() => {
            if (checkOutId !== null) {
              checkOutPayment(checkOutId);
            } else {
            }
          }, 5000);
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };

  // Utils

  function hideToast() {
    return new Promise((resolve) => {
      setTimeout(
        resolve,
        1000,
        setToastState({ show: false, autoClose: false })
      );
    });
  }

  function _salesChannelName() {
    const onlineStore = "Online Store";
    const facebookLive = "Facebook Live";

    if (checkCartResponse) {
      const allFacebookLive = (checkCartResponse as any)?.cartItems?.every(
        ({ salesChannelName: s }) => s === "Facebook Live"
      );
      return allFacebookLive ? facebookLive : onlineStore;
    }
    return onlineStore;
  }

  async function updateCart() {
    const cartIds = cartList?.map(({ customerCartId }) => customerCartId);

    if (!isFetchingCheckCart) await getCheckCart(cartIds);
    if (!isFetchingDeliveryOptions)
      await getDeliveryQuote({ customerCartIds: cartIds });
  }

  function getAdvanceOrderFormatting(
    advOrderDate: string,
    advOrderTime: string
  ) {
    if (advOrderDate?.length === 0 || advOrderTime?.length === 0)
      return { isAdvancedOrder: false, scheduledDateTime: "" };
    if (advOrderTime === "ASAP")
      return { isAdvancedOrder: false, scheduledDateTime: "" };
    else {
      const oriDate = new Date(`${advOrderDate} ${advOrderTime}`);
      return {
        scheduledDateTime: `${oriDate?.toJSON()?.replace(".000Z", ".000000Z")}`,
        isAdvancedOrder: true,
      };
    }
  }

  function getDeliveryFee() {
    const isDelivery = orderType === OrderTypes.DELIVERY;
    const hasDeliveryOptions =
      deliveryOptions && (deliveryOptions as any)?.length > 0;
    if (!(isDelivery && hasDeliveryOptions)) return 0;
    else {
      const { deliveryOptionSelected } = getValues();
      const hasOptions = (deliveryOptions as any)?.filter(
        ({ name }) => name === deliveryOptionSelected
      );
      return hasOptions?.length > 0 ? hasOptions[0]?.rate : 0;
    }
  }

  return {
    onSubmit: handleSubmit(placeCustomerOrder),
    onApplyPromocode: setPromocode,
    appliedPromoCode,
    advancedOrderTimeSelection,
    truckScheduleSelection,
    isDeliveryOptionsLoading,
    redirectingToGateway,
    isFetchingCheckCart,
    warungStoreIsOpen,
    checkCartResponse,
    deliveryOptions,
    paymentMethodOptions,
    getDeliveryFee,
    isSubmitting,
    updateCart,
    storeType,
    qtyLimitPerOrder,
    minOrder,
    minimumOrderValue,
    disableCheckout,
    checkoutError,
    errorMessage,
    clearErrors,
    setValue,
    register,
    isValid,
    errors,
    watch,
    CheckoutVoucherModal,
    toggleVoucherModal,
    currentVoucher,
    onApplyVoucher: setCurrentVoucherWithID,
    deliveryDiscount: appliedDeliveryDiscount,
  };
}

async function getOnDemandDeliveryQuote(params: {
  deliveryPostalCode: string;
  scheduledDateTime: string;
  isAdvancedOrder: boolean;
  customerCartIds: string[];
  customerFirstName: string;
  customerLastName: string;
  customerMobileNo: string;
  deliveryAddress: string;
  deliveryCountry: string;
  deliveryState: string;
  deliveryCity: string;
  promoCode: string;
  longitude: number;
  latitude: number;
  storeId: string;
}) {
  try {
    const { data } = (await API.graphql(
      graphqlOperation(getDeliveryQuotation, params)
    )) as any;
    const { getDeliveryQuotation: quotationResp } = data;
    return {
      hasError: quotationResp?.status === "false",
      value:
        quotationResp?.status === "false"
          ? "An error has occured while fetching delivery quotation."
          : quotationResp,
    };
  } catch (e: any) {
    return {
      value: "An error has occured while fetching delivery quotation.",
      hasError: true,
    };
  }
}

async function getStdDeliveryQuote(params: {
  customerCartIds: string[];
  customerFirstName: string;
  customerLastName: string;
  customerMobileNo: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryCountry: string;
  deliveryPostalCode: string;
  deliveryState: string;
  promoCode: string;
  storeId: string;
}) {
  try {
    const { data } = (await API.graphql(
      graphqlOperation(getStandardDeliveryQuotation, params)
    )) as any;
    const { getStandardDeliveryQuotation: quotationResp } = data;
    return {
      hasError: quotationResp?.status === "false",
      value:
        quotationResp?.status === "false"
          ? "An error has occured while fetching delivery quotation."
          : quotationResp,
    };
  } catch (e: any) {
    return {
      value: "An error has occured while fetching delivery quotation.",
      hasError: true,
    };
  }
}

async function checkCartService({
  customerCartIds,
  promoCode = "",
  customerId,
  storeId,
  orderType,
  postalCode,
  voucherCode,
  voucherExpiryDate,
  merchantId,
  isOwnTransportOption,
}: {
  customerCartIds: string[];
  customerId: string;
  promoCode: string;
  postalCode: string;
  storeId: string;
  orderType: string;
  voucherCode: String;
  voucherExpiryDate: String;
  merchantId: string;
  isOwnTransportOption: boolean;
}) {
  try {
    const params = {
      customerCartIds,
      customerId,
      promoCode,
      postalCode,
      storeId,
      orderType,
      voucherCode,
      voucherExpiryDate,
      merchantId,
      isOwnTransportOption,
    };
    const { data } = (await API.graphql(
      graphqlOperation(checkCart, params)
    )) as any;
    const { checkCart: checkCartResp } = data;
    return {
      hasError: checkCartResp?.status === "false",
      errorMessage: checkCartResp?.message,
      value: checkCartResp,
    };
  } catch (e: any) {
    return {
      value: "An error has occured while checking your cart.",
      errorMessage: "",
      hasError: true,
    };
  }
}

async function checkCartLimitService({
  customerCartIds,
  scheduledDate,
}: {
  customerCartIds: string[];
  scheduledDate: string;
}) {
  try {
    const params = {
      customerCartIds,
      scheduledDate,
    };
    const { data } = (await API.graphql(
      graphqlOperation(checkCartLimit, params)
    )) as any;

    const { checkCartLimit: checkCartLimitResp } = data;

    return {
      hasError: checkCartLimitResp?.status === "false",
      errorMessage: checkCartLimitResp?.message,
    };
  } catch (e: any) {
    return {
      errorMessage: "An error has occured while checking your cart.",
      hasError: true,
    };
  }
}
