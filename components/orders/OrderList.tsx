import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { Fragment, useContext } from "react";

//Components
import { EmptyState } from "@/components/emptyState/EmptyState";

// icons/img
import empty from "@/images/empty-cart.svg";

// contexts
import MerchantContext from "@/contexts/MerchantContext";
// utils
import OrderListItem from "./OrderListItem";
// hooks
import useCheckMobileScreen from "@/hooks/useCheckMobileScreen";

//constants
import { StoreTypes } from "@/enums/enums";
import { Loader } from "../loader/Loader";
import { DataTable } from "../table/DataTable";

const OrderList = ({
  orderList,
  isApiFetching,
  total = 0,
  setNextToken,
  columns,
  mobileScrollRef,
  currentTab,
}) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { storeType } = useContext(MerchantContext);

  const getOrderTypeMapping = (orderType) => {
    switch (orderType) {
      case "Delivery":
        return t("Delivery to:");
      case "DineIn":
        return t("Dine In");
      case "PickUp":
        return t("Pick Up");

      default:
    }
  };

  const mobileView = useCheckMobileScreen();

  return (
    <>
      {isApiFetching && total === 0 && (
        <div className="md:hidden">
          <Loader />
        </div>
      )}
      {total === 0 && !isApiFetching ? (
        <EmptyState
          src={empty}
          title={t("No orders yet")}
          subtitle={t("You dont have any orders")}
          hasButton={true}
          buttonTitle={t("Browse products")}
          buttonAction={() =>
            storeType === StoreTypes.WARUNG_STORETYPE
              ? router.push("/collections-menu")
              : router.push("/")
          }
        />
      ) : (
        <>
          {/* desktop view */}
          {!mobileView && (
            <div className="hidden md:block w-full">
              <DataTable
                columns={columns}
                data={orderList}
                total={total}
                setNextToken={setNextToken}
                isApiFetching={isApiFetching}
                onClickRow={(row) => {
                  router.push(`/order/${row.orderId}`);
                }}
              />
            </div>
          )}
          {/* Mobile View */}
          {mobileView && (
            <div className="lg:hidden flex flex-col items-center">
              {orderList.map((page) => (
                <Fragment key={page.nextToken}>
                  {page?.orders?.map((order, index) => (
                    <div key={index} className="w-full">
                      <OrderListItem
                        index={index}
                        order={order}
                        getOrderTypeMapping={getOrderTypeMapping}
                        currentTab={currentTab}
                      />
                    </div>
                  ))}
                </Fragment>
              ))}
              <div ref={mobileScrollRef}></div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default OrderList;
