// components
import BannerDetail from "@/components/bannerDetail/BannerDetail";
import SEO from "@/components/seo/SEO";

// API
import { API, graphqlOperation, withSSRContext } from "aws-amplify";
import { getLandingPageBannerDetail } from "@/graphql/queries";

// rest api
import { getMerchantData } from "../../apis/merchant";
import { getDomainForSSR } from "@/utils/util";

const BannerDetailScreen = (props) => {
  return (
    <>
      <SEO title={props.data.title} keywords="" description="Banner" />
      <BannerDetail itemData={props.data} />
    </>
  );
};

export default BannerDetailScreen;

export async function getServerSideProps(context) {
  const { domain } = getDomainForSSR(context);

  try {
    let params = {
      domain: domain,
      seoUrl: "banner/" + context.params.bannerId,
    };
    const SSR = withSSRContext();
    const res = await API.graphql(
      graphqlOperation(getLandingPageBannerDetail, params)
    );
    if (res.data.getLandingPageBannerDetail.status) {
      return {
        props: {
          data: res.data.getLandingPageBannerDetail.bannerDetail,
        },
      };
    } else {
      return { notFound: true };
    }
  } catch (err) {
    return { notFound: true };
  }
}
