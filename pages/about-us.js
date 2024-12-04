import { useContext } from "react";
// components
import SEO from "@/components/seo/SEO";
import { getDomainForSSR } from "../utils/util";
// API
import { API, graphqlOperation } from "aws-amplify";
import { getMerchantDetails } from "@/graphql/queries";

//context
import MerchantContext from "@/contexts/MerchantContext";
import DynamicRenderer from "../components/DynamicRenderer/DynamicRenderer";
import dynamic from "next/dynamic";
const AboutUsTLM = dynamic(() => import("../components/aboutUs/AboutUsTLM"));
const AboutUs = dynamic(() => import("../components/aboutUs/AboutUs"));

const AboutUsScreen = (props) => {
  const merchantInfoContext = useContext(MerchantContext);
  const stores = merchantInfoContext.contactUsInfo?.stores
    ? merchantInfoContext.contactUsInfo.stores
    : [];
  return (
    <>
      <SEO title="About Us" keywords="" description="About Us" />
      <DynamicRenderer
        componentMap={{ AboutUs, AboutUsTLM }}
        structure={props?.layout}
        rootClassNames={"w-screen"}
        dynamicProps={{
          AboutUs: { info: merchantInfoContext },
          AboutUsTLM: { stores },
        }}
      />
    </>
  );
};

export async function getServerSideProps(context) {
  const { domain } = getDomainForSSR(context);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ECS_API_ENDPOINT}/getLayout`,
    {
      headers: { "Content-Type": "application/json" },
      referrerPolicy: "no-referrer",
      credentials: "same-origin",
      redirect: "follow",
      cache: "no-cache",
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        merchantId: domain,
        pageType: "about-us",
      }),
    }
  );

  const { body, statusCode } = await response.json();
  let res = body.layout;
  if (statusCode !== 200)
    res = [
      {
        sectionName: "RichText",
        isFullWidth: false,
        sectionStyles: "mt-14",
        children: [
          {
            gridStyles: "col-span-12",
            blockType: "AboutUs",
            blockProps: {},
          },
        ],
      },
    ];

  return {
    props: {
      layout: res,
    },
  };
}

export default AboutUsScreen;
