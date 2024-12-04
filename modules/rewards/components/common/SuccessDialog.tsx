import MerchantContext from "@/contexts/MerchantContext";
import { setToastState } from "@/states/toastBarState";
import { useContext } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { TbLink } from "react-icons/tb";
import { Button } from "react-vant";

export const SuccessDialog = ({
  recipientValue,
  open,
  setOpen,
  voucherTitle,
  quantity,
}) => {

  const { domain } = useContext(MerchantContext)

  if (open) {
    return (
      <div className="fixed flex content-center inset-0 bg-black h-full w-full bg-opacity-50 z-[100]">
        <div className="flex flex-col items-center text-center m-auto h-fit relative rounded-md bg-white opacity-100 z-[101] w-[60%] max-w-[480px] p-6 space-y-5">
          <HiCheckCircle className="text-[#2BCE24] text-[56px]" />
          <label className="font-medium text-xl">
            Successfully shared voucher
          </label>
          <label className="border-b border-b-[#CDD5DF] pb-6 text-[#697586] text-sm font-thin leading-6">
            {`You have successfully shared ${quantity} ${voucherTitle} voucher to`}
            <span className="text-black text-sm font-medium px-1">{`${recipientValue}.`}</span>
            Your voucher will remain in My Rewards until redeemed
          </label>

          <label className="font-medium text-md">Let your friend know!</label>

          <div className="flex flex-col items-center justify-center">
            <Button
              className="hover:bg-[#FFF]"
              icon={
                <TbLink
                  style={{
                    fontSize: "18px",
                    color: "#4B5565",
                  }}
                />
              }
              style={{
                border: "none",
                padding: 0,
                width: 44,
                height: 44,
                borderRadius: "50%",
                backgroundColor: "#EEF2F6",
              }}
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(`${domain}/rewards?isReceive=true`)
                setToastState({
                  severity: "success",
                  message: "Link copied to clipboard",
                  show: true
                })
              }}
            />
            <label className="text-xs mt-2">Copy Link</label>
          </div>

          <Button
            style={{
              borderRadius: "6px",
              border: "1px solid #0A2541",
              boxShadow:
                "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
              lineHeight: 1,
              fontSize: 14,
              color: "#0A2541",
              height: "auto",
              minHeight: 40,
              width: "50%",
              maxWidth: 240,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            Close
          </Button>
        </div>
      </div>
    );
  }

  return null;
};
