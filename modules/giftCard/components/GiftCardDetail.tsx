import { LoadingIcon } from "@/components/icons/Icons";
import { setToastState } from "@/states/toastBarState";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { QRCodeCanvas } from "qrcode.react";
import React from "react";
import { Button } from "react-vant";
import { generateQRCode } from "../apis";

import dynamic from "next/dynamic";
const ShareSection = dynamic(import("./ShareSection"));
// const ErrorLottie = dynamic(import("./ErrorLottie"));
const GiftCardDialog = dynamic(import("./GiftCardDialog"));

const downloadQR = () => {
  const canvas = document.getElementById("QRCode") as HTMLCanvasElement;
  const pngUrl = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  let downloadLink = document.createElement("a");
  downloadLink.href = pngUrl;
  downloadLink.download = "qrcode.png";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

const GiftCardRedemption = ({
  giftCardAmount,
  giftCardCode,
  currency,
  qrRef,
}: any) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl text-[#008CDC]">
        {currency} {giftCardAmount} gift voucher
      </h1>
      <div className="mx-auto" ref={qrRef}>
        <QRCodeCanvas
          id={"QRCode"}
          value={giftCardCode}
          size={150}
          includeMargin
        />
      </div>

      <p>Scan this QR Code to use the gift card</p>
      <div className="mb-5 md:m-0">
        <Button
          type="primary"
          style={{
            borderRadius: 8,
          }}
          onClick={() => downloadQR()}
        >
          Download QR Code
        </Button>
      </div>
    </div>
  );
};

