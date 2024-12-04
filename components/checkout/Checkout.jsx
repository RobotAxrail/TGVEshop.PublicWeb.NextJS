import React, { useState, useContext, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import useTranslation from 'next-translate/useTranslation';

// components
import CartProgress from "@/components/stepper/CartProgress";
import ShippingInfo from "@/components/checkout/ShippingInfo";
import { ContainedButton } from "@/components/buttons/Buttons";
import { Checkbox, RadioButton, RectTextarea } from "@/components/inputs/Input";
import OrderSummary from "@/components/checkout/OrderSummary";
import OptionCard from "./OptionCard";
import PriceWithCurrency from "@/components/priceWithCurrency/PriceWithCurrency";
import { Loader } from "../loader/Loader";
import Select from "react-select";
// import EditAddressModal from "@/components/checkout/EditAddressModal";
import ProductModifierModal from "@/components/productDetail/ProductModifier/ProductModifierModal";
import DialogModal from "@/components/dialog/DialogModal";
import moment from "moment";

import { useOrder } from "@/contexts/OrderContext";
import MerchantContext from "@/contexts/MerchantContext";
import { useStoreOperatingHour } from "@/contexts/StoreOperatingHourContext";

import {
  getStates,
  getCities,
  listOfCountries,
} from "@/utils/state_postcode.util";
import { getSelectedModifiersToDisplayList } from "@/utils/util";
import _ from "lodash";

import { FormattedNumber } from "react-intl";
import { useProductModifiers } from "@/hooks/useProductModifiers";
import {
  OrderModalStateActions,
  StoreTypes,
  OrderTypes,
  legalPoliciesType,
} from "@/enums/enums";
import AspectRatioSquareContainer from "../shared/AspectRatioSquareContainer";
import useMultiStoreDelivery from "@/components/AxrailCommerce/MultiStoreDeliverySelector/hooks/useMultiStoreDelivery";

const Checkout = (props) => {
  const {
    customerData,
    setCustomerData,
    scheduledDateTime,
    setScheduledDateTime,
    isAdvancedOrder,
    setIsAdvancedOrder,
    isAuthenticated,
    addressList,
    handleNextPage,
    isSameAddress,
    setIsSameAddress,
    isSecondPage,
    setIsSecondPage,
    deliveryOption,
    isLoadingDeliveryOption,
    checkCartResp, // checkCart response
    setPromoCode, // input for promocode field
    promoCode, // input for promocode field
    fetchCheckCart, // function to fetch check cart
    totalValue, // order summary total
    setTotalValue, // order summary total
    promoCodeAppliedValue, // value of applied promocode
    selectedDeliveryOption, // selected delivery option object
    setSelectedDeliveryOption, // selected delivery option object
    removePromoCode, // function to remove promo
    isLoadingCheckCart,
    handlePayment,
    isLoadingPayment,
    remarks,
    setRemarks,
    shippingAddressSelection,
    setShippingAddressSelection,
    billingAddressSelection,
    setBillingAddressSelection,
    handleManualPayment,
    setNoteToRider,
    noteToRider,
    setCurrCountry,
  } = props;
  const { storeType, footerItemLists, currency, paymentType, merchantId } =
    useContext(MerchantContext);
  const { orderType, dispatchOrderModalState } = useOrder();
  const listOfStates = getStates();
  const router = useRouter();
  const {
    deliveryModalValues,
    pickupModalValues,
    isMultistore,
    isDelivery,
    setForceShow,
  } = useMultiStoreDelivery();
  const { landingPageData } = useStoreOperatingHour();
  // const { cartList } = useCart();
  // const [cartSelectedItems, setCartSelectedItems] = useState([])
  // is default shipping & billing
  const [defaultShipping, setDefaultShipping] = useState(0);

  const [showAddressModal, setShowAddressModal] = useState(false);

  // const [selectedManualPaymentOptionId, setSelectedManualPaymentOptionId] =
  //   useState("");
  const [termsAndConditionChecked, setTermsAndConditionChecked] =
    useState(false);

  const [updateProductModifierIsLoading, setUpdateProductModifierIsLoading] =
    useState(false);

  const {
    handleUpdateProductModifierSelectionInCustomerCart,
    handleToggleEditModifier,
    handleCloseProductModifierModal,
    productModifierModalState,
    handleAddItemToCart,
    handleMinusItemFromCart,
  } = useProductModifiers();

  const { t } = useTranslation('common');

  const handleAddressSelection = (item, type) => {
    if (type === "Shipping") {
      setShippingAddressSelection(item.customerFavouriteAddressId);
      setCustomerData({
        ...customerData,
        deliveryAddress: item.addressDetail
          ? item.addressDetail + ", " + item.address
          : item.address,
        deliveryPostalCode: item.postalCode,
        deliveryCity: item.city,
        deliveryState: item.state,
        deliveryCountry: item.country,
      });
    } else if (type === "Billing") {
      setBillingAddressSelection(item.customerFavouriteAddressId);
      setCustomerData({
        ...customerData,
        billingCountry: item.country,
        billingPostalCode: item.postalCode,
        billingAddress: item.addressDetail
          ? item.addressDetail + ", " + item.address
          : item.address,
        billingState: item.state,
        billingCity: item.city,
      });
    }

    if (item === "addNewAddress") {
      if (storeType !== StoreTypes.AC_STORETYPE)
        dispatchOrderModalState({
          type: OrderModalStateActions.ADD_ADDRESS,
        });
      else
        router.push({
          pathname: "/edit-address-book",
          query: "return=checkout",
        });
    }
  };

  //Modify Data
  const inputOnChange = (e, setData) => {
    if (e.target.value === " ") {
      setData((data) => ({
        ...data,
        [e.target.name]: "",
      }));
    } else {
      if (["billingPostalCode", "deliveryPostalCode"].includes(e.target.name)) {
        if (e.target.value.length <= 5 && e.target.value.length > 0) {
          setData((data) => ({
            ...data,
            [e.target.name]: e.target.value,
          }));
        }
        if (e.target.value.length === 0) {
          setData((data) => ({
            ...data,
            [e.target.name]: e.target.value,
            deliveryState: "",
            deliveryCity: "",
          }));
        }
      } else {
        setData((data) => ({
          ...data,
          [e.target.name]: e.target.value,
        }));
      }
    }
  };

  const handleOnSubmitModifierModal = async (modifierGroupsState) => {
    setUpdateProductModifierIsLoading(true);
    const { selectedModifierGroups, quantity } = modifierGroupsState;
    const res = await handleUpdateProductModifierSelectionInCustomerCart(
      productModifierModalState.data.customerCartId,
      quantity,
      selectedModifierGroups
    );
    setTimeout(() => {
      fetchCheckCart();
      setUpdateProductModifierIsLoading(false);
    }, [1000]);
    return res;
  };

  //commented out due to data being overwritten when inputting causing users to be frustrated
  // useEffect(() => {
  //   if (customerData.deliveryPostalCode.length === 5) {
  //     const result = findPostcode(customerData.deliveryPostalCode);
  //     if (result.found === true) {
  //       setCustomerData({
  //         ...customerData,
  //         deliveryState: result.state,
  //         deliveryCity: result.city,
  //       });
  //     } else
  //       setCustomerData({
  //         ...customerData,
  //         deliveryState: "",
  //         deliveryCity: "",
  //       });
  //   }
  //   if (customerData.billingPostalCode.length === 5) {
  //     const result = findPostcode(customerData.billingPostalCode);
  //     if (result.found === true) {
  //       setCustomerData({
  //         ...customerData,
  //         billingState: result.state,
  //         billingCity: result.city,
  //       });
  //     } else
  //       setCustomerData({
  //         ...customerData,
  //         billingState: "",
  //         billingCity: "",
  //       });
  //   }
  // }, [customerData.deliveryPostalCode, customerData.billingPostalCode]);

  //temp address state to store before saving to customerData
  const [tempAddressState, setTempAddressState] = useState({
    deliveryAddress: customerData.deliveryAddress,
    deliveryPostalCode: customerData.deliveryPostalCode,
    deliveryCity: customerData.deliveryCity,
    deliveryState: customerData.deliveryState,
    deliveryCountry: customerData.deliveryCountry,
  });

  const isThereAtLeast1ErrorInCartItem =
    checkCartResp.cartItems?.length > 0
      ? checkCartResp?.cartItems?.some((cartItem) => cartItem.errorMessage)
      : false;

  useEffect(() => {
    if (isSecondPage) {
      window.scrollTo(0, 0);
      setTempAddressState({ ...customerData });
    }
  }, [isSecondPage, customerData]);

  const [selectedDate, setSelectedDate] = useState(
    moment(Date.now()).format("YYYY-MM-DD")
  );
  const [selectedTime, setSelectedTime] = useState("ASAP");
  const selectInputRef = useRef();

  const DateDropDownComponent = () => {
    let DATE_OPTION = [];

    checkCartResp?.advancedOrderDateTimeSelection?.map((data) => {
      DATE_OPTION.push({
        value: data.advancedOrderDateSelection,
        label: data.advancedOrderDateSelection,
      });
    });

    return (
      <div>
        <Select
          options={DATE_OPTION}
          value={{
            value: selectedDate,
            label: selectedDate,
          }}
          type="select"
          name={selectedDate}
          isSearchable={false}
          // isLoading={storeIsLoading}
          onChange={({ value }) => {
            setSelectedDate(value);
            setIsAdvancedOrder(false);
            setSelectedTime("");
            setScheduledDateTime("");
            selectInputRef.current.select.clearValue();
          }}
        />
      </div>
    );
  };

  const TimeDropDownComponent = () => {
    let DATE_OPTIONS = [];

    checkCartResp?.advancedOrderDateTimeSelection?.map((data) => {
      DATE_OPTIONS.push(data.advancedOrderDateSelection);
    });

    let TIME_OPTION = [];
    let TEMP_ARRAY = [];
    let ASAP_OPTION = [{ value: "ASAP", label: "ASAP" }];

    checkCartResp?.advancedOrderDateTimeSelection?.map((data) => {
      data.advancedOrderDateSelection === selectedDate
        ? data.advancedOrderTimeSelection.map((time) => {
            if (selectedDate === DATE_OPTIONS[0]) {
              TEMP_ARRAY.push({ value: time, label: time });
              TIME_OPTION = ASAP_OPTION.concat(TEMP_ARRAY);
            } else {
              TIME_OPTION.push({ value: time, label: time });
            }
          })
        : null;
    });

    console.log(TIME_OPTION[0]);

    return (
      <div className="relative w-full lg:max-w-sm">
        <Select
          options={TIME_OPTION}
          value={{
            value: selectedTime,
            label: selectedTime,
          }}
          ref={selectInputRef}
          type="select"
          name={selectedTime}
          isSearchable={false}
          defaultValue={TIME_OPTION[0]}
          // isLoading={storeIsLoading}
          onChange={({ value }) => {
            setSelectedTime(value);
            if (value === "ASAP") {
              setIsAdvancedOrder(false);
            } else {
              setIsAdvancedOrder(true);
            }
            if (value === "ASAP") {
              setScheduledDateTime("");
            } else {
              const time = value.split(":");
              const hour = Math.abs(time[0] - 8);
              if (hour < 10) {
                hour = "0" + hour;
              }
              const minute = time[1];
              setScheduledDateTime(
                selectedDate + "T" + hour + ":" + minute + ":00.000000Z"
              );
            }
          }}
        />
      </div>
    );
  };

  //Delivery Selection & Calculation
  const handleDeliveryChange = (event) => {
    setSelectedDeliveryOption(event);
    if (!promoCodeAppliedValue.isFreeDelivery) {
      setTotalValue(
        checkCartResp.subtotalWithTax + event.rate - checkCartResp.discount
      );
    }
  };

  const handleOnSaveEditAddressModal = () => {
    setCustomerData((data) => ({ ...data, ...tempAddressState }));
    setShowAddressModal(false);
  };

  const checkVisibility = (policyType) => {
    return footerItemLists?.some(
      (legalPolicy) =>
        legalPolicy.footerType === policyType && legalPolicy.display === true
    );
  };

  useEffect(() => {
    if (deliveryOption.length > 0) {
      handleDeliveryChange(deliveryOption[0]);
    }
  }, [deliveryOption]);

  return (
    <div className="p-3 lg:p-0 sm:mt-5">
      <div className="flex flex-col justify-between xs:flex-row">
        <div className="md:w-full my-auto mt-5">
          <a
            className="cursor-pointer"
            onClick={() => {
              if (isSecondPage) setIsSecondPage(false);
              else router.back();
            }}
          >
            &#8592; {isSecondPage ? t('Back to info') : t('Back to cart')}
          </a>
        </div>

        <div className="md:w-full">
          <h1 className="mx-8 text-2xl sm:text-3xl text-center">
            {isSecondPage ? t('Checkout') : t('Info')}
          </h1>
        </div>
        <div className="md:w-full">
          {/* todo ??? */}
          <CartProgress activeStep={1} />
        </div>
      </div>
      {/* deliveryModalValues, pickupModalValues, isMultistore, servingTime,
      servingDate, isDelivery, */}
      <div className="bg-white border rounded-lg p-6 sm:p-10 flex flex-col md:flex-row">
        {isSecondPage ? (
          <>
            <div className="w-full md:w-1/2 lg:w-2/3 mr-[5rem]">
              {isMultistore && (
                <>
                  <div className="flex flex-row gap-3 items-start mb-5">
                    <div className="font-bold">
                      {isDelivery() && t('Deliver to:')}
                      {!isDelivery() && t('Pickup from:')}
                    </div>
                    <div className="max-w-[500px]">
                      {isDelivery() && (
                        <p className="m-0">{deliveryModalValues?.address}</p>
                      )}
                      {!isDelivery() && (
                        <p className="m-0">{pickupModalValues?.storeName}</p>
                      )}
                    </div>
                  </div>
                  {isDelivery() && (
                    <div className="mb-10">
                      <h3 className="m-0 mb-5">{t('Delivery Options')}</h3>
                      <div
                        className={[
                          "md:grid  md:gap-2",
                          deliveryOption.length === 0
                            ? "md:grid-cols-1"
                            : "md:grid-cols-2",
                        ].join(" ")}
                      >
                        {isLoadingDeliveryOption ? (
                          <Loader divHeight={"h-[80px]"} />
                        ) : deliveryOption.length !== 0 ? (
                          deliveryOption.map((item, index) => {
                            return (
                              <OptionCard
                                cardClassName="mb-3 md:mb-0"
                                key={index}
                                handleOnClickAction={() =>
                                  handleDeliveryChange(item)
                                }
                                spanContent={
                                  <>
                                    <span className="font-bold text-base">
                                      {item.name}
                                    </span>
                                    <div className="text-[15px] font-semibold">
                                      <FormattedNumber
                                        {...{
                                          value: item.rate,
                                          style: "currency",
                                          currency: currency,
                                        }}
                                      />
                                    </div>
                                    <div className="text-[12px]">
                                      {item.estimatedDuration}
                                    </div>
                                  </>
                                }
                                radioButtonContent={
                                  <RadioButton
                                    checked={
                                      selectedDeliveryOption.name === item.name
                                    }
                                    label="storeToStoreDelivery"
                                    value={item.name}
                                  />
                                }
                              />
                            );
                          })
                        ) : (
                          <span className="text-red-500">
                            {t('Sorry, your shipping')}{" "}
                            <span
                              className="cursor-pointer underline text-blue-400"
                              onClick={() =>
                                isMultistore
                                  ? setForceShow(true)
                                  : dispatchOrderModalState({
                                      type: OrderModalStateActions.EDIT_ADDRESS,
                                      data: {
                                        addressDetailToEdit: addressList.find(
                                          (address) =>
                                            address.customerFavouriteAddressId ===
                                            shippingAddressSelection
                                        ),
                                        closeAfterSubmitting: true,
                                      },
                                    })
                              }
                            >
                              {t('edit')}
                            </span>{" "}
                            {t('your address')}.
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
              {!isMultistore && (
                <>
                  {orderType !== OrderTypes.DINEIN && (
                    <div className="flex mb-10">
                      <div className="font-bold ">
                        {orderType === OrderTypes.DELIVERY && t('Deliver to:')}
                        {orderType === OrderTypes.PICKUP && t('Pickup from:')}
                      </div>
                      <div className="flex flex-col ml-3">
                        {orderType === OrderTypes.DELIVERY && (
                          <>
                            <div className="my-0">
                              {customerData.customerFirstName} (
                              {customerData.customerMobileNo})
                            </div>
                            <div>
                              <span>{customerData.deliveryAddress}</span>
                              {storeType === StoreTypes.AC_STORETYPE && (
                                <p className="m-0">
                                  {customerData.deliveryPostalCode}
                                  {customerData.deliveryCity && (
                                    <>
                                      {", "}
                                      {customerData.deliveryCity}
                                    </>
                                  )}
                                  {customerData.deliveryState && (
                                    <>
                                      {", "}
                                      {customerData.deliveryState}
                                    </>
                                  )}
                                  {customerData.deliveryCountry && (
                                    <>
                                      {", "}
                                      {customerData.deliveryCountry}
                                    </>
                                  )}
                                </p>
                              )}
                            </div>
                          </>
                        )}
                        {orderType === OrderTypes.PICKUP && (
                          <div>{landingPageData.address}</div>
                        )}
                      </div>
                    </div>
                  )}
                  {orderType === OrderTypes.DELIVERY && (
                    <>
                      <div className="mb-10">
                        <h3 className="m-0 mb-5">{t('Delivery Options')}</h3>
                        <div
                          className={[
                            "md:grid  md:gap-2",
                            deliveryOption.length === 0
                              ? "md:grid-cols-1"
                              : "md:grid-cols-2",
                          ].join(" ")}
                        >
                          {isLoadingDeliveryOption ? (
                            <Loader divHeight={"h-[80px]"} />
                          ) : deliveryOption.length !== 0 ? (
                            deliveryOption.map((item, index) => {
                              return (
                                <OptionCard
                                  cardClassName="mb-3 md:mb-0"
                                  key={index}
                                  handleOnClickAction={() =>
                                    handleDeliveryChange(item)
                                  }
                                  spanContent={
                                    <>
                                      <span className="font-bold text-base">
                                        {item.name}
                                      </span>
                                      <div className="text-[15px] font-semibold">
                                        <FormattedNumber
                                          {...{
                                            value: item.rate,
                                            style: "currency",
                                            currency: currency,
                                          }}
                                        />
                                      </div>
                                      <div className="text-[12px]">
                                        {item.estimatedDuration}
                                      </div>
                                    </>
                                  }
                                  radioButtonContent={
                                    <RadioButton
                                      checked={
                                        selectedDeliveryOption.name ===
                                        item.name
                                      }
                                      label="storeToStoreDelivery"
                                      value={item.name}
                                    />
                                  }
                                />
                              );
                            })
                          ) : (
                            <span className="text-red-500">
                             {t('Sorry, your shipping')}{" "}
                              <span
                                className="cursor-pointer underline text-blue-400"
                                onClick={() =>
                                  isMultistore
                                    ? setForceShow(true)
                                    : dispatchOrderModalState({
                                        type: OrderModalStateActions.EDIT_ADDRESS,
                                        data: {
                                          addressDetailToEdit: addressList.find(
                                            (address) =>
                                              address.customerFavouriteAddressId ===
                                              shippingAddressSelection
                                          ),
                                          closeAfterSubmitting: true,
                                        },
                                      })
                                }
                              >
                                {t('edit')}
                              </span>{" "}
                              {t('your address')}.
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* advanced order selection*/}

                  {orderType !== OrderTypes.DINEIN &&
                  storeType === StoreTypes.WARUNG_STORETYPE ? (
                    checkCartResp?.advancedOrderDateTimeSelection ? (
                      <div className="md:pb-0 mb-10">
                        <h3 className="m-0 mb-5">
                          {orderType === OrderTypes.DELIVERY && t('Deliver Time:')}
                          {orderType === OrderTypes.PICKUP &&
                            t('Select the time')}
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="m-0 mb-5">{t('Date Selection')}</h4>
                            <DateDropDownComponent></DateDropDownComponent>
                          </div>
                          <div>
                            <h4 className="m-0 mb-5">{t('Time Selection')}</h4>
                            <TimeDropDownComponent></TimeDropDownComponent>
                          </div>
                        </div>
                      </div>
                    ) : null
                  ) : null}

                  {storeType !== StoreTypes.WARUNG_STORETYPE &&
                    checkCartResp?.advancedOrderDateTimeSelection && (
                      <div className="md:pb-0 mb-10">
                        {orderType === OrderTypes.DELIVERY && t('Deliver Time:')}
                        {orderType === OrderTypes.PICKUP &&
                           t('Select the time')}
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div>
                            <h4 className="m-0 mb-1">{t('Date Selection')}</h4>
                            <DateDropDownComponent></DateDropDownComponent>
                          </div>
                          <div>
                            <h4 className="m-0 mb-1">{t('Time Selection')}</h4>
                            <TimeDropDownComponent></TimeDropDownComponent>
                          </div>
                        </div>
                      </div>
                    )}
                </>
              )}
              {/* item details*/}
              <div className="md:pb-0 mb-10">
                <h3 className="m-0 mb-5">{t('Item Details')}</h3>
                {/* {isLoadingCheckCart ? (
                  <Loader divHeight={"h-[80px]"} />
                ) : ( */}
                {checkCartResp?.status === "false" &&
                  !checkCartResp?.cartItems?.length && (
                    <label className="text-[red]">
                      {checkCartResp?.message}
                    </label>
                  )}
                {/* selected cart items */}
                {checkCartResp?.cartItems?.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="flex mb-8"
                      onClick={() =>
                        item.selectedModifierGroups?.length > 0
                          ? handleToggleEditModifier(item)
                          : undefined
                      }
                    >
                      <div className="cursor-pointer flex w-full">
                        <div className="flex mr-5 sm:mr-8 items-center">
                          <div className="min-w-[1.5rem] mr-5 sm:mr-8">
                            <span className="mr-5 sm:mr-8">
                              {item.quantity}
                            </span>
                            <span className="mt-1 text-xs">&#10005;</span>
                          </div>
                          <div className="ml-3 min-w-[80px] hidden lg:block">
                            <AspectRatioSquareContainer>
                              <Image
                                src={process.env.BUCKET_URL + item.itemImage}
                                layout="fill"
                                objectFit="cover"
                                alt={item.itemTitle}
                              />
                            </AspectRatioSquareContainer>
                          </div>
                        </div>
                        <div className="flex w-full items-center">
                          <div className="flex flex-col w-full mr-8 cursor-pointer">
                            <div className="font-normal">{item.itemTitle}</div>
                            {item.selectedModifierGroups?.length > 0 &&
                              getSelectedModifiersToDisplayList(
                                item.selectedModifierGroups
                              ).map((modifierName) => (
                                <div className="text-[0.8rem]">
                                  {modifierName}
                                </div>
                              ))}
                          </div>
                          <div className="flex flex-col w-full justify-center">
                            {[null, 0].includes(item.deliveryCompareAtPrice) ? (
                              <PriceWithCurrency
                                value={
                                  item.subtotalWithTax
                                    ? item.subtotalWithTax
                                    : item.subtotal
                                }
                              />
                            ) : (
                              <>
                                <span className="text-[red] font-semibold">
                                  <PriceWithCurrency
                                    value={
                                      item.subtotalWithTax
                                        ? item.subtotalWithTax
                                        : item.subtotal
                                    }
                                  />
                                </span>
                                <span className="line-through text-[grey]">
                                  <PriceWithCurrency
                                    value={
                                      item.quantity *
                                      item.deliveryCompareAtPrice
                                    }
                                  />
                                </span>
                              </>
                            )}

                            {item.errorMessage && (
                              <div className="text-sm text-red-600 mt-3">
                                {item.errorMessage}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
                {/* free items from promocode buy x free y */}
                {promoCodeAppliedValue?.freeItemList?.map((item, index) => {
                  return (
                    <li key={index} className="flex items-center ">
                      <div className="flex my-3 ">
                        <div className="mx-3 min-w-[56px]">
                          <Image
                            src={process.env.BUCKET_URL + item.itemImage}
                            width={80}
                            height={80}
                            alt={item.itemTitle}
                          />
                        </div>
                      </div>
                      <div className="flex w-full">
                        <div className="flex flex-col w-full mr-8">
                          <div className="font-semibold">{item.itemTitle}</div>
                          <div>x{item.quantity}</div>
                        </div>
                        <div className="flex flex-col w-full">
                          {item.isFreeItem ? (
                            <span className="text-[green] font-semibold">
                              {t('Free')}
                            </span>
                          ) : (
                            <>
                              <span className="text-[red] font-semibold">
                                <PriceWithCurrency
                                  value={
                                    item.subtotalWithTax
                                      ? item.subtotalWithTax
                                      : item.subtotal
                                  }
                                />
                              </span>
                              <span className="line-through text-[grey]">
                                <PriceWithCurrency
                                  value={
                                    item.quantity *
                                    (item.deliveryPriceWithTax
                                      ? item.deliveryPriceWithTax
                                      : item.deliveryPrice)
                                  }
                                />
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </div>
              {/* <div>
                {merchantInfoContext.paymentType === "ManualPayment" &&
                manualPaymentOptionsList?.length ? (
                  <div className="mb-5">
                    <h3 className="m-0 mb-8">Payment Options</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {manualPaymentOptionsList.map((paymentOption) => (
                        <>
                          <div
                            className="h-auto flex cursor-pointer mb-[1.5rem]"
                            onClick={() =>
                              setSelectedManualPaymentOptionId(
                                paymentOption.manualPaymentOptionsId
                              )
                            }
                          >
                            <label className="mr-8">
                              <RadioButton
                                checked={
                                  selectedManualPaymentOptionId ===
                                  paymentOption.manualPaymentOptionsId
                                }
                                label={paymentOption.manualPaymentMethodName}
                                value={
                                  paymentOption.isBankTransfer
                                    ? `Manual Bank Transfer - ${paymentOption.manualPaymentMethodName}`
                                    : paymentOption.manualPaymentMethodName
                                }
                              />
                            </label>

                            {paymentOption.isBankTransfer ? (
                              <div className="flex-col">
                                <div className="font-semibold">
                                  Manual Bank Transfer
                                </div>
                                <div>{`${paymentOption.manualPaymentMethodName} - ${paymentOption.accountNumber}`}</div>
                              </div>
                            ) : (
                              <span className="font-semibold">
                                {paymentOption.manualPaymentMethodName}
                              </span>
                            )}
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                ) : undefined}
              </div> */}
              {orderType === OrderTypes.DELIVERY &&
                selectedDeliveryOption.name === "On Demand" && (
                  <div className="mb-10 sm:mb-5">
                    <h3 className="m-0 mb-5">{t('Note to rider')}</h3>
                    <div className="w-full md:w-[90%] md:min-w-[23rem] text-sm">
                      <RectTextarea
                        className="h-20"
                        name="note to rider"
                        value={noteToRider}
                        onChange={setNoteToRider}
                        placeholder={t('Add note to rider')}
                      />
                    </div>
                  </div>
                )}
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3">
              <OrderSummary
                checkCartResp={checkCartResp}
                totalValue={totalValue}
                promoCodeAppliedValue={promoCodeAppliedValue}
                selectedDeliveryOption={selectedDeliveryOption}
                setPromoCode={setPromoCode}
                promoCode={promoCode}
                fetchCheckCart={fetchCheckCart}
                removePromoCode={removePromoCode}
                remarks={remarks}
                setRemarks={setRemarks}
                orderType={orderType}
                storeType={storeType}
              />
            </div>
          </>
        ) : (
          <div className="w-full">
            {" "}
            <ShippingInfo
              title={
                orderType === OrderTypes.DELIVERY
                  ? t('Shipping Info')
                  : isAuthenticated
                  ? t('Customer Info')
                  : t('Guest Info')
              }
              isAuth={isAuthenticated}
              customerData={customerData}
              setCustomerData={setCustomerData}
              inputOnChange={inputOnChange}
              cityList={getCities}
              listOfCountries={listOfCountries}
              addressList={addressList}
              addressSelection={shippingAddressSelection}
              type="Shipping"
              handleAddressSelection={handleAddressSelection}
              state={listOfStates}
              orderType={orderType}
              storeType={storeType}
              setCurrCountry={setCurrCountry}
            />
            {orderType === OrderTypes.DELIVERY && (
              <>
                <div className="flex flex-wrap w-full">
                  <div className="w-full flex-grow-0">
                    <div className="">
                      <Checkbox
                        checked={isSameAddress}
                        onChange={() => {
                          setIsSameAddress(!isSameAddress);
                        }}
                        label={t('Use same address for billing')}
                        styled={{
                          checkboxContainer: "pl-0",
                          checkbox: "border-gray-500",
                        }}
                        checkedStyled={{
                          checkbox: "bg-primary border-primary",
                        }}
                      />
                    </div>
                  </div>
                </div>
                {!isSameAddress && (
                  <div className="mt-5">
                    <ShippingInfo
                      title={t('Billing Info')}
                      customerInfoInputs={false}
                      isAuth={isAuthenticated}
                      customerData={customerData}
                      setCustomerData={setCustomerData}
                      inputOnChange={inputOnChange}
                      cityList={getCities}
                      listOfCountries={listOfCountries}
                      addressList={addressList}
                      addressSelection={billingAddressSelection}
                      type="Billing"
                      handleAddressSelection={handleAddressSelection}
                      state={listOfStates}
                      setCurrCountry={setCurrCountry}
                    />
                  </div>
                )}
              </>
            )}
            <TnC
              checkVisibility={checkVisibility}
              legalPolicies={footerItemLists}
              checked={termsAndConditionChecked}
              setChecked={setTermsAndConditionChecked}
            />{" "}
          </div>
        )}
      </div>
      <div className="flex w-full sm:justify-center my-3 sm:mt-5 sm:mb-10">
        <ContainedButton
          className="border-gray-300 font-semibold flex-[1] sm:max-w-[15rem]"
          fontSize="text-[13px]"
          outlined={true}
          onClick={() => {
            storeType === StoreTypes.WARUNG_STORETYPE
              ? router.push("/collections-menu")
              : router.push("/");
            // if (platform === "tngmp") {
            //   router.push({
            //     pathname: `/`,
            //     search: `?platform=${platform}`,
            //   });
            // } else {

            // }
          }}
        >
          {t('Continue Shopping')}
        </ContainedButton>
        {isSecondPage ? (
          <ContainedButton
            className="font-semibold ml-2 sm:ml-5 flex-[1] sm:max-w-[15rem]"
            fontSize="text-[13px]"
            onClick={
              paymentType === "ManualPayment"
                ? handleManualPayment
                : handlePayment
            }
            // onClick={handlePayment}
            loading={isLoadingPayment}
            disabled={
              isThereAtLeast1ErrorInCartItem ||
              updateProductModifierIsLoading ||
              isLoadingCheckCart ||
              isLoadingPayment ||
              (orderType === OrderTypes.DELIVERY &&
                selectedDeliveryOption.name === "" &&
                !isMultistore) ||
              checkCartResp?.cartItems?.length < 1 ||
              checkCartResp?.status === "false"
            }
          >
            {t('Proceed To Payment')}
          </ContainedButton>
        ) : (
          <ContainedButton
            className="font-semibold ml-2 sm:ml-5 flex-[1] sm:max-w-[15rem]"
            fontSize="text-[13px]"
            onClick={handleNextPage}
            disabled={
              checkVisibility(legalPoliciesType.TERMS_OF_SERVICE) ||
              checkVisibility(legalPoliciesType.PRIVACY)
                ? !termsAndConditionChecked
                : false
            }
          >
            {t('Next Step')}
          </ContainedButton>
        )}
      </div>
      <DialogModal
        className="max-h-screen max-w-[20rem] w-[60%] my-5 xs-down:px-1"
        smallDialog={false}
        onClose={() => setShowAddressModal(false)}
        open={showAddressModal}
      >
        <h2 className="mb-[3rem]">Edit Address</h2>
        <ShippingInfo
          customerInfoInputs={false}
          isAuth={isAuthenticated}
          customerData={tempAddressState}
          setCustomerData={setTempAddressState}
          inputOnChange={inputOnChange}
          cityList={getCities}
          addressList={addressList}
          addressSelection={shippingAddressSelection}
          type="Shipping"
          handleAddressSelection={handleAddressSelection}
          state={listOfStates}
        />
        <div className="flex justify-end pt-[2rem] gap-[1rem]">
          <ContainedButton
            onClick={() => setShowAddressModal(false)}
            border="rounded"
            outlined={true}
            className="border-primary mr-2 font-semibold"
            fontSize="text-14px"
          >
            {t('Cancel')}
          </ContainedButton>
          <ContainedButton
            onClick={handleOnSaveEditAddressModal}
            border="rounded"
            className="font-semibold min-w-[6rem]"
            fontSize="text-14px"
          >
            {t('Save')}
          </ContainedButton>
        </div>
      </DialogModal>
      {productModifierModalState.data?.selectedModifierGroups?.length > 0 ? (
        <ProductModifierModal
          showModal={productModifierModalState.visible}
          handleCloseModal={handleCloseProductModifierModal}
          mode="edit"
          productOriginalPrice={
            (productModifierModalState.data?.deliveryPriceWithTax
              ? productModifierModalState.data?.deliveryPriceWithTax
              : productModifierModalState.data?.deliveryPrice) -
            productModifierModalState.data?.modifierSubtotal
          }
          initialModifierGroups={
            productModifierModalState.data?.selectedModifierGroups
          }
          quantity={productModifierModalState.data?.quantity}
          item={productModifierModalState.data}
          outOfStock={false}
          handleOnSubmit={handleOnSubmitModifierModal}
          submitIsLoading={updateProductModifierIsLoading}
          submitButtonTitle="Update Cart"
        />
      ) : undefined}
    </div>
  );
};

const TnC = ({ checked, setChecked, checkVisibility }) => {
  const merchantInfoContext = useContext(MerchantContext);
  const showTnC = checkVisibility(legalPoliciesType.TERMS_OF_SERVICE);
  const showPrivacy = checkVisibility(legalPoliciesType.PRIVACY);
  const { t } = useTranslation('common');
  return (
    <>
      {(showTnC || showPrivacy) && (
        <div className="terms-and-conditions">
          <Checkbox
            checked={checked}
            onChange={() => setChecked(!checked)}
            label={
              <>
                {t('I agree to')} {merchantInfoContext.name}
                &apos;s&nbsp;
                {showTnC && (
                  <Link href="/policy/term-of-service">
                    <a target="_blank" rel="noopener noreferrer">
                    {t('terms_of_service')}
                    {" "}
                    </a>
                  </Link>
                )}
                {showTnC && showPrivacy && t('and')}
                {showPrivacy && (
                  <Link href="/policy/privacy">
                    <a target="_blank" rel="noopener noreferrer">
                      {" "}
                      {t('privacy_policy')}
                    </a>
                  </Link>
                )}
                .
              </>
            }
            styled={{
              checkboxContainer: "pl-0",
              checkbox: "border-gray-500",
            }}
            checkedStyled={{
              checkbox: "bg-primary border-primary",
            }}
          />
        </div>
      )}
    </>
  );
};

export default Checkout;
