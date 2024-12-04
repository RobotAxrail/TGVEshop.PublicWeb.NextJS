import { useRouter } from "next/router";
import React, { Fragment, useContext } from "react";
import InfoSVG from "@/images/info.svg";
import PaymentSuccessSVG from "@/images/payment-success.svg";
import FailIconSVG from "@/images/fail-icon.svg";
import useTranslation from "next-translate/useTranslation";

import { ContainedButton } from "../buttons/Buttons";
import Image from "next/image";
import {
  getPageStatus,
  getTransactionInformationlist,
} from "./PaymentRedirectLogic";
import { IOrderDetails } from "types";
import PriceWithCurrency from "../priceWithCurrency/PriceWithCurrency";
import Link from "next/link";
import MerchantContext from "@/contexts/MerchantContext";
import { StoreTypes } from "@/enums/enums";

interface IPaymentRedirectProps {
  orderDetails: IOrderDetails;
}

const PaymentRedirect: React.FC<IPaymentRedirectProps> = ({ orderDetails }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { storeType, name } = useContext(MerchantContext);
  const { status, title, description } = getPageStatus({
    manualPaymentOrderStatus: orderDetails?.manualPaymentOrderStatus,
    paymentStatus: orderDetails?.paymentStatus,
    orderNumber: orderDetails?.orderNumber,
    paymentType: orderDetails?.paymentType,
    message: orderDetails?.message,
    status: orderDetails?.status,
    customerPrimaryEmail: orderDetails?.customerPrimaryEmail,
    merchantName: name,
  });

  const successOrPending = status === "success";

  const transactionInformationList =
    getTransactionInformationlist(orderDetails);

  const buttonProps2 = new Map([
    [
      "others",
      {
        title: "View Order Details",
        className: "bg-primary",
        onSubmit: () =>
          router.push({
            pathname: `/order/${orderDetails.orderId}`,
          }),
      },
    ],
    [
      "giftCard",
      {
        title: "View Gift Card",
        className: "bg-primary",
        onSubmit: () => {
          router.push({
            pathname: `/rewards`,
            query: { tab: "giftcard", id: orderDetails?.voucherId },
          });
          localStorage.setItem("afterPurchaseGiftCard", "true");
        },
      },
    ],
  ]);

  const paymentStatusTextColor = successOrPending
    ? "text-green-primary"
    : "text-red-primary";

  const paymentStatusImageSrc = successOrPending
    ? PaymentSuccessSVG
    : FailIconSVG;

  return (
    <div className="p-site-padding flex flex-col items-center">
      <div className="flex flex-col items-center px-10">
        <Image alt="image" src={paymentStatusImageSrc} width={90} height={90} />
        <h3 className={`${paymentStatusTextColor} my-6`}>{title}</h3>
        {status === "failed" && (
          <p className="text-sm mt-0 mb-6">{description}</p>
        )}
        {orderDetails?.paymentType === "PayAtCounter" &&
          status === "success" && (
            <p className="text-sm m-0">
              {" "}
              {t("Please proceed to pay at counter.")}
            </p>
          )}
      </div>

      <div className="card w-full max-w-[500px] bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h4 className="text-primary font-bold m-0 mb-2">
            {t("Transaction Information")}
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {[...transactionInformationList].map((info) => (
              <Fragment key={info[0]}>
                <p className="m-0 text-gray-400 text-sm">{info[1].title}</p>

                {/*show currency format for amountPaid key in transactionInformationList*/}
                {info[0] === "amountPaid" ? (
                  <p
                    className={`m-0 text-sm ${
                      status === "failed" && "text-red-primary"
                    }`}
                  >
                    <PriceWithCurrency value={orderDetails.grandTotal} />
                  </p>
                ) : (
                  <p className="m-0 text-sm break-words">{info[1].content}</p>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      {successOrPending && (
        <div className="bg-[#F3E4D0] rounded-md h-auto w-full max-w-[500px] p-3 grid grid-cols-[30px_auto] gap-3 mb-6">
          <Image alt="image" src={InfoSVG} width={30} height={30} />
          <p className="text-sm m-0">{description}</p>
        </div>
      )}

      {orderDetails?.orderType !== "voucherOrder" && status !== "failed" && (
        <ContainedButton
          onClick={
            buttonProps2.get(
              orderDetails?.orderType === "giftCard" ? "giftCard" : "others"
            ).onSubmit
          }
          className={`w-full max-w-[500px] rounded-md font-semibold h-10 bg-primary ${
            buttonProps2.get(
              orderDetails?.orderType === "giftCard" ? "giftCard" : "others"
            ).className
          }`}
        >
          {t(
            buttonProps2.get(
              orderDetails?.orderType === "giftCard" ? "giftCard" : "others"
            ).title
          )}
        </ContainedButton>
      )}

      {storeType !== StoreTypes.B2B_STORETYPE && (
        <Link
          href={
            storeType === StoreTypes.WARUNG_STORETYPE
              ? "/collections-menu"
              : storeType === StoreTypes.WHATSAPP_CRM_STORETYPE
              ? "/giftcard"
              : "/"
          }
        >
          <a className="text-primary my-6">{t("Back to store")}</a>
        </Link>
      )}
    </div>
  );
};

export default PaymentRedirect;