const GiftCardDetail = ({
  openModal,
  onClose,
  data,
  isFetched,
  merchantName,
  domain,
  giftCardId,
  shareable = false,
  currency,
  layout = "default",
}: any) => {
  const [qrCodeString, setQrCodeString] = React.useState("");
  const qrRef = React.useRef();
  const { mutate, isLoading: isGeneratingQR } = useMutation({
    onSuccess: (data) => {
      if (data?.qrCodeString) setQrCodeString(data?.qrCodeString);
      else {
        setToastState({
          show: true,
          severity: "error",
          message:
            "There seems to be an error with generating the QR code, please refresh the page to generate a new QR code.",
        });
      }
    },
    mutationKey: ["voucherQuery"],
    mutationFn: generateQRCode,
    onError: () => {
      setToastState({
        show: true,
        severity: "error",
        message: "Something went wrong! Please try again later.",
      });
    },
  });

  const toggleShowQr = () =>
    mutate({
      voucherCode: data?.voucherCode,
    });
  if (layout === "dialog")
    return (
      <GiftCardDialog
        open={openModal}
        onClose={() => {
          onClose();
          setQrCodeString("");
        }}
      >
        <div className="text-center">
          {isFetched && Object.keys(data).length === 0 && (
            <>
              {/* <ErrorLottie /> */}
              <h3>Invalid Gift Card</h3>
              <p>Gift Card is invalid! Please check the link and try again.</p>
            </>
          )}
          {isFetched && Object.keys(data).length !== 0 && (
            <React.Fragment>
              <div className="absolute top-0 left-0 w-full h-[180px] lg:h-[300px]">
                <div className="w-full h-[180px] lg:h-[300px] relative">
                  <Image
                    alt="image"
                    priority={true}
                    layout="fill"
                    sizes="100vw"
                    objectFit="cover"
                    src={process.env.BUCKET_URL + data?.image}
                  />
                </div>{" "}
              </div>

              <div className="flex flex-col my-[30px] items-center justify-center relative mt-[180px] lg:mt-[300px]">
                {qrCodeString && (
                  <GiftCardRedemption
                    giftCardAmount={data?.giftCardAmount}
                    giftCardCode={qrCodeString}
                    currency={currency}
                    qrRef={qrRef}
                  />
                )}

                {!qrCodeString && (
                  <>
                    <label className="text-sm text-[#697586]">
                      From: {data?.senderName}
                    </label>
                    <h1 className="text-xl">{data?.giftCardTitle}</h1>
                    <p className="text-[#697586]">{data?.giftCardMessage}</p>
                    <h1 className="text-2xl text-[#008CDC]">
                      {currency} {data?.giftCardAmount} gift voucher
                    </h1>
                    {shareable && (
                      <>
                        <div className="border-[#e5e7eb] border-solid border-[1px] w-full" />
                        <ShareSection
                          merchantName={merchantName}
                          domain={domain}
                          giftCardId={giftCardId}
                        />
                      </>
                    )}

                    <Button
                      type="primary"
                      style={{ borderRadius: 8, width: "100%", zIndex: 9 }}
                      onClick={() => {
                        toggleShowQr();
                      }}
                      disabled={isGeneratingQR}
                      loading={isGeneratingQR}
                    >
                      Redeem
                    </Button>
                  </>
                )}
              </div>
            </React.Fragment>
          )}
          {!isFetched && (
            <div className="w-full h-[500px]">
              <div className="flex justify-center items-center w-full h-full">
                <LoadingIcon color="text-primary" width="w-7" height="h-7" />
              </div>
            </div>
          )}
        </div>
      </GiftCardDialog>
    );
  else
    return (
      <>
        {isFetched && Object.keys(data).length === 0 && (
          <div className="mb-5 h-[500px] flex flex-col lg:flex-row items-center justify-center bg-white rounded-xl shadow-xl border-solid px-10 border-[#CDD5DF]">
            {/* <ErrorLottie /> */}
            <div className="flex flex-col">
              <h3>Invalid Gift Card</h3>
              <p>Gift Card is invalid! Please check the link and try again.</p>
            </div>
          </div>
        )}
        {isFetched && Object.keys(data).length !== 0 && (
          <div className="mb-5 inline-grid grid-cols-1 md:grid-cols-3 gap-5 items-center justify-center shadow-xl bg-white rounded-xl border-solid border-[#CDD5DF]">
            <div className="w-full h-[200px] md:h-[500px] md:col-span-2 relative">
              <Image
                alt="image"
                priority={true}
                layout="fill"
                sizes="100vw"
                objectFit="cover"
                className="rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                src={process.env.BUCKET_URL + data?.image}
              />
            </div>
            {!qrCodeString && (
              <div className="flex flex-col gap-5 px-5 lg:px-10 md:col-span-1">
                <label className="text-sm text-[#697586]">
                  From: {data?.senderName}
                </label>
                <h1 className="text-xl m-0">{data?.giftCardTitle}</h1>
                <p className="text-[#697586] m-0">{data?.giftCardMessage}</p>
                <h1 className="text-2xl text-[#008CDC] m-0">
                  {currency} {data?.giftCardAmount} gift voucher
                </h1>
                <Button
                  type="primary"
                  style={{
                    borderRadius: 8,
                    width: "100%",
                    marginBottom: "50px",
                  }}
                  onClick={() => {
                    toggleShowQr();
                  }}
                  disabled={isGeneratingQR}
                  loading={isGeneratingQR}
                >
                  Redeem
                </Button>
              </div>
            )}
            {qrCodeString && (
              <div className="flex flex-col gap-1 xs:gap-5 px-10">
                <h1 className="text-2xl text-[#008CDC] m-0">
                  {currency} {data?.giftCardAmount} gift voucher
                </h1>
                <div className="mx-auto" ref={qrRef}>
                  <QRCodeCanvas
                    id={"QRCode"}
                    value={qrCodeString}
                    size={150}
                    includeMargin
                  />
                </div>
                <p className="mt-0">Scan this QR Code to use the gift card</p>
                <div className="mb-5 md:m-0">
                  <Button
                    type="primary"
                    style={{
                      borderRadius: 8,
                    }}
                    onClick={() => downloadQR()}
                  >
                    Download QR Code
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
        {!isFetched && (
          <div className="mb-5 h-[500px] flex flex-col lg:flex-row items-center justify-center bg-white rounded-xl shadow-xl border-solid px-10 border-[#CDD5DF]">
            <div className="flex justify-center items-center w-full h-full">
              <LoadingIcon color="text-primary" width="w-7" height="h-7" />
            </div>
          </div>
        )}
      </>
    );
};

export default GiftCardDetail;
