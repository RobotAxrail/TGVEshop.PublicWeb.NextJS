import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Tooltip } from "../common/Tooltip";
import { faCopy as faCopyRegular } from "@fortawesome/free-regular-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface ITextDisabledDisplayProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
}

const TextDisabledDisplay: React.FC<ITextDisabledDisplayProps> = ({
  label,
  value,
  ...rest
}) => {
  const [copyValue, setCopyValue] = useState({ value: "", copied: false });
  const [tooltipActive, setTooltipActive] = useState(false);

  return (
    <>
      <div
        {...rest}
        className={`mt-2 relative ${!!rest.className && rest.className}`}
      >
        <div className="bg-gray-200 h-auto w-full rounded-[0.4rem] relative text-xs pb-2.5 px-4 pt-[31px] border border-gray-300">
          <label className="text-gray-600 absolute top-0 left-0 pl-4 pt-3 origin-top-left">
            {label}
          </label>
          <p className="font-bold m-0 text-[0.82rem] text-left line-clamp-2">
            {value}
          </p>
        </div>
        <Tooltip message="Copied" show={tooltipActive}>
          <CopyToClipboard
            text={value}
            onCopy={() => {
              setCopyValue({ value: value, copied: true });
              setTooltipActive(true);
              setTimeout(() => {
                setTooltipActive(false);
              }, 1500);
            }}
          >
            <a
              data-event="click focus"
              data-tip="Copied"
              data-for="orderNumber"
              className="absolute top-1/3 my-auto right-4 cursor-pointer no-underline"
            >
              <FontAwesomeIcon
                icon={faCopyRegular}
                className="text-gray-400 text-xl"
              />
            </a>
          </CopyToClipboard>
        </Tooltip>
      </div>
    </>
  );
};

export default TextDisabledDisplay;
