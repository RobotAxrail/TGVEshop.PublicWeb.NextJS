import React, { useState, useContext } from "react";
import ResetPassword from "@/components/authentication/ResetPassword";
import SEO from "@/components/seo/SEO";

// API
import { API, graphqlOperation } from "aws-amplify";
import { resetPassword } from "@/graphql/mutations";

import { withPublic } from "@/utils/routeProtection";
import { setToastState } from "@/states/toastBarState";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";

// contexts
import MerchantContext from "@/contexts/MerchantContext";

const ResetPasswordScreen = () => {
  const merchantInfoContext = useContext(MerchantContext);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();
  const cookie = new Cookies();

  const handleResetPassword = async () => {
    var randomHash = router.query.reset;
    try {
      const res = await API.graphql(
        graphqlOperation(resetPassword, {
          merchantId: merchantInfoContext.merchantId,
          randomHash: randomHash,
          newPassword: newPassword,
        })
      );
      if (
        res.data.resetPassword.message === "Success" &&
        res.data.resetPassword.status === "true"
      ) {
        setToastState({
          show: true,
          severity: "success",
          message: "Password Reset Successfully",
        });
        return true;
      } else {
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

  return (
    <>
      <SEO title="Reset Password" keywords="" description="Reset Password" />
      <ResetPassword
        setConfirmPassword={setConfirmPassword}
        confirmPassword={confirmPassword}
        setNewPassword={setNewPassword}
        newPassword={newPassword}
        handleResetPassword={handleResetPassword}
      />
    </>
  );
};

export default withPublic(ResetPasswordScreen);
