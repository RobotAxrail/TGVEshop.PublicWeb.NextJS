import { useState } from "react";
import SignInRedirect from "@/components/authentication/SignInRedirect";
import SEO from "@/components/seo/SEO";
// contexts
import { useAuth } from "@/contexts/AuthContext";

const RedirectScreen = () => {
  const {
    handleLogin,
    handleOtpResend,
    handleOtpVerification,
    OTPVerificationIsLoading,
    openOtpModal,
    setOpenOtpModal,
  } = useAuth();

  return (
    <>
      <SEO title="Checkout" keywords="" description="Checkout" />
      <SignInRedirect
        handleLogin={handleLogin}
        openOtpModal={openOtpModal}
        setOpenOtpModal={setOpenOtpModal}
        handleOtpVerification={handleOtpVerification}
        handleOtpResend={handleOtpResend}
        OTPVerificationIsLoading={OTPVerificationIsLoading}
      />
    </>
  );
};

export default RedirectScreen;
