import { setToastState } from "@/states/toastBarState";
import copy from "copy-to-clipboard";
import { FaLink, FaWhatsapp } from "react-icons/fa";
const ShareIconTemplate = ({ icon, text, onClick }: any) => {
  return (
    <div className="flex flex-col items-center justify-center cursor-pointer">
      <div
        className="flex items-center justify-center bg-[#E5E5E5] rounded-full w-[50px] h-[50px] cursor-pointer"
        onClick={onClick}
      >
        {icon}
      </div>
      <p className="text-[14px] mt-2">{text}</p>
    </div>
  );
};

const ShareSection = ({ merchantName, domain, giftCardId }: any) => {
  return (
    <div className="flex flex-col w-full">
      <p className="text-[20px] font-bold pt-0 mt-4">Share</p>
      <div className="grid grid-cols-2 gap-2">
        <ShareIconTemplate
          icon={<FaWhatsapp className="w-6 h-6" style={{ fill: "#25D366" }} />}
          text={"WhatsApp"}
          onClick={() => {
            const whatsappLink = `https://wa.me/?text=${encodeURIComponent(
              `Hello, I have sent you a gift card from ${merchantName}. Click here to claim it: https://${domain}/giftcard/share/${giftCardId}`
            )}`;
            window.open(whatsappLink, "_blank");
          }}
        />
        <ShareIconTemplate
          icon={<FaLink className="w-6 h-6" style={{ fill: "#4B5565" }} />}
          text={"Copy Link"}
          onClick={() => {
            copy(`https://${domain}/giftcard/share/${giftCardId}`);
            setToastState({
              show: true,
              severity: "success",
              message: "Copied.",
            });
          }}
        />
      </div>
    </div>
  );
};

export default ShareSection;
