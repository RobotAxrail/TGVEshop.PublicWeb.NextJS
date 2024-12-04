import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PickUpDeliveryTab from "./PickUpDeliveryTab";
import StoreLocationSelector from "../AxrailCommerce/MultiStoreDeliverySelector/components/StoreLocationSelector";

const DeliveryTabs = ({ onOrderTypeChange }) => {
  const handleTabChange = (value) => {
    // Convert tab value to order type
    const orderType = value === "pickup" ? "PickUp" : "Delivery";
    onOrderTypeChange(orderType);
  };

  return (
    <div className="w-full max-w-[400px]">
      <Tabs 
        defaultValue="pickup" 
        className="w-full flex flex-col items-center justify-center"
        onValueChange={handleTabChange}
      >
        {/* Tabs List */}
        <TabsList className="flex w-full bg-[#444444] rounded-[10px] p-0">
          {/* Tabs Trigger */}
          <TabsTrigger
            value="pickup"
            className="text-[12px] font-normal px-4 py-[9px] flex-1 text-center rounded-[10px]  transition-all duration-300 data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:bg-transparent data-[state=inactive]:text-white"
          >
            Pick Up
          </TabsTrigger>
          <TabsTrigger
            value="delivery"
            className="text-[12px] font-normal px-4 py-[9px] flex-1 text-center rounded-[10px] transition-all duration-300 data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:bg-transparent data-[state=inactive]:text-white"
          >
            Delivery
          </TabsTrigger>
        </TabsList>

        {/* Tabs Content */}
        <TabsContent value="pickup" className="mt-4 w-full">
          <PickUpDeliveryTab pickdelivery = {true}/>
        </TabsContent>
        <TabsContent value="delivery" className="mt-4 w-full">
        <PickUpDeliveryTab pickdelivery = {false}/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeliveryTabs;
