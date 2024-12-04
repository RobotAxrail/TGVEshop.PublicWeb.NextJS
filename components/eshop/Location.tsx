// First, let's create a new CinemaLocation component
import React, { useContext, useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { Search, MapPin } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "react-vant";
import Image from "next/image";
import buildingoffice from "@/images/buildingoffice.svg";
import { API, graphqlOperation } from "aws-amplify";
import MerchantContext from "@/contexts/MerchantContext";
import { getNearbyStores } from "@/graphql/queries";
import { useLocation } from "@/contexts/LocationContext";
// Cinema data structure - you can modify this based on your needs
const locations = [
  "Klang Valley",
  "Johor",
  "Perak",
  "Sarawak",
  "Negeri Sembilan",
  "Terengganu",
];


const CinemaLocation = ({
  isOpen,
  onClose,
  selectedLocation,
  onCinemaSelect,
  cinemaList,
  loading
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [coord, setCoord] = useState({ lat: 1.3521, lng: 103.8198 });
  const filteredCinemas = cinemaList.filter((cinema) =>
    cinema.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const handleCinemaSelect = (cinema) => {
    setSelectedCinema(cinema.name);
    onCinemaSelect(cinema);
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent
        className="custom-drawer rounded-tl-[24px] rounded-tr-[24px] "
        style={{
          backgroundColor: "#2F2F2F",
          border: "none", // Light gray background
        }}
      >
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-[#E3E3E3] h-[5px] w-[80px] rounded-[100px]"></div>
        <div className="w-full pt-[24px]">
          <DrawerHeader className="bg-[#2F2F2F] rounded-t-lg shadow-sm text-left flex flex-col gap-6">
            <div className="flex items-center gap-2 justify-between">
              <DrawerTitle className="font-medium text-[18px] leading-[25.2px] tracking-[-0.02em] text-left text-white">
                Select Cinema Location
              </DrawerTitle>
              <div className="flex items-center gap-1 bg-[#4E4E4E] px-[8px] py-[6px] rounded-full">
                <MapPin className="w-4 h-4 text-white" />
                <span className="text-[13px] font-medium text-white">
                  {selectedLocation}
                </span>
              </div>
            </div>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search cinema..."
                value={searchQuery}
                onChange={(value) => setSearchQuery(value)}
                className="pl-9 bg-[#444444] border-none h-[40px] pr-4 py-2 rounded-[50px] placeholder:font-normal placeholder:text-[13px] text-white"
              />
            </div>
          </DrawerHeader>
          <div className="p-4">
            {loading ? ( // Show loading indicator when loading is true
              <p className="text-center text-gray-400 py-4">Loading cinemas...</p>
            ) : filteredCinemas.length === 0 ? (
              <p className="text-center text-gray-400 py-4">
                No locations found
              </p>
            ) : (
              <ul className="space-y-4">
                {filteredCinemas.map((cinema) => {
                  const isSelected = cinema.name === selectedCinema; // Match by name or another unique field
                  return (
                    <li
                      key={cinema.storeId} // Use `storeId` as the unique key
                      onClick={() => handleCinemaSelect(cinema)} // Pass the cinema object
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                        isSelected ? "bg-[#444444]" : ""
                      }`}
                    >
                      <div className="flex gap-2 items-center">
                        <div className="bg-[#575757] flex items-center justify-center w-[50px] h-[50px] rounded-full flex-shrink-0">
                          <Image
                            src={buildingoffice}
                            alt="Cinema"
                            width={26}
                            height={26}
                          />
                        </div>
                        <div className="flex flex-col">
                          <span
                            className={`text-[14px] ${
                              isSelected
                                ? "text-[#FF0013] font-normal"
                                : "text-white"
                            }`}
                          >
                            {cinema.name}
                          </span>
                          <span className="text-[12px] text-gray-400">
                            {cinema.address}
                          </span>
                          <span className="text-[12px] text-gray-400">
                            {cinema.storeOperatingHours}
                          </span>
                        </div>
                      </div>
                      {isSelected && (
                        <IoMdCheckmark className="w-5 h-5 text-[#FF0013]" />
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

// Modified Location component to handle cinema selection
const Location = ({
  isOpen,
  onClose,
  selectedLocation,
  onLocationSelect,
  onCinemaSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCinemaDrawerOpen, setIsCinemaDrawerOpen] = useState(false);
  const merchantInfoContext = useContext(MerchantContext);
  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const [customerAddress, setCustomerAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const { handleSelectState,fetchNearestStores, cinemaList,handleSelectCinemaContext} = useLocation();

  const handleLocationSelect = (location) => {
    onLocationSelect(location);
    setSearchQuery("");
    setIsCinemaDrawerOpen(true);
    fetchNearestStores(location);

  };

  const handleCinemaSelect = (cinema) => {
    onCinemaSelect(cinema); // Pass the cinema selection up to parent
    setIsCinemaDrawerOpen(false);
    handleSelectCinemaContext(cinema)
  };


  return (
    <>
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent
          className="custom-drawer rounded-tl-[24px] rounded-tr-[24px]"
          style={{
            backgroundColor: "#2F2F2F",
            border: "none", // Light gray background
          }}
        >
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-[#E3E3E3] h-[5px] w-[80px] rounded-[100px]"></div>
          <div className="w-full pt-[24px]">
            <DrawerHeader className="bg-[#2F2F2F] rounded-t-lg shadow-sm text-left flex flex-col gap-6">
              <DrawerTitle className="font-medium text-[18px] leading-[25.2px] tracking-[-0.02em] text-left text-white">
                Select a Location
              </DrawerTitle>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search city..."
                  value={searchQuery}
                  onChange={(value) => setSearchQuery(value)}
                  className="text-[13px] pl-9 bg-[#444444] border-none h-[40px] pr-4 py-2 rounded-[50px] placeholder:font-normal placeholder:text-[13px] text-white"
                />
              </div>
            </DrawerHeader>
            <div className="p-4">
              {filteredLocations.length === 0 ? (
                <p className="text-center text-gray-400 py-4">
                  No locations found
                </p>
              ) : (
                <ul className="space-y-4">
                  {filteredLocations.map((location) => {
                    const isSelected = location === selectedLocation;
                    return (
                      <li
                        key={location}
                        onClick={() => handleLocationSelect(location)}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                          isSelected ? "bg-[#444444]" : ""
                        }`}
                      >
                        <span
                          className={`text-[14px] ${
                            isSelected
                              ? "text-[#FF0013] font-normal"
                              : "text-white"
                          }`}
                        >
                          {location}
                        </span>
                        {isSelected && (
                          <IoMdCheckmark className="w-5 h-5 text-[#FF0013]" />
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <CinemaLocation
        isOpen={isCinemaDrawerOpen}
        onClose={() => setIsCinemaDrawerOpen(false)}
        selectedLocation={selectedLocation}
        onCinemaSelect={handleCinemaSelect}
        cinemaList={cinemaList}
        loading={loading} // Pass loading state
      />
    </>
  );
};

export default Location;
