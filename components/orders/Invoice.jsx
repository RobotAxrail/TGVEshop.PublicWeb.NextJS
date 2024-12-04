// Try not to use react-moment to save bundle size
import moment from "moment";
import { getSelectedModifiersToDisplayList } from "@/utils/util";

// styles
// import "./Invoice.scss";

// components
import PriceWithCurrency from "@/components/priceWithCurrency/PriceWithCurrency";

const Invoice = (props) => {
  const { item, ...rest } = props;

  const total =
    item.subtotalWithTax +
    item.estimatedDeliveryFee -
    (item.promoCodeDiscount ?? 0);
  return (
    <div className="relative bg-white py-4 px-8 min-w-[50rem]" {...rest}>
      <h3 className="text-center text-[1.3rem]">{item.merchantName}</h3>
      <p className="text-[0.9rem] leading-snug">
        {item.invoiceNo} {t("has been processed.")}
      </p>

      <div className="border rounded p-4">
        <div className="flex flex-wrap w-full box-border">
          <div className="w-7/12 flex-grow-0 ">
            <label>{item.merchantName}</label>
          </div>
          <div className=" w-5/12 flex-grow-0 ">
            <div className="flex flex-wrap w-full box-border">
              <div className="w-5/12 flex-grow-0 ">
                <label className="text-[0.9rem] leading-snug">
                  {t("Invoice No")}:
                </label>
              </div>
              <div className="w-7/12 flex-grow-0 ">
                <label>{item.invoiceNo}</label>
              </div>

              <div className=" w-5/12 flex-grow-0 ">
                <label className="text-[0.9rem] leading-snug">
                  {t("Issue Date")}:
                </label>
              </div>
              <div className="w-7/12 flex-grow-0">
                {moment(item.issueDateTime).format("DD/MM/YYYY hh:mm a")}
              </div>
              <div className="w-5/12 flex-grow-0 ">
                <label className="text-[0.9rem] leading-snug">
                  {t("Order Date")}:
                </label>
              </div>
              <div className="w-7/12 flex-grow-0">
                {moment(item.orderDateTime).format("DD/MM/YYYY hh:mm a")}
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-center">{t("INVOICE")}</h2>

        {/* ADDRESS */}
        <div className="flex flex-wrap w-full box-border">
          <div className="w-6/12 flex-grow-0">
            <p className="leading-snug text-xl">{t("Billing Address")}</p>
            <label className="text-[0.9rem] leading-snug address">
              {item.billingAddress}
            </label>
          </div>
          <div className=" w-6/12 flex-grow-0">
            <p className="leading-snug text-xl">{t("Shipping Address")}</p>
            <label className="text-[0.9rem] leading-snug address">
              {item.shippingAddress}
            </label>
          </div>
        </div>

        {/* INVOICE HEADER */}
        <div className=" mt-4 bg-gray-200 rounded flex flex-wrap w-full box-border items-center">
          <div className="w-6/12 flex-grow-0 p-2">
            <label className="text-[0.9rem] leading-snug">{t("Item")}</label>
          </div>
          <div className="w-2/12 flex-grow-0 p-2">
            <label className="text-[0.9rem] leading-snug">
              {t("Unit Price")}
            </label>
          </div>
          <div className="w-2/12 flex-grow-0 p-2">
            <label className="text-[0.9rem] leading-snug">
              {t("Discount")}
            </label>
          </div>

          <div className="w-2/12 flex-grow-0 p-2">
            <label className="text-[0.9rem] leading-snug">
              {t("Subtotal")}
            </label>
          </div>
        </div>

        {/* INVOICE BODY */}
        {item.orderItems.map((o, i) => (
          <div className="flex flex-wrap w-full box-border item-body" key={i}>
            <div className=" w-6/12 flex-grow-0 flex flex-col p-2">
              <label className="text-[0.9rem] leading-snug">
                {o.itemTitle}
              </label>
              {o.selectedModifierGroups?.length > 0 &&
                getSelectedModifiersToDisplayList(o.selectedModifierGroups).map(
                  (modifierName) => (
                    <label className="text-xs leading-snug">
                      {modifierName}
                    </label>
                  )
                )}
              {o.itemVariantName1 ? (
                <label className="text-[0.9rem] leading-snug">
                  {o.itemVariantName1}: {o.itemVariantValue1}
                </label>
              ) : (
                <label className="text-[0.9rem] leading-snug">-</label>
              )}

              {o.itemVariantName2 && (
                <label className="text-[0.9rem] leading-snug">
                  {o.itemVariantName2}: {o.itemVariantValue2}
                </label>
              )}
              {o.itemVariantName3 && (
                <label className="text-[0.9rem] leading-snug">
                  {o.itemVariantName3}: {o.itemVariantValue3}
                </label>
              )}
              <label className="text-[0.9rem] leading-snug">
                {t("Quantity")}: {o.orderedQuantity}
              </label>
            </div>
            <div className="w-2/12 flex-grow-0 p-2">
              <label className="text-[0.9rem] leading-snug">
                {item.currency}{" "}
                {Number(
                  o.deliveryCompareAtPrice
                    ? o.deliveryCompareAtPrice
                    : o.deliveryPrice
                ).toFixed(2)}
              </label>
            </div>
            <div className="w-2/12 flex-grow-0 p-2">
              <label className="text-[0.9rem] leading-snug">
                {item.currency}{" "}
                {Number(
                  o.deliveryCompareAtPrice
                    ? o.deliveryCompareAtPrice - o.deliveryPrice
                    : 0
                ).toFixed(2)}
              </label>
            </div>
            <div className="w-2/12 flex-grow-0 p-2">
              <label className="text-[0.9rem] leading-snug">
                {item.currency} {Number(o.subtotal).toFixed(2)}
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* INVOICE FOOTER */}
      <div className="flex justify-between">
        <div>
          <p className="text-lg italic opacity-60">{t("Thank you")}!</p>
          <p className="italic">
            <b>{item.merchantName}</b>
          </p>
        </div>
        <div className="min-w-[400px] p-4">
          <p className="px-2 m-2 justify-between flex">
            {t("subtotal")}
            <PriceWithCurrency value={item.subtotal} total={total} />
          </p>
          {item.subtotalWithTax > item.subtotal ? (
            <p className="px-2 m-2 justify-between flex opacity-60">
              {t("Incl. Tax")}
              <PriceWithCurrency
                value={item.subtotalWithTax - item.subtotal}
                total={total}
              />
            </p>
          ) : null}

          <p className="px-2 m-2 justify-between flex">
            {t("Shipping Fee")}
            <PriceWithCurrency
              value={item.estimatedDeliveryFee}
              total={total}
            />
          </p>

          {!!item.promoCodeDiscount && (
            <p className="px-2 m-2 justify-between flex">
              {t("Promo")} {`(${item.promoCode})`}
              <PriceWithCurrency value={item.promoCodeDiscount} total={total} />
            </p>
          )}
          <p className="justify-between flex p-2 m-2 rounded bg-gray-200">
            {t("total_label")}{" "}
            {item.subtotalWithTax > item.subtotal ? t("(Incl. Tax)") : null}
            <PriceWithCurrency value={total} total={total} />
          </p>
        </div>
      </div>
      <div>
        <p className="text-center">
          {t("If you have any questions")}{" "}
          <a className="text-blue-400" href={`mailto:${item.merchantEmail}`}>
            {item.merchantEmail}
          </a>
        </p>

        <p className="text-center">
          {t("Powered By")}{" "}
          <span className="italic font-semibold text-lg">
            {t("Axrail ecommerce platform")}
          </span>
        </p>
      </div>
    </div>
  );
};

export { Invoice };
