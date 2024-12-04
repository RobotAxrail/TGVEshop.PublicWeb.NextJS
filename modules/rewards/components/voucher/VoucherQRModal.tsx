import useTranslation from "next-translate/useTranslation";
import { useMutation } from "@tanstack/react-query";
import { generateQRCode } from "modules/rewards/api";
import { CountDown, Popup } from "react-vant";
import { ConfirmDialog } from "./ModalLayout";
import { QRCodeSVG } from "qrcode.react";
import Cookies from "universal-cookie";
import { useState } from "react";

function numberFormatter(value: number) {
  return value < 10 ? `0${value}` : value;
}

export default function VoucherQRModal({
  voucherCode,
  onClose,
  isOpen,
}: {
  voucherCode?: string;
  onClose: () => void;
  isOpen: boolean;
}) {
  const [qrCodeString, setQrCodeString] = useState();
  const { t } = useTranslation();
  const cookie = new Cookies();
  const { mutate, isLoading } = useMutation({
    onSuccess: (data) => setQrCodeString(data?.qrCodeString),
    mutationKey: ["voucherQuery"],
    mutationFn: generateQRCode,
  });

  const toggleShowQr = () =>
    mutate({
      customerId: (cookie.get("signIn") as any)?.customerId,
      voucherCode,
    });

  return (
    <Popup
      className="md:rounded-md max-w-md w-full md:h-fit h-screen"
      onClosed={() => setQrCodeString(undefined)}
      closeable={qrCodeString}
      onClose={onClose}
      visible={isOpen}
      destroyOnClose
    >
      {qrCodeString && (
        <VoucherQRPane voucherCode={qrCodeString} onClose={onClose} />
      )}
      {!qrCodeString && (
        <ConfirmDialog
          title={t("QR Code will be valid for 5 minutes")}
          onClickConfirm={toggleShowQr}
          confirmLabel={"Proceed"}
          isLoading={isLoading}
          closeLabel={"Cancel"}
          onClose={onClose}
          description={t(
            "Please only activate this reward when you are at the counter. Do you want to proceed ?"
          )}
        />
      )}
    </Popup>
  );
}

function VoucherQRPane({
  voucherCode,
  onClose,
}: {
  voucherCode: string;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col text-center align-center space-y-4 justify-center h-full p-4 py-12">
      <div className="text-primary w-[80%] mx-auto break-words text-xs">
        {voucherCode}
      </div>
      <QRCodeSVG
        style={{ width: "100%" }}
        value={voucherCode}
        width={"100%"}
        size={250}
      />
      <div className="text-xs text-gray-500">
        Please show this QR code to cashier for scanning within
      </div>
      <div className="pt-6">
        <CountDown time={300000} millisecond format="mm:ss" onFinish={onClose}>
          {(time) => (
            <div className="flex flex-row border border-primary text-primary rounded-md w-fit px-4 py-2 m-auto">
              <span>{numberFormatter(time?.minutes)}</span>
              <span>:</span>
              <span>{numberFormatter(time?.seconds)}</span>
            </div>
          )}
        </CountDown>
      </div>
    </div>
  );
}
