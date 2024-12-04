import { useAuth } from "@/contexts/AuthContext";
import useTranslation from "next-translate/useTranslation";
import CheckoutPagePhoneNumber, {
  CheckoutPageInput,
  ErrorLabel,
} from "./common";

export default function CustomerInformationInput({
  register,
  errors,
  watch,
}: {
  setValue: any;
  register: any;
  errors: any;
  watch: any;
}) {
  const { isAuthenticated } = useAuth();
  const regexSelector = {
    "+60": /^(1)[0|1|2|3|4|6|7|8|9]-*[0-9]{7,8}$/,
    "+65": /^([8|9])[0|1|2|3|4|6|7|8|9]\d{6}$/,
  };
  const { t } = useTranslation();

  return (
    <div className="flex flex-col my-4">
      <h4 className="font-semibold m-0 text-primary text-lg mb-2">
        {t("common:customerInformation")}
      </h4>
      <div className="flex flex-col space-y-2">
        <CheckoutPageInput
          disabled={isAuthenticated}
          placeholder={t("common:firstName")}
          label={t("common:firstName")}
          register={register("customerFirstName", {
            required: {
              message: t("common:errorMessages-firstName"),
              value: true,
            },
          })}
        />
        <ErrorLabel value={errors?.customerFirstName?.message} />
        <CheckoutPageInput
          disabled={isAuthenticated}
          placeholder={t("common:lastName")}
          label={t("common:lastName")}
          register={register("customerLastName", {
            required: {
              message: t("common:errorMessages-lastName"),
              value: true,
            },
          })}
        />
        <ErrorLabel value={errors?.customerLastName?.message} />
        <CheckoutPagePhoneNumber
          disabled={isAuthenticated}
          registerCountryCode={register("mobileCountryCode")}
          registerPhoneNumber={register("mobileNumber", {
            required: {
              value: true,
              message: t("common:errorMessages-mobileNumber"),
            },
            pattern: {
              value: regexSelector[watch("mobileCountryCode")],
              message: t("common:errorMessages-mobileNumberInvalid"),
            },
          })}
        />
        <ErrorLabel value={errors?.mobileNumber?.message} />
        <CheckoutPageInput
          disabled={isAuthenticated}
          placeholder={t("common:email")}
          label={t("common:email")}
          register={register("customerPrimaryEmail", {
            required: {
              message: t("common:errorMessages-email"),
              value: true,
            },
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: t("common:errorMessages-emailInvalid"),
            },
          })}
        />
        <ErrorLabel value={errors?.customerPrimaryEmail?.message} />
      </div>
    </div>
  );
}
