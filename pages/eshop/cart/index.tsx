import router from "next/router";
import React, { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "react-vant";
import ProductCart from "@/components/eshop/cart/ProductCart";
import { useRouter } from "next/router";
import VoucherCart from "@/components/eshop/cart/VoucherCart";

const Cart = () => {
  const handleBack = () => {
    router.push("/eshop"); // Navigate to /eshop
  };

  const [selectedTab, setSelectedTab] = useState("pickup");

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

      <div>
        <Tabs
          defaultValue="product"
          className="w-full flex flex-col items-center justify-center "
        >
          {/* Tabs List */}
          <TabsList className="flex w-full bg-[#444444] rounded-[10px] p-0">
            {/* Tabs Trigger */}
            <TabsTrigger
              value="product"
              className="text-[12px] font-normal px-4 py-[9px] flex-1 text-center rounded-[10px]  transition-all duration-300 data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:bg-transparent data-[state=inactive]:text-white"
            >
              Product
            </TabsTrigger>
            <TabsTrigger
              value="voucher"
              className="text-[12px] font-normal px-4 py-[9px] flex-1 text-center rounded-[10px] transition-all duration-300 data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:bg-transparent data-[state=inactive]:text-white"
            >
              Voucher
            </TabsTrigger>
          </TabsList>

          {/* Tabs Content */}
          <TabsContent value="product" className="mt-4 w-full">
          <ProductCart voucher={false} orderType={selectedTab} />
          </TabsContent>
          <TabsContent value="voucher" className="mt-4 w-full">
            <VoucherCart />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Cart;
