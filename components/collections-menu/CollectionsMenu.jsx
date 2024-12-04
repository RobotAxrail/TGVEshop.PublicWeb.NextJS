import { useState, useEffect } from "react";
import CollectionMenuItem from "./CollectionMenuItem";
import CollectionMenuSidebar from "./CollectionMenuSidebar";
import classes from "./CollectionsMenu.module.scss";
import { useRouter } from "next/router";
import useTranslation from 'next-translate/useTranslation';

// icons
import { SearchIcon, ChevronLeftIcon } from "@heroicons/react/outline";
import CollectionSearchPage from "./CollectionSearchPage";
import { Transition } from "@headlessui/react";
import { Waypoint } from "react-waypoint";
import ProductModifierModal from "../productDetail/ProductModifier/ProductModifierModal";
import ScrollToLoadLoader from "../scrollToLoad/ScrollToLoadLoader";
import { LoadingIcon } from "@/components/icons/Icons";
import { useOrder } from "@/contexts/OrderContext";

const CollectionsMenu = ({
  collectionMenuItemList,
  totalCollectionMenuItemList,
  searchedCollectionMenuItemList,
  sideBarMenuList,
  collectionsMenuState,
  dispatchCollectionsMenuState,
  limit,
  handleAddItemToCart,
  addToCartIsLoading,
  productModifierModalState,
  setProductModifierModalState,
  selectedProductDetail,
  setSelectedProductDetail,
  productDetailStatus,
  setProductDetailStatus,
  collectionsIsLoading,
  isInCart,
  currentCartId,
  findInCart,
  setIsInCart,
}) => {
  const { t } = useTranslation("common");
  const { orderType } = useOrder();
  const router = useRouter();
  const [showSearchPage, setShowSearchPage] = useState(false);

  const [productModifiersQuantity, setProductModifiersQuantity] = useState(1);

  const handleOnSubmitModifierModal = async (modifierGroupsState) => {
    const resData = await handleAddItemToCart(
      modifierGroupsState.quantity,
      modifierGroupsState.selectedModifierGroups
    );

    return resData;
  };

  useEffect(() => {
    const query = router.query;
    if (query.type && query.type === "search") {
      setShowSearchPage(true);
    } else {
      setShowSearchPage(false);
    }
  }, [router]);

  return (
    <>
      <div
        className={`bg-white p-3 mb-1 flex w-full gap-5 z-10 items-center ${
          showSearchPage ? "mb-10 sm:static sm:mb-0 drop-shadow-xl" : ""
        }`}
      >
        {showSearchPage && (
          <div
            className=""
            onClick={() => {
              setShowSearchPage(false);
              dispatchCollectionsMenuState({
                type: "search",
                searchKeyword: "",
              });
            }}
          >
            <ChevronLeftIcon className="w-8 h-8 text-gray-500 cursor-pointer" />
          </div>
        )}
        <div className="flex h-10 rounded-[8rem] overflow-hidden w-full relative">
          <SearchIcon className="w-5 h-5 text-gray-500 absolute left-5 top-[22%]" />
          <input
            className={[
              "w-full bg-gray-100 py-[5px] px-[3rem] outline-none placeholder:text-[15px]",
              collectionsMenuState.searchKeyword
                ? "font-normal"
                : "font-medium",
            ].join(" ")}
            onChange={(e) => {
              dispatchCollectionsMenuState({
                type: "search",
                searchKeyword: e.target.value,
              });
            }}
            onFocus={() => setShowSearchPage(true)}
            value={collectionsMenuState.searchKeyword}
            placeholder={t("Search by item name")}
          />
        </div>
      </div>
      <div className="flex sm:static h-[calc(var(--app-height)_-_8.5rem)] w-full gap-1 text-sm sm:text-base">
        {!showSearchPage ? (
          <>
            <div
              className={[
                classes["no-scrollbar"],
                "h-inherit flex-[0.3] bg-white w-full border-r overflow-y-scroll",
              ].join(" ")}
            >
              <CollectionMenuSidebar
                sideBarMenuList={sideBarMenuList}
                collectionsMenuState={collectionsMenuState}
                dispatchCollectionsMenuState={dispatchCollectionsMenuState}
              />
            </div>
            <div
              className={[
                classes["no-scrollbar"],
                "h-inherit flex-1 w-full bg-white pt-5 px-3 overflow-y-scroll",
              ].join(" ")}
            >
              {collectionsMenuState.nextToken === 0 && collectionsIsLoading ? (
                <div className="h-[25rem] flex justify-center items-center">
                  <LoadingIcon color="text-primary" width="w-7" height="h-7" />
                </div>
              ) : (
                <>
                  <h3 className="mt-0 mb-6 text-[1.2rem] text-gray-800">
                    {collectionsMenuState?.title}
                  </h3>
                  <div
                    className={
                      "grid grid-cols-2 gap-x-[0.4rem] gap-y-[1.5rem] sm:grid-cols-4 sm:gap-x-[2rem] sm:gap-y-[4rem]"
                    }
                  >
                    {collectionMenuItemList.map((menuItem, index) => (
                      <div key={menuItem.itemId}>
                        <CollectionMenuItem
                          collectionsMenuState={collectionsMenuState}
                          index={index}
                          itemId={menuItem.itemId}
                          seoUrl={menuItem.seoUrl}
                          title={menuItem.title}
                          image={menuItem.image?.[0]}
                          price={
                            menuItem?.deliveryPriceWithTax
                              ? menuItem?.deliveryPriceWithTax
                              : menuItem?.deliveryPrice
                          }
                          hasStock={menuItem.hasStock}
                          setProductModifierModalState={
                            setProductModifierModalState
                          }
                        />

                        {index === collectionMenuItemList.length - 10 &&
                          totalCollectionMenuItemList >
                            collectionMenuItemList.length && (
                            <Waypoint
                              onEnter={() => {
                                dispatchCollectionsMenuState({
                                  type: "paginate collection",
                                });
                              }}
                            />
                          )}
                      </div>
                    ))}
                  </div>
                  <div className="flex h-[10rem] justify-center">
                    {collectionsMenuState.nextToken !== "0" &&
                      collectionsIsLoading && <ScrollToLoadLoader />}
                  </div>
                </>
              )}

              {/* <h1 className="h-[20rem]">testing 123</h1> */}
            </div>
          </>
        ) : (
          <Transition
            appear
            className={[
              "w-full h-[inherit] p-5 bg-white overflow-y-scroll",
              classes["no-scrollbar"],
            ].join(" ")}
            show={showSearchPage}
            enter="transition-opacity duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
          >
            <CollectionSearchPage
              collectionMenuItemList={
                collectionsMenuState?.searchKeyword
                  ? collectionMenuItemList
                  : []
              }
              limit={limit}
              dispatchCollectionsMenuState={dispatchCollectionsMenuState}
              setProductModifierModalState={setProductModifierModalState}
              collectionsIsLoading={collectionsIsLoading}
            />
          </Transition>
        )}
      </div>
      <ProductModifierModal
        showModal={productModifierModalState.visible}
        handleCloseModal={() => {
          setProductDetailStatus("none");
          setSelectedProductDetail({});
          setProductModifierModalState({ visible: false, seoUrl: "" });
        }}
        productOriginalPrice={
          selectedProductDetail?.productUOMs?.[0].deliveryPriceWithTax
            ? selectedProductDetail?.productUOMs?.[0].deliveryPriceWithTax
            : selectedProductDetail?.productUOMs?.[0].deliveryPrice
        }
        initialModifierGroups={selectedProductDetail?.modifierGroups}
        quantity={productModifiersQuantity}
        item={selectedProductDetail}
        itemStatus={productDetailStatus}
        outOfStock={
          selectedProductDetail?.productUOMs?.[0].quantityForSales <= 0
        }
        handleOnSubmit={handleOnSubmitModifierModal}
        submitIsLoading={addToCartIsLoading}
        clearFormOnClose={true}
        isCollection={true}
        currentCartId={currentCartId}
        findInCart={findInCart}
        isInCart={isInCart}
        setIsInCart={setIsInCart}
      />
    </>
  );
};

export default CollectionsMenu;
