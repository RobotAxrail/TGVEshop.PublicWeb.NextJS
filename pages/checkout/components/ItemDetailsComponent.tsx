import { useProductModifiers } from "../../../hooks/useProductModifiers";
import MerchantContext from "@/contexts/MerchantContext";
import { useCart } from "@/contexts/CartContext";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  CheckoutPageIconButton,
  CheckoutPageButton,
  ScaleInTransition,
  CheckoutPageCard,
} from "./common";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillDelete,
} from "react-icons/ai/index";
import ProductModifierModal from "@/components/productDetail/ProductModifier/ProductModifierModal";
import { StoreTypes } from "@/enums/enums";
import useTranslation from "next-translate/useTranslation";
import { setToastState } from "@/states/toastBarState";
import CounterItem from "@/components/common/CounterItem";

export default function ItemDetailsComponent({
  onToggleDeleteModal,
  isFetchingCheckCart,
  fetchedCartItem,
  updateCart,
  checkoutError,
}: {
  onToggleDeleteModal: (a: string) => void;
  updateCart: () => Promise<void>;
  isFetchingCheckCart: boolean;
  fetchedCartItem: any[];
  checkoutError: boolean;
}) {
  const {
    updateItemQtyCartList,
    isCartFetching,
    cartList,
    reachedCartLimit,
    checkCartItemQtyLimit,
  } = useCart() as any;
  const { storeId, currency, storeType } = useContext(MerchantContext);
  const router = useRouter();

  const CART_IS_EMPTY = !isCartFetching && cartList?.length === 0;
  const cartItemList =
    fetchedCartItem ||
    cartList?.filter(({ storeId: sI }) => sI === storeId) ||
    [];
  const { t } = useTranslation();

  return (
    <CheckoutPageCard>
      <div className="px-5 py-4 rounded-xl bg-[#fff] text-[#191919] space-y-3">
        <h4 className="text-lg font-semibold mb-4 mt-0 text-primary">
          {t("common:item_details")}
        </h4>
        <div className="flex flex-col space-y-3">
          <ScaleInTransition isOpen={Boolean(isCartFetching)}>
            <div className="flex flex-col space-y-2">
              <div className="bg-slate-200 h-[100px] rounded-md animate-pulse" />
              <div className="bg-slate-200 h-[100px] rounded-md animate-pulse" />
              <div className="bg-slate-200 h-[100px] rounded-md animate-pulse" />
              <div className="bg-slate-200 h-[100px] rounded-md animate-pulse" />
              <div className="bg-slate-200 h-[100px] rounded-md animate-pulse" />
            </div>
          </ScaleInTransition>
          <ScaleInTransition isOpen={Boolean(!CART_IS_EMPTY)}>
            <React.Fragment>
              {[...cartItemList]
                .sort((item1: any, item2: any) => {
                  if (item1.customerCartId < item2.customerCartId) return -1;
                  if (item1.customerCartId > item2.customerCartId) return 1;
                  return 0;
                })
                ?.map((item: any, index: number) => (
                  <ItemDetailsCard
                    disabledDeleteButton={isFetchingCheckCart}
                    disableQuantityButton={
                      isFetchingCheckCart ||
                      reachedCartLimit ||
                      checkCartItemQtyLimit(
                        item?.quantity,
                        item?.limitPerOrder
                      ) ||
                      checkoutError
                    }
                    isBottom={index + 1 === cartList?.length}
                    updateCart={updateCart}
                    currency={currency}
                    item={item}
                    key={index}
                    onChangeQuantity={(newQty: number) =>
                      updateItemQtyCartList(item?.customerCartId, newQty)
                    }
                    onRemoveCartItem={() =>
                      onToggleDeleteModal(item?.customerCartId)
                    }
                  />
                ))}
            </React.Fragment>
          </ScaleInTransition>
          {cartItemList.length > 0 &&
            StoreTypes.WARUNG_STORETYPE !== storeType && (
              <div className="flex flex-row justify-center pt-4 border-t">
                <CheckoutPageButton onClick={() => router.push("/")}>
                  {t("common:add_more_items")}
                </CheckoutPageButton>
              </div>
            )}

          <ScaleInTransition isOpen={Boolean(CART_IS_EMPTY)}>
            <div className="p-10 text-center w-full bg-gray-50 rounded-md text-gray-500 space-y-4 flex flex-col">
              <p className="text-md m-0">{t("common:no_orders_yet")}</p>
              <div>
                <CheckoutPageButton onClick={() => router.push("/")}>
                  {t("common:order_now")}
                </CheckoutPageButton>
              </div>
            </div>
          </ScaleInTransition>
        </div>
      </div>
    </CheckoutPageCard>
  );
}

