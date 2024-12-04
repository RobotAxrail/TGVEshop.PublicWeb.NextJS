import { useContext } from "react";
import { useSingleStoreFullfilment } from "@/components/AxrailCommerce/SingleStoreFullfilmentSelector/context/SingleStoreFullfilmentContext";
import { SearchIcon, UserIcon, HeartIcon } from "@heroicons/react/outline";
import OrderTypeSVGIcon from "@/components/icons/OrderTypeSVGIcon";
import { BadgeButton } from "@/components/buttons/Buttons";
import CustomMenu from "@/components/menu/CustomMenu";
import useIsScrollTop from "../hooks/useIsScrollTop";
import { CartIcon } from "@/components/icons/Icons";
import { useRouter } from "next/router";
import Link from "next/link";
import MerchantContext from "@/contexts/MerchantContext";
//constants
import { StoreTypes } from "@/enums/enums";
import useMultiStoreDelivery from "@/components/AxrailCommerce/MultiStoreDeliverySelector/hooks/useMultiStoreDelivery";

export default function EndSection2({
  customerWishListIds,
  isAuthenticated,
  profileNavs,
  cartList,
}) {
  const { openMultiStoreModal, isMultistore } = useMultiStoreDelivery() as any;
  const { orderType, inflateModal } = useSingleStoreFullfilment() as any;
  const merchantInfoContext = useContext(MerchantContext) as any;
  const router = useRouter();
  const { isTop } = useIsScrollTop(
    router?.pathname === "/",
    router?.pathname !== "/"
  );

  return (
    <div
      className={`flex items-center mr-12 sm:mr-0 h-full duration-200 ${
        isTop ? "text-white" : "text-black"
      }`}
    >
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
        <Link href="/search">
          <a className="p-2">
            <span className="sr-only">Search</span>
            <SearchIcon className="w-6 h-6" aria-hidden="true" />
          </a>
        </Link>
      </div>

      {isAuthenticated ? (
        <>
          <CustomMenu
            menuItemsClassName="w-[160px] z-40"
            menuButtonClassName="p-2 text-headerFooterFontColor"
            obj={profileNavs}
          />
        </>
      ) : (
        <div className="lg:p-2 lg:flex lg:items-center hidden">
          <Link href="/login">
            <a className="text-sm font-medium bg-footer">
              <UserIcon className="w-6 h-6" aria-hidden="true" />
            </a>
          </Link>
        </div>
      )}

      <div className="p-2 hidden lg:block">
        <BadgeButton
          onClick={isMultistore ? openMultiStoreModal : inflateModal}
          className="bg-transparent cursor-pointer"
          number={0}
          icon={
            <OrderTypeSVGIcon
              stroke={isTop ? "white" : "black"}
              orderType={orderType}
            />
          }
        />
      </div>

      {/* wishlist */}
      <div className="lg:flex lg:items-center hidden lg:p-2">
        <BadgeButton
          onClick={() => router.push("/wishlist")}
          className="bg-transparent relative"
          number={customerWishListIds?.length}
          icon={
            <Link href="/wishlist" passHref>
              <a className="text-sm font-medium">
                <HeartIcon className="w-6 h-6" aria-hidden="true" />
              </a>
            </Link>
          }
        />
      </div>
      <div className="lg:p-2 flex flex-row gap-2 ml-[-10px] lg:ml-0">
        {router?.pathname !== "/checkout" && (
          <BadgeButton
            className="bg-transparent cursor-pointer lg:hidden block"
            onClick={isMultistore ? openMultiStoreModal : inflateModal}
            number={0}
            icon={
              <OrderTypeSVGIcon
                stroke={isTop ? "white" : "black"}
                orderType={orderType}
              />
            }
          />
        )}

        <BadgeButton
          className="bg-transparent relative"
          number={cartList?.length}
          onClick={() => {
            (window as any).dataLayer.push({
              event: "viewcartClicked",
            });
            router.push("/checkout");
          }}
          icon={
            <Link href="/checkout">
              <a className="text-sm font-medium">
                <CartIcon className="w-6 h-6" color={"black"} />
              </a>
            </Link>
          }
        />
      </div>
    </div>
  );
}
