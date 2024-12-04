import { ScaleInTransition, CheckoutPageButton, ErrorLabel } from "./common";
import { CheckIcon } from "@heroicons/react/outline";
import { RadioGroup } from "@headlessui/react";
import { useEffect } from "react";
import useTranslation from "next-translate/useTranslation";

export default function DeliveryOptionsRadioButton({
  openDeliveryModal,
  deliveryOptions,
  isLoading,
  register,
  setValue,
  currency,
  errors,
  watch,
}: any) {
  useEffect(() => {
    setValue("deliveryOptionSelected", watch("deliveryOptionSelected"));
  }, [`${watch("deliveryOptionSelected")}`]);
  const { t } = useTranslation();
  return (
    <div className="w-full mt-4">
      <ScaleInTransition isOpen={isLoading}>
        <div className="flex flex-col space-y-2">
          <div className="w-full h-20 bg-slate-300 animate-pulse rounded-lg px-5 py-4" />
          <div className="w-full h-20 bg-slate-300 animate-pulse rounded-lg px-5 py-4" />
        </div>
      </ScaleInTransition>
      <ScaleInTransition isOpen={!isLoading && deliveryOptions?.length <= 0}>
        <div className="p-10 text-center w-full bg-gray-50 rounded-md text-gray-500 space-y-4 flex flex-col">
          <p className="text-md m-0">{t("common:noDeliveryOptions")}</p>
          <div>
            <CheckoutPageButton variant="solid" onClick={openDeliveryModal}>
              {t("common:updateAddress")}
            </CheckoutPageButton>
          </div>
        </div>
      </ScaleInTransition>
      <ScaleInTransition isOpen={!isLoading}>
        <RadioGroup
          onChange={(v) => setValue("deliveryOptionSelected", v)}
          value={watch("deliveryOptionSelected")}
        >
          <RadioGroup.Label className="sr-only">{t(`common:"Server size"}`)}</RadioGroup.Label>
          <div className="space-y-2">
            {deliveryOptions?.map((plan: any) => (
              <RadioGroup.Option
                value={plan?.name}
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
                      <div>
                        {t(`common:${plan?.name}`, {}, { default: plan?.name })}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {t(
                          `common:${plan?.estimatedDuration}`,
                          {},
                          { default: plan?.estimatedDuration }
                        )}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {`${currency} ${plan?.rate?.toFixed(2)}`}
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
      </ScaleInTransition>

      <input
        className="h-0 w-0"
        {...register("deliveryOptionSelected", {
          required: {
            message: t("common:deliveryOptionSelected"),
            value: true,
          },
        })}
      />
      {
        deliveryOptions && deliveryOptions?.length > 0 ? null : <ErrorLabel value={errors?.deliveryOptionSelected?.message} />
      }

    </div>
  );
}
