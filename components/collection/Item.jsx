import { useContext } from "react";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

// style
import classes from "./Item.module.scss";

// components
import ItemCard from "@/components/card/ItemCard";

// API
import { API } from "aws-amplify";

// content
import { useWishlist } from "@/contexts/WishlistContext";
import { removeItem } from "@/utils/cart.util";
import { CartContext } from "@/contexts/CartContext";
import cloneDeep from "lodash/cloneDeep";

// Items in one row (pair with ItemCollection.jsx)
function Item(props) {
  const cookie = new Cookies();
  const router = useRouter();
  const { itemList = [], itemPerPage, isQLEggs } = props;
  const { getFavouriteStatus, isLoading, getCustomerWishListIdOfItem } =
    useWishlist();
  const { handleStoreUpdateCartDataAPI } = useContext(CartContext);

  /* TODO */
  // const getCartItemQuantity = (data) => {
  //   let item;
  //   if (!!data.productId) {
  //     item = config.carts.find((item) => item.id === data.productId);
  //   } else {
  //     item = config.carts.find((item) => item.id === data.itemId);
  //   }
  //   if (!!item) {
  //     return item.quantity;
  //   } else {
  //     return 0;
  //   }
  // };

  const handleAddItemToCart = (item, quantity) => {
    handleViewItem(item);
  };
  /**
   * @param {Object} item The product
   * @returns Formmated product
   */
  function formatItem(item) {
    const ret = cloneDeep(item);
    if (!!ret.productId) {
      // for Home component
      ret.id = item.productId;
    } else {
      // for Recommendation component
      ret.id = item.itemId;
    }
    ret.name = item.title;
    ret.imageUrls = process.env.BUCKET_URL + item.image[0];
    return ret;
  }

  //View Product in Detail
  const handleViewItem = (data) => {
    router.push({
      pathname: `/${data.seoUrl}`,
      state: data,
    });
  };

  if (isLoading) {
    return <></>;
  }
  return (
    <div className={classes.container}>
      {itemList?.slice(0, itemPerPage).map((data, index) => {
        const imageDisplay = process.env.BUCKET_URL + data.cover;

        // let itemQuantity = getCartItemQuantity(data);

        let favStatus = getFavouriteStatus(data.itemId);
        return (
          <ItemCard
            key={index}
            type="home"
            handleViewItem={handleViewItem}
            handleAddItemToCart={handleAddItemToCart}
            customerWishListId={getCustomerWishListIdOfItem(data.itemId)}
            // handleRemoveItemFromCart={handleRemoveItemFromCart}
            data={data}
            price={data.priceWithTax !== 0 ? data.priceWithTax : data.price}
            discountedPrice={data.compareAtPrice}
            favStatus={favStatus}
            isLoading={isLoading}
            // itemQuantity={itemQuantity}
            quantity={1}
            imageDisplay={imageDisplay}
            source={"Item"}
            isQLEggs={isQLEggs}
          />
        );
      })}
    </div>
  );
}

export default Item;
