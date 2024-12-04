import React, { useEffect, useState, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

// Components
import Profile from "@/components/profile/Profile";
import SEO from "@/components/seo/SEO";

//API
import { API, graphqlOperation } from "aws-amplify";
import { getCustomer } from "@/graphql/queries";
import { updateCustomer, resetPassword } from "@/graphql/mutations";

// utils
import Cookies from "universal-cookie";
import { withProtected } from "@/utils/routeProtection";
// context
import MerchantContext from "@/contexts/MerchantContext";
import { useAuth } from "@/contexts/AuthContext";

import { setToastState } from "@/states/toastBarState";

const MyProfileScreen = () => {
  const merchantInfoContext = useContext(MerchantContext);

  const router = useRouter();
  const { setUser } = useAuth();
  const [isApiFetching, setIsApiFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChangePasswordLoading, setIsChangePasswordLoading] = useState(false);

  const [customerData, setCustomerData] = useState({});
  const [passwordData, setPasswordData] = useState({
    password: "",
    newPassword: "",
    retypeNewPassword: "",
  });
  const { t } = useTranslation("common");

  const handleUpdateProfile = async () => {
    const cookie = new Cookies();
    setIsLoading(true);
    try {
      var params = {
        merchantId: merchantInfoContext.merchantId,
        customerId: cookie.get("signIn")?.customerId,
      };
      params = {
        ...params,
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        mobileNo:
          customerData.mobileNo[0] !== "+"
            ? "+" + customerData.mobileNo
            : customerData.mobileNo,
        primaryEmail: customerData.primaryEmail,
        gender: customerData.gender,
        dateOfBirth: customerData.dateOfBirth,
        address: customerData.address,
        address2: customerData.address2,
        city: customerData.city,
        postal: customerData.postal,
        state: customerData.state,
        marketingConsent: customerData.marketingConsent,
      };

      const updateRes = await API.graphql(
        graphqlOperation(updateCustomer, params)
      );
      if (updateRes.data.updateCustomer.status === "true") {
        setUser(customerData);
      }
      setToastState({
        show: true,
        severity:
          updateRes.data.updateCustomer.status === "true" ? "success" : "error",
        message: updateRes.data.updateCustomer.message,
      });
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setToastState({
        show: true,
        severity: "error",
        message: "Something went wrong. Please try again later",
      });
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    const cookie = new Cookies();
    setIsChangePasswordLoading(true);

    try {
      const res = await API.graphql(
        graphqlOperation(resetPassword, {
          merchantId: merchantInfoContext.merchantId,
          customerId: cookie.get("signIn").customerId,
          oldPassword: passwordData.password,
          newPassword: passwordData.newPassword,
        })
      );
      if (
        res.data.resetPassword.message === "Success" &&
        res.data.resetPassword.status === "true"
      ) {
        setIsChangePasswordLoading(false);
        setToastState({
          show: true,
          severity: "success",
          message: "Password Change Successfully",
        });
        return true;
      } else {
        setIsChangePasswordLoading(false);
        setToastState({
          show: true,
          severity: "error",
          message: res.data.resetPassword.message,
        });
        return false;
      }
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };

  const getCustomerData = useCallback(async () => {
    const cookie = new Cookies();
    setIsApiFetching(true);
    try {
      var params = {
        customerId: cookie.get("signIn")?.customerId,
      };

      let { data: responseObj } = await API.graphql(
        graphqlOperation(getCustomer, params)
      );
      if (
        responseObj.getCustomer.message === "Success" &&
        responseObj.getCustomer.status === true
      ) {
        setCustomerData(responseObj.getCustomer);
      }
      setIsApiFetching(false);
    } catch (error) {
      console.log(error);
      setIsApiFetching(false);
    }
  }, []);

  useEffect(() => {
    getCustomerData();
  }, [getCustomerData]);

  return (
    <>
      <SEO title={t("My Account")} keywords="" description="My Account" />
      <Profile
        isApiFetching={isApiFetching}
        customerData={customerData}
        setCustomerData={setCustomerData}
        handleUpdateProfile={handleUpdateProfile}
        isLoading={isLoading}
        passwordData={passwordData}
        setPasswordData={setPasswordData}
        handleUpdatePassword={handleUpdatePassword}
        isChangePasswordLoading={isChangePasswordLoading}
        membershipTierActivated={merchantInfoContext.membershipTierActivated}
        merchantName={merchantInfoContext.name}
      />
    </>
  );
};
MyProfileScreen.title = "My Profile";
export default withProtected(MyProfileScreen);
