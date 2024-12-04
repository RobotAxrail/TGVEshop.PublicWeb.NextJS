import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import useSWR, { SWRConfig } from "swr";
import { getDomainForSSR, isLocalHost } from "../utils/util";

// component
import Home from "@/components/home/Home";
import SEO from "@/components/seo/SEO";
// import LandingPage from "@/components/landingPage/LandingPage";
import WarungLandingPage from "@/components/landingPage/WarungLandingPage";
//constants
import { StoreTypes } from "@/enums/enums";
// API
import { API, graphqlOperation } from "aws-amplify";
import awsExports from "../aws-exports";
import {
  getLandingPageBannerCache,
  getShopByCategoryCache,
  getHomeScreenCollectionCache,
  getFeaturedHomeCollectionCache,
} from "@/graphql/queries";

//Content
import { generateAdwordPayload } from "@/apis/anaytics";
import { compare, isQLEggs } from "@/utils/util.js";
import Cookies from "universal-cookie";
// contexts
import MerchantContext from "@/contexts/MerchantContext";
import { useStoreOperatingHour } from "@/contexts/StoreOperatingHourContext";
import useMultiStoreDelivery from "@/components/AxrailCommerce/MultiStoreDeliverySelector/hooks/useMultiStoreDelivery";
import { useAuth } from "@/contexts/AuthContext";
import { useOrder } from "@/contexts/OrderContext";

