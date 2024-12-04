import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// components
import { CloseIcon } from "@/components/icons/Icons";
import { Transition } from "@headlessui/react";
import AliceCarousel from "react-alice-carousel";
import AspectRatioSquareContainer from "@/components/shared/AspectRatioSquareContainer";

// style
import classes from "./SplashScreen.module.scss";

const SplashScreen = (props) => {
  const { splashScreenList = [] } = props;
  const router = useRouter();
  const [showSplashScreen, setShowSplashScreen] = useState(false);

  const closeSplashScreen = () => {
    setShowSplashScreen(false);
  };
  // getSplashScreen data whn it has the marchantId and current is at home page
  useEffect(() => {
    if (router.pathname === "/" && splashScreenList?.length > 0) {
      // getSplashScreen();
      setShowSplashScreen(true);
    }
  }, [splashScreenList]);

  // if no data
  if (splashScreenList?.length === 0) return <></>;

  // open url in new tab
  const openInNewTab = (url) => {
    const newWindow = window.open(
      url.includes("https://") ? url : "https://" + url,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  // navigate to that page
  const navigateToNewPage = (url) => {
    router.push({
      pathname: `/${url}`,
      state: {
        seoUrl: url,
      },
    });
  };

  // image component
  const items = splashScreenList?.map((img) => {
    const imgUrl = process.env.BUCKET_URL + img.homeImage;
    return (
      <div
        key={img.title}
        className="m-auto max-h-[80vh] w-auto max-w-[50vh] block text-center"
        onClick={closeSplashScreen}
      >
        {/* <div> */}
        <AspectRatioSquareContainer
          className="cursor-pointer"
          onClick={() => {
            if (img.buttonAction === "url") {
              openInNewTab(img.buttonActionValue);
            } else if (
              img.buttonAction === "specific-collections" ||
              img.buttonAction === "specific-products"
            ) {
              navigateToNewPage(img.buttonActionValue);
            } else if (img.buttonAction === "no-action") {
              return;
            }
          }}
          rounded="none"
        >
          <Image
            layout="fill"
            objectFit="contain"
            title={img.title}
            alt={img.title}
            src={imgUrl}
            priority={true}
          />
        </AspectRatioSquareContainer>
      </div>
      // </div>
    );
  });

  return (
    <Transition
      as={Fragment}
      show={showSplashScreen}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed h-screen w-screen flex z-[21] bg-black/75 transition-all duration-300">
        <div className="h-full w-full" onClick={closeSplashScreen}></div>
        <div
          className={[
            classes.content,
            "max-w-[1200px] flex flex-col absolute top-1/2 left-1/2",
          ].join(" ")}
        >
          <button
            className="text-right leading-[3] text-[#cccccc] hover:text-white"
            onClick={closeSplashScreen}
          >
            <CloseIcon size="w-6 h-6" />
          </button>
          <div className={classes.carousel}>
            <AliceCarousel
              items={items}
              autoPlayInterval={3000}
              disableButtonsControls={
                splashScreenList?.length < 1 ? true : false
              }
              disableDotsControls={splashScreenList?.length < 1 ? true : false}
              autoPlay
              infinite
            />
          </div>
        </div>
        <div className="h-full w-full" onClick={closeSplashScreen}></div>
      </div>
    </Transition>
  );
};

export default SplashScreen;
