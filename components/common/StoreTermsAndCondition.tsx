import { legalPoliciesType } from "@/enums/enums";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

export default function StoreTermsAndCondition({
  footerItemLists,
}: {
  footerItemLists: any[];
}) {
  const hasTermsOfService =
    footerItemLists?.filter(
      ({ display, footerType }) =>
        display && footerType === legalPoliciesType?.TERMS_OF_SERVICE
    )?.length > 0;

  const hasPrivacyPolicy =
    footerItemLists?.filter(
      ({ display, footerType }) =>
        display && footerType === legalPoliciesType?.PRIVACY
    )?.length > 0;

  const HAS_EITHER = hasPrivacyPolicy || hasTermsOfService;
  const HAS_BOTH = hasPrivacyPolicy && hasTermsOfService;
  const { t } = useTranslation();

  return (
    <>
      {HAS_EITHER && (
        <div className="text-xs flex flex-row pt-2 flex-wrap whitespace-nowrap">
          <p className="m-0 mr-1">{t("common:terms_of_service_text")}</p>
          {hasTermsOfService && (
            <Link href="/policy/term-of-service">
              <a target="_blank" rel="noopener noreferrer">
                {t("common:terms_of_service")}
              </a>
            </Link>
          )}
          {HAS_BOTH && <p className="m-0 mx-1">{t("common:and")}</p>}
          {hasPrivacyPolicy && (
            <Link href="/policy/privacy">
              <a target="_blank" rel="noopener noreferrer">
                {t("common:privacy_policy")}
              </a>
            </Link>
          )}
        </div>
      )}
    </>
  );
}
