import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import Script from "next/script";

// components
import SingleStoreFullfilmentContext from "../components/AxrailCommerce/SingleStoreFullfilmentSelector/context/SingleStoreFullfilmentContext";
import { VoucherStoreProvider } from "../modules/rewards/components/context/VoucherStoreContext";
import Layout from "@/components/layouts/Layout";
import PrivateRoute from "@/components/privateRoute/PrivateRoute";
import Maintenance from "@/components/maintenance/Maintenance";

// styles
import "../styles/globals.scss";

// font awesome library icons
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

// APIs
import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports";

//if (!window.location.hostname.includes("localhost") && !window.location.hostname.includes(".vfs.cloud9.ap-southeast-1.amazonaws.com")) {
// let apiKey = awsExports.aws_appsync_apiKey;
// awsExports.API = {
//   graphql_endpoint: "https://ecomapi.fam-stg.click/graphql",
//   graphql_headers: async () => {
//     return {
//       Origin: "https://indonesiakitchen01.uranus.ewarung.app/",
//       "Content-Security-Policy": "default-src self",
//       "X-Frame-Options": "SAMEORIGIN",
//       "x-api-key": apiKey,
//     };
//   },
// };
//}

Amplify.configure({ ...awsExports });

// contexts
import { AuthContextProvider } from "@/contexts/AuthContext";
import { WishlistContextProvider } from "@/contexts/WishlistContext";
import { CartContextProvider } from "@/contexts/CartContext";

import { StoreOperatingHourContextProvider } from "@/contexts/StoreOperatingHourContext";
import { OrderContextProvider } from "@/contexts/OrderContext";
import { LocationProvider } from "@/contexts/LocationContext";

import MerchantContext from "@/contexts/MerchantContext";
import { CartProvider } from "@/contexts/EShopCartContext";
import { SearchProvider } from "@/contexts/SearchContext";
//constants
import { StoreTypes } from "@/enums/enums";

import { appRoutes } from "@/enums/appRoutes";

// localization
import { IntlProvider } from "react-intl";
import { locale } from "@/enums/locale.mapper";

import NProgress from "nprogress";
import "@/styles/nprogress.css";
import "@/styles/calendar.scss";

const enMessage = require("@/languages/en.json");
const cnMessage = require("@/languages/cn.json");

const messageMapper = {
  [locale.en]: enMessage,
  [locale["zh-cn"]]: cnMessage,
};
import { getSiteNavs } from "@/apis/siteNavs";
import { getSplashScreen } from "@/apis/splashScreen";
import { getFaq } from "@/apis/faqList";

import { v4 as uuidv4 } from "uuid";

// rest api
import { getMerchantData } from "@/apis/merchant";
import Custom404 from "./404";
import { getContactUs } from "@/apis/contactUs";

import { getDomainForSSR } from "../utils/util";

import MultiStoreDeliveryProvider from "@/components/AxrailCommerce/MultiStoreDeliverySelector/context/MultiStoreDeliveryProvider";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const swrOptionParameters = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshWhenOffline: false,
  refreshWhenHidden: false,
  refreshInterval: 0,
};

