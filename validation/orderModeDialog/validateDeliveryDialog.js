import * as Yup from "yup";

export const validateDeliveryDialog = Yup.object().shape({
  isLoggedIn: Yup.boolean(),
  name: Yup.string().test({
    name: "name",
    test: function () {
      return this.parent.isLoggedIn
        ? this.parent.name
          ? true
          : this.createError({
              message: `Label is required.`,
              path: "name", // Fieldname
            })
        : true;
    },
  }),
  address: Yup.string().required("Address is required."),
  addressDetail: Yup.string().nullable(),
});
