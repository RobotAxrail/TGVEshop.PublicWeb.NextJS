import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// components
import { ContainedButton } from "@/components/buttons/Buttons";
import { TextInput, Checkbox } from "@/components/inputs/Input";
import AuthLayout from "@/components/layouts/AuthLayout";
import useTranslation from "next-translate/useTranslation";
// utils
import { isEmpty } from "@/utils/util";

const ResetPassword = (props) => {
  const {
    handleResetPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
  } = props;
  const router = useRouter();
  const { t } = useTranslation("common");
  const [isLoading, setIsLoading] = useState(false);
  // alert
  const [error, setError] = useState({
    show: false,
    message: "",
  });

  const handleOnReset = () => {
    setIsLoading(true);
    if (newPassword !== confirmPassword) {
      setError({
        show: true,
        message: t("Password does not match"),
      });
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      setIsLoading(false);
      return;
    } else {
      return handleResetPassword().then((response) => {
        setIsLoading(false);
        if (response) {
          router.push("/login");
        }
      });
    }
  };

  return (
    <AuthLayout
      title={t("Reset Password")}
      alertMessage={error.message}
      error={error.show}
    >
      <TextInput
        label={t("New Password")+"*"}
        type="password"
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
        className="mb-3"
        name="new-password"
      />
      <TextInput
        label={t("Confirm Password")+"*"}
        type="password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
        className="mb-3"
        name="confirm-password"
      />
      <div className="text-center my-5">
        <ContainedButton
          className="max-w-[300px] w-full"
          onClick={handleOnReset}
          loading={isLoading}
          disabled={[newPassword, confirmPassword].includes("")}
        >
          {t("Reset Password")}
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
    </AuthLayout>
  );
};

export default ResetPassword;
