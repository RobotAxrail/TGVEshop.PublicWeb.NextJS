import FilledTab from "../components/common/FilledTab";
import { Tab } from "@headlessui/react";
import { ReactElement, useContext, useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import {
  CheckoutPageButton,
  CheckoutPageCard,
  CheckoutPageIconButton,
  Divider,
  ScaleInTransition,
} from "@/components/common/common";
import React from "react";
import useVoucherCart from "../components/context/VoucherStoreContext";
import { useRouter } from "next/router";
import MerchantContext from "@/contexts/MerchantContext";
import CounterItem from "@/components/common/CounterItem";
import { AiFillDelete } from "react-icons/ai";
import StoreTermsAndCondition from "@/components/common/StoreTermsAndCondition";
import { API, graphqlOperation } from "aws-amplify";
import { processCustomerVoucher } from "@/graphql/mutations";
import { Button, Image } from "react-vant";
import CustomerInformationInput from "@/components/common/CustomerInformationInput";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import { setToastState } from "@/states/toastBarState";
import PaymentOptionsRadioButton from "../components/common/PaymentOptionsRadioButtons";

type FormInput = {
  customerPrimaryEmail: string;
  mobileCountryCode: string;
  customerFirstName: string;
  customerLastName: string;
  mobileNumber: string;
  paymentMethod: string;
};

export default function VoucherCheckoutPage({
  children,
}: {
  children: ReactElement;
}) {
  const { merchantId } = useContext(MerchantContext);
  const { user, isAuthenticated } = useAuth();
  const { voucherCart, refetchCart } = useVoucherCart();
  const cookie = new Cookies();
  const paymentMethodOptions = [
    {
      id: "1",
      name: "E-Wallet",
      value: "WA",
    },
    {
      id: "2",
      name: "Credit/Debit Card",
      value: "CC",
    },
    {
      id: "3",
      name: "Bank Transfer",
      value: "DD",
    },
  ];

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
    watch,
    clearErrors,
  } = useForm<FormInput>({
    defaultValues: {
      customerPrimaryEmail: "",
      mobileCountryCode: "",
      customerFirstName: "",
      customerLastName: "",
      mobileNumber: "",
      paymentMethod: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: ["handle submit voucher cart"],
    mutationFn: checkoutVoucher,
    onSuccess(data) {
      if (data.message === "Success") {
        refetchCart();
        window.open(data?.gatewayPaymentUrl, "_self");
      } else
        setToastState({
          message: "An error has occurred while checking voucher out",
          severity: "error",
          show: true,
        });
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      setValue("customerPrimaryEmail", user?.primaryEmail || "");
      setValue("mobileCountryCode", user?.mobileNo?.substring(0, 3) || "");
      setValue("mobileNumber", user?.mobileNo?.substring(3) || "");
      setValue("customerFirstName", user?.firstName || "");
      setValue("customerLastName", user?.lastName || "");
    }
  }, [isAuthenticated, user]);

  return (
    <div className="mt-2 max-w-6xl">
      <FilledTab enabledPadding title={["Ecommerce", "Voucher"]}>
        <Tab.Panel>{children}</Tab.Panel>
        <Tab.Panel>
          <div className="w-full py-4 m-auto">
            <div className="flex md:flex-row flex-col md:space-y-0 space-y-4 hide-scrollbar prevent-overscroll">
              <div className="flex flex-col space-y-4 flex-[2] px-4 md:px-2">
                <CheckoutPageCard>
                  <div className="flex flex-col p-3">
                    <CustomerInformationInput
                      setValue={setValue}
                      register={register}
                      errors={errors}
                      watch={watch}
                    />
                    <ScaleInTransition isOpen={true}>
                      <React.Fragment>
                        <Divider />
                        <PaymentOptionsRadioButton
                          isLoading={isLoading}
                          paymentMethodOptions={paymentMethodOptions}
                          clearErrors={clearErrors}
                          setValue={setValue}
                          register={register}
                          errors={errors}
                          watch={watch}
                        />
                      </React.Fragment>
                    </ScaleInTransition>
                  </div>
                </CheckoutPageCard>
              </div>
              <div className="flex flex-col space-y-4 flex-[2] px-4 md:px-2 sticky top-0">
                <VoucherItemDetails />
                <VoucherOrderSummary
                  loading={isLoading}
                  onSubmit={handleSubmit(
                    ({
                      customerFirstName,
                      customerLastName,
                      customerPrimaryEmail,
                      mobileCountryCode,
                      mobileNumber,
                      paymentMethod,
                    }: FormInput) =>
                      mutate({
                        customerMobileNo: `${mobileCountryCode}${mobileNumber}`,
                        customerId: (cookie.get("signIn") as any)?.customerId,
                        email: customerPrimaryEmail,
                        customerFirstName,
                        customerLastName,
                        platform: "Web",
                        merchantId,
                        voucherCartId: voucherCart?.map(
                          ({ voucherCartId }) => voucherCartId
                        ),
                        paymentMethod,
                      })
                  )}
                />
              </div>
            </div>
          </div>
        </Tab.Panel>
      </FilledTab>
    </div>
  );
}

function VoucherItemDetails() {
  const { voucherCart, isLoading, updateVoucherCart } = useVoucherCart();
  const { currency } = useContext(MerchantContext);
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const CART_IS_EMPTY = voucherCart?.length === 0 || !voucherCart;

  return (
    <CheckoutPageCard>
      <div className="px-5 py-4 rounded-xl bg-[#fff] text-[#191919] space-y-3">
        <h4 className="text-lg font-semibold mb-4 mt-0 text-primary">
          {t("common:item_details")}
        </h4>
        <div className="flex flex-col space-y-3">
          <ScaleInTransition isOpen={Boolean(isLoading) && isAuthenticated}>
            <div className="flex flex-col space-y-2">
              <div className="bg-slate-200 h-[100px] rounded-md animate-pulse" />
              <div className="bg-slate-200 h-[100px] rounded-md animate-pulse" />
              <div className="bg-slate-200 h-[100px] rounded-md animate-pulse" />
              <div className="bg-slate-200 h-[100px] rounded-md animate-pulse" />
              <div className="bg-slate-200 h-[100px] rounded-md animate-pulse" />
            </div>
          </ScaleInTransition>
          <ScaleInTransition isOpen={true}>
            <React.Fragment>
              {voucherCart?.map((item, index: number) => (
                <div
                  key={index}
                  className={`flex flex-row space-x-4 py-4 items-start ${
                    index !== voucherCart?.length - 1
                      ? "border-b border-gray-300"
                      : ""
                  }`}
                >
                  <div className="flex flex-col space-y-1 w-full items-start">
                    <div className="flex flex-col w-full">
                      <div className="flex flex-row justify-between w-full items-start">
                        <div className="flex flex-row space-x-4">
                          <Image
                            src={`${process.env.BUCKET_URL}${item?.voucherImage}`}
                            alt={item?.voucherTitle}
                            height={80}
                            width={80}
                          />
                          <div className="flex flex-col">
                            <p className="m-0 font-semibold text-xl">
                              {item?.voucherTitle}
                            </p>
                            <p className="m-0 text-primary text-sm whitespace-nowrap">
                              {currency} {item?.voucherTotalPrice?.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <CheckoutPageIconButton
                          className="border-transparent text-gray-400 p-[0px]"
                          variant="outline"
                          onClick={() =>
                            updateVoucherCart({
                              voucherId: item?.voucherId,
                              quantity: 0,
                            })
                          }
                        >
                          <AiFillDelete size={20} />
                        </CheckoutPageIconButton>
                      </div>
                      <div className="w-full flex flex-row items-end">
                        <div className="ml-auto w-fit">
                          <CounterItem
                            value={item?.voucherQuantity}
                            buttonDisabled={isLoading}
                            max={10}
                            min={1}
                            onChange={(v) =>
                              updateVoucherCart({
                                voucherId: item?.voucherId,
                                quantity: v,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          </ScaleInTransition>
          {!CART_IS_EMPTY && (
            <div className="flex flex-row justify-center pt-4 border-t">
              <CheckoutPageButton onClick={() => router.push("/rewards")}>
                {t("common:add_more_items")}
              </CheckoutPageButton>
            </div>
          )}
          <ScaleInTransition
            isOpen={Boolean(CART_IS_EMPTY) || !isAuthenticated}
          >
            <div className="p-10 text-center w-full bg-gray-50 rounded-md text-gray-500 space-y-4 flex flex-col">
              <p className="text-md m-0">{t("common:no_orders_yet")}</p>
              <div>
                <CheckoutPageButton
                  onClick={() => {
                    if (isAuthenticated) {
                      router.push({
                        pathname: "/rewards",
                        query: { type: "deals" },
                      });
                    } else {
                      router.push({
                        pathname: "/login",
                        query: { to: "deals" },
                      });
                    }
                  }}
                >
                  {t("common:order_now")}
                </CheckoutPageButton>
              </div>
            </div>
          </ScaleInTransition>
        </div>
      </div>
    </CheckoutPageCard>
  );
}

function VoucherOrderSummary({
  onSubmit,
  loading,
}: {
  onSubmit: () => void;
  loading: boolean;
}) {
  const { currency, footerItemLists } = useContext(MerchantContext);
  const { voucherCart, isLoading, isUpdating } = useVoucherCart();
  const { t } = useTranslation();

  return (
    <CheckoutPageCard>
      <div className="px-5 py-4 rounded-xl bg-[#fff] text-[#191919] space-y-3">
        <h4 className="text-lg font-semibold mb-4 mt-0 text-primary">
          {t("common:order_summary_title")}
        </h4>
        <div className="border-t border-dotted border-gray-400" />
        <div className="flex flex-row items-center justify-between">
          <p className="font-bold my-0">{t("common:total_label")}</p>
          {(isLoading || isUpdating) && voucherCart?.length ? (
            <div className="h-5 animate-pulse bg-slate-200 w-20" />
          ) : (
            <p className="font-bold my-0 text-primary">{`${currency} ${
              voucherCart
                ?.reduce((p, { voucherTotalPrice }) => p + voucherTotalPrice, 0)
                .toFixed(2) || "0.00"
            }`}</p>
          )}
        </div>
        <StoreTermsAndCondition footerItemLists={footerItemLists} />
        <div className="flex flex-col w-full pt-1 space-y-3">
          <Button
            type="primary"
            style={{ borderRadius: 8 }}
            onClick={onSubmit}
            loading={loading}
            disabled={!voucherCart?.length}
            className="disabled:bg-[#EDEDED] disabled:text-[#9E9E9E] disabled:border-none"
          >
            {t("common:confirm")}
          </Button>
        </div>
      </div>
    </CheckoutPageCard>
  );
}

async function checkoutVoucher(props: {
  customerFirstName: string;
  customerMobileNo: string;
  customerLastName: string;
  voucherCartId: string[];
  merchantId: string;
  customerId: string;
  platform: string;
  email: string;
  paymentMethod: string;
}) {
  const {
    data: { processCustomerVoucher: res },
  } = (await API.graphql(
    graphqlOperation(processCustomerVoucher, props)
  )) as any;
  return res;
}
