import Chip from "@/components/chip/Chip";
import PriceWithCurrency from "@/components/priceWithCurrency/PriceWithCurrency";
import _ from "lodash";
import useTranslation from "next-translate/useTranslation";

export default function PriceSection2({
  selectedProductUOMObject,
  productDetail,
}: any) {
  const {
    discountPercentage,
    priceComparedAtPriceRange,
    priceRange,
    productUOMs,
  } = productDetail || {
    discountPercentage: null,
    priceComparedAtPriceRange: null,
    priceRange: null,
    productUOMs: [],
  };
  const { compareAtPrice, priceWithTax, quantityForSales, price } =
    selectedProductUOMObject || {
      compareAtPrice: null,
      priceWithTax: null,
      quantityForSales: null,
      price: null,
    };
  const { t } = useTranslation("common");
  const discountPrice = Math.round(
    ((compareAtPrice -
      (priceWithTax ? priceWithTax : price)) /
      compareAtPrice) *
    100
  );
  return (
    <>
      <div className="my-1">
        {selectedProductUOMObject &&
          discountPercentage !== null &&
          price < compareAtPrice && <Chip label={`-${discountPrice} "% " +
          ${t("Off")}`} />}
        {((productUOMs?.length > 0 &&
          _.every(productUOMs, { quantityForSales: 0 })) ||
          quantityForSales === 0) && (
            <Chip className="ml-3" label={t("Out Of Stock")} />
          )}
      </div>
      <div>
        {compareAtPrice < price ? (
          <PriceWithCurrency value={priceWithTax || price} />
        ) : (
          <>
            {!selectedProductUOMObject
              ? priceRange?.includes("-")
                ? <>
                  {priceRange?.trim().split("-")[0].replace(/[^a-zA-Z]+/g, "")} {Number(priceRange?.trim().split("-")[0].replace(/[a-zA-Z]+/g, "")).toFixed(2)}
                  {" - "}
                  {priceRange?.trim().split("-")[1].replace(/[^a-zA-Z]+/g, "")} {Number(priceRange?.trim().split("-")[1].replace(/[a-zA-Z]+/g, "")).toFixed(2)}
                </>
                : <>{priceRange?.replace(/[^a-zA-Z]+/g, "")} {Number(priceRange?.replace(/[a-zA-Z]+/g, "")).toFixed(2)}</>
              : (
                <PriceWithCurrency
                  className="text-xl"
                  value={priceWithTax || price}
                />
              )}
            <span className="line-through text-[grey] ml-2.5 ">
              {!selectedProductUOMObject && <>{priceComparedAtPriceRange}</>}
              {selectedProductUOMObject && (
                <PriceWithCurrency
                  className="text-xl"
                  value={compareAtPrice}
                />
              )}
            </span>
          </>
        )}
      </div>
    </>
  );
}
