import React from "react";
import useTranslation from "next-translate/useTranslation";
// components
import { RectTextInput, RectTextarea } from "@/components/inputs/Input";
import { ContainedButton } from "@/components/buttons/Buttons";
import PriceWithCurrency from "@/components/priceWithCurrency/PriceWithCurrency";
// icons
import { XCircleIcon } from "@heroicons/react/solid";
import { StoreTypes, OrderTypes } from "@/enums/enums";

const OrderSummary = (props) => {
  const {
    checkCartResp,
    isSecondPage = true,
    totalValue,
    taxValue,
    shippingValue,
    isFreeDelivery,
    remarks,
    setRemarks = () => {},
    promoCode,
    setPromoCode = () => {},
    fetchCheckCart,
    isGenerating,
    removePromoCode,
    promoCodeAppliedValue,
    selectedDeliveryOption,
    orderType,
    storeType,
  } = props;
  const { t } = useTranslation("common");
  return (
    <div className="">
      {isSecondPage && storeType === StoreTypes.AC_STORETYPE ? (
        <>
          <h3 className="mt-0">{t("Voucher/Promo Code")}</h3>
          <div className="flex my-2">
            <RectTextInput
              label={t("promo_code_label")}
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              name="promoCode"
            />
            <ContainedButton
              onClick={() => fetchCheckCart("promocode")}
              className="ml-2"
              border="rounded"
              loading={isGenerating && promoCode !== ""}
              disabled={isGenerating || promoCode === ""}
            >
              {t("apply_button_text")}
            </ContainedButton>
          </div>
        </>
      ) : null}

      <div className="bg-[#f6f7f8] rounded-lg border p-5">
        <h3 className="mt-0">{t("order_summary_title")}</h3>
        <div className="">
          <div className="w-full">
            {/* subtotal */}
            <div className="flex justify-between">
              <label className="mb-1 text-sm">{t("subtotal")}</label>

              <label className="mb-1 float-right">
                <PriceWithCurrency
                  value={checkCartResp.subtotalWithTax ?? 0}
                  total={totalValue ?? 0}
                />
              </label>
            </div>

            {/* inclusive tax  */}
            {checkCartResp.subtotalWithTax !== checkCartResp.subtotal && (
              <div className="flex justify-between">
                <label className="mb-1 text-sm opacity-60">
                  {t("Incl. tax")}
                </label>

                <span>
                  <label className="mb-1 float-right opacity-60">
                    <PriceWithCurrency
                      value={
                        checkCartResp.subtotalWithTax -
                          checkCartResp.subtotal ?? 0
                      }
                      total={totalValue ?? 0}
                    />
                  </label>
                </span>
              </div>
            )}

            {/* shipping  */}
            {orderType === OrderTypes.DELIVERY && (
              <div className="flex justify-between">
                <label className="mb-1 text-sm">
                  {storeType === StoreTypes.WARUNG_STORETYPE
                    ? t("delivery_fee")
                    : t("Shipping")}
                  &nbsp;
                </label>
                <label className="mb-1 float-right">
                  {promoCodeAppliedValue.isFreeDelivery ? (
                    t("Free")
                  ) : (
                    <PriceWithCurrency
                      value={selectedDeliveryOption.rate}
                      total={totalValue}
                    />
                  )}
                </label>
              </div>
            )}

            {/* promo code */}
            {promoCodeAppliedValue.promoCodeApplied !== "" && (
              <div className="flex justify-between">
                <div className="flex flex-col flex-1 lg:w-auto xs:flex-row">
                  <label className="text-sm">
                    {t("promo_code_label")}&nbsp;
                  </label>
                  {promoCodeAppliedValue.promoCodeApplied !== "" && (
                    <div className="flex ">
                      <label className="text-[10px]	my-auto items-center text-ellipsis overflow-hidden">
                        ({promoCodeAppliedValue.promoCodeApplied})
                      </label>
                      <button
                        className="ml-px mt-[-4px] pointer-events-auto"
                        title="remove promo code"
                      >
                        <XCircleIcon
                          className="text-[red]"
                          height="16px"
                          width="16px"
                          onClick={removePromoCode}
                        />
                      </button>
                    </div>
                  )}
                </div>
                <div className="lg:w-auto">
                  <label className=" mb-1 float-right">
                    <PriceWithCurrency
                      value={promoCodeAppliedValue.discountValue ?? 0}
                      total={totalValue ?? 0}
                      prefix={promoCodeAppliedValue.discountValue > 0 && "-"}
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
          <hr className="divider h-[1px]" />
          <div className="w-full">
            {/* total */}
            <div className="flex justify-between">
              <label className="my-2 font-semibold text-sm">
                {t("total_label")}{" "}
                {checkCartResp.subtotalWithTax !== checkCartResp.subtotal
                  ? t("incl. tax")
                  : null}
              </label>

              <label className="my-2 float-right">
                <PriceWithCurrency value={totalValue} total={totalValue} />
              </label>
            </div>

            <div className="w-full my-2">
              <RectTextarea
                label="Remarks"
                value={remarks}
                onChange={setRemarks}
                className="bg-white"
                name="remarks"
                rows={2}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
