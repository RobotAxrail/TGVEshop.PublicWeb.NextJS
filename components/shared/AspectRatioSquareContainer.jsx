import classes from "./AspectRatioSquareContainer.module.scss";

//css aspect-ratio is not supported in older browsers
//use this component to utilize aspect ratio 1/1
const AspectRatioSquareContainer = ({
  rounded = "md",
  children,
  className,
  ...rest
}) => {
  return (
    <div
      className={[
        `flex w-full h-full rounded-${rounded} overflow-hidden`,
        classes["aspect-ratio-square-image-box"],
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
};

export default AspectRatioSquareContainer;
