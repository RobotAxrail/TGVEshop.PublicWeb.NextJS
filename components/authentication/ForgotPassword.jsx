import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
// components
import { ContainedButton } from "@/components/buttons/Buttons";
// utils
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { AuthTextInput } from "./AuthenticationInputs";

const ForgotPassword = ({ handleForgotPassword }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const validateForgotPassword = Yup.object().shape({
    email: Yup.string()
      .required(t("Email is a required field"))
      .email(t("Valid email is required")),
  });

  const handleOnSubmitForgotPassword = ({ email }, setSubmitting) => {
    setSubmitting(true);
    handleForgotPassword(email).then((response) => {
      setSubmitting(false);
      if (response) {
        router.push("/login");
      }
    });
  };

  return (
    <div className="xs:max-w-[400px] p-10 mx-auto">
      <h1 className="text-center">{t('Forgot Password')}</h1>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validateForgotPassword}
        onSubmit={(val, { setSubmitting }) =>
          handleOnSubmitForgotPassword(val, setSubmitting)
        }
      >
        {(formikProps) => {
          return (
            <Form>
              <AuthTextInput
                label="Email *"
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"
                name="email"
              />
              <div className="text-center my-5">
                <ContainedButton
                  className="w-full"
                  loading={
                    !formikProps.isValidating && formikProps.isSubmitting
                  }
                  disabled={
                    !formikProps.isValidating && formikProps.isSubmitting
                  }
                  type="submit"
                >
                  {t("Retrieve Your Password")}
                </ContainedButton>
              </div>
              <div className="flex flex-col text-center">
                <Link passHref href="/login">
                  <a className="py-2">{t("Login")}</a>
                </Link>
                <Link passHref href="/">
                  <a className="py-2">{t("Return to Store")}</a>
                </Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
