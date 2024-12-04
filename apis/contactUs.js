import useSWR from "swr";
import { API, graphqlOperation } from "aws-amplify";
import { getContactUsInfo } from "@/graphql/queries";
import { useState } from "react";
import { isLocalHost } from "@/utils/util";

export function getContactUs(merchantId, swrOption = {}) {
  if (!merchantId) {
    throw new Error("merchantId is required");
  }

  const [contactUsFetchStatus, setContactUsFetchStatus] = useState("none");

  const fetcher = async () => {
    try {
      setContactUsFetchStatus("loading");
      let contactUsParams = {
        merchantId: merchantId,
      }
      
      const { data } = await API.graphql(
        graphqlOperation(getContactUsInfo, isLocalHost() ? contactUsParams : {})
      );

      const status = data?.getContactUsInfo.status;

      if (status === "false") {
        return {};
      }
      var returnData = {
        contactUsRichText: data?.getContactUsInfo.contactUsContent,
        isEnableEnquiry: data?.getContactUsInfo.contactUsFormEnabled,
      };
      if (data?.getContactUsInfo.storeList !== null) {
        returnData = {
          ...returnData,
          stores: data.getContactUsInfo.storeList,
        };
      }
      setContactUsFetchStatus("loaded");
      return returnData;
    } catch (err) {
      console.log("err", err);
      setContactUsFetchStatus("error");
      return null;
    }
  };
  const { data: contactUsInfo } = useSWR(
    "getContactUsInfo",
    fetcher,
    swrOption
  );
  return { contactUsInfo, contactUsFetchStatus: contactUsFetchStatus };
}
