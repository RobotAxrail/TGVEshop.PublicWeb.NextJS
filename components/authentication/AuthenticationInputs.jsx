import { useField, ErrorMessage } from "formik";
import {
  TextInput,
  AnimatedChecked,
  CustomPhoneInput,
} from "@/components/inputs/Input";
import useTranslation from "next-translate/useTranslation";

export const AuthTextInput = ({ label = "", ...rest }) => {
  const [field] = useField(rest);
  const { t } = useTranslation("common");
  return (
    <>
      <TextInput label={label} {...field} {...rest} />
      <ErrorMessage name={rest.name}>
        {(msg) => <div className="pl-5 text-sm text-red-600 my-1">{t(msg)}</div>}
      </ErrorMessage>
    </>
  );
};

export const AuthChecked = ({ label = "", handleChange, ...rest }) => {
  const [field] = useField(rest);
  return (
    <>
      <label className={["flex items-center", rest.className].join(" ")}>
        <AnimatedChecked
          {...rest}
          {...field}
          // checked={rest.checked}
          onTick={(e) => handleChange(e)}
        />
        <div className="ml-1">{label}</div>
      </label>
    </>
  );
};

export const AuthPhoneNumberInput = (props) => {
  const [field] = useField(props);
  return <CustomPhoneInput circleBorder {...field} {...props} />;
};
