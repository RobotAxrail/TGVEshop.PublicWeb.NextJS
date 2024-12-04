import React, { useState, useContext } from "react";
// components
import Wishlist from "@/components/wishlist/Wishlist";
import SEO from "@/components/seo/SEO";
// utils
import { withProtected } from "@/utils/routeProtection";
import { useWishlist } from "@/contexts/WishlistContext";

const WishlistScreen = () => {
  const {
    customerWishList,
    customerWishListIds,
    handleUpdateCustomerWishlist,
    isWishlistFetching,
  } = useWishlist();

  return (
    <>
      <SEO title="Wishlist" keywords="" description="product" />
      <Wishlist
        isWishlistFetching={isWishlistFetching}
        isTimeout={false}
        customerWishListIds={customerWishListIds}
        customerWishList={customerWishList}
        handleUpdateCustomerWishlist={handleUpdateCustomerWishlist}
      />
    </>
  );
};

WishlistScreen.title = "Wishlist";

export default withProtected(WishlistScreen);
