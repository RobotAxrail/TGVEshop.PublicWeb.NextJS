const ASAP = "ASAP";
import useTranslation from 'next-translate/useTranslation';
export default function TimeSelector({
  title = "Delivery Time",
  onChange,
  value,
}: {
  onChange: (v: string) => void;
  value: string;
  title: string;
}) {
  function getCurrentTime() {
    const currDate = new Date();
    return `${currDate.getHours()}:${currDate.getMinutes()}`;
  }
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col items-center w-full gap-3 border border-gray-200 p-2 rounded">
      <p className="m-0 text-gray-800 text-sm mb-0.5 font-semibold w-full">
        {title}
      </p>
      <div
        onClick={() => onChange(ASAP)}
        className={`cursor-pointer p-3 flex flex-row items-center gap-3 w-full ${
          value === ASAP ? "bg-blue-100 rounded" : ""
        }`}
      >
        <div
          className={`min-w-[20px] min-h-[20px] rounded-full ${
            value === ASAP
              ? "border-primary border-4 bg-white"
              : "border-gray-300 border-2"
          } `}
        />
        <div className="flex flex-col gap-0 overflow-hidden">
          <p className="m-0 text-sm font-medium whitespace-nowrap text-ellipsis overflow-hidden">
            {t("As soon as possible")}
          </p>
        </div>
      </div>
      <p className="text-gray-400 m-0">- or - </p>
      <div
        className="w-full bg-gray-100 p-2 rounded"
        onClick={() => onChange(getCurrentTime())}
      >
        <input
          className="w-full bg-gray-100 rounded border-none outline-none"
          onChange={(e) => onChange(e?.target?.value)}
          disabled={value === ASAP}
          placeholder="Select Time"
          value={value}
          type={"time"}
        />
      </div>
    </div>
  );
}
