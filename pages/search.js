import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

// component
import SearchCatalogue from "@/components/catalogue/SearchCatalogue";
import SEO from "@/components/seo/SEO";

// API
import { API, graphqlOperation } from "aws-amplify";
import {
  listItemsByCollection,
  customerSearchProducts,
} from "@/graphql/queries";

// hooks
import { generateAdwordPayload } from "@/apis/anaytics";

//constants
import { StoreTypes } from "@/enums/enums";

// utils
import { isEmpty, totalPagination, isQLEggs } from "@/utils/util.js";

import _ from "lodash";
import Cookies from "universal-cookie";

// contexts
import useMultiStoreDelivery from "@/components/AxrailCommerce/MultiStoreDeliverySelector/hooks/useMultiStoreDelivery";
import MerchantContext from "@/contexts/MerchantContext";
import { useOrder } from "@/contexts/OrderContext";

function SearchCatalogueScreen(props) {
  const merchantInfoContext = useContext(MerchantContext);

  const cookie = new Cookies();
  const [totalItem, setTotalItem] = useState("");
  const router = useRouter();
  const INIT_NEXT_TOKEN = 0;
  const [total, setTotal] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const sortField = {
    field: "updatedAt",
    direction: "desc",
  };
  const [itemListing, setItemListing] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState();
  const LIMIT = 20;
  const TOTAL_PAGES = totalPagination(total, LIMIT);
  const { orderType } = useOrder();
  const { deliveryMode } = useMultiStoreDelivery();

  const IS_QL_EGGS = Boolean(isQLEggs(merchantInfoContext.domain));

  let tempProductList = [];
  let tempProductURL = [];

  // Get Total Product
  const getProductList = async (
    nextToken = INIT_NEXT_TOKEN,
    searchKeyword = ""
  ) => {
    setIsPageLoading(true);
    let seoUrl = "collection/recommended-for-you";
    try {
      let result = null;
      let tmpList = [];

      const searchFilterObj = [
        {
          salesChannelName: {
            eq: "Online Store",
          },
        },
        { isDisabled: { eq: false } },
        {
          itemTitle: { matchPhrasePrefix: searchKeyword },
        },
      ];

      const searchParams = searchKeyword
        ? searchFilterObj
        : _.filter(searchFilterObj, (item) => {
            return !item.itemTitle;
          });

      let params = {
        limit: LIMIT,
        nextToken: nextToken,
        sort: sortField,
        filter: {
          and: [
            {
              merchantId: { eq: merchantInfoContext.merchantId },
            },
            ...searchParams,
          ],
        },
        merchantId: merchantInfoContext.merchantId,
        storeId:
          merchantInfoContext.storeType === StoreTypes.MULTISTORE_STORETYPE
            ? JSON.parse(localStorage.getItem("fam@storeSelection"))
              ? deliveryMode === "delivery"
                ? JSON.parse(localStorage.getItem("fam@storeSelection"))
                    .deliveryStoreData.selectedStoreId
                : JSON.parse(localStorage.getItem("fam@storeSelection"))
                    .pickupStoreData.storeId
              : merchantInfoContext.storeId
            : merchantInfoContext.storeId,
      };
      if (merchantInfoContext.storeType === StoreTypes.MULTISTORE_STORETYPE) {
        params["orderType"] = deliveryMode;
      } else if (merchantInfoContext.storeType === StoreTypes.AC_STORETYPE) {
        params["orderType"] = orderType === "Delivery" ? "delivery" : "pickup";
      }
      const { data } = await API.graphql(
        graphqlOperation(customerSearchProducts, params)
      );

      if (data.customerSearchProducts.status === "true") {
        tmpList = data.customerSearchProducts.items;
      }
      setItemListing(tmpList);
      setTotal(data.customerSearchProducts.total ?? 0);
      setIsPageLoading(false);
    } catch (error) {
      console.log("err", error);
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const page = router.query.page ? parseInt(router.query.page) : 1;
    const searchKeyword = router.query.keyword ?? "";

    setSelectedPage(page);
    setSearchKeyword(searchKeyword);
    getProductList((page - 1) * LIMIT, searchKeyword);
    generateAdwordPayload("/products", "", merchantInfoContext.merchantId);
  }, [router.query, deliveryMode]);

  return (
    <>
      <SEO title="Search" keywords="" description="Search for items" />
      <div className="max-w-6xl m-auto w-full p-2">
        <SearchCatalogue
          itemListing={itemListing}
          getProductList={getProductList}
          isPageLoading={isPageLoading}
          total={total}
          totalPages={TOTAL_PAGES}
          nextToken={INIT_NEXT_TOKEN}
          limit={LIMIT}
          selectedPage={selectedPage}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          isQLEggs={IS_QL_EGGS}
        />
      </div>
    </>
  );
}

export default SearchCatalogueScreen;
