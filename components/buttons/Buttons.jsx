import React, { useState, useContext, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
// icons
import { LoadingIcon, FavIcon } from "@/components/icons/Icons";
import { PlusSmIcon, MinusSmIcon, XIcon } from "@heroicons/react/outline";
import { WhatsAppIcon } from "@/components/icons/Icons";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import customersupport from "@/images/customersupport.svg";
import promotion from "@/images/promotion.svg";
import Image from "next/image";
import MerchantContext from "@/contexts/MerchantContext";
import { getPromotionalWidgetCache } from "@/graphql/queries";
import Cookies from "universal-cookie";
import { API, graphqlOperation } from "aws-amplify";

export const BadgeButton = (props) => {
  const { icon, number, onClick, ...rest } = props;
  const { t } = useTranslation("common");
  return (
    // <button class="relative bg-blue-800 hover:bg-blue-800 duration-300 py-2 px-4 text-blue-100 rounded">

    // Button
    //   <span class="absolute bg-red-600 px-2 py-1 text-xs font-bold rounded-full -top-3 -right-3">
    //     99+
    //   </span>
    // </button>

    <span
      className={`relative bg-primary duration-300 py-1 px-1 inline-flex ${
        props?.className ?? ""
      }`}
      {...rest}
      onClick={() => (onClick ? onClick() : function () {})}
    >
      {icon}
      {number !== 0 && (
        <span
          className="absolute text-white text-[0.6rem] bg-red-600 px-2 py-1 font-bold rounded-full -top-2 -right-2 cursor-pointer z-10"
          onClick={() => (onClick ? onClick() : function () {})}
        >
          {number > 9 ? "9+" : number}
        </span>
      )}
    </span>
  );
};

/*
  current file has
  1. ContainedButton: 
      button with loading state and primary bg, default font size is 15px
      set outlined true can get outlined style
*/

export const ContainedButton = (props) => {
  const {
    loading = false,
    type = "button",
    className = "",
    fontSize = "text-[14px]", // set button content font size
    outlined = false,
    border = "rounded-full",
    padding = true,
    color = outlined ? "text-primary" : "text-white",
    selection = false,
    ...rest
  } = props;
  const { t } = useTranslation("common");
  return (
    <button
      type={type}
      className={[
        className,
        "disabled:bg-gray-300 disabled:text-grey-350 disabled:cursor-auto disabled:shadow-none",
        "relative overflow-hidden inline-flex items-center justify-center outline-none text-center transition-all ease-in-out duration-250",
        border,
        "py-2.5 px-5",
        outlined
          ? selection
            ? "bg-gray-200 border-none hover:bg-gray-300"
            : "bg-white border hover:bg-gray-100"
          : "bg-primary shadow-button hover:shadow-button-hover",
        fontSize,
        color,
      ].join(" ")}
      {...rest}
    >
      <span className="relative pointer-events-none">
        <>
          {/* {loading ? <LoadingIcon /> : <>{props.children}</>} */}

          {loading ? <LoadingIcon margin="mr-3" /> : null}
          {loading ? t("Processing") : props.children}
        </>
      </span>
    </button>
  );
};

export const QuantityButtons = (props) => {
  const {
    handleClickAdd,
    handleClickRemove,
    quantity = 0,
    buttonDecreaseDisabled,
    buttonIncreaseDisabled,
    ...rest
  } = props;

  return (
    <div {...rest}>
      <div role="group" className="inline-flex border rounded-full bg-white">
        <button
          className={[
            "p-2 rounded-full hover:bg-opacity-5 hover:bg-black",
            buttonDecreaseDisabled ? "text-gray-300" : "",
          ].join(" ")}
          title="decrease"
          disabled={buttonDecreaseDisabled}
          onClick={handleClickRemove}
          type="button"
        >
          <MinusSmIcon className="w-6 h-6" />
        </button>
        <button
          className="text-black text-[18px] w-[34px] pointer-events-none"
          disabled
        >
          {quantity}
        </button>
        <button
          className={[
            "p-2 rounded-full hover:bg-opacity-5 hover:bg-black",
            buttonIncreaseDisabled ? "text-gray-300" : "",
          ].join(" ")}
          title="increase"
          onClick={handleClickAdd}
          disabled={buttonIncreaseDisabled}
          type="button"
        >
          <PlusSmIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export const VariantButton = (props) => {
  const {
    type = "button",
    className = "",
    fontSize = "text-[14px]", // set button content font size
    ...rest
  } = props;
  return (
    <button
      type={type}
      className={[
        className,
        "disabled:bg-gray-300 disabled:text-grey-350 disabled:cursor-auto disabled:shadow-none",
        "relative overflow-hidden inline-flex items-center justify-center outline-none font-md text-center transition-all ease-in-out duration-250",
        "border hover:bg-primary/50 py-[5px] px-[15px] rounded",
        fontSize,
      ].join(" ")}
      {...rest}
    >
      <span className="relative pointer-events-none">{props.children}</span>
    </button>
  );
};

export const FavIconButton = (props) => {
  const { status, ...rest } = props;
  return (
    <button
      title="favourite"
      className="bg-white border border-gray-400 rounded-full p-2.5 m-[5px] inline-flex "
      {...rest}
    >
      <FavIcon status={status} />
    </button>
  );
};

export const FloatingButton = (props) => {
  const { whatsappNo, icons } = props;
  // open url in new tab
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  // trigger open whatsapp url
  const handleOnClick = () => {
    openInNewTab(
      `https://api.whatsapp.com/send/?phone=${whatsappNo?.replace(
        "+",
        ""
      )}&text&app_absent=0`
    );
  };
  if ([null, ""].includes(whatsappNo)) return <></>;

  return (
    <div
      className="bg-[#25d366] rounded-full p-3 fixed right-4 bottom-[80px] z-20 cursor-pointer shadow-button"
      onClick={handleOnClick}
    >
      <WhatsAppIcon />
    </div>
  );
};

export const FloatingButtonEShop = ({ merchantId, accessToken }) => {
  const cookie = new Cookies();
  const merchantInfoContext = useContext(MerchantContext);
  const [openTab, setOpenTab] = useState(false);
  const [promotionalWidget, setPromotionalWidget] = useState(null);
  // trigger open whatsapp url
  const handleOnClick = () => {
    setOpenTab(!openTab);
  };

  const fetchPromotionalWidget = async () => {
    console.log("fetching promotional widget");
    try {
      let params = {
        merchantId: merchantInfoContext.merchantId,
        accessToken: accessToken || "",
      };
      const res = await API.graphql(
        graphqlOperation(getPromotionalWidgetCache, params)
      );
      setPromotionalWidget(res.data.getPromotionalWidgetCache.widgets);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPromotionalWidget();
  }, [merchantInfoContext]);

  return (
    <div className="fixed right-4 bottom-[80px] z-20 flex flex-col items-end gap-2">
      {/* Promotion Text */}
      {openTab && (
        <div className="flex flex-col gap-3 text-[14px] font-normal items-end">
          <div className="bg-white text-[#FF0013] px-4 py-2 rounded-full shadow-lg flex items-center gap-[6px] w-fit whitespace-nowrap">
            {promotionalWidget &&
              promotionalWidget.map((widget, index) => (
                <div key={index}>
                  <a
                    href={widget.widgetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p>{widget.widgetName}</p>
                  </a>
                </div>
              ))}
          </div>
        </div>
      )}
      {/* Plus Button */}
      <div
        className="bg-[#888888] text-[#FF0013] rounded-full p-3 cursor-pointer shadow-button h-[50px] w-[50px] flex items-center justify-center border-2 border-[#FFFFFF80]"
        onClick={handleOnClick}
      >
        {openTab ? <IoClose size={15.58} /> : <FaPlus size={15.58} />}
      </div>
    </div>
  );
};

export const RoundCloseButton = (props) => {
  const { handleOnClick } = props;

  return (
    <button
      className="bg-white rounded-full fixed bottom-[1px] p-3 z-[2000] cursor-pointer text-primary mb-4"
      onClick={handleOnClick}
      type="button"
    >
      <XIcon className="w-6 h-6" />
    </button>
  );
};
