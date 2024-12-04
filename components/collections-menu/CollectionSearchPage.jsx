import Image from "next/image";
import { Waypoint } from "react-waypoint";
import PriceWithCurrency from "../priceWithCurrency/PriceWithCurrency";
import ScrollToLoadLoader from "../scrollToLoad/ScrollToLoadLoader";
import AspectRatioSquareContainer from "../shared/AspectRatioSquareContainer";
import classes from "./CollectionsMenu.module.scss";
import searchNotFound from "@/images/search-not-found.png";
import useTranslation from 'next-translate/useTranslation';

const CollectionSearchPage = ({
  collectionMenuItemList,
  limit,
  dispatchCollectionsMenuState,
  setProductModifierModalState,
  collectionsIsLoading,
}) => {
  const { t } = useTranslation('common');
  return (
    <div className="mb-[5rem]">
      {collectionMenuItemList.length > 0 ? (
        collectionMenuItemList.map((item, index) => (
          <>
            <div
              className="flex pb-5"
              onClick={() =>
                setProductModifierModalState({
                  visible: true,
                  seoUrl: item.seoUrl,
                })
              }
            >
              {/* <div className="w-20 flex w-full aspect-square relative rounded-xl overflow-hidden"> */}
              <div className="flex flex-[1] mr-5">
                <AspectRatioSquareContainer rounded="xl">
                  <Image
                    className="image-item"
                    src={process.env.BUCKET_URL + item.image}
                    title="test"
                    alt="test"
                    layout="fill"
                    objectFit="cover"
                    priority={index < 20}
                  />
                </AspectRatioSquareContainer>
              </div>
              <div className="flex-[3]">
                <span className="text-primary">{item.homeCollectionTitle}</span>
                <h2
                  className={[
                    classes["max-2-row"],
                    "mt-0 text-[0.9rem] sm:text-base",
                  ].join(" ")}
                >
                  {item.title}
                </h2>
                <p className="text-sm m-0">
                  <PriceWithCurrency
                    value={
                      item?.deliveryPriceWithTax
                        ? item?.deliveryPriceWithTax
                        : item?.deliveryPrice
                    }
                  />
                </p>
              </div>
            </div>

            {index === collectionMenuItemList.length - 10 && (
              <Waypoint
                onEnter={() =>
                  dispatchCollectionsMenuState({
                    type: "paginate search",
                  })
                }
              />
            )}
          </>
        ))
      ) : (
        <>
          <p className="text-center font-bold text-lg">{t("No items found")}.</p>
          <div className="flex justify-center items-center">
            <Image
              src={searchNotFound}
              layout="fixed"
              objectFit="contain"
              // width={300}
              // height={300}
            />
          </div>
        </>
      )}
      {collectionMenuItemList.length > 0 && collectionsIsLoading && (
        <div className="flex h-[10rem] justify-center">
          <ScrollToLoadLoader />
        </div>
      )}
    </div>
  );
};

export default CollectionSearchPage;
