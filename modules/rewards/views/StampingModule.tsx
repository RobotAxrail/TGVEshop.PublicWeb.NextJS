import { CataloguePagination } from "@/components/cataloguePagination/CataloguePagination";
import MerchantContext from "@/contexts/MerchantContext";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import Cookies from "universal-cookie";
import usePagination, {
  TQueryListFunc,
} from "../../../components/common/usePagination";
import { getStampingList } from "../api";
import StampingCard from "../components/stamping/StampingCard";
import StampingCarDetails from "../components/stamping/StampingCardDetails";
import { sampleResult } from "../constants";

const SAMPLE_DATA = [1, 2, 3, 4].map((id) => ({ ...sampleResult, id }));
export default function StampingModule() {
  const [popupData, setPopUpdata] = useState<any>({ open: false });
  const { merchantId } = useContext(MerchantContext);
  const cookie = new Cookies();

  const getStamping: TQueryListFunc<any> = async ({ limit, page }) => {
    return await getStampingList({
      customerId: (cookie.get("signIn") as any)?.customerId,
      filter: {},
      merchantId,
      limit: limit,
      nextToken: (page === 0 ? null : limit * page) as any,
    });
  };

  const {
    items: stampingList,
    currentPage,
    totalPages,
    isLoading,
    handleNext,
    handlePrev,
    handleSetCurrentPage,
    refetch
  } = usePagination<any>({
    queryKey: "stamping list",
    queryFunc: getStamping,
    pageLimit: 10,
  });

  function generateSchedule(startDate: string, endDate?: string) {
    const formatDate = (date: string) => dayjs(date).format(`DD MMM YYYY`);
    if (startDate && endDate)
      return `Valid ${formatDate(startDate)} - ${formatDate(endDate)}`;
    else if (!endDate) return `Valid from ${formatDate(startDate)}`;
    else return "";
  }

  function simplifyStampValues(currentCount: number, currentMax: number) {
    if ( currentMax > 10 ) {
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

  return (
    <>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 pr-1">
        {!(stampingList?.length > 0) && !isLoading && (
          <div className="col-span-12 text-center flex flex-col p-4">
            <div>No Stampings Available</div>
          </div>
        )}
        {(isLoading ? SAMPLE_DATA : stampingList)?.map((stamp: any) => {
          const {
            stampingCampaignImage,
            stampingCampaignTitle,
            stampValueCollected,
            stampCollected,
            stampingCampaignType,
            stampTypeValue,
            stampClaimCount,
            startDate,
            endDate,
            id,
          } = stamp;

          const stampProgress = getStampProgress(stampingCampaignType, stampCollected, stampValueCollected)
          const { count, max } = simplifyStampValues(stampProgress, stampTypeValue)

          return (
            <StampingCard
              stampImage={`${process.env.BUCKET_URL}${stampingCampaignImage}`}
              onClickDetails={() => setPopUpdata({ open: true, ...stamp })}
              expiryDate={generateSchedule(startDate, endDate)}
              stampName={stampingCampaignTitle}
              max={stampTypeValue}
              counted={stampProgress}
              claimed={stampClaimCount}
              isLoading={isLoading}
              key={id}
              barCount={count}
              barMax={max}
            />
          );
        })}
        <StampingCarDetails
          onClose={() => setPopUpdata((p: any) => ({ ...p, open: false }))}
          popupData={popupData}
          refreshStamp={refetch}
        />
      </div>
      {stampingList?.length > 0 && !isLoading && (
        <CataloguePagination
          totalPages={totalPages}
          selectedPage={currentPage + 1}
          handleSelectPage={(page) => handleSetCurrentPage(page - 1)}
          handleBackButton={handlePrev}
          handleForwardButton={handleNext}
          limit={undefined}
        />
      )}
    </>
  );
}
