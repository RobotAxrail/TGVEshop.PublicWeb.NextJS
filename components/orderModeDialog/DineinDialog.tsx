import React, { ChangeEvent } from "react";
import { OrderModalStateActions } from "@/enums/enums";
import { validateDineInDialog } from "@/validation/orderModeDialog/validateDineInDialog";
import { Formik, Form, useField } from "formik";
import { ContainedButton } from "@/components/buttons/Buttons";
import { IDispatchOrderModalStateInput } from "types";
import { RectTextInput } from "../inputs/Input";
import useTranslation from "next-translate/useTranslation";

interface IDineinDialogProps {
  tableNumber: string;
  setTableNumber: (tableNumber: string) => void;
  dispatchOrderModalState: (
    dispatchOrderModalStateInput: IDispatchOrderModalStateInput
  ) => void;
}

interface IFormTextInput
  extends Partial<React.InputHTMLAttributes<HTMLInputElement>> {
  label: string;
  validationRegex?: RegExp;
}

const FormTextInput: React.FC<IFormTextInput> = ({
  label,
  validationRegex,
  ...rest
}) => {
  const [field] = useField(rest.name);
  return <RectTextInput label={label} {...rest} {...field} />;
};

const DineinDialog: React.FC<IDineinDialogProps> = ({
  tableNumber,
  setTableNumber,
  dispatchOrderModalState,
}) => {
  const { t } = useTranslation("common");
  return (
    <div className="mt-5 mb-1 flex-grow">
      <Formik
        validateOnMount={true}
        initialValues={{ tableNumber: tableNumber }}
        validationSchema={validateDineInDialog}
        onSubmit={(val, { setSubmitting }) => {
          setSubmitting(true);
          dispatchOrderModalState({
            type: OrderModalStateActions.CLOSE,
          });
          setTableNumber(val.tableNumber);
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isValidating, handleChange }) => {
          return (
            <Form>
              <div>
                <FormTextInput
                  label={t("Please enter your table number")}
                  value={tableNumber}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    let newEvent = e;
                    newEvent.target.value = e.target.value.replace(
                      /[\W_]+/g,
                      ""
                    );
                    handleChange(newEvent);
                    setTableNumber(newEvent.target.value);
                  }}
                  name="tableNumber"
                  validationRegex={/[\W_]+/g}
                />
                {errors.tableNumber && touched.tableNumber && (
                  <div className="text-red-500 text-xs mt-1 text-left pl-4">
                    {errors.tableNumber}
                  </div>
                )}
              </div>

              <ContainedButton className="mt-5 rounded-md w-full" type="submit">
                {t("Find food and order")}
              </ContainedButton>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default DineinDialog;
