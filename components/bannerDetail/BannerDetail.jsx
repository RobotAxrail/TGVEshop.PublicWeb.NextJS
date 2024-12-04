import { useRouter } from "next/router";

// components
import { NormalImage } from '@/components/image/CustomImage';
import { ContainedButton } from "@/components/buttons/Buttons";

// style
import classes from "./BannerDetail.module.scss";

const BannerDetail = (props) => {
  const { itemData } = props;
  const router = useRouter();

  const onButtonClick = () => {
    if (itemData.buttonAction === "url" || itemData.buttonAction === "link") {
      window.open(`${itemData.buttonActionValue}`, "_blank");
    } else {
      router.push({
        pathname: `/${itemData.buttonActionValue}`,
      });
    }
  };

  if (!itemData) return <></>;

  const buttonNotExists = !itemData.buttonTitle;
  const image = process.env.BUCKET_URL + itemData.detailPageImage;
  
  return (
    <div>
      <NormalImage src={image} alt="banner" />
      {!!itemData.discount && (
        <div className='w-max top-10 left-2 text-white bg-[orange] rounded-[2rem] py-2 px-4'>
          {itemData.discount} discount
        </div>
      )}

      <div className={classes["details-card"]}>
        <div
          className={
            buttonNotExists
              ? classes["details-no-button"]
              : classes["details-button"]
          }
        >
          <div className={classes["title_container"]}>
            <h2 className={[classes["card-header-text"], "inline"].join(" ")}>
              {itemData.title}
            </h2>
          </div>
          <div>
            {itemData.price && <p classNamw="inline m-0">{itemData.price}</p>}
            {!!itemData.priceBefore && (
              <p className="inline text-primary m-0">{itemData.priceBefore}</p>
            )}
          </div>
          <div className="pt-0 text-secondaryText">
            <div dangerouslySetInnerHTML={{ __html: itemData.description }} />
          </div>
        </div>
        {buttonNotExists ? null : (
          <div className="flex justify-center">
            <ContainedButton
              className={[classes["nav_button"], "w-full"].join(" ")}
              onClick={onButtonClick}
            >
              {itemData.buttonTitle}
            </ContainedButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerDetail;
