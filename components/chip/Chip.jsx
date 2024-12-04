const Chip = (props) => {
  const { label, className, ...rest } = props;

  return (
    <div
      className={[
        className,
        "inline-flex items-center text-[12px] text-[#cd1364] bg-[#f8dfe7] h-6 rounded-full",
      ].join(" ")}
      {...rest}
    >
      <span className="px-2 xs:px-3 overflow-ellipsis overflow-hidden">{label}</span>
    </div>
  );
};

export default Chip;
