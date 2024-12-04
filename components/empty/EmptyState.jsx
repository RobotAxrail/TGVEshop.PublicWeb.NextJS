import { useRouter } from "next/router";
import Image from "next/image";
import useTranslation from 'next-translate/useTranslation';

// components
import { ContainedButton } from "@/components/buttons/Buttons";

const EmptyState = ({ src, title, subtitle, icon, source = "" }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <div className="text-center p-5 mt-12">
      {!!src ? (
        <div className="mb-[30px]">
          <Image src={src} width="80" height="80" alt="Empty Cart" />
        </div>
      ) : null}
      <div className="text-[24px] font-semibold">{title}</div>
      <p>{subtitle}</p>
      {source === "address" ? null : (
        <ContainedButton
          className="my-12 font-semibold"
          fontSize="text-13px"
          onClick={() => router.push("/")}
        >
          {t("continue_shopping")}
        </ContainedButton>
      )}
    </div>
  );
};

export default EmptyState;
