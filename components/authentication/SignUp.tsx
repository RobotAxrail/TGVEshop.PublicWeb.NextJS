import { useContext, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
// components
import { ContainedButton } from "@/components/buttons/Buttons";
import { Checkbox, CustomPhoneInput } from "@/components/inputs/Input";
import OtpDialog from "./OtpDialog";

// utils
import {
  enforce_maxlength,
  isValidEmail,
  isValidPhoneNumber,
} from "@/utils/util";
import _ from "lodash";
import MerchantContext from "@/contexts/MerchantContext";
import { Formik, Form, ErrorMessage } from "formik";
import {
  AuthChecked,
  AuthTextInput,
  AuthPhoneNumberInput,
} from "./AuthenticationInputs";
import { validateSignUp } from "@/validation/authentication/validateSignUp";
import { legalPoliciesType } from "@/enums/enums";

const SignUp = ({
  handleSignUp,
  openOtpModal,
  setOpenOtpModal,
  handleOtpVerification,
  handleOtpResend,
  merchantName,
  OTPVerificationIsLoading,
}) => {
  const { footerItemLists } = useContext(MerchantContext);
  const { t } = useTranslation("common");
  const [otp, setOTP] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });

  const handleOnSubmitSignUp = (customerData, setSubmitting) => {
    setSubmitting(true);
    handleSignUp(customerData).then((response) => setSubmitting(false));
  };

  const checkVisibility = (policyType: legalPoliciesType) => {
    return footerItemLists?.some(
      (footerItem) => footerItem.footerType === policyType && footerItem.display
    );
  };

  const showTerms = checkVisibility(legalPoliciesType.TERMS_OF_SERVICE);
  const showPrivacy = checkVisibility(legalPoliciesType.PRIVACY);

  //useRef to access form value outside of formik
  const formRef: any = useRef();

  return (
    <div className="xs:max-w-[400px] p-5 mx-auto">
      <h1 className="text-center">{t("Sign Up")}</h1>
      <Formik
        innerRef={formRef}
        validationSchema={validateSignUp}
        initialValues={{
          firstName: "",
          lastName: "",
          primaryEmail: "",
          mobileNo: "",
          password: "",
          marketingConsent: false,
          country: "my"
        }}
        onSubmit={(val, { setSubmitting }) =>
          handleOnSubmitSignUp(val, setSubmitting)
        }
      >
        {(formikProps) => {

          const { values, handleChange, setFieldValue } = formikProps;
          return (
            <>
              <Form>
                <AuthTextInput
                  label={t("firstName") + "*"}
                  type="text"
                  name="firstName"
                />
                <AuthTextInput
                  label={t("lastName") + "*"}
                  type="text"
                  className="mt-3"
                  name="lastName"
                  maxLength="30"
                />
                <div className="mt-3 min-h-[50px]">
                  <AuthPhoneNumberInput
                    name="mobileNo"
                    onChange={(data, e) => {
                      setFieldValue("mobileNo", data);
                      setFieldValue("country", e.countryCode);
                    }}
                    circleBorder
                  />
                  <ErrorMessage name="mobileNo">
                    {(msg) => (
                      <div className="pl-5 text-sm text-red-600 my-1">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <AuthTextInput
                  label={t("email") + "*"}
                  type="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"
                  className="mt-3"
                  name="primaryEmail"
                  maxLength="50"
                />
                <AuthTextInput
                  label={t("Password") + "*"}
                  type="password"
                  className="mt-3"
                  name="password"
                  maxLength="30"
                />
                <div className="">
                  {(showTerms || showPrivacy) && (
                    <div className="my-7 text-justify	">
                      <span>
                        {t("By signing up, I agree to the")} {merchantName}
                        {showTerms && (
                          <Link href="/policy/term-of-service">
                            <a target="_blank" rel="noopener noreferrer">
                              {" "}
                              {t("terms_of_service")}
                            </a>
                          </Link>
                        )}
                        {showTerms && showPrivacy && " and "}
                        {showPrivacy && (
                          <Link href="/policy/privacy">
                            <a target="_blank" rel="noopener noreferrer">
                              {" "}
                              {t("privacy_policy")}
                            </a>
                          </Link>
                        )}
                        .
                      </span>
                    </div>
                  )}
                  <AuthChecked
                    className="mt-3 ml-4"
                    name="marketingConsent"
                    label={t("I'd like to receive") + " " + merchantName + " " + t("and its partners")}
                    checked={values.marketingConsent}
                    handleChange={handleChange}
                  />
                </div>
                <div className="text-center mt-5">
                  <ContainedButton
                    className="w-full h-[45px]"
                    type="submit"
                    loading={
                      !formikProps.isValidating && formikProps.isSubmitting
                    }
                  >
                    {t("Sign Up")}
                  </ContainedButton>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
      {/* OTP Modal */}
      <OtpDialog
        otpModal={openOtpModal}
        setOtpModal={setOpenOtpModal}
        otp={otp}
        setOtp={setOTP}
        email={formRef.current?.values?.primaryEmail ?? ""}
        handleOtpVerification={(otpValues) =>
          handleOtpVerification(otpValues, formRef.current?.values)
        }
        handleOtpResend={() =>
          handleOtpResend(formRef.current?.values?.primaryEmail ?? "")
        }
        verificationIsLoading={OTPVerificationIsLoading}
      />
    </div>
  );
};

export default SignUp;
