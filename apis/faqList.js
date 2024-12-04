import useSWR from "swr";
import { API, graphqlOperation } from "aws-amplify";
import { getFaqList } from "@/graphql/queries";
import { useState } from "react";
import { isLocalHost } from "@/utils/util";

export function getFaq(merchantId, swrOption = {}) {
  if (!merchantId) {
    throw new Error("merchantId is required");
  }

  const [faqListFetchStatus, setFaqListFetchStatus] = useState("none");

  const fetcher = async () => {
    try {
      setFaqListFetchStatus("loading");
      let faqParams = {
        merchantId: merchantId,
      }
      
      const { data } = await API.graphql(
        graphqlOperation(getFaqList, isLocalHost() ? faqParams : {})
      );
      const status = data?.getFaqList.status;

      if (status === false) {
        return {
          items: [],
          categories: [],
        };
      }
      setFaqListFetchStatus("loaded");
      return data.getFaqList;
    } catch (err) {
      console.log("err", err);
      setFaqListFetchStatus("error");
      return null;
    }
  };
  const { data: faqList } = useSWR("getFaqList", fetcher, swrOption);
  return { faqList, faqListFetchStatus: faqListFetchStatus };
}
