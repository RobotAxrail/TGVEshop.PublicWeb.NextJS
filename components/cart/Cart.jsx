import React, { useEffect, useState, useContext, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

// components
import { ContainedButton } from "@/components/buttons/Buttons";
const PriceWithCurrency = dynamic(() =>
  import("@/components/priceWithCurrency/PriceWithCurrency")
);
const DialogModal = dynamic(() => import("@/components/dialog/DialogModal"));

import { EmptyState } from "@/components/emptyState/EmptyState";
import CartTable from "@/components/cart/CartTable";
import CartProgress from "@/components/stepper/CartProgress";
import Translation from "@/components/translation/Translation";
import { Checkbox } from "@/components/inputs/Input";
import { QuantityButtons } from "@/components/buttons/Buttons";
import { Loader } from "@/components/loader/Loader";
import ProductModifierModal from "@/components/productDetail/ProductModifier/ProductModifierModal";

// icons
import { ChevronLeftIcon } from "@/components/icons/Icons";
import { CloseIcon } from "@/components/icons/Icons";

// images
import empty from "@/images/empty-cart.svg";
import back from "@/images/back-icon.svg";

// utils
import produce from "immer";
import {
  getSelectedModifiersToDisplayList,
  checkStoreAvailability,
} from "@/utils/util";
import { calculateItems, calculateCart } from "@/utils/cart.util";
import Cookies from "universal-cookie";
import _ from "lodash";

//
import { setToastState } from "@/states/toastBarState";
import { useStoreOperatingHour } from "@/contexts/StoreOperatingHourContext";
import AspectRatioSquareContainer from "../shared/AspectRatioSquareContainer";

import MerchantContext from "@/contexts/MerchantContext";

import { StoreTypes } from "@/enums/enums";

const Cart = (props) => {
  const { storeType } = useContext(MerchantContext);
  const { t } = useTranslation("common");
  const {
    getCartList,
    isCartFetching,
    cartList = [],
    removeItemCartList = () => {},
    updateItemQtyCartList = () => {},
    selectedItemList = [],
    setSelectedItemList = [],
    handleUpdateProductModifierSelectionInCustomerCart,
  } = props;
  const { landingPageData } = useStoreOperatingHour();
  const cookie = new Cookies();
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [updateCartIsLoading, setUpdateCartIsLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [productModifierModalState, setProductModifierModalState] = useState({
    visible: true,
    data: null,
  });
  const [
    updateProductModifierInCartIsLoading,
    setUpdateProductModifierInCartIsLoading,
  ] = useState(false);

  const router = useRouter();

  const handleRemoveItem = (item, type) => {
    if (item.status === "Locked") return;
    if (type === "whole" || item.quantity === 1) {
      setSelectedItem(item.customerCartId);
      setConfirmModal(true);
      return;
    } else {
      setUpdateCartIsLoading(true);
      let quantity = item.quantity - 1;
      updateItemQtyCartList(item.customerCartId, quantity).then((res) => {
        setUpdateCartIsLoading(false);
      });
    }
    // return;
  };

  const handleAddItem = (item, type) => {
    if (item.status === "Locked") return;
    setUpdateCartIsLoading(true);
    let quantity = item.quantity + 1;
    updateItemQtyCartList(item.customerCartId, quantity).then((res) => {
      setUpdateCartIsLoading(false);
    });
  };

  const handleAddItemToCart = (quantity) => {
    setProductModifierModalState((prevState) => ({
      ...prevState,
      data: { ...prevState.data, quantity: prevState.data.quantity + 1 },
    }));
  };

  const handleMinusItemFromCart = () => {
    productModifierModalState.data.quantity > 1 &&
      setProductModifierModalState((prevState) => ({
        ...prevState,
        data: { ...prevState.data, quantity: prevState.data.quantity - 1 },
      }));
  };

  const confirmClearItem = () => {
    removeItemCartList(selectedItem).then((response) => {
      setConfirmModal(false);
    });
  };

  const handleCheckout = () => {
    const storeAvailability = checkStoreAvailability(
      storeType,
      landingPageData?.operatingHours,
      landingPageData?.warungStoreStatus
    );

    if (!storeAvailability) {
      return setToastState({
        show: true,
        severity: "error",
        message: t("This shop is currently closed"),
      });
    }

    const signInData = cookie.get("signIn");
    if (selectedItemList.length == 0)
      return setToastState({
        show: true,
        severity: "error",
        message: t("You have not select"),
      });

    sessionStorage.setItem("selectedItems", JSON.stringify(selectedItemList));
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
  };

  /**
   * @param selectedId string : product Id / bool : selectAll
   *
   */
  const handleSelectedItem = (selectedId) => {
    let tempSelectedItemList = [...selectedItemList];
    if (selectedId === true) {
      cartList.forEach((item) => {
        if (item.errorMessage === null) {
          if (selectedItemList.indexOf(item.customerCartId) === -1)
            tempSelectedItemList.push(item.customerCartId);
        }
      });
      setIsSelectedAll(true);
    } else if (selectedId === false) {
      tempSelectedItemList = [];
      setIsSelectedAll(false);
    } else {
      let index = selectedItemList.indexOf(selectedId);
      if (index > -1) {
        tempSelectedItemList.splice(index, 1);
      } else {
        tempSelectedItemList.push(selectedId);
      }
    }

    if (tempSelectedItemList.length === cartList.length) {
      setIsSelectedAll(true);
    } else {
      setIsSelectedAll(false);
    }
    setSelectedItemList(tempSelectedItemList);
  };

  // check for selected item for checkbox
  const checkIsSelected = (id) => {
    let isSelected;
    const selectedId = selectedItemList.find(
      (customerCartId) => customerCartId === id
    );
    if (selectedId != null) {
      isSelected = true;
    } else {
      isSelected = false;
    }
    return isSelected;
  };

  const handleOnSubmitModifierModal = async (modifierGroupsState) => {
    const { selectedModifierGroups, quantity } = modifierGroupsState;
    setUpdateProductModifierInCartIsLoading(true);
    const res = await handleUpdateProductModifierSelectionInCustomerCart(
      productModifierModalState.data.customerCartId,
      quantity,
      selectedModifierGroups
    );
    setUpdateProductModifierInCartIsLoading(false);
    setTimeout(() => {
      getCartList();
    }, [1000]);
    return res;
  };

  const handleToggleEditModifier = (selectedCartItem) => {
    setProductModifierModalState((prevState) => ({
      visible: true,
      data: selectedCartItem,
    }));
  };

  const handleCloseProductModifierModal = () => {
    setProductModifierModalState((prevState) => ({
      visible: false,
      data: null,
    }));
  };

  useEffect(() => {
    const selectedCart = selectedItemList
      .map((itemCustomerCartId) =>
        cartList.find(
          (itemInCart) => itemInCart.customerCartId === itemCustomerCartId
        )
      )
      .filter((item) => !!item);
    setTotalAmount(calculateCart(selectedCart));
  }, [selectedItemList, cartList]);

  const itemsSelectedOnInitialRender = useRef(false);

  useEffect(() => {
    if (!itemsSelectedOnInitialRender.current) {
      handleSelectedItem(true);
      itemsSelectedOnInitialRender = true;
    }
  }, [cartList]);

  return (
    <>
      {!isCartFetching && cartList.length === 0 ? (
        <div className="">
          <EmptyState
            src={empty}
            title={t("Cart is empty")}
            subtitle={t("Looks like you haven't added anything to your cart yet")}
            hasButton={true}
            buttonTitle={t("Browse products")}
            buttonAction={() =>
              storeType === StoreTypes.WARUNG_STORETYPE
                ? router.push("/collections-menu")
                : router.push("/")
            }
          />
        </div>
      ) : (
        <>
          <div className="flex flex-col xs:flex-row mt-5">
            <div className=" md:w-2/3 mt-4 md:flex-grow">
              <h1 className="mx-8 my-0 text-2xl sm:text-3xl">
                {" "}
                {t("Shopping Cart")}
              </h1>
            </div>
            <div className=" md:w-1/3 xs:flex-grow mt-5">
              {/* todo ??? */}
              <CartProgress activeStep={0} />
            </div>
          </div>

          {isCartFetching ? (
            <Loader />
          ) : (
            <div className="p-3 sm:mt-5">
              {/* Normal Cart View*/}
              <div className="hidden xs:block">
                <CartTable
                  handleSelectedItem={handleSelectedItem}
                  isSelectedAll={isSelectedAll}
                  cartList={cartList ?? []}
                  checkIsSelected={checkIsSelected}
                  handleRemoveItem={handleRemoveItem}
                  handleAddItem={handleAddItem}
                  updateCartIsLoading={updateCartIsLoading}
                  handleCheckout={handleCheckout}
                  handleToggleEditModifier={handleToggleEditModifier}
                  storeType={storeType}
                  //   isFbLive={fbCid !== ""}
                />
                <div className="flex justify-between my-7 mx-7">
                  <button
                    className="text-[18px] font-semibold "
                    onClick={() =>
                      storeType === StoreTypes.WARUNG_STORETYPE
                        ? router.push("/collections-menu")
                        : router.push("/")
                    }
                  >
                    <ChevronLeftIcon className="fill-current w-4 h-3" />
                    {t("continue_shopping")}
                  </button>
                  <div className="rounded-xl bg-gray-200 w-[340px] flex items-center justify-around">
                    <span className="">{t("Total Cost")}</span>
                    <div className="text-primary font-semibold">
                      <PriceWithCurrency value={totalAmount} />
                    </div>
                  </div>
                  <ContainedButton
                    onClick={() => {
                      handleCheckout();
                      window.dataLayer.push({
                        event: "checkoutClicked",
                      });
                    }}
                    className="uppercase font-semibold"
                    fontSize="text-[13px]"
                  >
                    {t("Proceed to Checkout")}
                  </ContainedButton>
                </div>
              </div>

              {/* Mobile Cart View */}
              <div className="xs:hidden">
                <div className="bg-white border rounded-lg">
                  <Checkbox
                    checked={isSelectedAll}
                    onClick={() => handleSelectedItem(!isSelectedAll)}
                    disabled={_.every(cartList, function (obj) {
                      if (
                        obj.errorMessage === "Unavailable" ||
                        obj.errorMessage === "Out Of Stock"
                      )
                        return true;
                    })}
                  />
                  <label>{t("All")}</label>
                </div>
                <div className="py-4">
                  {cartList.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-white rounded-lg drop-shadow-md mb-2 flex"
                      >
                        <Checkbox
                          checked={checkIsSelected(item.customerCartId)}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectedItem(item.customerCartId);
                          }}
                          disabled={
                            item.errorMessage === "Unavailable" ||
                            item.errorMessage === "Out Of Stock"
                          }
                        />
                        <div
                          className="flex w-full"
                          onClick={() => handleToggleEditModifier(item)}
                        >
                          <div className="flex-[1] py-3 flex items-center justify-center mr-2">
                            <AspectRatioSquareContainer className="h-[6rem] w-[6rem]">
                              <Image
                                src={process.env.BUCKET_URL + item.itemImage}
                                alt={item.name}
                                layout="fill"
                                objectFit="cover"
                              />
                            </AspectRatioSquareContainer>
                          </div>
                          <div className="flex-[2] flex p-2 overflow-hidden">
                            <div className="flex-[4] overflow-hidden">
                              <p className="line-clamp-3 m-0 mt-2">
                                {item.itemTitle}
                              </p>
                              <div className="mb-2">
                                {getSelectedModifiersToDisplayList(
                                  item.selectedModifierGroups
                                ).map((modifierName, idx) => (
                                  <p
                                    key={modifierName + idx}
                                    className="m-0 text-xs"
                                  >
                                    + {modifierName}
                                  </p>
                                ))}
                              </div>
                              {item.itemVariantName1 && (
                                <label className="text-[12px] truncate">
                                  {t("Variations")}:{" "}
                                  {item.itemVariantValue1 &&
                                    item.itemVariantValue1}
                                  {item.itemVariantName2 &&
                                    ", " + item.itemVariantValue2}
                                  {item.itemVariantName3 &&
                                    ", " + item.itemVariantValue3}
                                  {item.itemVariantName3 && (
                                    <>
                                      {item.itemVariantName3 +
                                        ": " +
                                        item.itemVariantValue3}
                                      <br />
                                    </>
                                  )}
                                </label>
                              )}
                              {storeType === StoreTypes.AC_STORETYPE && (
                                <label className="text-[12px]">
                                  {item.salesChannelName}
                                </label>
                              )}

                              {!item.deliveryCompareAtPrice ? (
                                <label className="text-sm">
                                  <PriceWithCurrency
                                    value={
                                      item.deliveryPriceWithTax
                                        ? item.deliveryPriceWithTax
                                        : item.deliveryPrice
                                    }
                                  />
                                </label>
                              ) : (
                                <div className="flex flex-col">
                                  <label className="text-sm text-[tomato]">
                                    <PriceWithCurrency
                                      value={
                                        item.deliveryPriceWithTax
                                          ? item.deliveryPriceWithTax
                                          : item.deliveryPrice
                                      }
                                    />
                                  </label>
                                  <label className="text-[grey] text-sm line-through pr-2">
                                    <PriceWithCurrency
                                      value={item.deliveryCompareAtPrice}
                                    />
                                  </label>
                                </div>
                              )}
                              <div className="py-3">
                                <QuantityButtons
                                  buttonDecreaseDisabled={
                                    item.salesChannelName === "Facebook Live"
                                  }
                                  buttonIncreaseDisabled={
                                    item.quantity >= item.maxQuantity ||
                                    item.salesChannelName === "Facebook Live"
                                  }
                                  handleClickRemove={(e) => {
                                    e.stopPropagation();
                                    handleRemoveItem(item);
                                  }}
                                  handleClickAdd={(e) => {
                                    e.stopPropagation();
                                    handleAddItem(item, index);
                                  }}
                                  quantity={item.quantity}
                                />
                              </div>
                              <div>
                                <label className="text-[12px]">
                                  {t("subtotal")}:{" "}
                                </label>
                                <label className="text-[15px] text-primary">
                                  <PriceWithCurrency
                                    value={
                                      item.subtotalWithTax
                                        ? item.subtotalWithTax
                                        : item.subtotal
                                    }
                                  />
                                </label>
                              </div>
                            </div>
                            <button
                              className="flex-[1] justify-center items-center select-none rounded-full outline-none text-[grey] hover:bg-black hover:bg-opacity-5"
                              disabled={item.status === "Locked"}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveItem(item, "whole");
                              }}
                            >
                              <span>
                                <CloseIcon size="w-6 h-6" viewBox="0 0 24 24" />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex mt-5">
                    <button
                      className="text-[13px] font-semibold mr-2"
                      onClick={() =>
                        router.push(
                          storeType === StoreTypes.WARUNG_STORETYPE
                            ? "/collections-menu"
                            : "/"
                        )
                      }
                    >
                      <ChevronLeftIcon className="fill-current w-4 h-3" />
                    </button>

                    <div className="rounded-2xl bg-gray-200 w-[340px] flex items-center text-[0.8rem] mr-2 p-3">
                      <span className="flex-[2]">{t("Total Cost")}</span>
                      <div className="flex-[3] text-primary font-semibold ">
                        <PriceWithCurrency value={totalAmount} />
                      </div>
                    </div>

                    <ContainedButton
                      onClick={handleCheckout}
                      className="font-semibold w-[45%]"
                      fontSize="text-[12px]"
                    >
                      {t("Checkout")}
                    </ContainedButton>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* <Recommendation /> */}
        </>
      )}
      <DialogModal
        open={confirmModal}
        onClose={() => setConfirmModal(false)}
        title={
          <Translation
            id={
              confirmModal?.isClearCart
                ? "removeAllItemsHeader"
                : "removeItemHeader"
            }
          />
        }
      >
        <p className="text-left text-gray-500">
          {/* translation later */}
          <Translation id={"removeItem"} />
        </p>
        <div className="text-right pt-3">
          <ContainedButton
            onClick={() => setConfirmModal(false)}
            outlined={true}
            className="mr-3 border-gray-300"
            border="rounded-md"
          >
            {/* translation later */}
            <Translation id="cancel" />
          </ContainedButton>
          <ContainedButton
            onClick={() => {
              confirmClearItem();
            }}
            className="font-semibold"
            border="rounded-md"
          >
            {/* translation later */}
            <Translation id="confirm" />
          </ContainedButton>
        </div>
      </DialogModal>
      {productModifierModalState.data?.selectedModifierGroups?.length > 0 ? (
        <ProductModifierModal
          showModal={productModifierModalState.visible}
          handleCloseModal={handleCloseProductModifierModal}
          mode="edit"
          productOriginalPrice={
            (productModifierModalState.data?.deliveryPriceWithTax
              ? productModifierModalState.data?.deliveryPriceWithTax
              : productModifierModalState.data?.deliveryPrice) -
            productModifierModalState.data?.modifierSubtotal
          }
          initialModifierGroups={
            productModifierModalState.data?.selectedModifierGroups
          }
          quantity={productModifierModalState.data?.quantity}
          item={productModifierModalState.data}
          outOfStock={false}
          handleOnSubmit={handleOnSubmitModifierModal}
          submitIsLoading={updateProductModifierInCartIsLoading}
          submitButtonTitle={t("Update Cart")}
        />
      ) : undefined}
    </>
  );
};

export default Cart;
