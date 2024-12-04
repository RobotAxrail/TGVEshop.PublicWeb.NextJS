import React, { createContext, useState, useContext, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { getNearbyStores } from "@/graphql/queries";
import MerchantContext from "@/contexts/MerchantContext";

interface LocationContextType {
  selectedState: string;
  handleSelectState: (state: string) => void;
  fetchNearestStores: (address: string) => Promise<void>; // Added this type
  cinemaList: any[];
  selectedCinema:any;
  handleSelectCinemaContext: (cinema: any) => void;
}

const LocationContext = createContext<LocationContextType>({
  selectedState: "",
  handleSelectState: () => {},
  fetchNearestStores: async () => {}, // Added default value
  cinemaList: [],
  selectedCinema: null,
  handleSelectCinemaContext: () => {}
});

interface LocationProviderProps {
  children: React.ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({
  children,
}) => {
  const merchantInfoContext = useContext(MerchantContext);
  const [selectedState, setSelectedState] = useState<string>("");
  const [cinemaList, setCinemaList] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);


  const handleSelectState = (state: string) => {
    setSelectedState(state);
  };

  const handleSelectCinemaContext = (cinema) => {
    setSelectedCinema(cinema);
    console.log("Selected Cinema:", cinema);
  }

  const fetchNearestStores = async (address) => {
    try {
      let params = {
        deliveryMode: "delivery",
        customerAddress: "",
        merchantId: merchantInfoContext.merchantId,
        state: address,
      };
      const { data } = await API.graphql(
        graphqlOperation(getNearbyStores, params)
      );
      setCinemaList(data.getNearbyStores);
    } catch (error) {
      console.error("Error fetching nearest stores", error);
    } finally {
    }
  };


  const value = {
    selectedState,
    handleSelectState,
    fetchNearestStores,
    cinemaList,
    selectedCinema,
    handleSelectCinemaContext
  };
  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextType => {
  return useContext(LocationContext);
};
