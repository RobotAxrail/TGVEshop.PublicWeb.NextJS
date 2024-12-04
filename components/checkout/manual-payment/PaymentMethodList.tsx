import { ContainedButton } from "@/components/buttons/Buttons";
import { DaisyRadioButton, RectTextInput } from "@/components/inputs/Input";
import InfoSVG from "@/images/info.svg";
import { IPaymentMethod } from "../../../types";
import Image from "next/image";

import React, { Fragment, useEffect, useState } from "react";
import useTranslation from 'next-translate/useTranslation';

interface IPaymentMethodListProps {
  paymentMethodMap: Map<string, IPaymentMethod>;
}

const PaymentMethodList = ({
  paymentMethodMap,
  setSelectedPaymentMethodName
}) => {
  const [paymentMethodState, setPaymentMethodState] = useState({
    idToShowQRCode: "",
    //first item in paymentMethodMap
    selectedPaymentOption: [...paymentMethodMap][0][1].id,
  });

  const handleChangePaymentMethod = (paymentMethodId: string) => {
    //if item clicked is not the currently selected
    if (paymentMethodId !== paymentMethodState.selectedPaymentOption) {
      setPaymentMethodState({
        idToShowQRCode: "",
        selectedPaymentOption: paymentMethodId,
      });
    }

    const selPayMethotTitle = paymentMethodMap.get(paymentMethodId);
    setSelectedPaymentMethodName(selPayMethotTitle.title);
  };

  const handleHideOrShowQRCode = (paymentMethodId) => {
    //true is QR is supposed to show, false if QR needs to be hidden
    const qrCodeIsShowing = !paymentMethodState.idToShowQRCode;

    setPaymentMethodState({
      idToShowQRCode: qrCodeIsShowing ? paymentMethodId : "",
      selectedPaymentOption: paymentMethodId,
    });
  };

  const selectedPaymentMethod = paymentMethodMap.get(
    paymentMethodState.selectedPaymentOption
  );

  const [paynmentDialogOpen, setPaymentDialogOpen] = useState(false);
  const { t } = useTranslation('common');

  useEffect(() => {
    if (selectedPaymentMethod.title.toLowerCase() === "duitnow") {
      setPaymentMethodState({
        idToShowQRCode: selectedPaymentMethod.id,
        selectedPaymentOption: selectedPaymentMethod.id,
      });
    }
  }, [selectedPaymentMethod])

  useEffect(() => {
    setSelectedPaymentMethodName(Array.from(paymentMethodMap)[0][1].title);
  }, []);

  const ConfirmationDialog = () => {

    return (
      <div className="fixed h-screen sm:mx-auto flex items-center justify-center bg-black/75 z-[20] top-0 left-0 right-0">
        <div className="flex flex-col items-center max-w-[25rem] justify-center w-[80%] bg-white opacity-1 rounded-lg py-5 px-6">
          <h3 className="m-0 mb-3 self-start text-base font-semibold">{t('Payment Redirect')}</h3>
          <p className="m-0 font-normal text-sm">
            {t('You will be redirecting to Touch n Go eWallet ...')}
            
          </p>
          <div className="flex flex-row items-center justify-end w-full mt-3">
            <button
              className="py-1 px-3 rounded-md hover:bg-gray-200 font-medium text-sm"
              onClick={() => setPaymentDialogOpen(false)}
            >
              {t('Cancel')}
            </button>
            <button
              className="py-1 px-3 ml-1 rounded-md font-medium hover:bg-blue-100 text-blue-700 text-sm"
              onClick={() => {
                if (selectedPaymentMethod?.paymentLink.indexOf("http://") == 0 || selectedPaymentMethod?.paymentLink.indexOf("https://") == 0) {
                  window.open(selectedPaymentMethod?.paymentLink, "_newtab");
                } else {
                  window.open(`http://${selectedPaymentMethod?.paymentLink}`, "_newtab");
                }
                setPaymentDialogOpen(false);

              }}
            >
              {t('Okay')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-5">
      <h5 className="text-primary m-0 font-semibold text-sm">Payment Method</h5>
      <div className="form-control">
        {[...paymentMethodMap].map((paymentMethodArr) => {
          //key is equals to paymentMethod.id
          const [key, paymentMethod] = paymentMethodArr;

          return (
            <Fragment key={key}>
              <label className="cursor-pointer grid grid-cols-[2.5rem_auto] mt-3 items-center">
                <DaisyRadioButton
                  checked={paymentMethodState.selectedPaymentOption === key}
                  onChange={(e) => handleChangePaymentMethod(key)}
                />
                <div>
                  <span className="label-text flex justify-between">
                    <div>
                      <p className="m-0">{paymentMethod.title === "TnG" ? "Touch 'n Go eWallet" : paymentMethod.title}</p>
                      <p className="m-0 font-light text-xs">
                        {paymentMethod.description}
                      </p>
                    </div>
                    {paymentMethodState.selectedPaymentOption === key &&
                      paymentMethod.qrCode && (
                        <span onClick={(e) => handleHideOrShowQRCode(key)}>
                          <p className="text-xs text-primary m-0">
                            {paymentMethodState.idToShowQRCode === key
                              ? "Hide QR Code"
                              : "Show QR Code"}
                          </p>
                        </span>
                      )}
                  </span>
                </div>
              </label>
              <div className="grid grid-cols-[2.5rem_auto]">
                <div></div>
                <div>
                  {
                    key === paymentMethodState.selectedPaymentOption && (
                      <div className="bg-[#FFF0DC] rounded-md h-auto w-full p-3 grid grid-cols-[30px_auto] gap-3 mt-3">
                        <Image
                          alt="image"
                          src={InfoSVG}
                          width={15}
                          height={15}
                        />
                        <p className="text-xs m-0 font-light">
                          {
                            paymentMethod.title.toLowerCase() === "tng" || paymentMethod.title.toLowerCase() === "touch 'n go ewallet"
                              ? paymentMethod?.qrCode && key === paymentMethodState.idToShowQRCode
                                ? t('Pay using Touch n Go eWallet QR')
                                : !paymentMethod.infoText
                                  ? t('Pay using Touch n Go eWallet app')
                                  : paymentMethod.infoText
                              : paymentMethod.title.toLowerCase() === "duitnow"
                                ? !paymentMethod.infoText
                                  ? t('Pay using DuitNow QR code')
                                  : paymentMethod.infoText
                                : paymentMethod.infoText
                          }
                        </p>
                      </div>
                    )}
                  {paymentMethod?.qrCode &&
                    key === paymentMethodState.idToShowQRCode && (
                      <div className="p-5 border-[1px] border-gray-300 rounded-xl mt-5">
                        <div className="relative w-full h-[210px]">
                          <Image
                            alt="qr code"
                            src={process.env.BUCKET_URL + paymentMethod.qrCode}
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </Fragment>
          );
        })}
        {selectedPaymentMethod?.paymentLink && (
          <ContainedButton
            className="rounded-md mt-5"
            onClick={() => {
              if (selectedPaymentMethod?.title.toLowerCase() === "tng")
                setPaymentDialogOpen(true);
            }}
          >
            {t('Pay using')} {selectedPaymentMethod.title === "TnG" ? "Touch 'n Go eWallet" : selectedPaymentMethod.title}
          </ContainedButton>
        )}
      </div>
      {paynmentDialogOpen && <ConfirmationDialog />}
    </div>
  );
};

export default PaymentMethodList;
