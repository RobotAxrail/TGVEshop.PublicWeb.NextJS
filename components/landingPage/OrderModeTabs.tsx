import React, { ChangeEvent, useState } from "react";
import { ContainedButton } from "../buttons/Buttons";
import { useField, ErrorMessage, FieldInputProps, Formik, Form } from "formik";
import useTranslation from "next-translate/useTranslation";

import Image from "next/image";
import { TextInput } from "@/components/inputs/Input";

import { IOrderMode } from "types";
import { validateDineInDialog } from "@/validation/orderModeDialog/validateDineInDialog";
import { OrderTypes } from "@/enums/enums";

interface IOrderModeTabsProps {
  orderModeMap: Map<`${OrderTypes}`, IOrderMode>;
  selectedItem: string;
  handleOnClickOrderType: (orderType: `${OrderTypes}`) => void;
  handleOnClickMainButton: () => void;
  tableNumber: string;
  orderOption: Array<string>;
}

const FormTextInput: React.FC<{
  label: string;
  inputClassName: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  validationRegex?: RegExp;
  // inputProps: Partial<React.InputHTMLAttributes<HTMLInputElement>>;
  inputProps: any;
}> = ({ label, inputClassName, inputProps, validationRegex, handleChange }) => {
  const [field] = useField(inputProps);
  return (
    <TextInput
      inputClassName={inputClassName}
      label={label}
      {...inputProps}
      {...field}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        let newEvent = e;
        newEvent.target.value = e.target.value.replace(validationRegex, "");
        handleChange(newEvent);
        inputProps.onChange(newEvent);
      }}
    />
  );
};

const OrderModeTabs: React.FC<IOrderModeTabsProps> = ({
  orderModeMap,
  selectedItem,
  handleOnClickOrderType,
  handleOnClickMainButton,
  tableNumber,
  orderOption,
}) => {
  const { t } = useTranslation("common");
  return (
    <div className="card w-full bg-base-100 shadow-2xl">
      <div className="card-body p-5">
        <div className="flex flex-col items-center">
          <ul
            // className={`grid justify-between grid-cols-${orderOption.length} p-0 m-0 w-full`}
            className={`grid ${orderOption.length > 1
                ? `justify-between grid-cols-${orderOption.length}`
                : "justify-center grid-cols-[250px]"
              }  p-0 m-0 w-full`}
          >
            {[...orderModeMap]
              .filter((orderMode) => orderOption.includes(orderMode[0]))
              .map((orderMode) => (
                <li
                  key={orderMode[0]}
                  className={[
                    "h-[4rem] pb-5 tab tab-bordered border-b-[1px] list-none",
                    selectedItem === orderMode[0] &&
                    "border-b-[3px] border-primary",
                  ].join(" ")}
                >
                  <button
                    type="button"
                    role="tab"
                    onClick={() => handleOnClickOrderType(orderMode[0])}
                  >
                    <div
                      className={`flex flex-col ${selectedItem === orderMode[0] && "text-primary"
                        }`}
                    >
                      <Image
                        alt={orderMode[0]}
                        src={
                          selectedItem === orderMode[0]
                            ? orderMode[1].selectedImage
                            : orderMode[1].unselectedImage
                        }
                        width={25}
                        height={25}
                        priority={true}
                      />
                      {orderMode[1].title}
                    </div>
                  </button>
                </li>
              ))}
          </ul>
        </div>
        <div className="mt-3">
          {orderModeMap
            .get(selectedItem as `${OrderTypes}`)
            ?.inputs.map((input) => (
              <>
                {!input.inputProps.disabled ? (
                  <Formik
                    validateOnMount={true}
                    initialValues={{ tableNumber: tableNumber }}
                    validationSchema={validateDineInDialog}
                    onSubmit={(val, { setSubmitting }) =>
                      handleOnClickMainButton()
                    }
                  >
                    {({ values, errors, touched, handleChange }) => {
                      return (
                        <Form>
                          <div className="min-h-[5rem]">
                            <FormTextInput
                              inputClassName="rounded-lg text-sm"
                              label={input.label}
                              inputProps={input.inputProps}
                              handleChange={handleChange}
                              validationRegex={input.validationRegex}
                            />
                            {errors.tableNumber && touched.tableNumber && (
                              <div className="text-red-500 text-xs mt-1 text-left pl-4">
                                {errors.tableNumber}
                              </div>
                            )}
                          </div>

                          <ContainedButton
                            className="rounded-[0.4rem] w-full mt-3"
                            type="submit"
                          >
                            {t("Find food and order")}
                          </ContainedButton>
                        </Form>
                      );
                    }}
                  </Formik>
                ) : (
                  <>
                    <div className="min-h-[5rem]">
                      <div className="bg-gray-200 h-auto w-full rounded-[0.4rem] relative text-xs pb-2.5 px-4 pt-[31px] border border-gray-300">
                        <label className="text-gray-600 absolute top-0 left-0 pl-4 pt-3 origin-top-left">
                          {input.label}
                        </label>
                        <p className="font-bold m-0 text-[0.82rem] text-left line-clamp-2">
                          {input.inputProps.value}
                        </p>
                      </div>
                    </div>

                    <ContainedButton
                      className="rounded-[0.4rem] w-full mt-3"
                      type="submit"
                      onClick={handleOnClickMainButton}
                    >
                      {t("Find food and order")}
                    </ContainedButton>
                  </>
                )}
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OrderModeTabs;
