export const Tooltip = ({ message, children, show }) => {
  return (
    <div className="flex flex-col items-end group">
      {children}
      <div
        className={[
          "absolute bottom-4 flex flex-col items-center mb-6 ",
          show ? "active:opacity-1" : "opacity-0",
        ].join(" ")}
      >
        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-green-600 shadow-lg rounded-md">
          {message}
        </span>
        <div className="w-3 h-3 -mt-2 rotate-45 bg-green-600"></div>
      </div>
    </div>
  );
};
