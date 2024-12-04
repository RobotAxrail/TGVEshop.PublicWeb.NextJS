import useTranslation from "next-translate/useTranslation";
import { ReactElement, useState } from "react";
import { Popup } from "react-vant";
import dayjs from "dayjs";

// Children is the bottom action section for this voucher card detail
export default function VoucherCardDetails({
  popupData,
  onClose,
  children,
}: {
  children: ReactElement;
  onClose: () => void;
  popupData: any;
}) {
  const { t } = useTranslation();
  return (
    <Popup
      className="md:rounded-md max-w-xl w-full md:h-auto h-screen"
      visible={Boolean(popupData?.open)}
      onClose={onClose}
      lockScroll
      closeable
    >
      <div className="flex flex-col p-4  h-full">
        <div className="w-full flex flex-row space-x-3">
          <div className="w-[100px] h-[100px]">
            <img
              className="rounded-md border object-cover h-full w-full"
              src={`${process.env.BUCKET_URL}${popupData?.image}`}
              alt={popupData?.title}
            />
          </div>
          <div className="flex flex-col items-start w-[70%]">
            <div className="text-sm px-2 py-0.5 mb-1 bg-[#EDFCF2] text-[#16B364] border-[0.5px] border-[#16B364] rounded-lg">{`${popupData?.remainingQuantity} left`}</div>
            <div className="font-[400] line-clamp-2">{popupData?.title}</div>
            <div className="text-sm sm:text-base text-[#697586] mt-auto">
              {`${t("Valid till")} ${dayjs(popupData?.expiryDate).format(
                "DD MMM YYYY"
              )}`}
            </div>
          </div>
        </div>

        <div
          className="md:mt-2 h-full overflow-y-auto hide-scrollbar"
          dangerouslySetInnerHTML={{
            __html: `${popupData?.description}`,
          }}
        />
        {children}
      </div>
    </Popup>
  );
}
