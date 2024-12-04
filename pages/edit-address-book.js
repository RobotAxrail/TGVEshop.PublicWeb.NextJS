import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState, useContext } from "react";

// components
import AddressBookDetails from "@/components/addressBook/AddressBookDetails";
import SEO from "@/components/seo/SEO";

// utils
import _ from "lodash";
import { withProtected } from "@/utils/routeProtection";
import Cookies from "universal-cookie";
import { setToastState } from "@/states/toastBarState";
import { Loader } from "@/components/loader/Loader";

// API
import { API, graphqlOperation } from "aws-amplify";
import { saveCustomerFavouriteAddress } from "@/graphql/mutations";

const AddressBookDetailScreen = () => {
  const cookie = new Cookies();
  const router = useRouter();
  const [type, setType] = useState("");
  const [selectedAddress, setSelectedAddress] = useState({
    address: "",
    name: "",
    isDefaultBilling: false,
    isDefaultShipping: false,
    city: "",
    country: "",
    postalCode: "",
    state: "",
  });

  const handleUpdateAddress = async (param) => {
    try {
      const res = await API.graphql(
        graphqlOperation(saveCustomerFavouriteAddress, param)
      );
      if (
        res.data.saveCustomerFavouriteAddress.status === "true" &&
        res.data.saveCustomerFavouriteAddress.message === "Success"
      ) {
        setToastState({
          show: true,
          severity: "success",
          message: "Address saved successfully",
        });
        return true;
      } else {
        setToastState({
          show: true,
          severity: "error",
          message: res.data.saveCustomerFavouriteAddress.message,
        });
        return false;
      }
    } catch (error) {
      setToastState({
        show: true,
        severity: "error",
        message: "Something went wrong. Please try again later.",
      });
      return false;
    }
  };

  const handleLoadScreen = () => {
    if ((type === "Edit" && selectedAddress?.address) || type === "Add") {
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (!_.isEmpty(router.query)) {
      setType("Edit");
      const selectedId = router.query.id;
      const addressList = JSON.parse(localStorage.getItem("addressList"));
      if (!_.isNull(addressList) && _.isArray(addressList)) {
        const findSelectedIdObj = addressList.find(
          (obj) => obj.customerFavouriteAddressId === selectedId
        );
        if (findSelectedIdObj !== undefined)
          setSelectedAddress(findSelectedIdObj);
      }
    } else {
      setType("Add");
    }
  }, [router.query]);

  return (
    <>
      <SEO
        title={(type === "Add" ? "Add" : "Edit") + " Address"}
        keywords=""
        description="Edit address"
      />
      {handleLoadScreen() ? (
        <AddressBookDetails
          type={type}
          selectedAddress={selectedAddress}
          handleUpdateAddress={handleUpdateAddress}
        />
      ) : (
        <Loader />
      )}
    </>
  );
};

export default withProtected(AddressBookDetailScreen);
