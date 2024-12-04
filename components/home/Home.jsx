import DynamicRenderer from "../DynamicRenderer/DynamicRenderer";
import { Loader } from "@/components/loader/Loader";
import dynamic from "next/dynamic";

const Newsletter2 = dynamic(() =>
  import("@/components/home/variants/newsletter/Newsletter2")
);
const CategorySection1 = dynamic(() =>
  import("@/components/home/variants/category/CategorySection1")
);
const ProductSection1 = dynamic(() =>
  import("@/components/home/variants/products/ProductSection1")
);
const Featured1 = dynamic(() =>
  import("@/components/home/variants/featured/FeaturedSection1")
);
const BannerCarousel = dynamic(() =>
  import("@/components/bannerCarousel/BannerCarousel")
);
const CategorySection2 = dynamic(() =>
  import("@/components/home/variants/category/CategorySection2")
);
const ProductSection2 = dynamic(() =>
  import("@/components/home/variants/products/ProductSection2")
);
// const Featured2 = dynamic(() =>
//   import("@/components/home/variants/featured/FeaturedSection2")
// );
const BannerCarousel2 = dynamic(() =>
  import("@/components/home/variants/banner/BannerCarousel2")
);

const HeroSection = dynamic(() =>
  import("@/components/landing-page-components/HeroSection")
);
const StatsSection = dynamic(() =>
  import("@/components/landing-page-components/StatsSection")
);
const FeatureSection = dynamic(() =>
  import("@/components/landing-page-components/FeatureSection")
);
const NewsletterSection = dynamic(() =>
  import("@/components/landing-page-components/NewsletterSection")
);
const EventSection = dynamic(() =>
  import("@/components/landing-page-components/EventSection")
);

function Divider() {
  return <div className="w-full bg-primary h-[1px] my-10" />;
}

function Home(props) {
  const {
    isLoading,
    loading,
    setLoading,
    bannerList,
    categoryList,
    featuredItems,
    landingPageProduct,
    setItem,
    layout,
    isQLEggs,
  } = props;

  if (isLoading)
    return (
      <div className="min-h-screen flex flex-row items-center justify-center">
        <div className="mt-[-96px]">
          <Loader />
        </div>
      </div>
    );
  else
    return (
      <div className="overflow-x-hidden scrolling-touch">
        <DynamicRenderer
          structure={layout}
          componentMap={{
            CategorySection2,
            NewsletterSection,
            CategorySection1,
            ProductSection1,
            ProductSection2,
            BannerCarousel2,
            BannerCarousel,
            FeatureSection,
            Newsletter2,
            HeroSection,
            StatsSection,
            EventSection,
            Featured1,
            Divider,
          }}
          dynamicProps={{
            CategorySection2: { categoryList },
            CategorySection1: { categoryList },
            Featured1: { list: featuredItems },
            BannerCarousel2: { bannerList },
            ProductSection1: { landingPageProduct, isQLEggs },
            ProductSection2: { landingPageProduct },
            Newsletter2: {
              bannerImage: `${process.env.BUCKET_URL}${bannerList[0]?.homeImage}`,
            },
            BannerCarousel: {
              setLoading,
              bannerList,
              loading,
            },
          }}
        />
      </div>
    );
}

export default Home;
