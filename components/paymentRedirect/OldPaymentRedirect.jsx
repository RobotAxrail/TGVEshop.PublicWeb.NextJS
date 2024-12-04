import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import _ from "lodash";
import Cookies from "universal-cookie";
import useTranslation from "next-translate/useTranslation";

// icons
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";

// components
import { ContainedButton } from "@/components/buttons/Buttons";
import PriceWithCurrency from "@/components/priceWithCurrency/PriceWithCurrency";

// contexts
import MerchantContext from "@/contexts/MerchantContext";

//constants
import { StoreTypes } from "@/enums/enums";

const MANUAL_PAYMENT_ORDER_PAYMENT_STATUS_LIST = [
  "Pending Fulfilled",
  "Order Fulfilled",
  "To Ship",
  "Shipping",
  "Order Completed",
  "Pending Payment",
];

//THIS COMPONENT IS NOT IN USED, IT IS REPLACED BY PaymentRedirect.tsx file
//ONLY FOR REFERENCE PURPOSE IN CASE THERE IS LOGIC MISMATCH WITH THE NEW COMPONENT

function PaymentRedirect(props) {
  const { orderDetails, checking } = props;
  const { storeType } = useContext(MerchantContext);
  const router = useRouter();
  const cookie = new Cookies();
  const { t } = useTranslation("common");
  //   const { setPlatform } = useContext(DocumentContext);

  useEffect(() => {
    checking
      ? null
      : orderDetails.paymentType === "ManualPayment"
      ? MANUAL_PAYMENT_ORDER_PAYMENT_STATUS_LIST.includes(
          orderDetails.manualPaymentOrderStatus
        )
      : orderDetails.paymentStatus === "SUCCESS"
      ? window.dataLayer.push({
          event: "paymentSuccess",
        })
      : null;
  }, []);

  useEffect(() => {
    orderDetails.paymentStatus === "SUCCESS"
      ? window.dataLayer.push({
          event: "paymentSuccess",
        })
      : null;
  }, []);

  const hardsellInfoMapping = {
    [StoreTypes.MULTISTORE_STORETYPE]: {
      url: "https://www.axrail.com/axrail-commerce",
      title: "Sell on Axrail commerce",
    },
    [StoreTypes.AC_STORETYPE]: {
      url: "https://www.axrail.com/axrail-commerce",
      title: t("Sell on Axrail commerce"),
    },
    [StoreTypes.WARUNG_STORETYPE]: {
      url: "https://www.ewarung.shop/",
      title: t("Sell on eWarung"),
    },
  };

  return (
    <div className="flex flex-col text-center bg-white border rounded-lg">
      <div
        className={[
          "my-[50px] lg:mx-[30%] md:mx-[20%] xs:mx-[15%] mx-[10%] leading-normal",
          orderDetails.paymentType === "ManualPayment"
            ? orderDetails.manualPaymentOrderStatus === "Payment Failed"
            : ["FAILED", null, "EGHL ERROR", "CANCELLED"].includes(
                orderDetails.paymentStatus
              )
            ? "mb-0"
            : "",
        ]
          .join(" ")
          .trim()}
      >
        {checking ? (
          <h6 className="m-0 mb-4 text-xl font-semibold">
            {t("Checking Payment Status ...")}
          </h6>
        ) : (
            orderDetails.paymentType === "ManualPayment"
              ? MANUAL_PAYMENT_ORDER_PAYMENT_STATUS_LIST.includes(
                  orderDetails.manualPaymentOrderStatus
                )
              : orderDetails.paymentStatus === "SUCCESS"
          ) ? (
          <div>
            <CheckCircleIcon
              width="80px"
              height="80px"
              className="text-[#1AB466]"
            />
            <p className="m-0 mb-4 text-xl font-semibold">
              {orderDetails.manualPaymentOrderStatus === "Pending Payment"
                ? "Receipt Submitted"
                : "Order Confirmed"}
            </p>
            {orderDetails.manualPaymentOrderStatus === "Pending Payment" ? (
              <p className="m-0 text-gray-500 leading-relaxed">
                {t("We have received your uploaded receipt")}
              </p>
            ) : (
              <p className="m-0 text-gray-500 leading-relaxed">
                {t("Thank you for your purchase with us")}{" "}
                <span className="text-primary">
                  {orderDetails.customerPrimaryEmail}
                </span>
                .
              </p>
            )}
          </div>
        ) : orderDetails.paymentType === "ManualPayment" &&
          orderDetails.manualPaymentOrderStatus === "Payment Failed" ? (
          <div>
            <XCircleIcon width="80px" height="80px" className="text-[red]" />
            <p className="m-0 mb-4 text-xl font-semibold">
              {t("Payment not received.")}
            </p>
            <p className="m-0 text-gray-500 leading-relaxed">
              {t("Payment has not been received")}
            </p>
          </div>
        ) : ["FAILED", null, "EGHL ERROR", "CANCELLED"].includes(
            orderDetails.paymentStatus
          ) ? (
          <div>
            <XCircleIcon width="80px" height="80px" className="text-[red]" />
            <p className="m-0 mb-4 text-xl font-semibold">
              {t("Payment Failed")}
            </p>
            <p className="m-0 text-gray-500 leading-relaxed">
              {t("not received your payment")}
            </p>
          </div>
        ) : orderDetails.message === "Order Not Found" &&
          orderDetails.status === "false" ? (
          <div>
            <XCircleIcon width="80px" height="80px" className="text-[red]" />
            <p className="m-0 mb-4 text-xl font-semibold">
              {t("Invalid Payment Id")}
            </p>
            <p className="m-0 text-gray-500 leading-relaxed">
              {t("not find your order")}
            </p>
          </div>
        ) : orderDetails.message === "Invalid customer." ? (
          <div>
            <XCircleIcon width="80px" height="80px" className="text-[red]" />
            <p className="m-0 mb-4 text-xl font-semibold">
              {t("Invalid Order Number")}
            </p>
            <p className="m-0 text-gray-500 leading-relaxed">
            {t("find this order in your account")}
            </p>
          </div>
        ) : null}
      </div>

      {checking ? null : (
          orderDetails.paymentType === "ManualPayment"
            ? MANUAL_PAYMENT_ORDER_PAYMENT_STATUS_LIST.includes(
                orderDetails.manualPaymentOrderStatus
              )
            : orderDetails.paymentStatus === "SUCCESS"
        ) ? (
        <div className="lg:mx-[30%] md:mx-[20%] xs:mx-[15%] mx-[10%]">
          <div className="flex">
            <span className="xs:w-2/5 w-1/2">
              <p className="m-0 text-gray-500 leading-[2.5]">{t("Payment Type")}</p>
            </span>
            <span className="xs:w-3/5 w-1/2">
              <p className="m-0 text-center leading-[2.5] break-words">
                {orderDetails.paymentType === "ManualPayment"
                  ? (orderDetails.isBankTransfer ? "Bank Transfer - " : "") +
                    (orderDetails.manualPaymentMethodName ?? "None")
                  : orderDetails.paymentMethod ?? "None"}
              </p>
            </span>
          </div>
          {/* <div className="flex">
            <span className="xs:w-2/5 w-1/2">
              <p class  Name="m-0 text-gray-500 leading-[2.5]">{t("Mobile Number")}</p>
            </span>
            <span className="xs:w-3/5 w-1/2">
              <p className="m-0 text-center leading-[2.5] break-words">
                {orderDetails.customerMobileNo
                  ? orderDetails.customerMobileNo
                  : "None"}
              </p>
            </span>
          </div> */}
          <div className="flex">
            <span className="xs:w-2/5 w-1/2">
              <p className="m-0 text-gray-500 leading-[2.5]">{t("Amount Paid")}</p>
            </span>
            <span className="xs:w-3/5 w-1/2">
              <p className="m-0 text-center leading-[2.5] break-words">
                <PriceWithCurrency value={orderDetails.grandTotal} />
              </p>
            </span>
          </div>
          <div className="flex">
            <span className="xs:w-2/5 w-1/2">
              <p className="m-0 text-gray-500 leading-[2.5]">{t("Transaction ID")}</p>
            </span>
            <span className="xs:w-3/5 w-1/2">
              <p className="m-0 text-center leading-[2.5] break-words">
                {orderDetails.orderNumber}
              </p>
            </span>
          </div>
        </div>
      ) : null}
      <div className="my-[50px] mx-[20%] xs:mx-[30%]">
        {checking ? null : (
            orderDetails.paymentType === "ManualPayment"
              ? MANUAL_PAYMENT_ORDER_PAYMENT_STATUS_LIST.includes(
                  orderDetails.manualPaymentOrderStatus
                )
              : orderDetails.paymentStatus === "SUCCESS"
          ) ? (
          <ContainedButton
            onClick={() => {
              router.push({
                pathname: `/order/${orderDetails.orderId}`,
              });
            }}
            className="w-full font-semibold h-12"
          >
            {t("View Order Details")}
          </ContainedButton>
        ) : null}

        {checking ? null : (
          <button
            onClick={() => {
              router.push({
                pathname: `/`,
              });
            }}
            className="w-full font-semibold h-12"
            fontSize="text-[13px]"
          >
            {t("Continue Shopping")}
          </button>
        )}

        <a
          href={storeType && hardsellInfoMapping[storeType].url}
          className="cursor-pointer no-underline"
          target="blank"
        >
          <p>{storeType && hardsellInfoMapping[storeType].title}</p>
        </a>
      </div>
    </div>
  );
}

export default PaymentRedirect;
