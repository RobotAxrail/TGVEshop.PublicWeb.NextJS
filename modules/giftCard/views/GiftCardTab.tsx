import React, { useContext, useState } from "react";
import GiftCardDetail from "../components/GiftCardDetail";
import GiftCardListCard from "../components/GiftCardListCard";
import { getGiftCardDetailInfo, getListGiftCard } from "../apis";
import { useMutation, useQuery } from "@tanstack/react-query";
import GiftCardShare from "modules/giftCard/components/GiftCardShare";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";
import MerchantContext from "@/contexts/MerchantContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export function GiftCardTab({}: any) {
  const cookie = new Cookie();
  const { merchantId, name, domain, currency } = useContext(MerchantContext);
  const router = useRouter();
  const id = router?.query?.id || ""; // voucherId
  const [afterPurchaseGiftCard, setAfterPurchaseGiftCard] = useLocalStorage(
    "afterPurchaseGiftCard",
    false
  );

  const [openRedeemModal, setOpenRedeemModal] = useState(false);
  const [selectedId, setSelectedId] = useState(id);

  const [openShareModal, setOpenShareModal] = useState(afterPurchaseGiftCard);

  const {
    data: giftCardList,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: ["giftCardList"],
    queryFn: () =>
      getListGiftCard({
        customerId: cookie.get("signIn")?.customerId,
        merchantId,
        filterType: "",
        voucherType: "giftCard",
      }),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const { data, isFetched } = useQuery({
    queryKey: ["getGiftCardDetailInfo", selectedId],
    queryFn: () =>
      getGiftCardDetailInfo({
        merchantId,
        voucherId: (selectedId as string) || "",
      }),
    enabled: selectedId !== "" ? true : false,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  return (
    <React.Fragment>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 pr-1">
        {!(giftCardList?.list?.length > 0) && !(isLoading || isRefetching) && (
          <div className="col-span-12 text-center flex flex-col p-4">
            <div>No Gift Card Available</div>
          </div>
        )}
        {isLoading || isRefetching ? (
          Array.from(Array(6)).map((item: any) => {
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
            {giftCardList?.list?.map((data) => (
              <GiftCardListCard
                {...data}
                currency={currency}
                disabled={data.isSharabled}
                onClickImage={() => {
                  setOpenRedeemModal(true);
                  setSelectedId(data.voucherId);
                }}
                onClickButton={() => {
                  setOpenRedeemModal(true);
                  setSelectedId(data.voucherId);
                }}
              />
            ))}
          </>
        )}
      </div>
      <GiftCardShare
        openModal={openShareModal}
        onClose={() => {
          setOpenShareModal(false);
          setAfterPurchaseGiftCard(false);
        }}
        giftCardId={selectedId}
        merchantName={name}
        domain={domain}
      />
      <GiftCardDetail
        layout="dialog"
        openModal={openRedeemModal}
        onClose={() => {
          setOpenRedeemModal(false);
        }}
        isFetched={isFetched}
        data={data?.giftCardDetail || {}}
        giftCardId={selectedId}
        merchantName={name}
        domain={domain}
        shareable={true}
        currency={currency}
      />
    </React.Fragment>
  );
}
