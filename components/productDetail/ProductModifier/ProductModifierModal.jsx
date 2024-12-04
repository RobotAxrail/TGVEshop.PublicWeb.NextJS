import { useEffect, useState, useContext } from "react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import Image from "next/image";
import MobileViewFullScreenModal from "@/components/dialog/MobileViewFullScreenModal/MobileViewFullScreenModal";
// components
import { ContainedButton, QuantityButtons } from "@/components/buttons/Buttons";
import ModifierList from "@/components/productDetail/ProductModifier/ModifierList";
import { Loader } from "@/components/loader/Loader";
import { validateProductModifierModal } from "@/validation/shared/validateProductModifierModal";
import { Formik, Form, useFormikContext } from "formik";
import PriceWithCurrency from "@/components/priceWithCurrency/PriceWithCurrency";
import { setToastState } from "@/states/toastBarState";
import MerchantContext from "@/contexts/MerchantContext";
import { XIcon } from "@heroicons/react/outline";
import produce from "immer";
import _ from "lodash";
import Chip from "@/components/chip/Chip";
import AspectRatioSquareContainer from "@/components/shared/AspectRatioSquareContainer";
import { LoadingIcon } from "@/components/icons/Icons";
import { useOrder } from "@/contexts/OrderContext";
import { useCart } from "@/contexts/CartContext";

