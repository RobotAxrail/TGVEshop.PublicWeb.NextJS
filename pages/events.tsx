import DynamicRenderer from "@/components/DynamicRenderer/DynamicRenderer";
import SEO from "@/components/seo/SEO";
import { getDomainForSSR } from "@/utils/util";
import dynamic from "next/dynamic";
const EventSection = dynamic(
  () => import("../components/landing-page-components/EventSection")
);

export default function Events(props) {
  return (
    <div>
      <SEO title={"Events"} description="All Events" keywords={""} />
      <DynamicRenderer
        componentMap={{ EventSection }}
        structure={props?.layout}
        dynamicProps={{}}
      />
    </div>
  );
}

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
        pageType: "events",
      }),
    }
  );

  const { body, statusCode } = await response.json();
  let res = body.layout;
  // Return s the default layout if no layout is found
  if (statusCode !== 200) res = null;
  if (!res || res.length < 1) return { notFound: true };
  return {
    props: {
      layout: res,
    },
  };
}
