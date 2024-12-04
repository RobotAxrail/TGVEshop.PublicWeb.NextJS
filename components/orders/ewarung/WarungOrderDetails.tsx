import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setToastState } from "@/states/toastBarState";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Router, { useRouter } from "next/router";
import dayjs from "dayjs";
import Image from "next/image";
import AspectRatioSquareContainer from "@/components/shared/AspectRatioSquareContainer";
import { useCart } from "@/contexts/CartContext";
import produce from "immer";
import { ContainedButton } from "@/components/buttons/Buttons";
import OrderStatus from "../OrderStatus";
import MerchantContext from "@/contexts/MerchantContext";
import { generateS3DownloadLink } from "@/graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import useTranslation from "next-translate/useTranslation";

const WarungOrderDetails = (props) => {
  const { order, orderDetail } = props;
  const { currency, merchantId } = useContext(MerchantContext);
  const { t } = useTranslation("common");

  const router = useRouter();
  const { addItemCartList } = useCart() as any;

  const [isLoadingReorder, setIsLoadingReorder] = useState(false);
  const handleReorder = async (order: any, orderDetail: any): Promise<void> => {
    setIsLoadingReorder(true);
    let addToCartReturns = [];
    for (let o in orderDetail) {
      let cleanedModifierGroups = produce(
        orderDetail[o].selectedModifierGroups,
        (draft) => {
          for (let modifierGroup in draft) {
            delete draft[modifierGroup]["isSelected"];
            let tmpModifiers: any[] = [];

            for (let modifier in draft[modifierGroup]["modifier"]) {
              if (draft[modifierGroup]["modifier"][modifier]["isSelected"]) {
                delete draft[modifierGroup]["modifier"][modifier]["isSelected"];
                delete draft[modifierGroup]["modifier"][modifier]["price"];
                tmpModifiers.push(draft[modifierGroup]["modifier"][modifier]);
              }
            }
            draft[modifierGroup]["modifier"] = tmpModifiers;
          }
        }
      );

      let addToCartRes = await addItemCartList(
        orderDetail[o].itemId,
        orderDetail[o].orderedQuantity,
        "ProductUOM",
        order.type,
        cleanedModifierGroups,
        false
      );
      addToCartReturns.push(
        !!addToCartRes ? addToCartRes?.status : !!addToCartRes
      );
    }
    setIsLoadingReorder(false);
    if (addToCartReturns.includes(false)) {
      setToastState({
        show: true,
        severity: "error",
        message:
          t("Some products were not added to cart because they are no longer available"),
      });
    } else {
      setToastState({
        show: true,
        severity: "success",
        message: t("Successfully added to cart"),
      });
    }
  };

  async function fetchOrderDetailsLink() {
    const {
      data: { generateS3DownloadLink: link },
    } = (await API.graphql(
      graphqlOperation(generateS3DownloadLink, {
        orderId: order?.orderId,
        merchantId,
      })
    )) as any;
    if (link?.status === "false")
      setToastState({
        message: t("An error has occured while generating your receipt"),
        severity: "error",
        show: true,
      });
    else {
      const a = document.createElement("a");
      a.referrerPolicy = "no-referrer";
      a.href = link?.message;
      a.target = "_blank";
      a.click();
    }
  }

  function generatePaymentMethodLabel() {
    const manPayName = order?.manualPaymentMethodName;
    const paymentType = order?.paymentType;
    return (
      {
        PayAtCounter: t("Pay At Counter"),
        stripe: "Stripe",
        eGHL: "eGHL",
        ManualPayment: {
          [manPayName]: manPayName,
          ...{ TnG: "Touch 'n Go eWallet" },
        }[manPayName],
      }[paymentType] || t("Other")
    );
  }

  return (
    <div className="flex flex-col h- full w-full sm:max-w-[50rem] mx-auto m-w-[400px]">
      {/* app header */}

      <div className="flex-none flex flex-row items-center justify-between bg-transparent w-full px-6 py-6 text-[#2e4f7c]">
        <div className="flex flex-row items-center justify-start">
          <button
            className="w-3"
            onClick={() => {
              router.push("/order");
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>

          <h2 className="text-sm font-semibold ml-3 my-0">
            {t("Back to Order History")}
          </h2>
        </div>
        <h2 className="text-[#191919] text-base font-normal my-0">
          #{order?.orderNumber}
        </h2>
      </div>
      {/* main content */}
      <div className="flex flex-col flex-1 space-y-5 pb-6 px-6">
        {/* Delivered to */}
        <div className="px-5 py-4 rounded-xl bg-[#fff] text-[#191919]">
          <div className="flex flex-row justify-between w-full">
            <h4 className="text-base font-semibold mb-2.5 mt-0">
              {order?.type === "Delivery" ? t("Delivered to") : t("Ordered by")}
            </h4>
            <div>{order?.status && <OrderStatus status={order?.status} />}</div>
          </div>

          <div className="flex flex-row items-center justify-start">
            <h5 className="font-normal text-sm my-0">
              {order?.customerFirstName} {order?.customerLastName}
              {order?.customerMobileNo}
            </h5>
          </div>

          <div className="flex flex-row items-center justify-start mt-0.5 text-[#717171]">
            {order?.type === "Delivery" && (
              <h6 className="font-normal text-xs my-0">
                {order?.deliveryAddress}
              </h6>
            )}
          </div>
        </div>
        {/* Item Details */}
        <div className="px-5 py-4 rounded-xl bg-[#fff] text-[#191919] space-y-3">
          <h4 className="text-base font-semibold mb-4 mt-0">{t("Item Details")}</h4>

          {/* items list */}
          {orderDetail.map((data) => {
            const imageDisplay = `${process.env.BUCKET_URL}${data?.itemImage}`;

            return (
              <div
                key={data.orderDetailId}
                className="flex flex-row items-center justify-start w-full"
              >
                <div className="relative w-10 h-10 rounded-xl overflow-hidden">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    alt={data.itemTitle}
                    src={imageDisplay}
                  />
                </div>
                <div className="flex-1 flex flex-col items-start justify-center ml-4">
                  <div className="flex flex-row w-full items-center justify-between">
                    <h5 className="font-semibold my-0">{data.itemTitle}</h5>
                    <h4 className="font-normal text-sm self-center my-0">
                      {currency} {data.subtotalWithTax.toFixed(2)}
                    </h4>
                  </div>
                  <p className="text-xs my-0">{data.orderedQuantity}</p>
                </div>
              </div>
            );
          })}
        </div>
        {/* Order Summary */}
        <div className="px-5 py-4 rounded-xl bg-[#fff] text-[#191919] space-y-3">
          <h4 className="text-base font-semibold mb-4 mt-0">{t("Order Summary")}</h4>

          <div className="flex flex-row items-center justify-between">
            <h5 className="font-normal text-xs my-0">{t("Order ID")}</h5>
            <h5 className="font-normal text-xs my-0">#{order.orderNumber}</h5>
          </div>

          <div className="flex flex-row items-center justify-between">
            <h5 className="font-normal text-xs my-0">{t("Payment Mode")}</h5>
            <h5 className="font-normal text-xs my-0">
              {generatePaymentMethodLabel()}
            </h5>
          </div>

          <div className="flex-grow border-t border-dotted border-gray-400"></div>

          <div className="flex flex-row items-center justify-between">
            <h5 className="font-normal text-xs my-0">{t("subtotal")}</h5>
            <h5 className="font-normal text-xs my-0">
              {currency} {order?.subtotalWithTax?.toFixed(2)}
            </h5>
          </div>

          <div className="flex flex-row items-center justify-between">
            <h5 className="font-normal text-xs my-0">{t("Delivery Fees")}</h5>
            <h5 className="font-normal text-xs my-0">
              {currency} {order?.estimatedDeliveryFee?.toFixed(2)}
            </h5>
          </div>

          <div className="flex-grow border-t border-dotted border-gray-400"></div>

          <div className="flex flex-row items-center justify-between mt-0.5 text-[#191919]">
            <h6 className="font-bold text-xs my-0">{t("total_label")}</h6>
            <h6 className="font-bold text-xs my-0">
              {currency} {order?.grandTotal?.toFixed(2)}
            </h6>
          </div>
        </div>
        <ContainedButton
          className="w-full mb-2 px-8 py-3 rounded-lg content-center bg-[#003e87] text-[#fff] text-sm font-semibold"
          onClick={() => handleReorder(order, orderDetail)}
          loading={isLoadingReorder}
          disabled={isLoadingReorder}
        >
          {t("Reorder")}{" "}
        </ContainedButton>
        {order?.status === "Order Completed" && (
          <div className="flex w-full items-center justify-center cursor-pointer hover:opacity-50 duration-300">
            <button onClick={fetchOrderDetailsLink}>{t("Download Receipt")}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WarungOrderDetails;
