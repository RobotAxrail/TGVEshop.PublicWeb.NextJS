import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  MenuIcon,
  SearchIcon,
  UserIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import { BadgeButton } from "@/components/buttons/Buttons";
import CustomMenu from "@/components/menu/CustomMenu";
import { CartIcon } from "@/components/icons/Icons";
import MerchantContext from "@/contexts/MerchantContext";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { useOrder } from "@/contexts/OrderContext";
import { OrderModalStateActions } from "@/enums/enums";
import MobileSideBar from "./common/MobileSideBar";
import OrderTypeSVGIcon from "@/components/icons/OrderTypeSVGIcon";
import LanguageDropdown from "../LanguageDropdown";
import useTranslation from 'next-translate/useTranslation';

export default function EwarungHeader(props: any) {
  const { name, storeType } = useContext(MerchantContext) as any;
  const { orderType, dispatchOrderModalState } = useOrder();
  const { isAuthenticated, handleSignOut } = useAuth();
  const { customerWishListIds } = useWishlist() as any;
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const { cartList } = useCart() as any;
  const router = useRouter();
  const { siteNav } = props;
  const [position, setPosition] = useState(
    typeof window !== "undefined" ? window.pageYOffset : null
  );
  const { t } = useTranslation('common');

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        let moving = window.pageYOffset;

        setVisible(position > moving);
        setPosition(moving);
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  });

  const profileNavs = {
    buttonIcon: <UserIcon className="w-6 h-6 text-white" aria-hidden="true" />,
    title: t("Account"),
    childItems: [
      {
        linkValue: "/collections-menu",
        title: t("View Menu"),
      },
      {
        linkValue: "/my-profile",
        title: t("My Profile"),
      },
      {
        linkValue: "/order",
        title: t("My Orders"),
      },
      {
        linkValue: "",
        title: t("Sign Out"),
      },
    ],
  };

  const [isOpen, setIsOpen] = useState({ show: {} });

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
        isQLEggs={false}
      />
      <header
        className={[
          "sticky bg-primary h-auto w-full z-20",
          visible ? "top-0 md:top-0" : "top-[-200px] md:top-0",
          "top-0 md:top-0",
        ].join(" ")}
        style={{ transition: "top 0.3s ease-out" }}
        id="header"
      >
        <nav
          aria-label="Top"
          className="mx-auto max-w-1200 px-2 md:px-3 xl:px-0"
        >
          <div className="border-b border-primary">
            <div
              className={
                "h-auto sm:min-h-[60px] my-3 flex justify-between items-center w-full"
              }
            >
              <button
                className="bg-primary p-2 rounded-md text-headerFooterFontColor lg:hidden "
                onClick={() => setOpen(true)}
                type="button"
              >
                <span className="sr-only">{t("Open menu")}</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="flex justify-center py-1">
                <Link href="/" passHref>
                  <a className="text-sm line-clamp-1 text-white no-underline">
                    {name}
                  </a>
                </Link>
              </div>

              <div className="hidden lg:flex lg:items-center">
                {siteNav?.map((obj, idx) => (
                  <CustomMenu obj={obj} key={idx} />
                ))}
              </div>

              <div className="flex items-center mr-1 sm:mr-0">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link
                    href={{
                      pathname: "/collections-menu",
                      query: { type: "search" },
                    }}
                  >
                    <a className="p-2 text-headerFooterFontColor ">
                      <span className="sr-only">{t("Search")}</span>
                      <SearchIcon className="w-6 h-6" aria-hidden="true" />
                    </a>
                  </Link>
                </div>

                {!!orderType && router?.pathname !== "/checkout" && (
                  <div className="lg:p-2 ">
                    <BadgeButton
                      onClick={() =>
                        dispatchOrderModalState({
                          type: OrderModalStateActions.HOME,
                        })
                      }
                      number={0}
                      icon={
                        <OrderTypeSVGIcon
                          stroke="#FFFFFF"
                          orderType={orderType}
                        />
                      }
                    />
                  </div>
                )}

                {/* cart */}
                {router.pathname !== "/order" && (
                  <div className="lg:p-2">
                    <BadgeButton
                      number={cartList?.length}
                      onClick={() => {
                        (window as any).dataLayer.push({
                          event: "viewcartClicked",
                        });
                      }}
                      icon={
                        <Link href="/checkout">
                          <a className="text-sm font-medium text-headerFooterFontColor ">
                            <CartIcon className="w-6 h-6" color={undefined} />
                          </a>
                        </Link>
                      }
                    />
                  </div>
                )}

                <div className="flex-row space-x-1 divide-x-2 lg:flex hidden text-white">
                  {isAuthenticated ? (
                    <CustomMenu
                      menuButtonClassName="p-2 text-headerFooterFontColor"
                      menuItemsClassName="w-[160px] z-40"
                      obj={profileNavs}
                    />
                  ) : (
                    <span className="overflow-hidden whitespace-nowrap px-2 no-underline cursor-pointer">
                      <Link href="/login" className="no-underline">
                        <div className="no-underline">{t("Sign in")}</div>
                      </Link>
                    </span>
                  )}
                  <LanguageDropdown />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
