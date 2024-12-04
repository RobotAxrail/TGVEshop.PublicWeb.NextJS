import { CataloguePagination } from "@/components/cataloguePagination/CataloguePagination";
import MerchantContext from "@/contexts/MerchantContext";
import useTranslation from "next-translate/useTranslation";
import React, { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Button, Stepper } from "react-vant";
import usePagination, {
  TQueryListFunc,
} from "../../../components/common/usePagination";
import { getMerchVoucherList } from "../api";
import useVoucherCart from "../components/context/VoucherStoreContext";
import DetailVoucher from "../components/voucher/DetailVoucher";
import VoucherDealsCard from "../components/voucher/VoucherDealsCard";
import VoucherQRModal from "../components/voucher/VoucherQRModal";

const SAMPLE_DATA = {
  voucherImage: ``,
  voucherCount: "",
  voucherName: "",
  expiryDate: ``,
  isLoading: true,
  key: "",
};

export function VoucherDealsTabs() {
  const [popupData, setPopUpdata] = useState({ open: false });
  const { merchantId, currency } = useContext(MerchantContext);
  const { t } = useTranslation();
  const [selectedVoucherCode, setSelectedVoucherCode] = useState<{
    voucherCode?: string;
    open: boolean;
  }>({ open: false });

  const getVoucherDeals: TQueryListFunc<any> = async ({ limit, page }) => {
    return await getMerchVoucherList({
      requiredPoints: false,
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
    queryKey: "voucher deals list",
    queryFunc: getVoucherDeals,
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
              {voucherList?.map((rawData) => {
                const { image, title, voucherId, price } = rawData;
                return (
                  <VoucherDealsCard
                    voucherImage={`${process.env.BUCKET_URL}${image}`}
                    price={`${currency}${price.toFixed(2)}`}
                    voucherName={title}
                    key={voucherId}
                    onShowDetails={() =>
                      setPopUpdata({
                        ...rawData,
                        secondary: `${currency}${price.toFixed(2)}`,
                        open: true,
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
      <VoucherQRModal
        onClose={() => setSelectedVoucherCode((p) => ({ ...p, open: false }))}
        voucherCode={selectedVoucherCode?.voucherCode}
        isOpen={selectedVoucherCode?.open}
      />
      <DetailVoucher
        onClose={() => setPopUpdata((p) => ({ ...p, open: false }))}
        {...(popupData as any)}
      >
        <div className="pt-2 w-full">
          <AddVoucherToCart voucherData={popupData} />
        </div>
      </DetailVoucher>
    </React.Fragment>
  );
}

function AddVoucherToCart({ voucherData }: { voucherData: any }) {
  const [counterValue, setCounterValue] = useState(1);
  const { getVoucher, updateVoucherCart, isUpdating, isLoading, voucherCart } =
    useVoucherCart();
  const voucherId = voucherData?.voucherId;

  useEffect(() => {
    setCounterValue(getVoucher(voucherId)?.voucherQuantity || 1);
  }, [voucherData, voucherCart]);

  const onUpdateQuantity = (changeBy: number) =>
    setCounterValue((v) => Math.max(1, changeBy + v));

  const onSubmit = () =>
    updateVoucherCart({
      voucherPrice: voucherData?.price,
      quantity: counterValue,
      voucherId,
    });

  return (
    <div className="flex flex-row space-x-2">
      {getVoucher(voucherId) && (
        <Button
          onClick={() => updateVoucherCart({ voucherId, quantity: 0 })}
          loading={isUpdating || isLoading}
          style={{ borderRadius: 5 }}
          icon={<FaTrash />}
          type="danger"
        />
      )}
      <div className="flex flex-row items-center border p-1 rounded-md">
        <button className="px-4" onClick={() => onUpdateQuantity(-1)}>
          -
        </button>
        <Stepper
          value={counterValue}
          showMinus={false}
          showPlus={false}
          theme="round"
          min={1}
        />
        <button className="px-4" onClick={() => onUpdateQuantity(1)}>
          +
        </button>
      </div>
      <Button
        style={{ borderRadius: "6px" }}
        loading={isUpdating || isLoading}
        className="w-full"
        onClick={onSubmit}
        type="primary"
      >
        {getVoucher(voucherId) ? "Update Cart" : "Add To Cart"}
      </Button>
    </div>
  );
}
