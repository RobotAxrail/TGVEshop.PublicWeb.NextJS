import { useState, Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Tooltip } from "@/components/common/Tooltip";
import useTranslation from "next-translate/useTranslation";
// component
import PhoneInput from "react-phone-input-2";

// styles
import "react-phone-input-2/lib/style.css";
import classes from "./Input.module.scss";
import {
  animated,
  useSpring,
  config,
  useSpringRef,
  useChain,
  Globals,
} from "react-spring";

//disable checkbox animation
Globals.assign({
  skipAnimation: true,
});

/*
  current file has
  1. text input: TextInput, RectTextInput (with priamry colour border)
  2. check box: Checkbox
  3. select dropdown: RectSelectInput
      onChange(value)
      pass in data should be string list
*/

export const TextInput = (props) => {
  const { className, inputClassName, children, name, label, ...rest } = props;
  return (
    <div
      className={[
        classes["text-input-container"],
        "relative z-0 w-full",

        className,
      ].join(" ")}
    >
      <input
        className={`block 
          ${props.disabled ? "bg-gray-200" : "bg-white"}
          font-inherit text-gray-900
          h-14 w-full
          pb-2.5 px-4 pt-[27px]
          border border-gray-300 rounded-full 
          outline-none break-words ${inputClassName}`}
        name={name}
        {...rest}
      >
        {children}
      </input>
      <label
        htmlFor={name}
        className="text-gray-600 absolute top-0 left-0 pl-2 origin-top-left"
      >
        {label}
      </label>
    </div>
  );
};

export const Checkbox = (props) => {
  const {
    className = "",
    styled = {
      checkboxContainer: "",
      checkbox: "",
      label: "",
    },
    checkedStyled = {
      container: "",
      checkboxContainer: "",
      checkbox: "",
      label: "",
    },
    label = "",
    name,
    checked = false,
    onChange = () => {},
    ...rest
  } = props;
  const { t } = useTranslation("common");
  return (
    <label
      htmlFor={name}
      className={`${"inline-flex items-center leading-none cursor-pointer"} ${
        checked && checkedStyled.container
      } ${className}`}
    >
      <div
        className={`${
          styled.checkboxContainer
        } ${"p-[9px] inline-block align-middle"} ${
          checked && checkedStyled.checkboxContainer
        }`}
      >
        <input
          type="checkbox"
          id={name}
          name={name}
          value={label}
          checked={checked}
          onChange={onChange}
          className={`${classes.checkbox}
          ${"p-0 m-0 overflow-hidden whitespace-nowrap absolute invisible"}`}
          {...rest}
        />
        <div
          className={[
            "inline-block m-0 w-[18px] h-[18px] border-[2px] rounded transition-all",
            checked
              ? checkedStyled.checkbox === ""
                ? "bg-primary border-primary"
                : checkedStyled.checkbox
              : styled.checkbox === ""
              ? "border-black"
              : styled.checkbox,
          ].join(" ")}
        >
          <svg
            viewBox="0 0 24 24"
            className={`${classes["checkbox-icon"]} ${
              checked ? "visible" : "invisible"
            }`}
          >
            <polyline points="20 6 9 17 4 12" />
            {t("Sorry, your browser does not support inline SVG.")}
          </svg>
        </div>
      </div>
      {label !== "" && (
        <span className={`${checked && checkedStyled.label} ${styled.label}`}>
          {label}
        </span>
      )}
    </label>
  );
};

