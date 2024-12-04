import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import useTranslation from "next-translate/useTranslation";

export default function Map() {
  const { t } = useTranslation("common");
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAVIg1z-HIilfuaqzhQKhm_cS1ZZ96LLS8",
  });

  if (!isLoaded) return <div>{t("Loading")}...</div>;
  return <Maps />;
}

function Maps() {
  return (
    <GoogleMap
      zoom={12}
      center={{ lat: 5.98604862590014, lng: 116.07658176473377 }}
      mapContainerClassName="h-full w-full"
      options={{
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      <Marker position={center} />
      <div className="flex-1 h-auto w-48"></div>
    </GoogleMap>
  );
}
