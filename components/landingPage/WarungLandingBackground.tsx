import Image from "next/image";
import React from "react";

interface IWarungLandingBackgroundProps {
  children: React.ReactNode;
  imageSrc: string;
}

const WarungLandingBackground: React.FC<IWarungLandingBackgroundProps> = ({
  children,
  imageSrc,
}) => {
  return (
    <div className="flex flex-col flex-grow bg-gray-100 overflow-hidden relative">
      <div className="absolute inset-0 h-full w-full">
        <Image
          alt="image"
          layout="fill"
          objectFit="cover"
          src={process.env.BUCKET_URL + imageSrc}
          priority={true}
        />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
      </div>
      {children}
    </div>
  );
};

export default WarungLandingBackground;
