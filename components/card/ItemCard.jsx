/* eslint-disable react/display-name */

import React from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

// icons
import { FavIcon } from "@/components/icons/Icons";

// components
import Chip from "@/components/chip/Chip";
import PriceWithCurrency from "@/components/priceWithCurrency/PriceWithCurrency";
import { isDateBetween } from "@/utils/util";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { useWishlist } from "@/contexts/WishlistContext";

const ItemCard = React.memo((props) => {
  const {
    type = "catalogue",
    handleViewItem = () => {},
    handleAddItemToCart = () => {},
    data,
    price,
    discountedPrice,
    favStatus,
    isLoading,
    quantity,
    imageDisplay,
    isQLEggs,
  } = props;
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation("common");

  const {
    handleUpdateCustomerWishlist,
    fetchCustomerWishList,
    getCustomerWishListIdOfItem,
  } = useWishlist();

  const addToFavourites = (e) => {
    e.stopPropagation();

    const wishListId = getCustomerWishListIdOfItem(data?.itemId);
    if (isAuthenticated) {
      handleUpdateCustomerWishlist(
        data.itemId,
        data.itemProperty,
        wishListId
      ).then((_) => fetchCustomerWishList());
    } else router.push("/login");
  };

  const { hasStock, title } = data;

  return (
    <div className="grid-span-1 flex flex-col bg-white cursor-pointer rounded-md border">
      <div
        className="aspect-[1] object-cover overflow-hidden rounded-t-md relative h-auto"
        onClick={() => handleViewItem(data, data)}
      >
        {!hasStock && (
          <Chip className="absolute mt-2 ml-2 z-10" label={t("Out Of Stock")} />
        )}
        {!isQLEggs && (
          <button
            className="absolute right-1 top-1 rounded bg-white aspect-square text-sm z-5"
            onClick={addToFavourites}
            disabled={isLoading}
          >
            <FavIcon status={favStatus} />
          </button>
        )}
        <Image
          layout="responsive"
          width={100}
          height={100}
          src={imageDisplay}
          alt={data.title}
          objectFit="cover"
          className={
            !data.hasStock ? "grayscale h-[100%] w-[100%]" : "h-[100%] w-[100%]"
          }
        />
      </div>
      <div className="flex flex-col p-2">
        <div>
          <p className="m-0 text-ellipsis overflow-hidden whitespace-nowrap p-0 h-auto text-base">
            {title}
          </p>
          {data?.description && isQLEggs && (
            <div
              className="remove-padding line-clamp-2 text-gray-500 text-xs h-8 "
              dangerouslySetInnerHTML={{
                __html: `
                <style>
                  .remove-padding {
                    background-color: transparent;
                  }
                  
                  .remove-padding > p {
                    margin: 0;
                    padding: 0;
                  }                
                </style>
                <div class="remove-padding">
                  ${data?.description}
                </div>`,
              }}
            />
          )}
        </div>

        <div className="flex flex-col justify-end">
          <div className="font-semibold xs:text-xl text-gray-500 mt-auto">
            <PriceWithCurrency value={price} />
          </div>
          <div
            className={
              discountedPrice <= price ||
              Boolean(data.promotionEndDateTime) &&
              !isDateBetween(
                data.promotionStartDateTime,
                data.promotionEndDateTime
              )
                ? "hidden"
                : "flex items-center"
            }
          >
            <Chip
              label={`${Math.round(
                ((discountedPrice - price) / discountedPrice) * 100
              )}%`}
            />
            <span className="ml-2 text-[12px] xs:text-[13px] line-through text-[grey]">
              <PriceWithCurrency value={discountedPrice} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ItemCard;
ItemCard.displayName = "ItemCard";
