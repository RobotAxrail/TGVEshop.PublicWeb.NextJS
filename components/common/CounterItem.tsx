import { useState, useEffect, ChangeEvent } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CheckoutPageIconButton } from "./common";

export default function CounterItem({
  buttonDisabled = false,
  onChange,
  min = 1,
  value,
  max,
  customLogicInputOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    setV(e.target.value as any),
}: {
  onChange: (v: number) => void;
  buttonDisabled?: boolean;
  value: number;
  min?: number;
  max?: number;
  customLogicInputOnChange?: (e: any, setV?: any, v?: string) => void;
}) {
  const increment = () => onChange(Math.min(value + 1, max || value + 1));
  const decrement = () => onChange(Math.max(value - 1, min || value - 1));
  const [v, setV] = useState<string>(value.toString());
  const isNumberOnbur = () => {
    const isNumber = parseInt(v);

    if (isNumber.toString() !== "NaN" && isNumber <= max && isNumber >= min) {
      const rounded = Math.round(isNumber);
      onChange(rounded);
      setV(rounded.toString());
    } else setV(value?.toString());
  };

  useEffect(() => setV(value.toString()), [value]);

  return (
    <div className="flex flex-row space-x-2  items-center p-1 border-box border border-gray-200 w-min rounded-lg shadow-sm">
      <CheckoutPageIconButton disabled={value === min} onClick={decrement}>
        <AiOutlineMinus />
      </CheckoutPageIconButton>
      <input
        onChange={(e: any) => customLogicInputOnChange(e, setV, v)}
        className="text-center outline-none ring-2 rounded-md w-[80px]"
        onBlur={() => isNumberOnbur()}
        value={v}
        onKeyDown={(event) => {
          const keyCode = event.keyCode || event.which;
          if (keyCode === 8) return;
          const keyValue = String.fromCharCode(keyCode);
          if (!/^\d+$/.test(keyValue)) event.preventDefault();
        }}
      />
      <CheckoutPageIconButton
        disabled={value === max || buttonDisabled}
        onClick={increment}
      >
        <AiOutlinePlus />
      </CheckoutPageIconButton>
    </div>
  );
}
