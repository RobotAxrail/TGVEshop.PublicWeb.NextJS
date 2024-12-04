import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/router";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer";
import DeliveryTabs from "./DeliveryTabs";
import { add } from "lodash";

const CustomerCart = ({ price, addItemToCart}) => {
  const router = useRouter(); // Initialize useRouter
  const [quantity, setQuantity] = useState(1); // Initialize the quantity state
  const [customerCart, setCustomerCart] = useState([]);
  const [customerCartIds, setCustomerCartIds] = useState([]);
  const [orderType, setOrderType] = useState("PickUp");

  // Handle increment
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // Handle decrement
  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent going below 1
  };

  const handleAddToCart = async () => {
    try {
      // Pass both quantity and order type
      await addItemToCart(quantity, orderType);
      router.push("/eshop/cart");
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };
  return (
    <div className="fixed bottom-0 left-0 w-full p-4 flex flex-col gap-5 bg-[#111111] bg-opacity-25 backdrop-blur-[50px]">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div
            className="w-[22.5px] h-[22.5px] border-[1px] border-[#FFFFFF] rounded-full flex items-center justify-center"
            onClick={decrementQuantity}
          >
            <Minus size={8.25} />
          </div>
          <div>{quantity}</div>
          <div
            className="w-[22.5px] h-[22.5px] border-[1px] border-[#FFFFFF] rounded-full flex items-center justify-center"
            onClick={incrementQuantity}
          >
            <Plus size={8.25} />
          </div>
        </div>
        <div>
          <p className="font-medium text-[16px]">
            RM{(price * quantity).toFixed(2)}
          </p>
        </div>
      </div>
      <Drawer>
        {/* Trigger to open the drawer */}
        <DrawerTrigger asChild>
          <Button
            className="w-full rounded-tl-[6px] rounded-tr-[24px] rounded-bl-[24px] rounded-br-[6px]"
            style={{
              background:
                "linear-gradient(90.71deg, #FF0013 2.73%, #B72326 97.35%)",
            }}
  

          >
            Continue
          </Button>
        </DrawerTrigger>
        {/* Drawer content */}
        <DrawerContent
          className="custom-drawer rounded-tl-[24px] rounded-tr-[24px]"
          style={{
            backgroundColor: "#2F2F2F",
            border: "none", // Light gray background
          }}
        >
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-[#E3E3E3] h-[5px] w-[80px] rounded-[100px]"></div>
          <div className="px-4 pt-6 flex justify-center items-center">
          <DeliveryTabs onOrderTypeChange={setOrderType} />
          </div>
          <DrawerFooter>
            <Button
              className="w-full rounded-tl-[6px] rounded-tr-[24px] rounded-bl-[24px] rounded-br-[6px] text-[14px] font-medium"
              style={{
                background:
                  "linear-gradient(90.71deg, #FF0013 2.73%, #B72326 97.35%)",
              }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CustomerCart;
