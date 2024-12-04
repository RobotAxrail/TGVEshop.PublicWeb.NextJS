import React, { useState, useEffect, useContext } from "react";
import AddDelivery from "@/components/orderModeDialog/AddDelivery";
import useTranslation from "next-translate/useTranslation";

// icon
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LoadingIcon } from "@/components/icons/Icons";

//API
import { API, graphqlOperation } from "aws-amplify";
import {
  deleteCustomerFavouriteAddress,
  saveCustomerFavouriteAddress,
} from "@/graphql/mutations";

// utils
import Cookies from "universal-cookie";
import { OrderTypes } from "@/enums/enums";

// contexts
import MerchantContext from "@/contexts/MerchantContext";

import { setToastState } from "@/states/toastBarState";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useOrder } from "@/contexts/OrderContext";
import { ContainedButton } from "../buttons/Buttons";

const DeliveryDialog = ({
  isAddressLoading,
  favAddressList,
  setFavAddressList,
  orderType,
  section,
  handleChangeSection,
  orderModalState,
  dispatchOrderModalState,
  getDeliveryAddressList,
  isAuthenticated,
  googleMapsIsLoaded,
}) => {
  // const [addressDetailToEdit, setAddressDetailToEdit] = useState(null);
  const { setDeliveryAddress } = useOrder();
  const { t } = useTranslation("common");

  const toAdd = () => handleChangeSection("Add");

  const toEdit = (addressDetailToEdit) =>
    handleChangeSection("Edit", addressDetailToEdit);

  // Delete

  const merchantInfoContext = useContext(MerchantContext);

  const cookie = new Cookies();
  // const [addressList, setAddressList] = useState([]);

  const { addressDetailToEdit } = orderModalState;

  const handleDeleteAddress = async (selectedId) => {
    try {
      const localStorageAddressList = JSON.parse(
        localStorage.getItem("addressList")
      );
      const res = await API.graphql(
        graphqlOperation(deleteCustomerFavouriteAddress, {
          customerFavouriteAddressId: selectedId,
        })
      );
      if (res.data.deleteCustomerFavouriteAddress.message === "Success") {
        let tempAddress = [...favAddressList];
        let newAddressList = tempAddress.filter(
          (address) => address.customerFavouriteAddressId !== selectedId
        );
        localStorage.setItem("addressList", JSON.stringify(newAddressList));
        setFavAddressList(newAddressList);
        setToastState({
          show: true,
          severity: "success",
          message: t("Address delete successfully"),
        });
      }
    } catch (error) {
      setToastState({
        show: true,
        severity: "error",
        message: t("Something went wrong. Please try again later."),
      });
    }
  };

  const handleOnSubmitAddressForm = async (
    formOutput,
    setSubmitting = () => {},
    isDefaultShipping = false,
    customerFavouriteAddressId = ""
  ) => {
    if (isAuthenticated) {
      let postData = {
        address: formOutput.address,
        addressDetail: formOutput.addressDetail,
        city: formOutput.city,
        country: formOutput.country,
        customerId: cookie.get("signIn")?.customerId,
        isDefaultBilling:
          section === "Edit" ? addressDetailToEdit.isDefaultBilling : false,
        isDefaultShipping:
          section === "Edit"
            ? addressDetailToEdit.isDefaultShipping
            : favAddressList.length === 0
            ? true
            : isDefaultShipping,
        name: formOutput.name,
        postalCode: formOutput.postalCode,
        state: formOutput.state,
        latitude: formOutput.selectedLatLng.lat.toString(),
        longitude: formOutput.selectedLatLng.lng.toString(),
      };
      if (section === "Edit" || (isAuthenticated && section === null)) {
        postData = {
          ...postData,
          customerFavouriteAddressId: customerFavouriteAddressId
            ? customerFavouriteAddressId
            : addressDetailToEdit.customerFavouriteAddressId,
        };
      }
      const res = await API.graphql(
        graphqlOperation(saveCustomerFavouriteAddress, postData)
      );

      if (res.data.saveCustomerFavouriteAddress.status === "true") {
        setToastState({
          show: true,
          severity: "success",
          message: t("Successfully saved the address."),
        });
      } else {
        setToastState({
          show: true,
          severity: "error",
          message: t("An error occurred when saving address, please try again."),
        });
      }
      getDeliveryAddressList();
    }
    setDeliveryAddress({
      customerFavouriteAddressId:
        section === "Edit" && isAuthenticated
          ? addressDetailToEdit.customerFavouriteAddressId
          : "",
      selectedLatLng: formOutput.selectedLatLng,
      address: formOutput.address,
      addressDetail: formOutput.addressDetail,
      city: formOutput.city,
      country: formOutput.country,
      postalCode: formOutput.postalCode,
      state: formOutput.state,
    });
    setSubmitting(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      getDeliveryAddressList();
    }
  }, [isAuthenticated]);

  return (
    <>
      {section !== "Add" && section !== "Edit" ? (
        <>
          {cookie.get("signIn") && (
            <>
              <div className="mt-6 mb-1">
                <ContainedButton
                  className="w-full mb-2 rounded-md"
                  onClick={toAdd}
                >
                  {t("Add New Address")}
                </ContainedButton>
              </div>
              {!isAddressLoading ? (
                <div
                  className={
                    "flex flex-col sm:h-[40vh] justify-start no-scrollbar overflow-y-scroll sm:overflow-hidden sm:hover:overflow-y-scroll sm:hover:pr-2 flex-grow"
                  }
                >
                  {favAddressList.map((addr, idx) => (
                    <div
                      key={idx}
                      className={`flex text-left mt-3 rounded-md border-[2px] p-3 ${
                        addr.isDefaultShipping ? "border-primary" : ""
                      }`}
                    >
                      <div className="flex-[6]">
                        <p className="font-semibold text-left my-0">
                          {addr.name}
                        </p>
                        <div
                          className={[
                            "flex text-[12px] text-left text-primary text-xs",
                            // styles["modal-selection-address"],
                          ].join(" ")}
                        >
                          <div className="text-[12px] text-left text-primary text-xs mb-2 mt-1 line-clamp-1 overflow-hidden text-ellipsis">
                            <span>
                              {addr.address}
                              {", "}
                            </span>
                            <span>
                              {addr.postalCode + " " + addr.city}
                              {", "}
                            </span>
                            <span>
                              {addr.state}
                              {", "}
                            </span>
                            <span>{addr.country}</span>
                          </div>
                        </div>
                        {/* <p className="-mt-1 text-[12px]">
                        Meet in front of house
                      </p> */}
                        <div className="mt-3 flex gap-5">
                          <div
                            onClick={() => toEdit(addr)}
                            className="text-[12px] flex items-center gap-1 cursor-pointer"
                          >
                            <MdOutlineModeEditOutline className="text-[15px] text-primary" />
                            <p className="my-0 text-primary">{t("Edit")}</p>
                          </div>

                          <div
                            className="text-[12px] flex items-center gap-1 cursor-pointer"
                            onClick={() =>
                              handleDeleteAddress(
                                addr.customerFavouriteAddressId
                              )
                            }
                          >
                            <RiDeleteBin6Line className="text-[15px] text-red-700" />
                            <p className="my-0 text-red-700">{t("Delete")}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-[1] justify-center items-center">
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            const updatedFavouriteAddress = {
                              ...addr,
                              selectedLatLng: {
                                lat: addr.latitude,
                                lng: addr.longitude,
                              },
                            };
                            handleOnSubmitAddressForm(
                              updatedFavouriteAddress,
                              () => {},
                              true,
                              addr.customerFavouriteAddressId
                            );
                          }}
                        >
                          {addr.isDefaultShipping ? (
                            <CheckCircleIcon className="text-primary w-[1.8rem] h-[1.8rem]" />
                          ) : (
                            <div className="rounded-full border-2 border-gray-200 w-6 h-6 flex justify-center items-center"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-5 flex justify-center">
                  <LoadingIcon className="mx-auto" />
                </div>
              )}
            </>
          )}
          {!cookie.get("signIn") &&
            orderType === OrderTypes.DELIVERY &&
            googleMapsIsLoaded && (
              <div className="mt-5 flex-grow relative">
                <AddDelivery
                  dispatchOrderModalState={dispatchOrderModalState}
                  orderModalState={orderModalState}
                  section={section}
                  handleChangeSection={handleChangeSection}
                  addressDetailToEdit={addressDetailToEdit}
                  getDeliveryAddressList={getDeliveryAddressList}
                  isAuthenticated={isAuthenticated}
                  handleOnSubmitAddressForm={handleOnSubmitAddressForm}
                />
              </div>
            )}
        </>
      ) : (
        (section === "Edit" || section === "Add") &&
        googleMapsIsLoaded && (
          <div className="relative p-5 flex-grow">
            <AddDelivery
              dispatchOrderModalState={dispatchOrderModalState}
              orderModalState={orderModalState}
              section={section}
              handleChangeSection={handleChangeSection}
              addressDetailToEdit={addressDetailToEdit}
              getDeliveryAddressList={getDeliveryAddressList}
              isAuthenticated={isAuthenticated}
              handleOnSubmitAddressForm={handleOnSubmitAddressForm}
            />
          </div>
        )
      )}
    </>
  );
};

export default DeliveryDialog;
