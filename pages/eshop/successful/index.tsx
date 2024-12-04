import React from "react";
import Image from "next/image";
// import qrcode from 'public/assets/images/qrcode.svg'; // You'll need a QR code image
import qrcode from 'public/assets/mock-images/mockqr.svg'
import { Button } from "@/components/ui/button";
import voucherpic from "public/assets/images/voucherpicture.svg"

const Successful = ({voucher}) => {
  const orderItems = [
    {
      title: "Original Tamagotchi - Tama Garden",
      quantity: "1x",
      price: 23.02,
    },
    {
      title: "T-Shirt & Royale Pop Corn",
      quantity: "1x",
      price: 70.0,
    },
  ];

  const totalAmount = orderItems.reduce((sum, item) => sum + item.price, 0);
  const orderCode = "82Hjskjw78102mkwd";

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 gap-6">
      <h1 className="font-semibold text-[24px]">Order Confirmed!</h1>

      <div className="bg-[#4D4D4D] w-full max-w-sm rounded-[16px] relative pt-5">
        {/* Your existing content with a z-index to stay above the line */}
        <div className="relative z-10">
          <div className="flex flex-col items-center gap-5 mb-6 text-center">
            <div className="flex flex-col gap-1 justify-center item-center">
            <p className="font-normal text-[12px] text-[#D4D4D4]">QR Code</p>
            <p className="font-semibold text-[14px]">{orderCode}</p>
            </div>
            <div className="bg-white rounded-[12px]">
              {/* QR code image here */}
              <Image src = { voucher? voucherpic: qrcode } alt="QR Code" />
            </div>
          </div>
          <div className="relative flex w-full my-5 border-t border-dashed border-[#D4D4D426]">
            <div className="absolute w-[24px] h-[24px] bg-[#111111] rounded-full top-1/2 -translate-y-1/2 -left-[12px]"></div>
            <div className="absolute w-[24px] h-[24px] bg-[#111111] rounded-full top-1/2 -translate-y-1/2 -right-[12px]"></div>
          </div>
          <div className="flex flex-col gap-3 px-4 w-full pt-[20px]">
            {orderItems.map((item, index) => (
              <div
                key={index}
                className="flex w-full justify-between items-center"
              >
                <div className="flex flex-col flex-grow">
                  <div className="flex gap-2 items-center">
                    <p className="font-normal text-[14px]">{item.title}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-medium text-[14px]">
                      RM{item.price.toFixed(2)}
                    </p>
                    <p className="text-[#D4D4D4] text-[14px]">
                      {item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 ">
          <div className="flex justify-between items-center bg-[#D70010] p-4 rounded-b-[16px]">
            <p className="font-normal text-[14px]">Total payment</p>
            <p className="font-medium text-[14px]">
              RM{totalAmount.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <Button
          className=" rounded-tl-[6px] rounded-tr-[24px] rounded-bl-[24px] rounded-br-[6px] w-full font-medium text-[14px]"
          style={{
            background:
              "linear-gradient(90.71deg, #FF0013 2.73%, #B72326 97.35%)",
          }}
        >
          Back to Home
        </Button>
    </div>
  );
};

export default Successful;
