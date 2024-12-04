import React from "react";
import ErrorIcon from "@/lottie/error-icon.json";
import Lottie from "lottie-react";

const ErrorLottie = () => {
  return (
    <>
      <Lottie animationData={ErrorIcon} loop={true} />
    </>
  );
};

export default ErrorLottie;
