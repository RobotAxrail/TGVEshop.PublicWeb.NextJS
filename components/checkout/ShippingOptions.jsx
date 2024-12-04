import React from 'react'
import "react-phone-input-2/lib/style.css";
//Content
import { FormattedNumber } from "react-intl";
import useTranslation from 'next-translate/useTranslation';

const ShippingOptions = () => {
  const { t } = useTranslation('common');
  return (
    <div>{t("ShippingOptions")}</div>
  )
}

export default ShippingOptions