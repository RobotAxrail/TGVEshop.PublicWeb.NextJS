import { ContainedButton, FavIconButton } from "@/components/buttons/Buttons";
import CartIcon from "@/images/cart-icon-white.svg";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

export default function ActionButtons1({
  disabledAddToCart,
  reachedCartLimit,
  onAddToWishList,
  disabledBuyNow,
  onAddToCart,
  isFavourite,
  isLoading,
  onBuyNow,
  isQLEggs,
  isInCart,
}) {
  const { t } = useTranslation("common");
  return (
    <div className="flex flex-row gap-1 items-start mb-1">
      <div className="flex flex-col justify-center">
        <ContainedButton
          disabled={disabledAddToCart}
          className="m-2.5 ml-0"
          onClick={onAddToCart}
          fontSize="text-[13px]"
          loading={isLoading}
        >
          <span className="flex items-center">
            <Image
              src={CartIcon as any}
              width="25px"
              height="25px"
              alt="cart"
            />
            <span className="ml-2.5">{t(isInCart ? "Update Cart" : "Add To Cart")}</span>
          </span>
        </ContainedButton>
        {reachedCartLimit && (
          <span className="ml-2.5 text-red-500">
            {t("Cart item reached cart limit")}
          </span>
        )}
      </div>

      {!isQLEggs && (
        <>
          <ContainedButton
            onClick={onBuyNow}
            outlined={true}
            className={[
              " font-semibold m-2.5 ml-0  h-[45px]  shadow-button hover:shadow-button-hover text-black ",
              disabledBuyNow
                ? " border-none text-white"
                : " border-2 border-black ",
            ].join("")}
            disabled={disabledBuyNow}
            loading={isLoading}
            fontSize="text-[13px]"
          >
            {t("Buy Now")}
          </ContainedButton>
          <div className="flex items-center flex-wrap">
            <FavIconButton onClick={onAddToWishList} status={isFavourite} />
          </div>
        </>
      )}
    </div>
  );
}
