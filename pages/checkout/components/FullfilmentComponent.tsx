import useMultiStoreDelivery from "@/components/AxrailCommerce/MultiStoreDeliverySelector/hooks/useMultiStoreDelivery";
import MerchantContext from "@/contexts/MerchantContext";
import { useOrder } from "@/contexts/OrderContext";
import { useStoreOperatingHour } from "@/contexts/StoreOperatingHourContext";
import { OrderModalStateActions, OrderTypes, StoreTypes } from "@/enums/enums";
import { isQLEggs } from "@/utils/util";
import useTranslation from "next-translate/useTranslation";
import React, { useContext, useState } from "react";
import { useCheckoutPageContext } from "../index";
import BillingInformationInput from "./BillingInformationInput";
import {
  CheckoutPageCard,
  CheckoutPageSwitch,
  Divider,
  ScaleInTransition,
} from "./common";
import CustomerInformationInput from "components/common/CustomerInformationInput";
import DeliveryAdvancedOrder from "./DeliveryAdvancedOrder";
import DeliveryInformation from "./DeliveryInformation";
import DeliveryOptionsRadioButton from "./DeliveryOptionsRadioButtons";
import DineInInformation from "./DineInInformation";
import FullfilmentSelector from "./FullfilmentSelector";
import MultistoreSelector from "./MultistoreSelector";
import PaymentOptionsRadioButton from "./PaymentOptionsRadioButtons";
import PickupInformation from "./PickupInformation";

const ORDER_TYPE_MAP = {
  [OrderTypes.DELIVERY]: "Delivery",
  [OrderTypes.PICKUP]: "Pick-Up",
  [OrderTypes.DINEIN]: "Dine-In",
};

