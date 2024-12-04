import React from "react";
import { useField } from "formik";
import { RectTextInput } from "../inputs/Input";

const DeliveryPopupInput = ({
  buttonIcon,
  label,
  errors,
  touched,
  section,
  ...rest
}) => {
  const [field] = useField(rest);
  return (
    <div
      className={[
        "flex flex-col items-start w-full",
        errors && (section === "Add" ? touched : true) ? "mb-2" : "mb-3",
      ].join(" ")}
    >
      <RectTextInput
        buttonIcon={buttonIcon}
        label={label}
        {...field}
        {...rest}
      />

      {errors && (section === "Add" ? touched : true) && (
        <div className="text-left text-red-500 text-xs mt-1">{errors}</div>
      )}
    </div>
  );
};

export default DeliveryPopupInput;
