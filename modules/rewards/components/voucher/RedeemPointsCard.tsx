import useTranslation from "next-translate/useTranslation";
import { Card, Image, Button } from "react-vant";

export default function RedeemPointsCard({
  voucherPoints,
  onShowDetails,
  voucherImage,
  voucherName,
  onRedeem,
}: {
  onShowDetails: () => void;
  voucherPoints: string;
  onRedeem: () => void;
  voucherImage: string;
  voucherName: string;
}) {
  const { t } = useTranslation();
  const onClickRedeem = (e: any) => {
    e.stopPropagation();
    onRedeem();
  };
  return (
    <Card
      style={{ marginBottom: 20 }}
      className="border shadow"
      onClick={onShowDetails}
      round
      border
    >
      <Card.Cover className="relative pt-4">
        <Image
          style={{ height: "100px", width: "100px" }}
          className="mx-auto"
          src={voucherImage}
        />
      </Card.Cover>
      <Card.Body>
        <div className="space-y-2 text-[14px] border-b border-gray-200 pb-3">
          <div className="font-[400] line-clamp-1">{voucherName}</div>
          <div className="mt-auto text-primary">{`${voucherPoints} ${t(
            "Points"
          )}`}</div>
        </div>
      </Card.Body>
      <Card.Footer>
        <Button
          style={{ borderRadius: "6px" }}
          onClick={onClickRedeem}
          type="primary"
          size="normal"
          block
        >
          {t("Redeem Points")}
        </Button>
      </Card.Footer>
    </Card>
  );
}
