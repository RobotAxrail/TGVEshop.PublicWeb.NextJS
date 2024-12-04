import useTranslation from "next-translate/useTranslation";
import { CheckoutPageButton, CheckoutPageInput, ErrorLabel } from "./common";

const noEmojiRegex =
  /[^0-9a-zA-Z(\-)\u200D\uFE0F\s,!\u0022\u0023\u0024\u0025\u0026\u0027\u0028\u0029\u002A\u002B\u002C\u002D\u002E\u002F\u003A\u003B\u003C\u003D\u003E\u003F\u0040\u005B\u005C\u005D\u005E\u005F\u0060\u007B\u007C\u007D\u007E]+$/g;

export default function DeliveryInformation({
  onSelectAddress,
  register,
  address,
  postalCode,
  isAuthenticated,
  displayPostalCode,
  errors,
  setValue,
}: {
  onSelectAddress: () => void;
  address: string;
  postalCode: string;
  register: any;
  isAuthenticated: boolean;
  displayPostalCode: boolean;
  errors: any;
  setValue: any;
}) {
  const { t } = useTranslation();
  return (
    <div className="my-2">
      <h4 className="font-semibold m-0 text-primary text-lg p-0 mb-3">
        {t("common:deliverTo")}
      </h4>
      {!(!address || address.length === 0) && (
        <div className="flex flex-col space-y-2 justify-start">
          <div className="text-gray-500 text-sm">{address}</div>
          <div>
            <CheckoutPageButton variant="link" onClick={onSelectAddress}>
              {t("common:editAddress")}
            </CheckoutPageButton>
          </div>
          <div>
            {displayPostalCode && (
              <div>
                <CheckoutPageInput
                  label={t("common:postalCode")}
                  placeholder="56000"
                  value={postalCode}
                  disabled={true}
                />
              </div>
            )}
            <div className="mt-1">
              <textarea
                className="block w-full border rounded-md border-gray-200 shadow-sm sm:text-sm p-3 outline-none"
                placeholder={t("common:deliveryRemarks")}
                name="remarks"
                id="remarks"
                rows={4}
                {...register("remarks", {
                  onChange: (e: any) => {
                    const value = e.target.value;
                    setValue("remarks", value.replace(noEmojiRegex, ""));
                  },
                })}
              />
            </div>
          </div>
        </div>
      )}
      {(!address || address.length === 0) && (
        <div className="p-10 text-center w-full bg-gray-50 rounded-md text-gray-500 space-y-4 flex flex-col mt-1">
          <p className="text-md m-0">{t("common:noAddressSelected")}</p>
          <div>
            <CheckoutPageButton onClick={onSelectAddress}>
              {t("common:selectAddress")}
            </CheckoutPageButton>
          </div>
        </div>
      )}
    </div>
  );
}
