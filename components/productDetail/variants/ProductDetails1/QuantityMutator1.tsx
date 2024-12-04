import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";

export default function QuantityMutator1({ max, onNumberChange, value = 1 }) {
  const { t } = useTranslation("common");
  const handleDecrease = () => {
    const newValue = Math.max(1, value - 1);
    onNumberChange(newValue);
  };

  const handleIncrease = () => {
    const newValue = max ? Math.min(max, value + 1) : value + 1;
    onNumberChange(newValue);
  };

  const [v, setV] = useState<string>(value.toString());

  const isNumberOnbur = () => {
    const isNumber = parseInt(v);
    if (isNumber.toString() !== "NaN" && isNumber < max && isNumber >= 1) {
      const rounded = Math.round(isNumber);
      onNumberChange(rounded);
      setV(rounded.toString());
    } else setV(value?.toString());
  };

  useEffect(() => setV(value.toString()), [value]);

  return (
    <div className="my-2 flex flex-row items-center gap-2">
      <p className="m-0">{t("Quantity")}</p>
      <div role="group" className="inline-flex border rounded-full bg-white">
        <button
          onClick={handleDecrease}
          className={[
            "p-2 rounded-full hover:bg-opacity-5 hover:bg-black",
            false ? "text-gray-300" : "",
          ].join(" ")}
          title="decrease"
          type="button"
        >
          <MinusSmIcon className="w-6 h-6" />
        </button>
        <input
          onChange={(e) => setV(e.target.value as any)}
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
        <button
          onClick={handleIncrease}
          className={[
            "p-2 rounded-full hover:bg-opacity-5 hover:bg-black",
            false ? "text-gray-300" : "",
          ].join(" ")}
          title="increase"
          type="button"
        >
          <PlusSmIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
