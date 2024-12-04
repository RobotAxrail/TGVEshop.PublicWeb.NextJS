// import { CheckboxWithoutLabel } from "@/components/inputs/Input";
import { AnimatedChecked, RadioButton } from "@/components/inputs/Input";
import PriceWithCurrency from "@/components/priceWithCurrency/PriceWithCurrency";
import { useField } from "formik";
import Chip from "@/components/chip/Chip";
import useTranslation from "next-translate/useTranslation";

export const ModifierRadioItem = ({
  handleSelect,
  modifierName,
  modifierOOS,
  className,
  price,
  ...props
}) => {
  const [field] = useField(props);
  const { t } = useTranslation("common");

  return (
    <label
      // onClick={handleSelect}
      // for={field.name}
      className={`flex items-center mt-3 mb-3 border-b-[0.1rem] h-[2rem] pb-5 cursor-pointer ${className}`}
    >
      {/* <input
        type="radio"
        // checked={props.checked}
        className="radio"
        label="modifierRadio"
        value="test"
      {...field}
        {...props}
      /> */}
      <RadioButton
        type="radio"
        id={field.name + modifierName}
        label={field.name}
        {...field}
        {...props}
      />
      <div className="ml-[1rem] flex justify-between w-full">
        <span>{modifierName}</span>
        {modifierOOS?<span><Chip label={t("Out Of Stock")} /></span>:null}
        <span className="min-w-[6rem] text-gray-500">
          + <PriceWithCurrency value={price} />
        </span>
      </div>
    </label>
  );
};

export const ModifierCheckboxItem = ({
  modifierName,
  price,
  modifierOOS,
  handleSelect,
  className,
  handleChange,
  ...props
}) => {
  const [field] = useField(props);
  return (
    <label
      className={`flex items-center mt-3 mb-3 border-b-[0.1rem] h-[2rem] pb-5 cursor-pointer ${className}`}
    >
      {/* <input type="checkbox" {...field} {...props} /> */}
      <AnimatedChecked
        {...field}
        {...props}
        checked={props.checked}
        onTick={(e) => {
          handleChange(e);
        }}
      />
      <div className="flex justify-between w-full ml-[1rem]">
        <span>{modifierName}</span>
        {modifierOOS?<span><Chip label={"Out Of Stock"} /></span>:null}
        <span className="min-w-[6rem] text-gray-500">
          + <PriceWithCurrency value={price} />
        </span>
      </div>
    </label>
  );
};

export const ModifierTextArea = ({ text, onChange, ...props }) => {
  const [field] = useField(props);
  return (
    <textarea
      className="w-full border-[1px] border-gray-400 rounded-m p-3"
      placeholder="Your answer"
      name="enquiry"
      // onChange={onChange}
      {...field}
      {...props}
    />
  );
};
