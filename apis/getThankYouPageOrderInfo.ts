import { getThankYouPageOrderInfo } from "@/graphql/queries";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";

export const fetchThankYouPageOrderInfo = async (payload: {
  domain: string;
  orderNumber: string;
  accessToken: string;
}) => {
  let params = {
    domain: payload.domain,
    orderNumber: payload.orderNumber,
    accessToken: payload.accessToken,
  };
  try {
    const res = (await API.graphql(
      graphqlOperation(getThankYouPageOrderInfo, params)
    )) as GraphQLResult<any>;
    return res.data.getThankYouPageOrderInfo;
  } catch (error) {
    throw error;
  }
};
