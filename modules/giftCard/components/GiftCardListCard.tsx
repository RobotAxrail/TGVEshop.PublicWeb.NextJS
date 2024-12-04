import Image from "next/image";
import { Button } from "react-vant";

export default function GiftCardListCard({
  image,
  title,
  giftCardValue,
  onClickButton,
  disabled,
  onClickImage,
  currency,
}: {
  onClickButton?: () => void;
  image: string;
  title: string;
  giftCardValue: number;
  disabled?: boolean;
  onClickImage?: () => void;
  currency?: string;
}) {
  return (
    <div className="lg:w-[230px] lg:h-[300px] flex flex-col border-[#e5e7eb] border-solid border-2 rounded-lg">
      <div
        className="w-full h-[200px] relative cursor-pointer"
        onClick={onClickImage}
      >
        <Image
          alt="image"
          priority={true}
          layout="fill"
          objectFit="cover"
          className={`rounded-t-md`}
          src={process.env.BUCKET_URL + image}
        />
      </div>
      <div className="m-4 ">
        <div className="mb-2">
          <div className="text-sm font-semibold">{title}</div>
          <div className="text-xs mt-1">
            {currency} {giftCardValue}
          </div>
        </div>
        <div className="border-[#e5e7eb] border-solid border-[1px]" />

        <Button
          type="primary"
          style={{ borderRadius: 8, width: "100%", marginTop: 8 }}
          onClick={onClickButton}
          loading={false}
          disabled={disabled}
          className="disabled:bg-[#EDEDED] disabled:text-[#9E9E9E] disabled:border-none"
        >
          Share
        </Button>
      </div>
    </div>
  );
}
