import { useEffect, useState } from "react";
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from "next/router";

// style
import classes from "./SearchCatalogue.module.scss";

// icons
import { SearchIcon } from "@heroicons/react/outline";

// components
import LazyLoad from "react-lazyload";
import { Loader } from "@/components/loader/Loader";
import { CataloguePagination } from "@/components/cataloguePagination/CataloguePagination";

//Component
import ItemCollection from "@/components/collection/ItemCollection";
import EmptyState from "@/components/empty/EmptyState";

function SearchCatalogue(props) {
  const {
    itemListing,
    getProductList,
    isPageLoading,
    total,
    totalPages,
    nextToken,
    limit,
    selectedPage,
    searchKeyword,
    setSearchKeyword,
    isQLEggs,
  } = props;
  let router = useRouter();
  const [searchState, setSearchState] = useState({ pageNum: 0, keyword: "" });
  const { t } = useTranslation('common');

  const handleOnSearch = async (keyword) => {
    setSearchKeyword(keyword);

    let searchKeyword = keyword;

    if (keyword.length > 0 && keyword) {
      searchKeyword = keyword.toLowerCase();
    }
    handleSearchKeyword(1, searchKeyword);
  };

  // if (isPageLoading) {
  //   return <Loader />;
  // }

  const handleChangePageFilter = (pageNum, keyword) => {
    router.push(
      {
        pathname: "/search",
        query: keyword
          ? { page: pageNum, keyword: keyword }
          : { page: pageNum },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleSearchKeyword = (pageNum, keyword) => {
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setSearchState({ pageNum: pageNum, keyword: keyword });
  };

  const handleSelectPage = (pageNum) => {
    handleChangePageFilter(pageNum, searchKeyword);
  };

  const handleBackButton = () => {
    if (selectedPage > 1) {
      handleChangePageFilter(selectedPage - 1, searchKeyword);
    }
  };

  const handleForwardButton = () => {
    if (selectedPage < totalPages) {
      handleChangePageFilter(selectedPage + 1, searchKeyword);
    }
  };

  //useDebounce for search input, prevent unresponsive input when searching for keywords (add delay of 0.3s for every onChange event)
  useEffect(() => {
    if (searchState.pageNum === 1) {
      const handler = setTimeout(() => {
        router.push(
          {
            pathname: "/search",
            query: searchState.keyword
              ? { page: searchState.pageNum, keyword: searchState.keyword }
              : { page: searchState.pageNum },
          },
          undefined,
          { shallow: true }
        );
      }, 300);
      return () => {
        clearTimeout(handler);
      };
    }
  }, [searchState.keyword, searchState.pageNum]);

  return (
    <div className="pt-5 w-full">
      <div className="w-full">
        <div className="mt-2.5 mb-5 flex h-12 w-full flex-row space-x-1">
          <input
            className="w-full py-1 px-4 bg-white outline-none border rounded-md"
            onChange={(e) => handleOnSearch(e.target.value)}
            value={searchKeyword}
            placeholder={t("Search")}
          />
          <button
            className="text-white bg-primary inline-flex items-center justify-center hover:bg-primary-dark rounded-md h-12 w-12 p-2"
            aria-label="search"
          >
            <SearchIcon width={"80%"} height={"80%"} />
          </button>
        </div>

        {isPageLoading ? (
          <Loader />
        ) : (
          <div className="w-full ">
            {searchKeyword !== "" && (
              <div className="mt-2.5 mb-5 bg-gray-100 border rounded-md p-2">
                <span> {t('Search result for')} {`"${searchKeyword}"`}</span>
              </div>
            )}
            <div className={classes["category-title"]}>
              {searchKeyword !== "" ? t('Search result') : t('Popular Products')}{" "}
              <span> ({total})</span>
            </div>
            <div className="w-full ">
              {!isPageLoading && itemListing.length === 0 && (
                <EmptyState title={t("Oops, no products available")} />
              )}
              <LazyLoad height={100} offset={8}>
                <ItemCollection itemListing={itemListing} isQLEggs={isQLEggs} />
              </LazyLoad>
            </div>
            {totalPages > 0 && (
              <CataloguePagination
                totalPages={totalPages}
                selectedPage={selectedPage}
                handleSelectPage={handleSelectPage}
                handleBackButton={handleBackButton}
                handleForwardButton={handleForwardButton}
                limit={limit}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchCatalogue;
