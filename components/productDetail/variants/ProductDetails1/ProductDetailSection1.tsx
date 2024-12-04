import SocialMediaSharingButtons1 from "./SocialMediaButtons1";
import ProductImageSection1 from "./ProductImageSection1";
import VariantSelector1 from "./VariantSelector1";
import QuantityMutator1 from "./QuantityMutator1";
import RatingSection1 from "./RatingSection1";
import ActionButtons1 from "./ActionButtons1";
import PriceSection1 from "./PriceSection1";
import useTranslation from "next-translate/useTranslation";

export default function ProductDetailSection1({
  _generateVariantStructure,
  selectedProductUOMObject,
  setSelectedQuantity,
  getFavouriteStatus,
  selectedVariantMap,
  carouselImageIndex,
  onVariantSelected,
  selectedQuantity,
  isProjectBundle,
  onAddToWishList,
  onAddCartItem,
  productDetail,
  productImage,
  currentPath,
  currentUrl,
  isLoading,
  onBuyNow,
  reachedCartLimit,
  isQLEggs,
  isInCart,
}) {
  const { t } = useTranslation("common");
  return (
    <div className="grid col-span-12 grid-cols-12 gap-5">
      <div className="col-span-12 lg:col-span-5 p-2">
        <ProductImageSection1
          imageIndex={carouselImageIndex}
          productDetail={productDetail}
          productImage={productImage}
          currentPath={currentPath}
          _image={[
            ...(productDetail?.image || []),
            ...(productDetail?.cover || []),
          ]}
          selectedUOMImage={
            selectedProductUOMObject ? selectedProductUOMObject.image[0] : ""
          }
        />
      </div>
      <div className="col-span-12 lg:col-span-7 p-2">
        <div className="flex flex-col">
          <p className="mb-0 text-3xl m-0">{productDetail?.title}</p>
          {!isQLEggs && <RatingSection1 productDetail={productDetail} />}
          <PriceSection1
            selectedProductUOMObject={selectedProductUOMObject}
            productDetail={productDetail}
          />
          <VariantSelector1
            defaultVariantStructure={_generateVariantStructure(productDetail)}
            productUOMs={productDetail?.productUOMs}
            onVariantSelected={onVariantSelected}
            variantMap={selectedVariantMap}
            checkOosOption={() => false}
          />
          {productDetail?.description && (
            <div className="flex flex-col">
              <div className="bg-gray-200 p-2 rounded-md text-lg font-medium">
                {t("Description")}
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: productDetail?.description }}
                className="p-2"
              />
            </div>
          )}

          <QuantityMutator1
            max={selectedProductUOMObject?.quantityForSales}
            onNumberChange={setSelectedQuantity}
            value={selectedQuantity}
          />
          <ActionButtons1
            onAddToCart={() => onAddCartItem(selectedQuantity)}
            onAddToWishList={onAddToWishList}
            isQLEggs={isQLEggs}
            disabledAddToCart={isLoading || reachedCartLimit}
            reachedCartLimit={reachedCartLimit}
            disabledBuyNow={isLoading || reachedCartLimit}
            isLoading={isLoading}
            onBuyNow={onBuyNow}
            isFavourite={getFavouriteStatus(
              !isProjectBundle
                ? (productDetail?.productUOMs || [{}])[0]?.productId
                : selectedProductUOMObject.productBundleId
            )}
            isInCart={isInCart}
          />
          {!isQLEggs && (
            <SocialMediaSharingButtons1
              title={productDetail?.title}
              currentUrl={currentUrl}
            />
          )}
        </div>
      </div>
    </div>
  );
}
