import { useContext } from "react";
import { GoogleMap, OverlayView } from "@react-google-maps/api";
import useTranslation from "next-translate/useTranslation";

import MerchantContext from "@/contexts/MerchantContext";
import { useStoreOperatingHour } from "@/contexts/StoreOperatingHourContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const PickupDialog: React.FC = () => {
  const today = new Date();
  const merchantInfoContext = useContext(MerchantContext);
  const { landingPageData }: any = useStoreOperatingHour();
  const { t } = useTranslation("common");

  const center: { lat: number; lng: number } = {
    lat: Number(merchantInfoContext.storeLatitude),
    lng: Number(merchantInfoContext.storeLongitude),
  };

  const getTodaysOperatingHours = (): string => {
    if (landingPageData?.operatingHours?.length === 0) return "";
    switch (true) {
      case landingPageData.operatingHours[today.getDay()].open ===
        "Open Full Day":
        return t("Open Full Day");
      case landingPageData?.operatingHours[today?.getDay()]?.open ===
        "Closed Full Day":
        return t("Closed Full Day");
      default:
        return `${landingPageData.operatingHours[today.getDay()].open} - ${
          landingPageData.operatingHours[today.getDay()].close
        }`;
    }
  };

  const InfoTextToDisplayList = [
    {
      label: t("Please pickup at:"),
      value: landingPageData?.address
        ? landingPageData.address
        : t("No address configured by merchant"),
    },
    {
      label: "Pickup time:",
      value: getTodaysOperatingHours(),
    },
  ];

  return (
    <div className="flex flex-col flex-grow">
      <div className="mt-5 mb-2">
        {InfoTextToDisplayList.map((info) => (
          <div className="mb-3 bg-gray-200 h-auto w-full rounded-[0.4rem] relative text-xs pb-2.5 px-4 pt-[31px] border border-gray-300">
            <label className="text-gray-600 absolute top-0 left-0 pl-4 pt-3 origin-top-left">
              {info.label}
            </label>
            <p className="font-bold m-0 text-[0.82rem] text-left">
              {info.value}
            </p>
          </div>
        ))}
      </div>
      <div
        className={
          "flex flex-col sm:h-[40vh] rounded-lg overflow-hidden flex-grow"
        }
      >
        <div className="relative flex-grow">
          <GoogleMap
            zoom={12}
            center={center}
            mapContainerClassName="w-full absolute inset-0"
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              gestureHandling: "greedy",
            }}
          >
            <OverlayView
              position={center}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="flex flex-col items-center">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-primary text-[2.2rem]"
                />
                <div className="pt-[5px] border-b-2 border-primary w-[1.2rem]"></div>
              </div>
            </OverlayView>
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default PickupDialog;
