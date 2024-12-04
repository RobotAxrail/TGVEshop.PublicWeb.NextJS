// components
import {
  RectTextInput,
  RectSelectInput,
  CustomPhoneInput,
  RadioButton,
} from "@/components/inputs/Input";
import useTranslation from 'next-translate/useTranslation';

import OptionCard from "./OptionCard";
import _ from "lodash";
import { StoreTypes, OrderTypes } from "@/enums/enums";
import { useEffect } from "react";

const AddressInputs = (props) => {
  const {
    customerData,
    inputOnChange,
    state,
    type,
    setCustomerData,
    cityList,
    listOfCountries,
    displayStateAndCityInput,
  } = props;
  
  const { t } = useTranslation('common');

  return (
    <>
      <RectSelectInput
        data={listOfCountries}
        label={t("country") + "*"}
        type="country"
        value={
          type === "Shipping"
            ? customerData.deliveryCountry
            : customerData.billingCountry
        }
        onChange={(data) => {
          if (type === "Shipping")
            setCustomerData({
              ...customerData,
              deliveryCountry: data,
              deliveryState: "",
              deliveryCity: "",
            });
          else
            setCustomerData({
              ...customerData,
              billingCountry: data,
              billingState: "",
              billingCity: "",
            });
        }}
        className="mb-3 sm:mb-0"
        name={type === "Shipping" ? "deliveryCountry" : "billingCountry"}
      />
      <RectTextInput
        label={t("postcode") + "*"}
        type="number"
        value={
          type === "Shipping"
            ? customerData.deliveryPostalCode
            : customerData.billingPostalCode
        }
        onChange={(e) => inputOnChange(e, setCustomerData)}
        onWheel={(e) => e.target.blur()}
        onKeyDown={(evt) =>
          ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
        }
        className="mb-3 sm:mb-0"
        name={type === "Shipping" ? "deliveryPostalCode" : "billingPostalCode"}
      />
      <RectTextInput
        label={t("address") + "*"}
        type="text"
        value={
          type === "Shipping"
            ? customerData.deliveryAddress
            : customerData.billingAddress
        }
        onChange={(e) => inputOnChange(e, setCustomerData)}
        className="mb-3 sm:mb-0"
        name={type === "Shipping" ? "deliveryAddress" : "billingAddress"}
      />
      {displayStateAndCityInput && (
        <>
          <RectSelectInput
            data={state}
            label={t("state") + "*"}
            value={
              type === "Shipping"
                ? customerData.deliveryState !== ""
                  ? customerData.deliveryState
                  : t("Please select a state")
                : customerData.billingState !== ""
                ? customerData.billingState
                : t("Please select a state")
            }
            onChange={(data) => {
              if (type === "Shipping")
                setCustomerData({
                  ...customerData,
                  deliveryState: data,
                });
              else
                setCustomerData({
                  ...customerData,
                  billingState: data,
                });
            }}
            className="mb-3 sm:mb-0"
            name={type === "Shipping" ? "deliveryState" : "billingState"}
          />
          <RectSelectInput
            data={cityList(
              type === "Shipping"
                ? customerData.deliveryState
                : customerData.billingState
            )}
            disabled={
              type === "Shipping"
                ? customerData.deliveryState === ""
                : customerData.billingState === ""
            }
            label={t("city")}
            className="mb-3 sm:mb-0"
            value={
              type === "Shipping"
                ? customerData.deliveryCity !== ""
                  ? customerData.deliveryCity
                  : t("Please select a city")
                : customerData.billingCity !== ""
                ? customerData.billingCity
                : t("Please select a city")
            }
            onChange={(data) => {
              if (type === "Shipping") {
                setCustomerData({
                  ...customerData,
                  deliveryCity: data,
                });
              } else {
                setCustomerData({
                  ...customerData,
                  billingCity: data,
                });
              }
            }}
            name={type === "Shipping" ? "deliveryCity" : "billingCity"}
          />{" "}
        </>
      )}
    </>
  );
};

