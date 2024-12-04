// import lottie from "lottie-web/build/player/lottie_light";
import MerchantContext from "@/contexts/MerchantContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  IdentificationIcon,
  BookOpenIcon,
  CollectionIcon,
  GiftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useContext, useEffect } from "react";
// import loadingJson from "@/lottie/loading.json";
import { RiCoupon2Line } from "react-icons/ri";
import { StoreTypes } from "@/enums/enums";

export default function AccountsSidebarLayout({
  isLoading,
  children,
  showSideBar = true,
  pageName,
}: {
  children: ReactElement;
  isLoading?: boolean;
  showSideBar?: boolean;
  pageName?: string;
}) {
  const { membershipTierActivated, storeType } = useContext(MerchantContext);
  const { t } = useTranslation("common");
  const router = useRouter();
  const { user } = useAuth();
  const sidebar = [
    {
      label: t("My Account"),
      icon: <IdentificationIcon className="text-primary w-8 h-8" />,
      page: "/my-profile",
    },
    {
      label: t("Address Book"),
      icon: <BookOpenIcon className="text-primary w-8 h-8" />,
      page: "/address-book",
      hide: StoreTypes.WHATSAPP_CRM_STORETYPE === storeType,
    },
    {
      label: t("Address Book"),
      page: "/edit-address-book",
      icon: <></>,
      hide: true,
    },
    {
      label: "My Orders",
      icon: <CollectionIcon className="text-primary w-8 h-8" />,
      page: "/order",
    },
    {
      label: t("My Orders"),
      page: "/order/[orderId]",
      icon: <></>,
      hide: true,
    },
    {
      label: t("My Point History"),
      icon: <GiftIcon className="text-primary w-8 h-8" />,
      hide:
        !membershipTierActivated ||
        StoreTypes.WHATSAPP_CRM_STORETYPE === storeType,
      page: "/point-history",
    },
    {
      icon: <RiCoupon2Line className="text-primary w-8 h-8" />,
      label: t("My Reward"),
      page: "/rewards",
      hide:
        !membershipTierActivated ||
        (StoreTypes.MULTISTORE_STORETYPE !== storeType &&
          StoreTypes.WHATSAPP_CRM_STORETYPE !== storeType),
    },
  ];

  function getPageName() {
    return sidebar.filter(({ page }) => page.includes(router.pathname))[0]
      ?.label;
  }

  // useEffect(() => {
  //   lottie.loadAnimation({
  //     container: document.querySelector("#loading-svg"), // the dom element that will contain the animation
  //     animationData: loadingJson,
  //     renderer: "svg",
  //     autoplay: true,
  //     loop: true,
  //   });
  // }, [isLoading]);

  function getUserName() {
    const noUserName = !user?.firstName && !user?.lastName;
    if (noUserName) return t("No Name Available");
    else if (!user.firstName) return user?.firstName;
    else if (!user.lastName) return user?.lastName;
    return `${user?.firstName} ${user?.lastName}`;
  }

  return (
    <>
      {showSideBar ? (
        <div className="min-h-screen w-full max-w-6xl px-2 mb-4">
          <div className="text-center text-[30px] py-6 font-[500]">
            {t(getPageName())}
          </div>
          <section className=" grid grid-cols-7 gap-2 w-full">
            <nav className="md:block hidden col-span-2 bg-white border shadow rounded-md h-min">
              <div className="border-b flex flex-row p-4 space-x-3">
                <span className="bg-primary flex flex-row items-center justify-center h-10 w-10 rounded-full text-white">
                  <div className="m-auto">U</div>
                </span>
                <div className="flex flex-col">
                  <p className="text-sm m-0">{getUserName()}</p>
                  <p className="text-[12px] opacity-50 m-0">
                    {user?.primaryEmail}
                  </p>
                </div>
              </div>
              <div className="flex-auto my-1">
                {sidebar
                  .filter(({ hide }) => !hide)
                  .map(({ label, page, icon }, index) => (
                    <Link key={index} href={page}>
                      <div className="p-4 cursor-pointer hover:bg-blue-100 flex flex-row items-center justify-between">
                        <div className="flex flex-row space-x-4 items-center ">
                          <div className="ring-white ring-2 rounded-full p-1">
                            {icon}
                          </div>
                          <p className="m-0 p-0">{t(label)}</p>
                        </div>
                        <span className="text-[#4B5565] h-5 w-5">
                          <ChevronRightIcon />
                        </span>
                      </div>
                    </Link>
                  ))}
              </div>
            </nav>
            <div
              className={`h-full col-span-7 md:col-span-5 ${
                router.pathname === "/order"
                  ? "md:bg-white md:border md:shadow rounded-md md:p-6"
                  : "bg-white border shadow rounded-md p-6"
              }  overflow-x-auto relative`}
            >
              {children}
              {isLoading && (
                <div className="h-full flex flex-row items-center justify-center top-0 left-0 z-20 absolute w-full bg-white">
                  <div className="flex flex-row items-center">
                    <div className="h-[100px] w-[100px]" id="loading-svg" />
                    <div>{t("Loading Data")}</div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      ) : (
        <div className="min-h-screen w-full max-w-screen-sm px-2">
          <div className="text-center text-[30px] py-6 font-[500]">
            {pageName}
          </div>
          <div className="col-span-6 md:col-span-4 bg-white border shadow rounded-md p-6 overflow-x-auto relative">
            {children}
            {isLoading && (
              <div className="h-full flex flex-row items-center justify-center top-0 left-0 z-20 absolute w-full bg-white">
                <div className="flex flex-row items-center">
                  <div className="h-[100px] w-[100px]" id="loading-svg" />
                  <div>{t("Loading Data")}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
