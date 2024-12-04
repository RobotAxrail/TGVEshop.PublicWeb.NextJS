import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";


const Items = ({ image, title, price, description, itemId,seoUrl }) => {
  const router = useRouter();


  const handleItemClick = () => {
    router.push(`/eshop/${seoUrl}`); // Navigate to the dynamic product page
  };
  return (
    <div
      className="w-[110px] flex-none cursor-pointer" // flex-none to prevent shrinking
      onClick={handleItemClick}
    >
      {/* Image container with fixed aspect ratio */}
      <div className="relative w-full pb-[100%]"
      >
        <img 
          src={image} 
          className="absolute top-0 left-0 w-full h-full object-cover rounded-[8px]"
          alt={title}
    
        />
      </div>
      
      {/* Text content */}
      <div className="mt-2 flex flex-col gap-1">
        <h3
          className="h-[40px] text-ellipsis overflow-hidden whitespace-normal leading-5 font-normal text-[12px] text-[#D4D4D4]"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </h3>
        <p className="font-semibold text-[12px]">RM{price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Items;
