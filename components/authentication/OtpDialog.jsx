import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import React, { useContext } from "react";

// components
import DialogModal from "@/components/dialog/DialogModal";
import { ContainedButton } from "@/components/buttons/Buttons";

// states
import { setToastState } from "@/states/toastBarState";

const OtpDialog = (props) => {
  const {
    otpModal,
    setOtpModal,
    otp,
    setOtp,
    email,
    handleOtpVerification,
    handleOtpResend,
    verificationIsLoading,
  } = props;
  const { t } = useTranslation("common");
  // checking otp inputs
  const handleOtpValidateOnClick = (e) => {
    e.preventDefault();
    var otpValues = "";
    var error = false;
    for (var [key, value] of Object.entries(otp)) {
      otpValues += value;
      if (value.trim() === "") {
        setToastState({
          show: true,
          severity: "error",
          message: t("Please enter the OTP sent to your email."),
        });
        error = true;
        return;
      }
    }
    if (error) {
      return;
    }
    handleOtpVerification(otpValues);
  };

  // change otp values
  function handleOTPInput(e) {
    if(e.target.value.split("").length===6) {
      let inputArr = e.target.value.split("")
      setOtp({ ...otp, 
          1 : inputArr[0],
          2 : inputArr[1],
          3 : inputArr[2],
          4 : inputArr[3],
          5 : inputArr[4],
          6 : inputArr[5],
      });
    } else if (otp[e.target.id].length === 0 || e.target.value.trim() === "") {
      setOtp({ ...otp, [e.target.id]: e.target.value });
    }
  }

  // change to next or previous otp input
  const inputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.id - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      const next = elmnt.target.id;
      if (next < 6) {
        elmnt.target.form.elements[next].focus();
      }
    }
  };

  return (
    <DialogModal
      open={otpModal}
      onClose={() => setOtpModal(false)}
      title={t("OTP Verification")}
    >
      <div className="px-3">
        <form onSubmit={handleOtpValidateOnClick}>
          <div className="flex flex-col mt-4 text-gray-500">
            {" "}
            <p className="m-0">
              {t("Please enter the One-Time Password to verify your account")}
            </p>
            <p className="m-0">{t("A One-Time Password has been sent to")}</p>{" "}
            <p className="font-bold">{email}</p>{" "}
          </div>

          <div
            id="otp"
            className="flex flex-row justify-center text-center px-2"
          >
            <input
              className="m-1 h-8 w-8 xs:m-2 xs:h-10 xs:w-10 border text-center form-control rounded"
              autoComplete="off"
              type="number"
              value={otp["1"]}
              onChange={handleOTPInput}
              onKeyUp={(e) => inputfocus(e)}
              min="0"
              max="9"
              id="1"
            />
            <input
              className="m-1 h-8 w-8 xs:m-2 xs:h-10 xs:w-10 border text-center form-control rounded"
              autoComplete="off"
              type="number"
              value={otp["2"]}
              onChange={handleOTPInput}
              onKeyUp={(e) => inputfocus(e)}
              min="0"
              max="9"
              id="2"
            />
            <input
              className="m-1 h-8 w-8 xs:m-2 xs:h-10 xs:w-10 border text-center form-control rounded"
              autoComplete="off"
              type="number"
              value={otp["3"]}
              onChange={handleOTPInput}
              onKeyUp={(e) => inputfocus(e)}
              min="0"
              max="9"
              id="3"
            />
            <input
              className="m-1 h-8 w-8 xs:m-2 xs:h-10 xs:w-10 border text-center form-control rounded"
              autoComplete="off"
              type="number"
              value={otp["4"]}
              onChange={handleOTPInput}
              onKeyUp={(e) => inputfocus(e)}
              min="0"
              max="9"
              id="4"
            />
            <input
              className="m-1 h-8 w-8 xs:m-2 xs:h-10 xs:w-10 border text-center form-control rounded"
              autoComplete="off"
              type="number"
              value={otp["5"]}
              onChange={handleOTPInput}
              onKeyUp={(e) => inputfocus(e)}
              min="0"
              max="9"
              id="5"
            />
            <input
              className="m-1 h-8 w-8 xs:m-2 xs:h-10 xs:w-10 border text-center form-control rounded"
              autoComplete="off"
              type="number"
              value={otp["6"]}
              onChange={handleOTPInput}
              onKeyUp={(e) => inputfocus(e)}
              min="0"
              max="9"
              id="6"
            />
          </div>
          <div className="sm:px-4 py-3 px-6 flex flex-col justify-center">
            {/* <button
              type="submit"
              className="sm:w-full sm:text-base  justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary font-medium text-white ml-3 w-auto text-sm"
            >
              {t("Validate")}
            </button> */}
            <ContainedButton
              className="w-full font-medium mb-3"
              border="rounded-md"
              type="submit"
              loading={verificationIsLoading}
              disabled={verificationIsLoading}
            >
              {t("Validate")}
            </ContainedButton>
            <ContainedButton
              className="w-full"
              border="rounded-md"
              outlined={true}
              onClick={(e) => {
                e.preventDefault();
                setOtpModal(false);
              }}
            >
              {t("cancel")}
            </ContainedButton>
          </div>
        </form>
        <div className="my-5 block font-bold hover:text-gray-500">
          <a
            className={
              verificationIsLoading ? "text-gray-400" : "cursor-pointer"
            }
            onClick={() => !verificationIsLoading && handleOtpResend()}
          >
            {t("Resend OTP")}
          </a>
        </div>
      </div>
    </DialogModal>
  );
};

export default OtpDialog;
