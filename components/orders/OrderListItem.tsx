import PriceWithCurrency from "@/components/priceWithCurrency/PriceWithCurrency";
import MerchantContext from "@/contexts/MerchantContext";
import { StoreTypes } from "@/enums/enums";
import { ToBeRemovedGetOrderStatusMapping } from "@/utils/util";
import dayjs from "dayjs";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useContext } from "react";
import OrderStatus from "./OrderStatus";

const OrderListItem = ({
  order,
  index,
  getOrderTypeMapping,
  currentTab,
}: any) => {
  const { storeType } = useContext(MerchantContext);
  const router = useRouter();
  const { t } = useTranslation("common");

  const VoucherAndGiftCardComponent = (
    <div className="grid grid-cols-3 m-1 my-3">
      <div className="flex flex-col col-span-2 gap-2">
        <p className="text-[#0A2540] text-[14px] font-medium m-0 break-words ">
          {order.orderNumber}
        </p>
        <p className="m-0 text-[12px] xs:text-xs text-[#697586] break-words">
          {dayjs(order.createdAt).format("DD MMM YYYY")}{" "}
          <span>{dayjs(order.createdAt).format("hh:mm A")}</span>
        </p>
      </div>
      <div className="flex flex-col col-span-1 gap-2">
        <div className="break-words text-[14px] text-[#697586] text-right">
          {t("total_label")}
        </div>

        <PriceWithCurrency
          value={order.grandTotal}
          className="font-bold text-[12px] text-[#0A2540] 960-up:text-base text-right"
        />
      </div>
    </div>
  );

  const layout = [
    {
      currentTab: 0,
      component: (
        <>
          {storeType === StoreTypes.B2B_STORETYPE && (
            <div className=" flex items-center justify-between text-[14px]">
              <p className="text-[#0A2540] font-semibold m-0">
                {order?.storeName}
              </p>
            </div>
          )}
          <div className=" flex items-center justify-between text-[14px]">
            <p className="text-[#0A2540] font-medium m-0">
              {order.orderNumber}
            </p>
            <div>
              <OrderStatus status={ToBeRemovedGetOrderStatusMapping(order)} />
            </div>
          </div>
          <p className="mt-0 text-[10px] xs:text-xs text-grey-500">
            {dayjs(order.createdAt).format("DD MMM YYYY")}{" "}
            <span>{dayjs(order.createdAt).format("hh:mm A")}</span>
          </p>

          <div className="flex justify-between text-grey-500 border-t">
            <div
              className={[
                "text-[12px] my-2 ",
                order.type !== "Delivery" && "flex items-center",
              ].join("")}
            >
              {getOrderTypeMapping(order.type)}
              {order.type === "DineIn" && (
                <div className="m-0 text-[10px] text-[#0A2540] 960-up:text-base">
                  No: {order.tableNumber}
                </div>
              )}
              {order.type === "Delivery" && (
                <div className="m-0 text-[10px] text-[#0A2540] 960-up:text-base">
                  {order.deliveryAddress}
                </div>
              )}
            </div>

            <div className="flex flex-col text-[12px] my-2 text-right">
              <div>{t("total_label")}</div>
              <PriceWithCurrency
                value={order.grandTotal}
                className="font-bold text-[12px] text-[#0A2540] 960-up:text-base"
              />
            </div>
          </div>
        </>
      ),
    },
    {
      currentTab: 1,
      component: VoucherAndGiftCardComponent,
    },
    {
      currentTab: 2,
      component: VoucherAndGiftCardComponent,
    },
  ];

  return (
    <div
      className="rounded-lg m-2 shadow-md border-solid border-[1px] bg-white shadow-grey-300 p-3 cursor-pointer "
      onClick={() => {
        if (currentTab === 0) router.push(`/order/${order.orderId}`);
      }}
      key={index}
    >
      {layout[currentTab].component}
    </div>
  );
};

export default OrderListItem;
