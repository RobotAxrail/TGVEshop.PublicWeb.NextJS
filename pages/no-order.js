import React, { useContext } from "react";
import { useRouter } from "next/router";
import { EmptyState } from "@/components/emptyState/EmptyState";
import MerchantContext from "@/contexts/MerchantContext";
import { StoreTypes } from "@/enums/enums";
import useTranslation from "next-translate/useTranslation";

import empty from "@/images/empty-cart.svg";

const NoOrderScreen = () => {
  const { storeType } = useContext(MerchantContext);
  const router = useRouter();
  const { t } = useTranslation("common");
  return (
    <EmptyState
      src={empty}
      title={t("No orders yet")}
      subtitle={t("You dont have any orders")}
      hasButton={true}
      buttonTitle={t("Browse products")}
      buttonAction={() =>
        storeType === StoreTypes.WARUNG
          ? router.push("/collections-menu")
          : router.push("/")
      }
    />
  );
};

export default NoOrderScreen;
