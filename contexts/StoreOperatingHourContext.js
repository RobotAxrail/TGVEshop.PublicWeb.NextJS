import { createContext, useContext } from "react";

// apis
import { getStoreOperatingHours } from "@/apis/storeOperatingHours";

// contexts
import MerchantContext from "@/contexts/MerchantContext";
import { StoreTypes } from "@/enums/enums";

const StoreOperatingHourContext = createContext({});

const StoreOperatingHourContextProvider = ({ children }) => {
  const { merchantId, storeType } = useContext(MerchantContext);
  const { landingPageData, landingPageFetchStatus } = getStoreOperatingHours(
    merchantId,
    storeType
  );
  return (
    <StoreOperatingHourContext.Provider
      value={{ landingPageData, landingPageFetchStatus }}
    >
      {children}
    </StoreOperatingHourContext.Provider>
  );
};
const useStoreOperatingHour = () => {
  return useContext(StoreOperatingHourContext);
};
export {
  StoreOperatingHourContext,
  StoreOperatingHourContextProvider,
  useStoreOperatingHour,
};
