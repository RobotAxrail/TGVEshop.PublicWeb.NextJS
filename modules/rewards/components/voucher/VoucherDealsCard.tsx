import useTranslation from "next-translate/useTranslation";
import { Card, Image, Button } from "react-vant";

export default function VoucherDealsCard({
  onShowDetails,
  voucherImage,
  voucherName,
  price,
}: {
  onShowDetails: () => void;
  voucherImage: string;
  voucherName: string;
  price: string;
}) {
  const { t } = useTranslation();

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
        <div className="space-y-2 text-[14px]">
          <div className="font-[400] line-clamp-1">{voucherName}</div>
          <div className="mt-auto text-primary">{price}</div>
        </div>
      </Card.Body>
    </Card>
  );
}
