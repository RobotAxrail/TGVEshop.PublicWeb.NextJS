import useTranslation from "next-translate/useTranslation";

export default function FullfilmentSelector({
  orderOptions,
  orderType,
  onChange,
  currency,
}: {
  orderOptions: { orderType: string; price: string; label: string }[];
  onChange: (orderType: string) => void;
  orderType: string;
  currency: string;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col space-y-3 my-2">
      <label className="text-gray-500">{t("common:deliveryMethod")}</label>
      <div className="flex items-start mb-4 flex-col space-y-4">
        {orderOptions?.length === 0 && (
          <div className="p-10 text-center w-full bg-gray-100 rounded-md text-gray-500">
            {t("common:noOptionsAvailable")}
          </div>
        )}
        {orderOptions?.map(({ orderType: oT, price, label }, index) => (
          <FullfilmentOptionCard
            isSelected={orderType === oT}
            onClick={() => onChange(oT)}
            currency={currency}
            label={t(`common:${label}`)}
            price={price}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

function FullfilmentOptionCard({
  isSelected,
  onClick,
  label,
}: {
  onClick: () => void;
  isSelected: boolean;
  currency: string;
  price: string;
  label: string;
}) {
  return (
    <div
      className="flex flex-row w-full justify-between items-center cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-row space-x-3 items-center cursor-pointer">
        <div
          className={`w-6 h-6 bg-white rounded-full ${
            isSelected ? "border-primary border-8" : "border-gray-200 border-2"
          }`}
        />
        <label className="cursor-pointer">{label}</label>
      </div>
    </div>
  );
}