const HomeScreen = (props) => {
  const merchantInfoContext = useContext(MerchantContext);
  const { landingPageData, landingPageFetchStatus } = useStoreOperatingHour();
  const { isAuthenticated } = useAuth();
  const { orderType } = useOrder();
  const { deliveryMode } = useMultiStoreDelivery();

  // const { data } = [];
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [landingPageProductList, setLandingPageProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [bannerList, setBannerList] = useState([]);
  const [installable, setInstallable] = useState(false);
  const [multiStoreOrderType, setMultiStoreOrderType] = useState("pickup");
  const [initial, setInitial] = useState(true);
  let deferredPrompt;
  // const [landingPageData, setLandingPageData] = useState({
  //   address: "",
  //   operatingHours: [],
  // });

  const cookie = new Cookies();
  const IS_QL_EGGS = Boolean(isQLEggs(merchantInfoContext.domain));

  useEffect(() => {
    initialFetch();
  }, []);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      setInstallable(true);
    });

    window.addEventListener("appinstalled", () => {
      // Log install to analytics
      console.log("INSTALL: Success");
    });
  }, []);

  const initialFetch = async () => {
    setIsLoading(true);
    await generateAdwordPayload("/", "", merchantInfoContext?.merchantId);
    if (merchantInfoContext.storeType !== StoreTypes.WARUNG_STORETYPE) {
      getPlatform();
      await Promise.all([
        getHomeScreenCollectionCacheList(),
        getFeaturedItemList(),
        getCategoryList(),
        getBannerList(),
        setInitial(false),
      ]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const signInInfo = cookie.get("signIn");
    if (router.query.source === "email") {
      if (signInInfo && signInInfo.refreshToken) {
        router.push("/view-cart");
      } else {
        router.push({
          pathname: "/login",
          query: { source: "email" },
        });
      }
    }
  }, []);

  useEffect(() => {
    if (merchantInfoContext.storeType === StoreTypes.MULTISTORE_STORETYPE)
      setMultiStoreOrderType(deliveryMode);
  }, [deliveryMode]);

  useEffect(async () => {
    if (
      initial == false &&
      merchantInfoContext.storeType !== StoreTypes.WARUNG_STORETYPE
    ) {
      await Promise.all([getHomeScreenCollectionCacheList()]);
      setIsLoading(false);
    }
  }, [multiStoreOrderType, orderType]);

  // const fetchStoreOperatingHoursAndPickUpAddress = async () => {
  //   let response = await getStoreOperatingHours(
  //     merchantInfoContext?.merchantId
  //   );
  //   if (response) setLandingPageData(response);
  // };

  //Landing product
  const getHomeScreenCollectionCacheList = async () => {
    try {
      var params = {
        storeId:
          merchantInfoContext.storeType === StoreTypes.MULTISTORE_STORETYPE
            ? JSON.parse(localStorage.getItem("fam@storeSelection"))
              ? deliveryMode === "delivery"
                ? JSON.parse(localStorage.getItem("fam@storeSelection"))
                    .deliveryStoreData.selectedStoreId
                : JSON.parse(localStorage.getItem("fam@storeSelection"))
                    .pickupStoreData.storeId
              : merchantInfoContext.storeId
            : merchantInfoContext.storeId,
      };
      if (merchantInfoContext.storeType === StoreTypes.MULTISTORE_STORETYPE) {
        params["orderType"] = multiStoreOrderType;
      } else if (merchantInfoContext.storeType === StoreTypes.AC_STORETYPE) {
        params["orderType"] = orderType === "Delivery" ? "delivery" : "pickup";
      }
      if (isLocalHost()) {
        params["merchantId"] = merchantInfoContext.merchantId;
      }
      const { data } = await API.graphql(
        graphqlOperation(getHomeScreenCollectionCache, params)
      );
      let collectionList =
        data?.getHomeScreenCollectionCache.collectionsAndItems;
      if (Array.isArray(collectionList)) {
        setLandingPageProductList(collectionList);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  };
  //Banner
  const getBannerList = async () => {
    try {
      var params = {
        merchantId: merchantInfoContext.merchantId,
      };
      let res = await API.graphql(
        graphqlOperation(getLandingPageBannerCache, isLocalHost() ? params : {})
      );
      if (res.data.getLandingPageBannerCache) {
        if (res.data.getLandingPageBannerCache.banners) {
          let data = res.data.getLandingPageBannerCache.banners;
          if (Array.isArray(data)) {
            data.sort(compare);
            setBannerList(data);
          }
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  //Get Product
  const getFeaturedItemList = async () => {
    try {
      var params = {
        storeId: merchantInfoContext.storeId,
      };
      if (isLocalHost()) {
        params["merchantId"] = merchantInfoContext.merchantId;
      }
      const { data } = await API.graphql(
        graphqlOperation(getFeaturedHomeCollectionCache, params)
      );
      if (data?.getFeaturedHomeCollectionCache) {
        const featuredLists =
          data?.getFeaturedHomeCollectionCache.homeCollections;
        if (Array.isArray(featuredLists)) {
          setFeaturedItems(featuredLists);
        }
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  //Category
  const getCategoryList = async () => {
    try {
      var params = {
        merchantId: merchantInfoContext.merchantId,
      };
      let { data } = await API.graphql(
        graphqlOperation(getShopByCategoryCache, isLocalHost() ? params : {})
      );
      if (data?.getShopByCategoryCache) {
        let homeCollectionList = data?.getShopByCategoryCache.homeCollections;
        if (Array.isArray(homeCollectionList)) {
          setCategoryList(homeCollectionList);
        }
      } else {
        setCategoryList([]);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // Warung menu redirect
  const handleMenuRedirect = () => {
    router.push("/collections-menu");
    window.dataLayer.push({
      event: "orderTypeClicked",
      orderType: orderType,
    });
  };

  // Warung order redirect
  const handleToOrder = () => {
    const signInInfo = cookie.get("signIn");
    if (signInInfo && signInInfo.refreshToken && isAuthenticated) {
      router.push("/order");
    } else {
      const lastOrderId = cookie.get("lastOrderId");
      if (lastOrderId) {
        router.push(`/order/${lastOrderId}`);
      } else {
        router.push({
          pathname: "/login",
          query: `to=order`,
        });
      }
    }
  };

  // bookmark tutorial redirect
  const handleToBookmark = () => {
    // Hide the app provided install promotion
    setInstallable(false);
    // Show the install prompt
    if (deferredPrompt) {
      deferredPrompt.prompt();
    }
    // Wait for the user to respond to the prompt
    deferredPrompt?.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
    });
  };

  // get platform
  const getPlatform = () => {
    let platform = router.query.platform;
    if (platform === "tngmp") {
      // setPlatform("tngmp");
      try {
        // eslint-disable-next-line no-undef
        let res = my.getStorage({ key: "token" });
        // eslint-disable-next-line no-undef
        my.postMessage({
          action: "test",
          body: res,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      // setPlatform("ecommerce");
    }
  };

  return (
    <>
      <SEO title="Home" keywords="" description="Home" />
      {merchantInfoContext.storeType !== StoreTypes.WARUNG_STORETYPE ? (
        <Home
          layout={props?.layout}
          isLoading={isLoading}
          loading={loading}
          setLoading={setLoading}
          bannerList={bannerList}
          categoryList={categoryList}
          featuredItems={featuredItems}
          landingPageProduct={landingPageProductList}
          isQLEggs={IS_QL_EGGS}
        />
      ) : (
        <WarungLandingPage
          landingPageData={landingPageData}
          landingPageFetchStatus={landingPageFetchStatus}
          handleMenuRedirect={handleMenuRedirect}
          handleToBookmark={handleToBookmark}
          phone={merchantInfoContext.phone}
          handleToOrder={handleToOrder}
        />
      )}
    </>
    // <pre>{JSON.stringify(data, null, 2)}</pre>
  );
};

export default HomeScreen;

// TODO
// landing page 5 col -> 3
// new section
// mobile view & desktop view

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
        pageType: "/",
      }),
    }
  );

  // const { body, statusCode } = await response.json();
  // let res = body.layout;
  // // Return s the default layout if no layout is found
  // if (statusCode !== 200)
  //   res = [
  //     {
  //       sectionName: "Carousel",
  //       isFullWidth: false,
  //       sectionStyles: isQLEggs(domain) ? "mt-20" : "",
  //       children: [
  //         {
  //           blockType: "BannerCarousel",
  //           gridStyles: "col-span-12",
  //           blockProps: {},
  //         },
  //       ],
  //     },
  //     {
  //       sectionName: "CategorySection",
  //       isFullWidth: false,
  //       sectionStyles: "",
  //       children: [
  //         {
  //           gridStyles: "col-span-12",
  //           blockType: "CategorySection1",
  //           blockProps: {},
  //         },
  //       ],
  //     },
  //     {
  //       sectionName: "FeaturedSection",
  //       isFullWidth: false,
  //       sectionStyles: "",
  //       children: [
  //         {
  //           blockType: "Featured1",
  //           gridStyles: "col-span-12",
  //           blockProps: {},
  //         },
  //       ],
  //     },
  //     {
  //       sectionName: "ProductSection",
  //       isFullWidth: false,
  //       sectionStyles: "",
  //       children: [
  //         {
  //           blockType: "ProductSection1",
  //           gridStyles: "col-span-12 mt-10",
  //           blockProps: {},
  //         },
  //       ],
  //     },
  //   ];

  return {
    props: {
      // layout: res,
    },
  };
}
