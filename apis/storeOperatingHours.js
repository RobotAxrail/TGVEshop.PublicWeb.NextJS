import useSWR from "swr";
import { API, graphqlOperation } from "aws-amplify";
import { kdsGetWarungLandingPage } from "@/graphql/queries";
import { useState } from "react";
import { isLocalHost } from "@/utils/util";
import { StoreTypes } from "@/enums/enums";

export function getStoreOperatingHours(merchantId, storeType) {
  // if (!merchantId) {
  //   throw new Error("merchantId is required");
  // }

  if (storeType === StoreTypes.WHATSAPP_CRM_STORETYPE) return {};

  const [landingPageFetchStatus, setLandingPageFetchStatus] = useState("none");

  const fetcher = async () => {
    try {
      setLandingPageFetchStatus("loading");
      let params = {
        merchantId: merchantId,
      };
      const { data } = await API.graphql(
        graphqlOperation(kdsGetWarungLandingPage, isLocalHost() ? params : {})
      );
      const status = data?.kdsGetWarungLandingPage.status;

      if (status === false) {
        return {};
      }
      setLandingPageFetchStatus("loaded");
      return {
        address: data?.kdsGetWarungLandingPage.address,
        operatingHours: data?.kdsGetWarungLandingPage.item,
        warungStoreStatus: data?.kdsGetWarungLandingPage.warungStoreStatus,
        orderOption: data?.kdsGetWarungLandingPage.orderOption,
      };
    } catch (err) {
      console.log("err", err);
      setLandingPageFetchStatus("error");
      return null;
    }
  };
  const { data: landingPageData } = useSWR("kdsGetWarungLandingPage", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  });
  return { landingPageData, landingPageFetchStatus };
}
