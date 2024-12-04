import React from "react";

const OptionCard = (props) => {
  const {
    idx,
    handleOnClickAction,
    spanContent,
    onMouseOver,
    onMouseOut,
    cardClassName = "",
    radioButtonContent,
    active = true,
  } = props;
  return (
    <div className="w-full">
      <div
        className={[
          `${cardClassName} 
          bg-white rounded-md border border-solid p-5 h-full`,
          active && "hover:border-primary cursor-pointer flex",
        ].join(" ")}
        onClick={handleOnClickAction}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        {radioButtonContent && (
          <div className="w-[3rem] mt-1">{radioButtonContent}</div>
        )}
        <div className="w-full text-[12px]">{spanContent}</div>
      </div>
    </div>
  );
};

export default OptionCard;
