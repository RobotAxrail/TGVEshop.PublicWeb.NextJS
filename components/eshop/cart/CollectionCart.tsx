import React, { useContext, useEffect, useMemo, useState } from "react";
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
} from "@/components/ui/drawer";

import { add } from "lodash";
import DeliveryTabs from "../DeliveryTabs";

import {
    getProductDetails,
    listSimilarItems,
    listItemReviews,
  } from "@/graphql/queries";
import MerchantContext from "@/contexts/MerchantContext";
import { isLocalHost } from "@/utils/util";
import { API, graphqlOperation } from "aws-amplify";
import ProductCart from "./ProductCart";
import Cookies from "universal-cookie";
import { getCustomerCarts } from "@/graphql/queries";

import {
    addItemToCustomerCart,
    updateItemInCustomerCart,
    removeItemFromCustomerCart,
  } from "@/graphql/mutations";


interface CartItem {
  seoUrl: string;
  quantity: number;
  price: number;
}

interface CollectionCartProps {
  cart: Record<string, CartItem>;
}


type GetProductDetailsResponse = {
  data: {
    getProductDetails: {
      cover: string | null;
      description: string | null;
      discountPercentage: number | null;
      image: string | null;
      isPreOrder: boolean | null;
      message: string;
      modifierGroups: any | null; // Replace with specific type if needed
      priceComparedAtPriceRange: any | null;
      priceRange: any | null;
      productIsDisabled: boolean | null;
      productUOMs: any | null;
      status: string;
      timeslotType: string | null;
      timeslots: any | null;
      title: string | null;
      totalRatings: number | null;
      totalReviews: number | null;
      variantName1: string | null;
      variantName2: string | null;
      variantName3: string | null;
      variantValues1: any | null;
      variantValues2: any | null;
      variantValues3: any | null;
      video: string | null;
    }
  }
};


const CollectionCart = ({ cart }: CollectionCartProps) => {
  const router = useRouter(); // Initialize useRouter
  const [quantity, setQuantity] = useState(1); // Initialize the quantity state
  const [customerCart, setCustomerCart] = useState([]);
  const [customerCartIds, setCustomerCartIds] = useState([]);
  const [orderType, setOrderType] = useState("PickUp");
  const merchantInfoContext = useContext(MerchantContext);
  const cookie = new Cookies();
  const sessionId = cookie.get("sessionId");

  const signInData = cookie.get("signIn");

  const totalSelectedItems = useMemo(() => {
    return Object.values(cart).reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return Object.values(cart).reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  }, [cart]);
  
    
  const fetchProductDetails = async (seoUrl) => {
    try {
        const params = {
            seoUrl: seoUrl,
            storeId: merchantInfoContext.storeId,
            domain: merchantInfoContext.domain,
            storeType: merchantInfoContext.storeType,
            merchantId: isLocalHost() ? merchantInfoContext.merchantId : "",
        };
        
        return await API.graphql(graphqlOperation(getProductDetails, params));

    } catch (error) {
        console.error("Failed to fetch product details:", error);
    }
  }

  const handleAddToCart = async () => {
    try{
        const productDetailsList = [];
        for (const itemId in cart) {
            if (cart.hasOwnProperty(itemId)) {
              const item = cart[itemId]; // Access the cart item using the key
              const data = (await fetchProductDetails(item.seoUrl) as GetProductDetailsResponse);
              productDetailsList.push(data.data.getProductDetails.productUOMs[0].productUOMId);
              await addItemToCart(data.data.getProductDetails.productUOMs[0].productUOMId, item.quantity, orderType.toLocaleLowerCase());  
              
        }
        }
        router.push("/eshop/cart")
    }catch(error){
        console.error("Error adding to cart", error);
    }
    
}


const addItemToCart = async(productUOMId, quantity, orderType) => {
    try{
        let params = {
            merchantId: merchantInfoContext.merchantId,
            accessToken: signInData?.accessToken ?? "",
            mandatoryItem: true,
            itemId: productUOMId,
            quantity: quantity,
            customerId: sessionId,
            itemProperty: "ProductUOM",
            selectedModifierGroups: [],
            storeId: merchantInfoContext?.storeId || "",
            salesChannelName: "Online Store",
            type: orderType.toLowerCase(),
        }
        const res = await API.graphql(
            graphqlOperation(addItemToCustomerCart, params)
          );

        let resGetCustomerCart = await API.graphql(
        graphqlOperation(getCustomerCarts, {
            customerId: sessionId,
            merchantId: merchantInfoContext.merchantId
        })
        );
    }catch(error){
        console.error("Add to cart failed: ", error);
        throw error; // Re-throw to be handled by caller
    }
}

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 flex flex-col gap-5 bg-[#111111] bg-opacity-25 backdrop-blur-[50px]">
      <div className="flex justify-between">
        
        <div>
        <p className="font-medium text-[16px]">
        {totalSelectedItems >1? `${totalSelectedItems} items selected` : `${totalSelectedItems} item selected`}
          </p>
        </div>

        <div>
        <p className="font-medium text-[16px]">
            RM{totalPrice.toFixed(2)}
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

export default CollectionCart;
