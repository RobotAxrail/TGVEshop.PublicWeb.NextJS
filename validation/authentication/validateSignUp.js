import * as Yup from "yup";
import { isValidPhoneNumber } from "@/utils/util";
export const validateSignUp = Yup.object().shape({
  firstName: Yup.string().required("First name is a required field"),
  lastName: Yup.string().required("Last name is a required field"),
  mobileNo: Yup.string()
    .required("Phone number is a required field")
    .test({
      name: "mobileNo",
      test: function () {
        return isValidPhoneNumber(this.parent.mobileNo, this.parent.country)
          ? true
          : this.createError({
              message: `${"Valid phone number is required"}`,
              path: "mobileNo", // Fieldname
            });
      },
    }),
  primaryEmail: Yup.string()
    .required("Email is a required field")
    .email("Valid email is required"),
  password: Yup.string().required("Password is a required field"),
});
