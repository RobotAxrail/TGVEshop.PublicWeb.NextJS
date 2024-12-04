import { Loader } from "@/components/loader/Loader";
import MerchantContext from "@/contexts/MerchantContext";
import { useOrder } from "@/contexts/OrderContext";
import { legalPoliciesType, OrderTypes, StoreTypes } from "@/enums/enums";
import { isQLEggs } from "@/utils/util.js";
import useTranslation from "next-translate/useTranslation";
import StoreTermsAndCondition from "@/components/common/StoreTermsAndCondition";
import { Dialog, Transition } from "@headlessui/react";
import { ChevronRightIcon, StarIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useContext, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import {
  CheckoutPageButton,
  CheckoutPageCard,
  CheckoutPageInput,
} from "./common";

type DeliveryDiscount = {
  discountType: string;
  discountValue: number;
};

export default function OrderSummary({
  onApplyPromocode,
  appliedPromoCode,
  appliedVoucherCode,
  appliedVoucherName,
  onApplyVoucher,
  checkCartResponse,
  isSubmitting,
  deliveryFee,
  cartIsEmpty,
  isLoading,
  onSubmit,
  disableCheckout,
  minOrder,
  minimumTotal,
  errorMessage,
  toggleVoucherModal,
  deliveryDiscount,
}: {
  onApplyPromocode: (code: string) => void;
  appliedPromoCode: string;
  appliedVoucherCode: string;
  appliedVoucherName: string;
  onApplyVoucher: (code: string) => void;
  checkCartResponse: any;
  isSubmitting: boolean;
  onSubmit: () => void;
  isLoading: boolean;
  deliveryFee: number;
  cartIsEmpty: boolean;
  disableCheckout: boolean;
  minOrder: boolean;
  minimumTotal: number;
  errorMessage: string;
  toggleVoucherModal: (isOpen: boolean) => void;
  deliveryDiscount: DeliveryDiscount;
}) {
  const { currency, footerItemLists, storeType, domain } =
    useContext(MerchantContext);
  const [promocode, setPromocode] = useState("");
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const { orderType, deliveryAddress } = useOrder();
  const router = useRouter();
  const { t } = useTranslation();
  const orderSummary =
    OrderTypes.DELIVERY === orderType
      ? [
          {
            id: 0,
            label: t("common:subtotal"),
            value:
              (checkCartResponse?.subtotalWithTax === 0
                ? checkCartResponse.subtotal
                : checkCartResponse?.subtotalWithTax) || 0,
          },
          {
            label: t("common:delivery_fee"),
            value: checkCartResponse?.isFreeDelivery ? 0 : deliveryFee,
            id: 1,
          },
        ]
      : [
          {
            id: 0,
            label: t("common:subtotal"),
            value:
              (checkCartResponse?.subtotalWithTax === 0
                ? checkCartResponse.subtotal
                : checkCartResponse?.subtotalWithTax) || 0,
          },
        ];

  const IS_QL_EGGS = Boolean(isQLEggs(domain));

  function getDiscountedDeliveryPrice(
    orderSummary: any,
    deliveryDiscount: DeliveryDiscount
  ) {
    const deliveryFee = getDeliveryFee(orderSummary);
    const { finalDiscount, discountAmount } = getFinalDiscount(
      deliveryFee,
      deliveryDiscount
    );

    const discountedPrice = finalDiscount > deliveryFee ? 0 : finalDiscount;

    return { discountedPrice, discountAmount };
  }

  function getDeliveryFee(orderSummary: any) {
    const deliveryFeeItem = orderSummary.find(
      (item: any) => item.label === "Delivery Fees"
    );

    return deliveryFeeItem ? deliveryFeeItem.value : 0;
  }

  function getFinalDiscount(
    deliveryFee: number,
    deliveryDiscount: DeliveryDiscount
  ) {
    if (deliveryFee <= 0 || !deliveryDiscount) {
      return { finalDiscount: 0, discountAmount: 0 };
    }

    if (deliveryDiscount.discountType === "flatPrice") {
      const discountAmount = Math.min(
        deliveryFee,
        deliveryDiscount.discountValue
      );
      const finalDiscount = deliveryFee - discountAmount;

      return { finalDiscount, discountAmount };
    } else {
      const discountAmount =
        deliveryFee * (deliveryDiscount.discountValue / 100);
      const finalDiscount = deliveryFee - discountAmount;

      return { finalDiscount, discountAmount };
    }
  }

  function renderSummaryValue(label: string, value: number) {
    if (deliveryDiscount) {
      if (label === "Delivery Fees")
        return getDiscountedDeliveryPrice(orderSummary, deliveryDiscount)
          .discountedPrice;
    }
    return value;
  }

  function renderCheckoutPrice() {
    const total =
      orderSummary?.reduce((p, c) => p + c?.value, 0) -
      checkCartResponse?.discount -
      getDiscountedDeliveryPrice(orderSummary, deliveryDiscount)
        ?.discountAmount;
    if (total.toFixed(2).toString() !== "NaN")
      return `${currency} ${total?.toFixed(2)}`;
    else return `${currency} 0.00`;
  }

  function renderAppliedCode() {
    if (appliedPromoCode) {
      return {
        type: t("common:promo_code_label"),
        name: appliedPromoCode.toUpperCase(),
        action: () => onApplyPromocode(""),
      };
    } else if (appliedVoucherCode) {
      return {
        type: "Voucher",
        name: appliedVoucherName,
        action: () => onApplyVoucher(""),
      };
    } else return {};
  }

  return (
    <>
      <CheckoutPageCard>
        <div className="px-5 py-4 rounded-xl bg-[#fff] text-[#191919] space-y-3">
          <h4 className="text-lg font-semibold mb-4 mt-0 text-primary">
            {t("common:order_summary_title")}
          </h4>
          {StoreTypes.WARUNG_STORETYPE !== storeType &&
            StoreTypes.B2B_STORETYPE !== storeType &&
            appliedPromoCode === "" &&
            !appliedVoucherCode && (
              <div className="flex flex-row space-x-1 my-2">
                <CheckoutPageInput
                  onChange={(e) => setPromocode(e.target.value)}
                  placeholder={t("common:promo_code_label")}
                />
                <CheckoutPageButton
                  isLoading={isLoading}
                  onClick={() => {
                    onApplyPromocode(promocode);
                    setPromocode("");
                  }}
                >
                  <div className="whitespace-nowrap">
                    {t("common:apply_button_text")}
                  </div>
                </CheckoutPageButton>
              </div>
            )}

          {StoreTypes.B2B_STORETYPE !== storeType && !appliedPromoCode && (
            <div
              className="p-4 -mx-4 rounded-md cursor-pointer hover:bg-blue-100 flex flex-row items-center justify-between"
              onClick={() => {
                toggleVoucherModal(true);
              }}
            >
              <div className="flex flex-row space-x-4 items-center ">
                <StarIcon className="text-primary w-8 h-8" />
                <p className="m-0 p-0">{t("common:Use voucher code")}</p>
              </div>
              <span className="text-[#4B5565] h-5 w-5 flex items-center justify-center">
                <ChevronRightIcon />
              </span>
            </div>
          )}

          {(appliedPromoCode || appliedVoucherCode) && (
            <div className="flex flex-row align-center justify-end">
              <p className="font-normal my-0 text-md grow">
                {renderAppliedCode().type}
              </p>
              <p className="font-semibold my-0 text-primary mr-3 grow-0">
                {renderAppliedCode().name}
              </p>
              <button
                className="w-5 h-5 my-0 color-white flex items-center justify-center text-xl grow-0 rounded-full hover:bg-gray-200 active:bg-primary active:text-white"
                onClick={renderAppliedCode().action}
              >
                {isLoading ? (
                  <Loader divHeight={"h-full w-full"} />
                ) : (
                  <IoCloseOutline />
                )}
              </button>
            </div>
          )}

          {orderSummary?.map(({ id, label, value }) => (
            <div
              className="flex flex-row items-center justify-between"
              key={id}
            >
              <p className="font-normal my-0 text-md">{label}</p>
              {isLoading ? (
                <div className="h-5 animate-pulse bg-slate-200 w-20" />
              ) : (
                <p className="font-normal my-0 text-primary mr-1">{`${currency} ${renderSummaryValue(
                  label,
                  value
                )?.toFixed(2)}`}</p>
              )}
            </div>
          ))}

          {/*   //combined discount display code */}
          {(appliedPromoCode || appliedVoucherCode) &&
            checkCartResponse?.discount > 0 && (
              <div className="flex flex-row items-center justify-between">
                <p className="font-normal my-0">{t("common:discount_label")}</p>
                {isLoading ? (
                  <div className="h-5 animate-pulse bg-slate-200 w-20" />
                ) : (
                  <p className="font-normal my-0 text-primary mr-1">
                    {`- ${currency} ${checkCartResponse?.discount?.toFixed(2)}`}
                  </p>
                )}
              </div>
            )}

          <div className="border-t border-dotted border-gray-400" />
          <div className="flex flex-row items-center justify-between">
            <p className="font-bold my-0">{t("common:total_label")}</p>
            {isLoading ? (
              <div className="h-5 animate-pulse bg-slate-200 w-20" />
            ) : (
              <p className="font-bold my-0 text-primary">
                {renderCheckoutPrice()}
              </p>
            )}
          </div>
          {IS_QL_EGGS && (
            <div className="flex flex-col w-full space-y-3">
              <div className="flex flex-row items-center justify-start text-gray-500 text-sm">
                {t("common:all_deliveries_to_premises_note")}
              </div>
            </div>
          )}
          <StoreTermsAndCondition footerItemLists={footerItemLists} />
          <div className="flex flex-col w-full space-y-3">
            {!minOrder && (
              <div className="flex flex-row items-center justify-center text-red-500">
                {t("common:Minimum order value is")} {`${currency} ${minimumTotal}`}
              </div>
            )}
            {IS_QL_EGGS && errorMessage && (
              <div className="flex flex-row items-center justify-center text-red-500">
                {errorMessage}
              </div>
            )}
            {StoreTypes.B2B_STORETYPE === storeType && (
              <CheckoutPageButton
                onClick={() => setOpenConfirmModal(true)}
                isLoading={isSubmitting}
                disabled={
                  cartIsEmpty ||
                  disableCheckout ||
                  orderSummary?.reduce((p, c) => p + c?.value, 0) -
                    checkCartResponse?.discount <=
                    0
                }
              >
                {t("common:confirm")}
              </CheckoutPageButton>
            )}
            {StoreTypes.B2B_STORETYPE !== storeType && (
              <>
                <CheckoutPageButton
                  onClick={onSubmit}
                  isLoading={isSubmitting}
                  disabled={
                    cartIsEmpty ||
                    disableCheckout ||
                    orderSummary?.reduce((p, c) => p + c?.value, 0) -
                      checkCartResponse?.discount <=
                      0
                  }
                >
                  {t("common:confirm")}
                </CheckoutPageButton>
                <CheckoutPageButton
                  variant="link"
                  onClick={() => router.push("/")}
                >
                  {t("common:continue_shopping")}
                </CheckoutPageButton>
              </>
            )}
          </div>
          {/* Place order confirmation popup */}
          <Transition appear show={openConfirmModal} as={Fragment}>
            <Dialog
              onClose={() => setOpenConfirmModal(false)}
              className="relative z-10"
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
                        {t("common:confirm_address_title")}
                      </Dialog.Title>
                      <Dialog.Description className="mb-4 mt-2 text-primary">
                        {t("common:confirm_address_description")}
                        <br /> <br />
                        {deliveryAddress?.address}
                      </Dialog.Description>
                      <div className="mt-4 mr-4 flex flex-row justify-between">
                        <CheckoutPageButton
                          variant="outline"
                          onClick={() => setOpenConfirmModal(false)}
                        >
                          {t("common:cancel_button_text")}
                        </CheckoutPageButton>
                        <CheckoutPageButton
                          onClick={() => {
                            setOpenConfirmModal(false);
                            onSubmit();
                          }}
                        >
                          {t("common:proceed_button_text")}
                        </CheckoutPageButton>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </CheckoutPageCard>
    </>
  );
}
