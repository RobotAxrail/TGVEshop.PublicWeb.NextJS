import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import useTranslation from 'next-translate/useTranslation';

// components
import SideBarProfile from "@/components/sideBarProfile/SideBarProfile";
import { ContainedButton } from "@/components/buttons/Buttons";
import {
  RectSelectInput,
  RectTextInput,
  Checkbox,
} from "@/components/inputs/Input";
import FormHelperText from "@/components/formHelperText/FormHelperText";
import AccountLayout from "@/components/layouts/AccountLayout";

// utils
import Cookies from "universal-cookie";
import _ from "lodash";
import {
  getStates,
  getCities,
  getPostcodes,
  findPostcode,
} from "@/utils/state_postcode.util";

// context
import MerchantContext from "@/contexts/MerchantContext";
import { Form, Formik, FormikValues } from "formik";
import { GoogleMap } from "@react-google-maps/api";
import { useOrder } from "@/contexts/OrderContext";
import { OrderModalStateActions } from "@/enums/enums";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { setToastState } from "@/states/toastBarState";
import { validateDeliveryDialog } from "@/validation/orderModeDialog/validateDeliveryDialog";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePlacesAutocomplete from "use-places-autocomplete";
import DeliveryPopupInput from "../orderModeDialog/DeliveryPopupInput";
import PlacesAutocompleteInput from "../orderModeDialog/PlacesAutocompleteInput";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import AccountSidebarLayout from "../layouts/AccountSidebarLayout";

const HelperText = (props: any) => {
  const { notify, name } = props;
  return (
    <>
      {notify.show && notify.item[name] ? (
        <FormHelperText className="text-[red]">
          {_.startCase(notify.item[name])}
        </FormHelperText>
      ) : null}
    </>
  );
};

