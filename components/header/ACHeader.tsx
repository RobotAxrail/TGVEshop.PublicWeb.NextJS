import { useState, useEffect, useContext } from "react";
import { UserIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
// contexts
import MerchantContext from "@/contexts/MerchantContext";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import useVoucherCart from "modules/rewards/components/context/VoucherStoreContext";
import MobileSideBar from "./common/MobileSideBar";
import DynamicRenderer from "../DynamicRenderer/DynamicRenderer";
import EndSection1 from "./variants/EndSection1";
import NavigationSection1 from "./variants/NavigationSection1";
import StartSection1 from "./variants/StartSection1";
import EndSection2 from "./variants/EndSection2";
import MiddleSection2 from "./variants/MiddleSection2";
import NavigationSection2 from "./variants/NavigationSection2";
const NavigationSection = dynamic(
  () => import("../landing-page-components/NavigationSection")
);
import StartSection2 from "./variants/StartSection2";
import useIsScrollTop from "./hooks/useIsScrollTop";
import { isQLEggs } from "@/utils/util";
import QLEggsHeader from "./QLEggsHeader";
import dynamic from "next/dynamic";
const bucketLink = process.env.BUCKET_URL;

export default function ACHeader(props) {
  const { logo, storeType, domain } = useContext(MerchantContext) as any;
  const { siteNav, notificationMessage, layout } = props as any;
  const { customerWishListIds } = useWishlist() as any;
  const { isAuthenticated, handleSignOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState({ show: {} });
  const { cartList } = useCart() as any;
  const { voucherCart } = useVoucherCart();
  const router = useRouter();
  const { isTop } = useIsScrollTop(
    router?.pathname === "/",
    router?.pathname !== "/"
  );
  const { t } = useTranslation("common");

  const [visible, setVisible] = useState(true);
  const [position, setPosition] = useState(
    typeof window !== "undefined" ? window.pageYOffset : null
  );

  const IS_QL_EGGS = Boolean(isQLEggs(domain));

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        let moving = window.pageYOffset;
        setVisible(moving > 0);
        setPosition(moving);
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  });

  const profileNavs = {
    buttonIcon: (
      <UserIcon
        className="w-6 h-6 text-headerFooterFontColor"
        aria-hidden="true"
      />
    ),
    title: t("Account"),
    childItems: [
      {
        linkValue: "/my-profile",
        title: t("My Profile"),
      },
      {
        linkValue: "/order",
        title: t("My Orders"),
      },
      {
        linkValue: "/address-book",
        title: t("Address Book"),
      },
      {
        linkValue: "",
        title: t("Sign Out"),
      },
    ],
  };

  const toggleListItem = (itemId) => {
    setIsOpen((prevState) => ({
      ...prevState,
      show: {
        ...prevState.show,
        [itemId]: !prevState.show[itemId],
      },
    }));
  };

  useEffect(() => {
    setOpen(false);
  }, [router]);

  const navigation = [
    { name: t("Home"), href: "/", selected: router.pathname === "/" },
    {
      name: t("About Us"),
      href: "/about-us",
      selected: router.pathname === "/about-us",
    },
    {
      name: t("Events"),
      href: "/events",
      selected: router.pathname === "/events",
    },
    {
      name: t("Contact Us"),
      href: "/contact-us",
      selected: router.pathname === "/contact-us",
    },
  ];

  const registeredComponents = {
    DynamicRenderer,
    NavigationSection2,
    StartSection2,
    EndSection2,
    MiddleSection2,
    NavigationSection1,
    NavigationSection,
    StartSection1,
    EndSection1,
    QLEggsHeader,
  };
  const dynamicProps = {
    QLEggsHeader: { siteNav, logo, cartList },
    NavigationSection2: { siteNav, logo },
    NavigationSection1: { siteNav, logo },
    NavigationSection: { navigation },
    MiddleSection2: { logo },
    StartSection1: { setOpen, logo },
    StartSection2: { setOpen },
    EndSection2: {
      customerWishListIds,
      isAuthenticated,
      profileNavs,
      cartList,
    },
    EndSection1: {
      customerWishListIds,
      isAuthenticated,
      profileNavs,
      cartList,
      voucherCart,
    },
  };

  const getHeaderHeight = () =>
    typeof document !== "undefined"
      ? `${document?.getElementById("header")?.clientHeight}px`
      : "auto";

  function showNotificationHeader(notifMessage: string): boolean {
    return Boolean(notifMessage);
  }

  return (
    <>
      <MobileSideBar
        profileNavs={profileNavs as any}
        toggleListItem={toggleListItem}
        isAuthenticated={isAuthenticated}
        handleSignOut={handleSignOut}
        storeType={storeType}
        setOpen={setOpen}
        siteNav={siteNav}
        isOpen={isOpen}
        open={open}
        isQLEggs={IS_QL_EGGS}
      />
      <div
        id="header"
        className={`fixed h-auto z-20 w-full ${
          isTop ? "bg-transparent" : "bg-white"
        }`}
      >
        {showNotificationHeader(notificationMessage) && (
          <label className="pt-2 pb-2 whitespace-pre-wrap bg-notificationBarColor flex items-center justify-center text-sm font-medium text-headerFooterFontColor px-4 sm:px-6 lg:px-8 truncate h-auto font-playFair">
            {notificationMessage}
          </label>
        )}
        <DynamicRenderer
          componentMap={registeredComponents}
          structure={layout}
          rootClassNames={`text-white ${
            visible ? "top-0" : "top-[-200px]"
          } duration-200`}
          dynamicProps={{
            ...dynamicProps,
            DynamicRenderer: {
              componentMap: registeredComponents,
              dynamicProps,
            },
          }}
        />
      </div>
      {layout?.length > 0 &&
        (router?.pathname !== "/" ||
          layout[0]["sectionName"] === "normal-app-header") && (
          <div
            style={{
              height:
                typeof window === "undefined" ? "92px" : getHeaderHeight(),
            }}
          />
        )}
    </>
  );
}
