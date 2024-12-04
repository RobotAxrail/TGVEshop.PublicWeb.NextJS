import { ScaleInTransition, ErrorLabel } from "./common";
import { CheckIcon } from "@heroicons/react/outline";
import { RadioGroup } from "@headlessui/react";
import useTranslation from "next-translate/useTranslation";

export default function PaymentOptionsRadioButton({
  paymentMethodOptions,
  clearErrors,
  isLoading,
  register,
  setValue,
  errors,
  watch,
}: any) {
  const { t } = useTranslation();
  return (
    <div className="w-full mt-4">
      <h4 className="font-semibold m-0 text-primary text-lg mb-2">
        {t("common:paymentMethod")}
      </h4>
      <ScaleInTransition isOpen={!isLoading}>
        <RadioGroup
          onChange={(v) => {
            setValue("paymentMethod", v);
            clearErrors("paymentMethod");
          }}
          value={watch("paymentMethod")}
        >
          <RadioGroup.Label className="sr-only">
            {t(`common:"Server size"}`)}
          </RadioGroup.Label>
          <div className="space-y-2">
            {paymentMethodOptions?.map((method: any) => (
              <RadioGroup.Option
                value={method?.value}
                key={method?.id}
                className={({ checked }) =>
                  `relative flex cursor-pointer rounded-lg px-5 py-4 shadow-sm focus:outline-none border ${
                    checked && "border-primary"
                  }`
                }
              >
                {({ checked }) => (
                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col">
                      <div>{t(`common:${method?.name}`)}</div>
                    </div>
                    {checked && (
                      <div className="shrink-0 text-white bg-primary rounded-full shadow-sm">
                        <CheckIcon className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </ScaleInTransition>
      <input
        className="h-0 w-0"
        {...register("paymentMethod", {
          required: {
            message: t("common:paymentMethodRequired"),
            value: true,
          },
        })}
      />
      {errors?.paymentMethod && (
        <ErrorLabel value={errors?.paymentMethod?.message} />
      )}
    </div>
  );
}
