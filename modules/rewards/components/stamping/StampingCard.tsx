import useTranslation from "next-translate/useTranslation";
import StampingProgress from "./StampingProgress";
import { Divider } from "react-vant";

export default function StampingCard({
  onClickDetails,
  stampImage,
  expiryDate,
  isLoading,
  stampName,
  counted,
  max,
  claimed,
  barCount,
  barMax
}: {
  onClickDetails: () => void;
  isLoading: boolean;
  stampImage: string;
  expiryDate: string;
  stampName: string;
  counted: number;
  max: number;
  claimed: number;
  barCount: number;
  barMax: number;
}) {
  const { t } = useTranslation();
  function generateCouponLabel() {
    return `${counted || 0} / ${max} ${t("Stamps")}`;
  }

  return (
    <div
      className={`rounded-md shadow-sm border p-3 ${
        isLoading ? "animate-pulse" : ""
      }`}
    >
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row space-x-3">
          <div className="w-[100px] h-[100px]">
            {!isLoading && (
              <img
                className="rounded-md border object-cover max-h-[100px]"
                src={stampImage}
                alt={stampName}
              />
            )}
            {isLoading && (
              <div className="bg-gray-100 h-full w-full rounded-md" />
            )}
          </div>
          {!isLoading && (
            <div className="flex flex-col items-start w-[70%] h-[100px]">
              <div className="text-base font-[400]">{stampName}</div>
              <div className="text-base font-light text-[#697586] my-1">{`${claimed || 0} Redeemable Reward(s)`}</div>
              <div className="text-base font-light text-[#697586]">{expiryDate}</div>
            </div>
          )}
          {isLoading && (
            <div className="flex flex-col items-start w-[70%] bg-gray-100 text-gray-100">
              <div className="font-[400]">Some name</div>
              <div className="">some date</div>
            </div>
          )}
        </div>
        <Divider />
        <div className="flex flex-col space-y-2">
          <div className="w-full flex flex-row items-center justify-between">
            {isLoading && (
              <span className="bg-gray-100 text-gray-100">This is</span>
            )}
            {!isLoading && (
              <span className="text-[#697586]">{generateCouponLabel()}</span>
            )}
            <button
              className="text-primary hover:opacity-70 disabled:opacity-70"
              onClick={onClickDetails}
              disabled={isLoading}
            >
              {t("Redeem Reward")}
            </button>
          </div>
          <div>
            <StampingProgress max={barMax || 10} counted={barCount || 0} />
          </div>
        </div>
      </div>
    </div>
  );
}