function MyApp({ Component, pageProps, props }) {
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());

  // if (props.status && props.status !== 200) {
  //   return <Custom404 showButton={false} />;
  // }

  var siteNavs,
    headerList,
    footerList,
    splashScreenList,
    faqList,
    contactUsInfo;

  // if (
  //   props.response.storeType === StoreTypes.AC_STORETYPE ||
  //   props.response.storeType === StoreTypes.MULTISTORE_STORETYPE ||
  //   props.response.storeType === StoreTypes.B2B_STORETYPE
  // ) {
  //   ({ siteNavs, headerList, footerList } = getSiteNavs(
  //     props.response.merchantId,
  //     swrOptionParameters
  //   ));
  //   ({ splashScreenList } = getSplashScreen(
  //     props.response.merchantId,
  //     swrOptionParameters
  //   ));
  //   ({ faqList } = getFaq(props.response.merchantId, swrOptionParameters));
  //   ({ contactUsInfo } = getContactUs(
  //     props.response.merchantId,
  //     swrOptionParameters
  //   ));
  // }

  // localization
  const [messages, setMessages] = useState(enMessage);

  // const protectedRoutes = [
  //   appRoutes.ORDER,
  //   appRoutes.MY_PROFILE,
  //   appRoutes.ADDRESS_BOOK,
  //   appRoutes.EDIT_ADDRESS_BOOK,
  //   appRoutes.WISHLIST,
  //   // "/point-history",
  // ];
  const protectedRoutes = [];

  // useEffect(() => {
  //   localStorage.setItem("fam@siteConfigInfo", JSON.stringify(props.response));
  //   localStorage.setItem("appBarLayout", JSON.stringify(props?.aCAppBarLayout));
  //   localStorage.setItem("footerLayout", JSON.stringify(props?.aCFooterLayout));
  // }, []);

  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`);
      NProgress.start();
      document.body.scrollTo(0, 0);
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  const [merchantData, setMerchantData] = useState({
    ...props.response,
    faqList: faqList,
    contactUsInfo: contactUsInfo,
  });

  function updateMerchantData(u) {
    // Use this function to update the storeID
    setMerchantData((p) => ({ ...p, ...u }));
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps?.dehydratedState}>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <IntlProvider
            messages={messages}
            locale={"en"}
            defaultLocale={locale.en}
          >
            {process.env.NEXT_PUBLIC_MAINTENANCE ? (
              <Maintenance />
            ) : (
              <MerchantContext.Provider
                value={{
                  updateMerchantData,
                  ...merchantData,
                }}
              >
                <LocationProvider>
                  <SearchProvider>
                    <AuthContextProvider>
                      <StoreOperatingHourContextProvider>
                        <OrderContextProvider>
                          <MultiStoreDeliveryProvider>
                            <CartContextProvider>
                              <CartProvider>
                                <WishlistContextProvider>
                                  <SingleStoreFullfilmentContext>
                                    <VoucherStoreProvider>
                                      <Layout
                                        // setting={props.response}
                                        setting={{
                                          siteFont:
                                            props.response?.siteFont ||
                                            "Helvetica",
                                          siteColor:
                                            props.response?.siteColor ||
                                            "#42a5f5",
                                          layoutBgColor:
                                            props.response?.layoutBgColor ||
                                            "#111111",
                                          fontColor:
                                            props.response?.fontColor ||
                                            "#F4F4F5",
                                        }}
                                        headerList={headerList}
                                        footerList={footerList}
                                        splashScreenList={splashScreenList}
                                        faqList={faqList}
                                        contactUsInfo={contactUsInfo}
                                        routePath={router.route}
                                        // aCFooterLayout={
                                        //   props?.aCFooterLayout ||
                                        //   JSON.parse(
                                        //     localStorage.getItem("footerLayout")
                                        //   )
                                        // }
                                        // aCAppBarLayout={
                                        //   props?.aCAppBarLayout ||
                                        //   JSON.parse(
                                        //     localStorage.getItem("appBarLayout")
                                        //   )
                                        // }
                                      >
                                        {/* {loading ? <h1>Loading...</h1> : <Component {...pageProps} />} */}
                                        <PrivateRoute
                                          protectedRoutes={protectedRoutes}
                                        >
                                          <Component
                                            {...pageProps}
                                            key={
                                              router.pathname.includes("search")
                                                ? router.pathname
                                                : `${
                                                    router.asPath
                                                  }-${new Date()}`
                                            }
                                          />
                                        </PrivateRoute>
                                      </Layout>
                                    </VoucherStoreProvider>
                                  </SingleStoreFullfilmentContext>
                                </WishlistContextProvider>
                              </CartProvider>
                            </CartContextProvider>
                          </MultiStoreDeliveryProvider>
                        </OrderContextProvider>
                      </StoreOperatingHourContextProvider>
                    </AuthContextProvider>
                  </SearchProvider>
                </LocationProvider>
              </MerchantContext.Provider>
            )}
          </IntlProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

MyApp.getInitialProps = async ({ ctx }) => {
  if (ctx.req) {
    // first time open web server side render
    const { domain } = getDomainForSSR(ctx);
    // const domain = ctx.req.headers["x-forwarded-host"];
    let exdate = new Date();
    exdate.setFullYear(exdate.getFullYear() + 10); // set cookie to expire in 10 years
    let cookieList = [];

    const merchantJsonData = await getMerchantData(domain);

    if (merchantJsonData?.storeType) {
      if (ctx.req.cookies["sessionId"] === undefined) {
        cookieList.push(
          `sessionId=${uuidv4()}; path=/; expires=${exdate}; max-age=${
            31536000 * 10
          };` // 10 years, max-age is in seconds
        );
      }
    } else {
      return {
        props: {
          status: 400,
        },
      };
    }

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
          pageType: "app-bar",
        }),
      }
    );

    const footerResponse = await fetch(
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
          pageType: "footer",
        }),
      }
    );

    // const { body: footerBody, statusCode: footerStatusCode } =
    //   await footerResponse.json();
    // let footerRes = footerBody.layout;
    // if (!footerRes)
    //   footerRes = [
    //     {
    //       sectionName: "normal-footer",
    //       isFullWidth: true,
    //       children: [
    //         {
    //           gridStyles: "col-span-12",
    //           blockType: "DefaultFooter",
    //           blockProps: {},
    //         },
    //       ],
    //     },
    //   ];

    // const { body } = await response.json();
    // let res = body.layout;
    // if (!res)
    //   res = [
    //     {
    //       sectionName: "normal-app-header",
    //       isFullWidth: true,
    //       sectionStyles: `bg-primary h-auto w-full z-30`,
    //       children: [
    //         {
    //           gridStyles: "col-span-12",
    //           blockType: "DynamicRenderer",
    //           blockProps: {
    //             structure: [
    //               {
    //                 sectionName: "InnerElements",
    //                 sectionStyles: "h-[92px] max-w-6xl mx-auto",
    //                 isFullWidth: true,
    //                 children: [
    //                   {
    //                     gridStyles: "col-span-3",
    //                     blockType: "StartSection1",
    //                     blockProps: {},
    //                   },
    //                   {
    //                     blockType: "NavigationSection1",
    //                     gridStyles: "col-span-6",
    //                     blockProps: {},
    //                   },
    //                   {
    //                     gridStyles: "col-span-3",
    //                     blockType: "EndSection1",
    //                     blockProps: {},
    //                   },
    //                 ],
    //               },
    //             ],
    //           },
    //         },
    //       ],
    //     },
    //   ];

    if (merchantJsonData.siteFont === null)
      merchantJsonData.siteFont = "Helvetica";
    if (merchantJsonData.siteColor === null)
      merchantJsonData.siteColor = "#42a5f5";
    if (merchantJsonData.siteNotificationBarColor === null)
      merchantJsonData.siteNotificationBarColor = "#039c5c";
    if (merchantJsonData.currency === null) merchantJsonData.currency = "MYR";
    // temporary hardcode change header footer font color for specific merchant
    switch (domain) {
      case "tlm-foodfair.fam-dev.click":
        merchantJsonData.layoutBgColor = "#ffffff";
        merchantJsonData.siteFont = "Fira Sans";
        break;
      case "tlm-foodfair.fam-stg.click":
        merchantJsonData.layoutBgColor = "#ffffff";
        merchantJsonData.siteFont = "Fira Sans";
        break;
      case "botanicsfloristry.axrailcommerce.com":
        merchantJsonData.headerFooterFontColor = "#0000000";
        merchantJsonData.layoutBgColor = "#ffffff";
        break;
      case "m5.fam-stg.click":
        merchantJsonData.headerFooterFontColor = "#0000000";
        merchantJsonData.layoutBgColor = "#ffffff";
        break;
      case "m1.fam-dev.click":
        merchantJsonData.headerFooterFontColor = "#0000000";
        merchantJsonData.layoutBgColor = "#ffffff";
        break;
      case "klaseek.axrailcommerce.com" && "growingdesserts.axrailcommerce.com":
        merchantJsonData.headerFooterFontColor = "#0000000";
        break;
      case "www.merakibeauty.com.my":
        merchantJsonData.headerFooterFontColor = "#964B00";
        break;
      case "jstore.fam-dev.click":
        merchantJsonData.headerFooterFontColor = "#ffffff";
        res = [
          {
            sectionStyles: `bg-primary h-auto w-full`,
            sectionName: "ql-app-header",
            isFullWidth: true,
            children: [
              {
                gridStyles: "col-span-12",
                blockType: "QLEggsHeader",
                blockProps: {},
              },
            ],
          },
        ];
        break;
      case "qleggs.axrailcommerce.com":
        merchantJsonData.headerFooterFontColor = "#ffffff";
        res = [
          {
            sectionStyles: `bg-primary h-auto w-full`,
            sectionName: "ql-app-header",
            isFullWidth: true,
            children: [
              {
                gridStyles: "col-span-12",
                blockType: "QLEggsHeader",
                blockProps: {},
              },
            ],
          },
        ];
        break;
      case "qlstore.fam-stg.click":
        merchantJsonData.headerFooterFontColor = "#ffffff";
        res = [
          {
            sectionStyles: `bg-primary h-auto w-full`,
            sectionName: "ql-app-header",
            isFullWidth: true,
            children: [
              {
                gridStyles: "col-span-12",
                blockType: "QLEggsHeader",
                blockProps: {},
              },
            ],
          },
        ];
        break;
      default:
        merchantJsonData.headerFooterFontColor = "#ffffff";
        break;
    }
    merchantJsonData.domain = domain;

    ctx.res.setHeader("set-cookie", [
      ...cookieList,
      `merchantId=${
        merchantJsonData.merchantId
      }; path=/; expires=${exdate}; max-age=${31536000 * 10};`,
    ]);

    return {
      props: {
        response: merchantJsonData,
        status: merchantJsonData.status,
        // aCFooterLayout: footerRes,
        // aCAppBarLayout: res,
      },
    };
  } else {
    // when change router path, client side changes
    return {
      props: {
        // response: JSON.parse(localStorage.getItem("fam@siteConfigInfo")),
      },
    };
  }
};

export default MyApp;
