import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
// components
import SignUp from "@/components/authentication/SignUp";
import SEO from "@/components/seo/SEO";

// API
import { API, graphqlOperation } from "aws-amplify";
import {
  customerSignUp,
  oTPVerification,
  resendOTP,
} from "@/graphql/mutations";
// utils
import { createCookieForSignInData, isLocalHost } from "@/utils/util";
import { withPublic } from "@/utils/routeProtection";

//
import Cookies from "universal-cookie";
import { setToastState } from "@/states/toastBarState";

// contexts
import MerchantContext from "@/contexts/MerchantContext";
import { useAuth } from "@/contexts/AuthContext";

const RegisterScreen = () => {
  const merchantInfoContext = useContext(MerchantContext);
  const { setIsAuthenticated, getCustomerData } = useAuth();
  const [userSignInData, setUserSignInData] = useState({});
  const [openOtpModal, setOpenOtpModal] = useState(false);
  const router = useRouter();
  const cookie = new Cookies();
  const [OTPVerificationIsLoading, setOTPVerificationIsLoading] =
    useState(false);
  const { t } = useTranslation("common");

  // sign up
  const handleSignUp = async (customerObj) => {
    try {
      var params = {
        ...customerObj,
        mobileNo: "+" + customerObj.mobileNo,
        autoLogin: router.query.return === "checkout" ? true : false,
        oldCustomerId: cookie.get("sessionId"),
      };
      if (isLocalHost()) {
        params["merchantId"] = merchantInfoContext.merchantId;
      }
      const res = await API.graphql(graphqlOperation(customerSignUp, params));
      if (res.data.customerSignUp.status === true) {
        if (router.query.return === "checkout") {
          const userSignInData = res.data.customerSignUp.signInResponse;
          createCookieForSignInData(userSignInData, customerObj);
          setUserSignInData(res.data.customerSignUp.signInResponse);
        }
        setToastState({
          show: true,
          severity: "success",
          message: res.data.customerSignUp.message,
        });
        setOpenOtpModal(true);
        return true;
      } else {
        setToastState({
          show: true,
          severity: "error",
          message: res.data.customerSignUp.message,
        });
        return false;
      }
    } catch (error) {
      console.log(error);
      setToastState({
        show: true,
        severity: "error",
        message: t("Something went wrong. Please try again later."),
      });
      return false;
    }
  };

  // otp verification
  const handleOtpVerification = async (otpValues, customerObj) => {
    setOTPVerificationIsLoading(true);
    const { primaryEmail } = customerObj;

    let params = {
      customerOtp: otpValues,
      primaryEmail: primaryEmail,
    };
    if (isLocalHost()) {
      params["merchantId"] = merchantInfoContext.merchantId;
    }
    try {
      const res = await API.graphql(graphqlOperation(oTPVerification, params));
      if (res.data.oTPVerification.message === "Valid OTP and email") {
        setOpenOtpModal(false);
        setToastState({
          show: true,
          severity: "success",
          message: t("Sign Up Successful"),
        });
        if (router.query.return === "checkout") {
          createCookieForSignInData(userSignInData, customerObj);
          getCustomerData()
          setIsAuthenticated(true);
          setTimeout(() => {
            router.push("/checkout");
          }, 1500);
        } else {
          setTimeout(() => {
            router.push("/login");
          }, 1500);
        }
        setOTPVerificationIsLoading(false);
        return true;
      } else {
        setToastState({
          show: true,
          severity: "error",
          message: res.data.oTPVerification.message,
        });
        setOTPVerificationIsLoading(false);
        return false;
      }
    } catch (error) {
      console.log("otp", error);
      setToastState({
        show: true,
        severity: "error",
        message: t("Something went wrong. Please try again later."),
      });
      setOTPVerificationIsLoading(false);
      return false;
    }
  };

  // resend otp
  const handleOtpResend = async (primaryEmail) => {
    // e.preventDefault();
    let params = {
      primaryEmail: primaryEmail,
    };
    if (isLocalHost()) {
      params["merchantId"] = merchantInfoContext.merchantId;
    }
    try {
      const res = await API.graphql(graphqlOperation(resendOTP, params));
      if (res.data.resendOTP.status === "true") {
        setToastState({
          show: true,
          severity: "success",
          message: res.data.resendOTP.message,
        });
      } else {
        setToastState({
          show: true,
          severity: "error",
          message: res.data.resendOTP.message,
        });
      }
    } catch (error) {
      console.log(error);
      setToastState({
        show: true,
        severity: "error",
        message: t("OTP Request Failed"),
      });
    }
  };
  return (
    <>
      <SEO title="Sign Up" keywords="" description="Sign Up" />
      <SignUp
        handleSignUp={handleSignUp}
        openOtpModal={openOtpModal}
        setOpenOtpModal={setOpenOtpModal}
        handleOtpVerification={handleOtpVerification}
        handleOtpResend={handleOtpResend}
        merchantName={merchantInfoContext.name}
        OTPVerificationIsLoading={OTPVerificationIsLoading}
      />
    </>
  );
};
RegisterScreen.title = "Register";

export default withPublic(RegisterScreen);
