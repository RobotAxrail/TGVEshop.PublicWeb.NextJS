import React from "react";
import Image from "next/image";
import cinemas from "public/assets/images/cinemas.svg";
import promotions from "public/assets/images/promotions.svg";
import fandb from "public/assets/images/f&b.svg";
import eshop from "public/assets/images/eshop.svg";
import movieclub from "public/assets/images/movieclub.svg";

const navItems = [
  { id: 1, name: "CINEMAS", image: cinemas, active: false },
  { id: 2, name: "PROMOTIONS", image: promotions, active: false },
  { id: 3, name: "F&B", image: fandb, active: false },
  { id: 4, name: "e-Shop", image: eshop, active: true }, // Active tab
  { id: 5, name: "MOVIECLUB", image: movieclub, active: false },
];

const EShopBotNavBar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#202020] flex justify-around items-center h-[60px] gap-1 cursor-pointer z-[1]">
 
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`flex flex-col items-center p-1 gap-1 cursor-pointer ${
            item.active ? "text-[#FF0013]" : "text-[#959595]"
          }`}
        >
          <Image src={item.image} alt={item.name} width={24} height={24} className="cursor-pointer" />
          <p className="text-[10px]">{item.name}</p>
        </div>
      ))}

    </div>
  );
};

export default EShopBotNavBar;