const NewAddressBook = ({
  isAuthenticated,
  handleUpdateAddress,
  addressData,
  setAddressData,
  selectedAddress,
  mode,
}) => {
  const { t } = useTranslation('common');
  const cookie = new Cookies();
  const router = useRouter();
  const [currentLocation, setCurrentLocation] = useSessionStorage(
    "currentAddress",
    {}
  );
  const merchantInfoContext = useContext(MerchantContext);
  const [mapStatusMessage, setMapStatusMessage] = useState(
    "No address selected."
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
      componentRestrictions: { country: ["my", "sg"] },
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
            case "administrative_area_level_2":
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
      case mode === "Add":
        addressItem = initialAddressState;
        break;
      case isAuthenticated && mode !== "Add":
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
        } = selectedAddress;
        addressItem = {
          ...rest,
          isLoggedIn: isAuthenticated,
          selectedLatLng:
            selectedAddress.latitude && selectedAddress.longitude
              ? {
                lat: Number(selectedAddress.latitude),
                lng: Number(selectedAddress.longitude),
              }
              : center,
        };
        break;
      case !isAuthenticated && mode !== "Add":
        addressItem = deliveryAddress;
        break;
    }

    return {
      name: addressItem?.name ?? "",
      addressDetail: addressItem?.addressDetail ?? null,
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
    setMapStatusMessage(t("Retrieving your location..."));
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

      const handleChangeAddress = (address: any) => {
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

  // Save Address
  async function handleSaveAddress(formVal: any) {
    // store input
    let param = {
      name: formVal.name,
      address: formVal.address,
      addressDetail: formVal.addressDetail,
      city: formVal.city,
      country: formVal.country,
      customerId: cookie.get("signIn")?.customerId,
      postalCode: formVal.postalCode ? formVal.postalCode : formVal.postal,
      state: formVal.state,
      isDefaultShipping: addressData.isDefaultShipping,
      isDefaultBilling: addressData.isDefaultBilling,
      latitude: formVal.selectedLatLng.lat.toString(),
      longitude: formVal.selectedLatLng.lng.toString(),
      ...(mode === "Edit" && { customerFavouriteAddressId: "" }),
    };

    if (mode === "Edit") {
      param = {
        ...param,
        customerFavouriteAddressId: selectedAddress.customerFavouriteAddressId,
      };
    }
    return handleUpdateAddress(param).then((response: any) => {
      if (response) {
        if (!_.isEmpty(router.query) && router.query.return === "checkout") {
          router.push("/checkout");
        } else {
          router.push("/address-book");
        }
      }
    });
  }

  return (
    <div>
      <Formik
        initialTouched={
          {
            field: true,
          } as any
        }
        initialValues={getFormikInitialValues()}
        validationSchema={validateDeliveryDialog}
        onSubmit={(val: any, { setSubmitting }) => {
          if (
            !["country", "postalCode", "state"].some((field) => !val[field]) &&
            val.selectedLatLng.lat &&
            val.selectedLatLng.lng
          ) {
            handleSaveAddress(val);
          } else {
            setSubmitting(false);
            setToastState({
              show: true,
              severity: "error",
              message:
                t("Please select a valid address from the dropdown selection."),
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
                  label={t("Label") + "*"}
                  type="text"
                  name="name"
                  section={mode}
                  errors={formikProps.errors.name}
                  touched={formikProps.touched.name}
                  buttonIcon={undefined}
                />
              )}

              <PlacesAutocompleteInput
                resetForm={() => { }}
                setIsLoadFromInput={() => { }}
                funcSplitAddress={funcSplitAddress}
                section={mode}
                formikProps={formikProps}
                getUserLocation={getUserLocation}
                {...placesAutocompleteProps}
              />

              <DeliveryPopupInput
                label={t("Address Detail") + "*"}
                type="text"
                name="addressDetail"
                placeholder={t("eg. Floor, unit number, etc.")}
                section={mode}
                errors={formikProps.errors.addressDetail}
                touched={formikProps.touched.addressDetail}
                buttonIcon={undefined}
              />

              <div className="w-full flex-grow-0 p-2">
                <Checkbox
                  styled={{
                    checkboxContainer: "pl-0",
                    checkbox: "border-gray-500",
                  }}
                  checkedStyled={{
                    checkbox: "bg-primary border-primary",
                  }}
                  label={t("Set as default shipping address")}
                  checked={addressData.isDefaultShipping}
                  onChange={() =>
                    setAddressData({
                      ...addressData,
                      isDefaultShipping: !addressData.isDefaultShipping,
                    })
                  }
                />
              </div>
              <div className="w-full p-2">
                <Checkbox
                  styled={{
                    checkboxContainer: "pl-0",
                    checkbox: "border-gray-500",
                  }}
                  checkedStyled={{
                    checkbox: "bg-primary border-primary",
                  }}
                  label={t("Set as default billing address")}
                  checked={addressData.isDefaultBilling}
                  onChange={() =>
                    setAddressData({
                      ...addressData,
                      isDefaultBilling: !addressData.isDefaultBilling,
                    })
                  }
                />
              </div>
              <div className="text-center w-full inline-block xs:text-right xs-down:text-center p-2">
                <ContainedButton
                  border="rounded"
                  loading={formikProps.isSubmitting}
                  type="submit"
                >
                  {t("Save My Address")}
                </ContainedButton>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const AddressBookDetails = (props: any) => {
  const { type, selectedAddress, handleUpdateAddress } = props;
  const { isAuthenticated } = useAuth();
  const [addressData, setAddressData] = useState({
    address: "",
    name: "",
    isDefaultBilling: false,
    isDefaultShipping: false,
    city: "",
    country: "",
    postalCode: "",
    postal: "",
    state: "",
    selectedLatLng: {
      lat: "",
      lng: "",
    },
  });

  useEffect(() => {
    if (type === "Edit") {
      setAddressData(selectedAddress);
    }
  }, [selectedAddress, type]);
  
  const { t } = useTranslation('common');

  return (
    <AccountSidebarLayout isLoading={false}>
      <NewAddressBook
        isAuthenticated={isAuthenticated}
        handleUpdateAddress={handleUpdateAddress}
        addressData={addressData}
        setAddressData={setAddressData}
        selectedAddress={selectedAddress}
        mode={type}
      />
    </AccountSidebarLayout>
  );
};

export default AddressBookDetails;
