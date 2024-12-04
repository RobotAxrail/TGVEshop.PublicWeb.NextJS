import { IkdsGetWarungLandingPageRes } from "types";
import React from "react";
import dayjs from "dayjs";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/outline";
import useTranslation from "next-translate/useTranslation";

interface WarungLandingOperatingHoursProps {
  landingPageData: IkdsGetWarungLandingPageRes;
}

const WarungLandingOperatingHours: React.FC<
  WarungLandingOperatingHoursProps
> = ({ landingPageData }) => {
  const { lang } = useTranslation();
  const currentDayOfWeek: string = new Date().toLocaleString("en-us", {
    weekday: "long",
  });
  const { t } = useTranslation("common");
  const dayNum = dayjs().day();

  const weOperateFromText = () => {
    return (
      <>
        {landingPageData?.operatingHours?.length > 0 && (
          <>
            {landingPageData.operatingHours[dayNum].open === "Open Full Day" ||
              landingPageData.operatingHours[dayNum].open === "Close Full Day" ? (
              <span className="font-bold">
                {landingPageData.operatingHours[dayNum].open}
              </span>
            ) : (
              <>
                {t("We operate from")}{" "}
                <span className="font-bold">
                  {landingPageData.operatingHours[dayNum].open}
                </span>{" "}
                {t("to")}{" "}
                <span className="font-bold">
                  {landingPageData.operatingHours[dayNum].close}
                </span>
              </>
            )}
          </>
        )}
      </>
    );
  };

  const getOperatingHourLabel = (operatingHour: {
    open: string;
    close: string;
    day: string;
  }) => {
    switch (true) {
      case operatingHour.open === "Open Full Day":
        return t("Open Full Day");
      case operatingHour.open === "Closed Full Day":
        return t("Closed Full Day");
      default:
        return `${operatingHour.open} - ${operatingHour.close}`;
    }
  };

  return (
    <div className="w-full p-8 text-xs">
      <h3 className="text-primary m-0 text-center">{t("Operating Hours")}</h3>
      <div className="flex flex-col items-center my-3">
        <p className="m-0 mb-2">
        {t("Today")} <span className="font-bold">{t(currentDayOfWeek)}</span>
        </p>
        <p className="m-0">{weOperateFromText()}</p>
      </div>
      <div className="mx-auto w-full max-w-md rounded-2xl">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-center rounded-lg px-4 py-2 text-left text-sm font-medium text-primary focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                <div>
                  <span className="mr-3">{t("View weekly operating hours")}</span>
                  <ChevronUpIcon
                    className={`${open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-primary`}
                  />
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-xstext-black">
                {landingPageData?.operatingHours?.length > 0 && (
                  <div className="flex justify-center">
                    <div className="w-24 flex flex-col">
                      {landingPageData.operatingHours.map((item, idx) => (
                        <div key={idx}>
                          <span>{item.day}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col ml-1 mr-3">
                      {landingPageData.operatingHours.map((item, idx) => (
                        <div key={idx}>
                          <span>{": "}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col">
                      {landingPageData.operatingHours.map((item, idx) => (
                        <div key={idx}>{getOperatingHourLabel(item)}</div>
                      ))}
                    </div>
                  </div>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default WarungLandingOperatingHours;
