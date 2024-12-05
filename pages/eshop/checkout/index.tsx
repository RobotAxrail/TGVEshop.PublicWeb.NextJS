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
import { GoArrowLeft } from "react-icons/go";
import { useRouter } from "next/router";
import officebuilding from "public/assets/images/buildingoffice-white.svg";
import pickuptime from "public/assets/images/pickuptime.svg";
import vouchercode from "public/assets/images/vouchercode.svg";
import { MdNavigateNext } from "react-icons/md";
import MerchantContext from "@/contexts/MerchantContext";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Vouchers from "@/components/eshop/cart/Vouchers";
import { useLocation } from "@/contexts/LocationContext";

import {
  checkCart,
  checkCartLimit,
  placeCustomerOrderToSQS,
} from "@/graphql/mutations";
import Cookies from "universal-cookie";
import { API, graphqlOperation } from "aws-amplify";

import {
  addItemToCustomerCart,
  updateItemInCustomerCart,
  removeItemFromCustomerCart,
} from "@/graphql/mutations";
import { useCart } from "@/contexts/EShopCartContext";

type UpdateItemInCustomerCartResponse = {
  data: {
    updateItemInCustomerCart: {
      message: string;
      status: string;
    };
  };
};

const Confirmation = ({ voucher }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const cookie = new Cookies();
  const sessionId = cookie.get("sessionId");
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const router = useRouter();
  const handleBack = () => {
    router.back(); // Navigate to /eshop
  };

  const { customerCart, fetchCheckCart, triggerCheckout, isCheckoutLoading } =
    useCart();
  const merchantInfoContext = useContext(MerchantContext);
  // const [customerCart, setCustomerCart] = useState([]);
  const [customerCartIds, setCustomerCartIds] = useState([]);

  const { selectedCinema } = useLocation();

  const selectedItems = router.query.selectedItems
    ? JSON.parse(router.query.selectedItems as string)
    : [];

  useEffect(() => {
    const init = async () => {
      if (router.isReady && router.query.cartIds && merchantInfoContext) {
        try {
          const cartIds = JSON.parse(router.query.cartIds as string);

          if (cartIds.length > 0) {
            await fetchCheckCart(cartIds);
          }
        } catch (error) {
          console.error("Error parsing cartIds:", error);
          setIsLoading(false);
        }
      }
    };

    init();
  }, [router.isReady, router.query.cartIds, merchantInfoContext]);

  const [quantities, setQuantities] = useState(
    Object.fromEntries(
      customerCart.map((item) => [
        item.itemId,
        1, // Starting with quantity 1 for each item
      ])
    )
  );

  // Add these handler functions before the return statement
  const updateCartItem = async (cartId, quantity) => {
    try {
      const params = {
        accessToken: cookie.get("accessToken") || "",
        customerCartId: cartId,
        merchantId: merchantInfoContext.merchantId,
        quantity,
      };

      const response = (await API.graphql(
        graphqlOperation(updateItemInCustomerCart, params)
      )) as UpdateItemInCustomerCartResponse;

      // After successful update, refetch cart
      if (response.data?.updateItemInCustomerCart?.status === "true") {
        const cartIds = JSON.parse(router.query.cartIds as string);
        await fetchCheckCart(cartIds);
      }
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

  // Update your total price calculation
  const totalPrice = customerCart.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <div className="p-4 flex flex-col gap-5">
      <div className="flex items-center py-4 ">
        <GoArrowLeft
          size={16}
          onClick={handleBack}
          className="cursor-pointer"
        />
        <h2 className="text-white font-medium text-[16px] px-2 py-1">
          My Cart
        </h2>
      </div>
      <div className="flex flex-col gap-5">
        <div className="bg-[#292929] px-3 py-4 rounded-[12px] flex flex-col gap-3">
          <div className="flex gap-2">
            <Image src={officebuilding} width={20} height={20} />
            <p>{selectedCinema?.name || "Select a cinema"}</p>
          </div>
          {/* <div className="flex gap-2">
            <Image src={pickuptime} width={20} height={20} />
            <p className="font-normal text-[14px]">
              Pick up on 15 September 2024, 15:00 PM
            </p>
          </div> */}
        </div>

        <div className=" rounded-[16px] flex flex-col gap-5 w-full">
          {customerCart?.length === 0 ? (
            <div className="text-center py-4 text-gray-400">
              No products found
            </div>
          ) : (
            customerCart?.map((item) => (
              <div className="flex gap-[10px] w-full" key={item.itemId}>
                <div>
                  <img
                    src={process.env.BUCKET_URL + item.itemImage}
                    sizes="100vw"
                    className="w-[100px] h-[100px] object-cover rounded-[10px]"
                  />
                </div>
                <div className="flex  flex-col justify-between h-[100px] flex-grow">
                  <div className="flex flex-col gap-[6px]">
                    <h1 className="text-[12px] font-normal">
                      {item.itemTitle}
                    </h1>
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
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <hr />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <h1>Order Summary</h1>

            <div className="flex gap-2">
              <Input
                placeholder="Promo Code"
                className="border-[1px] border-[#71717A] px-3 py-[10px] rounded-[8px]"
              />
              <Button
                className=" rounded-tl-[6px] rounded-tr-[24px] rounded-bl-[24px] rounded-br-[6px] w-[120px]"
                style={{
                  background:
                    "linear-gradient(90.71deg, #FF0013 2.73%, #B72326 97.35%)",
                }}
              >
                Apply
              </Button>
            </div>
          </div>

          <Drawer>
            <DrawerTrigger asChild>
              <div className="bg-[#292929] px-3 py-[10px] rounded-[12px] flex justify-between items-center cursor-pointer">
                <div className="flex gap-2">
                  <Image src={vouchercode} width={20} height={16} />
                  <p className="text-[#D4D4D4] text-[14px] font-normal">
                    Use voucher code
                  </p>
                </div>
                <div>
                  <MdNavigateNext />
                </div>
              </div>
            </DrawerTrigger>
            <DrawerContent
              className="custom-drawer rounded-tl-[24px] rounded-tr-[24px]"
              style={{
                backgroundColor: "#2F2F2F",
                border: "none", // Light gray background
              }}
            >
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-[#E3E3E3] h-[5px] w-[80px] rounded-[100px]"></div>
              <Vouchers />
            </DrawerContent>
          </Drawer>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <p className="font-normal text-[14px] text-[#D4D4D4]">Subtotal</p>
              <p className="font-medium text-[14px] ">
                RM{totalPrice.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-normal text-[14px] text-[#D4D4D4]">SST 8%</p>

              {/* replace with sst  */}
              <p className="font-medium text-[14px] ">
                RM{(totalPrice * 0.08).toFixed(2)}
              </p>
            </div>
          </div>

          <hr />

          <div>
            <div className="flex justify-between">
              <p className="font-normal text-[14px] text-[#D4D4D4]">
                Total Payment
              </p>
              <p className="font-medium text-[14px] ">
                RM{(totalPrice * 1.08).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5 mt-[17px]">
        <Button
          className=" rounded-tl-[6px] rounded-tr-[24px] rounded-bl-[24px] rounded-br-[6px] w-full"
          style={{
            background:
              "linear-gradient(90.71deg, #FF0013 2.73%, #B72326 97.35%)",
          }}
          onClick={triggerCheckout}
          disabled={isCheckoutLoading}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Confirmation;
