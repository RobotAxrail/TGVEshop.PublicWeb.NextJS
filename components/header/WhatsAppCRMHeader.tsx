import MerchantContext from "@/contexts/MerchantContext";
import { useRouter } from "next/router";
import { useContext } from "react";

const WhatsAppCRMHeader = () => {
  const { logo } = useContext(MerchantContext) as any;

  return (
    <>
      <div id="header" className={`fixed h-auto z-20 w-full bg-primary `}>
        <div className="flex justify-center items-center">
          <img
            src={process.env.BUCKET_URL + logo}
            alt="logo"
            className="h-[92px]"
          />
        </div>
      </div>
      <div className="h-[92px]" />
    </>
  );
};

export default WhatsAppCRMHeader;
