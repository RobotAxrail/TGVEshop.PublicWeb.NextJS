import ProductTabPanels from "../../ProductTabPanels";
import useTranslation from "next-translate/useTranslation";

export default function DescriptionSection1({ description }) {
  const { t } = useTranslation("common");
  return (
    <>
      {description && (
        <ProductTabPanels
          title={t("Product Description")}
          productDetail={undefined}
          userReview={undefined}
          bodyContent={
            <span>
              <div
                className="break-words"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            </span>
          }
        />
      )}
    </>
  );
}
