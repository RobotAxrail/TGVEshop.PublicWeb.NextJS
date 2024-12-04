import { StoreTypes } from "@/enums/enums";
import Link from "next/link";
import React from "react";
import useTranslation from 'next-translate/useTranslation';

interface IManualPaymentBottomSectionProps {
  storeType: `${StoreTypes}`;
  phoneNum: string;
  whatsappNo: string;
}

const ManualPaymentBottomSection: React.FC<
  IManualPaymentBottomSectionProps
> = ({ storeType, phoneNum, whatsappNo }) => {
  const { t } = useTranslation('common');
  return (
    <div className="flex flex-col items-center">
      <a
        className="border-2 border-primary rounded-lg p-3 w-full text-center no-underline text-primary mb-5 text-sm"
        href={
          (storeType === StoreTypes.AC_STORETYPE || storeType === StoreTypes.B2B_STORETYPE)
            ? `https://api.whatsapp.com/send/?phone=${whatsappNo}&text&app_absent=0`
            : `tel:${phoneNum}`
        }
      >
         {t('Contact Seller')}
      </a>
      <Link
        href={
          storeType === StoreTypes.WARUNG_STORETYPE ? "/collections-menu" : "/"
        }
      >
        <a className="text-primary text-sm">{t('Back to Store')}</a>
      </Link>
    </div>
  );
};

export default ManualPaymentBottomSection;
