import GiftBoxSVG from "@/images/giftcard-gift-icon.svg";
import Image from "next/image";
import { Button } from "react-vant";
import GiftCardDialog from "./GiftCardDialog";
import ShareSection from "./ShareSection";

const GiftCardShare = ({
  openModal,
  onClose,
  giftCardId,
  merchantName,
  domain,
}: any) => {
  return (
    <GiftCardDialog open={openModal} onClose={onClose}>
      <div className="flex justify-center items-center">
        <Image
          alt="image"
          priority={true}
          width={250}
          height={250}
          src={GiftBoxSVG}
        />
      </div>
      <div className="flex flex-col divide-y justify-center items-center text-center">
        <div>
          <h1 className="text-2xl m-0">Gift Card Successfully Purchased</h1>
          <p>
            You have successfully purchased the gift card. Share this gift card
            to your loved ones
          </p>
        </div>
        <ShareSection
          merchantName={merchantName}
          domain={domain}
          giftCardId={giftCardId}
        />
        <div className="mx-auto w-1/2">
          <Button
            type="primary"
            style={{ borderRadius: 8, width: "100%" }}
            plain
            onClick={onClose}
            className="disabled:bg-[#EDEDED] disabled:text-[#9E9E9E] disabled:border-none"
          >
            Close
          </Button>
        </div>
      </div>
    </GiftCardDialog>
  );
};

export default GiftCardShare;
