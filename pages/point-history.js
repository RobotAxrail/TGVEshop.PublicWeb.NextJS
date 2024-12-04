import React, { useContext, useEffect, useState } from "react";
// components
import SEO from "@/components/seo/SEO";
import PointListing from "@/components/points/PointListing";

//API
import { API, graphqlOperation, withSSRContext } from "aws-amplify";
import { getMemberPointLog } from "@/graphql/queries";

import { withProtected } from "@/utils/routeProtection";
import Cookies from "universal-cookie";
// contexts
import MerchantContext from "@/contexts/MerchantContext";

const PointHistoryScreen = () => {
  const merchantInfoContext = useContext(MerchantContext);

  const cookie = new Cookies();
  const [pointLogsList, setPointLogsList] = useState([]);
  const [totalPointLogsLength, setTotalPointLogsLength] = useState(0);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [isApiFetching, setIsApiFetching] = useState(true);
  useEffect(() => {
    async function getPointsLog() {
      setIsApiFetching(true);
      try {
        const signInData = cookie.get("signIn");
        var params = {
          accessToken: signInData.accessToken ?? "",
          customerId: signInData.customerId,
          merchantId: merchantInfoContext.merchantId,
        };
        let res = await API.graphql(
          graphqlOperation(getMemberPointLog, params)
        );
        if (res.data.getMemberPointLog) {
          let data = res.data.getMemberPointLog.memberPointLog;
          let orderLength = data?.length;
          setPointLogsList(data);
          setTotalPointLogsLength(orderLength);
        } else {
          setPointLogsList([]);
        }
        setIsTimeOut(false);
        setIsApiFetching(false);
      } catch (error) {
        setIsTimeOut(true);
        setIsApiFetching(false);
        console.log(error);
      }
    }
    getPointsLog();
  }, []);
  return (
    <>
      <SEO
        title="My Point History"
        keywords=""
        description="My Point History"
      />
      <PointListing
        pointLogsList={pointLogsList}
        isApiFetching={isApiFetching}
        isTimeOut={isTimeOut}
        totalPointLogsLength={totalPointLogsLength}
        membershipTierActivated={merchantInfoContext.membershipTierActivated}
      />
    </>
  );
};

export default withProtected(PointHistoryScreen);
