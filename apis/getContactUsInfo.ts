import { getContactUsInfo } from "@/graphql/queries";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import { isLocalHost } from "@/utils/util";

export const fetchContactUsInfo = async (payload: {
    merchantId: string;
}) => {
    let params = {};
    if (isLocalHost()) {
        params["merchantId"] = payload.merchantId;
    }
    try {
        const res = (await API.graphql(
            graphqlOperation(getContactUsInfo, params)
        )) as GraphQLResult<any>;
        return res.data.getContactUsInfo;
    } catch (error) {
        throw error;
    }
};
