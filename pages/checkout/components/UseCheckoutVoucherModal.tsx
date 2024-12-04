import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { getMyVoucherList } from "modules/rewards/api";
import VoucherCard from "modules/rewards/components/voucher/VoucherCard";
import VoucherCardDetails from "modules/rewards/components/voucher/VoucherCardDetails";
import useTranslation from "next-translate/useTranslation";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { Button, Popup } from "react-vant";
import Cookie from "universal-cookie";

import { useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";

function useIsFirstRender(): boolean {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;

    return true;
  }

  return isFirst.current;
}

const SAMPLE_DATA = {
  voucherImage: ``,
  voucherName: "",
  expiryDate: ``,
  isLoading: true,
  key: "",
};

// Children is the bottom action section for this voucher card detail
export default function UseCheckoutVoucherModal({
  merchantId,
  onCurrentVoucherChange,
}: {
  merchantId: string;
  onCurrentVoucherChange: (voucherData: any) => void;
}) {
  const [isOpenVoucherModal, setIsOpenVoucherModal] = useState(false);
  const [currentVoucher, setCurrentVoucher] = useState({});
  const cookie = new Cookie();
  const { t } = useTranslation("common");
  const { isAuthenticated } = useAuth();
  const [popupData, setPopUpdata] = useState({ open: false });
  const isFirst = useIsFirstRender();

  const toggleVoucherModal = (isOpen: boolean) => {
    setIsOpenVoucherModal(isOpen);
    if (!isOpen) {
      setPopUpdata({ open: false });
    }
  };

  const setCurrentVoucherWithID = (voucherId: string) => {
    let targetVoucher = null;
    data?.list?.forEach((element) => {
      if (element.voucherId === voucherId) {
        targetVoucher = { ...element };
      }
    });
    setCurrentVoucher(targetVoucher);
  };

  useEffect(() => {
    if (!isFirst) onCurrentVoucherChange(currentVoucher);
  }, [currentVoucher]);

  const { data, isLoading } = useQuery({
    queryKey: ["voucher list"],
    queryFn: async () =>
      await getMyVoucherList({
        customerId: cookie.get("signIn")?.customerId,
        merchantId,
      }),
    enabled: isFirst && isAuthenticated,
  });

  const verifyVoucherValidity = (rawData: any) => {
    const isExpired = dayjs().isAfter(rawData.expiryDate, "day");
    const isCurrent =
      rawData.voucherCode === (currentVoucher as any)?.voucherCode;
    return isCurrent || isExpired;
  };

  const listAdapter = useCallback(
    (rawData: any, index: number) => {
      const { voucherId, image, title, expiryDate, remainingQuantity } =
        rawData;
      return isLoading
        ? { ...SAMPLE_DATA, key: index }
        : {
            voucherImage: `${process.env.BUCKET_URL}${image}`,
            voucherName: title,
            voucherCount: remainingQuantity,
            key: voucherId,
            voucherId,
            isLoading,
            rawData,
            expiryDate: `${t("Valid till")} ${dayjs(expiryDate).format(
              "DD MMM YYYY"
            )}`,
          };
    },
    [isLoading]
  );

  const CheckoutVoucherModal = (
    <>
      <Popup
        className="md:rounded-md max-w-xl w-full md:h-[600px] h-screen max-h-screen"
        onClose={() => toggleVoucherModal(false)}
        visible={isOpenVoucherModal}
        title={"Voucher"}
        lockScroll
        closeable
      >
        <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-1 md:grid-cols-2 p-4">
          {!(data?.list?.length > 0) && (
            <div className="col-span-12 text-center flex flex-col p-4">
              <div>No Vouchers Available</div>
            </div>
          )}
          {data?.list
            ?.map(listAdapter)
            .map(
              ({
                voucherImage,
                voucherName,
                expiryDate,
                voucherId,
                voucherCount,
                isLoading,
                rawData,
              }) => (
                <VoucherCard
                  voucherImage={voucherImage}
                  voucherName={voucherName}
                  expiryDate={expiryDate}
                  isLoading={isLoading}
                  key={voucherId}
                  onRedeem={() => {
                    setCurrentVoucher(rawData);
                    toggleVoucherModal(false);
                  }}
                  onShowDetails={() => {
                    setIsOpenVoucherModal(false);
                    setPopUpdata({ ...rawData, open: true });
                  }}
                  voucherCount={voucherCount}
                  buttonText={"Use"}
                  buttonProps={{ disabled: verifyVoucherValidity(rawData) }}
                  isShareable={false}
                  data={rawData}
                />
              )
            )}
        </div>
      </Popup>
      <VoucherCardDetails
        onClose={() => {
          setIsOpenVoucherModal(true);
          setPopUpdata((p) => ({ ...p, open: false }));
        }}
        popupData={popupData}
      >
        <div className="py-2 w-full">
          <Button
            style={{ borderRadius: "6px" }}
            disabled={verifyVoucherValidity(popupData)}
            size="normal"
            block
            type="primary"
            onClick={() => {
              let data = structuredClone(popupData);
              delete data.open;
              setCurrentVoucher(data);
              toggleVoucherModal(false);
              setPopUpdata((p) => ({ ...p, open: false }));
            }}
          >
            Use
          </Button>
        </div>
      </VoucherCardDetails>
    </>
  ) as ReactElement;

  return {
    CheckoutVoucherModal,
    toggleVoucherModal,
    currentVoucher,
    setCurrentVoucherWithID,
  };
}
