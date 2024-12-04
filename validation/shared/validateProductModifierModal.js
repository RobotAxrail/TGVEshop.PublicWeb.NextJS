import * as Yup from "yup";

export const validateProductModifierModal = Yup.object().shape({
  modifierGroups: Yup.array().of(
    Yup.object().shape({
      inputType: Yup.string(),
      selectionRangeMin: Yup.number(),
      selectionRangeMax: Yup.number(),
      radioChecked: Yup.string()
        .nullable()
        .test({
          name: "radioChecked",
          test: function () {
            return this.parent.inputType === "radio" &&
              !this.parent.radioChecked
              ? this.createError({
                  message: `input is required.`,
                  // path: "radioChecked", // Fieldname
                  path: this.parent.modifierGroupName, // Fieldname
                })
              : true;
          },
        }),
      checkboxGroup: Yup.array()
        .of(Yup.string())
        .test({
          name: "checkboxGroupMin",
          test: function () {
            return this.parent.inputType === "checkbox" &&
              this.parent.checkboxGroup.length < this.parent.selectionRangeMin
              ? this.createError({
                  message: `minimum ${this.parent.selectionRangeMin} input required.`,
                  // path: "checkboxGroup", // Fieldname
                  path: this.parent.modifierGroupName,
                })
              : true;
          },
        })
        .test({
          name: "checkboxGroupMax",
          test: function () {
            return this.parent.inputType === "checkbox" &&
              this.parent.checkboxGroup.length > this.parent.selectionRangeMax
              ? this.createError({
                  message: `Maximum ${this.parent.selectionRangeMax} input.`,
                  // path: "checkboxGroup", // Fieldname
                  path: this.parent.modifierGroupName,
                })
              : true;
          },
        }),
      requestRemark: Yup.string().nullable(),
    })
  ),
});
