import React from "react";

//Content
import MerchantContext from "@/contexts/MerchantContext";

export default function PriceWithCurrency(props) {
  const { value, total = "", prefix = "", className = "", ...rest } = props;
  const merchantInfoContext = React.useContext(MerchantContext);
  const compareValue = Number(value)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  var spacing = "";

  if (total !== "") {
    const totalValue = Number(total)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const diff = Math.abs(totalValue.length - compareValue.length);

    if (diff !== 0) {
      spacing = totalValue.substring(1, diff + 1);
    }
  }
  return (
    <span className={["flex-shrink-0", className].join(" ")} {...rest}>
      {prefix}
      {merchantInfoContext.currency}
      &nbsp;
      <span className="invisible">{spacing}</span>
      {compareValue}
    </span>
  );
}
