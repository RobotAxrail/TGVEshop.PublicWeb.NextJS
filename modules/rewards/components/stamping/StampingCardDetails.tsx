import useTranslation from "next-translate/useTranslation";
import StampingProgress from "./StampingProgress";
import { Button, Popup } from "react-vant";
import dayjs from "dayjs";
import Cookies from "universal-cookie";
import { API, graphqlOperation } from "aws-amplify";
import { redeemVoucherByStamp } from "@/graphql/mutations";
import { useContext, useEffect, useState } from "react";
import MerchantContext from "@/contexts/MerchantContext";
import { useMutation } from "@tanstack/react-query";
import { setToastState } from "@/states/toastBarState";
import { faChevronLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function StampingCarDetails({ popupData, onClose, refreshStamp }) {
  const { t } = useTranslation();
  const { merchantId } = useContext(MerchantContext);
  const cookie = new Cookies();

  function generateSchedule(startDate: string, endDate?: string) {
    const formatDate = (date: string) => dayjs(date).format(`DD MMM YYYY`);
    if (startDate && endDate)
      return `Valid ${formatDate(startDate)} - ${formatDate(endDate)}`;
    else if (!endDate) return `Valid from ${formatDate(startDate)}`;
    else return "";
  }

  function generateCouponLabel(counted: number, max: number) {
    return `${counted || 0} / ${max} ${t("Stamps")}`;
  }

  function simplifyStampValues(currentCount: number, currentMax: number) {
    if (currentMax > 10) {
      const divider = currentMax / 10;
      return {
        count: Math.round(currentCount / divider),
        max: Math.round(currentMax / divider)
      }
    }

    return {
      count: currentCount,
      max: currentMax
    }
  }

  function getStampProgress(stampingCampaignType: any, stampCollected: number, stampValueCollected: number) {
    if (stampingCampaignType === "stamp") {
      return stampCollected
    }
    return stampValueCollected
  }

  const { mutate: mutateRedeem, isLoading } = useMutation({
    mutationKey: ["redeem-stamp"],
    mutationFn: redeemStamp,
    onSuccess: (data: any) => {
      if (data.status === "true") {
        refreshStamp()
        onClose()
      }

      setToastState({
        message: data.message,
        severity: data.status === "true" ? "success" : "error",
        show: true,
      });
    },
  })

  async function redeemStamp() {
    const res: any = await API.graphql(graphqlOperation(redeemVoucherByStamp, {
      customerId: cookie.get("signIn")?.customerId,
      merchantId: merchantId,
      stampingCampaignId: popupData?.stampingCampaignId
    }))

    return res.data.redeemVoucherByStamp;
  }

  const stampProgress = getStampProgress(popupData?.stampingCampaignType, popupData?.stampCollected, popupData?.stampValueCollected)
  const { count, max } = simplifyStampValues(stampProgress, popupData?.stampTypeValue)

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Define the mobile breakpoint according to your needs
    };

    handleResize(); // Initial check

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Popup
      className="md:rounded-md max-w-xl w-full md:h-[65vh]  h-screen"
      visible={Boolean(popupData?.open)}
      onClose={onClose}
      lockScroll
    >
      <div className="flex flex-col p-4  h-full">
        {
          isMobile ?
            <div onClick={onClose} className="absolute top-4 left-4 flex items-center justify-center w-8 h-8 bg-white rounded-full">
              <FontAwesomeIcon
                className="text-[1rem]"
                icon={faChevronLeft}
              />
            </div> :
            <div onClick={onClose} className="absolute top-4 right-4">
              <FontAwesomeIcon
                className="text-[1rem]"
                icon={faXmark}
              />
            </div>
        }
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-3 ">
          <img
            className="rounded-md border object-fill w-full md:w-[30%] aspect-square"
            src={`${process.env.BUCKET_URL}${popupData?.stampingCampaignImage}`}
            alt={popupData?.stampingCampaignTitle}
          />
          <div className="flex flex-col w-full md:w-[70%] md:space-y-0 space-y-2 h-full">
            <div className="flex flex-col w-full md:space-y-0 space-y-2 h-full">
              <div className="font-[400] text-base hidden md:block">
                {popupData?.stampingCampaignTitle}
              </div>
              <div className="text-base font-light text-[#697586] my-2">{`${popupData?.stampClaimCount || 0} Redeemable Reward(s)`}</div>
              <div className="text-base font-light text-[#697586]">
                {generateSchedule(popupData?.startDate, popupData?.endDate)}
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-[#697586]">
                {generateCouponLabel(
                  popupData?.stampingCampaignType === "stamp" ? popupData?.stampCollected : popupData?.stampValueCollected,
                  popupData?.stampTypeValue
                )}
              </span>
              <StampingProgress
                counted={count}
                max={max}
              />
            </div>
            <div className="text-xl font-[400] md:hidden block py-2">
              {popupData?.stampingCampaignTitle}
            </div>
          </div>
        </div>
        <div
          className="md:mt-2 h-full overflow-y-auto hide-scrollbar"
          dangerouslySetInnerHTML={{
            __html: `${popupData?.stampingCampaignDescription || ""}`,
          }}
        />
        <div className="py-2 w-full">
          <Button
            loading={isLoading}
            className="bg-primary text-white p-2 rounded-md hover:opacity-80 active:opacity-90 w-full disabled:hover:bg-blue-500 disabled:opacity-50"
            onClick={() => mutateRedeem()}
            style={{
              borderRadius: "6px",
              backgroundColor: "var(--main-bg-color)",
              color: "white"
            }}
            disabled={popupData?.stampClaimCount <= 0}
          >
            Redeem
          </Button>
        </div>
      </div>
    </Popup>
  );
}
