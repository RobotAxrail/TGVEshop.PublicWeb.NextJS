import * as React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import { Search } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { getNearbyStores } from "@/graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import MerchantContext from "@/contexts/MerchantContext";

const locations = [
  "Klang Valley",
  "Johor",
  "Perak",
  "Sarawak",
  "Negeri Sembilan",
  "Terengganu",
];

const Location = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedLocation, setSelectedLocation] = React.useState<string | null>("Klang Valley");
  const merchantInfoContext = React.useContext(MerchantContext);
  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setIsOpen(false);
  };

 
  return (
    <div className="flex">
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <button
            className="flex items-center gap-2 p-2 rounded-full transition-colors"
            aria-label="Select location"
          >
            <IoLocationSharp className="w-5 h-5" />
            <span className="text-sm">
              {selectedLocation ? selectedLocation.toUpperCase() : "Select Location"}
            </span>
          </button>
        </DrawerTrigger>
        <DrawerContent
        className="custom-drawer rounded-tl-[24px] rounded-tr-[24px]"
        style={{
          backgroundColor: "#2F2F2F", 
          border:"none", // Light gray background
        }}>
            <div
            className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-[#E3E3E3] h-[5px] w-[80px] rounded-[100px]"
          ></div>
          <div className="w-full pt-[24px]">
            <DrawerHeader className="bg-[#2F2F2F] rounded-t-lg shadow-sm text-left flex flex-col gap-6">
              <DrawerTitle className="font-medium text-[18px] leading-[25.2px] tracking-[-0.02em] text-left decoration-skip-ink-none u">
                Select a Location
              </DrawerTitle>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-[#444444] border-none h-[40px] pr-4 py-2 rounded-[50px] placeholder:font-normal placeholder: text-[13px]"
                />
              </div>
            </DrawerHeader>
            <div className="p-4">
              {filteredLocations.length === 0 ? (
                <p className="text-center text-muted-foreground py-4 bg-[#2F2F2F] rounded-lg ">
                  No locations found
                </p>
              ) : (
                <ul className="space-y-2 overflow-auto max-h-[calc(75vh-180px)] rounded-lg font-normal text-[14px]">
                  {filteredLocations.map((location) => (
                    <li
                      key={location}
                      className={`p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors `}
                      onClick={() => handleLocationSelect(location)}
                    >
                      <div className="flex items-center justify-between font-normal text-[14px]">
                        <span
                          className={`${
                            selectedLocation === location
                              ? "text-[#FF0013] font-medium"
                              : ""
                          }`}
                        >
                          {location}
                        </span>
                        {selectedLocation === location && (
                          <IoMdCheckmark className="w-5 h-5 text-[#FF0013]" />
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Location;