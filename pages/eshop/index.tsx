import { FloatingButtonEShop } from '@/components/buttons/Buttons';
import HomeBannerCarousel from '@/components/eshop/Carousel';
import Collections from '@/components/eshop/Collections';
import EShopBotNavBar from '@/components/eshop/EShopBotNavBar';
import EShopNavBar from '@/components/eshop/EShopNavBar';
import React, { useContext, useEffect, useState } from 'react'
import MerchantContext from "@/contexts/MerchantContext";
import Cookies from "universal-cookie";
const EShop= () => {
  const [isDesktop, setIsDesktop] = useState(false); // To detect screen size
  const merchantInfoContext = useContext(MerchantContext);
  const cookie = new Cookies();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // Tailwind `md` breakpoint
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value) => {
    setSearchQuery(value);
  };
  
  return (
    <div className="flex flex-col  gap-4">
      <div className = "px-4 pt-5">
      <EShopNavBar onSearch={handleSearch} searchQuery={searchQuery} />
      </div>
      <div>
        <HomeBannerCarousel/>
      </div>
      <div className = {`mt-2 mb-20 ${isDesktop ?  "px-[40px]" :"px-4"}`}>
      <Collections searchQuery={searchQuery} />
      </div>
      <div className="fixed bottom-0 left-0 w-full">
        <EShopBotNavBar />
      </div>
      <FloatingButtonEShop merchantId={merchantInfoContext.merchantId} accessToken={cookie.get("accessToken")} />
    </div>
  );
  
}

export default EShop



