import useTranslation from "next-translate/useTranslation";
import { useContext, useEffect, useState } from "react";

// components
import WarungOrderList from "@/components/orders/ewarung/WarungOrderList";
import OrderList from "@/components/orders/OrderList";
import SEO from "@/components/seo/SEO";

//API
import { getCustomerOrderList } from "@/graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

import Cookies from "universal-cookie";
// utils
import { Loader } from "@/components/loader/Loader";
import { StoreTypes } from "@/enums/enums";
import {
  convertFrom24To12Format,
  getOrderTypeText,
  ToBeRemovedGetOrderStatusMapping,
} from "@/utils/util";

// contexts
import AccountsSidebarLayout from "@/components/layouts/AccountSidebarLayout";
import OrderStatus from "@/components/orders/OrderStatus";
import PriceWithCurrency from "@/components/priceWithCurrency/PriceWithCurrency";
import MerchantContext from "@/contexts/MerchantContext";
import useCheckMobileScreen from "@/hooks/useCheckMobileScreen";
import { Tab } from "@headlessui/react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { withProtected } from "@/utils/routeProtection";
const LIMIT = 10;

const OrderListingScreen = () => {
  const { merchantId, membershipTierActivated } = useContext(MerchantContext);
  const cookie = new Cookies();
  const signInData = cookie.get("signIn") ?? {};
  const sessionId = cookie.get("sessionId") ?? "";

  const [nextToken, setNextToken] = useState(0);
  const { t } = useTranslation("common");
  const [currentTab, setCurrentTab] = useState(0);

  const { storeType } = useContext(MerchantContext);

  const isWarung = storeType === StoreTypes.WARUNG_STORETYPE;

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const mobileView = useCheckMobileScreen();

  const ECColumns: ColumnDef<any>[] = [
    {
      accessorKey: "orderNumber",
      header: "Order Number",
    },
    {
      accessorKey: "orderDateTime",
      header: "Date",
      cell: ({ row }) => {
        return (
          <div className="flex flex-col">
            <label>
              {dayjs(row.getValue("orderDateTime")).format("DD MMM YYYY")}
            </label>
            <label>
              {dayjs(row.getValue("orderDateTime")).format("hh:mm A")}
            </label>
          </div>
        );
      },
    },
    {
      accessorKey: "paymentMethod",
      header: "Payment",
      cell: ({ row }) => {
        return (
          <>
            {row.getValue("paymentMethod")
              ? row.getValue("paymentMethod")
              : row.getValue("manualPaymentMethodName") === "TnG"
                ? "Touch 'n Go eWallet"
                : row.getValue("manualPaymentMethodName")}
          </>
        );
      },
    },

    {
      accessorKey: "grandTotal",
      header: "Total",
      cell: ({ row }) => {
        return <PriceWithCurrency value={row.getValue("grandTotal")} />;
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        return <>{t(getOrderTypeText(row.getValue("type")))}</>;
      },
    },
    {
      accessorKey: "deliveryStatus",
      header: "Status",
      cell: ({ row }) => {
        return (
          <OrderStatus
            status={ToBeRemovedGetOrderStatusMapping(row.original)}
          />
        );
      },
    },
  ];
  const VoucherOrGiftCardColumns: ColumnDef<any>[] = [
    {
      accessorKey: "orderNumber",
      header: "Order Number",
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => {
        return (
          <div className="flex flex-col">
            <label>
              {dayjs(row.getValue("createdAt")).format("DD MMM YYYY")}
            </label>
            <label>{dayjs(row.getValue("createdAt")).format("hh:mm A")}</label>
          </div>
        );
      },
    },
    {
      accessorKey: "grandTotal",
      header: "Total",
      cell: ({ row }) => {
        return <PriceWithCurrency value={row.getValue("grandTotal")} />;
      },
    },
  ];
  const inStoreColumns: ColumnDef<any>[] = [
    {
      accessorKey: "receiptNo",
      header: "Order Number",
    },
    {
      accessorKey: "transactionDate",
      header: "Date",
      cell: ({ row }) => {
        const date = dayjs().toISOString()
        const time = dayjs(`${date.split("T")[0]}T${row?.original?.transactionTime}.000Z`).format("hh:mm A")
        return (
          <div className="flex flex-col">
            <label>
              {`${dayjs(row?.getValue("transactionDate")).format("DD MMM YYYY")} ${time}`}
            </label>
          </div>
        );
      },
    },
    {
      accessorKey: "totalAmountSpent",
      header: "Total",
      cell: ({ row }) => {
        return <PriceWithCurrency value={row.getValue("totalAmountSpent")} />;
      },
    },
    {
      accessorKey: "totalPointsCollected",
      header: "Points Earned",
      cell: ({ row }) => {
        return <>{`+${row.getValue("totalPointsCollected")} Points`}</>;
      },
    },
  ];

  const TAB_LIST = [
    {
      title: "E-Commerce",
      type: "ecommerce",
      columns: ECColumns,
    },
    {
      title: "Voucher",
      type: "voucherpurchases",

      columns: VoucherOrGiftCardColumns,
    },
    {
      title: "Gift Card",
      type: "giftCard",
      columns: VoucherOrGiftCardColumns,
    },
    {
      title: "In-Store",
      type: "instoreorder",
      columns: inStoreColumns,
    },
  ];
  const { ref, inView } = useInView();

  const { data: desktopData, isFetching: isFetchingDesktopData } = useQuery({
    queryKey: [
      "orderList-desktop",
      {
        nextToken: nextToken,
        sessionId: sessionId,
        filterType: TAB_LIST[currentTab].type,
      },
    ],
    queryFn: () =>
      getOrder({
        accessToken: signInData.accessToken ?? "",
        customerId: sessionId,
        merchantId: merchantId,
        sort: null,
        filter: {},
        filterType: TAB_LIST[currentTab].type,
        limit: LIMIT,
        nextToken: nextToken,
      }),
    enabled: !mobileView,
    refetchOnWindowFocus: false,
  });

  const {
    data: mobileData,
    isFetching: isFetchingMobileData,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "orderList-mobile",
      {
        nextToken: nextToken,
        sessionId: sessionId,
        filterType: TAB_LIST[currentTab].type,
      },
    ],
    queryFn: async ({ pageParam = 0 }) => {
      return await getOrder({
        accessToken: signInData.accessToken ?? "",
        customerId: sessionId,
        merchantId: merchantId,
        sort: null,
        filter: {},
        filterType: TAB_LIST[currentTab].type,
        limit: LIMIT,
        nextToken: pageParam,
      });
    },
    refetchOnWindowFocus: false,
    enabled: mobileView,
    getNextPageParam: (lastPage) => lastPage.nextToken,
    getPreviousPageParam: (firstPage) => firstPage.nextToken,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <SEO title={t("My Orders")} keywords="" description="My Orders" />
      {!isWarung ? (
        <AccountsSidebarLayout>
          <div className="h-fit relative">
            <Tab.Group
              defaultIndex={0}
              onChange={(index) => {
                setCurrentTab(index);
                setNextToken(0);
              }}
            >
              <Tab.List className="flex p-1 space-x-1 shadow-lg rounded-xl bg-white">
                {TAB_LIST.map((tab) => (
                  <Tab
                    key={tab.title}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5 ",
                        "ring-opacity-60  ring-primary focus:outline-none focus:ring-2",
                        selected
                          ? "bg-primary shadow text-white"
                          : "text-[#9AA4B2] hover:bg-primary hover:text-white"
                      )
                    }
                  >
                    {tab.title}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-6 bg-white border shadow rounded-md md:bg-transparent md:border-none md:shadow-none md:rounded-none">
                {TAB_LIST.map((tab) => (
                  <Tab.Panel key={tab.title}>
                    <OrderList
                      mobileScrollRef={ref}
                      columns={tab.columns}
                      orderList={
                        (mobileView
                          ? mobileData?.pages
                          : currentTab === 3 ? desktopData?.inStoreOrders : desktopData?.orders) || []
                      }
                      isApiFetching={
                        isFetchingDesktopData || isFetchingMobileData
                      }
                      total={
                        (!mobileView
                          ? desktopData?.total
                          : mobileData?.pages[0]?.total) || 0
                      }
                      setNextToken={setNextToken}
                      currentTab={currentTab}
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </AccountsSidebarLayout>
      ) : isFetchingDesktopData || isFetchingMobileData ? (
        <Loader divHeight="h-full" />
      ) : (
        <WarungOrderList
          orderList={currentTab === 3 ? desktopData?.inStoreOrders : desktopData?.orders || []}
          total={desktopData?.total || 0}
          isApiFetching={isFetchingDesktopData}
          membershipTierActivated={membershipTierActivated}
        />
      )}
    </>
  );
};

async function getOrder(params: any) {
  try {
    const {
      data: { getCustomerOrderList: res },
    } = (await API.graphql(
      graphqlOperation(getCustomerOrderList, params)
    )) as any;
    return res;
  } catch (error) {
    return {};
  }
}

export default withProtected(OrderListingScreen);
