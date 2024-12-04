import { useEffect, useContext } from "react";
import SplashScreen from "@/components/splashScreen/SplashScreen";
import ACHeader from "@/components/header/ACHeader";
import EwarungHeader from "@/components/header/EwarungHeader";
import Footer from "@/components/footer/Footer";
import { FloatingButton, FloatingButtonEShop } from "@/components/buttons/Buttons";
import Toast from "@/components/alert/Toast";
import OrderModeDialog from "@/components/orderModeDialog/OrderModeDialog";
import { useOrder } from "@/contexts/OrderContext";
import MerchantContext from "@/contexts/MerchantContext";
import { StoreTypes } from "@/enums/enums";
import DynamicRenderer from "../DynamicRenderer/DynamicRenderer";
import FooterSection from "../landing-page-components/FooterSection";
import { isQLEggs } from "@/utils/util";
import WhatsAppCRMHeader from "../header/WhatsAppCRMHeader";

const Layout = ({
  children,
  setting = {
    siteFont: "Helvetica", // Default font
    siteColor: "#42a5f5",  // Default site color
    layoutBgColor: "#111111", // Default background color
    fontColor: "#F4F4F5",  // Default font color
  },
  policies,
  appContext,
  headerList,
  footerList,
  splashScreenList,
  routePath,
  aCAppBarLayout,
  aCFooterLayout,
  faqList,
  contactUsInfo,
}: any) => {
  const { orderModalState, dispatchOrderModalState } = useOrder();
  const { storeType, domain } = useContext(MerchantContext);
  const isWarung = storeType === StoreTypes.WARUNG_STORETYPE;
  const IS_WHATSAPP_CRM = storeType === StoreTypes.WHATSAPP_CRM_STORETYPE;
  const IS_QL_EGGS = Boolean(isQLEggs(domain));


  const checkPath = (path: string) => {
    // mobile using store-locator
    let storeLocator = "/store-locator";
    let memberProfile = "/membership-profile";
    let customerSentiment = "/customer-sentiment";
    let cloudPaymentSuccess = "/cloud_payment_success";
    let cloudPaymentFailed = "/cloud_payment_failed";

    if (
      path.includes(storeLocator) ||
      path.includes(memberProfile) ||
      path.includes(customerSentiment) ||
      path.includes(cloudPaymentSuccess) ||
      path.includes(cloudPaymentFailed)
    ) {
      return false;
    } else {
      return true;
    }
  };

  //set --app-height as window.innerHeight in order to get the browser safe area height
  useEffect(() => {
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--app-height", `${window.innerHeight}px`);
    };
    window.addEventListener("resize", appHeight);
    appHeight();

    return () => window.removeEventListener("resize", appHeight);
  }, []);

  return (
    <>
      <style jsx global>
        {`
          :root {
            --display-font: ${setting.siteFont};
            --body-font: ${setting.siteFont};
            --main-bg-color: ${setting.siteColor};
            --layout-bg-color: ${setting?.layoutBgColor || "#F0F0F0"};
            --notification-bg-color: ${setting.siteColor};
            --notification-font-color: #ffffff;
            --header-footer-font-color: ${setting.headerFooterFontColor};
            --rv-primary-color: ${setting.siteColor};
            --font-size: 20px;
            --rv-input-text-color: #f4f4f5
          }
        `}
      </style>
      <Toast isQLEggs={IS_QL_EGGS} />
      <div
        id="main-container"
        className={[
          "min-h-[100dvh] bg-layoutBgColor font-body text-body flex flex-col justify-between",
          // isWarung && "max-w-[25rem] mx-auto",
        ].join(" ")}
      >
        <>
          {!isWarung && checkPath(routePath) && (
            <>
              
              <SplashScreen splashScreenList={splashScreenList} />
            </>
          )}
          {!isWarung && !IS_WHATSAPP_CRM && checkPath(routePath) && (
            <ACHeader
              layout={aCAppBarLayout}
              notificationMessage={setting.notificationMessage}
              dispatchOrderModalState={dispatchOrderModalState}
              siteNav={headerList}
              isWarung={isWarung}
            />
          )}
          {isWarung && routePath !== "/" && (
            <EwarungHeader
              notificationMessage={setting.notificationMessage}
              dispatchOrderModalState={dispatchOrderModalState}
              siteNav={headerList}
              isWarung={isWarung}
            />
          )}
          {IS_WHATSAPP_CRM && <WhatsAppCRMHeader />}
        </>
        <main
          className={
            !isWarung &&
            [
              "/",
              "/collections-menu",
              "/product",
              "/about-us",
              "/customer-sentiment",
              "/membership-profile",
              "/giftcard",
              "/[payment]",
              "/giftcard/share/[giftCardId]",
            ].includes(routePath)
              ? [
                  "relative mx-auto w-screen flex flex-col flex-grow min-h-[100dvh] ",
                  ![
                    "/",
                    "/customer-sentiment",
                    "/membership-profile",
                    "/giftcard",
                    "/[payment]",
                  ].includes(routePath)
                    ? "pt-8"
                    : "",
                ].join(" ")
              : [
                  "relative  mb-auto flex flex-col flex-grow min-h-[100dvh]  ",
                  !(
                    isWarung &&
                    ["/collections-menu", "/giftcard"].includes(routePath)
                  )
                    ? "min-h-[553px]"
                    : "h-full flex flex-col pt-8",
                ].join(" ")
          }
        >
          {children}
        </main>
        {!isWarung && !IS_WHATSAPP_CRM && checkPath(routePath) && (
          <DynamicRenderer
            structure={aCFooterLayout}
            componentMap={{ DefaultFooter: Footer, FooterSection }}
            dynamicProps={{
              DefaultFooter: {
                contactUsInfo,
                footerList,
                faqList,
              },
            }}
          />
        )}
        {/* {isWarung && <EWarungFooter />} */}
      </div>
      {(!isWarung || (isWarung && routePath !== "/") || !IS_QL_EGGS) &&
        orderModalState.view && (
          <OrderModeDialog
            orderModalState={orderModalState}
            dispatchOrderModalState={dispatchOrderModalState}
          />
        )}
    </>
  );
};

export default Layout;