const ShippingInfo = (props) => {
  const {
    customerInfoInputs = true,
    title,
    isAuth,
    customerData,
    inputOnChange,
    addressList,
    addressSelection,
    type,
    handleAddressSelection = () => {},
    setCustomerData,
    state /* getStates() function from utils*/,
    cityList /* getCities() function from utils*/,
    listOfCountries /* listOfCountries from utils*/,
    orderType,
    storeType,
    setCurrCountry,
  } = props;

  const { t } = useTranslation('common');

  useEffect(() => {
    if (customerData.customerMobileNo !== null) {
      if (
        /^(\+?6?01)[0|1|2|3|4|6|7|8|9]-*[0-9]{7,8}$/.test(
          customerData.customerMobileNo
        )
      )
        setCurrCountry("my");
      else if (
        /^(\+?65?[8|9])[0|1|2|3|4|6|7|8|9]\d{6}$/.test(
          customerData.customerMobileNo
        )
      )
        setCurrCountry("sg");
    }
  }, []);

  return (
    <>
      {title && <h4 className="m-0 mb-5">{title}</h4>}
      <div className="leading-normal">
        {/* Delivery Address */}
        <div className="w-full">
          {isAuth && orderType === OrderTypes.DELIVERY && (
            <div className={["md:grid md:grid-cols-2 md:gap-3 mb-5"].join(" ")}>
              {addressList.map((item, idx) => {
                return (
                  <OptionCard
                    cardClassName="mb-3 sm:mb-0"
                    handleOnClickAction={() => {
                      handleAddressSelection(item, type);
                    }}
                    addressSelection={addressSelection}
                    key={idx}
                    idx={idx}
                    radioButtonActivate={true}
                    radioButtonContent={
                      <RadioButton
                        checked={
                          addressSelection === item.customerFavouriteAddressId
                        }
                        value={item.customerFavouriteAddressId}
                        type="radio"
                        label="modifierRadio"
                      />
                    }
                    spanContent={
                      <>
                        <span className="text-[1rem] font-semibold">
                          {item.name}
                        </span>

                        <div>
                          {item.addressDetail
                            ? item.addressDetail + ", " + item.address
                            : item.address}
                        </div>
                        {storeType === StoreTypes.AC_STORETYPE && (
                          <>
                            <div>{item.postalCode + " " + item.city}</div>
                            <div>{item.state}</div>
                            <div>{item.country}</div>
                          </>
                        )}
                      </>
                    }
                  />
                );
              })}
              <OptionCard
                handleOnClickAction={() =>
                  handleAddressSelection("addNewAddress")
                }
                addressSelection={addressSelection}
                spanContent={
                  <span className="text-center text-[0.9rem]">
                    {t("Add a new delivery address")}
                  </span>
                }
                cardClassName={"h-[122px]"}
                radioButtonActivate={false}
              />
            </div>
          )}
          {/* customer name */}
          <div className="flex flex-col md:grid md:grid-cols-2 md:gap-3 mt-5 mb-5">
            {customerInfoInputs && (
              <>
                <div className="w-full mb-3 sm:mb-0">
                  <RectTextInput
                    label={t("firstName") + "*"}
                    type="firstName"
                    value={customerData.customerFirstName}
                    onChange={(e) => inputOnChange(e, setCustomerData)}
                    className=""
                    name="customerFirstName"
                  />
                </div>
                <div className="w-full mb-3 sm:mb-0">
                  <RectTextInput
                    label={t("lastName") + "*"}
                    type="lastName"
                    value={customerData.customerLastName}
                    onChange={(e) => inputOnChange(e, setCustomerData)}
                    className=""
                    name="customerLastName"
                  />
                </div>
              </>
            )}
            {type === "Billing" && (
              <AddressInputs
                customerData={customerData}
                setCustomerData={setCustomerData}
                inputOnChange={(e) => inputOnChange(e, setCustomerData)}
                state={state}
                type={type}
                cityList={cityList}
                listOfCountries={listOfCountries}
                displayStateAndCityInput={
                  customerData.billingCountry === "Malaysia"
                }
              />
            )}
            {/*  Contact Information */}
            {customerInfoInputs && (
              <>
                <div className="w-full mb-3 sm:mb-0">
                  <div className="rounded-[5px] border border-solid">
                    <CustomPhoneInput
                      value={customerData.customerMobileNo}
                      onChange={(data, e) => {
                        setCurrCountry(e.countryCode);
                        setCustomerData({
                          ...customerData,
                          customerMobileNo: "+" + data,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="w-full mb-3 sm:mb-0">
                  <RectTextInput
                    label={t("Email Address") + "*"}
                    type="email"
                    value={customerData.customerPrimaryEmail}
                    onChange={(e) => inputOnChange(e, setCustomerData)}
                    className="input-main-theme"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"
                    name="customerPrimaryEmail"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ShippingInfo;