function ItemDetailsCard({
  disableQuantityButton,
  onRemoveCartItem,
  onChangeQuantity,
  updateCart,
  isBottom,
  currency,
  item,
}: {
  onChangeQuantity: (newQty: number) => void;
  updateCart: () => Promise<void>;
  disableQuantityButton: boolean;
  disabledDeleteButton: boolean;
  onRemoveCartItem: () => void;
  isBottom: boolean;
  currency: string;
  item: any;
}) {
  const { QLExclusiveItemsHandling } = useCart() as any;
  const {
    handleUpdateProductModifierSelectionInCustomerCart,
    updateProductModifierIsLoading,
    handleToggleEditModifier,
    productModifierModalState,
    handleCloseProductModifierModal,
  } = useProductModifiers();

  const handleOnSubmitModifierModal = async (modifierGroupsState) => {
    const { selectedModifierGroups, quantity } = modifierGroupsState;
    const res = await handleUpdateProductModifierSelectionInCustomerCart(
      productModifierModalState.data.customerCartId,
      quantity,
      selectedModifierGroups
    );
    await updateCart();
    return res;
  };

  // This is to generate
  function generateItemsModifier() {
    const items =
      [
        item?.itemVariantValue1,
        item?.itemVariantValue2,
        item?.itemVariantValue3,
      ].filter((v) => Boolean(v)) || [];
    const result =
      item?.selectedModifierGroups
        ?.flatMap(({ modifier, modifierGroupType, requestRemark }) =>
          modifierGroupType !== "text"
            ? modifier
            : [
              {
                modifierName: requestRemark,
                isSelected: true,
              },
            ]
        )
        ?.filter(
          ({ isSelected, modifierName }) => isSelected && Boolean(modifierName)
        )
        ?.map(({ modifierName }) => modifierName) || [];

    return [...items, ...result]?.reduce(
      (prev: string, item: string, index: number) =>
        `${prev} ${index > 0 ? "," : ""} ${item}`,
      ""
    );
  }

  const showEdit = item?.selectedModifierGroups?.length > 0;
  const hasModifier =
    productModifierModalState?.data?.selectedModifierGroups?.length > 0;
  const { t } = useTranslation();

  return (
    <div
      className={`flex flex-row ${isBottom ? "" : "border-b border-gray-300 "
        } space-x-4 py-4 items-start`}
    >
      <span>
        <Image
          style={{ border: "1px solid gray", borderRadius: 8, minWidth: 100 }}
          src={process.env.BUCKET_URL + item?.itemImage}
          alt={item?.itemTitle}
          objectFit="cover"
          height={100}
          width={100}
        />
      </span>
      <div className="flex flex-col space-y-1 w-full items-start">
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between w-full items-start">
            <div className="flex flex-col">
              <p className="m-0 font-semibold text-xl">{item?.itemTitle}</p>
              <div className="flex flex-row">
                <p className="m-0 font-semibold text-primary text-base">
                  {currency}{" "}
                  {item?.subtotalWithTax === 0
                    ? item?.subtotal?.toFixed(2)
                    : item?.subtotalWithTax?.toFixed(2)}
                </p>
                {
                  item?.subtotalCompareAtPrice > 0 &&
                  <p className="line-through text-[grey] m-0 pl-2 pt-[3px] text-sm">
                    {`${currency} ${item?.subtotalCompareAtPrice?.toFixed(2)}`}
                  </p>
                }
              </div>
            </div>

            <CheckoutPageIconButton
              className="border-transparent text-gray-400 p-[0px]"
              onClick={onRemoveCartItem}
              variant="outline"
            >
              <AiFillDelete size={20} />
            </CheckoutPageIconButton>
          </div>

          <p className="m-0 text-sm text-gray-500">{generateItemsModifier()}</p>
          <div className="h-3" />

          <div className="w-full flex flex-row items-end">
            {showEdit && (
              <div
                className="text-blue-500 font-light cursor-pointer"
                onClick={() => handleToggleEditModifier(item)}
              >
                {t("common:edit")}
              </div>
            )}

            <div className="ml-auto w-fit">
              <CounterItem
                buttonDisabled={disableQuantityButton}
                onChange={onChangeQuantity}
                max={QLExclusiveItemsHandling(item) ? QLExclusiveItemsHandling(item) : item?.maxQuantity}
                value={item?.quantity}
                customLogicInputOnChange={(e: any, setV: any, v: string) => {
                  const exclusiveItem = QLExclusiveItemsHandling(item);
                  const parsedValue = parseInt(e.target.value);
                  const limitReached =
                    exclusiveItem !== null && parsedValue > exclusiveItem;
                  if (limitReached) {
                    setV(exclusiveItem.toString());
                    if (Number(v) !== exclusiveItem) {
                      onChangeQuantity(exclusiveItem);
                    }
                    setToastState({
                      show: true,
                      autoClose: true,
                      severity: "error",
                      message:
                        "You have reached the purchase limit for these items (Egg A - Tray, Egg B - Tray, Egg C - Tray, Egg D - Tray). Only a total of 20 trays are allowed for these items per order.",
                    });
                  } else {
                    setV(e.target.value as any);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {hasModifier && (
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
          submitIsLoading={updateProductModifierIsLoading}
          submitButtonTitle="Update Cart"
        />
      )}
    </div>
  );
}
