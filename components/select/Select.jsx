import classes from "./Select.module.scss";

const Select = (props) => {
  const { value, title, children } = props;

  return (
    <select
      className={[
        classes["sort-select"],
        "text-[12px] block appearance-none w-full cursor-pointer bg-gray-200 border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
      ].join(" ")}
      value={value}
      {...props}
    >
      <option value={""} disabled>
        {title}
      </option>
      {children}
    </select>
  );
};

export default Select;
