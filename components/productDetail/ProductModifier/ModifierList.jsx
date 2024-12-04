import {
  ModifierRadioItem,
  ModifierCheckboxItem,
  ModifierTextArea,
} from "@/components/productDetail/ProductModifier/ModifierInputItems";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import useTranslation from "next-translate/useTranslation";

const ModifierGroupSection = ({
  mode,
  modifierGroup,
  index,
  inputType,
  errors,
  touched,
  handleChange,
  setFieldTouched,
}) => {
  const inputTypeElementName =
    inputType === "radio"
      ? "radioChecked"
      : inputType === "checkbox"
      ? "checkboxGroup"
      : "requestRemark";
  const { t } = useTranslation("common");
  const validationError = errors[modifierGroup.modifierGroupName];
  const itemTouched = touched?.modifierGroups?.[index]?.[inputTypeElementName];
  const showErrorMessage =
    mode === "edit"
      ? inputType !== "text" && validationError
      : inputType !== "text" && itemTouched && validationError;

  const getSectionInstructionText = () => {
    let instructionText = "";
    const min = modifierGroup.selectionRangeMin;
    const max = modifierGroup.selectionRangeMax;

    switch (inputType) {
      case "radio":
        instructionText = `${t("Pick")} ${min}`;
        break;
      case "checkbox":
        if (min === max) {
          instructionText = `${t("Pick")} ${min}`;
          break;
        } else if (min === 0) {
          instructionText = `${t("Optional")} (${t("Max")} ${max})`;
          break;
        } else {
          instructionText = `${t("Pick")} ${min} ${t("to")} ${max}`;
          break;
        }
        break;
      case "text":
        instructionText = `${t("Optional")}`;
        break;
      default:
    }

    return instructionText;
  };

  return (
    <div key={modifierGroup.modifierGroupId} className="bg-white mt-5 mb-5">
      <div
        className={inputType !== "text" ? "pl-5 pr-5 pt-5" : "p-5"}
        name={`modifierGroups[${index}].modifierGroupName`}
      >
        <div className="flex justify-between items-center mb-5 h-[auto]">
          <div className="flex items-center w-[90%]">
            <h3 className="m-0 mr-3">{modifierGroup.modifierGroupName}</h3>
            <div
              className={
                (showErrorMessage
                  ? "bg-red-100 h-[1.5rem] p-1 pl-2 pr-2 text-red-600 font-bold rounded-lg "
                  : "") + "flex mt-1 whitespace-nowrap"
              }
            >
              <span className="text-xs m-0">{getSectionInstructionText()}</span>
            </div>
          </div>
          {showErrorMessage ? (
            <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
          ) : undefined}
        </div>
        <>
          {inputType === "radio" && (
            <>
              {modifierGroup.modifier.map((modifier, i) => (
                <ModifierRadioItem
                  key={modifier.modifierId}
                  name={`modifierGroups[${index}].radioChecked`}
                  modifierName={modifier.modifierName}
                  modifierOOS={modifier.availableStatus === "oos"}
                  value={modifier.modifierId}
                  className={
                    i + 1 === modifierGroup.modifier.length ? "border-b-0" : ""
                  }
                  price={modifier.price}
                  checked={modifierGroup.radioChecked === modifier.modifierId}
                  disabled={modifier.availableStatus === "oos"}
                />
              ))}
            </>
          )}
          {inputType === "checkbox" && (
            <>
              {modifierGroup.modifier.map((modifier, i) => (
                <div
                  role="group"
                  key={modifier.modifierId}
                  aria-labelledby="checkbox-group"
                >
                  <ModifierCheckboxItem
                    handleChange={handleChange}
                    name={`modifierGroups[${index}].checkboxGroup`}
                    modifierName={modifier.modifierName}
                    price={
                      modifier.priceWithTax
                        ? modifier.priceWithTax
                        : modifier.price
                    }
                    modifierOOS={modifier.availableStatus === "oos"}
                    value={modifier.modifierId}
                    className={
                      i + 1 === modifierGroup.modifier.length
                        ? "border-b-0"
                        : ""
                    }
                    checked={
                      modifierGroup.checkboxGroup?.includes(
                        modifier.modifierId
                      ) ?? false
                    }
                    disabled={
                      (modifierGroup.checkboxGroup.length ===
                        modifierGroup.selectionRangeMax &&
                        !modifierGroup.checkboxGroup.includes(
                          modifier.modifierId
                        )) ||
                      modifier.availableStatus === "oos"
                    }
                  />
                </div>
              ))}
            </>
          )}
          {inputType === "text" && (
            <ModifierTextArea name={`modifierGroups[${index}].requestRemark`} />
          )}
        </>
      </div>
    </div>
  );
};

const ModifierList = ({ formikProps, mode }) => {
  return (
    <>
      {formikProps.values.modifierGroups.length > 0 &&
        formikProps.values.modifierGroups.map((modifierGroup, index) => {
          if (
            ((modifierGroup.inputType === "radio" ||
              modifierGroup.inputType === "checkbox") &&
              modifierGroup.modifier?.length > 0) ||
            modifierGroup.inputType === "text"
          ) {
            return (
              <ModifierGroupSection
                mode={mode}
                key={modifierGroup.modifierGroupId}
                modifierGroup={modifierGroup}
                index={index}
                inputType={modifierGroup.inputType}
                {...formikProps}
              />
            );
          }
        })}
    </>
  );
};

export default ModifierList;
