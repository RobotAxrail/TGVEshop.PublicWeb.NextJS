import { faTruck, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrderStatus from "../OrderStatus";
import { useRouter } from "next/router";
import moment from "moment";
import { useContext } from "react";
import MerchantContext from "@/contexts/MerchantContext";
import { StoreTypes } from "@/enums/enums";
import useTranslation from "next-translate/useTranslation";

const WarungOrderListItem = ({ order }) => {
  const router = useRouter();
  const { currency, storeType } = useContext(MerchantContext);
  const isMultistore = storeType === StoreTypes.MULTISTORE_STORETYPE;
  const { t } = useTranslation("common");

  const handleViewDetails = () => {
    router.push(`/order/${order.orderId}`);
  };

  return (
    <div
      onClick={handleViewDetails}
      className="flex flex-col w-full items-start justify-start rounded-2xl bg-[#ffffff] text-[#191919] py-5 px-5 shadow-lg cursor-pointer"
    >
      <div className="flex flex-row w-full justify-between">
        <h5 className="font-semibold m-0 text-sm">
          Order ID #{order.orderNumber}
        </h5>
        <h5 className="font-medium m-0 text-sm">
          {currency} {order.grandTotal.toFixed(2)}
        </h5>
      </div>
      <div className="py-2">
        <OrderStatus status={order?.status} />
      </div>

      <div className="flex flex-row items-center justify-start text-xs mt-1 text-[#717171]">
        {/* delivery mode icon */}
        <div className="mr-1.5 w-4">
          <FontAwesomeIcon icon={faTruck} size="sm" />
        </div>
        <p className="m-0">{order.type}</p>

        {/* circle */}
        <div className="mr-1.5 ml-2 w-1 h-1 rounded-full bg-[#717171]"></div>
        <p className="m-0">{moment(order.createdAt).format("DD MMM YYYY")},</p>
        <p className="m-0 ml-1.5">
          {moment(order.createdAt).format("hh:mm A")}
        </p>
      </div>

      <button className="flex flex-row items-center text-[#2e4f7c] mt-4">
        <h4 className="font-semibold text-sm m-0">{t("Reorder")}</h4>
        <div className="mr-1.5 ml-2 text-sm w-2">
          <FontAwesomeIcon icon={faChevronRight} size="xs" />
        </div>
      </button>
    </div>
  );
};

export default WarungOrderListItem;
