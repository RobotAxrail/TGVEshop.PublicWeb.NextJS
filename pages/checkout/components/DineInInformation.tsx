import { CheckoutPageInput, ErrorLabel } from "./common";
import { CheckIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import { useEffect } from "react";
import useTranslation from "next-translate/useTranslation";

export default function DineInInformation({
  tableNumber,
  setValue,
  register,
  errors,
  watch,
}: {
  onSelectAddress: () => void;
  tableNumber: string;
  setValue: any;
  register: any;
  errors: any;
  watch: any;
}) {
  const { t } = useTranslation();
  useEffect(() => {
    setValue("tableNumber", tableNumber);
  }, [tableNumber]);

  return (
    <div className="my-2">
      <h4 className="font-semibold m-0 text-primary text-lg p-0">
        {t("common:Dine-In")}
      </h4>
      <div className="my-2">
        <CheckoutPageInput
          label={t("common:table-number")}
          register={register("tableNumber", {
            required: { value: true, message: t("common:table-name-required") },
          })}
        />
        <ErrorLabel value={errors?.tableNumber?.message} />
      </div>
      <p className="text-gray-500 mb-0">{t("common:payment-method")}</p>
      <div className="my-2">
        <DineInPaymentSelections
          register={register}
          setValue={setValue}
          watch={watch}
        />
        <ErrorLabel value={errors?.dineInPaymentMethod?.message} />
      </div>
    </div>
  );
}

function DineInPaymentSelections({
  register,
  setValue,
  watch,
}: {
  register: any;
  setValue: any;
  watch: any;
}) {
  const { t } = useTranslation();
  const paymentOptions = [
    {
      description: t("common:payOnlineDescription"),
      name: t("common:payOnline"),
      value: "PayOnline",
    },
    {
      description: t("common:payAtCounterDescription"),
      name: t("common:payAtCounter"),
      value: "PayAtCounter",
    },
  ];

  return (
    <RadioGroup
      onChange={(v) => setValue("dineInPaymentMethod", v)}
      value={watch("dineInPaymentMethod")}
    >
      <input
        className="hidden"
        {...register("dineInPaymentMethod", {
          required: {
            message: t("common:pleaseSelectPaymentMethod"),
            value: true,
          },
        })}
      />
      <RadioGroup.Label className="sr-only">{t(`common:"Server size"}`)}</RadioGroup.Label>
      <div className="space-y-2">
        {paymentOptions?.map((plan) => (
          <RadioGroup.Option
            value={plan?.value}
            key={plan?.name}
            className={({ checked }) =>
              `relative flex cursor-pointer rounded-lg px-5 py-4 shadow-sm focus:outline-none border ${
                checked && "border-primary"
              }`
            }
          >
            {({ checked }) => (
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col">
                  <div>{plan?.name}</div>
                  <div className="text-gray-500 text-sm">
                    {plan?.description}
                  </div>
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
  );
}
