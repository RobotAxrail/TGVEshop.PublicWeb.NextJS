import * as Yup from "yup";
export const validateSignIn = Yup.object().shape({
  primaryEmail: Yup.string()
    .required("Email is a required field")
    .email("Valid email is required"),
  password: Yup.string().required("Password is a required field"),
});
