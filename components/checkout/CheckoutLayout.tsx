import React from "react";
import StepIcon from "../shared/StepIcon";
import userSVG from "@/images/user.svg";
import creditCardSVG from "@/images/credit-card.svg";
import arrowLeftSVG from "@/images/arrow-left.svg";
import Image from "next/image";

interface ICheckoutLayoutProps {
  pageModule: "checkout" | "payment";
  backButtonProps?: {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    label?: string;
  };
  children: React.ReactNode;
}

const CheckoutLayout: React.FC<ICheckoutLayoutProps> = ({
  pageModule,
  backButtonProps,
  children,
}) => {
  const stepIconPropsMap = new Map([
    //checkout is not used currently, this is just as an example
    [
      "checkout",
      [
        { imageSrc: userSVG, className: "bg-primary" },
        { imageSrc: creditCardSVG, className: "bg-gray-400" },
      ],
    ],
    [
      "payment",
      [
        { imageSrc: userSVG, className: "bg-green-primary" },
        { imageSrc: creditCardSVG, className: "bg-primary" },
      ],
    ],
  ]);

  return (
    <div className="m-site-padding sm:w-full sm:max-w-[30rem] sm:mx-auto">
      <div className="mb-5 flex justify-between items-center">
        <div>
          {backButtonProps && (
            <button className="flex" onClick={backButtonProps.onClick}>
              <Image
                alt="image"
                src={arrowLeftSVG}
                priority={true}
                width={23}
                height={23}
              />
              <p className="m-0 ml-2 text-primary text">
                {backButtonProps.label}
              </p>
            </button>
          )}
        </div>
        <div className="flex items-center">
          {stepIconPropsMap.get(pageModule).map((stepIconProps, index) => (
            <>
              <StepIcon
                className={stepIconProps.className}
                imageSrc={stepIconProps.imageSrc}
              />
              {index !== stepIconPropsMap.get(pageModule).length - 1 && (
                <div className="w-5 h-[0px] border-t-2 border-gray-300"></div>
              )}
            </>
          ))}
          {/* <StepIcon className="bg-green-primary" imageSrc={userSVG} />
          <div className="w-5 h-[0px] border-t-2 border-gray-300"></div>
          <StepIcon className="bg-primary" imageSrc={creditCardSVG} /> */}
        </div>
      </div>
      {children}
    </div>
  );
};

export default CheckoutLayout;
