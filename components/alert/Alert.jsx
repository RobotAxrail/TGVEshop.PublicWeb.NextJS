import React from "react";

const Alert = ({ message, fontSize = "text-[16px]" }) => {
  return (
    <div className={`${fontSize} w-full my-3`}>
      <div className="w-full bg-red-100 text-[#ef5350] border border-current text-center rounded p-2">
        {message}
      </div>
    </div>
  );
};

export default Alert;
