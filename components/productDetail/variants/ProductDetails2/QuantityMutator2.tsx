import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import { useState } from "react";

export default function QuantityMutator2({ max, onNumberChange, value = 1 }) {
  const [quantity, setQuantity] = useState(value);
  const handleDecrease = () =>
    setQuantity((q) => {
      const newValue = Math.max(1, q - 1);
      onNumberChange(newValue);
      return newValue;
    });

  const handleIncrease = () =>
    setQuantity((q) => {
      const newValue = max ? Math.min(max, q + 1) : q + 1;
      onNumberChange(newValue);
      return newValue;
    });

  return (
    <div className="border-[1px] border-black p-1 flex flex-row items-center w-min space-x-5 justify-center">
      <button
        className=" hover:bg-gray-100 rounded-full h-10 w-10"
        onClick={handleDecrease}
      >
        -
      </button>
      <div className="w-8 text-center">{quantity}</div>
      <button
        className="hover:bg-gray-100 rounded-full h-10 w-10"
        onClick={handleIncrease}
      >
        +
      </button>
    </div>
  );
}
