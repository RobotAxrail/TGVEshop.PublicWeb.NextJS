import React, { Fragment } from "react";
import useTranslation from "next-translate/useTranslation";
// components
import Chip from "@/components/chip/Chip";
import PriceWithCurrency from "@/components/priceWithCurrency/PriceWithCurrency";
import { VariantButton } from "@/components/buttons/Buttons";
import QuantitySection from "@/components/quantitySection/QuantitySection";

import { isDateBetween } from "@/utils/util";

const ProductRightSection = (props) => {
  const {
    productDetail,
    productVariant,
    variants,
    variantsSelected,
    quantity,
  } = props;
  const productPrice =
    productVariant.deliveryPriceWithTax ?? productVariant.deliveryPrice;
  const { t } = useTranslation("common");

  return (
    <Fragment>
      <p className="text-xl mt-[5px] md:text-3xl m-0">{productDetail.title}</p>
      {productPrice < productVariant.deliveryCompareAtPrice && (
        <div className="mb-[15px]">
          <Chip
            label={
              "-" +
              parseInt(
                ((productVariant.deliveryCompareAtPrice - productPrice) /
                  productVariant.deliveryCompareAtPrice) *
                  100
              ) +
              "% " +
              t("Off")
            }
          />
        </div>
      )}
      {productVariant.deliveryCompareAtPrice < productPrice ||
      !isDateBetween(
        productVariant.promotionStartDateTime,
        productVariant.promotionEndDateTime
      ) ? (
        <div>
          <label className="text-xl font-semibold 960-up:text-3xl">
            <PriceWithCurrency value={productPrice} />
          </label>
        </div>
      ) : (
        <div>
          <label className="text-xl font-semibold 960-up:text-3xl">
            <PriceWithCurrency value={productPrice} />
          </label>
          <label className="line-through text-[grey] ml-2.5 960-up:text-2xl">
            <PriceWithCurrency value={productVariant.deliveryCompareAtPrice} />
          </label>
        </div>
      )}
      {variants.map((variant, idx) => (
        <div className="mt-2.5 pr-4" key={idx}>
          <span className="pr-4 text-xl">{variant.name}</span>
          <div>
            {variant.values.map((value, index) => (
              <VariantButton
                className={[
                  "m-[5px]",
                  "active:border-primary active:bg-primary active:bg-opacity-5",
                  variantsSelected[idx] === value
                    ? "border-primary bg-primary bg-opacity-5"
                    : "border-gray-400",
                ].join(" ")}
                onClick={() => handleSelectOneVariantValue(variant.name, value)}
                key={index}
              >
                {value}
              </VariantButton>
            ))}
          </div>
        </div>
      ))}

      <QuantitySection
        handleAddItemToCart={() => handleAddItemToCart(item, quantity)}
        handleRemoveItem={() => handleRemoveItem(item)}
        handleStoreAddCartData={() => handleStoreAddCartData(item, quantity)}
        quantity={quantity}
        item={productDetail}
        itemId={
          currentPath === "product-bundle"
            ? productDetail?.productBundleId
            : productDetail?.productUOMId
        }
        type={currentPath === "product-bundle" ? "ProductBundle" : "ProductUOM"}
        cartIsLoading={cartIsLoading}
      />

      {Array.isArray(productVariant.taggingNames) &&
        productVariant.taggingNames.length > 0 && (
          <p className="mt-2.5 m-0">
            {t("Tags")}: {productVariant.taggingNames.join(", ")}
          </p>
        )}
    </Fragment>
  );
};

export default ProductRightSection;
