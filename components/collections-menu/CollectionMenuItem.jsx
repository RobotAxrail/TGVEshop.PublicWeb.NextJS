import Image from "next/image";
import Chip from "../chip/Chip";
import PriceWithCurrency from "../priceWithCurrency/PriceWithCurrency";
import AspectRatioSquareContainer from "../shared/AspectRatioSquareContainer";
import classes from "./CollectionsMenu.module.scss";
import { useOrder } from "@/contexts/OrderContext";

const CollectionMenuItem = ({
  seoUrl,
  title,
  image,
  price,
  hasStock,
  setProductModifierModalState,
  index,
  itemId,
  collectionsMenuState,
}) => {
  const { orderType } = useOrder();
  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        setProductModifierModalState({ visible: true, seoUrl: seoUrl });
        window.dataLayer.push({
          event: "productClicked",
          orderType: orderType,
          productId: itemId,
          productTitle: title,
          collectionId: collectionsMenuState.homeCollectionId,
          collectionTitle: collectionsMenuState.title,
        });
      }}
    >
      <div>
        <AspectRatioSquareContainer rounded="xl">
          <Image
            className={[!hasStock ? "grayscale rounded-lg" : "rounded-lg"].join(
              " "
            )}
            src={process.env.BUCKET_URL + image}
            title={title}
            alt={title}
            layout="fill"
            objectFit="cover"
            priority={index < 20}
          />
        </AspectRatioSquareContainer>
      </div>

      {!hasStock && (
        <Chip className="absolute mt-2 ml-2" label={"Out Of Stock"} />
      )}
      <div className="flex-col justify-center text-center">
        <h2
          className={[
            classes["max-2-row"],
            "text-[0.87rem] sm:text-base font-semibold",
          ].join(" ")}
        >
          {title}
        </h2>
        <PriceWithCurrency value={price} />
      </div>
    </div>
  );
};

export default CollectionMenuItem;
