import useSWR from "swr";
import { API, graphqlOperation } from "aws-amplify";
import { listItemsByCollection } from "@/graphql/queries";
import { isLocalHost } from "@/utils/util";

export const getRecommendations = (id = "", storeId = "", orderType = "") => {
  if (!id || !storeId) {
    throw new Error("Path is required");
  }
  const fetcher = async () => {
    try {
      var params = {
        filter: {},
        limit: 4,
        nextToken: 0,
        seoUrl: "collection/recommended-for-you",
        storeId,
        sort: { field: "title", direction: "desc" },
        orderType
      };
      if (isLocalHost()) {
        params["merchantId"] = id;
      }
      const { data } = await API.graphql(
        graphqlOperation(listItemsByCollection, params)
      );

      const recommendationStatus = data?.listItemsByCollection.status;

      if (recommendationStatus === "false") {
        return [];
      }
      return data?.listItemsByCollection.items;
    } catch (err) {
      console.log("err", err);
      return null;
    }
  };

  const { data: recommendationsList } = useSWR("getRecommendations", fetcher);
  return { recommendationsList };
};
