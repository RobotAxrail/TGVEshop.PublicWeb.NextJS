import { useContext, useEffect } from "react";
import Cookies from "universal-cookie";
// component
import { getUrlMappings, IUrlMapping } from "@/apis/getUrlMappings";
import PaymentRedirect from "@/components/paymentRedirect/PaymentRedirect";
import SEO from "@/components/seo/SEO";

// API
// import { getThankYouPageOrderInfo } from "@/graphql/queries";
// rest api
import { fetchThankYouPageOrderInfo } from "@/apis/getThankYouPageOrderInfo";
import MerchantContext from "@/contexts/MerchantContext";
import { getDomainForSSR } from "@/utils/util";
import { getMerchantData } from "../apis/merchant";

import { StoreTypes } from "@/enums/enums";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

function PaymentRedirectScreen(props) {
  const cookie = new Cookies();
  const { storeType, merchantId, domain } = useContext(MerchantContext);
  const router = useRouter();

  const thankYouPageOrderInfoPayload = {
    domain: domain,
    orderNumber: router.query.orderNumber as string,
    accessToken: cookie.get("signIn")?.accessToken || "",
  };

  const { data, isLoading, error } = useQuery(
    ["thankYouPageOrderInfo"],
    () => fetchThankYouPageOrderInfo(thankYouPageOrderInfoPayload),
    { enabled: !!router.query.orderNumber, refetchInterval: 30000 }
  );

  useEffect(() => {
    if (
      storeType === StoreTypes.WARUNG_STORETYPE &&
      props.orderDetails &&
      props.orderDetails?.orderId !== null
    ) {
      cookie.set(`lastOrderId`, props.orderDetails?.orderId, {
        path: "/",
      });
    }
  }, []);
  //Background full grey
  return (
    <>
      <SEO
        title="Order Payment Status"
        keywords=""
        description="Order Payment Status"
      />
      <PaymentRedirect
        orderDetails={data}
        // checking={props.checking}
      />
    </>
  );
}

export default PaymentRedirectScreen;

export async function getServerSideProps(context) {
  const { payment, orderNumber, paymentNumber } = context.query;
  const queryClient = new QueryClient();
  const { domain } = getDomainForSSR(context);
  let signInInfo = "";
  let merchantId = "";
  let merchantJsonData = null;

  merchantJsonData = await getMerchantData(domain);
  signInInfo = context?.req?.cookies["signIn"];
  merchantId = merchantJsonData?.merchantId;
  if (!!!merchantId) {
    merchantId = context?.req?.cookies["merchantId"];
  }

  if (
    [
      "payment-success",
      "payment-failed",
      "order-expired",
      "payment-confirmation",
    ].includes(payment)
  ) {
    // checking params

    //paymentNumber only passed in for eGHL case
    // if (!paymentNumber || !orderNumber) {
    if (!orderNumber) {
      return { notFound: true };
    }

    let params = {
      domain: domain,
      orderNumber: orderNumber,
      accessToken:
        signInInfo !== undefined ? JSON.parse(signInInfo).accessToken : "",
    };

    await queryClient.prefetchQuery(["thankYouPageOrderInfo"], () =>
      fetchThankYouPageOrderInfo(params)
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } else {
    const defaultPath =
      merchantJsonData?.storeType === StoreTypes.WHATSAPP_CRM_STORETYPE
        ? "/404"
        : "/";
    let mappedUrl = defaultPath;

    let convertedShortenUrl = await checkForShortenUrl(
      context.resolvedUrl,
      domain
    );
    mappedUrl = convertedShortenUrl ? convertedShortenUrl : mappedUrl;

    return {
      redirect: {
        destination: mappedUrl,
      },
    };
  }
}

const SHORTEN_URL_REGEX_PATTERN = /^\/[a-zA-Z0-9]{7}$/;
const checkForShortenUrl = async (path: string, domain: string) => {
  let returnedUrl = null as IUrlMapping;
  if (SHORTEN_URL_REGEX_PATTERN.test(path)) {
    const fullUrl = "https://" + domain + path;
    returnedUrl = await getUrlMappings(fullUrl);
  }
  return returnedUrl?.pageLink;
};
