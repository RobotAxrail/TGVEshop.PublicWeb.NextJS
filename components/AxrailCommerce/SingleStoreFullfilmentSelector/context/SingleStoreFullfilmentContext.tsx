import { OrderModalStateActions, StoreTypes } from "@/enums/enums";
import { createContext, ReactElement, useContext } from "react";
import MerchantContext from "@/contexts/MerchantContext";
import { useOrder } from "@/contexts/OrderContext";

const SingleStoreFullfilmentContext = createContext({});
export const useSingleStoreFullfilment = () =>
  useContext(SingleStoreFullfilmentContext);

export default function SingleStoreFullfilmentProvider({
  children,
}: {
  children: ReactElement;
}) {
  const { dispatchOrderModalState, orderType } = useOrder();
  const { storeType } = useContext(MerchantContext);

  return (
    <SingleStoreFullfilmentContext.Provider
      value={{
        orderType,
        isSingleStoreFullfilment: Boolean(
          storeType === StoreTypes.AC_STORETYPE ||
            storeType === StoreTypes.MULTISTORE_STORETYPE ||
            storeType === StoreTypes.B2B_STORETYPE
        ),
        inflateModal: () =>
          dispatchOrderModalState({ type: OrderModalStateActions.HOME }),
      }}
    >
      {children}
    </SingleStoreFullfilmentContext.Provider>
  );
}
