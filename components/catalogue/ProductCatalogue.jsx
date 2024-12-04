import { useState } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

// style
import classes from "./ProductCatalogue.module.scss";

// components
import LazyLoad from "react-lazyload";
import ItemCollection from "@/components/collection/ItemCollection";
import { Loader } from "@/components/loader/Loader";
import EmptyState from "@/components/empty/EmptyState";
import { CataloguePagination } from "@/components/cataloguePagination/CataloguePagination";

function ProductCatalogue(props) {
  let router = useRouter();
  const {
    isLoading,
    sortSelected,
    itemListing,
    totalItem,
    total,
    seoUrl,
    title,
    getProductList,
    nextToken,
    totalPages,
    selectedPage,
    isQLEggs,
    limit,
  } = props;
  const { t } = useTranslation("common");

  const handleChangePageFilter = (value, pageNum) => {
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    router.push({
      pathname: `/${seoUrl}`,
      search: `?sort_by=${value}&page=${pageNum}`,
    });
  };

  const handleSelectPage = (pageNum) => {
    handleChangePageFilter(sortSelected, pageNum);
  };

  const handleBackButton = () => {
    if (selectedPage > 1) {
      handleChangePageFilter(sortSelected, selectedPage - 1);
    }
  };

  const handleForwardButton = () => {
    if (selectedPage < totalPages) {
      handleChangePageFilter(sortSelected, selectedPage + 1);
    }
  };

  return (
    <div>
      <div className="right-node">
        {!isLoading ? (
          <>
            <div className="flex flex-col xs:flex-row justify-between xs:items-center">
              {itemListing.length !== 0 && (
                <>
                  <div className={classes["category-title"]}>
                    {title} <span className="text-[#d8d8d8]"> ({total})</span>
                  </div>
                  <div className={classes.sort}>
                    <span className="font-semibold mr-2.5">{t("Sort")}:</span>
                    <div className="relative inline-flex justify-center">
                      <select
                        className={[
                          classes["sort-select"],
                          "text-[12px] block appearance-none w-full cursor-pointer bg-gray-200 border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
                        ].join(" ")}
                        aria-label="Default select example"
                        value={sortSelected}
                        onChange={(e) =>
                          handleChangePageFilter(e.target.value, 1)
                        }
                      >
                        <option value={""} disabled>
                          {t("Sort By")}
                        </option>
                        <option value="title-asc">{t("Title A-Z")}</option>
                        <option value="title-desc">{t("Title Z-A")}</option>
                        <option value="price-asc">{t("Price low to high")}</option>
                        <option value="price-desc">{t("Price high to low")}</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div>
              {!isLoading && itemListing.length === 0 && (
                <EmptyState title={t("Oops no products available")} />
              )}
              <LazyLoad height={100} offset={8}>
                <ItemCollection itemListing={itemListing} isQLEggs={isQLEggs} />
              </LazyLoad>
            </div>
          </>
        ) : (
          <Loader divHeight="h-[480px]" />
        )}
      </div>
      {totalPages > 0 && (
        <CataloguePagination
          totalPages={totalPages}
          selectedPage={selectedPage}
          handleSelectPage={handleSelectPage}
          handleBackButton={handleBackButton}
          handleForwardButton={handleForwardButton}
          fetchList={getProductList}
          limit={limit}
        />
      )}
    </div>
  );
}

export default ProductCatalogue;
