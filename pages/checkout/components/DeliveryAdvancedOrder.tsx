import MerchantContext from "@/contexts/MerchantContext";
import { CheckoutPageSelect, CheckoutPageButton } from "./common";
import { Dialog, Transition } from "@headlessui/react";
import { useState, useEffect, Fragment, useContext } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsChevronRight } from "react-icons/bs";
import { OrderTypes, StoreTypes } from "@/enums/enums";
import useTranslation from "next-translate/useTranslation";
import { useStoreOperatingHour } from "@/contexts/StoreOperatingHourContext";
import dayjs from "dayjs";

const ORDER_TYPE_MAP = {
  [OrderTypes.DELIVERY]: "Delivery",
  [OrderTypes.PICKUP]: "Pick-Up",
  [OrderTypes.DINEIN]: "Dine-In",
};

export default function DeliveryAdvancedOrder({
  deliveryTime,
  ownTransport,
  orderType,
  register,
  setValue,
  watch,
  isQLEggs,
}: {
  deliveryTime: any[];
  ownTransport: Boolean;
  orderType: string;
  register: any;
  setValue: any;
  watch: any;
  isQLEggs: Boolean;
}) {
  const [advanceOrderOpen, setAdvanceOrderOpen] = useState(false);
  const { t, lang } = useTranslation();
  const { storeType } = useContext(MerchantContext);
  const IS_B2B = Boolean(StoreTypes.B2B_STORETYPE === storeType);
  const IS_WARUNG = Boolean(StoreTypes.WARUNG_STORETYPE === storeType);
  const { landingPageData } = useStoreOperatingHour() as any;

  function isToday(date: Date) {
    const today = new Date();
    return today.toDateString() === date.toDateString();
  }
  useEffect(() => {
    if (deliveryTime?.length > 0) {
      if (ownTransport) {
        if (orderType === OrderTypes.DELIVERY) {
          const firstDate = deliveryTime[0]?.scheduledDate;
          const firstTime = deliveryTime[0]?.scheduledTime[0]?.time;
          setValue("scheduledDate", firstDate);
          setValue("scheduledTime", firstTime);
          setValue(
            "truckCapacityId",
            deliveryTime[0]?.scheduledTime[0]?.truckCapacityIds[0]
          );
          if (!IS_B2B) {
            setAdvanceOrderOpen(true);
          }
        } else {
          const firstDate = deliveryTime[0]?.advancedOrderDateSelection;
          const firstTime = generateTimeOptions(firstDate)[0]?.value;
          setValue("scheduledDate", firstDate);
          setValue("scheduledTime", firstTime);
        }
      } else {
        const firstDate = deliveryTime[0]?.advancedOrderDateSelection;
        const firstTime = generateTimeOptions(firstDate)[0]?.value;
        setValue("scheduledDate", firstDate);
        setValue("scheduledTime", firstTime);
      }
    }
  }, [deliveryTime]);
  function convertTimeTo24hrInDayJsObj(time: string) {
    // check time is AM or PM
    const timeOfDay = time.slice(-2);
    console.log("time", timeOfDay);
    // if PM add 12 to hr
    if (timeOfDay === "pm" || timeOfDay === "PM") {
      const [hr, min] = time.split(":");
      return dayjs()
        .hour(parseInt(hr) + 12)
        .minute(parseInt(min));
    }
    // if AM minus 12 from hr if hr is 12 else return time
    if (timeOfDay === "am" || timeOfDay === "AM") {
      const [hr, min] = time.split(":");
      if (parseInt(hr) === 12) {
        return dayjs()
          .hour(parseInt(hr) - 12)
          .minute(parseInt(min));
      }
      return dayjs().hour(parseInt(hr)).minute(parseInt(min));
    }
  }

  function generateTimeOptions(date?: string) {
    if (!(deliveryTime && deliveryTime?.length > 0)) return [];
    const selectedScheduledDate = date || watch("scheduledDate");
    const selectedDateIsToday = isToday(new Date(selectedScheduledDate));
    const filteredResult = deliveryTime?.filter(
      ({ advancedOrderDateSelection: slctdDate }) =>
        slctdDate === selectedScheduledDate
    );
    if (filteredResult?.length > 0) {
      const { advancedOrderTimeSelection } = filteredResult[0];
      const options = advancedOrderTimeSelection.map((time: string) => ({
        label: time,
        value: time,
      }));
      if (!selectedDateIsToday) return options;
      if (IS_WARUNG) {
        const currentDay = dayjs().format("dddd");
        const { open, close } = landingPageData?.operatingHours?.filter(
          (item: any) => item.day === currentDay
        )[0];
        // convert open time to 24hr format in dayjs obj
        const convertedOpeningHr = convertTimeTo24hrInDayJsObj(open);

        // compare if currentTime greater than first time in options
        if (dayjs().isBefore(convertedOpeningHr)) {
          return options;
        } else {
          return [{ label: "ASAP", value: "ASAP" }, ...options];
        }
      }
      return [{ label: "ASAP", value: "ASAP" }, ...options];
    }
    return [];
  }

  function getOwnTransportTimeOptions(date?: string) {
    if (!(deliveryTime && deliveryTime?.length > 0)) return [];
    const selectedScheduledDate = date || watch("scheduledDate");
    const filteredResult = deliveryTime?.filter(
      ({ scheduledDate: slctdDate }) => slctdDate === selectedScheduledDate
    );
    if (filteredResult?.length > 0) {
      const { scheduledTime } = filteredResult[0];
      const options = scheduledTime.map((item: any) => ({
        label: item?.time,
        value: item?.time,
        truckCapacityList: item?.truckCapacityIds,
      }));
      return options;
    }
    return [];
  }

  return (
    <div className="my-2">
      <div className="flex flex-col" onClick={() => setAdvanceOrderOpen(true)}>
        <label className="text-gray-500 cursor-pointer">
          {lang === "bm"
            ? `${t("common:time")} ${t(
                `common:${ORDER_TYPE_MAP[orderType] || ""}`
              )}`
            : `${t(`common:${ORDER_TYPE_MAP[orderType] || ""}`)} ${t(
                "common:time"
              )}`}
        </label>
        <div className="flex flex-row p-3 items-center space-x-4  cursor-pointer hover:opacity-90 duration-150 bg-gray-100 rounded-lg mt-1">
          <AiOutlineClockCircle size={20} className="text-gray-500" />
          <label className="mr-auto cursor-pointer text-gray-500">
            {`${watch("scheduledDate")} ${watch("scheduledTime")}`}
          </label>
          <BsChevronRight size={20} className="text-gray-500" />
        </div>
      </div>
      {/* Advance order time date selection */}
      <Transition appear show={advanceOrderOpen} as={Fragment}>
        <Dialog
          onClose={() => setAdvanceOrderOpen(false)}
          className="relative z-10"
          as="div"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            enterTo="opacity-100"
            enterFrom="opacity-0"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                as={Fragment}
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {ownTransport ? (
                    <>
                      <Dialog.Title
                        className="text-lg font-semibold mb-4 mt-0 text-primary"
                        as="h3"
                      >
                        {t("common:please-select-delivery-datetime")}
                      </Dialog.Title>
                      <div className="mt-2 flex flex-col space-y-1">
                        <CheckoutPageSelect
                          label={
                            isQLEggs
                              ? t("common:delivery-date")
                              : t("common:order-date")
                          }
                          register={register("scheduledDate", {
                            onChange: (e: any) => {
                              let option = getOwnTransportTimeOptions(
                                e?.target?.value
                              )[0];
                              setValue("scheduledTime", option?.value);
                              setValue(
                                "truckCapacityId",
                                option?.truckCapacityList[0]
                              );
                            },
                            required: {
                              message: t("common:scheduled-date-required"),
                              value: true,
                            },
                          })}
                          options={deliveryTime?.map(
                            ({ scheduledDate, scheduledDay }) => ({
                              label: scheduledDate + " (" + scheduledDay + ")",
                              value: scheduledDate,
                            })
                          )}
                        />
                        <CheckoutPageSelect
                          label={
                            isQLEggs
                              ? t("common:Delivery Time")
                              : t("common:order-time")
                          }
                          options={getOwnTransportTimeOptions()}
                          register={register("scheduledTime", {
                            onChange: (e: any) => {
                              let option = getOwnTransportTimeOptions().filter(
                                (item: any) =>
                                  item.value === watch("scheduledTime")
                              )[0];
                              setValue(
                                "truckCapacityId",
                                option?.truckCapacityList[0]
                              );
                            },
                            required: {
                              message: t("common:scheduled-time-required"),
                              value: true,
                            },
                          })}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <Dialog.Title
                        className="text-lg font-semibold mb-4 mt-0 text-primary"
                        as="h3"
                      >
                        {t("common:please-select-delivery-datetime")}
                      </Dialog.Title>
                      <div className="mt-2 flex flex-col space-y-1">
                        {/* advancedOrderTimeSelection */}
                        <CheckoutPageSelect
                          label={t("common:order-date")}
                          register={register("scheduledDate", {
                            onChange: (e: any) =>
                              setValue(
                                "scheduledTime",
                                generateTimeOptions(e?.target?.value)[0]?.value
                              ),
                            required: {
                              message: t("common:scheduled-date-required"),
                              value: true,
                            },
                          })}
                          options={deliveryTime?.map(
                            ({ advancedOrderDateSelection }) => ({
                              label: advancedOrderDateSelection,
                              value: advancedOrderDateSelection,
                            })
                          )}
                        />
                        <CheckoutPageSelect
                          label={t("common:order-time")}
                          options={generateTimeOptions()}
                          register={register("scheduledTime", {
                            required: {
                              message: t("common:scheduled-time-required"),
                              value: true,
                            },
                          })}
                        />
                      </div>
                    </>
                  )}
                  <div className="mt-4">
                    <CheckoutPageButton
                      onClick={() => setAdvanceOrderOpen(false)}
                    >
                      {t("common:confirm")}
                    </CheckoutPageButton>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
