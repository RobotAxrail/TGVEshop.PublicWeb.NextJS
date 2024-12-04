import React, { useContext, Fragment, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import useTranslation from 'next-translate/useTranslation';

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSolid, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// components
import VirtualCode from "./VirtualCode";
import { ContainedButton } from "@/components/buttons/Buttons";
const OrderStatus = dynamic(() => import("@/components/orders/OrderStatus"));
const PriceWithCurrency = dynamic(() =>
  import("@/components/priceWithCurrency/PriceWithCurrency")
);
const InvoiceModal = dynamic(() => import("@/components/orders/InvoiceModal"));
import ReviewModal from "@/components/orders/ReviewModal";

import AccountSidebarLayout from "@/components/layouts/AccountSidebarLayout";

// utils
// import moment from "moment";
import { getSelectedModifiersToDisplayList } from "@/utils/util";
import {
  getOrderTypeText,
  ToBeRemovedGetOrderStatusMapping,
} from "@/utils/util";
// states
import { useAuth } from "@/contexts/AuthContext";
import MerchantContext from "@/contexts/MerchantContext";
import AspectRatioSquareContainer from "../shared/AspectRatioSquareContainer";

//constants
import { StoreTypes, OrderTypes } from "@/enums/enums";
const CustomMapComponent = dynamic(() => import("./MapWithCustomMarkers"));
import dayjs from "dayjs";

const OrderAddressesComponent = ({ title, name, address }) => {
  return (
    <div className="w-auto p-2 text-left sm:w-[35%]">
      <h4 className="text-[15px] m-0 font-semibold">{title}</h4>
      <p className="text-[14px] opacity-70">{name}</p>
      <p className="text-[14px] break-words leading-normal opacity-70">
        {address}
      </p>
    </div>
  );
};

const OrderDetails = (props) => {
  const {
    order,
    printModalState,
    orderDetail,
    onPrintInvoice,
    setFormValues,
    formValues,
    handleSubmitOrderReview,
    openReviewModal,
    setOpenReviewModal,
    openItemReviewModal,
    setOpenItemReviewModal,
    // item review props
    selectedItemToReview,
    setSelectedItemToReview,
    handleSubmitItemReview,
    membershipTierActivated,
    isApiFetching,
  } = props;
  const { t } = useTranslation('common');
  const { isAuthenticated } = useAuth();
  const { storeType } = useContext(MerchantContext);
  const router = useRouter();
  return (
    <>
      <div className="hidden md:block">
        <AccountSidebarLayout isLoading={isApiFetching}>
          {/* Order details */}
          <div className="flex flex-col sm:flex-row justify-between p-5 mb-8 rounded-lg bg-white border">
            <div className="">
              <div className="flex justify-between">
                <h4 className="m-0 font-semibold pr-3">{order?.orderNumber}</h4>
                <OrderStatus status={ToBeRemovedGetOrderStatusMapping(order)} />
              </div>
              {storeType === StoreTypes.MULTISTORE_STORETYPE && (
              <div className="flex justify-between">
                <h5 className="m-0 font-semibold pr-3">{order?.storeName}</h5>
              </div>
              )}
              <div className="flex justify-between">
                <p className="leading-[1.57] align-middle text-[12px] pr-2 opacity-50">
                  {order?.type} {t("order placed on")}{" "}
                  {dayjs(order?.createdAt).format("DD MMM YYYY")} (
                  {dayjs(order?.createdAt).format("hh:mm A")})
                </p>
                <p className="leading-[1.57] align-middle text-[12px]  opacity-50">
                {t("Paid by")}{" "}
                  {order?.paymentMethod
                    ? order?.paymentMethod
                    : order?.manualPaymentMethodName === "TnG"
                    ? "Touch 'n Go eWallet"
                    : order.manualPaymentMethodName}
                </p>
              </div>
            </div>
            <div className="flex gap-2 md:flex-col items-center justify-center">
              {isAuthenticated &&
              !["Payment Failed", "Pending Payment"].includes(order?.status) ? (
                <ContainedButton
                  onClick={() => onPrintInvoice()}
                  className="border-primary uppercase mx-auto"
                  fontSize="text-[10px] md:text-[13px]"
                  outlined={true}
                >
                  {t("Print Invoice")}
                </ContainedButton>
              ) : null}

              {storeType !== StoreTypes.WARUNG_STORETYPE &&
                ["Order Completed", "Order Partially Completed"].includes(
                  order?.status
                ) && (
                  <ContainedButton
                    onClick={() => setOpenReviewModal(true)}
                    className="uppercase mt-2 mx-auto"
                    fontSize="text-[10px] md:text-[13px]"
                  >
                     {t("Write A Review")}
                  </ContainedButton>
                )}
            </div>
          </div>

          {/* order items */}
          <div className="mb-8 bg-white rounded-lg border">
            <ul className="list-none px-4">
              {orderDetail?.map((data) => {
                const imageDisplay = process.env.BUCKET_URL + data.itemImage;
                return (
                  <li
                    className="flex justify-start items-center "
                    key={data.itemId}
                  >
                    <div className="min-w-[56px] flex-shrink-0">
                      <div className="relative w-[40px] h-[40px] flex items-center justify-center">
                        <Image
                          layout="fill"
                          objectFit="cover"
                          alt={data.itemTitle}
                          src={imageDisplay}
                        />
                      </div>
                    </div>
                    <div className="my-[4px] flex-auto">
                      <div className="flex flex-col sm:justify-between sm:flex-row ">
                        <div className="flex flex-col sm:w-3/5 sm:flex-row">
                          <div className="">
                            {/* item name */}
                            <p className="text-[14px] font-semibold mb-0">
                              {data.itemTitle}
                            </p>
                            {data.redemptionCode ? (
                              <>
                                <p className="text-[12px] mb-0 mt-0">
                                  {data.description.replace(
                                    /(<([^>]+)>)/gi,
                                    ""
                                  )}
                                </p>
                                <p className="text-[12px] font-semibold mb-0 mt-0">
                                {t("Redemption Code")} : {data.redemptionCode}
                                </p>
                              </>
                            ) : null}
                            {data.selectedModifierGroups?.length > 0 &&
                              getSelectedModifiersToDisplayList(
                                data.selectedModifierGroups
                              ).map((modifierName) => (
                                <p className="text-[12px] m-0">
                                  {modifierName}
                                </p>
                              ))}
                            {/* virtual code */}
                            {data.itemIsVirtualGoods && (
                              <VirtualCode orderDetailId={data.orderDetailId} />
                            )}
                            {storeType !== StoreTypes.WARUNG_STORETYPE &&
                              [
                                "Order Completed",
                                "Order Partially Completed",
                              ].includes(order.status) &&
                              data.rating === null &&
                              !data?.hasReviewed && (
                                <a
                                  className="text-primary text-sm cursor-pointer"
                                  onClick={() => {
                                    setOpenItemReviewModal(true);
                                    setSelectedItemToReview(data);
                                  }}
                                >
                                  {t("Review")}
                                </a>
                              )}
                          </div>
                          {/* chip */}
                        </div>
                        <div className="flex flex-row justify-between sm:justify-around sm:flex-1">
                          <p
                            className={[
                              "text-[14px] px-[8px] h-[24px] rounded-full border border-primary",
                              data.fulfilledQuantity > 0
                                ? "bg-primary text-white"
                                : "bg-transparant text-primary",
                            ].join(" ")}
                          >
                            <span className="">
                              {data.fulfilledQuantity > 0
                                ? data.fulfilledQuantity + " Fulfilled"
                                : "Unfulfilled"}
                            </span>
                          </p>
                          {/* quantity */}
                          <p className="text-[14px] font-semibold">
                            x{data.orderedQuantity}
                          </p>
                        </div>
                        {/* price */}
                        <div className="flex flex-row justify-start w-1/6 pl-6">
                          <p className="text-[14px] font-semibold text-left">
                            <PriceWithCurrency value={data.subtotalWithTax} />
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Address & Order summary */}
          <div className="flex mb-8 p-5 bg-white rounded-lg flex-col divide-y sm:flex-row sm:divide-none border">
            {/* shipping address */}
            <OrderAddressesComponent
              title={
                order?.type === OrderTypes.DELIVERY
                  ?  t("Shipping Address")
                  : t("Pick-Up address")
              }
              name={order?.customerFirstName + " " + order?.customerLastName}
              address={
                order?.type === OrderTypes.DELIVERY
                  ? order?.deliveryAddress
                  : order?.pickupAddress
              }
            />

            {/* billing address */}
            <OrderAddressesComponent
              title={t("Billing Address")}
              name={order?.customerFirstName + " " + order?.customerLastName}
              address={order?.billingAddress}
            />

            {/* summary - pricing */}
            <div className="w-auto p-2 sm:w-[35%]">
              <h6 className="text-[15px] m-0 font-semibold">Order Summary</h6>
              <div className="summary-head">
                {/* subtotal */}
                <p className="text-[14px] opacity-70 flex justify-between">
                 {t("Subtotal")} ({order?.totalOrderItems}{" "}
                  {order?.totalOrderItems > 1 ? "items" : "item"}){" "}
                  <PriceWithCurrency
                    value={order?.subtotalWithTax}
                    total={order?.grandTotal}
                  />
                </p>
                {/* tax */}
                {order?.subtotalWithTax > order?.subtotal && (
                  <p className="text-[14px] opacity-40 flex justify-between">
                     {t("Incl. Tax")}
                    <PriceWithCurrency
                      value={order.subtotalWithTax - order.subtotal}
                      total={order.grandTotal}
                    />
                  </p>
                )}

                {/* shipping fee */}
                {order?.type === OrderTypes.DELIVERY && (
                  <p className="text-[14px] opacity-70 flex justify-between">
                      {t("Shipping Fee")}{" "}
                    <PriceWithCurrency
                      value={
                        order?.estimatedDeliveryFee
                          ? order?.estimatedDeliveryFee
                          : 0
                      }
                      total={order.grandTotal}
                    />
                  </p>
                )}

                {/* promo code discount */}
                {order?.promoCode && (
                  <p className="text-[14px] opacity-70 flex justify-between ">
                    <label className="text-ellipsis overflow-hidden">
                    {t("Promocode")}  {" (" + order?.promoCode + ")"}
                    </label>
                    <PriceWithCurrency
                      value={order?.totalDiscount}
                      total={order?.grandTotal}
                      prefix="-"
                    />
                  </p>
                )}

                <hr className="my-[10px] h-[1px] bg-grey-divider flex-shrink-0" />
                {/* total */}
                <p className="text-[14px] opacity-70 flex justify-between">
                {t("Total")}{" "}
                  {order?.subtotalWithTax > order?.subtotal
                    ? "("+t("Incl. Tax")+")"
                    : null}{" "}
                  <PriceWithCurrency value={order?.grandTotal} />
                </p>
                {/* refund amount */}
                {!!order?.refundAmount && order?.refundAmount > 0 && (
                  <p className="text-[14px] opacity-70 flex justify-between">
                    {t("Refund")}{" "}
                    <PriceWithCurrency
                      value={order?.refundAmount}
                      total={order?.grandTotal}
                      prefix="- "
                      className="text-red-600"
                    />
                  </p>
                )}
              </div>
            </div>
          </div>
          <InvoiceModal printModalState={printModalState} />
          <ReviewModal
            open={openReviewModal}
            setOpen={setOpenReviewModal}
            handleClose={() => setOpenReviewModal(false)}
            formValues={formValues}
            setFormValues={setFormValues}
            handleSubmitReview={handleSubmitOrderReview}
            type="order"
          />
          <ReviewModal
            open={openItemReviewModal}
            setOpen={setOpenItemReviewModal}
            handleClose={() => setOpenItemReviewModal(false)}
            formValues={formValues}
            setFormValues={setFormValues}
            handleSubmitReview={handleSubmitItemReview}
            type="product"
            selectedItemToReview={selectedItemToReview}
          />
        </AccountSidebarLayout>
      </div>

      {/* MOBILE */}
      <div className="md:hidden">
        <div className="my-4">
          {storeType !== StoreTypes.B2B_STORETYPE && (
            <FontAwesomeIcon
              icon={faArrowLeft}
              pull="left"
              size="lg"
              className="cursor-pointer pl-5 absolute"
              onClick={() => {
                if (
                  storeType === StoreTypes.AC_STORETYPE ||
                  storeType === StoreTypes.B2B_STORETYPE
                ) {
                  router.push("/order");
                } else {
                  if (isAuthenticated) {
                    router.push("/order");
                  } else {
                    router.push("/");
                  }
                }
              }}
            />
          )}
          <h4 className="m-0 text-center"> {t("Order Detail")} </h4>
        </div>

        <div>
          <div className="flex flex-col w-full items-center px-4">
            {/* order summary */}
            <div className="w-full bg-white px-4 py-3.5 mb-4 rounded-lg">
              <div className=" flex items-center justify-between text-[14px]">
                <p className="text-[#0A2540] font-medium m-0">
                  {order?.orderNumber}
                </p>
                <div>
                  <OrderStatus
                    status={ToBeRemovedGetOrderStatusMapping(order)}
                  />
                </div>
              </div>
              <p className="text-[#0A2540] font-medium m-0 text-[10px] xs:text-sm">
                {order?.storeName}
              </p>
              <p className="mt-0 text-[10px] xs:text-xs text-grey-500">
                {dayjs(order?.createdAt).format("DD MMM YYYY")}{" "}
                <span>{dayjs(order?.createdAt).format("hh:mm A")}</span>
              </p>

              <div className="flex justify-between text-grey-500 border-t">
                <p className="text-[12px] mb-1">
                  {getOrderTypeText(order?.type)}
                </p>
                <p className="text-[12px] mb-1">{t("Total")}</p>
              </div>
              <div className="flex justify-between text-[#0A2540] 960-up:text-base">
                <p className="w-4/6 960-up:w-fit text-[10px] m-0">
                  {order?.type === OrderTypes.DELIVERY && order.deliveryAddress}
                </p>
                <PriceWithCurrency
                  value={order?.grandTotal}
                  className="font-bold text-[12px]"
                />
              </div>
            </div>
            {/* order item details */}
            <div className="w-full bg-white px-4 py-3.5 mb-4 rounded-lg">
              {orderDetail?.map((data) => {
                const imageDisplay = process.env.BUCKET_URL + data.itemImage;
                return (
                  <div className="flex mb-3 last:m-0 items-center">
                    {/* <div className="relative w-auto h-auto basis-1/2 rounded-xl overflow-hidden">
                      <Image
                        layout="fill"
                        objectFit="cover"
                        alt={data.itemTitle}
                        src={imageDisplay}
                      />
                    </div> */}
                    <div className="flex-[1] py-3 flex items-center">
                      <AspectRatioSquareContainer rounded="xl">
                        <Image
                          layout="fill"
                          objectFit="cover"
                          alt={data.itemTitle}
                          src={imageDisplay}
                        />
                      </AspectRatioSquareContainer>
                    </div>

                    <div className="flex-[3] flex flex-col w-full ml-4 justify-center">
                      <p className="text-blue text-xs font-semibold m-0 xs:text-base mb-1">
                        {data.itemTitle}
                      </p>
                      {data.redemptionCode ? (
                        <>
                          <p className="text-[12px] mb-0 mt-0">
                            {data.description.replace(/(<([^>]+)>)/gi, "")}
                          </p>
                          <p className="text-[12px] font-semibold mb-0 mt-0">
                          {t("Redemption Code")} : {data.redemptionCode}
                          </p>
                        </>
                      ) : null}
                      {data.selectedModifierGroups?.length > 0 &&
                        getSelectedModifiersToDisplayList(
                          data.selectedModifierGroups
                        ).map((modifierName) => (
                          <p className="text-[11px] text-[#636363] m-0">
                            {modifierName}
                          </p>
                        ))}
                      <p className="text-blue text-xs my-1 xs:text-base mt-2">
                        <PriceWithCurrency
                          value={data.subtotalWithTax}
                          className="text-blue text-[14px]"
                        />
                      </p>
                    </div>
                    <p className="text-xs m-0">x{data.orderedQuantity}</p>
                  </div>
                );
              })}
            </div>
            {/* order summary */}
            <div className="w-full bg-white px-4 py-3.5 mb-4 rounded-lg">
              <div className="flex justify-between items-center w-full">
                <label className="text-[#636363] text-[12px]">{t("Subtotal")}</label>
                <PriceWithCurrency
                  value={order?.subtotalWithTax}
                  className="text-blue text-[13px]"
                />
              </div>
              {/* tax */}
              {order?.subtotalWithTax > order?.subtotal && (
                <div className="flex justify-between items-center w-full">
                  <label className="text-[#636363] text-[12px] opacity-40">
                    {t("Incl. Tax")}
                  </label>
                  <PriceWithCurrency
                    value={order?.subtotalWithTax - order?.subtotal}
                    total={order?.grandTotal}
                    className="text-blue text-[13px] opacity-40"
                  />
                </div>
              )}
              {/* delivery fee */}
              {order?.type === OrderTypes.DELIVERY && (
                <div className="flex justify-between items-center w-full">
                  <label className="text-[#636363] text-[12px]">
                   {t("Delivery fee")}
                  </label>
                  <PriceWithCurrency
                    value={order?.estimatedDeliveryFee}
                    className="text-blue text-[13px]"
                  />
                </div>
              )}

               {/* promo code discount */}
               {order?.promoCode && (
                  <p className="text-[12px] opacity-70 flex justify-between ">
                    <label className="text-ellipsis overflow-hidden">
                      {t("Promocode")} {" (" + order?.promoCode + ")"}
                    </label>
                    <PriceWithCurrency
                      value={order?.totalDiscount}
                      total={order?.grandTotal}
                      prefix="-"
                    />
                  </p>
                )}

              <div className="flex justify-between items-center w-full">
                <label className="text-[#636363] text-[12px]">{t("Total")}</label>
                <PriceWithCurrency
                  value={order?.grandTotal}
                  className="text-blue font-bold text-[15px] border-t"
                />
              </div>

              {(order?.refundAmount && order?.refundAmount > 0) && (
                <div className="flex justify-between items-center w-full">
                  <label className="text-[#636363] text-[12px]">{t("Refund")}</label>
                  <PriceWithCurrency
                    value={order.refundAmount}
                    total={order.grandTotal}
                    prefix="- "
                    className="text-red-600 text-[13px]"
                  />
                </div>
              )}
            </div>

            {order?.status === "Delivering" &&
              order?.driverLatitude &&
              order?.driverLongitude &&
              order?.deliveryLatitude &&
              order?.deliveryLongitude && (
                <div className="w-full text-[12px]">
                  <div className="py-3.5 h-64 ">
                    <CustomMapComponent
                      markers={[
                        {
                          name: "rider",
                          position: {
                            lat: Number(order?.driverLatitude),
                            lng: Number(order?.driverLongitude),
                          },
                        },
                        {
                          name: "destination",
                          position: {
                            lat: Number(order?.deliveryLatitude),
                            lng: Number(order?.deliveryLongitude),
                          },
                        },
                      ]}
                    />
                  </div>
                  <p>
                    <label className="text-[12px] font-bold">{t("ETA")}: </label>
                    {dayjs(order?.ETACustomer).format("DD/MM/YYYY hh:MM a")}
                  </p>
                  <p>
                    <label className="text-[12px] font-bold">
                    {t("Last updated")} :{" "}
                    </label>
                    {dayjs(order?.updatedAt).format("DD/MM/YYYY hh:MM a")}
                  </p>
                </div>
              )}
            {order?.deliveryStatus === "No Rider Found" &&
              order?.deliveryPartnerName === "Lalamove" && (
                <div className="w-full bg-white px-4 py-3.5 rounded-lg mb-4">
                  <h4 className="my-2">{t("Rider Details")}</h4>
                  <div className="flex justify-between items-center w-full">
                    <label className="text-[12px] font-bold">
                      {order?.driverName}
                    </label>
                    <label className="text-[12px] font-bold">
                      {order?.deliveryNumber}
                    </label>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <label className="text-[12px] text-[#636363]">
                      {order?.driverPhoneNumber}
                    </label>
                    <label className="text-[12px] text-[#636363]">
                      {order?.driverPlateNumber}
                    </label>
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="text-[13px] mb-0 mt-1.5">{t("Track your order")}:</p>
                    <p className="text-[12px] text-[#69B9EA] break-all my-0">
                      <a
                        href={order?.standardDeliveryTrackingUrl}
                        target="_blank"
                      >
                        {order?.standardDeliveryTrackingUrl}
                      </a>
                    </p>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
