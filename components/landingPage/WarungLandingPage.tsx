import { useContext, useEffect } from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

//context
import { useOrder } from "@/contexts/OrderContext";
import MerchantContext from "@/contexts/MerchantContext";

import { setToastState } from "@/states/toastBarState";
import { IkdsGetWarungLandingPageRes } from "types";
import eWarungPoweredByLogo from "@/images/eWarung-powered-by-logo.png";
import OrderModeTabs from "./OrderModeTabs";

import bookSVG from "@/images/book.svg";
import bookSelectedSVG from "@/images/book-selected.svg";
import truckSVG from "@/images/truck.svg";
import truckSVGSelected from "@/images/truck-selected.svg";
import shoppingBagSVG from "@/images/shopping-bag.svg";
import shoppingBagSVGSelected from "@/images/shopping-bag-selected.svg";

import phoneCallSVG from "@/images/phone-call.svg";
import starSVG from "@/images/star.svg";
import listSVG from "@/images/list.svg";

import { IOrderMode } from "types";
import WarungLandingBackground from "./WarungLandingBackground";
import WarungLandingOperatingHours from "./WarungLandingOperatingHours";
import EWarungFooter from "../footer/EwarungFooter";

import { OrderTypes } from "@/enums/enums";

interface IWarungLandingPageProps {
  landingPageData: IkdsGetWarungLandingPageRes;
  landingPageFetchStatus: string;
  handleMenuRedirect: () => void;
  handleToBookmark: () => void;
  handleToOrder: () => void;
}

const WarungLandingPage: React.FC<IWarungLandingPageProps> = ({
  landingPageData,
  landingPageFetchStatus,
  handleMenuRedirect,
  handleToBookmark,
  handleToOrder,
}) => {
  const merchantInfoContext = useContext(MerchantContext);
  const { orderType, handleChangeOrderType, tableNumber, setTableNumber } =
    useOrder();
  const { t } = useTranslation("common");

  const orderModeMap = new Map<`${OrderTypes}`, IOrderMode>([
    [
      OrderTypes.DELIVERY,
      {
        title: t("Delivery"),
        unselectedImage: truckSVG,
        selectedImage: truckSVGSelected,
        inputs: [
          {
            id: "1",
            label: t("Delivery Address"),
            inputType: "textarea",
            inputProps: {
              disabled: true,
              value: t("Please configure your address during order"),
              name: "deliveryAddress",
            },
          },
        ],
      },
    ],
    [
      OrderTypes.PICKUP,
      {
        title: t("Pick Up"),
        unselectedImage: shoppingBagSVG,
        selectedImage: shoppingBagSVGSelected,
        inputs: [
          {
            id: "2",
            label: t("Please pickup your food at"),
            inputType: "textarea",
            inputProps: {
              disabled: true,
              value: landingPageData?.address
                ? landingPageData.address
                : t("No address configured by merchant"),
              name: "pickupFood",
            },
          },
        ],
      },
    ],
    [
      OrderTypes.DINEIN,
      {
        title: t("Dine In"),
        unselectedImage: bookSVG,
        selectedImage: bookSelectedSVG,
        inputs: [
          {
            id: "3",
            label: t("Please enter your table number"),
            inputType: "input",
            inputProps: {
              disabled: false,
              value: tableNumber,
              onChange: (e) => setTableNumber(e.target.value),
              name: "tableNumber",
            },
            //remove non alphanumeric values
            validationRegex: /[\W_]+/g,
          },
        ],
      },
    ],
  ]);

  const navigationList: Array<{
    title: string;
    src: string;
    handleOnClick: () => void;
  }> = [
      {
        title: t("Call Us"),
        src: phoneCallSVG,
        handleOnClick: () => window.open(`tel:${merchantInfoContext.phone}`),
      },
      {
        title: t("View Order"),
        src: starSVG,
        handleOnClick: () => handleToOrder(),
      },
      {
        title: t("Bookmark"),
        src: listSVG,
        handleOnClick: () => handleToBookmark(),
      },
    ];

  const handleOrderType = (value: `${OrderTypes}`) => {
    let currentValue = orderType;
    if (value !== currentValue) {
      handleChangeOrderType(value);
    }
  };

  useEffect(() => {
    const showErrorToastIfShopIsClosed = () => {
      if (landingPageData && landingPageData?.warungStoreStatus !== "open") {
        setToastState({
          show: true,
          severity: "error",
          message:
            t("This shop is currently closed, but you can take a look at our menu."),
          autoClose: false,
        });
      }
    };

    showErrorToastIfShopIsClosed();
  }, [landingPageData]);

  useEffect(() => {
    window.dataLayer.push({
      event: "viewStore",
    });
  }, []);

  return (
    <div className="flex flex-col h-full w-full sm:w-[25rem] mx-auto">
      <div className="bg-white h-30 w-full px-8 py-5 flex justify-between items-center">
        <h3 className="m-0 p-0">{merchantInfoContext.name}</h3>
        <Image
          alt="image"
          src={eWarungPoweredByLogo}
          priority={true}
          width={128}
          height={39}
        />
      </div>
      <WarungLandingBackground imageSrc={merchantInfoContext.aboutUsBanner}>
        <div className="relative px-8 py-14 flex-grow text-center">
          <h1 className="text-white font-normal text-3xl px-10 m-0">
            {t("How would you like to order?")}
          </h1>
          <h3 className="text-white font-extralight">
            {t("Find your favourite food and order")}
          </h3>
          <OrderModeTabs
            orderModeMap={orderModeMap}
            selectedItem={orderType}
            handleOnClickOrderType={handleOrderType}
            handleOnClickMainButton={handleMenuRedirect}
            tableNumber={tableNumber}
            orderOption={merchantInfoContext.orderOption}
          />
          <div className="grid grid-cols-3 gap-5 mt-10">
            {navigationList.map((navItem) => (
              <button
                key={navItem.title}
                onClick={navItem.handleOnClick}
                className="card bg-white hover:bg-gray-100 border-none p-4 w-full h-full shadow-2xl"
              >
                <div className="text-center w-full">
                  <div className="pt-2 px-2">
                    <Image
                      alt={navItem.title}
                      src={navItem.src}
                      width={30}
                      height={30}
                      priority={true}
                    />
                  </div>
                  <p className="text-[0.6rem] m-0 text-center">
                    {navItem.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </WarungLandingBackground>
      <WarungLandingOperatingHours landingPageData={landingPageData} />
      <EWarungFooter></EWarungFooter>
    </div>
  );
};

export default WarungLandingPage;
