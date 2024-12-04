// component
import Faq from "@/components/faq/Faq";
import SEO from "@/components/seo/SEO";
import { isLocalHost } from "@/utils/util";

// API
import { API, graphqlOperation, withSSRContext } from "aws-amplify";
import { getFaqList } from "@/graphql/queries";

// rest api
import { getMerchantData } from "../apis/merchant";

import { getDomainForSSR } from "@/utils/util";

const FaqScreen = (props) => {
  return (
    <>
      <SEO title="FAQ" keywords="" description="FAQ" />
      <Faq faqList={props.faqList ? props.faqList : []} />
    </>
  );
};

export default FaqScreen;

// get faq info
export async function getServerSideProps(context) {
  const { domain } = getDomainForSSR(context);

  let merchantId = "";
  if (context.req.cookies["merchantId"]) {
    merchantId = context.req.cookies["merchantId"];
  } else {
    const merchantJsonData = await getMerchantData(domain);
    merchantId = merchantJsonData.merchantId;
  }

  try {
    const params = {
      domain: domain,
    };
    const SSR = withSSRContext();
    const res = await API.graphql(graphqlOperation(getFaqList, params));
    if (
      res.data.getFaqList.status &&
      res.data.getFaqList.categories.length > 0
    ) {
      return {
        props: {
          faqList: res.data.getFaqList,
        },
      };
    } else {
      return { notFound: true };
    }
  } catch (error) {
    return { notFound: true };
  }
}
