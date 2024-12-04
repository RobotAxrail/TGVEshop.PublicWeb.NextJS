import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
// components
import SignIn from "@/components/authentication/SignIn";
import AuthLayout from "@/components/layouts/AuthLayout";
import SEO from "@/components/seo/SEO";
import useTranslation from "next-translate/useTranslation";

// utils
import Cookies from "universal-cookie";
import { useAuth } from "@/contexts/AuthContext";
import { withPublic } from "@/utils/routeProtection";
import { setToastState } from "@/states/toastBarState";
const LoginScreen = (props) => {
  const {
    handleLogin,
    handleOtpResend,
    handleOtpVerification,
    OTPVerificationIsLoading,
    openOtpModal,
    setOpenOtpModal,
  } = useAuth();
  const { t } = useTranslation("common");
  return (
    <>
      <SEO title="Login" keywords="" description="login" />
      <div className="xs:max-w-[400px] p-5 mx-auto">
        <h1 className="text-center">{t("Sign In")}</h1>
        <SignIn
          handleLogin={handleLogin}
          openOtpModal={openOtpModal}
          setOpenOtpModal={setOpenOtpModal}
          handleOtpVerification={handleOtpVerification}
          handleOtpResend={handleOtpResend}
          OTPVerificationIsLoading={OTPVerificationIsLoading}
        />
      </div>
    </>
  );
};

LoginScreen.title = "Login";
export default withPublic(LoginScreen);
