import useSWR from "swr";
import { API, graphqlOperation } from "aws-amplify";
import { getSiteNavigationCache } from "@/graphql/queries";
import { isLocalHost } from "@/utils/util";

export const getSiteNavs = (id = "", swrOption = {}) => {
  if (!id) {
    throw new Error("merchantId is required");
  }
  const siteFetcher = async () => {
    try {
      var params = {
        merchantId: id,
      };
      
      const { data } = await API.graphql(
        graphqlOperation(getSiteNavigationCache, isLocalHost() ? params : {})
      );

      const siteNavStatus = data?.getSiteNavigationCache.status;

      if (siteNavStatus === "false") {
        return [];
      }
      return data?.getSiteNavigationCache.siteNavigations;
    } catch (err) {
      return null;
    }
  };

  const { data: siteNavs } = useSWR(
    "getSiteNavigationCache",
    siteFetcher,
    swrOption
  );

  var headerList =
    siteNavs !== undefined
      ? siteNavs?.filter((obj) => obj.menuType === "header")
      : [];
  var footerList =
    siteNavs !== undefined
      ? siteNavs?.filter((obj) => obj.menuType === "footer")
      : [];

  return { siteNavs, headerList, footerList };
};
