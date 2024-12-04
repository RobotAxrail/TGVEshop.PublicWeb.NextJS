import { getNearbyStores } from "@/graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";
import StoreLocationCard from "./StoreLocationCard";
type TStoreSelections = {
  storeName: string;
  pickupStart: string;
  pickupEnd: string;
  distance: string;
  id: string;
};
import useTranslation from 'next-translate/useTranslation';

export default function StoreLocationSelector({
  isLoading: parentIsLoading = false,
  storeSelectionMode = "delivery",
  defaultStoreSelections,
  setSelectedStore,
  selectedStoreId,
  merchantId,
  address,
  title,
}: {
  setSelectedStore: (id: string, name: string) => void;
  defaultStoreSelections?: TStoreSelections[];
  storeSelectionMode?: "delivery" | "pickup";
  selectedStoreId: string;
  merchantId: string;
  isLoading?: boolean;
  address: string;
  title: string;
}) {
  const { t } = useTranslation('common');
  const [isLoading, setIsLoading] = useState(false);
  const [storeSelections, setStoreSelections] = useState(
    defaultStoreSelections || []
  );

  useEffect(() => {
    if (address && !defaultStoreSelections) getNearestStores(address);
  }, [address]);

  const getNearestStores = async (address: string) => {
    if (address.length <= 0) return;
    setIsLoading(true);
    const {
      data: { getNearbyStores: returnData },
    } = (await API.graphql(
      graphqlOperation(getNearbyStores, {
        deliveryMode: storeSelectionMode,
        customerAddress: address,
        merchantId,
      })
    )) as any;
    setStoreSelections(() => {
      const stores = returnData?.map(
        ({ address, name, distance, storeId }) => ({
          storeName: name || address,
          pickupStart: "",
          pickupEnd: "",
          id: storeId,
          distance,
        })
      );
      if (stores?.length <= 0) setSelectedStore(null, null);
      return stores;
    });

    setIsLoading(false);
  };

  return (
    <>
      <p className="m-0 text-gray-800 text-sm mb-0.5 font-semibold">{title}</p>
      <div className="max-h-56 overflow-y-auto">
        {(parentIsLoading || isLoading) && (
          <div className="flex flex-col gap-3">
            <div className="animate-pulse bg-gray-200 h-12 w-full rounded" />
            <div className="animate-pulse bg-gray-200 h-12 w-full rounded" />
            {parentIsLoading && (
              <>
                <div className="animate-pulse bg-gray-200 h-12 w-full rounded" />
                <div className="animate-pulse bg-gray-200 h-12 w-full rounded" />
              </>
            )}
          </div>
        )}
        {!(parentIsLoading || isLoading) &&
          (defaultStoreSelections || storeSelections)?.length <= 0 && (
            <div className="text-gray-500 text-sm text-center p-4">
              {t("No recommendations near your area")}
            </div>
          )}
        {!(parentIsLoading || isLoading) &&
          (defaultStoreSelections || storeSelections)?.length > 0 &&
          (defaultStoreSelections || storeSelections)?.map(
            ({ storeName, pickupEnd, pickupStart, distance, id }, index) => (
              <StoreLocationCard
                onSelectStoreLocation={() => setSelectedStore(id, storeName)}
                isSelected={id === selectedStoreId}
                pickupStart={pickupStart}
                storeName={storeName}
                pickupEnd={pickupEnd}
                distance={distance}
                key={index}
                id={id}
              />
            )
          )}
      </div>
    </>
  );
}
