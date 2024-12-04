import { CheckoutPageButton } from "./common";
import { OrderTypes } from "@/enums/enums";
import React from "react";
import useTranslation from "next-translate/useTranslation";

export default function MultistoreSelector({
  onSelectStoreSelected,
  onChangeStoreClicked,
  storeAddress,
  orderType,
  address,
}: {
  onSelectStoreSelected: () => void;
  onChangeStoreClicked: () => void;
  storeAddress?: string;
  orderType: string;
  address: string;
}) {
  const { t } = useTranslation();
  return (
    <div className="py-5 flex flex-col space-y-3 items-start">
      {orderType === OrderTypes.DELIVERY && (
        <React.Fragment>
          <h4 className="font-semibold m-0 text-primary text-lg p-0">
            {t("common:deliver-to")}
          </h4>
          <div className="text-gray-500 text-sm my-3">{address}</div>
        </React.Fragment>
      )}
      {orderType === OrderTypes.DELIVERY && <h5>from</h5>}
      {orderType === OrderTypes.PICKUP && (
        <h4 className="font-semibold m-0 text-primary text-lg p-0">
          {t("common:pickup-from")}
        </h4>
      )}
      {!(!storeAddress || storeAddress.length === 0) && (
        <React.Fragment>
          <div className="text-gray-500 text-sm my-3">{storeAddress}</div>
          <CheckoutPageButton onClick={onChangeStoreClicked} variant="link">
            {orderType === OrderTypes.DELIVERY
              ? t("common:change-store-or-address")
              : t("common:change-store")}
          </CheckoutPageButton>
        </React.Fragment>
      )}
      {(!storeAddress || storeAddress.length === 0) && (
        <div className="p-10 text-center w-full bg-gray-50 rounded-md text-gray-500 space-y-4 flex flex-col mt-1">
          <p className="text-md m-0">{t("common:no-store-selected")}</p>
          <div>
            <CheckoutPageButton onClick={onSelectStoreSelected}>
              {t("common:select-store")}
            </CheckoutPageButton>
          </div>
        </div>
      )}
    </div>
  );
}
