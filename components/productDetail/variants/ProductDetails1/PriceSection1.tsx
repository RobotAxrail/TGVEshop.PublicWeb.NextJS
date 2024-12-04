import PriceWithCurrency from "@/components/priceWithCurrency/PriceWithCurrency";
import Chip from "@/components/chip/Chip";
import _ from "lodash";
import useTranslation from "next-translate/useTranslation";
export default function PriceSection1({
  selectedProductUOMObject,
  productDetail,
}) {
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

  const discountPrice = Math.round(
    ((compareAtPrice - (priceWithTax ? priceWithTax : price)) /
      compareAtPrice) *
      100
  );
  const { t } = useTranslation("common");

  return (
    <>
      <div className="my-1">
        {selectedProductUOMObject && discountPercentage !== null ? (
          price < compareAtPrice ? (
            <Chip label={`-${discountPrice} % ${('Off')}`} />
          ) : (
            <></>
          )
        ) : (
          discountPercentage && (
            <Chip label={`-${discountPercentage?.split(".")[0]} % ${('Off')}`} />
          )
        )}

        {((productUOMs?.length > 0 &&
          _.every(productUOMs, { quantityForSales: 0 })) ||
          quantityForSales === 0) && (
          <Chip className="ml-3" label={t("Out Of Stock")} />
        )}
      </div>
      <div>
        {compareAtPrice < price ? (
          <span className="text-xl font-semibold 960-up:text-3xl">
            <PriceWithCurrency value={priceWithTax || price} />
          </span>
        ) : (
          <>
            <span className="text-xl font-semibold 960-up:text-3xl">
              {!selectedProductUOMObject ? (
                priceRange?.includes("-") ? (
                  <>
                    {priceRange
                      ?.trim()
                      .split("-")[0]
                      .replace(/[^a-zA-Z]+/g, "")}{" "}
                    {Number(
                      priceRange
                        ?.trim()
                        .split("-")[0]
                        .replace(/[a-zA-Z]+/g, "")
                    ).toFixed(2)}
                    {" - "}
                    {priceRange
                      ?.trim()
                      .split("-")[1]
                      .replace(/[^a-zA-Z]+/g, "")}{" "}
                    {Number(
                      priceRange
                        ?.trim()
                        .split("-")[1]
                        .replace(/[a-zA-Z]+/g, "")
                    ).toFixed(2)}
                  </>
                ) : (
                  <>
                    {priceRange?.replace(/[^a-zA-Z]+/g, "")}{" "}
                    {Number(priceRange?.replace(/[a-zA-Z]+/g, "")).toFixed(2)}
                  </>
                )
              ) : (
                <PriceWithCurrency value={priceWithTax || price} />
              )}
            </span>
            <span className="line-through text-[grey] ml-2.5 960-up:text-2xl">
              {!selectedProductUOMObject ? (
                priceComparedAtPriceRange?.includes("-") ? (
                  <>
                    {priceComparedAtPriceRange
                      ?.trim()
                      .split("-")[0]
                      .replace(/[^a-zA-Z]+/g, "")}{" "}
                    {Number(
                      priceComparedAtPriceRange
                        ?.trim()
                        .split("-")[0]
                        .replace(/[a-zA-Z]+/g, "")
                    ).toFixed(2)}
                    {" - "}
                    {priceComparedAtPriceRange
                      ?.trim()
                      .split("-")[1]
                      .replace(/[^a-zA-Z]+/g, "")}{" "}
                    {Number(
                      priceComparedAtPriceRange
                        ?.trim()
                        .split("-")[1]
                        .replace(/[a-zA-Z]+/g, "")
                    ).toFixed(2)}
                  </>
                ) : (
                  priceComparedAtPriceRange && (
                    <>
                      {priceComparedAtPriceRange?.replace(/[^a-zA-Z]+/g, "")}{" "}
                      {Number(
                        priceComparedAtPriceRange?.replace(/[a-zA-Z]+/g, "")
                      ).toFixed(2)}
                    </>
                  )
                )
              ) : (
                <PriceWithCurrency value={compareAtPrice} />
              )}
            </span>
          </>
        )}
      </div>
    </>
  );
}
