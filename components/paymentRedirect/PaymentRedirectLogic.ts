import { IOrderDetails } from "types";
import useTranslation from "next-translate/useTranslation";

export const getTransactionInformationlist = ({
  paymentType,
  isBankTransfer,
  paymentMethod,
  manualPaymentMethodName,
  grandTotal,
  orderNumber,
}: IOrderDetails) => {
  const { t } = useTranslation("common");
  const paymentTypeText =
    paymentType === "PayAtCounter"
      ? t("Pay At Counter")
      : paymentType === "ManualPayment"
      ? (isBankTransfer ? "Bank Transfer - " : "") +
        (manualPaymentMethodName
          ? manualPaymentMethodName === "TnG"
            ? "Touch 'n Go eWallet"
            : manualPaymentMethodName
          : t("None"))
      : paymentMethod ?? t("None");

  const amountPaidText = grandTotal;

  const transactionIdText = orderNumber;

  const transactionInfoMap = new Map([
    ["paymentType", { title: t("Payment Type"), content: paymentTypeText }],
    ["amountPaid", { title: t("Amount Paid"), content: amountPaidText }],
    [
      "transactionId",
      { title: t("Transaction ID"), content: transactionIdText },
    ],
  ]);

  return transactionInfoMap;
};

export const getPageStatus = ({
  manualPaymentOrderStatus,
  paymentStatus,
  merchantName,
  orderNumber,
  paymentType,
  message,
  status,
  customerPrimaryEmail,
}: {
  manualPaymentOrderStatus: string;
  paymentStatus: string;
  merchantName: string;
  orderNumber: string;
  paymentType: string;
  message: string;
  status: string;
  customerPrimaryEmail: string;
}): {
  status: "failed" | "success";
  description: string;
  buttonTitle: string;
  title: string;
} => {
  const { t } = useTranslation("common");
  const successfulStatus = {
    description:
      t("Thank you for your purchase with us") + " " + customerPrimaryEmail,
    status: "success",
    title: t("Order Confirmed"),
  };

  const failedStatus = {
    status: "failed",
    title: t("Payment Failed"),
    description: t("not received your payment"),
  };

  const pendingPaymentStatus = {
    status: "success",
    title: t("Order Confirmed"),
    description:
      t("Thank you for your purchase with us") + " " + customerPrimaryEmail,
  };
  const messageStatus = {
    "Order Not Found": {
      status: "failed",
      title: t("Invalid Payment Id"),
      description: t("not find your order"),
    },
    "Invalid customer": {
      status: "failed",
      title: t("Invalid Order Number"),
      description: t("find this order in your account"),
    },
  }[message];

  if (messageStatus) return messageStatus as any;
  else {
    const manualPaymentSuccessCondition = {
      "Ready for Customer Pickup": successfulStatus,
      "Order Completed": successfulStatus,
      "Pending Fulfilled": successfulStatus,
      "Order Fulfilled": successfulStatus,
      "To Ship": successfulStatus,
      Shipping: successfulStatus,
    };

    const gatewayGenericStatuses = {
      "EGHL ERROR": failedStatus,
      CANCELLED: failedStatus,
      FAILED: failedStatus,
      null: failedStatus,
      SUCCESS:
        {
          "Pending Payment": pendingPaymentStatus,
        }[status] || successfulStatus,
    };

    return (
      {
        CreditLimit: {
          "Pending Fulfilled": {
            description:
              t("Thank you for your purchase with us") +
              " " +
              customerPrimaryEmail,
            title: t("Receipt Submitted"),
            status: "success",
          },
        }[manualPaymentOrderStatus],
        ManualPayment: {
          ...manualPaymentSuccessCondition,
          "Pending Payment": {
            description: t("We have received your uploaded receipt"),
            title: t("Receipt Submitted"),
            status: "success",
          },
          "Payment Failed": {
            description: t("Payment has not been received"),
            title: t("Payment not received."),
            status: "failed",
          },
          "Waiting Refund": {
            description:
              t("Your") +
              " " +
              orderNumber +
              t("has been rejected. Please contact") +
              " " +
              merchantName +
              " " +
              t("for more information"),
            title: t("Order Rejected."),
            status: "failed",
          },
        }[manualPaymentOrderStatus],
        stripe: gatewayGenericStatuses[`${paymentStatus}`],
        eGHL: gatewayGenericStatuses[`${paymentStatus}`],
        PayAtCounter: {
          "Pending Payment": {
            description: t("We have received your order"),
            title: t("Order Received"),
            status: "success",
          },
        }[manualPaymentOrderStatus],
      }[paymentType] || failedStatus
    );
  }
};
