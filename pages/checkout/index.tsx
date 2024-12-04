import { Loader } from "@/components/loader/Loader";
import SEO from "@/components/seo/SEO";
import { useCart } from "@/contexts/CartContext";
import { StoreTypes } from "@/enums/enums";
import { Dialog, Transition } from "@headlessui/react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { createContext, Fragment, useContext, useState } from "react";
import { FaStoreAltSlash } from "react-icons/fa/index";
import {
  CheckoutPageButton,
  LoadingSpinner,
  ModalTransition,
} from "./components/common";
import FullfilmentComponent from "./components/FullfilmentComponent";
import ItemDetailsComponent from "./components/ItemDetailsComponent";
import OrderSummary from "./components/OrderSummary";
import SignInComponent from "./components/SignInComponent";
import useCheckoutPageController from "./controller/useCheckoutController";

const CheckoutPageContext = createContext({});
import MerchantContext from "@/contexts/MerchantContext";
import dynamic from "next/dynamic";
import { useAuth } from "@/contexts/AuthContext";

export function useCheckoutPageContext() {
  return useContext(CheckoutPageContext);
}
const VoucherCheckoutPage = dynamic(
  import("modules/rewards/views/VoucherCheckoutPage")
);

function CheckoutComponent() {
  const {
    advancedOrderTimeSelection,
    truckScheduleSelection,
    isDeliveryOptionsLoading,
    redirectingToGateway,
    isFetchingCheckCart,
    checkCartResponse,
    warungStoreIsOpen,
    onApplyPromocode,
    appliedPromoCode,
    deliveryOptions,
    paymentMethodOptions,
    getDeliveryFee,
    isSubmitting,
    storeType,
    clearErrors,
    onSubmit,
    setValue,
    register,
    updateCart,
    watch,
    errors,
    minOrder,
    minimumOrderValue,
    disableCheckout,
    checkoutError,
    errorMessage,
    CheckoutVoucherModal,
    toggleVoucherModal,
    currentVoucher,
    onApplyVoucher,
    deliveryDiscount
  } = useCheckoutPageController();
  const { removeItemCartList } = useCart() as any;
  const cartItems = (checkCartResponse as any)?.cartItems;
  const IS_WARUNG = storeType === StoreTypes.WARUNG_STORETYPE;
  const IS_B2B = storeType === StoreTypes.B2B_STORETYPE;
  const { isCartFetching } = useCart() as any;
  const { t } = useTranslation();
  const { deleteModal, toggleConfirm } = useDeleteModal({
    onConfirm: (id: string) => removeItemCartList(id),
  });

  function showOrderSummary() {
    if (IS_B2B) return truckScheduleSelection && !checkoutError;
    return true;
  }

  return (
    <CheckoutPageContext.Provider
      value={{
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
      }}
    >
      {deleteModal}
      {CheckoutVoucherModal}
      <SEO title="Checkout" keywords="" description="Checkout" />
      <NavigateToPaymentGatewayLoader
        redirectingToGateway={redirectingToGateway}
      />
      {isCartFetching ? (
        <div className="h-full w-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <StoreIsClosedModal show={Boolean(IS_WARUNG && !warungStoreIsOpen)} />
          <div className="w-full py-4 m-auto">
            <div className="flex md:flex-row flex-col md:space-y-0 space-y-4 hide-scrollbar prevent-overscroll">
              <div className="flex flex-col space-y-4 flex-[2] px-4 md:px-2">
                {!IS_B2B && <SignInComponent />}
                <FullfilmentComponent />
              </div>
              <div className="flex flex-col space-y-4 flex-[2] px-4 md:px-2 sticky top-0">
                <ItemDetailsComponent
                  isFetchingCheckCart={isFetchingCheckCart}
                  onToggleDeleteModal={toggleConfirm}
                  fetchedCartItem={cartItems}
                  updateCart={updateCart}
                  checkoutError={checkoutError}
                />
                {(!IS_B2B || (IS_B2B && truckScheduleSelection)) &&
                  !checkoutError && (
                    <OrderSummary
                      cartIsEmpty={!cartItems || cartItems?.length === 0}
                      appliedVoucherCode={(currentVoucher as any)?.voucherId}
                      appliedVoucherName={(currentVoucher as any)?.title}
                      onApplyVoucher={onApplyVoucher}
                      disableCheckout={disableCheckout}
                      minOrder={minOrder}
                      minimumTotal={minimumOrderValue}
                      checkCartResponse={checkCartResponse}
                      onApplyPromocode={onApplyPromocode}
                      appliedPromoCode={appliedPromoCode}
                      isLoading={isFetchingCheckCart}
                      deliveryFee={getDeliveryFee()}
                      isSubmitting={isSubmitting}
                      onSubmit={onSubmit}
                      errorMessage={errorMessage}
                      toggleVoucherModal={toggleVoucherModal}
                      deliveryDiscount={deliveryDiscount}
                    />
                  )}
              </div>
            </div>
          </div>
        </>
      )}
    </CheckoutPageContext.Provider>
  );
}

