import { CataloguePagination } from "@/components/cataloguePagination/CataloguePagination";
import MerchantContext from "@/contexts/MerchantContext";
import { setToastState } from "@/states/toastBarState";
import { useMutation } from "@tanstack/react-query";
import useTranslation from "next-translate/useTranslation";
import React, { useContext, useState } from "react";
import { Popup } from "react-vant";
import Cookies from "universal-cookie";
import { getMerchVoucherList, redeemVoucherWithPoints } from "../api";
import usePagination, {
  TQueryListFunc,
} from "../../../components/common/usePagination";
import DetailVoucher from "../components/voucher/DetailVoucher";
import { ConfirmDialog } from "../components/voucher/ModalLayout";
import RedeemPointsCard from "../components/voucher/RedeemPointsCard";

const SAMPLE_DATA = {
  voucherImage: ``,
  voucherCount: "",
  voucherName: "",
  expiryDate: ``,
  isLoading: true,
  key: "",
};

export function VoucherPointsTab() {
  const [selectedRedeem, setSelectedRedeem] = useState({ open: false });
  const { merchantId } = useContext(MerchantContext);
  const { t } = useTranslation();

  const [popupData, setPopUpdata] = useState<{
    description?: string;
    secondary?: string;
    title?: string;
    image?: string;
    open: boolean;
    rawData?: any;
  }>({ open: false });

  const getPointsVoucher: TQueryListFunc<any> = async ({ limit, page }) => {
    return await getMerchVoucherList({
      requiredPoints: true,
      filter: {},
      merchantId,
      limit: limit,
      sort: {
        direction: "desc",
        field: "createdAt",
      },
      nextToken: (page === 0 ? null : limit * page) as any,
    });
  };

  const {
    items: voucherList,
    currentPage,
    totalPages,
    isLoading,
    handleNext,
    handlePrev,
    handleSetCurrentPage,
  } = usePagination<any>({
    queryKey: "voucher points list",
    queryFunc: getPointsVoucher,
    pageLimit: 12,
  });

  return (
    <React.Fragment>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 pr-1">
        {!(voucherList?.length > 0) && !isLoading && (
          <div className="col-span-12 text-center flex flex-col p-4">
            <div>No Vouchers Available</div>
          </div>
        )}
        {
          isLoading ? (
            [0, 1, 2].map((item: any) => {
              return (
                <div
                  className="border border-gray-100 rounded-xl h-[310px] w-full p-3"
                  key={item}
                >
                  <div className="animate-pulse w-full h-[50%] bg-gray-200 rounded-md"></div>
                  <div className="animate-pulse w-20 h-4 bg-gray-200 rounded-full mt-6"></div>
                  <div className="animate-pulse w-[80%] h-4 bg-gray-200 rounded-full mt-2"></div>
                </div>
              );
            })
          ) : (
            <>
              {voucherList?.map((d) => {
                const { requiredPoints, image, title, voucherId, description } = d;
                return (
                  <RedeemPointsCard
                    voucherImage={`${process.env.BUCKET_URL}${image}`}
                    onRedeem={() => setSelectedRedeem({ ...d, open: true })}
                    voucherPoints={requiredPoints}
                    voucherName={title}
                    key={voucherId}
                    onShowDetails={() =>
                      setPopUpdata({
                        secondary: `${requiredPoints} ${t("Points")}`,
                        description,
                        open: true,
                        rawData: d,
                        title,
                        image,
                      })
                    }
                  />
                );
              })}
            </>
          )}
      </div>
      {voucherList?.length > 0 && !isLoading && (
        <CataloguePagination
          totalPages={totalPages}
          selectedPage={currentPage + 1}
          handleSelectPage={(page) => handleSetCurrentPage(page - 1)}
          handleBackButton={handlePrev}
          handleForwardButton={handleNext}
          limit={undefined}
        />
      )}
      <PointsPurchaseFlow
        onClose={() => setSelectedRedeem((d) => ({ ...d, open: false }))}
        open={selectedRedeem?.open}
        popupData={selectedRedeem}
      />

      <DetailVoucher
        onClose={() => setPopUpdata((p) => ({ ...p, open: false }))}
        {...(popupData as any)}
      >
        <div className="py-2 w-full">
          <button
            className="bg-primary text-white p-2 rounded-md hover:opacity-80 active:opacity-90 w-full"
            onClick={() =>
              setSelectedRedeem({ ...popupData?.rawData, open: true })
            }
          >
            Redeem Points
          </button>
        </div>
      </DetailVoucher>
    </React.Fragment>
  );
}

function PointsPurchaseFlow({
  popupData,
  onClose,
  open,
}: {
  onClose: () => void;
  popupData: any;
  open: boolean;
}) {
  const [isSuccess, setIsSuccess] = useState(false);
  const { merchantId } = useContext(MerchantContext);
  const { t } = useTranslation();
  const cookie = new Cookies();

  const { mutate, isLoading } = useMutation({
    mutationFn: redeemVoucherWithPoints,
    mutationKey: ["getVoucherByPoints"],
    onSuccess: (data) => {
      const isSuccess = data?.status === "true";
      if (isSuccess) setIsSuccess(isSuccess);
      else
        setToastState({
          message: data?.message,
          severity: "error",
          show: true,
        });
    },
  });

  const buyWithPoint = () =>
    mutate({
      customerId: (cookie.get("signIn") as any)?.customerId,
      voucherId: popupData?.voucherId,
      merchantId,
    });

  const handleModalClose = () => {
    // only when isSuccess is true, this function will be triggered
    // isSuccess will be resetted to false after the modal is closed
    onClose();
    setIsSuccess(false);
  };

  return (
    <Popup
      className="md:rounded-md max-w-md w-full md:h-fit h-screen"
      onClose={onClose}
      visible={open}
    >
      {!isSuccess && (
        <ConfirmDialog
          description={`${popupData?.requiredPoints} point(s) will be deducted upon confirmation. Do you want to proceed ?`}
          onClickConfirm={buyWithPoint}
          confirmLabel={t("Proceed")}
          title={t("Redeem Points")}
          closeLabel={t("Cancel")}
          isLoading={isLoading}
          onClose={onClose}
        />
      )}
      {isSuccess && (
        <ConfirmDialog
          description={`We have issued the the voucher under 'My Rewards' and ${popupData?.requiredPoints} point(s) has been deducted from your account.`}
          title={t("Transaction Successful!")}
          closeLabel={t("Done")}
          isLoading={isLoading}
          onClose={handleModalClose}
        />
      )}
    </Popup>
  );
}
