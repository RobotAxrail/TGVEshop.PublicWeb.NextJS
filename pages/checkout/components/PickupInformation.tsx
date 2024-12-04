import useTranslation from "next-translate/useTranslation";

export default function PickupInformation({
  pickupAddress,
}: {
  pickupAddress: string;
}) {
  const { t } = useTranslation();
  return (
    <div className="my-4">
      <h4 className="font-semibold m-0 text-primary text-lg p-0">
        {t("common:pickup-from")}
      </h4>
      <div className="text-gray-500 text-sm">{pickupAddress}</div>
    </div>
  );
}
