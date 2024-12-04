import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useOrder } from "@/contexts/OrderContext";
import bikePNG from "@/images/rider_marker_small.png";
import storePNG from "@/images/merchant_marker_small.png";
import axios from "axios";
import useTranslation from "next-translate/useTranslation";
// import bikeSVG from "@/images/";

const MapWithCustomMarkers = (props: any) => {
  const { googleMapsIsLoaded } = useOrder();
  const { t } = useTranslation("common");
  if (googleMapsIsLoaded === false) {
    return <div>{t("loading")}</div>;
  }

  const mapStyles = [
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ];

  const handleOnLoad = (map: any) => {
    const bounds = new window.google.maps.LatLngBounds();
    props.markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  return (
    <div className="h-full">
      <GoogleMap
        onLoad={handleOnLoad}
        mapContainerClassName="h-full w-full rounded-lg"
        options={{
          disableDefaultUI: true,
          draggable: false,
          styles: mapStyles,
        }}
      >
        {props.markers.map(({ name, position }, i) => {
          return (
            <Marker
              key={i}
              position={position}
              icon={name === "rider" ? bikePNG.src : storePNG.src}
            />
          );
        })}
      </GoogleMap>
    </div>
  );
};

export default MapWithCustomMarkers;
