import React from "react";

// components
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

// style
import classes from "./ContactUs.module.scss";

// map styles
const containerStyle = {
  width: "100%",
  height: "400px",
};

// map options
const options = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: true,
};

// info window content
const contentString = (title, content = "") =>
  '<div id="content">' +
  '<div id="siteNotice">' +
  "</div>" +
  `<h2 id="firstHeading" class="firstHeading"><b>${title}</b></h2>` +
  '<div id="bodyContent">' +
  `<p>${content}</p>` +
  "</div>" +
  "</div>";

// initialize the marker and info window
function init(stores, map) {
  stores.map((store) => {
    const title = store.storeName;
    const address = store.address;

    const infowindow = new window.google.maps.InfoWindow({
      content: contentString(title, address),
    });
    const marker = new window.google.maps.Marker({
      position: { lat: +store.latitude, lng: +store.longitude },
      map,
      title: store.storeName,
    });
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
    });
  });
}

const libraries = ["places"]; // prevent too many re-render

function Map(props) {
  const { stores, mapCenter, mapZoom, mapOptions } = props;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const mapRef = React.useRef();

  // save the current map and initialize the overlays elements
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
    init(stores, map);
  }, []);

  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading Map";

  return (
    <GoogleMap
      mapContainerClassName={classes.map}
      center={ mapCenter ? mapCenter : {
        lat: stores.length === 1 ? +stores[0].latitude : 4.333567,
        lng: stores.length === 1 ? +stores[0].longitude : 102.2812929,
      }}
      zoom={mapZoom ? mapZoom : (stores.length === 1 ? 19 : 6.5)}
      options={mapOptions ? mapOptions : options}
      onLoad={onMapLoad}
    />
  );
}

export default React.memo(Map);
