import WarungOrderListItem from "@/components/orders/ewarung/WarungOrderListItem";
import AccountSidebarLayout from "@/components/layouts/AccountSidebarLayout";
import { EmptyState } from "@/components/emptyState/EmptyState";
import { MdOutlineShoppingCart } from "react-icons/md";
import Router, { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

// icons/img
import empty from "@/images/empty-cart.svg";

type IOrderList = {
  orderList: any;
  total: number;
  isApiFetching: boolean;
  membershipTierActivated: boolean;
};

const WarungOrderList: React.FC<IOrderList> = ({ orderList, total, isApiFetching, membershipTierActivated }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  return (
    <AccountSidebarLayout isLoading={isApiFetching}>
      <div className="flex flex-col h-full w-full sm:max-w-[50rem] mx-auto">
        <div className="flex-1 px-5 py-2 bg-[#fff] space-y-4 relative">
          {total === 0 && !isApiFetching ? (
            <div className="flex items-center justify-center flex-col w-full bg-red">
              <EmptyState
                src={empty}
                title={t("No orders yet")}
                subtitle={t("You dont have any orders")}
                hasButton={true}
                buttonTitle={t("Browse products")}
                buttonClassName={null}
                icon={null}
                buttonAction={() =>
                  router.push("/collections-menu")
                }
              />
            </div>
          ) :
            orderList.map((order: any, index: number) => (
              <WarungOrderListItem order={order} key={index} />
            ))
          }
        </div>
      </div>
    </AccountSidebarLayout>
  );
};

export default WarungOrderList;
