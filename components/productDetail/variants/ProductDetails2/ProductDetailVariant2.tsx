import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MerchantContext from "@/contexts/MerchantContext";
import QuantityMutator2 from "./QuantityMutator2";
import VariantSelector2 from "./VariantSelector2";
import PriceSection2 from "./PriceSection2";
import { useContext } from "react";
import _ from "lodash";
import {
  faFacebook,
  faWhatsapp,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import useTranslation from "next-translate/useTranslation";

// productDetail.description
export default function ProductDetailVariant2({
  _generateVariantStructure,
  selectedProductUOMObject,
  setSelectedQuantity,
  selectedVariantMap,
  carouselImageIndex,
  onVariantSelected,
  selectedQuantity,
  onAddCartItem,
  productDetail,
  productImage,
  currentUrl,
  isLoading,
  title,
  video,
}: any) {
  const context = useContext(MerchantContext);
  const bucketLink = process.env.BUCKET_URL;
  const { t } = useTranslation("common");

  const socialMediaShare = [
    {
      link: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
      icon: faFacebook,
      id: 0,
    },
    {
      link: `https://telegram.me/share/url?url=${currentUrl}&text=${title}`,
      icon: faTelegram,
      id: 1,
    },
    {
      link: `https://api.whatsapp.com/send?text=${title} ${currentUrl}`,
      icon: faWhatsapp,
      id: 2,
    },
  ];

  const displayProductImage = () => {
    return selectedProductUOMObject?.image[0] || productImage[0];
  };

  return (
    <div className="w-full grid grid-cols-12 gap-4 p-4 md:py-20">
      <div className="col-span-12 md:col-span-6">
        <img
          className="object-cover rounded-lg w-full" // aspect-[4/5]
          src={`${bucketLink}${video ? video : displayProductImage()}`}
          alt="productImage"
        />
      </div>
      <div className="col-span-12 md:col-span-6">
        <div className="grid grid-cols-12 gap-2">
          <div
            style={{ font: "normal normal medium 16px/21px Playfair Display" }}
            className="col-span-12 text-lg font-playFair"
          >
            {context?.name}
          </div>
          <div
            className="col-span-12 text-2xl font-playFair"
            style={{
              font: "normal normal medium 20px/27px Playfair Display",
            }}
          >
            {productDetail?.title}
          </div>

          <div className="col-span-12 text-xl">
            <PriceSection2
              selectedProductUOMObject={selectedProductUOMObject}
              productDetail={productDetail}
            />
          </div>
          <div className="col-span-12">
            <Divider />
          </div>
          <div className="col-span-12 text-sm">
            <div
              dangerouslySetInnerHTML={{ __html: productDetail?.description }}
            />
          </div>
          <div className="col-span-12 grid gap-4 grid-cols-1 mt-5">
            <div className="flex flex-row text-sm gap-2">
              <div className="mt-0.5">{t("Share")}:</div>
              {socialMediaShare.map(({ link, icon, id }) => (
                <a
                  rel="noopener noreferrer"
                  className="no-underline"
                  target="_blank"
                  href={link}
                  key={id}
                >
                  <FontAwesomeIcon
                    className={"text-primary text-[25px] pl-1"}
                    icon={icon}
                  />
                </a>
              ))}
            </div>
            <VariantSelector2
              defaultVariantStructure={_generateVariantStructure(productDetail)}
              productUOMs={productDetail?.productUOMs}
              onVariantSelected={onVariantSelected}
              variantMap={selectedVariantMap}
              checkOosOption={() => false}
            />
            <QuantityMutator2 onNumberChange={setSelectedQuantity} max={10} />
            <button
              onClick={() => onAddCartItem(selectedQuantity)}
              className="bg-primary py-3 px-4 w-full rounded"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : t("Add To Cart")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  const { t } = useTranslation("common");
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="mr-2 w-5 h-5 text-white animate-spin dark:text-gray-600 fill-primary"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">{t("Loading")}...</span>
    </div>
  );
}

export function Divider() {
  return (
    <hr
      style={{ height: "1.5px", border: "none" }}
      className="w-full bg-primary"
    />
  );
}
