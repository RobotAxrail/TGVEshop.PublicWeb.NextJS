import React, { useContext, useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";

import { ContainedButton } from "@/components/buttons/Buttons";

import { GoogleMap } from "@react-google-maps/api";

import { validateDeliveryDialog } from "@/validation/orderModeDialog/validateDeliveryDialog";

import usePlacesAutocomplete from "use-places-autocomplete";

import { Formik, Form } from "formik";

// utils
import _ from "lodash";
import Cookies from "universal-cookie";
import { setToastState } from "@/states/toastBarState";
import { useOrder } from "@/contexts/OrderContext";

// context
import MerchantContext from "@/contexts/MerchantContext";
import DeliveryPopupInput from "./DeliveryPopupInput";
import PlacesAutocompleteInput from "./PlacesAutocompleteInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { OrderModalStateActions } from "@/enums/enums";
import { useSessionStorage } from "@/hooks/useSessionStorage";

const AddDelivery = ({
  orderModalState,
  dispatchOrderModalState,
  section,
  handleChangeSection,
  addressDetailToEdit = null,
  getDeliveryAddressList,
  isAuthenticated,
  handleOnSubmitAddressForm,
}) => {
  const cookie = new Cookies();
  const [currentLocation, setCurrentLocation] = useSessionStorage(
    "currentAddress",
    {}
  );
  const { t } = useTranslation("common");
  const merchantInfoContext = useContext(MerchantContext);
  const [mapStatusMessage, setMapStatusMessage] = useState(
    t("No address selected")
  );
  const { deliveryAddress } = useOrder();
  const initialAddressState = {
    name: "",
    address: "",
    addressDetail: null,
    isLoggedIn: false,
    selectedLatLng: { lat: null, lng: null },
    country: "",
    postalCode: "",
    state: "",
    city: "",
  };

  const placesAutocompleteProps = usePlacesAutocomplete({
    // Provide the cache time in seconds, default is 24 hours
    cache: 24 * 60 * 60,
    requestOptions: {
      componentRestrictions: { country: ["my","sg"] },
    },
  });

  const funcSplitAddress = (
    addressComponent,
    formattedAddress,
    setFieldValue
  ) => {
    addressComponent.forEach((addressData) => {
      if (addressData.types && addressData.types.length > 0) {
        addressData.types.forEach((type) => {
          switch (type) {
            case "country":
              setFieldValue("country", addressData.long_name);
              break;
            case "postal_code":
              setFieldValue("postalCode", addressData.long_name);
              break;
            case "administrative_area_level_1":
              setFieldValue("state", addressData.long_name);
              break;
            // case "administrative_area_level_2":
            case "neighborhood":
              setFieldValue("state", addressData.long_name);
              break;
            case "locality":
              setFieldValue("city", addressData.long_name);
              break;
            default:
          }
        });
      }
    });
    if (formattedAddress) {
      setFieldValue("address", formattedAddress);
    }
  };

  const center = { lat: null, lng: null };

  const getFormikInitialValues = () => {
    let addressItem = null;

    switch (true) {
      case section === "Add":
        addressItem = initialAddressState;
        break;
      case isAuthenticated && section !== "Add":
        const {
          createdAt,
          customerFavouriteAddressId,
          customerId,
          isDefaultBilling,
          isDefaultShipping,
          latitude,
          longitude,
          merchantId,
          updatedAt,
          ...rest
        } = addressDetailToEdit;
        addressItem = {
          ...rest,
          isLoggedIn: isAuthenticated,
          selectedLatLng:
            addressDetailToEdit.latitude && addressDetailToEdit.longitude
              ? {
                  lat: Number(addressDetailToEdit.latitude),
                  lng: Number(addressDetailToEdit.longitude),
                }
              : center,
        };
        break;
      case !isAuthenticated && section !== "Add":
        addressItem = deliveryAddress;
        break;
      default:
    }

    return {
      name: addressItem?.name ?? "",
      addressDetail: addressItem.addressDetail ?? null,
      address: addressItem?.address ?? "",
      isLoggedIn: isAuthenticated,
      selectedLatLng: _.isEmpty(addressItem?.selectedLatLng)
        ? center
        : addressItem?.selectedLatLng,
      country: addressItem?.country ?? "",
      postalCode: addressItem?.postalCode ?? "",
      state: addressItem?.state ?? "",
      city: addressItem?.city ?? "",
      isLoadFromInput: false,
    };
  };

  // let refMap = null;
  const [refMap, setRefMap] = useState(null);

  const getMapCenterLatLngAndAddress = async (
    handleChangeInput,
    handleChangeLatLng,
    formikProps
  ) => {
    if (refMap) {
      const mapCenter = refMap.getCenter();
      const latLng = {
        lat: mapCenter.lat(),
        lng: mapCenter.lng(),
      };
      const place = await reverseGeocode(latLng);
      handleChangeInput(place.formatted_address);
      handleChangeLatLng(latLng);
      funcSplitAddress(
        place.address_components,
        place.formatted_address,
        formikProps.setFieldValue
      );
    }
  };
  const reverseGeocode = async ({ lat, lng }) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_MAPS_API_KEY}&latlng=${lat},${lng}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results[0];
  };

  const getUserLocation = async (formikProps) => {
    setMapStatusMessage(t("Retrieving your location"));
    if (!navigator.geolocation) {
      setMapStatusMessage(t("No address selected."));
      return false;
    } else {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          if (
            !_.isEmpty(currentLocation) &&
            currentLocation.latLng.lat === latLng.lat &&
            currentLocation.latLng.lng === latLng.lng
          ) {
            formikProps.setFieldValue("selectedLatLng", currentLocation.latLng);
            formikProps.setFieldValue(
              "address",
              currentLocation.place.formatted_address
            );
            placesAutocompleteProps.setValue(
              currentLocation.place.formatted_address
            );
            return;
          }
          const place = await reverseGeocode(latLng);
          setCurrentLocation({ place: place, latLng: latLng });
          formikProps.setFieldValue("selectedLatLng", latLng);
          formikProps.setFieldValue("address", place.formatted_address);
          placesAutocompleteProps.setValue(place.formatted_address);
          setMapStatusMessage(t("No address selected."));
        },
        () => {
          setMapStatusMessage(t("No address selected."));
        }
      );
      return true;
    }
  };

  const handleOnDragAndZoom = async (formikProps) => {
    //isLoadFromInput = whenever user trigger drag event from inputting address in textfield
    if (formikProps.values.isLoadFromInput) {
      formikProps.setFieldValue("isLoadFromInput", false);
    } else {
      const handleChangeLatLng = ({ lat, lng }) => {
        formikProps.setFieldValue("selectedLatLng", { lat, lng });
      };

      const handleChangeAddress = (address) => {
        formikProps.setFieldValue("address", address);
        placesAutocompleteProps.setValue(address);
      };

      getMapCenterLatLngAndAddress(
        handleChangeAddress,
        handleChangeLatLng,
        formikProps
      );
    }
  };

  return (
    <div
      className={[
        "flex flex-col items-start absolute inset-0",
        section !== null ? "mt-2 " : "mt-0",
      ].join(" ")}
    >
      <Formik
        initialTouched={{
          field: true,
        }}
        initialValues={getFormikInitialValues()}
        validationSchema={validateDeliveryDialog}
        validateOnMount={orderModalState.validateOnOpen}
        onSubmit={(val, { setSubmitting }) => {
          if (
            !["country", "postalCode", "state"].some((field) => !val[field]) &&
            val.selectedLatLng.lat &&
            val.selectedLatLng.lng
          ) {
            handleOnSubmitAddressForm(val, setSubmitting);
            if (
              (!isAuthenticated && section === null) ||
              orderModalState.closeAfterSubmitting
            ) {
              dispatchOrderModalState({
                type: OrderModalStateActions.CLOSE,
              });
            } else {
              handleChangeSection("Home");
            }
          } else {
            setSubmitting(false);
            setToastState({
              show: true,
              severity: "error",
              message: t(
                "Please select a valid address from the dropdown selection."
              ),
            });
          }
        }}
      >
        {(formikProps) => {
          useEffect(() => {
            if (!formikProps.initialValues.address) {
              getUserLocation(formikProps);
            }
          }, []);
          return (
            <div
              className="flex flex-col items-start w-full flex-grow relative pb-[40px] overflow-y-auto px-1"
            >
              <Form className="flex flex-col items-start w-full flex-grow relative">
                <div
                  className={[
                    "flex flex-col items-center justify-center w-full rounded-lg sm:h-[45vh] relative bg-[#E5E3DF] overflow-hidden flex-grow mb-5",
                  ].join(" ")}
                >
                  {formikProps.values.selectedLatLng.lat &&
                  formikProps.values.selectedLatLng.lng ? (
                    <div className="absolute inset-0">
                      <div className="relative h-full flex items-center">
                        <GoogleMap
                          zoom={17}
                          onLoad={(map) => setRefMap(map)}
                          mapContainerClassName="w-full absolute inset-0"
                          center={formikProps.values.selectedLatLng}
                          options={{
                            disableDefaultUI: true,
                            gestureHandling: "greedy",
                          }}
                          onDragEnd={() => handleOnDragAndZoom(formikProps)}
                          onZoomChanged={() => handleOnDragAndZoom(formikProps)}
                        >
                          {/* <Marker position={formikProps.values.selectedLatLng} /> */}
                        </GoogleMap>
                        <div className="absolute w-[5rem] text-center right-0 left-0 mx-auto mt-auto mb-[7%] flex flex-col items-center">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="text-primary text-[2.2rem]"
                          />
                          <div className="pt-[5px] border-b-2 border-primary w-[1.2rem]"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute w-[12rem] text-gray-600 text-center right-0 left-0 mx-auto mt-auto mb-[5%]">
                      {mapStatusMessage}
                    </div>
                  )}
                </div>

                {isAuthenticated && (
                  <DeliveryPopupInput
                    label={t("Label *")}
                    type="text"
                    name="name"
                    section={section}
                    errors={formikProps.errors.name}
                    touched={formikProps.touched.name}
                  />
                )}
                <PlacesAutocompleteInput
                  funcSplitAddress={funcSplitAddress}
                  section={section}
                  formikProps={formikProps}
                  getUserLocation={getUserLocation}
                  {...placesAutocompleteProps}
                />

                <DeliveryPopupInput
                  label={t("Address Detail") + "*"}
                  type="text"
                  name="addressDetail"
                  placeholder={t("Floor unit number")}
                  section={section}
                  errors={formikProps.errors.addressDetail}
                  touched={formikProps.touched.addressDetail}
                />

                <div
                  className="fixed bottom-0 left-0 w-full p-3 bg-white"
                  style={{
                    boxShadow: "0px -4px 6px -1px rgba(0,0,0,0.1)",
                    zIndex: 999,
                  }}
                >
                  <ContainedButton
                    className="w-full rounded-[0.4rem]"
                    type="submit"
                    loading={
                      !formikProps.isValidating && formikProps.isSubmitting
                    }
                  >
                    {t("confirm")}
                  </ContainedButton>
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddDelivery;
