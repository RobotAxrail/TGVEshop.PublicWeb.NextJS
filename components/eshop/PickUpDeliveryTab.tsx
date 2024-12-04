import React, { useEffect, useState } from "react";
import buildingoffice from "@/images/buildingoffice.svg";
import Image from "next/image";
import * as Switch from "@radix-ui/react-switch";
import Location from "./Location";
import { useLocation } from "@/contexts/LocationContext";
const PickUpDeliveryTab = ({ pickdelivery }) => {
  const {selectedCinema} = useLocation();
  const [isPickUpNow, setIsPickUpNow] = useState(false);
  const [isLocationDrawerOpen, setIsLocationDrawerOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Klang Valley");
  

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setIsLocationDrawerOpen(false);
  };

  const handleCinemaSelect = (cinema: { name: string; distance: string }) => {
    // setSelectedCinema(cinema);
    setIsLocationDrawerOpen(false);
  };


  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className = "font-medium text-[16px]">Choose a pick up time</h1>

      <div
        className="bg-[#444444] py-4 px-3 rounded-[12px] flex items-center gap-2"
        onClick={() => setIsLocationDrawerOpen(true)}
      >
        <div className="bg-[#575757] flex items-center justify-center w-[50px] h-[50px] rounded-full">
          <Image
            src={buildingoffice}
            alt="buildingoffice"
            width={26}
            height={26}
          />
        </div>
        <div className="flex flex-col gap-[2px]">
        <h1 className="font-semibold text-[14px]">{selectedCinema.name}</h1>
        {/* <p className="text-[#D4D4D4] text-[12px]">({selectedCinema.distance})</p> */}
        </div>
      </div>
      <div className="bg-[#444444] py-4 px-3 rounded-[12px] flex gap-4 ">
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-[14px]">{pickdelivery ? "Pick up now" : "Delivery ASAP"}</h1>
          <p className="text-[#D4D4D4] font-normal text-[12px]">
            {pickdelivery
              ? "Your order will be ready for pick up in 15 minutes. See you!"
              : "Your order will be ready to ship soon. See you soon!"}
          </p>
        </div>
        <div className="flex items-center">
          <Switch.Root
            checked={isPickUpNow}
            onCheckedChange={setIsPickUpNow}
            className="w-[42px] h-[25px] bg-gray-500 rounded-full relative data-[state=checked]:bg-[#EF0818] outline-none cursor-default"
          >
            <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
          </Switch.Root>
        </div>
      </div>
      <Location
        isOpen={isLocationDrawerOpen}
        onClose={() => setIsLocationDrawerOpen(false)}
        selectedLocation={selectedLocation}
        onLocationSelect={handleLocationSelect}
        onCinemaSelect={handleCinemaSelect}
      />
    </div>
  );
};

export default PickUpDeliveryTab;
