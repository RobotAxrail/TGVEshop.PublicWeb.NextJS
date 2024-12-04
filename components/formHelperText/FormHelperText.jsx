const FormHelperText = (props) => {
  const { className } = props;

  return (
    <p
      className={[
        "mt-[3px] text-xs",
        className ? className : "text-gray-400",
      ].join(" ")}
    >
      {props.children}
    </p>
  );
};

export default FormHelperText;
