import { CataloguePagination } from "@/components/cataloguePagination/CataloguePagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import MerchantContext from "@/contexts/MerchantContext";
import { useContext, useEffect, useState } from "react";
import StarRating from "@/components/common/StarRating";
import ProductTabPanels from "../../ProductTabPanels";
import { listItemReviews } from "@/graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { totalPagination, isLocalHost } from "@/utils/util";
import moment from "moment";
import useTranslation from "next-translate/useTranslation";

const INIT_NEXT_TOKEN = 0;
const LIMIT = 10;

export default function ReviewComponent1({ productId }: any) {
  const { t } = useTranslation("common");
  const [currentReviewList, setCurrentReviewList] = useState([]);
  const merchantInfoContext = useContext(MerchantContext);
  const [totalReviews, setTotalReviews] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);

  const totalReviewPages = totalPagination(totalReviews, LIMIT);
  const handleSelectPage = (pageNum) => setSelectedPage(pageNum);
  const handleForwardButton = () => {
    if (selectedPage < totalReviewPages) setSelectedPage(selectedPage + 1);
  };
  const handleBackButton = () => {
    if (selectedPage > 1) setSelectedPage(selectedPage - 1);
  };

  useEffect(() => {
    fetchListItemReviews((selectedPage - 1) * LIMIT);
  }, [selectedPage, productId]);

  const fetchListItemReviews = async (nextToken = INIT_NEXT_TOKEN) => {
    try {
      let params = {
        itemProperty: "Product",
        nextToken: nextToken,
        itemId: productId,
        limit: LIMIT,
      }
      if (isLocalHost()){
        params['merchantId'] = merchantInfoContext.merchantId
      }
      const { data } = (await API.graphql(
        graphqlOperation(listItemReviews, params)
      )) as any;
      setCurrentReviewList(data.listItemReviews.items);
      setTotalReviews(data.listItemReviews.total);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      {currentReviewList?.length > 0 && (
        <ProductTabPanels
          productDetail={undefined}
          userReview={undefined}
          title={t("Product Ratings")}
          bodyContent={
            <>
              {currentReviewList?.map((item) => (
                <ReviewComponentCard key={JSON.stringify(item)} item={item} />
              ))}
              <div className="flex justify-end">
                {totalReviewPages > 0 && (
                  <CataloguePagination
                    handleForwardButton={handleForwardButton}
                    handleSelectPage={handleSelectPage}
                    handleBackButton={handleBackButton}
                    totalPages={totalReviewPages}
                    selectedPage={selectedPage}
                    limit={LIMIT}
                  />
                )}
              </div>
            </>
          }
        />
      )}
    </>
  );
}

function ReviewComponentCard({ item }) {
  const { t } = useTranslation("common");
  return (
    <figure className="flex flex-col py-5 border-solid border-b border-gray-300">
      <figcaption className="flex items-center space-x-4">
        <FontAwesomeIcon
          className="text-primary m-4 text-[20px]"
          icon={faUser}
        />
        <div className="flex-auto">
          <div>
            {item.customerFirstName} {item.customerLastName}
          </div>
          <StarRating
            type="readonly"
            givenRating={item.rating}
            starSize={"text-[14px]"}
          />
          <div className="text-sm my-2 opacity-60">
            {moment(item.createdAt).format("DD/MM/YYYY HH:mm")} | {t("Variation")}:{" "}
            {item.itemVariantValue1}
            {item.itemVariantValue2 && "," + item.itemVariantValue2}{" "}
            {item.itemVariantValue3 && "," + item.itemVariantValue3}
          </div>
          <blockquote className="mt-4">{item.comment}</blockquote>
        </div>
      </figcaption>
    </figure>
  );
}
