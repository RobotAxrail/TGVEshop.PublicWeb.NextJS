import { VoucherIcon } from "@/components/image/VoucherIcon";
import { setToastState } from "@/states/toastBarState";
import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import { acceptOrRejectVoucher } from "modules/rewards/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { TbShare } from "react-icons/tb";
import { Button, Card, Image } from "react-vant";
import Cookies from "universal-cookie";
import { VoucherCount } from "../common/VoucherCount";
import ActionDialog from "../common/ActionDialog";

export default function VoucherCard({
  onShowDetails,
  voucherCount,
  voucherImage,
  voucherName,
  expiryDate,
  isLoading,
  isShareable,
  setIsViewingVoucher,
  isDetailModalOpen,
  setOpenDetailModal,
  onRedeem,
  buttonText = "Redeem Voucher",
  buttonProps,
  mode = "detail",
  setDetailMode,
  data,
  refetch,
  dialogProps,
  setDialogProps,
  mutate,
  isActionLoading,
}: {
  onShowDetails: () => void;
  onRedeem: () => void;
  voucherImage: string;
  voucherCount: string;
  voucherName: string;
  isLoading: boolean;
  isShareable: boolean;
  expiryDate: string;
  buttonText?: string;
  buttonProps?: any;
  mode?: string;
  setDetailMode?: React.Dispatch<React.SetStateAction<string>>;
  data?: any;
  setIsViewingVoucher?: React.Dispatch<React.SetStateAction<boolean>>;
  isDetailModalOpen?: boolean;
  setOpenDetailModal?: React.Dispatch<React.SetStateAction<boolean>>;
  refetch?: any;
  dialogProps?: any;
  setDialogProps?: React.Dispatch<React.SetStateAction<any>>;
  mutate?: UseMutateFunction<any, unknown, any>;
  isActionLoading?: boolean;
}) {
  const { pendingReceiverAccept } = data;
  const router = useRouter();

  const isSentVoucher = router.query.isReceive === "false";

  function renderFooter() {
    if (mode === "detail") {
      return (
        <VoucherCardFooter
          isLoading={isLoading}
          buttonProps={buttonProps}
          isShareable={isShareable}
          onRedeem={onRedeem}
          buttonText={buttonText}
          setIsViewingVoucher={setIsViewingVoucher}
          setDetailMode={setDetailMode}
          onShowDetails={onShowDetails}
        />
      );
    } else if (mode === "pendingaccept") {
      return (
        <PendingVoucherFooter
          data={data}
          refetch={refetch}
          dialogProps={dialogProps}
          setDialogProps={setDialogProps}
          mutate={mutate}
          isActionLoading={isActionLoading}
        />
      );
    }

    return null;
  }

  return (
    <>
      <Card
        style={{
          marginBottom: 20,
          boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
          border: "1px solid #E3E8EF",
          borderRadius: "12px",
        }}
        onClick={() => {
          if (isSentVoucher) {
            setOpenDetailModal(true);
          } else {
            setIsViewingVoucher(true);
          }
          onShowDetails();
        }}
        border
        round
      >
        <Card.Cover
          style={{
            padding: "16px 16px 0",
          }}
        >
          <Image
            style={{ height: "100px", width: "100px" }}
            className="mx-auto"
            src={voucherImage}
          />
          <div className="w-fit mt-4">
            <VoucherCount voucherCount={voucherCount} />
          </div>
        </Card.Cover>
        <Card.Body>
          <div className="space-y-2 text-[14px] pb-3">
            <div className="font-[400] line-clamp-1">{voucherName}</div>
            <div className="text-[#697586] mt-auto">{expiryDate}</div>
            {mode === "pendingreceiveraccept" && (
              <SentVoucherLabel pendingReceiverAccept={pendingReceiverAccept} />
            )}
          </div>
        </Card.Body>
        {mode !== "pendingreceiveraccept" && (
          <Card.Footer
            className="space-x-2"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "16px",
              borderBottom: "#EFEFEF",
            }}
          >
            {renderFooter()}
          </Card.Footer>
        )}
      </Card>
    </>
  );
}

function VoucherCardFooter({
  isLoading,
  buttonProps,
  isShareable,
  onRedeem,
  buttonText,
  setIsViewingVoucher,
  setDetailMode,
  onShowDetails,
}) {
  return (
    <>
      <Button
        style={{
          borderRadius: "6px",
          boxShadow:
            "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
          fontSize: 14,
        }}
        disabled={isLoading}
        size="normal"
        block
        type="primary"
        onClick={(e) => {
          e.stopPropagation();
          onRedeem();
        }}
        {...buttonProps}
      >
        {buttonText}
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
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsViewingVoucher(true);
            onShowDetails();
            setDetailMode("share");
          }}
        ></Button>
      )}
    </>
  );
}

function SentVoucherLabel({ pendingReceiverAccept }) {
  return (
    <>
      {!!pendingReceiverAccept && (
        <div className="text-sm flex content-center space-x-2">
          <div className="flex items-center justify-center h-5 w-5">
            <VoucherIcon />
          </div>
          <label className="text-sm text-[#697586]">{`${pendingReceiverAccept} voucher pending sharing`}</label>
        </div>
      )}
    </>
  );
}

function PendingVoucherFooter({ data, refetch, dialogProps, setDialogProps, mutate, isActionLoading }) {
  const cookie = new Cookies();

  return (
    <div className={`flex items-center justify-between w-full space-x-2`}>
      <Button
        style={{
          borderRadius: 7,
          boxShadow:
            "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
          fontSize: 14,
          width: "100%",
          transition: "all 0.35s ease",
          minWidth: 64
        }}
        disabled={isActionLoading}
        size="normal"
        block
        plain
        type="primary"
        onClick={(e) => {
          e.stopPropagation();
          const params = {
            type: "bad",
            title: "Decline Voucher",
            content:
              "If you decline this voucher, then the voucher will be returned to the sender",
            okButtonTitle: "Decline",
            mainAction: () => {},
            closeAction: () => {},
          };

          setDialogProps({
            ...params,
            open: true,
            mainAction: () =>
              mutate({
                action: "reject",
                confirmationDate: data?.confirmationDate,
                customerId: cookie.get("signIn")?.customerId,
                voucherCode: data?.voucherId,
              }),
            closeAction: () => {
              setDialogProps({ ...params, open: false });
            },
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
          width: "100%",
          transition: "all 0.35s ease",
          minWidth: 64
        }}
        disabled={isActionLoading}
        size="normal"
        block
        type="primary"
        onClick={(e) => {
          e.stopPropagation();
          const params = {
            type: "good",
            title: "Accept Voucher",
            content: "Are you sure want to accept this voucher?",
            okButtonTitle: "Accept",
            mainAction: () => {},
            closeAction: () => {},
          };

          setDialogProps({
            ...params,
            open: true,
            mainAction: () =>
              mutate({
                action: "accept",
                confirmationDate: data?.confirmationDate,
                customerId: cookie.get("signIn")?.customerId,
                voucherCode: data?.voucherId,
              }),
            closeAction: () => {
              setDialogProps({ ...params, open: false });
            },
          });
        }}
      >
        Accept
      </Button>
    </div>
  );
}
