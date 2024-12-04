import React, { useContext, useEffect, useState } from "react";
import { Input } from "react-vant";
import { LuSettings2 } from "react-icons/lu";
import { mock } from "node:test";
import tamaguchi2 from "../../../public/assets/mock-images/tamaguchiitem.png";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { IoCheckmark } from "react-icons/io5";
import Delete from "public/assets/images/Delete.svg";
import { Button } from "@/components/ui/button";
import searchicon from "public/assets/images/search-icon-eshop.svg";
import router from "next/router";
import { API, graphqlOperation } from "aws-amplify";
import { getCustomerCarts } from "@/graphql/queries";
import MerchantContext from "@/contexts/MerchantContext";
import Cookies from "universal-cookie";
import { getCustomerVoucherList, getGiftCardDetail } from "@/graphql/queries";

import {
  addItemToCustomerCart,
  updateItemInCustomerCart,
  removeItemFromCustomerCart,
} from "@/graphql/mutations";

import {
  checkCart,
  checkCartLimit,
  placeCustomerOrderToSQS,
} from "@/graphql/mutations";
import { useCart} from "@/contexts/EShopCartContext";

const ProductCart = ({ voucher, orderType }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRemoving, setIsRemoving] = useState(false);

  const merchantInfoContext = useContext(MerchantContext);
  const cookie = new Cookies();
  const sessionId = cookie.get("sessionId");
  // const [customerCart, setCustomerCart] = useState([]);
  const [customerCartIds, setCustomerCartIds] = useState([]);


  const {fetchCheckCart, customerCart} = useCart();
  const handleConfirmation = () => {
    if (selectedItems.length > 0) {
      // Get the customerCartIds for selected items
      const selectedCartIds = customerCart
        .filter((item) => selectedItems.includes(item.itemId))
        .map((item) => item.customerCartId);

      // Pass only the cart IDs
      router.push({
        pathname: "/eshop/confirmation",
        query: {
          cartIds: JSON.stringify(selectedCartIds),
        },
      });
    }
  };
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const fetchVoucherListings = async () => {
    try {
      let params = {
        merchantId: merchantInfoContext.merchantId,
        customerId: "7c029e21-0b11-461b-9187-cd6f2c9d7f8b",
        filterType: "",
      };

      let res = await API.graphql(
        graphqlOperation(getCustomerVoucherList, params)
      );
      console.log("fetch voucher listings", res);
    } catch (error) {
      console.error("Error fetching voucher listings", error);
    }
  };

  useEffect(() => {
    fetchVoucherListings();
  }, [merchantInfoContext]);

  const fetchCustomerCart = async () => {
    try {
      let params = {
        merchantId: merchantInfoContext.merchantId,
        customerId: sessionId,
      };

      let res = await API.graphql(graphqlOperation(getCustomerCarts, params));
      const cartIds = res.data.getCustomerCarts.items.map(
        (item) => item.customerCartId
      );
      setCustomerCartIds(cartIds);

      if (cartIds.length === 0) {
        setIsLoading(false); // End loading if cart is empty
        // setCustomerCart([]); // Set empty cart
      }
    } catch (error) {
      console.error("Add to cart failed: ", error);
      setIsLoading(false); // End loading on error
      // setCustomerCart([]); // Set empty cart on error
    }
  };

  useEffect(() => {
    fetchCustomerCart();
  }, [merchantInfoContext]);


  const filteredItems = customerCart?.filter((item) =>
    item.itemTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // // Select all items handler
  const handleSelectAll = () => {
    if (selectedItems.length === customerCart.length) {
      setSelectedItems([]); // Deselect all if all are selected
    } else {
      // Select all items
      const allItemIds = customerCart.map((item) => item.itemId);
      setSelectedItems(allItemIds);
    }
  };

  useEffect(() => {
    if (customerCart && customerCart.length > 0) {
      // Select all items by their itemId
      const allItemIds = customerCart.map((item) => item.itemId);
      setSelectedItems(allItemIds);
    }
  }, [customerCart]);

  // Individual item selection handler
  const handleItemSelect = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Calculate total for selected items
  const totalPrice = customerCart
    ?.filter((item) => selectedItems.includes(item.itemId))
    .reduce((sum, item) => sum + item.subtotal, 0);

  const updateCartItem = async (cartId, quantity) => {
    try {
      const params = {
        accessToken: cookie.get("accessToken") || "",
        customerCartId: cartId,
        merchantId: merchantInfoContext.merchantId,
        quantity,
      };

      const response = await API.graphql(
        graphqlOperation(updateItemInCustomerCart, params)
      );
      console.log("Cart Updated:", response);
      // Optionally refetch cart items to reflect the changes
      fetchCustomerCart();
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleIncrement = (cartId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    updateCartItem(cartId, newQuantity);
  };

  const handleDecrement = (cartId, currentQuantity) => {
    const newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;
    updateCartItem(cartId, newQuantity);
  };

  // const fetchCheckCart = async () => {
  //   setIsLoading(true);
  //   try {
  //     let params = {
  //       customerCartIds: customerCartIds,
  //       customerId: sessionId,
  //       isOwnTransportOption: false,
  //       merchantId: merchantInfoContext.merchantId,
  //       orderType: orderType === "pickup" ? "pickup" : "delivery", // Use the passed orderType
  //       postalCode: "12345",
  //       promoCode: "",
  //       storeId: merchantInfoContext.storeId,
  //       truckCapacityIds: "",
  //     };

  //     let res = await API.graphql(graphqlOperation(checkCart, params));
  //     setCustomerCart(res.data.checkCart.cartItems);
  //     setIsLoading(false);
  //     if (res.errors) {
  //       console.error("GraphQL Errors:", res.errors);
  //       return;
  //     }
  //   } catch (error) {
  //     console.error("Error during CheckCart:", error);
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    if (customerCartIds.length > 0 && merchantInfoContext) {

      fetchCheckCart(customerCartIds);
    } else {
      // If there are no cart IDs, we should end loading state
      setIsLoading(false);
    }
  }, [customerCartIds, merchantInfoContext, orderType]);

  const handleRemoveItem = async (cartId) => {
    if (isRemoving) return; // Prevent multiple clicks

    setIsRemoving(true);
    try {
      const params = {
        accessToken: cookie.get("accessToken") || "",
        customerCartId: cartId,
        merchantId: merchantInfoContext.merchantId,
      };

      const response = await API.graphql(
        graphqlOperation(removeItemFromCustomerCart, params)
      );

      if (response.data?.removeItemFromCustomerCart?.status === "true") {
        // After successful deletion, refetch the cart to update the UI
        await fetchCustomerCart();
        await fetchCheckCart(customerCartIds);

        // Also remove the item from selected items if it was selected
        setSelectedItems((prev) => prev.filter((id) => id !== cartId));
      } else {
        console.error(
          "Failed to remove item:",
          response.data?.removeItemFromCustomerCart?.message
        );
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex items-center gap-3 w-full justify-between">
        <div className="flex-grow relative">
          <Input
            placeholder={!voucher ? "Search product" : "Search voucher"}
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
            className="bg-[#292929] h-[40px] px-10 py-2 rounded-[50px] placeholder:font-normal placeholder:text-[13px] text-[#B5BBC4]"
          />

          <div className="absolute left-[12px] top-1/2 transform -translate-y-1/2 flex items-center">
            <Image src={searchicon} alt="Search" width={16} height={16} />
          </div>
        </div>
        <div className="bg-[#292929] w-[40px] h-[40px] rounded-full flex items-center justify-center">
          <LuSettings2 size={17.5} />
        </div>
      </div>

      <div className="bg-[#292929] p-3 rounded-[16px] flex flex-col gap-5 w-full">
        {/* {!voucher && (
          <div className="flex gap-3 items-center ">
            <div className="bg-[#D70010] w-5 h-5 rounded-[4px] justify-center items-center flex">
              <IoCheckmark />
            </div>
            <h1 className="bg-[#D70010] px-[6px] py-1 font-normal text-[12px] rounded-[4px] flex-grow">
              Pick up on 15 September 2024, 15:00 PM
            </h1>
          </div>
        )} */}

        {isLoading ? (
          // Loading skeleton
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-[10px] w-full animate-pulse">
                <div className="w-5 h-5 bg-gray-600 rounded-[4px]"></div>
                <div className="w-[50px] h-[50px] bg-gray-600 rounded-[10px]"></div>
                <div className="flex flex-col justify-between h-[100px] flex-grow">
                  <div className="flex flex-col gap-[6px]">
                    <div className="h-3 bg-gray-600 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-600 rounded w-1/4"></div>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="flex gap-4 items-center">
                      <div className="w-[19.5px] h-[19.5px] bg-gray-600 rounded-full"></div>
                      <div className="w-4 h-4 bg-gray-600 rounded"></div>
                      <div className="w-[19.5px] h-[19.5px] bg-gray-600 rounded-full"></div>
                    </div>
                    <div className="w-5 h-5 bg-gray-600 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !customerCart || customerCart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <p className="text-gray-400 text-[16px]">Your cart is empty</p>
            <Button
              className="rounded-tl-[6px] rounded-tr-[24px] rounded-bl-[24px] rounded-br-[6px]"
              style={{
                background:
                  "linear-gradient(90.71deg, #FF0013 2.73%, #B72326 97.35%)",
              }}
              onClick={() => router.push("/eshop")}
            >
              Continue Shopping
            </Button>
          </div>
        ) : !filteredItems || filteredItems.length === 0 ? (
          <div className="text-center py-4 text-gray-400">
            No products found
          </div>
        ) : (
          filteredItems?.map((item) => (
            <div className="flex gap-[10px] w-full" key={item.itemId}>
              <div
                className={`w-5 h-5 rounded-[4px] border border-white flex items-center justify-center cursor-pointer ${
                  selectedItems.includes(item.itemId)
                    ? "bg-[#D70010] border-[#D70010]"
                    : ""
                }`}
                onClick={() => handleItemSelect(item.itemId)}
              >
                {selectedItems.includes(item.itemId) && <IoCheckmark />}
              </div>
              <div>
                {/* <Image
                  src={item.itemImage}
                  height={50}
                  width={50}
                  className="rounded-[10px]"
                /> */}
                <img
                  src={process.env.BUCKET_URL + item.itemImage}
                  alt="item"
                  className="rounded-[10px] w-[50px] h-[50px]"
                />
              </div>
              <div className="flex  flex-col justify-between h-[100px] flex-grow">
                <div className="flex flex-col gap-[6px]">
                  <h1 className="text-[12px] font-normal">{item.itemTitle}</h1>
                  <h1 className="text-[12px] font-medium">
                    RM{item.subtotal.toFixed(2)}
                  </h1>
                </div>
                <div className="flex justify-between w-full">
                  <div className="flex gap-4">
                    <div
                      className="w-[19.5px] h-[19.5px] border-[1px] border-[#FFFFFF] rounded-full flex items-center justify-center cursor-pointer"
                      onClick={() =>
                        handleDecrement(item.customerCartId, item.quantity)
                      }
                    >
                      <Minus size={8.25} />
                    </div>
                    <div>{item.quantity}</div>
                    <div
                      className="w-[19.5px] h-[19.5px] border-[1px] border-[#FFFFFF] rounded-full flex items-center justify-center cursor-pointer"
                      onClick={() =>
                        handleIncrement(item.customerCartId, item.quantity)
                      }
                    >
                      <Plus size={8.25} />
                    </div>
                  </div>
                  <div>
                    <Image
                      src={Delete}
                      width={20}
                      height={20}
                      onClick={() => handleRemoveItem(item.customerCartId)}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="fixed bottom-0 left-0 w-full px-4 py-5 flex gap-3 bg-[#111111] text-[14px] justify-between bg-opacity-25 backdrop-blur-[50px] ">
        <div className="flex items-center justify-between flex-grow">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleSelectAll}
          >
            <div
              className={`w-5 h-5 rounded-[4px] border border-white flex items-center justify-center ${
                selectedItems.length === filteredItems?.length &&
                filteredItems?.length > 0
                  ? "bg-[#D70010] border-[#D70010]"
                  : ""
              }`}
            >
              {selectedItems?.length === filteredItems?.length &&
                filteredItems?.length > 0 && <IoCheckmark />}
            </div>
            <span>Select all</span>
          </div>
          <div>
            <p>Total: </p>
            <p>RM{totalPrice?.toFixed(2)}</p>
          </div>
        </div>
        <Button
          className=" rounded-tl-[6px] rounded-tr-[24px] rounded-bl-[24px] rounded-br-[6px] w-[120px]"
          style={{
            background:
              "linear-gradient(90.71deg, #FF0013 2.73%, #B72326 97.35%)",
          }}
          onClick={handleConfirmation}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ProductCart;
