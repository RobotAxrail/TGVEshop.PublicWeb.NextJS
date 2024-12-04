import { VoucherIcon } from "@/components/image/VoucherIcon";
import dayjs from "dayjs";
import { FiArrowLeft } from "react-icons/fi";
import { TbShare } from "react-icons/tb";
import { Button, Image } from "react-vant";
import { VoucherCount } from "../common/VoucherCount";
import { ShareComponent } from "./ShareComponent";
import { useRouter } from "next/router";
import { acceptOrRejectVoucher } from "modules/rewards/api";
import Cookies from "universal-cookie";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { setToastState } from "@/states/toastBarState";

export default function VoucherDetail({
  popupData,
  onRedeem,
  setIsViewingVoucher,
  mode,
  setMode,
}) {
  const { voucherIcon, remainingQuantity, title, expiryDate } = popupData;

  return (
    <div className="inset-0 w-full h-fit bg-white -mt-6">
      {/* title row */}
      <div className="flex flex-row justify-between items-center bg-white">
        <Button
          icon={<FiArrowLeft />}
          className="hover:bg-[#EEF2F6]"
          style={{
            borderRadius: "8px",
            border: "none",
            padding: "4px 8px",
            marginLeft: "-8px",
          }}
          onClick={() => {
            if (mode === "share") {
              setMode("detail");
            } else {
              setIsViewingVoucher(false);
            }
          }}
        >
          Go Back
        </Button>
        <label className="text-center text-lg font-medium">
          Detail Voucher
        </label>
        <div className="w-[120px]"></div>
      </div>

      <div className="border border-[#CDD5DF] rounded-lg w-full mt-4 p-6 flex flex-col md:flex-row justify-center items-center md:items-start">
        <Image
          className="w-full mb-4 md:mb-0"
          style={{ maxWidth: "240px", borderRadius: "6px", aspectRatio: 1 }}
          src={`${process.env.BUCKET_URL}${voucherIcon}`}
          fit="contain"
          radius="8px"
        />

        <div className="flex-3 justify-start items-start w-full h-full flex flex-col space-y-2 ml-6">
          <div className="w-fit">
            <VoucherCount voucherCount={remainingQuantity} />
          </div>

          <label className="font-medium text-lg">{title}</label>

          <label className="text-sm text-[#697586]">{`Valid till ${dayjs(
            expiryDate
          ).format("DD MMM YYYY")}`}</label>

          {mode === "detail" ? (
            <DetailComponent
              popupData={popupData}
              onRedeem={onRedeem}
              setMode={setMode}
            />
          ) : (
            <ShareComponent popupData={popupData} />
          )}
        </div>
      </div>
    </div>
  );
}

function DetailComponent({ popupData, onRedeem, setMode }) {
  const {
    voucherIcon,
    remainingQuantity,
    title,
    description,
    expiryDate,
    senderNameList,
    isShareable,
    pendingReceiverAccept,
    pendingAccept,
  } = popupData;

  const router = useRouter();

  const isPendingVoucher = router.query.isReceive === "true";

  const cookie = new Cookies();
  const [running, setRunning] = useState("");

  const { mutate, isLoading } = useMutation({
    mutationFn: acceptOrRejectVoucher,
    mutationKey: ["accept-reject-voucher"],
    onSuccess: (resData) => {
      setRunning("");
      window.location.reload()
      setToastState({
        show: true,
        severity: resData?.status === "true" ? "success" : "error",
        message: resData?.message,
      });
    },
  });

  return (
    <>
      {!!pendingReceiverAccept && (
        <div>
          <div className="text-sm flex content-center">
            <div className="flex items-center justify-center h-5 w-5">
              <VoucherIcon />
            </div>
            <label className="text-sm text-[#697586] ml-2">{`${pendingReceiverAccept} voucher pending sharing`}</label>
          </div>
        </div>
      )}

      <div
        dangerouslySetInnerHTML={{ __html: description }}
        className="mb-auto h-full"
      ></div>

      {isPendingVoucher ? (
        <div className="flex flex-row w-full h-full justify-end items-center pt-8 space-x-2">
          <Button
            style={{
              borderRadius: 7,
              boxShadow:
                "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
              fontSize: 14,
              display: running === "accept" ? "none" : "block",
              width: "100%",
              transition: "all 0.35s ease",
              maxWidth: 180
            }}
            loading={isLoading}
            size="normal"
            block
            plain
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              setRunning("reject");
              mutate({
                action: "reject",
                confirmationDate: popupData?.confirmationDate,
                customerId: cookie.get("signIn")?.customerId,
                voucherCode: popupData?.voucherId,
              });
            }}
          >
            Decline
          </Button>
          <Button
            style={{
              borderRadius: 7,
              boxShadow:
                "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
              fontSize: 14,
              display: running === "reject" ? "none" : "block",
              width: "100%",
              transition: "all 0.35s ease",
              maxWidth: 180
            }}
            loading={isLoading}
            size="normal"
            block
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              setRunning("accept");
              mutate({
                action: "accept",
                confirmationDate: popupData?.confirmationDate,
                customerId: cookie.get("signIn")?.customerId,
                voucherCode: popupData?.voucherId,
              });
            }}
          >
            Accept
          </Button>
        </div>
      ) : (
        <div className="flex flex-row w-full h-full justify-end items-center pt-8">
          <Button
            style={{
              borderRadius: "6px",
              boxShadow:
                "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
              fontSize: 14,
              maxWidth: 200,
            }}
            size="normal"
            block
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              onRedeem();
            }}
          >
            Redeem Voucher
          </Button>

          {isShareable && (
            <Button
              icon={
                <TbShare
                  style={{
                    fontSize: "18px",
                    color: "#4B5565",
                  }}
                />
              }
              style={{
                borderRadius: "6px",
                backgroundColor: "#EEF2F6",
                border: "none",
                padding: 0,
                minWidth: 44,
                marginLeft: 8,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setMode("share");
              }}
            ></Button>
          )}
        </div>
      )}
    </>
  );
}
