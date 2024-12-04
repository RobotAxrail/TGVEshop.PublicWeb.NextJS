import { BadgeButton } from "@/components/buttons/Buttons";
import { VoucherIcon } from "@/components/image/VoucherIcon";
import AccountsSidebarLayout from "@/components/layouts/AccountSidebarLayout";
import SEO from "@/components/seo/SEO";
import MerchantContext from "@/contexts/MerchantContext";
import { StoreTypes } from "@/enums/enums";
import { Tab } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { getMyVoucherList } from "modules/rewards/api";
import { VoucherNotification } from "modules/rewards/components/notification/VoucherNotification";
import MyVoucherTab from "modules/rewards/views/MyVoucherTab";
import StampingModule from "modules/rewards/views/StampingModule";
import VoucherModule from "modules/rewards/views/VoucherModule";
import { useRouter } from "next/router";
import { Fragment, ReactElement, useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { GiftCardTab } from "../modules/giftCard/views/GiftCardTab";

export default function Rewards() {
  const router = useRouter();
  const [isViewingVoucher, setIsViewingVoucher] = useState(false);
  const notificationType = router.query.isReceive;
  const defaultTabFromQuery = router?.query?.tab || "myvoucher";
  const isNotificationPage =
    notificationType === "true" || notificationType === "false";

  const { membershipTierActivated } = useContext(MerchantContext);

  useEffect(() => {
    if (!membershipTierActivated) {
      router.replace("/");
    }
    // if(!isAuthenticated) {
    //   router.replace("/login")
    // }
  }, []);

  return (
    <AccountsSidebarLayout>
      {!isNotificationPage ? (
        <RewardsLayout
          notificationType={notificationType as string}
          defaultTab={defaultTabFromQuery as string}
        />
      ) : (
        <VoucherNotification
          isViewingVoucher={isViewingVoucher}
          selectedIndex={notificationType === "false" ? 0 : 1}
        >
          <Tab.Panel>
            <MyVoucherTab
              isViewingVoucher={isViewingVoucher}
              setIsViewingVoucher={setIsViewingVoucher}
              mode="pendingreceiveraccept"
            />
          </Tab.Panel>
          <Tab.Panel>
            <MyVoucherTab
              isViewingVoucher={isViewingVoucher}
              setIsViewingVoucher={setIsViewingVoucher}
              mode="pendingaccept"
            />
          </Tab.Panel>
        </VoucherNotification>
      )}
    </AccountsSidebarLayout>
  );
}

function RewardsLayout({
  notificationType,
  defaultTab,
}: {
  notificationType: string;
  defaultTab: string;
}) {
  const router = useRouter();
  const [isViewingVoucher, setIsViewingVoucher] = useState(false);
  const { storeType } = useContext(MerchantContext);

  function toVoucherNotification() {
    router.push({
      pathname: "/rewards",
      query: {
        isReceive: "false",
      },
    });
  }
  const REWARDS_TAB = [
    {
      label: "My Voucher",
      component: (
        <MyVoucherTab
          isViewingVoucher={isViewingVoucher}
          setIsViewingVoucher={setIsViewingVoucher}
        />
      ),
    },
    {
      label: "Stamping",
      component: <StampingModule />,
    },
    {
      label: "Voucher",
      component: <VoucherModule />,
    },
    {
      label: "My Gift Card",
      component: <GiftCardTab />,
    },
  ];

  const filteredRewardTab = () => {
    if (storeType !== StoreTypes.WHATSAPP_CRM_STORETYPE) {
      return REWARDS_TAB;
    }

    return REWARDS_TAB.filter((tab) =>
      ["My Gift Card", "My Voucher"].includes(tab.label)
    );
  };

  const checkDefaultTab = () => {
    if (defaultTab === "giftcard") {
      return filteredRewardTab().findIndex((t) => t.label === "My Gift Card");
    }
    return 0;
  };

  return (
    <RewardsTabs
      isViewingVoucher={isViewingVoucher}
      toVoucherNotification={toVoucherNotification}
      notificationType={notificationType}
      defaultTab={checkDefaultTab()}
      tabList={filteredRewardTab().map((tab) => tab.label)}
    >
      {filteredRewardTab().map((tab) => (
        <Tab.Panel key={tab.label}>{tab.component}</Tab.Panel>
      ))}
    </RewardsTabs>
  );
}

function RewardsTabs({
  children,
  isViewingVoucher,
  toVoucherNotification,
  defaultTab,
  tabList,
}: {
  children: ReactElement | ReactElement[];
  notificationType: string;
  isViewingVoucher: boolean;
  toVoucherNotification: () => void;
  defaultTab: number;
  tabList?: string[];
}) {
  const cookie = new Cookies();

  const { merchantId, storeType } = useContext(MerchantContext);

  const { data } = useQuery({
    queryKey: ["pending-length"],
    queryFn: async () =>
      await getMyVoucherList({
        customerId: cookie.get("signIn")?.customerId,
        merchantId,
        filterType: "allpending",
      }),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <SEO title="My Rewards" keywords="" description="My Rewards" />
      <div className="h-fit relative">
        <Tab.Group defaultIndex={defaultTab}>
          {!isViewingVoucher && (
            <div className="flex flex-row justify-between items-center ">
              <Tab.List className={"overflow-x-auto flex w-full gap-2"}>
                {tabList.map((title) => (
                  <Tab as={Fragment} key={title}>
                    {({ selected }) => (
                      <button
                        className={`w-full sm:w-auto border-b mx-2.5 sm:px-4 py-2 outline-none ${
                          selected
                            ? "border-black text-black"
                            : "border-white text-[#697586]"
                        }`}
                      >
                        {title}
                      </button>
                    )}
                  </Tab>
                ))}
              </Tab.List>
              {storeType !== StoreTypes.WHATSAPP_CRM_STORETYPE && (
                <BadgeButton
                  icon={<VoucherIcon color="#0A2540" />}
                  style={{
                    borderRadius: "10px",
                    border: "none",
                    padding: 10,
                    backgroundColor: "#EEF2F6",
                    width: 44,
                    height: 44,
                    cursor: "pointer",
                  }}
                  onClick={toVoucherNotification}
                  number={data?.list?.length || 0}
                ></BadgeButton>
              )}
            </div>
          )}
          <Tab.Panels className={"h-fit mt-6"}>{children}</Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
