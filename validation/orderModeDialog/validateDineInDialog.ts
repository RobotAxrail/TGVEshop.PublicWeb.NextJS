import * as Yup from "yup";

export const validateDineInDialog = Yup.object().shape({
  tableNumber: Yup.string().required("table number is required."),
  // .matches(/^[a-z0-9]+$/i, "Must contain only alphanumeric characters"),
});
