import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import ProductDetail1 from "./ProductDetails";
import classes from "./ProductDetail.module.scss";

//Components
import { VariantButton } from "@/components/buttons/Buttons";
import Chip from "@/components/chip/Chip";
import PriceWithCurrency from "@/components/priceWithCurrency/PriceWithCurrency";
import ImageGallery from "@/components/imageGallery/ImageGallery";

import Recommendation from "@/components/recommendation/Recommendation";
import StarRating from "@/components/common/StarRating";
import ProductTabPanels from "./ProductTabPanels";
// import QuantitySection from "@/components/quantitySection/QuantitySection";
const QuantitySection = dynamic(() =>
  import("@/components/quantitySection/QuantitySection")
);
import { CataloguePagination } from "@/components/cataloguePagination/CataloguePagination";
import ProductModifierModal from "@/components/productDetail/ProductModifier/ProductModifierModal";

// icons library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faWhatsapp,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

// utils
import moment from "moment";
import _, { toNumber } from "lodash";
import Cookies from "universal-cookie";

function ProductDetail(props) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const id = router.query.productId;

  const {
    currentPath,
    handleStoreAddCartData,
    variants = [],
    productImage,
    productDetail,
    productVariant = [],
    outOfStockVariantCombination,
    cartIsLoading,
    setCartIsLoading,
    variantsSelected,
    setVariantsSelected,
    selectedProductUOMObject,
    setSelectedProductUOMObject,
    cartList,
    recommendationsList,
    similarItemsList,
    averageReviewRating,
    currentUrl,
    currentReviewList,
    totalReviews,
    totalReviewPages,
    nextToken,
    limit,
    selectedPage,
    setSelectedPage,
    modifierGroups,
    isInCart,
    setIsInCart,
  } = props;

  const bundlePricing =
    currentPath === "product-bundle" &&
    Boolean(selectedProductUOMObject?.productBundlePricing)
      ? selectedProductUOMObject?.productBundlePricing[0].storeProducts[0]
      : selectedProductUOMObject;
  const cookie = new Cookies();
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const [showProductModifierModal, setShowProductModifierModal] =
    useState(false);

  const handleAddItemToCart = useCallback(() => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }, []);

  // relook this function again later
  const handleSelectOneVariantValue = (variantName, value) => {
    const tempVariantsSelected = { ...variantsSelected };
    const idxOfVariantChanged = variants.findIndex(
      (variant) => variant.name === variantName
    );
    tempVariantsSelected[variantName] = value;
    setVariantsSelected(tempVariantsSelected);
  };

  const findImage = (variantImage) => {
    let index = productImage.indexOf(variantImage);
    setImageIndex(index);
  };

  const handleRemoveItem = () => {
    quantity > 1 && setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const handleOpenModifierModal = () => {
    setShowProductModifierModal(true);
  };

  let _image = [];
  _image.push(productDetail.cover);
  productDetail.image?.forEach((item) => {
    _image.push(item);
  });

  const handleOnSubmitModifierModal = async (modifierGroupsState) => {
    const resData = await handleStoreAddCartData(
      modifierGroupsState.quantity,
      modifierGroupsState.selectedModifierGroups
    );

    return resData;
  };

  const [outOfStockOptions, setOutOfStockOptions] = useState([]);
  const [fullOosOptions, setFullOosOptions] = useState([]);

  // Accepts the array and key
  const groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };

  useEffect(() => {
    // check selected variant which combination oos when variant selected
    if (currentPath === "product" && variants.length > 0) {
      const tempOutOfStockVariantCombination = [
        ...outOfStockVariantCombination,
      ];
      // if has only 1 variant
      if (variants.length === 1) {
        setOutOfStockOptions(outOfStockVariantCombination);
        return;
      }
      // check selected variant which combination oos when variant selected
      if (!_.isEmpty(variantsSelected)) {
        var temp = [];
        for (let obj in variantsSelected) {
          tempOutOfStockVariantCombination.forEach((variantCombination) => {
            let foundOosOption = _.omit(variantCombination, obj);
            if (_.includes(variantCombination, variantsSelected[obj])) {
              temp.push(foundOosOption);
            }
          });
        }
        setOutOfStockOptions(temp);
      } else {
        // to find the options that fully oos at initial
        let variantNameList = variants.map((obj) => obj.name);
        let groupedList = variantNameList.map((element) =>
          groupBy(tempOutOfStockVariantCombination, element)
        );

        var variantLength = {
          variantValues1Length: productDetail.variantValues1?.length,
          variantValues2Length: productDetail.variantValues2?.length ?? 1,
          variantValues3Length: productDetail.variantValues3?.length ?? 1,
        };
        var optionFullOosList = [];
        groupedList.forEach((option, index) => {
          var possibleCombinationNumber = 0;
          if (index === 0) {
            possibleCombinationNumber =
              variantLength.variantValues2Length *
              variantLength.variantValues3Length;
          }
          if (index === 1) {
            possibleCombinationNumber =
              variantLength.variantValues1Length *
              variantLength.variantValues3Length;
          }
          if (index === 2) {
            possibleCombinationNumber =
              variantLength.variantValues1Length *
              variantLength.variantValues2Length;
          }
          for (let key in option) {
            let optionFullOosObj = {};
            if (option[key].length === possibleCombinationNumber) {
              optionFullOosObj[productDetail["variantName" + (index + 1)]] =
                key;
              optionFullOosList.push(optionFullOosObj);
            }
          }
        });
        setFullOosOptions(optionFullOosList);
      }
    }
  }, [outOfStockVariantCombination, variantsSelected]);

  useEffect(() => {
    // set selectedProductUOMObject based on selected variant
    if (currentPath === "product" && variants.length > 0) {
      if (Object.keys(variantsSelected).length === variants.length) {
        let tempObj = {};
        for (const [key, value] of Object.entries(variantsSelected)) {
          let indexOfVariants = _.findIndex(variants, { name: key });
          tempObj["variantName" + [indexOfVariants + 1]] = key;
          tempObj["variantValue" + [indexOfVariants + 1]] = value;
        }
        setSelectedProductUOMObject(_.find(productVariant, tempObj));
        findImage(_.find(productVariant, tempObj).image[0]);
      }
    }
  }, [variantsSelected]);

  useEffect(() => {
    if (currentPath === "product-bundle") {
      const itemIsInCart =
        cartList?.findIndex(
          (item) => item.itemId === selectedProductUOMObject?.productBundleId
        ) !== -1;

      const existingQuantity = cartList?.find(
        (item) => item.itemId === selectedProductUOMObject?.productBundleId
      )?.quantity;

      setIsInCart(itemIsInCart);

      if (itemIsInCart) {
        setQuantity(existingQuantity);
      } else {
        setQuantity(1);
      }
    }
  }, [productDetail]);

  const checkOosOption = (variantName, variantValue) => {
    if (fullOosOptions.length > 0) {
      for (let obj in fullOosOptions) {
        if (fullOosOptions[obj][variantName] === variantValue) {
          return true;
        }
      }
    }
    for (let obj in outOfStockOptions) {
      if (outOfStockOptions[obj][variantName] === variantValue) {
        return true;
      }
    }
  };

  const handleSelectPage = (pageNum) => {
    setSelectedPage(pageNum);
  };

  const handleBackButton = () => {
    if (selectedPage > 1) {
      setSelectedPage(selectedPage - 1);
    }
  };

  const handleForwardButton = () => {
    if (selectedPage < totalReviewPages) {
      setSelectedPage(selectedPage + 1);
    }
  };

  const handleBuyNow = async () => {
    const signInData = cookie.get("signIn");
    let response = await handleStoreAddCartData(quantity);

    if (response?.status) {
      sessionStorage.setItem(
        "selectedItems",
        JSON.stringify([response.customerCartId])
      );

      if (signInData !== undefined && signInData?.accessToken !== "") {
        router.push({
          pathname: "/checkout",
          // query: `?platform=${platform}`,
        });
      } else {
        router.push({
          pathname: "/redirect",
          query: `to=checkout`,
        });
      }
    }
  };

  const handleCloseProductModifierModal = () => {
    setShowProductModifierModal(false);
  };

  const handleDiscount = () => {
    let percentage = "";
    if (currentPath === "product-bundle") {
      percentage = parseInt(
        ((bundlePricing.deliveryCompareAtPrice -
          (bundlePricing.deliveryPriceWithTax
            ? bundlePricing.deliveryPriceWithTax
            : bundlePricing.deliveryPrice)) /
          bundlePricing.deliveryCompareAtPrice) *
          100
      );
    } else {
      percentage = parseInt(
        ((selectedProductUOMObject.deliveryCompareAtPrice -
          (selectedProductUOMObject.deliveryPriceWithTax
            ? selectedProductUOMObject.deliveryPriceWithTax
            : selectedProductUOMObject.deliveryPrice)) /
          selectedProductUOMObject.deliveryCompareAtPrice) *
          100
      );
    }
    return "-" + percentage + "% " + t("Off");
  };

  const handlePrice = () => {
    if (currentPath === "product-bundle") {
      return bundlePricing?.deliveryPriceWithTax
        ? bundlePricing?.deliveryPriceWithTax
        : bundlePricing?.deliveryPrice;
    } else {
      return selectedProductUOMObject?.deliveryPriceWithTax
        ? selectedProductUOMObject?.deliveryPriceWithTax
        : selectedProductUOMObject?.deliveryPrice;
    }
  };
  
  return (
    <>
      <div className="p-3 m:p-0">
        <div className="mt-[8px] mb-5 flex flex-col md:flex-row">
          <div className="w-auto">
            <ImageGallery
              imageIndex={imageIndex}
              thumbnailList={
                currentPath === "product-bundle"
                  ? _image
                  : Array.isArray(productImage)
                  ? [...productImage]
                  : []
              }
              noImage={
                Array.isArray(productImage) ? productImage.length === 0 : true
              }
              videoUrl={
                !!productDetail.video
                  ? process.env.BUCKET_URL + productDetail.video
                  : null
              }
            />
          </div>
          <div className={[classes["right-node"], "leading-normal"].join(" ")}>
            <p className="text-xl mt-[5px] md:text-3xl m-0">
              {productDetail.title}
            </p>
            {/* ratings */}
            <div className="flex mt-2">
              {[averageReviewRating, productDetail.totalReviews].includes(0) ? (
                t("No Ratings Yet")
              ) : (
                <>
                  <div className="flex mt-2 items-center border-r border-secondary border-solid">
                    <div className="text-[1rem] text-primary border-solid border-b-2 border-primary">
                      {averageReviewRating.toFixed(1)}
                    </div>
                    <div className="px-2">
                      <div className="relative inline-block">
                        <StarRating
                          type="readonly"
                          givenRating={averageReviewRating}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pl-2 flex mt-2 items-center">
                    <div className="text-[1rem] text-primary border-solid border-b-2 border-primary">
                      {productDetail.totalReviews}
                    </div>
                    <div className="px-2">
                      <div className="relative inline-block">
                        {productDetail.totalReviews > 1
                          ? t("Ratings")
                          : t("Rating")}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* chips */}
            <div className="my-[15px]">
              {_.isEmpty(selectedProductUOMObject) &&
                productDetail.discountPercentage !== null && (
                  <Chip
                    label={
                      "-" +
                      productDetail.discountPercentage?.split(".")[0] +
                      "% " +
                      t("Off")
                    }
                  />
                )}
              {selectedProductUOMObject?.deliveryPrice <
                selectedProductUOMObject?.deliveryCompareAtPrice &&
                currentPath === "product" && <Chip label={handleDiscount()} />}
              {bundlePricing?.deliveryPrice <
                bundlePricing?.deliveryCompareAtPrice &&
                currentPath === "product-bundle" && (
                  <Chip label={handleDiscount()} />
                )}
              {((productVariant.length > 0 &&
                _.every(productVariant, { quantityForSales: 0 })) ||
                selectedProductUOMObject.quantityForSales === 0) && (
                <Chip className="ml-3" label={t("Out Of Stock")} />
              )}
            </div>

            <div>
              {selectedProductUOMObject?.deliveryCompareAtPrice <
                selectedProductUOMObject?.deliveryPrice ||
              bundlePricing?.deliveryCompareAtPrice <
                bundlePricing?.deliveryPrice ? (
                <span className="text-xl font-semibold 960-up:text-3xl">
                  <PriceWithCurrency value={handlePrice()} />
                </span>
              ) : (
                <>
                  <span className="text-xl font-semibold 960-up:text-3xl">
                    {!_.isEmpty(selectedProductUOMObject) ? (
                      <PriceWithCurrency value={handlePrice()} />
                    ) : (
                      <>{productDetail.priceRange}</>
                    )}
                  </span>
                  <span className="line-through text-[grey] ml-2.5 960-up:text-2xl">
                    {!_.isEmpty(selectedProductUOMObject) ? (
                      <PriceWithCurrency
                        value={
                          currentPath === "product"
                            ? selectedProductUOMObject.deliveryCompareAtPrice
                            : bundlePricing.deliveryCompareAtPrice
                        }
                      />
                    ) : (
                      <>
                        {currentPath === "product"
                          ? productDetail.priceComparedAtPriceRange
                          : bundlePricing.deliveryCompareAtPrice}
                      </>
                    )}
                  </span>
                </>
              )}
            </div>

            {/* variants options */}
            {variants.map((variant, idx) => (
              <div className="mt-2.5 pr-4" key={idx}>
                <span className="pr-4 text-xl">{variant.name}</span>
                <div>
                  {variant.values.map((value, index) => (
                    <VariantButton
                      className={[
                        "m-[5px]",
                        "active:border-primary active:bg-primary active:bg-opacity-5",
                        variantsSelected[variant.name] === value
                          ? "border-primary bg-primary bg-opacity-5 text-white"
                          : "border-gray-400",
                      ].join(" ")}
                      onClick={() =>
                        handleSelectOneVariantValue(variant.name, value)
                      }
                      key={index}
                      disabled={checkOosOption(variant.name, value)}
                    >
                      {value}
                    </VariantButton>
                  ))}
                </div>
              </div>
            ))}
            {/***
             * TODO: check again
             */}
            {/* qty , add to cart, buynow , fav buttons */}

            <QuantitySection
              handleAddItemToCart={handleAddItemToCart}
              handleRemoveItem={handleRemoveItem}
              handleStoreAddCartData={() => handleStoreAddCartData(quantity)}
              quantity={quantity}
              item={productDetail}
              itemId={
                currentPath === "product-bundle"
                  ? selectedProductUOMObject.productBundleId
                  : productVariant[0].productId
              }
              type={
                currentPath === "product-bundle" ? "ProductBundle" : "Product"
              }
              cartIsLoading={cartIsLoading}
              cartList={cartList}
              outOfStock={
                (productVariant.length > 0 &&
                  productVariant?.length ===
                    _.filter(productVariant, { quantityForSales: 0 }).length) ||
                selectedProductUOMObject.quantityForSales === 0
              }
              handleOpenModifierModal={handleOpenModifierModal}
              isProductWithModifiers={productDetail.modifierGroups?.length}
              handleBuyNow={handleBuyNow}
              isInCart={isInCart}
            />
            {/* social media sharing */}
            <div className="my-2 flex">
              <label className="align-middle relative">{t("Share")}:</label>
              <a
                className="no-underline"
                target="_blank"
                href={
                  "https://www.facebook.com/sharer/sharer.php?u=" + currentUrl
                }
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  className={"text-[#284de4] text-[25px] pl-1"}
                />
              </a>
              <a
                className="no-underline"
                target="_blank"
                href={
                  "https://telegram.me/share/url?url=" +
                  currentUrl +
                  "&text=" +
                  productDetail.title
                }
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faTelegram}
                  className={"text-[#1a8ad5] text-[25px] pl-1"}
                />
              </a>
              <a
                className="no-underline"
                target="_blank"
                href={
                  "https://api.whatsapp.com/send?text=" +
                  productDetail.title +
                  " " +
                  currentUrl
                }
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  className={"text-green-500 text-[25px] pl-1"}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* Tabs */}
        <ProductTabPanels
          title={t("Product Description")}
          bodyContent={
            <span>
              <div
                className="break-words"
                dangerouslySetInnerHTML={{
                  __html: productDetail.description,
                }}
              />
            </span>
          }
        />
        {currentReviewList.length > 0 && (
          <ProductTabPanels
            title={t("Product Ratings")}
            bodyContent={
              <>
                {currentReviewList.map((item) => {
                  // need create a card component for this
                  return (
                    <figure className="flex flex-col py-5 border-solid border-b border-gray-300">
                      <figcaption className="flex items-center space-x-4">
                        {/* <div class="m-2 w-10 h-10 relative flex justify-center items-center rounded-full bg-red-500 text-xl text-white uppercase">
                          {item.customerFirstName.charAt(0)}
                        </div> */}
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-primary m-4 text-[20px]"
                        />
                        <div className="flex-auto">
                          <div>
                            {item.customerFirstName} {item.customerLastName}
                          </div>
                          <StarRating
                            type="readonly"
                            givenRating={item.rating}
                            starSize={"text-[14px]"}
                          />
                          <div className="text-sm my-2 opacity-60">
                            {moment(item.createdAt).format("DD/MM/YYYY HH:mm")}{" "}
                            | {t("Variation")} : {item.itemVariantValue1}
                            {item.itemVariantValue2 &&
                              "," + item.itemVariantValue2}{" "}
                            {item.itemVariantValue3 &&
                              "," + item.itemVariantValue3}
                          </div>
                          <blockquote className="mt-4">
                            {item.comment}
                          </blockquote>
                        </div>
                      </figcaption>
                    </figure>
                  );
                })}
                <div className="flex justify-end">
                  {totalReviewPages > 0 && (
                    <CataloguePagination
                      totalPages={totalReviewPages}
                      selectedPage={selectedPage}
                      handleSelectPage={handleSelectPage}
                      handleBackButton={handleBackButton}
                      handleForwardButton={handleForwardButton}
                      limit={limit}
                    />
                  )}
                </div>
              </>
            }
          />
        )}
      </div>
      <Recommendation
        recommendationsList={recommendationsList}
        title={t("You may also like")}
      />
      <Recommendation
        recommendationsList={similarItemsList}
        title={t("Similar products")}
      />
      {productDetail.modifierGroups?.length > 0 && (
        <ProductModifierModal
          showModal={showProductModifierModal}
          handleCloseModal={handleCloseProductModifierModal}
          productOriginalPrice={
            selectedProductUOMObject?.deliveryPriceWithTax
              ? selectedProductUOMObject?.deliveryPriceWithTax
              : selectedProductUOMObject?.deliveryPrice
          }
          initialModifierGroups={modifierGroups}
          quantity={quantity}
          submitIsLoading={cartIsLoading}
          item={productDetail}
          outOfStock={
            productVariant?.length ===
              _.filter(productVariant, { quantityForSales: 0 }).length ||
            selectedProductUOMObject.quantityForSales === 0
          }
          handleOnSubmit={handleOnSubmitModifierModal}
        />
      )}
    </>
  );
}

export default ProductDetail;
