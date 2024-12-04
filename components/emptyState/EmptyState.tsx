// components
import { ContainedButton } from "@/components/buttons/Buttons";
import Image from "next/image";

export const EmptyState = ({
  src,
  title,
  subtitle,
  icon,
  hasButton = false,
  buttonTitle,
  buttonAction,
  buttonClassName,
}: any) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-center p-5">
      {!!src ? (
        <Image
          src={src}
          className="w-[80px] h-[80px] mb-[30px]"
          alt="Empty Cart"
        ></Image>
      ) : null}
      <div className="text-2xl sm:text-3xl font-semibold">{title}</div>
      <p>{subtitle}</p>
      {hasButton && (
        <ContainedButton
          className={`${buttonClassName} font-semibold uppercase`}
          fontSize="text-[13px]"
          onClick={buttonAction}
        >
          {buttonTitle}
        </ContainedButton>
      )}
    </div>
  );
};
