import useTranslation from "next-translate/useTranslation";
const OrderStatus = (props) => {
  const { t } = useTranslation("common");
  const { status } = props;

  const translateStatus = (statusText) => {
    if (statusText === "Order Completed") {
      return t("Order Completed");
    } else if (statusText === "Order Partially Completed") {
      return t("Order Partially Completed");
    } else if (statusText === "Payment Failed") {
      return t("Payment Failed");
    } else if (statusText === "Waiting Refund") {
      return t("Waiting Refund");
    } else if (statusText === "Pending Fulfilled") {
      return t("Pending Fulfilled");
    } else if (statusText === "Pending") {
      return t("Pending");
    } else if (statusText === "Shipping") {
      return t("Shipping_Status");
    } else if (statusText === "Ready for Customer Pickup") {
      return t("Ready for Customer Pickup");
    } else if (statusText === "Order Fulfilled") {
	    return t("Order Fulfilled");
    } else if (statusText === "Order Partially Fulfilled") {
	    return t("Order Partially Fulfilled");
    } else {
      return statusText;
    }
  };

  return (
    <div
      className={`${
        status === "Order Completed" || status === "Order Partially Completed"
          ? "text-green-500 bg-green-100" //green
          : status === "Payment Failed"
          ? "text-[red] bg-red-100"
          : status === "Waiting Refund"
          ? "text-blue-500 bg-blue-100" // blue
          : "text-orange-500 bg-orange-100" // orange}
      } ${"text-center p-[5px] rounded text-[12px]"}
        `}
    >
      {translateStatus(status)}
    </div>
  );
};

export default OrderStatus;
