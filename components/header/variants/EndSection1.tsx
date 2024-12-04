import { useContext } from "react";
import MerchantContext from "@/contexts/MerchantContext";
import { isQLEggs } from "@/utils/util";
import useMultiStoreDelivery from "@/components/AxrailCommerce/MultiStoreDeliverySelector/hooks/useMultiStoreDelivery";
import { useSingleStoreFullfilment } from "@/components/AxrailCommerce/SingleStoreFullfilmentSelector/context/SingleStoreFullfilmentContext";
import { BadgeButton } from "@/components/buttons/Buttons";
import { CartIcon } from "@/components/icons/Icons";
import OrderTypeSVGIcon from "@/components/icons/OrderTypeSVGIcon";
import CustomMenu from "@/components/menu/CustomMenu";
import { SearchIcon, HeartIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import LanguageDropdown from "@/components/LanguageDropdown";
import { StoreTypes } from "@/enums/enums";
import { VoucherIcon } from "@/components/image/VoucherIcon";

export default function EndSection1({
  customerWishListIds,
  isAuthenticated,
  profileNavs,
  cartList,
  voucherCart,
}: any) {
  const { domain, storeType, membershipTierActivated } =
    useContext(MerchantContext);
  const IS_QL_EGGS = Boolean(isQLEggs(domain));
  const { openMultiStoreModal, isMultistore } = useMultiStoreDelivery() as any;
  const { orderType, inflateModal } = useSingleStoreFullfilment() as any;
  const router = useRouter();

  function renderCartCounter() {
    if (storeType !== StoreTypes.B2B_STORETYPE) {
      return cartList?.length + (voucherCart?.length || 0);
    }

    return cartList?.length;
  }

  return (
    <div className="flex items-center h-full justify-end pr-6 lg:pr-0">
      <div className="hidden lg:flex">
        <Link href="/search">
          <a className="p-2 text-headerFooterFontColor ">
            <span className="sr-only">Search</span>
            <SearchIcon className="w-6 h-6" aria-hidden="true" />
          </a>
        </Link>
      </div>

      {!IS_QL_EGGS && (
        <>
          {/* wishlist */}
          <div className="lg:flex lg:items-center hidden lg:p-2">
            <BadgeButton
              className="relative"
              number={customerWishListIds?.length}
              icon={
                <Link href="/wishlist" passHref>
                  <a className="text-sm font-medium text-headerFooterFontColor ">
                    <HeartIcon className="w-6 h-6" aria-hidden="true" />
                  </a>
                </Link>
              }
            />
          </div>
          <div className="p-2 hidden lg:block">
            <BadgeButton
              icon={<OrderTypeSVGIcon stroke={"white"} orderType={orderType} />}
              onClick={isMultistore ? openMultiStoreModal : inflateModal}
              className="bg-transparent cursor-pointer"
              number={0}
            />
          </div>
        </>
      )}

      <div className="lg:p-2 flex flex-row gap-2 items-center">
        {router?.pathname !== "/checkout" && !IS_QL_EGGS && (
          <BadgeButton
            icon={<OrderTypeSVGIcon stroke={"white"} orderType={orderType} />}
            onClick={isMultistore ? openMultiStoreModal : inflateModal}
            className="bg-transparent cursor-pointer lg:hidden block"
            number={0}
          />
        )}
        <BadgeButton
          className="relative"
          number={renderCartCounter()}
          onClick={() => {
            (window as any)?.dataLayer?.push({
              event: "viewcartClicked",
            });
            router.push("/checkout");
          }}
          icon={
            <Link href="/checkout">
              <a className="text-sm font-medium text-headerFooterFontColor ">
                <CartIcon className="w-6 h-6" color={undefined} />
              </a>
            </Link>
          }
        />
        <div className="flex-row space-x-1 divide-x-2 lg:flex hidden">
          {isAuthenticated ? (
            <CustomMenu
              menuButtonClassName="p-2 text-headerFooterFontColor"
              menuItemsClassName="w-[160px] z-40"
              obj={profileNavs}
            />
          ) : (
            <span className="overflow-hidden whitespace-nowrap px-2 no-underline cursor-pointer">
              <Link href="/login" className="no-underline">
                <div className="no-underline">Sign In</div>
              </Link>
            </span>
          )}
          <LanguageDropdown />
        </div>
      </div>
    </div>
  );
}
