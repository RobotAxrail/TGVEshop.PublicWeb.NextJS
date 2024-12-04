import { useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import useTranslation from 'next-translate/useTranslation';

// icons
import CartIcon from "@/images/cart-icon-white.svg";

// components
import {
  QuantityButtons,
  ContainedButton,
  FavIconButton,
} from "@/components/buttons/Buttons";

// content
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";

// TODO REFACTOR LATER
export const QuantitySection = (props) => {
  const {
    handleAddItemToCart,
    handleRemoveItem,
    handleStoreAddCartData,
    handleOpenModifierModal,
    quantity,
    setQuantity,
    canEditQuantity,
    item,
    type = "",
    itemId,
    cartIsLoading = false,
    cartList,
    outOfStock = false,
    isProductWithModifiers = false,
    handleBuyNow,
    isInCart,
  } = props;
  const { isAuthenticated } = useAuth();
  const {
    handleUpdateCustomerWishlist,
    getFavouriteStatus,
    getCustomerWishListIdOfItem,
    fetchCustomerWishList,
  } = useWishlist();

  const { t } = useTranslation('common');
  const router = useRouter();

  return (
    <div className="mt-2.5">
      {!isProductWithModifiers && (
        <div className="flex items-center flex-wrap">
          <span className="pr-2.5 text-xl">{t("Quantity")}</span>
          <div className="flex items-center flex-wrap">
            {/* Add Quantity */}

            <QuantityButtons
              handleClickAdd={handleAddItemToCart}
              handleClickRemove={handleRemoveItem}
              quantity={quantity}
              // setQuantity={setQuantity}
              // canEditQuantity={canEditQuantity}
              buttonDecreaseDisabled={
                cartIsLoading ||
                item.salesChannelName === "Facebook Live" ||
                outOfStock
              }
              buttonIncreaseDisabled={
                cartIsLoading ||
                item.quantity >= item.maxQuantity ||
                item.salesChannelName === "Facebook Live" ||
                outOfStock
              }
            />
          </div>
        </div>
      )}
      <div className="flex items-center flex-wrap">
        <div className="flex items-center flex-wrap">
          {/* Add To Cart */}
          <ContainedButton
            className="m-2.5 ml-0"
            onClick={() => {
              isProductWithModifiers
                ? handleOpenModifierModal()
                : handleStoreAddCartData();
            }}
            disabled={cartIsLoading || outOfStock}
            loading={cartIsLoading}
            fontSize="text-[13px]"
          >
            <span className="flex items-center">
              <Image src={CartIcon} width="25px" height="25px" alt="cart" />
              <span className="ml-2.5">
                {t(isInCart ? "Update Cart" : "Add to Cart")}
              </span>
            </span>
          </ContainedButton>

          {/* Buy Now */}
          <ContainedButton
            onClick={
              isProductWithModifiers ? handleOpenModifierModal : handleBuyNow
            }
            outlined={true}
            className={[
              " font-semibold m-2.5 ml-0  h-[45px]  shadow-button hover:shadow-button-hover text-black ",
              outOfStock
                ? " border-none text-white"
                : " border-2 border-black ",
            ].join("")}
            disabled={cartIsLoading || outOfStock}
            loading={cartIsLoading}
            fontSize="text-[13px]"
          >
            {t("Buy Now")}
          </ContainedButton>
        </div>
        <div className="flex items-center flex-wrap">
          {/* Wishlist */}
          <FavIconButton
            onClick={() => {
              const customerWishListId = getCustomerWishListIdOfItem(itemId);
              if (isAuthenticated)
                handleUpdateCustomerWishlist(
                  itemId,
                  type,
                  customerWishListId
                ).then((val) => val && fetchCustomerWishList());
              else router.push("/login");
            }}
            status={getFavouriteStatus(itemId)}
          />
        </div>
      </div>
    </div>
  );
};

export default QuantitySection;
