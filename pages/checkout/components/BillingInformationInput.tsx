import { CheckoutPageSelect, ErrorLabel, CheckoutPageInput } from "./common";
import React from "react";
import useTranslation from "next-translate/useTranslation";

export default function BillingInformationInput({
  register,
  errors,
  watch,
}: {
  register: any;
  errors: any;
  watch: any;
}) {
  const { t } = useTranslation();
  const billingCountrySelections = [
    {
      label: "Malaysia",
      value: "Malaysia",
    },
    {
      label: "Singapore",
      value: "Singapore",
    },
  ];

  return (
    <div className="w-full flex flex-col my-4">
      <h4 className="font-semibold m-0 text-primary text-lg mb-2">
        {t("common:billingInformation")}
      </h4>
      <div className="flex flex-col space-y-2">
        <CheckoutPageSelect
          options={billingCountrySelections}
          placeholder={t("common:country")}
          label={t("common:country")}
          register={register("billingCountry", {
            required: {
              value: true,
              message: t("common:pleaseSelectACountry"),
            },
          })}
        />
        <ErrorLabel value={errors?.billingCountry?.message} />
        <CheckoutPageInput
          placeholder={t("common:address")}
          label={t("common:address")}
          register={register("billingAddress", {
            required: {
              message: t("common:pleaseEnterYourBillingAddress"),
              value: true,
            },
          })}
        />
        <ErrorLabel value={errors?.billingAddress?.message} />
        <CheckoutPageInput
          placeholder={t("common:postcode")}
          label={t("common:postcode")}
          type="number"
          register={register("billingPostcode", {
            required: {
              message: t("common:pleaseEnterYourBillingPostcode"),
              value: true,
            },
          })}
        />
        <ErrorLabel value={errors?.billingPostcode?.message} />
        {watch("billingCountry") !== "Singapore" && (
          <React.Fragment>
            <CheckoutPageInput
              placeholder={t("common:city")}
              label={t("common:city")}
              register={register("billingCity", {
                required: {
                  message: t("common:pleaseEnterYourBillingCity"),
                  value: true,
                },
              })}
            />
            <ErrorLabel value={errors?.billingCity?.message} />
          </React.Fragment>
        )}
        {watch("billingCountry") !== "Singapore" && (
          <React.Fragment>
            <CheckoutPageInput
              placeholder={t("common:state")}
              label={t("common:state")}
              register={register("billingState", {
                required: {
                  message: t("common:pleaseEnterYourBillingState"),
                  value: true,
                },
              })}
            />
            <ErrorLabel value={errors?.billingState?.message} />
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