export const RectTextInput = (props) => {
  const {
    className,
    name,
    label,
    icon,
    iconOnClick,
    leftButtonIcon,
    leftButtonOnClick,
    rightButtonIcon,
    rightButtonOnClick,
    ...rest
  } = props;

  const [copyValue, setCopyValue] = useState({ value: "", copied: false });
  const [tooltipActive, setTooltipActive] = useState(false);

  return (
    <div
      className={`${
        classes["rect-text-input-container"]
      } ${"relative z-0 w-full"} ${className}`}
    >
      <input
        className={[
          "block bg-transparent font-inherit text-current h-12 px-2.5 py-4 outline-none disabled:text-gray-600 disabled:cursor-not-allowed ",
          "w-full text-[16px]",
          leftButtonIcon ? "ml-[2rem] sm:w-[84%] w-[80%]" : "",
          rightButtonIcon ? "mr-[2rem]" : "",
        ].join(" ")}
        name={name}
        {...rest}
      />

      {props?.errorMessage && (
        <p className="m-0 mt-1 p-0 text-red-600 text-[13px]">{props.errorMessage}</p>
      )}

      {icon && (
        <>
          <Tooltip message="Copied" show={tooltipActive}>
            <CopyToClipboard
              text={rest.value}
              onCopy={() => {
                setCopyValue({ value: rest.value, copied: true });
                setTooltipActive(true);
                setTimeout(() => {
                  setTooltipActive(false);
                }, 1500);
              }}
            >
              <a
                data-event="click focus"
                data-tip="Copied"
                data-for={name}
                className="absolute top-1/4 my-auto right-4 cursor-pointer no-underline"
              >
                {icon}
              </a>
            </CopyToClipboard>
          </Tooltip>
        </>
      )}
      {leftButtonIcon && (
        <a
          className="absolute top-0 bottom-0 my-auto left-4 cursor-pointer flex items-center"
          onClick={leftButtonOnClick}
        >
          {leftButtonIcon}
        </a>
      )}
      {rightButtonIcon && (
        <a
          className="absolute top-0 bottom-0 my-auto right-4 cursor-pointer flex items-center"
          onClick={rightButtonOnClick}
        >
          {rightButtonIcon}
        </a>
      )}
      <div
        className=" 
          absolute left-0 top-0
          h-12 w-full
          pointer-events-none
          border border-1 border-gray-400 rounded 
          hover:border-black"
      />
      <label
        htmlFor={name}
        className="text-gray-400 text-left text-16px bg-white absolute top-0 left-0 px-2 origin-top-left whitespace-nowrap"
      >
        {label}
      </label>
    </div>
  );
};