export default function CheckoutPage() {
  const { storeType, membershipTierActivated } = useContext(MerchantContext);
  const { isAuthenticated } = useAuth();

  return (storeType !== StoreTypes.MULTISTORE_STORETYPE && storeType !== StoreTypes.AC_STORETYPE) ||
    (isAuthenticated && !membershipTierActivated) ? (
    <CheckoutComponent />
  ) : (
    <VoucherCheckoutPage>
      <CheckoutComponent />
    </VoucherCheckoutPage>
  );
}

function NavigateToPaymentGatewayLoader({
  redirectingToGateway,
}: {
  redirectingToGateway: boolean;
}) {
  const { t } = useTranslation();
  return (
    <ModalTransition show={redirectingToGateway}>
      <div className="flex flex-row space-x-3">
        <LoadingSpinner />
        <p className="m-0 font-medium">{t("common:placing-order")}</p>
      </div>
    </ModalTransition>
  );
}

function StoreIsClosedModal({ show }: { show: boolean }) {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <ModalTransition show={show}>
      <div className="flex flex-col space-y-3 items-center p-2 w-full">
        <FaStoreAltSlash fontSize={30} />
        <div>
          <p className="m-0 font-medium text-center">
            {t("common:store-closed")}
          </p>
          <p className="m-0 text-gray-400 text-center">
            {t("common:checkout-later")}
          </p>
        </div>
        <CheckoutPageButton onClick={() => router?.back()}>
          {t("common:go-back")}
        </CheckoutPageButton>
      </div>
    </ModalTransition>
  );
}

function useDeleteModal({ onConfirm }: { onConfirm: (a: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { t } = useTranslation();

  return {
    toggleConfirm: (value: string) => {
      setDeleteId(value);
      setIsOpen(true);
    },
    deleteModal: (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          onClose={() => setIsOpen(false)}
          className="relative z-10"
          open={isOpen}
          as="div"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            enterTo="opacity-100"
            enterFrom="opacity-0"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                as={Fragment}
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    className="text-lg font-semibold mb-4 mt-0 text-primary"
                    as="h3"
                  >
                    {t("common:remove-item")}
                  </Dialog.Title>
                  <Dialog.Description className="mb-4 mt-2 text-primary">
                    {t("common:remove-confirmation")}
                  </Dialog.Description>
                  <div className="flex flex-row justify-end space-x-1">
                    <div>
                      <CheckoutPageButton
                        variant="outline"
                        onClick={() => {
                          setIsOpen(false);
                          setDeleteId(null);
                        }}
                      >
                        {t("common:cancel")}
                      </CheckoutPageButton>
                    </div>
                    <div>
                      <CheckoutPageButton
                        isLoading={isLoading}
                        onClick={async () => {
                          setLoading(true);
                          await onConfirm(deleteId);
                          setLoading(false);
                          setIsOpen(false);
                        }}
                      >
                        {t("common:confirm")}
                      </CheckoutPageButton>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    ),
  };
}
