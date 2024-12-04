import Image from "next/image";

// components
import { QuantityButtons } from "@/components/buttons/Buttons";
import { Checkbox } from "@/components/inputs/Input";
import PriceWithCurrency from "@/components/priceWithCurrency/PriceWithCurrency";

// icons
import { CloseIcon } from "@/components/icons/Icons";
import { getSelectedModifiersToDisplayList } from "@/utils/util";
import _ from "lodash";
import AspectRatioSquareContainer from "../shared/AspectRatioSquareContainer";
import { StoreTypes } from "@/enums/enums";

const CartTable = (props) => {
  const {
    handleSelectedItem = () => {},
    isSelectedAll = false,
    cartList,
    checkIsSelected = () => {},
    handleRemoveItem = () => {},
    handleAddItem = () => {},
    updateCartIsLoading = false,
    isFbLive = false,
    handleToggleEditModifier,
    storeType,
  } = props;
  return (
    <div className="bg-white rounded overflow-x-auto">
      <table className="max-w-1200 w-full">
        <thead className="bg-primary text-white text-left">
          <tr>
            <th className="p-[16px] rounded-tl-4">
              <Checkbox
                checked={isSelectedAll}
                indeterminate={true}
                onClick={() => handleSelectedItem(!isSelectedAll)}
                disabled={_.every(cartList, (obj) => {
                  if (
                    obj.errorMessage === "Unavailable" ||
                    obj.errorMessage === "Out Of Stock"
                  )
                    return true;
                })}
              />
            </th>
            <th className="p-[16px]">Product</th>
            <th className="p-[16px]"></th>
            {storeType === StoreTypes.AC_STORETYPE && (
              <th className="p-[16px]">Sales Channel</th>
            )}
            <th className="p-[16px]">Stock Status</th>
            <th className="p-[16px]">Unit Price</th>
            <th className="p-[16px]">Qty</th>
            <th className="p-[16px]">Subtotal</th>
            <th className="p-[16px] rounded-tr-lg"></th>
          </tr>
        </thead>
        <tbody className="text-[14px] font-semibold">
          {cartList?.map((item, index) => (
            <tr key={index}>
              <td className="p-[16px]">
                <Checkbox
                  checked={checkIsSelected(item.customerCartId)}
                  onClick={() => {
                    handleSelectedItem(item.customerCartId);
                  }}
                  disabled={
                    item.errorMessage === "Unavailable" ||
                    item.errorMessage === "Out Of Stock"
                  }
                />
              </td>
              <td className="p-[16px]">
                <AspectRatioSquareContainer>
                  <Image
                    src={process.env.BUCKET_URL + item.itemImage}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </AspectRatioSquareContainer>
              </td>
              <td className="p-[16px] max-w-[20%]">
                <div>{item.itemTitle}</div>

                {item.selectedModifierGroups?.length && (
                  <>
                    {getSelectedModifiersToDisplayList(
                      item.selectedModifierGroups
                    ).map((modifierName) => (
                      <div className="font-light font-xs text-ellipsis w-[100%] max-w-[10rem] overflow-hidden">
                        {modifierName}
                      </div>
                    ))}
                    <div
                      className="text-blue-500 font-light cursor-pointer"
                      onClick={() => handleToggleEditModifier(item)}
                    >
                      Edit
                    </div>
                  </>
                )}

                {item.itemVariantName1 && (
                  <>
                    {item.itemVariantName1 && (
                      <div className="font-light font-xs text-ellipsis w-[100%] max-w-[10rem] overflow-hidden">
                        {item.itemVariantName1 + ": " + item.itemVariantValue1}
                        <br />
                      </div>
                    )}
                    {item.itemVariantName2 && (
                      <div className="font-light font-xs text-ellipsis w-[100%] max-w-[10rem] overflow-hidden">
                        {item.itemVariantName2 + ": " + item.itemVariantValue2}
                        <br />
                      </div>
                    )}
                    {item.itemVariantName3 && (
                      <div className="font-light font-xs text-ellipsis w-[100%] max-w-[10rem] overflow-hidden">
                        {item.itemVariantName3 + ": " + item.itemVariantValue3}
                        <br />
                      </div>
                    )}
                  </>
                )}
              </td>

              {storeType === StoreTypes.AC_STORETYPE && (
                <td className="p-[16px]">{item.salesChannelName}</td>
              )}

              {item.errorMessage === "Unavailable" ? (
                <td className="p-[16px] text-[grey]">{item.errorMessage}</td>
              ) : item.salesChannelName !== "Facebook Live" &&
                (item.errorMessage === "Out Of Stock" ||
                  item.quantity > item.maxQuantity) ? (
                <td className="p-[16px] text-[tomato]">
                  {item.quantity > item.maxQuantity
                    ? "Out of Stock"
                    : item.errorMessage}
                </td>
              ) : (
                <td className="p-[16px] text-[green]">{"In Stock"}</td>
              )}
              <td className="p-[16px]">
                {[null, 0].includes(item.deliveryCompareAtPrice) ? (
                  <PriceWithCurrency
                    value={
                      item.deliveryPriceWithTax
                        ? item.deliveryPriceWithTax
                        : item.deliveryPrice
                    }
                  />
                ) : (
                  <>
                    <div className="font-medium text-[tomato]">
                      <PriceWithCurrency
                        value={
                          item.deliveryPriceWithTax
                            ? item.deliveryPriceWithTax
                            : item.deliveryPrice
                        }
                      />
                    </div>
                    <div className="text-[grey] font-medium line-through">
                      <PriceWithCurrency value={item.deliveryCompareAtPrice} />
                    </div>
                  </>
                )}
              </td>
              <td className="p-[16px]">
                <QuantityButtons
                  buttonDecreaseDisabled={
                    item.salesChannelName === "Facebook Live"
                  }
                  buttonIncreaseDisabled={
                    item.quantity >= item.maxQuantity ||
                    item.salesChannelName === "Facebook Live"
                  }
                  handleClickRemove={() => handleRemoveItem(item)}
                  handleClickAdd={() => handleAddItem(item, index)}
                  quantity={item.quantity}
                />
              </td>
              <td className="p-[16px]">
                <PriceWithCurrency
                  value={
                    item.subtotalWithTax ? item.subtotalWithTax : item.subtotal
                  }
                />
              </td>
              <td className="p-[16px]">
                <button
                  className="
                    p-3
                    inline-flex 
                    justify-center items-center flex-auto
                    select-none 
                    rounded-full
                    outline-none
                    text-[grey]
                    hover:bg-black hover:bg-opacity-5"
                  disabled={item.status === "Locked"}
                  onClick={() => handleRemoveItem(item, "whole")}
                >
                  <span className="flex justify-inherit items-inherit">
                    <CloseIcon size="w-6 h-6" viewBox="0 0 24 24" />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
