import React from "react";

import Image from "next/image";
import searchicon from "../../public/assets/images/search-icon-eshop.svg";
import { Input } from "react-vant";
import carticon from "../../public/assets/images/carticon.svg";
import { useRouter } from "next/router";
import { useCart } from "@/contexts/EShopCartContext";

const EShopNavBar = ({ onSearch, searchQuery }) => {
  const { customerCart } = useCart();
  const router = useRouter();

  const handleCart = () => {
    router.push("/eshop/cart"); // Navigate to /eshop
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1>E-Shop</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative flex items-center">
          <Input
            placeholder="Search item..."
            value={searchQuery}
            onChange={(value) => onSearch(value)}
            style={{
              backgroundColor: "#2A2A2A",
              color: "#F4F4F5 !important",
              padding: "0 12px",
              border: "1px solid #F4F4F5",
              borderRadius: "50px",
              height: "35px",
            }}
            className="pr-[40px]"
          />
          <div className="absolute right-[12px] top-1/2 transform -translate-y-1/2 flex items-center">
            <Image src={searchicon} alt="Search" width={16} height={16} />
          </div>
        </div>
        <div className="relative h-[35px] w-[35px] rounded-full border-[1px] border-[#F4F4F5] flex items-center justify-center bg-[#2A2A2A] cursor-pointer">
          <Image
            src={carticon}
            alt="cart"
            width={20}
            height={20}
            onClick={handleCart}
          />
          {customerCart.length > 0 && (
            <div className="absolute -top-2 -right-2 bg-[#FF0013] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {customerCart.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EShopNavBar;
