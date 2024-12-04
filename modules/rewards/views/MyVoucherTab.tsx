import MerchantContext from "@/contexts/MerchantContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import useTranslation from "next-translate/useTranslation";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Cookie from "universal-cookie";
import { acceptOrRejectVoucher, getMyVoucherList } from "../api";
import VoucherCard from "../components/voucher/VoucherCard";
import VoucherDetail from "../components/voucher/VoucherDetail";
import VoucherQRModal from "../components/voucher/VoucherQRModal";
import _, { uniqueId } from "lodash";
import { VoucherDetailModal } from "../components/voucher/VoucherDetailModal";
import ActionDialog from "../components/common/ActionDialog";
import { setToastState } from "@/states/toastBarState";

const SAMPLE_DATA = {
  voucherImage: ``,
  voucherCount: "",
  voucherName: "",
  expiryDate: ``,
  isLoading: true,
  key: "",
};

export default function MyVoucherTab({
  isViewingVoucher,
  setIsViewingVoucher,
  mode = "detail",
}) {
  const { merchantId } = useContext(MerchantContext);
  const { t } = useTranslation();
  const cookie = new Cookie();
  const [popupData, setPopUpdata] = useState({ open: false, voucherCode: "" });
  const [detailMode, setDetailMode] = useState("detail");
  const [isDetailModalOpen, setOpenDetailModal] = useState(false);
  const [selectedVoucherCode, setSelectedVoucherCode] = useState<{
    voucherCode?: string;
    open: boolean;
  }>({ open: false });

  const [dialogProps, setDialogProps] = useState({
    type: "good",
    title: "Accept Voucher",
    content: "Are you sure want to accept this voucher?",
    okButtonTitle: "Accept",
    open: false,
    mainAction: () => { },
    closeAction: () => { },
  });

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["voucher list"],
    queryFn: async () =>
      await getMyVoucherList({
        customerId: cookie.get("signIn")?.customerId,
        merchantId,
        filterType: mode === "detail" ? "" : mode,
      }),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const { mutate, isLoading: isActionLoading } = useMutation({
    mutationFn: acceptOrRejectVoucher,
    mutationKey: ["accept-reject-voucher"],
    onSuccess: (resData) => {
      refetch();
      setToastState({
        show: true,
        severity: resData?.status === "true" ? "success" : "error",
        message: resData?.message,
      });
      setDialogProps({ ...dialogProps, open: false });
    },
  });

  useEffect(() => {
    refetch();
  }, [mode]);

  const listAdapter = useCallback(
    (rawData: any, index: number) => {
      const {
        voucherId,
        image,
        title,
        expiryDate,
        remainingQuantity,
        voucherCode,
        isShareable,
        pendingAccept,
        pendingReceiverAccept,
      } = rawData;
      return isLoading
        ? { ...SAMPLE_DATA, key: index }
        : {
          voucherImage: `${process.env.BUCKET_URL}${image}`,
          voucherCount: remainingQuantity,
          voucherName: title,
          key: `${voucherId}-${pendingAccept}-${pendingReceiverAccept}`,
          voucherCode,
          voucherId,
          isLoading,
          isShareable,
          pendingAccept,
          pendingReceiverAccept,
          rawData,
          expiryDate: `${t("Valid till")} ${dayjs(expiryDate).format(
            "DD MMM YYYY"
          )}`,
        };
    },
    [isLoading]
  );

  return (
    <React.Fragment>
      {!isViewingVoucher ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {!(data?.list?.length > 0) && !(isLoading || isRefetching) && (
            <div className="col-span-12 text-center flex flex-col p-4">
              <div>No Vouchers Available</div>
            </div>
          )}
          {isLoading || isRefetching ? (
            [0, 1, 2].map((item: any) => {
              return (
                <div className="border border-gray-100 rounded-xl h-[310px] w-full p-3">
                  <div className="animate-pulse w-full h-[50%] bg-gray-200 rounded-md"></div>
                  <div className="animate-pulse w-20 h-4 bg-gray-200 rounded-full mt-6"></div>
                  <div className="animate-pulse w-[80%] h-4 bg-gray-200 rounded-full mt-2"></div>
                </div>
              );
            })
          ) : (
            <>
              {data?.list
                ?.map(listAdapter)
                .map(
                  ({
                    voucherCount,
                    voucherImage,
                    voucherCode,
                    voucherName,
                    expiryDate,
                    voucherId,
                    isLoading,
                    isShareable,
                    pendingAccept,
                    pendingReceiverAccept,
                    rawData,
                  }) => (
                    <VoucherCard
                      onShowDetails={() =>
                        setPopUpdata({ ...rawData, open: true })
                      }
                      voucherCount={voucherCount}
                      voucherImage={voucherImage}
                      voucherName={voucherName}
                      expiryDate={expiryDate}
                      isLoading={isLoading}
                      isShareable={isShareable}
                      setIsViewingVoucher={setIsViewingVoucher}
                      key={_.uniqueId(`${voucherId}_`)}
                      onRedeem={() =>
                        setSelectedVoucherCode({ voucherCode, open: true })
                      }
                      mode={mode}
                      setDetailMode={setDetailMode}
                      data={rawData}
                      isDetailModalOpen={isDetailModalOpen}
                      setOpenDetailModal={setOpenDetailModal}
                      refetch={refetch}
                      dialogProps={dialogProps}
                      setDialogProps={setDialogProps}
                      mutate={mutate}
                      isActionLoading={isActionLoading}
                    />
                  )
                )}
            </>
          )}
        </div>
      ) : (
        <VoucherDetail
          popupData={popupData}
          onRedeem={() =>
            setSelectedVoucherCode({
              voucherCode: popupData?.voucherCode,
              open: true,
            })
          }
          mode={detailMode}
          setMode={setDetailMode}
          setIsViewingVoucher={setIsViewingVoucher}
        />
      )}

      <VoucherDetailModal
        isViewing={isDetailModalOpen}
        setIsViewing={setOpenDetailModal}
        data={popupData}
      />

      <VoucherQRModal
        onClose={() => {
          setSelectedVoucherCode((p) => ({ ...p, open: false }));
          refetch();
        }}
        voucherCode={selectedVoucherCode?.voucherCode}
        isOpen={selectedVoucherCode?.open}
      />

      <ActionDialog {...dialogProps} isLoading={isActionLoading} />
    </React.Fragment>
  );
}
