import React, { useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";

import { ContainedButton } from "@/components/buttons/Buttons";
const SignIn = dynamic(() => import("@/components/authentication/SignIn"));
// import SignIn from "";
import { useRouter } from "next/router";

const SignInRedirect = (props) => {
  const {
    handleLogin,
    handleOtpResend,
    handleOtpVerification,
    openOtpModal,
    setOpenOtpModal,
    OTPVerificationIsLoading,
  } = props;
  const router = useRouter();
  const { t } = useTranslation("common");

  //   to check again later
  const handleRedirect = () => {
    const fbCid = "";
    if (fbCid !== "") {
      router.push({
        pathname: `/checkout`,
        query: `?cId=${fbCid}`,
      });
    } else {
      router.push({
        pathname: `/checkout`,
        // query: `?platform=${platform}`,
      });
    }
  };

  return (
    <div className="sign-in-root-redirect p-3">
      <div className="mt-5">
        <a
          className="cursor-pointer"
          onClick={() => {
            router.back();
            sessionStorage.clear("selectedItems");
          }}
        >
          &#8592; {t("Back to Cart")}
        </a>
      </div>
      <div className="text-center">
        <h2>{t("SIGN IN FOR FASTER CHECKOUT")}</h2>

        <div className="flex flex-col md:flex-row">
          <div className="border-b md:border-r md:border-b-0 border-gray-300 border-solid border-r-0 md:w-1/2 w-full px-10 pb-10 md:pb-0 text-left">
            <h2 className="text-center">{t("Login")}</h2>
            <SignIn
              handleLogin={handleLogin}
              openOtpModal={openOtpModal}
              setOpenOtpModal={setOpenOtpModal}
              handleOtpVerification={handleOtpVerification}
              handleOtpResend={handleOtpResend}
              OTPVerificationIsLoading={OTPVerificationIsLoading}
            />
          </div>
          <div
            className="px-10 md:w-1/2 md:mx-auto 
            w-full mx-0 pb-10 md:pb-0 border-gray-300 border-solid"
          >
            <h2>{t("Guest Checkout")}</h2>
            <p>{t("Proceed as a guest and sign up later.")}</p>
            <div className="max-w-[300px] mx-auto">
              <ContainedButton
                className="w-full h-[45px] border-2 border-primary"
                outlined={true}
                onClick={handleRedirect}
              >
                {t("Continue As Guest")}
              </ContainedButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInRedirect;
