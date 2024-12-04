import SEO from "@/components/seo/SEO";
import MerchantContext from "@/contexts/MerchantContext";
import { useQuery } from "@tanstack/react-query";
import { getGiftCardDetailInfo } from "modules/giftCard/apis";
import { useRouter } from "next/router";
import { QRCodeSVG } from "qrcode.react";
import React, { useContext } from "react";
import GiftCardDetail from "../../../modules/giftCard/components/GiftCardDetail";

const GiftCardSharing = () => {
  const router = useRouter();
  const id = router?.query?.giftCardId || "";
  const { merchantId, name, domain, currency } = useContext(MerchantContext);

  const { data, isFetched } = useQuery({
    queryKey: ["getGiftCardDetailInfo", id],
    queryFn: () =>
      getGiftCardDetailInfo({
        merchantId,
        voucherId: (id as string) || "",
      }),
    enabled: id !== "" ? true : false,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  return (
    <React.Fragment>
      <SEO title={"Redeem Voucher"} keywords="" description="product" />
      <div className="text-center grid grid-cols-1 gap-3 justify-center w-full px-2 sm:px-10">
        <h1 className="font-[500] m-0">Redeem Voucher</h1>
        <GiftCardDetail
          isFetched={isFetched}
          data={data?.giftCardDetail || {}}
          layout="detail"
          merchantName={name}
          domain={domain}
          currency={currency}
        />
      </div>
    </React.Fragment>
  );
};

export default GiftCardSharing;
