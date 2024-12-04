import React, { useContext } from "react";
import ForgotPassword from "@/components/authentication/ForgotPassword";
import SEO from "@/components/seo/SEO";

// API
import { API, graphqlOperation } from "aws-amplify";
import { forgotPassword } from "@/graphql/mutations";

import { withPublic } from "@/utils/routeProtection";
import { setToastState } from "@/states/toastBarState";
// contexts
import MerchantContext from "@/contexts/MerchantContext";

const ForgotPasswordScreen = () => {
  const merchantInfoContext = useContext(MerchantContext);

  const handleForgotPassword = async (email) => {
    try {
      const res = await API.graphql(
        graphqlOperation(forgotPassword, {
          merchantId: merchantInfoContext.merchantId,
          primaryEmail: email,
        })
      );
      if (res.data.forgotPassword.status === "true") {
        setToastState({
          show: true,
          severity: "success",
          message: "Please check your inbox to retrieve your password",
        });
        return true;
      } else {
        setToastState({
          show: true,
          severity: "error",
          message: res.data.forgotPassword.message,
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

  return (
    <>
      <SEO title="Forgot Password" keywords="" description="Forgot Password" />
      <ForgotPassword handleForgotPassword={handleForgotPassword} />
    </>
  );
};

ForgotPasswordScreen.title = "Forgot Password";

export default withPublic(ForgotPasswordScreen);
