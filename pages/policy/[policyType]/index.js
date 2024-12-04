import React, { Fragment, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import MerchantContext from "@/contexts/MerchantContext";

//API
import { API, graphqlOperation, withSSRContext } from "aws-amplify";
import { getLegalPolicy } from "@/graphql/queries";
// rest api
import { getMerchantData } from "../../../apis/merchant";

// components
const Policies = dynamic(() => import("@/components/policies/Policies"));
const EWarungPolicies = dynamic(() =>
  import("@/components/policies/WarungPolicies")
);
const SEO = dynamic(() => import("@/components/seo/SEO"));
// utils
import _ from "lodash";
import { getDomainForSSR } from "@/utils/util";

const PolicyScreen = (props) => {
  const selectedPolicy = props.legalPolicies?.find(
    (data) => _.camelCase(data.policyType) === _.camelCase(props.type)
  );
  const { storeType } = useContext(MerchantContext);
  return (
    <Fragment>
      <SEO title={props.type} keywords="" description={"policy"} />
      {storeType !== "warung" ? (
        <Policies selectedPolicy={selectedPolicy} />
      ) : (
        <EWarungPolicies></EWarungPolicies>
      )}
    </Fragment>
  );
};

export default PolicyScreen;

export async function getServerSideProps(context) {
  const { domain } = getDomainForSSR(context);
  try {
    var params = {
      domain: domain,
    };
    
    const SSR = withSSRContext();

    const respPolicies = await API.graphql(
      graphqlOperation(getLegalPolicy, params)
    );

    const legalPolicyResponseObj = respPolicies.data.getLegalPolicy;
    let legalPolicyStatus = legalPolicyResponseObj.status;

    if (!domain.includes("ewarung")) {
      if (legalPolicyStatus === false) {
        return { notFound: true };
      }
    }

    return {
      props: {
        legalPolicies: legalPolicyResponseObj.legalPolicies,
        type: context.params.policyType,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