export const RectSelectInput = (props) => {
  const {
    data = [""],
    value = "",
    label,
    className,
    onChange = () => {},
    datatype = "",
    ...rest
  } = props;
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const bodyComponent = () => {
    switch (datatype) {
      case "manualPaymentOption":
        return (
          <>
            {data.map((obj) => (
              <Listbox.Option
                key={obj.manualPaymentOptionsId}
                className={({ active }) =>
                  `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                    active ? "text-primary bg-gray-100" : "text-gray-900"
                  }`
                }
                value={obj}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-semibold" : "font-normal"
                      }`}
                    >
                      {obj.manualPaymentMethodName}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </>
        );

      default:
        return (
          <>
            {data.map((data, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                    active ? "text-primary bg-gray-100" : "text-gray-900"
                  }`
                }
                value={data}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-semibold" : "font-normal"
                      }`}
                    >
                      {data}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </>
        );
    }
  };

  return (
    <div className={className}>
      <Listbox
        value={selected}
        onChange={(data) => {
          onChange(data);
        }}
        {...rest}
      >
        {({ open }) => (
          <div
            className={["relative", classes["rect-text-input-container"]].join(
              " "
            )}
          >
            <Listbox.Button
              className={[
                "relative h-12 w-full rounded px-2.5 text-left disabled:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none sm:text-sm",
                open ? classes["select-focus"] : classes["select-normal"],
              ].join(" ")}
            >
              <span className="block truncate">{selected}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <div
              className=" 
          absolute left-0 top-0
          h-12 w-full
          pointer-events-none
          border border-1 border-gray-400 rounded"
            />
            <label className="text-gray-400 text-left bg-gradient-to-b from-white via-white rounded-b-lg text-16px absolute top-0 left-0 px-2 origin-top-left">
              {label}
            </label>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute list-none p-0 w-full py-1 mt-1 z-10 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {bodyComponent()}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>

      {props?.errorMessage && (
        <p className="m-0 mt-1 p-0 text-red-600 text-[13px]">{props.errorMessage}</p>
      )}
    </div>
  );
};

export const RectDateInputWrapper = (props) => {
  const { className, children, label } = props;
  return (
    <div
      className={`${
        classes["rect-text-input-container"]
      } ${"relative z-0 w-full"} ${className}`}
    >
      <div>{children}</div>
      <div
        className=" 
          absolute left-0 top-0
          h-12 w-full
          pointer-events-none
          border border-1 border-gray-400 rounded 
          hover:border-black"
      />
      {props?.errorMessage && (
        <p className="m-0 mt-1 p-0 text-red-600 text-[13px]">{props.errorMessage}</p>
      )}
      <label className="text-gray-400 text-left text-16px bg-white absolute top-0 left-0 px-2 origin-top-left">
        {label}
      </label>
    </div>
  );
};

const aseanCountries = ["my", "sg", "id"];
export const CustomPhoneInput = (props) => {
  const { circleBorder, disabled = false, ...rest } = props;
  return (
    <div
      className={[
        classes.default,
        circleBorder ? classes["border-class"] : null,
      ].join(" ")}
    >
      <PhoneInput
        onlyCountries={aseanCountries}
        value={rest.value}
        onBlur={rest.onBlur}
        onChange={(phoneNumber, country, e) => rest.onChange(phoneNumber, country)}
        country={"my"}
        disabled={disabled}
        countryCodeEditable={false}
        inputClass={classes.mainFontType}
        inputProps={{ name: rest.name }}
      />
    </div>
  );
};

export const RectTextarea = (props) => {
  const { className, name, label, onChange, ...rest } = props;
  return (
    <div
      className={`${
        classes["rect-text-input-container"]
      } ${"relative z-0 w-full"} ${className}`}
    >
      <div
        contentEditable
        className={[
          classes["border-container"],
          className,
          "block bg-transparent font-inherit text-current h-full w-inherit border border-1 border-gray-400 rounded hover:border-black focus:border-primary focus:outline-primary px-2.5 py-4 overflow-auto disabled:text-gray-400 disabled:cursor-not-allowed",
        ].join(" ")}
        onInput={(e) => onChange(e.target.textContent)}
        name={name}
        {...rest}
      />
      <label
        htmlFor={name}
        className={[
          classes.label,
          "text-gray-400 text-left text-16px absolute top-0 left-0 px-2 origin-top-left",
        ].join(" ")}
      >
        {label}
      </label>
    </div>
  );
};

export const AnimatedChecked = ({ onTick, ...rest }) => {
  const [isChecked, setIsChecked] = useState(false);
  const checkboxAnimationRef = useSpringRef();
  const checkboxAnimationStyle = useSpring({
    config: config.gentle,
    ref: checkboxAnimationRef,
  });

  const [checkmarkLength, setCheckmarkLength] = useState(null);

  const checkmarkAnimationRef = useSpringRef();
  const checkmarkAnimationStyle = useSpring({
    x: rest.checked ? 0 : checkmarkLength,
    config: config.gentle,
    ref: checkmarkAnimationRef,
  });

  useChain(
    rest.checked
      ? [checkboxAnimationRef, checkmarkAnimationRef]
      : [checkmarkAnimationRef, checkboxAnimationRef],
    [0, 0.1]
  );

  return (
    <label className={classes["animated-checkbox"]}>
      <input
        type="checkbox"
        {...rest}
        onChange={(e) => {
          if (typeof onTick === "function") {
            onTick(e);
          }
        }}
      />

      <animated.svg
        style={checkboxAnimationStyle}
        className={`border-[1px] rounded-sm h-4 w-4 mr-2 ${
          rest.checked
            ? "bg-primary border-primary"
            : "bg-white border-gray-500"
        }`}
        aria-hidden="true"
        viewBox="0 0 15 11"
        fill="none"
      >
        <animated.path
          d="M1 4.5L5 9L14 1"
          strokeWidth="2"
          stroke="#fff"
          ref={(ref) => {
            if (ref) {
              setCheckmarkLength(ref.getTotalLength());
            }
          }}
          strokeDasharray={checkmarkLength}
          strokeDashoffset={checkmarkAnimationStyle.x}
        />
      </animated.svg>
    </label>
  );
};

export const RadioButton = (props) => {
  return (
    <>
      <input
        className={[classes["radio-button"], props.inputClassName ?? ""].join(
          " "
        )}
        type="radio"
        {...props}
      ></input>
      <label for={props.id} className="w-5 h-5"></label>
    </>
  );
};

export const DaisyRadioButton = ({ checked, onChange }) => {
  return (
    <input
      type="radio"
      name="radio-6"
      className="radio checked:bg-primary w-5 h-5"
      checked={checked}
      onChange={onChange}
    />
  );
};
