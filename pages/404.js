import Image from "next/image";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
// pages/404.js
import SEO from "@/components/seo/SEO";
import { ContainedButton } from "@/components/buttons/Buttons";
import { useContext } from "react";
import MerchantContext from "@/contexts/MerchantContext";
// image
import notFound from "@/images/404.png";
import { StoreTypes } from "@/enums/enums";
import errorImage from "@/images/error.png";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Custom404({ showButton = true }) {

  const [isHovered, setIsHovered] = useState(false);

  // const { storeType } = useContext(MerchantContext);
  let router = useRouter();
  const { t } = useTranslation("common");
  return (
    <>
      <SEO
        title="404 - Page Not Found"
        keywords=""
        description="404 - Page Not Found"
      />
      <div className="flex flex-col items-center h-screen p-3 pt-[60px] pb-[50px] ">
        <div className="flex justify-center mb-[24px]">
          <Image src={errorImage} width={160} height={160} />
        </div>
        <div className = "flex flex-col gap-2 pb-[40px]">
          <h1 className="text-blue text-[26px] tracking-[0.04em] text-center">{t("OOPS, PAGE NOT FOUND")}</h1>
          <p className="text-center text-[14px] font-light tracking-wide md:text-[18px]">Please try again later.</p>
        </div>
        <div>
        <Button
  className="relative overflow-hidden pt-[1.2142857143em] px-[2.0714285714em] pb-[1em]"
  style={{
    borderRadius: "0.4166666667em 1.4166666667em",
    minWidth: "200px", // Add minimum width if needed
  }}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  {/* Base gradient */}
  <div
    className="absolute inset-0 transition-opacity duration-500"
    style={{
      background: "linear-gradient(90deg, #ef4923 .02%, #ff0013 50.8%, #9e1d20 100.02%)",
      opacity: isHovered ? 0 : 1,
    }}
  />

  {/* Hover gradient */}
  <div
    className="absolute inset-0 transition-opacity duration-100"
    style={{
      background: "linear-gradient(79.2deg, #391818 1.27%, #660008 42.98%, #9e1d20 83%)",
      opacity: isHovered ? 1 : 0,
    }}
  />

  {/* Button text */}
  <span className="relative z-10">
    <a
      href="/"
      className="text-white no-underline font-bold text-[14px] uppercase"
    >
      {t("BACK TO HOME")}
    </a>
  </span>
</Button>


        </div>
        {/* <div className="flex justify-center">
          <Image src={notFound} width={370} height={400} />
        </div> */}
        {/* <div className="text-blue ml-3">
          <p>
            {t("We're sorry, the page you requested could not be found")}{" "}
            {showButton ? t("Please go back to the homepage") : ""}
          </p>
        </div> */}
        {/* {showButton && StoreTypes.WHATSAPP_CRM_STORETYPE !== storeType && (
          <ContainedButton
            className="w-11/12 mt-8 960-up:w-32 bg-primary"
            border="rounded-full"
            onClick={() => router.push("/")}
            selection={true}
          >
            <div className="text-white">{t("HOME")}</div>
          </ContainedButton>
        )} */}
      </div>
    </>
  );
}
