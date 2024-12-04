import React, { Fragment, useContext, useEffect, useState } from "react";
// components
import AddressBook from "@/components/addressBook/AddressBook";
import SEO from "@/components/seo/SEO";

//API
import { API, graphqlOperation } from "aws-amplify";
import { getCustomerFavouriteAddresses } from "@/graphql/queries";
import { deleteCustomerFavouriteAddress } from "@/graphql/mutations";

//
import { setToastState } from "@/states/toastBarState";

// utils
import { withProtected } from "@/utils/routeProtection";
import Cookies from "universal-cookie";
import { isLocalHost } from "@/utils/util";
// contexts
import { useAuth } from "@/contexts/AuthContext";
import MerchantContext from "@/contexts/MerchantContext";

const AddressBookScreen = () => {
  const merchantInfoContext = useContext(MerchantContext);

  const cookie = new Cookies();
  const [addressList, setAddressList] = useState([]);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [isApiFetching, setIsApiFetching] = useState(true);

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
        let tempAddress = [...addressList];
        let newAddressList = tempAddress.filter(
          (address) => address.customerFavouriteAddressId !== selectedId
        );
        localStorage.setItem("addressList", JSON.stringify(newAddressList));
        setAddressList(newAddressList);
        setToastState({
          show: true,
          severity: "success",
          message: "Address delete successfully",
        });
      }
    } catch (error) {
      console.log("error", error);
      setToastState({
        show: true,
        severity: "error",
        message: "Something went wrong. Please try again later.",
      });
    }
  };

  const getAddressList = async () => {
    setIsApiFetching(true);

    try {
      var params = {
        accessToken: cookie.get("signIn")?.accessToken,
        customerId: cookie.get("signIn")?.customerId,
      };
      if (isLocalHost()){
        params['merchantId'] = merchantInfoContext.merchantId
      }
      let res = await API.graphql(
        graphqlOperation(getCustomerFavouriteAddresses, params)
      );
      if (res && res.data.getCustomerFavouriteAddresses.message === "Success") {
        setAddressList(res.data.getCustomerFavouriteAddresses.addresses);
        localStorage.setItem(
          "addressList",
          JSON.stringify(res.data.getCustomerFavouriteAddresses.addresses)
        );
      }
      setIsTimeOut(false);
      setIsApiFetching(false);
    } catch (error) {
      setIsTimeOut(true);
      setIsApiFetching(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAddressList();
  }, []);

  return (
    <>
      <SEO title="Address Book" keywords="" description="Address Book" />
      <AddressBook
        isTimeOut={false}
        isApiFetching={isApiFetching}
        addressList={addressList}
        handleDeleteAddress={handleDeleteAddress}
        membershipTierActivated={merchantInfoContext.membershipTierActivated}
      />
    </>
  );
};

export default withProtected(AddressBookScreen);
