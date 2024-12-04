import React from "react";
import Image from "next/image";

interface IStepIconProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
}

const StepIcon: React.FC<IStepIconProps> = ({ imageSrc, ...rest }) => {
  return (
    <div
      {...rest}
      className={`rounded-xl bg-primary w-10 aspect-square flex items-center justify-center ${rest.className} `}
    >
      <Image
        alt="image"
        src={imageSrc}
        priority={true}
        width={30}
        height={30}
      />
    </div>
  );
};

export default StepIcon;
