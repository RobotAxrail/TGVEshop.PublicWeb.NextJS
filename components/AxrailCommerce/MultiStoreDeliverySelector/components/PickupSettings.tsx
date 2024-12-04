import { ContainedButton } from "@/components/buttons/Buttons";
import { getNearbyStores } from "@/graphql/queries";
import { useDebounce } from "@/hooks/useDebounce";
import useTranslation from 'next-translate/useTranslation';
import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import StoreLocationSelector from "./StoreLocationSelector";

function getCurrentTime() {
  const currDate = new Date();
  return `${currDate.getHours()}:${currDate.getMinutes()}`;
}

export default function PickupSettings({
  defaultValue,
  merchantId,
  onConfirm,
}: {
  merchantId: string;
  onConfirm: (id: {
    deliveryTime: string;
    storeName: string;
    storeId: string;
    address: string;
  }) => void;
  defaultValue: {
    storeId: string;
    deliveryTime: string;
    address: string;
    storeName: string;
  };
}) {
  const { t } = useTranslation('common');
  const [coord, setCoord] = useState({ lat: 1.3521, lng: 103.8198 });
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [pickupStores, setPickupStores] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userAddress, setUserAddress] = useState();
  const [selectedStoreId, setSelectedStoreId] = useState<any>(
    defaultValue?.storeId || null
  );
  const [selectedPickupDate, setSelectedPickupDate] = useState<any>(
    defaultValue?.deliveryTime || "ASAP"
  );
  const [selectedStoreName, setSelectedStoreName] = useState<any>(
    defaultValue?.storeName || null
  );

  /*   useEffect(() => {
    if (selectedStoreId && selectedStoreName)
      searchStoreWithInput(selectedStoreName);
  }, []); */

  function onConfirmSubmit() {
    onConfirm({
      deliveryTime: selectedPickupDate,
      storeName: selectedStoreName,
      storeId: selectedStoreId,
      address: userAddress,
    });
  }

  const reverseGeocode = async ({ lat, lng }) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_MAPS_API_KEY}&latlng=${lat},${lng}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results[0];
  };

  const getStoreList = () => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          setCoord({ lat: latitude, lng: longitude });
          const res = await reverseGeocode({ lat: latitude, lng: longitude });
          setUserAddress(res?.formatted_address);
          getNearestStores(res?.formatted_address);
        }
      );
  };

  useEffect(() => getStoreList(), []);

  // search is now done in front end since we are getting every store
  /*   useEffect(() => {
    if (debouncedSearchTerm.length > 0)
      searchStoreWithInput(debouncedSearchTerm);
    else {
      getUserLocation();
      getNearestStores(userAddress);
    }
  }, [debouncedSearchTerm]); */

  /*  const searchStoreWithInput = async (input: string) => {
    if (input.length <= 0) return;
    setIsLoading(true);

    const {
      data: { getNearbyStores: res },
    } = (await API.graphql(
      graphqlOperation(getNearbyStores, {
        longitude: coord?.lng,
        latitude: coord?.lat,
        deliveryMode: "pickup",
        orderType: "pickup",
        keyword: input,
        merchantId,
      })
    )) as any;
    setPickupStores(() => {
      const stores = (res as any)?.map(
        ({ address, name, distance, storeId }) => ({
          storeName: name || address,
          pickupStart: "",
          pickupEnd: "",
          id: storeId,
          distance,
        })
      );

      if (!stores || stores?.length <= 0) {
        setSelectedStoreName(null);
        setSelectedStoreId(null);
      }
      return stores;
    });
    setIsLoading(false);
  }; */

  const getNearestStores = async (address: string) => {
    if (address?.length <= 0) return;
    setIsLoading(true);
    const {
      data: { getNearbyStores: returnData },
    } = (await API.graphql(
      graphqlOperation(getNearbyStores, {
        customerAddress: address,
        longitude: coord?.lng,
        latitude: coord?.lat,
        deliveryMode: "pickup",
        orderType: "pickup",
        merchantId,
      })
    )) as any;
    setPickupStores(() => {
      const stores = returnData?.map(
        ({ address, name, distance, storeId }) => ({
          storeName: name || address,
          pickupStart: "",
          pickupEnd: "",
          id: storeId,
          distance,
        })
      );
      if (!stores || stores?.length <= 0) {
        setSelectedStoreName(null);
        setSelectedStoreId(null);
      }
      return stores;
    });
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col justify-center w-full items-center gap-4 p-4">
      <div className="w-full relative">
        {(document?.getElementById("outlet") as any)?.value?.length > 0 && (
          <div className="absolute top-0 right-0 items-center justify-center z-10 h-full">
            <button
              className="hover:brightness-75 cursor-pointer p-2"
              onClick={() => {
                (document.getElementById("outlet") as any).value = "";
                getNearestStores(userAddress);
              }}
            >
              <MdOutlineClose />
            </button>
          </div>
        )}

        <input
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="bg-white w-full p-2 rounded outline-none border border-gray-400"
          placeholder={t("Search Outlet")}
          name="outlet"
          id="outlet"
        />
      </div>

      <div className="flex flex-col gap-1 w-full md:max-h-[50vh] overflow-y-auto border border-gray-200 p-2 rounded">
        <StoreLocationSelector
          defaultStoreSelections={
            pickupStores
              ? pickupStores.filter((e) =>
                  e.storeName
                    .toLowerCase()
                    .includes(debouncedSearchTerm.toLowerCase())
                )
              : []
          }
          selectedStoreId={selectedStoreId}
          storeSelectionMode="pickup"
          merchantId={merchantId}
          address={""}
          title={t("Pickup at:")}
          isLoading={isLoading}
          setSelectedStore={(id, name) => {
            setSelectedStoreName(name);
            setSelectedStoreId(id);
          }}
        />
      </div>
      <ContainedButton
        className="w-full mb-10 mt-3 rounded shadow-none hover:shadow-none text-headerFooterFontColor hover:brightness-95 "
        disabled={!Boolean(selectedStoreId) || !Boolean(selectedStoreName)}
        onClick={onConfirmSubmit}
      >
        {t("confirm")}
      </ContainedButton>
    </div>
  );
}

// isSelected ? "bg-blue-100" : "";