export default function FullfilmentComponent() {
  const { storeId } = useContext(MerchantContext);
  const [useSameAddressAsBilling, setUseSameAddressAsBilling] = useState(true);
  const { landingPageData } = useStoreOperatingHour() as any;
  const {
    address: storeAddress,
    address,
    orderOption,
    storeType,
    currency,
    domain,
    paymentType,
  } = useContext(MerchantContext);
  const {
    advancedOrderTimeSelection,
    truckScheduleSelection,
    isDeliveryOptionsLoading,
    deliveryOptions,
    paymentMethodOptions,
    clearErrors,
    setValue,
    register,
    errors,
    watch,
  } = useCheckoutPageContext() as any;
  const {
    dispatchOrderModalState,
    handleChangeOrderType,
    tableNumber,
    orderType,
    deliveryAddress,
  } = useOrder();

  const { isMultistore, openMultiStoreModal, getSelectedStoreAddress } =
    useMultiStoreDelivery() as any;
  const { t } = useTranslation();
  const IS_WARUNG = Boolean(StoreTypes.WARUNG_STORETYPE === storeType);
  const IS_B2B = Boolean(StoreTypes.B2B_STORETYPE === storeType);
  const IS_DELIVERY = Boolean(OrderTypes.DELIVERY === orderType);
  const IS_DINEIN = Boolean(OrderTypes.DINEIN === orderType);
  const IS_PICKUP = Boolean(OrderTypes.PICKUP === orderType);
  const SHOW_CUSTOMER_INPUT = !Boolean(
    IS_DINEIN && watch("dineInPaymentMethod") === "PayAtCounter"
  );
  const SHOW_PAYMENT_INPUT =
    paymentType !== "ManualPayment" &&
    watch("dineInPaymentMethod") !== "PayAtCounter";
  const IS_QL_EGGS = Boolean(isQLEggs(domain));

  const orderOptions = orderOption.map((value: string) => ({
    label: ORDER_TYPE_MAP[value],
    orderType: value,
    price: "0.00",
  }));

  const openDeliveryModal = () =>
    dispatchOrderModalState({
      type: OrderModalStateActions.HOME,
    });

  const hasAdvancedOrder = Boolean(
    !IS_DINEIN && advancedOrderTimeSelection?.length > 0
  );

  const isOwnTransportOrder = Boolean(
    IS_B2B ?
      truckScheduleSelection?.length > 0
      :
      truckScheduleSelection?.length > 0 && watch("deliveryOptionSelected").includes("Transport")
  );

  return (
    <>
      <CheckoutPageCard>
        <div className="flex flex-col p-3">
          <div className="flex flex-col">
            {!IS_B2B ? (
              <h4 className="font-semibold mb-4 mt-0 text-primary text-lg">
                {t("common:fullfilment-title")}
              </h4>
            ) : (
              <h4 className="font-semibold mb-4 mt-0 text-primary text-lg">
                {t("common:fullfilment-title-b2b")}
              </h4>
            )}
            {!IS_B2B && (
              <FullfilmentSelector
                onChange={(orderType) => handleChangeOrderType(orderType)}
                orderOptions={orderOptions}
                orderType={orderType}
                currency={currency}
              />
            )}
            <ScaleInTransition isOpen={hasAdvancedOrder || isOwnTransportOrder}>
              <DeliveryAdvancedOrder
                deliveryTime={
                  hasAdvancedOrder
                    ? advancedOrderTimeSelection
                    : truckScheduleSelection
                }
                ownTransport={isOwnTransportOrder}
                orderType={orderType}
                register={register}
                setValue={setValue}
                watch={watch}
                isQLEggs={IS_QL_EGGS}
              />
            </ScaleInTransition>
          </div>
          <ScaleInTransition isOpen={isMultistore}>
            <React.Fragment>
              <Divider />
              <div className="py-2">
                <MultistoreSelector
                  onSelectStoreSelected={openMultiStoreModal}
                  onChangeStoreClicked={openMultiStoreModal}
                  storeAddress={getSelectedStoreAddress()}
                  orderType={orderType}
                  address={deliveryAddress.address}
                />
              </div>
            </React.Fragment>
          </ScaleInTransition>
          {!isMultistore && (
            <React.Fragment>
              <ScaleInTransition isOpen={IS_DINEIN}>
                <React.Fragment>
                  <Divider />
                  <div className="py-2">
                    <DineInInformation
                      onSelectAddress={openDeliveryModal}
                      tableNumber={tableNumber}
                      register={register}
                      setValue={setValue}
                      errors={errors}
                      watch={watch}
                    />
                  </div>
                </React.Fragment>
              </ScaleInTransition>
              <ScaleInTransition isOpen={IS_DELIVERY}>
                <React.Fragment>
                  <Divider />
                  <div className="py-2">
                    <DeliveryInformation
                      onSelectAddress={openDeliveryModal}
                      register={register}
                      setValue={setValue}
                      address={deliveryAddress?.address}
                      postalCode={deliveryAddress?.postalCode}
                      displayPostalCode={IS_B2B}
                      isAuthenticated={false}
                      errors={errors}
                    />
                  </div>
                </React.Fragment>
              </ScaleInTransition>
              <ScaleInTransition isOpen={IS_PICKUP}>
                <React.Fragment>
                  <Divider />
                  <div className="py-2">
                    <PickupInformation
                      pickupAddress={storeAddress || landingPageData?.address}
                    />
                  </div>
                </React.Fragment>
              </ScaleInTransition>
            </React.Fragment>
          )}
          {!IS_WARUNG && !IS_B2B && IS_DELIVERY && (
            <CheckoutPageSwitch
              label={t("common:useSameAddressForBilling")}
              setIsOpen={setUseSameAddressAsBilling}
              isOpen={useSameAddressAsBilling}
            />
          )}
          <ScaleInTransition isOpen={!useSameAddressAsBilling}>
            <React.Fragment>
              <Divider />
              <BillingInformationInput
                register={register}
                errors={errors}
                watch={watch}
              />
            </React.Fragment>
          </ScaleInTransition>
          <ScaleInTransition isOpen={SHOW_CUSTOMER_INPUT}>
            <React.Fragment>
              <Divider />
              <CustomerInformationInput
                register={register}
                setValue={setValue}
                errors={errors}
                watch={watch}
              />
            </React.Fragment>
          </ScaleInTransition>
          <ScaleInTransition isOpen={SHOW_PAYMENT_INPUT}>
            <React.Fragment>
              <Divider />
              <PaymentOptionsRadioButton
                isLoading={isDeliveryOptionsLoading}
                paymentMethodOptions={paymentMethodOptions}
                clearErrors={clearErrors}
                setValue={setValue}
                register={register}
                errors={errors}
                watch={watch}
              />
            </React.Fragment>
          </ScaleInTransition>
          <ScaleInTransition isOpen={IS_DELIVERY}>
            <React.Fragment>
              {!IS_B2B && (
                <>
                  <Divider />
                  <DeliveryOptionsRadioButton
                    isLoading={isDeliveryOptionsLoading}
                    deliveryOptions={deliveryOptions}
                    setValue={setValue}
                    register={register}
                    currency={currency}
                    errors={errors}
                    watch={watch}
                    openDeliveryModal={
                      isMultistore ? openMultiStoreModal : openDeliveryModal
                    }
                  />
                </>
              )}
            </React.Fragment>
          </ScaleInTransition>
        </div>
      </CheckoutPageCard>
    </>
  );
}
function useEffect(arg0: () => void, arg1: undefined[]) {
  throw new Error("Function not implemented.");
}
