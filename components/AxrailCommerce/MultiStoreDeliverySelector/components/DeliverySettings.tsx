import { ContainedButton } from "@/components/buttons/Buttons";
import DeliveryPopupInput from "@/components/orderModeDialog/DeliveryPopupInput";
import PlacesAutocompleteInput from "@/components/orderModeDialog/PlacesAutocompleteInput";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePlacesAutocomplete from "use-places-autocomplete";
import StoreLocationSelector from "./StoreLocationSelector";
import { GoogleMap } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import _ from "lodash";
import useTranslation from 'next-translate/useTranslation';

export default function DeliverySettings({
  defaultValue,
  merchantId,
  onConfirm,
}: {
  merchantId: string;
  onConfirm: (value: {
    selectedLatLng: { lat: number; lng: number };
    deliveryLocation: string;
    selectedStoreId: string;
    addressDetail: string;
    storeName: string;
    address: string;
  }) => void;
  defaultValue: {
    selectedLatLng: { lat: number; lng: number };
    selectedStoreName: string;
    deliveryLocation: string;
    selectedStoreId: string;
    addressDetail: string;
    storeName: string;
    address: string;
  };
}) {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col justify-center w-full items-center gap-4 p-4 relative">
      <DeliverySettingsMap
        onSubmit={onConfirm}
        defaultValues={{
          addressDetail: defaultValue?.addressDetail || "",
          selectedStoreId: defaultValue?.selectedStoreId,
          selectedLatLng: defaultValue?.selectedLatLng,
          storeName: defaultValue?.storeName,
          address: defaultValue?.address,
        }}
      >
        {(formikProps: any) => (
          <div className="gap-4 flex flex-col py-2">
            <div className="flex flex-col gap-1 w-full md:max-h-[50vh] overflow-y-auto border border-gray-300 p-2 rounded">
              <StoreLocationSelector
                selectedStoreId={formikProps?.values?.selectedStoreId}
                address={formikProps?.values?.address}
                title={t("Nearest Stores")}
                merchantId={merchantId}
                setSelectedStore={(v: string, storeName: string) => {
                  formikProps.setFieldValue("selectedStoreId", v);
                  formikProps.setFieldValue("storeName", storeName);
                }}
              />
            </div>
          </div>
        )}
      </DeliverySettingsMap>
    </div>
  );
}

