import { useState, useContext, useEffect } from "react";
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
import AccountSidebarLayout from "@/components/layouts/AccountSidebarLayout";

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

const HelperText = (props) => {
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

function AddressBookDetails(props) {
  const merchantInfoContext = useContext(MerchantContext);
  const { t } = useTranslation('common');
  const { type, selectedAddress, handleUpdateAddress } = props;
  const listOfStates = getStates();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [pressedSavedOnce, setPressedSavedOnce] = useState(false);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [addressData, setAddressData] = useState({
    address: "",
    name: "",
    isDefaultBilling: false,
    isDefaultShipping: false,
    city: "",
    country: "",
    postalCode: "",
    state: "",
  });
  const [navigateTo, setNavigateTo] = useState("");
  const [notify, setNotify] = useState({
    show: false,
    item: {},
  });
  const cookie = new Cookies();

  const handleInputChange = (e) => {
    if (e.target.value === " ") {
      setAddressData({
        ...addressData,
        [e.target.name]: "",
      });
    } else {
      if (e.target.name === "postalCode") {
        if (e.target.value.length <= 5 && e.target.value.length > 0) {
          setAddressData({
            ...addressData,
            [e.target.name]: e.target.value,
          });
        }
        if (e.target.value.length === 0) {
          setAddressData({
            ...addressData,
            [e.target.name]: e.target.value,
            state: "",
            city: "",
          });
        }
      } else {
        setAddressData({
          ...addressData,
          [e.target.name]: e.target.value,
        });
      }
    }
  };

  useEffect(() => {
    if (type === "edit") {
      setAddressData(selectedAddress);
    }
  }, [selectedAddress, type]);

  // Save Address
  async function handleSaveAddress() {
    if (!pressedSavedOnce) {
      setPressedSavedOnce(true);
    }
    setIsLoading(true);
    // check input
    const empty = Object.values(addressData).find((v) => v === "");
    if (empty !== undefined && !empty) {
      var obj = {};
      for (var [key, value] of Object.entries(addressData)) {
        if (value === "") {
          obj[key] = key + " is required";
          if (key === "name") {
            obj[key] = t("label is required");
          } else if (key === "postalCode") {
            obj[key] = t("postal code is required");
          }
        }
      }
      if (cityNotFound) {
        setNotify({
          show: true,
          item: { ...obj, postalCode:  t("No matching cities found") },
        });
      } else {
        setNotify({ show: true, item: obj });
      }

      setIsLoading(false);
      return;
    }
    // store input
    let param = {
      name: addressData.name,
      address: addressData.address,
      city: addressData.city,
      country: addressData.country,
      customerId: cookie.get("signIn")?.customerId,
      postalCode: addressData.postalCode
        ? addressData.postalCode
        : addressData.postal,
      state: addressData.state,
      isDefaultShipping: addressData.isDefaultShipping,
      isDefaultBilling: addressData.isDefaultBilling,
    };

    if (type === "edit") {
      param = {
        ...param,
        customerFavouriteAddressId: addressData.customerFavouriteAddressId,
      };
    }
    return handleUpdateAddress(param).then((response) => {
      setIsLoading(false);
      if (response) {
        if (!_.isEmpty(router.query) && router.query.return === "checkout") {
          router.push("/checkout");
        } else {
          router.push("/address-book");
        }
      }
    });
  }

  useEffect(() => {
    if (addressData.postalCode.length === 5) {
      handleCheckState();
    }
  }, [addressData.postalCode, addressData.city]);

  const handleCheckState = () => {
    const result = findPostcode(addressData.postalCode);
    if (result.found) {
      setAddressData({
        ...addressData,
        state: result.state,
        city: result.city,
      });
      setCityNotFound(false);
      if (pressedSavedOnce) {
        const empty = Object.values(addressData).find((v) => v === "");
        if (empty !== undefined && !empty) {
          var obj = {};
          for (var [key, value] of Object.entries(addressData)) {
            if (value === "") {
              obj[key] = key + + " " + t("is required");
              if (key === "name") {
                obj[key] = t("label is required");
              } else if (key === "postalCode") {
                obj[key] = t("postal code is required");
              }
            }
          }
          setNotify({ show: true, item: obj });
        }
      } else {
        setNotify({
          show: false,
          item: {},
        });
      }
    } else {
      setAddressData({
        ...addressData,
        state: "",
        city: "",
      });
      setCityNotFound(true);
      setNotify({
        show: true,
        item: { ...notify.item, postalCode:  t("No matching cities found") },
      });
    }
  };

  return (
    <AccountSidebarLayout isLoading={isApiFetching}>
      <>
        <h3 className="title">{t("Address Detail")}</h3>

        <div className="flex flex-wrap w-full">
          <div className="lg:w-1/2 w-full flex-grow-0 p-2">
            <RectTextInput
              label={t("Label")+"*"}
              type="text"
              value={addressData.name}
              onChange={handleInputChange}
              className={"input-main-theme"}
              name="name"
            />
            <HelperText notify={notify} name="name" />
          </div>
          <div className="lg:w-1/2 w-full p-2">
            <RectTextInput
              label={t("Address")+"*"}
              type="text"
              value={addressData.address}
              onChange={handleInputChange}
              className={"input-main-theme"}
              name="address"
            />
            <HelperText notify={notify} name="address" />
          </div>
          <div className="lg:w-1/2 w-full p-2">
            <RectTextInput
              label={t("postalCode")+"*"}
              type="number"
              value={addressData.postalCode}
              onChange={handleInputChange}
              onBlur={handleCheckState}
              className={"input-main-theme"}
              onWheel={(e) => e.target.blur()}
              onKeyDown={(evt) =>
                ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
              }
              name="postalCode"
            />
            <HelperText notify={notify} name="postalCode" />
          </div>
          <div className="lg:w-1/2 w-full p-2">
            <RectSelectInput
              data={listOfStates}
              label="State"
              value={
                addressData.state === "" ? t("Select State") : addressData.state
              }
              onChange={(value) =>
                setAddressData({ ...addressData, state: value, city: "" })
              }
              name="state"
              className={"input-main-theme"}
            />
            <HelperText notify={notify} name="state" />
          </div>
          <div className="lg:w-1/2 w-full p-2">
            <RectSelectInput
              data={getCities(addressData.state)}
              label="City"
              disabled={true}
              value={addressData.city === "" ? t("Select City") : addressData.city}
              onChange={(value) =>
                setAddressData({
                  ...addressData,
                  city: value,
                  postalCode: "",
                })
              }
              className={"input-main-theme"}
              name="city"
            />
            <HelperText notify={notify} name="city" />
          </div>
          <div className="lg:w-1/2 w-full p-2">
            <RectTextInput
              label={t("country")+"*"}
              type="text"
              value={addressData.country}
              onChange={handleInputChange}
              className={"input-main-theme"}
              name="country"
            />
            <HelperText notify={notify} name="country" />
          </div>
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
        </div>

        <div className="text-center w-full inline-block xs:text-right xs-down:text-center p-2">
          <ContainedButton
            // className="h-[50px]"
            border="rounded"
            loading={isLoading}
            onClick={() => handleSaveAddress()}
          >
            {t("Save My Address")}
          </ContainedButton>
        </div>
      </>
    </AccountSidebarLayout>
  );
}

export default AddressBookDetails;
