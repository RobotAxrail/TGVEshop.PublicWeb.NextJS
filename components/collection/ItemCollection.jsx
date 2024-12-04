import ItemCard from "@/components/card/ItemCard";
import React, { useContext } from "react";
import { useRouter } from "next/router";

//Content
import { WishlistContext } from "@/contexts/WishlistContext";

// Items in multiple rows (pair with Item.jsx)
function ItemCollection(props) {
  const router = useRouter();
  const { itemListing, isQLEggs } = props;
  const { handleFavourite, getFavouriteStatus, isLoading } =
    useContext(WishlistContext);

  const handleAddItemToCart = async (item, quantity) => {
    handleViewItem(item);
  };

  //View Product in Detail
  const handleViewItem = (data) => {
    router.push({
      pathname: "/" + data.seoUrl,
      state: data,
    });
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  //   }, 300);
  // }, []);

  //Listing Product
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-20 gap-x-4">
      {itemListing.map((data, index) => {
        // console.log(data);
        const imageDisplay = process.env.BUCKET_URL + data.cover;
        let itemQuantity = 0;
        let favStatus = getFavouriteStatus(data.itemId);
        return (
          <ItemCard
            key={index}
            handleViewItem={handleViewItem}
            handleFavourite={handleFavourite}
            handleAddItemToCart={handleAddItemToCart}
            data={data}
            discountedPrice={data.compareAtPrice}
            favStatus={favStatus}
            isLoading={isLoading}
            itemQuantity={itemQuantity}
            quantity={1}
            imageDisplay={imageDisplay}
            source="ItemCollection"
            price={
              data.priceWithTax
                ? data.priceWithTax
                : data.price
            }
            isQLEggs={isQLEggs}
          />
        );
      })}
    </div>
  );
}

export default ItemCollection;
