import React from "react";
import voucherpicture from "public/assets/images/voucherpicture.svg";
import Image from "next/image";
import { IoCheckmark } from "react-icons/io5";
import voucherblob from "public/assets/images/voucherblob.svg";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const Voucher = ({ id, title, expiry, isSelected, onClick }) => {

  const calculateDaysToExpiry = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffInMilliseconds = expiry.getTime() - now.getTime();
    return Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24)); // Convert ms to days
  };
  
  const daysToExpiry = calculateDaysToExpiry(expiry);
  return (
    <div className="" onClick={() => onClick(id)}>
      <div className="h-[106px] bg-white rounded-t-[12px] relative overflow-hidden cursor-pointer">
      {isSelected && (<div className="absolute top-0 right-[-100px] w-full h-full" style={{}}>
          <Image
            src={voucherblob}
            alt="Voucher"
            layout="fill"
            objectFit="cover"
          />
        </div>)}
        {isSelected && (
          <div className="absolute right-0 bg-[#02A771] w-[30px] h-[30px] rounded-bl-[12px] flex justify-center items-center">
            <IoCheckmark className="text-white" />
          </div>
        )}
        {/* Left half-circle */}
        <div className="absolute -left-[12px] bottom-5 w-[20px] h-[20px] bg-[#292929] rounded-full"></div>

        {/* Right half-circle */}
        <div className="absolute -right-[12px] bottom-5 w-[20px] h-[20px] bg-[#292929] rounded-full"></div>
        <div className="h-full w-full text-[#18181B] flex justify-between items-center px-[17px] text-[14px] font-normal">
          <div className="">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
            >
              {title}
            </ReactMarkdown>
          </div>
          <div className="w-[64px] h-[64px] flex-shrink-0">
            <Image
              src={voucherpicture}
              alt="Voucher"
              width={64}
              height={64}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
      <div className="h-[32px] bg-[#6BEAB6] rounded-b-[12px] px-[17px] flex items-center text-[#27272A] text-[12px] font-normal">
      <p>{daysToExpiry > 0 ? `Expiry in ${daysToExpiry} days` : "Expired"}</p>
      </div>
    </div>
  );
};

export default Voucher;
