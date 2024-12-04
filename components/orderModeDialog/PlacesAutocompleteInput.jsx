import { useDebounce } from "@/hooks/useDebounce";
import { setToastState } from "@/states/toastBarState";
import {
  faCircleXmark,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getGeocode, getLatLng, getZipCode } from "use-places-autocomplete";
import DeliveryPopupInput from "./DeliveryPopupInput";
import useTranslation from "next-translate/useTranslation";

export const PlacesAutocompleteInput = ({
  funcSplitAddress,
  section,
  formikProps,
  resetForm,
  setIsLoadFromInput,
  getUserLocation,
  ...placesAutocompleteProps
}) => {
  const [focus, setFocus] = useState(false);
  const { t } = useTranslation("common");
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = placesAutocompleteProps;

  const [filteredData, setFilteredData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const debounceFilterData = useDebounce(data, 1000);

  useEffect(() => {
    if (formikProps.values.address) {
      setValue(formikProps.values.address);
    }
  }, [formikProps.values.address]);

  const handleSelect = async (address) => {
    formikProps.setFieldValue("isLoadFromInput", true);
    clearSuggestions();

    const results = await getGeocode({ address: address });
    const { lat, lng } = await getLatLng(results[0]);
    formikProps.setFieldValue("selectedLatLng", { lat, lng });
    formikProps.setFieldValue("address", results[0].formatted_address);
    funcSplitAddress(
      results[0].address_components,
      results[0].formatted_address,
      formikProps.setFieldValue
    );
  };

  const getLocationPostcode = async (description) => {
    const param = {
      address: description,
    };

    const results = await getGeocode(param);
    const postcode = getZipCode(results[0], false);
    if (postcode) {
      return true;
    } else {
      return false;
    }
  };

  const getPostcodeStatus = async () => {
    try {
      const responses = await Promise.all(
        data.map((e) => getLocationPostcode(e.description))
      );

      setFilteredData(data.filter((_, i) => responses[i]));
      setIsFetching(false);
    } catch (e) {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getPostcodeStatus();
  }, [debounceFilterData]);

  return (
    <div
      className="w-full relative"
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <DeliveryPopupInput
        label={t("Address")+"*"}
        type="text"
        value={value}
        leftButtonIcon={
          <FontAwesomeIcon
            icon={faLocationCrosshairs}
            size="xl"
            className="text-gray-400"
          />
        }
        leftButtonOnClick={() =>
          getUserLocation(formikProps).then((val) => {
            if (!val) {
              setToastState({
                show: true,
                severity: "error",
                message: t("Please allow location access."),
              });
            }
          })
        }
        rightButtonIcon={
          value ? (
            <FontAwesomeIcon
              icon={faCircleXmark}
              size="sm"
              className="text-gray-400"
            />
          ) : null
        }
        rightButtonOnClick={() => {
          setValue("");
          formikProps.resetForm({
            values: {
              ...formikProps.values,
              address: "",
              selectedLatLng: { lat: null, lng: null },
              country: "",
              postalCode: "",
              state: "",
              city: "",
            },
          });
        }}
        // disabled={!ready}
        onChange={(e) => {
          if (!isFetching) {
            setIsFetching(true);
          }
          setValue(e.target.value);
          formikProps.handleChange(e);
          formikProps.resetForm({
            values: {
              ...formikProps.values,
              address: e.target.value,
              selectedLatLng: { lat: null, lng: null },
              country: "",
              postalCode: "",
              state: "",
              city: "",
            },
          });
        }}
        placeholder={t("Type to search for an address")}
        name="address"
        section={section}
        errors={formikProps.errors.address}
        touched={formikProps.touched.address}
      />
      {isFetching ? (
        <div className="absolute top-[3rem] w-full h-auto bg-gray-100 z-10 p-4 rounded-sm">
          <div role="status" className="w-full animate-pulse">
            <div className="h-3 w-1/3 bg-gray-300 rounded-sm"></div>
            <div className="h-6 mt-[3px] bg-gray-300 w-full rounded-sm"></div>
          </div>
        </div>
      ) : (
        <div className="absolute top-[3rem] bg-gray-100 z-10 h-auto w-full text-left text-xs max-h-[20rem] overflow-y-scroll">
          {status === "OK" &&
            focus &&
            filteredData.map(
              ({ place_id, description, structured_formatting }) => (
                <div
                  className="py-3 px-5 cursor-pointer hover:bg-gray-200"
                  key={place_id}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    handleSelect(description, formikProps.setFieldValue);
                  }}
                  onFocus={() => setFocus(true)}
                >
                  <div className="text-[0.9rem] font-semibold">
                    {structured_formatting.main_text}
                  </div>
                  <div>{description}</div>
                </div>
              )
            )}
        </div>
      )}
    </div>
  );
};

export default PlacesAutocompleteInput;