function DeliverySettingsMap({
  defaultValues,
  onSubmit,
  children,
}: {
  children: (formikProps: any) => JSX.Element;
  onSubmit: (values) => void;
  defaultValues: any;
}) {
  const [mapRef, setMapRef] = useState<google.maps.Map | undefined>();
  const [hideMap, setHideMap] = useState(false);
  const [currentLocation, setCurrentLocation] = useSessionStorage(
    "currentAddress",
    {}
  );

  const handleOnDragAndZoom = async (formikProps) => {
    //isLoadFromInput = whenever user trigger drag event from inputting address in textfield
    if (formikProps.values.isLoadFromInput) {
      formikProps.setFieldValue("isLoadFromInput", false);
    } else {
      if (!mapRef || !mapRef?.getCenter()) return;
      const { lat, lng } = mapRef?.getCenter();
      const latLng = { lng: lng(), lat: lat() };
      const place = await reverseGeocode(latLng);
      setCurrentLocation({ place: place, latLng: latLng });
      formikProps.setFieldValue("selectedLatLng", latLng);
      formikProps.setFieldValue("address", place?.formatted_address);
      placesAutocompleteProps.setValue(place?.formatted_address);
      formikProps.setFieldValue("selectedLatLng", latLng);
    }
  };

  const placesAutocompleteProps = usePlacesAutocomplete({
    cache: 24 * 60 * 60,
  });
  const reverseGeocode = async ({ lat, lng }) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_MAPS_API_KEY}&latlng=${lat},${lng}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results[0];
  };

  const getUserLocation = async (formikProps) => {
    const { setFieldValue } = formikProps;
    if (!Boolean(formikProps.values.selectedLatLng))
      navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          const { place } = currentLocation;
          if (
            Boolean(currentLocation) &&
            currentLocation?.latLng?.currentLocation?.latLng?.lat ===
              latitude &&
            currentLocation?.latLng?.currentLocation?.latLng?.lng === longitude
          ) {
            setFieldValue("selectedLatLng", currentLocation?.latLng);
            setFieldValue("address", place?.formatted_address);
            placesAutocompleteProps.setValue(place?.formatted_address);
            return;
          }
          const latLng = { lat: latitude, lng: longitude };
          const location = await reverseGeocode(latLng);
          setCurrentLocation({ place: location, latLng: latLng });
          formikProps.setFieldValue("selectedLatLng", latLng);
          formikProps.setFieldValue("address", location?.formatted_address);
          placesAutocompleteProps.setValue(location?.formatted_address);
        },
        () =>
          formikProps.setFieldValue("selectedLatLng", {
            lng: 103.8198,
            lat: 1.3521,
          })
      );
    return true;
  };

  function disableSubmitButton(formikProps: any) {
    return !(
      Boolean(formikProps?.values?.selectedStoreId) &&
      Boolean(formikProps?.values?.address) &&
      isLatLngValid(formikProps?.values?.selectedLatLng)
    );
  }
  const { t } = useTranslation('common');

  const isLatLngValid = (latLng: any) => {
    if (!latLng?.lat) return false;
    if (!latLng?.lng) return false;
    return true;
  };

  return (
    <Formik onSubmit={onSubmit} initialValues={defaultValues}>
      {(formikProps) => {
        useEffect(() => {
          getUserLocation(formikProps);
        }, []);

        useEffect(() => {
          // makes sure that the map copmponent will not run if lat and lng data are not present
          setHideMap(!isLatLngValid(formikProps?.values?.selectedLatLng));
        }, [formikProps]);

        return (
          <Form className="w-full ">
            <div className="aspect-[1/1] w-full mb-4">
              {hideMap && (
                <div className="flex flex-row items-center justify-center h-full w-full border border-gray-300 rounded">
                  {isLatLngValid(formikProps?.values?.selectedLatLng)
                    ? t("Please enable location services")
                    : t("Failed to identify location, please select one from below")}
                </div>
              )}
              {!hideMap && (
                <div className="relative h-full flex items-center mb-4">
                  <GoogleMap
                    mapContainerClassName="w-full absolute inset-0 rounded-md"
                    onZoomChanged={() => handleOnDragAndZoom(formikProps)}
                    onDragEnd={() => handleOnDragAndZoom(formikProps)}
                    center={formikProps?.values?.selectedLatLng}
                    onLoad={(map) => setMapRef(map)}
                    zoom={17}
                    options={{
                      disableDefaultUI: true,
                      gestureHandling: "greedy",
                    }}
                  />
                  <div className="absolute w-[5rem] text-center right-0 left-0 mx-auto mt-auto mb-[7%] flex flex-col items-center">
                    <FontAwesomeIcon
                      className="text-primary text-[2.2rem]"
                      icon={faLocationDot}
                    />
                    <div className="pt-[5px] border-b-2 border-primary w-[1.2rem]" />
                  </div>
                </div>
              )}
            </div>

            <PlacesAutocompleteInput
              getUserLocation={() => getUserLocation(formikProps)}
              setIsLoadFromInput={() => {}}
              {...placesAutocompleteProps}
              funcSplitAddress={(a) => a}
              formikProps={formikProps}
              resetForm={() => {}}
              section={""}
            />

            <DeliveryPopupInput
              touched={formikProps.touched.addressDetail}
              value={formikProps?.values?.addressDetail}
              placeholder={t("Floor unit number")}
              errors={formikProps.errors.addressDetail}
              onChange={formikProps?.handleChange}
              onBlur={formikProps?.handleBlur}
              label={t("Address Detail")}
              name="addressDetail"
              buttonIcon={<></>}
              section={""}
              type="text"
            />

            {children(formikProps)}
            <ContainedButton
              className="w-full mt-3 rounded shadow-none hover:shadow-none hover:brightness-90 mb-5"
              disabled={disableSubmitButton(formikProps)}
              type="submit"
            >
              {t("confirm")}
            </ContainedButton>
          </Form>
        );
      }}
    </Formik>
  );
}
