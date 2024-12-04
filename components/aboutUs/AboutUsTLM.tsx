import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import React from "react";

export default function AboutUsTLM({
  companyInformation,
  description,
  coordinates,
  videoLink,
  title,
}: {
  description: string;
  videoLink: string;
  title: string;
  companyInformation: {
    description: string;
    title: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}) {
  return (
    <div className="grid-cols-3 grid gap-[24px] w-full max-w-7xl m-auto">
      <div className="col-span-3 md:col-span-2">
        <div className={"px-6"}>
          <div>
            <div className="mt-6">
              <h2 className="text-3xl font-bold tracking-tight text-[#0F8983]">
                {title}
              </h2>
              <div
                dangerouslySetInnerHTML={{ __html: description }}
                className="mt-2 text-lg text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-3 md:col-span-1 mt-6 px-6 md:px-0">
        <video src={videoLink} controls className="h-full w-full" />
      </div>
      <div className="col-span-3 px-6 mt-4">
        <Map {...companyInformation} coordinates={coordinates} />
      </div>
    </div>
  );
}

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
function init(map: any, title: string, address: string, coordinates: any) {
  const infowindow = new window.google.maps.InfoWindow({
    content: contentString(title, address),
  });
  const marker = new window.google.maps.Marker({
    position: coordinates,
    map,
  });
  marker.addListener("click", () => {
    infowindow.open({
      shouldFocus: false,
      anchor: marker,
      map,
    });
  });
}

function Map(props: any) {
  const libraries = ["places"] as any;
  const { mapOptions, title, address, coordinates } = props;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const mapRef = React.useRef();

  // save the current map and initialize the overlays elements
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
    init(map, title, address, coordinates);
  }, []);

  if (loadError) return <>Error loading map</>;
  if (!isLoaded) return <>Loading Map</>;

  return (
    <GoogleMap
      options={mapOptions ? mapOptions : options}
      mapContainerStyle={{ height: "500px" }}
      center={coordinates}
      onLoad={onMapLoad}
      ref={mapRef}
      zoom={19}
    />
  );
}
