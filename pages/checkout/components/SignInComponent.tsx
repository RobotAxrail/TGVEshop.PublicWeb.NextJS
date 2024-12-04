import { BsFillPersonCheckFill } from "react-icons/bs/index";
import { verifyCustomerAccount } from "@/graphql/mutations";
import MerchantContext from "@/contexts/MerchantContext";
import { IoIosArrowBack } from "react-icons/io/index";
import React, { useContext, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { useOrder } from "@/contexts/OrderContext";
import { useAuth } from "@/contexts/AuthContext";
import { OrderTypes } from "@/enums/enums";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  CheckoutPageButton,
  CheckoutPageInput,
  CheckoutPageCard,
  ScaleInTransition,
} from "./common";
import useTranslation from "next-translate/useTranslation";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function SignInComponent() {
  const { orderType } = useOrder();
  const { t } = useTranslation();
  const {
    onSubmit,
    register,
    watch,
    errors,
    isSubmitting,
    isAuthenticated,
    skipLogin,
    setSkipLogin,
    resetEmail,
    user,
  } = useSignInComponentController();

  return (
    <CheckoutPageCard>
      <React.Fragment>
        <ScaleInTransition isOpen={!isAuthenticated && !skipLogin}>
          <form
            className="flex flex-col space-y-3 w-full items-center p-3 md:p-4 py-4"
            onSubmit={onSubmit}
          >
            <div className="flex flex-col items-center mb-2">
              <div className="m-0 p-0 text-xl font-bold text-primary">
                {t("common:login-or-sign-up")}
              </div>
              <div className="text-gray-400 text-md">
                {t("common:enter-email")}
              </div>
            </div>
            {!watch("isCheckEmail") && !watch("isNewUser") && (
              <div className="w-full align-start">
                <CheckoutPageButton
                  className="text-xs"
                  variant="link"
                  onClick={resetEmail}
                  type="button"
                >
                  <IoIosArrowBack />
                  <React.Fragment>{t("common:reset-email")}</React.Fragment>
                </CheckoutPageButton>
              </div>
            )}
            <div className="w-full space-y-2 flex flex-col">
              <CheckoutPageInput
                placeholder={t("common:enter-valid-email")}
                disabled={!watch("isCheckEmail")}
                label={t("common:email")}
                register={register("email", {
                  required: t("common:email-required"),
                })}
              />
              {errors?.email && (
                <label className="text-xs text-red-500 ml-2">{`${errors?.email?.message}`}</label>
              )}
              {!watch("isCheckEmail") && !watch("isNewUser") && (
                <React.Fragment>
                  <CheckoutPageInput
                    className="w-full outline-none bg-transparent"
                    placeholder={t("common:enter-password")}
                    label={t("common:enter-password")}
                    autoComplete="current-password"
                    type={"password"}
                    register={register("password", {
                      required: t("common:password-required"),
                    })}
                  />
                  {errors?.password && (
                    <label className="text-xs text-red-500 ml-2">{`${errors?.password?.message}`}</label>
                  )}
                </React.Fragment>
              )}
            </div>
            <div className="flex flex-col w-full space-y-3 mt-1">
              <CheckoutPageButton
                className="w-full text-md"
                variant="outline"
                isLoading={isSubmitting}
                type="submit"
              >
                {!watch("isCheckEmail") && watch("isNewUser") ? (
                  <p className="m-0">{t("common:register-now")}</p>
                ) : (
                  <p className="m-0">{t("common:continue")}</p>
                )}
              </CheckoutPageButton>
              <CheckoutPageButton
                onClick={() => setSkipLogin(true)}
                className="w-full text-sm"
                variant="link"
                type="button"
              >
                <p className="m-0">{t("common:skip-this")}</p>
              </CheckoutPageButton>
            </div>
          </form>
        </ScaleInTransition>
        <ScaleInTransition isOpen={skipLogin}>
          <div
            className="p-2 flex flex-row items-center space-x-4 hover:bg-gray-100 duration-75 cursor-pointer rounded-md"
            onClick={() => setSkipLogin(false)}
          >
            <div className="bg-primary p-3 flex flex-row items-center justify-center rounded-md text-white">
              <BsFillPersonCheckFill size={20} style={{ color: "white" }} />
            </div>
            <span className="text-gray-400 flex flex-wrap items-center">
              {t("common:login-or-sign-up")}
            </span>
          </div>
        </ScaleInTransition>
        <ScaleInTransition isOpen={isAuthenticated && !skipLogin}>
          <div className="p-[0.5px] flex flex-row items-center space-x-4">
            <div className="bg-primary p-3 flex flex-row items-center justify-center rounded-md text-white">
              <BsFillPersonCheckFill size={20} style={{ color: "white" }} />
            </div>
            <span className="text-gray-400 flex flex-wrap items-center">
              <div className="mr-2">{t("common:logged-in-as")}</div>
              {user?.primaryEmail ? (
                <span>{user?.primaryEmail}</span>
              ) : (
                <div className="h-6 w-50 bg-slate-300 rounded-md animate-pulse" />
              )}
            </span>
          </div>
        </ScaleInTransition>
      </React.Fragment>
    </CheckoutPageCard>
  );
}

function useSignInComponentController() {
  const { isAuthenticated, handleLogin, user } = useAuth();
  const { merchantId } = useContext(MerchantContext);
  const [skipLogin, setSkipLogin] = useState(false);
  const router = useRouter();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    register,
    watch,
  } = useForm({
    defaultValues: {
      isCheckEmail: true,
      isNewUser: false,
      password: "",
      email: "",
    },
  });

  async function checkCustomerExists(customerEmail: string) {
    const {
      data: {
        verifyCustomerAccount: { accountIsExist },
      },
    } = (await API.graphql(
      graphqlOperation(verifyCustomerAccount, {
        customerEmail,
        merchantId,
      })
    )) as any;
    return {
      exists: accountIsExist,
      hasError: false,
    };
  }

  async function handleFormSubmit(value: any) {
    const isCheckEmail = watch("isCheckEmail");
    const isNewUser = watch("isNewUser");
    if (isCheckEmail) {
      await sleep(500);
      const { exists } = await checkCustomerExists(value?.email);
      setValue("isNewUser", !exists);
      setValue("isCheckEmail", false);
    } else {
      if (!isNewUser) await handleLogin(value?.email, value?.password);
      else router.push("/register?return=checkout");
    }
  }

  function resetEmail() {
    setValue("isCheckEmail", true);
    setValue("isNewUser", false);
    setValue("password", "");
    setValue("email", "");
  }

  return {
    onSubmit: handleSubmit(handleFormSubmit),
    isAuthenticated,
    setSkipLogin,
    isSubmitting,
    resetEmail,
    skipLogin,
    register,
    errors,
    watch,
    user,
  };
}