const ProductModifierModal = ({
  productOriginalPrice,
  showModal,
  handleCloseModal,
  initialModifierGroups,
  mode = "create",
  quantity,
  submitIsLoading,
  item,
  outOfStock,
  handleOnSubmit,
  submitButtonTitle = "Add To Cart",
  itemStatus = "loaded",
  clearFormOnClose = false,
  isCollection = false,
  currentCartId = "",
  findInCart = () => {},
  isInCart = false,
  setIsInCart = () => {},
}) => {
  const { t } = useTranslation("common");
  const { orderType } = useOrder();
  const { currency } = useContext(MerchantContext);
  const [modifierRadioPrice, setModifierRadioPrice] = useState(0);
  const [modifierCheckedPrice, setModifierCheckedPrice] = useState(0);
  const [formState, setFormState] = useState({
    modifierGroups: [],
    quantity: 0,
    status: "none",
  });
  const getInputType = (modifierGroup) => {
    let type = "";
    switch (true) {
      case modifierGroup.modifierGroupType === "choice" &&
        modifierGroup.selectionRangeMin === 1 &&
        modifierGroup.selectionRangeMax === 1:
        type = "radio";
        break;
      case modifierGroup.modifierGroupType === "choice" &&
        modifierGroup.selectionRangeMax - modifierGroup.selectionRangeMin >= 0:
        type = "checkbox";
        break;
      default:
        type = "text";
        break;
    }
    return type;
  };

  const getModifierGroupsOutput = (modifierGroupsState) => {
    try {
      const outputList = modifierGroupsState.modifierGroups.map(
        (modifierGroup) => {
          const updatedModifierList = produce(modifierGroup, (draft) => {
            const { modifier, inputType, selectionRangeMin, radioChecked } =
              modifierGroup;

            draft["modifier"] = modifier
              .filter((modifier) => {
                let returnedValue = null;
                if (inputType === "text" && selectionRangeMin < 1) {
                  returnedValue = false;
                } else {
                  switch (inputType) {
                    case "radio":
                      returnedValue = modifier.modifierId === radioChecked;
                      break;
                    case "checkbox":
                      returnedValue = modifierGroup.checkboxGroup.includes(
                        modifier.modifierId
                      );
                      break;
                    default:
                  }
                }
                return returnedValue;
              })
              .map((modifier) => _.omit(modifier, ["price", "isSelected"]));
            //remove form state usage fields
            delete draft["checkboxGroup"];
            delete draft["inputType"];
            delete draft["radioChecked"];
            delete draft["isSelected"];
          });
          return updatedModifierList;
        }
      );
      return {
        selectedModifierGroups: outputList,
        quantity: modifierGroupsState.quantity,
      };
    } catch (error) {
      return null;
    }
  };

  const setItemQuantity = (quantity, setFieldValue) => {
    setFieldValue("quantity", quantity);
  };

  const handleClose = () => {
    handleCloseModal();
    if (clearFormOnClose) {
      setFormState({ modifierGroups: [], quantity: 0, status: "none" });
    }
  };

  useEffect(() => {
    const initFormState = () => {
      if (itemStatus === "loaded") {
        setFormState((prev) => ({
          ...prev,
          status: "loading",
        }));
        if (initialModifierGroups?.length > 0) {
          let formikState = initialModifierGroups.map((modifierGroup) => {
            const inputType = getInputType(modifierGroup);
            let radioChecked = "";
            let checkboxGroup = [];

            if (modifierGroup?.modifier?.[0]?.isSelected !== undefined) {
              modifierGroup.modifier.forEach((modifier) => {
                switch (true) {
                  case modifier.isSelected && inputType === "radio":
                    radioChecked = modifier.modifierId;
                    break;
                  case modifier.isSelected && inputType === "checkbox":
                    checkboxGroup.push(modifier.modifierId);
                    break;
                  default:
                }
              });
            }

            return {
              ...modifierGroup,
              radioChecked: radioChecked,
              checkboxGroup: checkboxGroup,
              inputType: inputType,
            };
          });
          setFormState({
            modifierGroups: formikState,
            quantity: quantity,
            status: "loaded",
          });
        } else {
          setFormState({ modifierGroups: [], quantity: 1, status: "loaded" });
        }
      } else if (itemStatus === "error") {
        handleClose();
        setFormState({
          modifierGroups: [],
          quantity: 0,
          status: "error",
        });
        setToastState({
          show: true,
          severity: "error",
          message: `${t(
            "An error occured when viewing the selected product"
          )}.`,
        });
      }
    };
    initFormState();
  }, [initialModifierGroups, itemStatus]);

  function getCartPrice(selectedModifier) {
    const groups = selectedModifier?.values?.modifierGroups;
    return groups.reduce((p, modifierGroup) => {
      if (modifierGroup?.inputType === "radio") {
        const { radioChecked, modifier } = modifierGroup;
        const selectedRadioButton = modifier.filter(
          (mod) => mod?.modifierId === radioChecked
        );
        const radioButtonSum = selectedRadioButton.reduce(
          (p, c) => p + c?.price,
          0
        );
        return radioButtonSum + p;
      } else if (modifierGroup?.inputType === "checkbox") {
        const { modifier, checkboxGroup } = modifierGroup;
        const selectedCheckboxes = modifier.filter((mod) =>
          checkboxGroup.includes(mod?.modifierId)
        );
        const selectedCheckboxesSum = selectedCheckboxes.reduce(
          (p, c) => p + c?.price,
          0
        );
        return selectedCheckboxesSum + p;
      }
      return p;
    }, 0);
  }

  function renderSubmitButtonTitle() {
    if (isInCart) return "Update Cart";
    return submitButtonTitle;
  }

  return (
    <MobileViewFullScreenModal
      className={[
        "w-[100%] sm:h-[100%] sm:w-[60%] sm:max-w-[40rem] sm:mt-[2rem] sm:mb-[2rem]",
        formState.status === "none" ? "bg-transparent" : "bg-gray-100",
        formState?.modifierGroups?.length < 1
          ? formState?.status === "loading" || itemStatus === "loading"
            ? "h-full"
            : "h-0"
          : "h-full",
      ].join(" ")}
      open={showModal}
      onClose={handleClose}
      fullScreen={formState?.modifierGroups?.length > 0 ? true : false}
    >
      {formState?.status === "loaded" && (
        <Formik
          initialTouched={{
            field: true,
          }}
          key="modifier-form"
          initialValues={formState}
          validationSchema={validateProductModifierModal}
          validateOnMount={true}
          onSubmit={(val) => {
            window.dataLayer.push({
              event: "addtocartClicked",
              orderType: orderType,
              productId:
                item?.productUOMs?.length > 0
                  ? item?.productUOMs[0]?.productId
                  : "",
              productTitle: item.title,
            });
            handleOnSubmit(getModifierGroupsOutput(val)).then((val) => {
              if (val?.status === true || val?.status === "true") {
                handleClose();
              }
            });
          }}
        >
          {(formikProps) => {
            return (
              <Form
                className={[
                  formState?.modifierGroups?.length === 0 &&
                    "lg:relative fixed bottom-0 right-0 left-0 bg-white",
                ].join(" ")}
              >
                <FormObserver
                  isInCart={isInCart}
                  currentCartId={currentCartId}
                  setItemQuantity={setItemQuantity}
                  isCollection={isCollection}
                  findInCart={findInCart}
                  setIsInCart={setIsInCart}
                />
                <div
                  className={[
                    formState?.modifierGroups?.length > 0 &&
                      "mb-[6rem] sm:mb-0",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "px-5 pt-5 pb-5 sm:pb-0 bg-white w-full z-[2] cursor-pointer",
                      formState?.modifierGroups?.length > 0 &&
                        "fixed sm:static top-0",
                    ].join(" ")}
                    onClick={handleClose}
                  >
                    <XIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div
                    className={[
                      "bg-white p-5 mb-3 sm:mt-0",
                      formState?.modifierGroups?.length > 0
                        ? "mb-3 mt-6"
                        : "mb-0",
                    ].join(" ")}
                  >
                    {/* <div
                      className="relative flex justify-center items-center rounded-full bg-white w-[1rem] h-[1rem] p-1 pb-5 cursor-pointer"
                      onClick={handleClose}
                    >
                      <XIcon className="absolute w-6 h-6 text-primary" />
                    </div> */}

                    <div className="flex gap-5 mt-5">
                      <div className="flex w-[80%]">
                        <div className="w-[4rem] mr-3">
                          <AspectRatioSquareContainer>
                            <Image
                              className={outOfStock ? "grayscale" : ""}
                              src={
                                process.env.BUCKET_URL +
                                (item.image || item.itemImage)
                              }
                              title={item.title}
                              alt={item.title}
                              layout="fill"
                              objectFit="cover"
                            />
                          </AspectRatioSquareContainer>
                        </div>
                        <div>
                          <h4 className="m-0 text-lg break-words">
                            {item.title || item.itemTitle}
                          </h4>
                          {outOfStock && <Chip label={t("Out Of Stock")} />}
                        </div>
                      </div>

                      <p className="font-bold m-0 mt-1">
                        <PriceWithCurrency value={productOriginalPrice} />
                      </p>
                    </div>
                  </div>
                  {formState?.modifierGroups?.length > 0 && (
                    <div className="min-h-[5rem]">
                      <ModifierList formikProps={formikProps} mode={mode} />
                    </div>
                  )}
                </div>

                <div
                  className={[
                    "flex bg-white p-3",
                    formState?.modifierGroups?.length > 0 &&
                      "fixed bottom-0 left-0 right-0 sm:relative",
                  ].join(" ")}
                >
                  <QuantityButtons
                    handleClickAdd={() =>
                      setItemQuantity(
                        formikProps.values.quantity + 1,
                        formikProps.setFieldValue
                      )
                    }
                    handleClickRemove={() =>
                      setItemQuantity(
                        formikProps.values.quantity - 1,
                        formikProps.setFieldValue
                      )
                    }
                    quantity={formikProps.values.quantity}
                    // setQuantity={setQuantity}
                    // canEditQuantity={canEditQuantity}
                    buttonDecreaseDisabled={
                      submitIsLoading ||
                      item.salesChannelName === "Facebook Live" ||
                      outOfStock ||
                      formikProps.values.quantity <= 1
                    }
                    buttonIncreaseDisabled={
                      submitIsLoading ||
                      item.quantity >= item.maxQuantity ||
                      item.salesChannelName === "Facebook Live" ||
                      outOfStock
                    }
                  />
                  <ContainedButton
                    className={`ml-3 w-full uppercase ${
                      !formikProps.isValid ? "bg-gray-400" : ""
                    }`}
                    loading={submitIsLoading}
                    type="submit"
                    fontSize="text-[13px]"
                    disabled={outOfStock}
                  >
                    {`${t(renderSubmitButtonTitle())} - ${currency}${parseFloat(
                      (formikProps?.values?.quantity || 1) *
                        (productOriginalPrice + getCartPrice(formikProps))
                    ).toFixed(2)}`}
                  </ContainedButton>
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
      {(formState?.status === "loading" || itemStatus === "loading") && (
        // {true && (
        <div
          className={[
            `flex justify-center items-center`,
            "h-[var(--app-height)] sm:h-[20rem]",
          ].join(" ")}
        >
          <LoadingIcon color="text-primary" width="w-7" height="h-7" />
        </div>
      )}
    </MobileViewFullScreenModal>
  );
};

const FormObserver = ({
  isInCart,
  currentCartId,
  setItemQuantity,
  isCollection,
  findInCart,
  setIsInCart,
}) => {
  const { values, setFieldValue } = useFormikContext();
  const { cartList } = useCart();

  useEffect(() => {
    const formattedArr = values?.modifierGroups?.map((item) => {
      const { checkboxGroup, ...remaining } = item;

      if (checkboxGroup.length) {
        const processedModifier = item.modifier.map((element) => {
          return {
            ...element,
            isSelected: checkboxGroup.includes(element.modifierId),
          };
        });

        return {
          ...remaining,
          modifier: processedModifier,
        };
      }

      return remaining;
    });

    if (isCollection) {
      findInCart(formattedArr).then((res) => {
        setIsInCart(res);

        if (res) {
          const currentCartItem = cartList?.find(
            (item) => item.customerCartId === currentCartId
          );

          if (currentCartItem) {
            setItemQuantity(currentCartItem.quantity, setFieldValue);
          }
        } else {
          setItemQuantity(1, setFieldValue);
        }
      });
    } else {
      setItemQuantity(values.quantity, setFieldValue);
    }
  }, [values.modifierGroups, isInCart]);

  return null;
};

export default ProductModifierModal;
