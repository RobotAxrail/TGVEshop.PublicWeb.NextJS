import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";

// components
const Toast = dynamic(() => import("@/components/alert/Toast"));
import { ContainedButton } from "@/components/buttons/Buttons";
import { AuthChecked, AuthTextInput } from "./AuthenticationInputs";
import { Formik, Form } from "formik";
import { validateSignIn } from "@/validation/authentication/validateSignIn";

const OtpDialog = dynamic(() => import("./OtpDialog"));

function SignIn(props) {
  const {
    handleLogin,
    handleOtpVerification,
    OTPVerificationIsLoading,
    handleOtpResend,
    openOtpModal,
    setOpenOtpModal,
  } = props;
  const router = useRouter();
  const { t } = useTranslation("common");
  //validate created account
  const [otp, setOtp] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });

  const handleOnSubmitLogIn = (logInData, setSubmitting) => {
    setSubmitting(true);
    handleLogin(logInData.primaryEmail, logInData.password).then((response) => {
      if (response) {
        setTimeout(() => {
          if (router.query.source === "email") {
            router.push("/view-cart");
          } else if (router.query.to === "checkout") {
            router.replace("/checkout");
          } else if (router.query.to === "order") {
            router.replace("/order");
          } else if (router.query.to === "deals") {
            router.replace({
              pathname: "/rewards",
              query: { type: "deals" },
            });
          }
        }, router.query.to !== "order" && 2000);
      }
      setSubmitting(false);
    });
  };

  const formRef = useRef();

  return (
    <>
      <Formik
        innerRef={formRef}
        initialValues={{ primaryEmail: "", password: "", keepSignIn: false }}
        validationSchema={validateSignIn}
        onSubmit={(val, { setSubmitting }) =>
          handleOnSubmitLogIn(val, setSubmitting)
        }
      >
        {(formikProps) => {
          return (
            <Form>
              <AuthTextInput
                label={t("email") + "*"}
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"
                name="primaryEmail"
              />

              <AuthTextInput
                label={t("Password") + "*"}
                type="password"
                className="mt-3"
                name="password"
              />

              <div className="justify-between flex flex-col sm:flex-row items-center mb-3 sm:mb-5 mt-5">
                <AuthChecked
                  className="mb-2 sm:mb-0 sm:mr-2"
                  name="keepSignIn"
                  label={t("Keep me signed in")}
                  checked={formikProps.values.keepSignIn}
                  handleChange={formikProps.handleChange}
                />

                <Link passHref href="/forgot-password">
                  <a>{t("Forgot Password")}?</a>
                </Link>
              </div>
              <div className="mb-[50px] mx-auto max-w-[300px]">
                <ContainedButton
                  className="w-full rounded-full h-[45px]"
                  type="submit"
                  loading={
                    !formikProps.isValidating && formikProps.isSubmitting
                  }
                >
                  {t("Sign In")}
                </ContainedButton>
              </div>
              <div className="text-center">
                <span>{t("Not a member yet")}? &nbsp;</span>
                {router.query.return === "checkout" ? (
                  <Link passHref href="/register?return=checkout">
                    <a>{t("Create Account")}</a>
                  </Link>
                ) : (
                  <Link passHref href="/register">
                    <a>{t("Create Account")}</a>
                  </Link>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
      {/* OTP Modal */}
      {console.log({ OTPVerificationIsLoading })}
      <OtpDialog
        otpModal={openOtpModal}
        setOtpModal={setOpenOtpModal}
        otp={otp}
        setOtp={setOtp}
        email={formRef.current?.values?.primaryEmail}
        handleOtpVerification={(otpValues) =>
          handleOtpVerification(
            otpValues,
            formRef.current?.values?.primaryEmail ?? ""
          )
        }
        handleOtpResend={() =>
          handleOtpResend(formRef.current?.values?.primaryEmail ?? "")
        }
        verificationIsLoading={OTPVerificationIsLoading}
      />
    </>
  );
}

export default SignIn;
