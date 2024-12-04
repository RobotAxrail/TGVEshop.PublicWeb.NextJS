import StarRating from "@/components/common/StarRating";
import useTranslation from "next-translate/useTranslation";

export default function RatingSection1({ productDetail }) {
  const { t } = useTranslation("common");
  const totalReviews = productDetail?.totalReviews;
  const averageRating =
    productDetail?.totalRatings && productDetail?.totalReviews
      ? productDetail.totalRatings / productDetail.totalReviews
      : 0;
  return (
    <div className="flex mt-2">
      {[averageRating, totalReviews].includes(0) ? (
        t("No Ratings Yet")
      ) : (
        <>
          <div className="flex mt-2 items-center border-r border-secondary border-solid">
            <div className="text-[1rem] text-primary border-solid border-b-2 border-primary">
              {averageRating?.toFixed(1)}
            </div>
            <div className="px-2">
              <div className="relative inline-block">
                <StarRating type="readonly" givenRating={averageRating} />
              </div>
            </div>
          </div>
          <div className="pl-2 flex mt-2 items-center">
            <div className="text-[1rem] text-primary border-solid border-b-2 border-primary">
              {totalReviews}
            </div>
            <div className="px-2">
              <div className="relative inline-block">
                {totalReviews > 1 ? t("Ratings") : t("Rating")}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
