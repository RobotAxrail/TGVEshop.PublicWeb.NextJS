import useSWR from "swr";
import { API, graphqlOperation } from "aws-amplify";
import { getSplashScreenCache } from "@/graphql/queries";
import { isLocalHost } from "@/utils/util";

export const getSplashScreen = (id = "", swrOption = {}) => {
  if (!id) {
    throw new Error("Path is required");
  }
  const fetcher = async () => {
    try {
      var params = {
        merchantId: id,
      };
      
      const { data } = await API.graphql(
        graphqlOperation(getSplashScreenCache, isLocalHost() ? params : {})
      );

      const status = data?.getSplashScreenCache.status;

      if (status === false) {
        return [];
      }
      return data?.getSplashScreenCache.items;
    } catch (err) {
      return null;
    }
  };

  const { data: splashScreenList, error: splashScreenError } = useSWR(
    "getSplashScreenCache",
    fetcher,
    swrOption
  );

  return { splashScreenList, splashScreenError };
};
