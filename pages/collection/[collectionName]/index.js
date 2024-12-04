import { useState, useEffect, useContext } from "react";
import { FaArrowLeft } from "react-icons/fa/index";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

// component
import ProductCatalogue from "@/components/catalogue/ProductCatalogue";
import SEO from "@/components/seo/SEO";

// Mock Data
import { mockGraphQLAPI as API } from './mockCollectionData';
const graphqlOperation = (query, params) => params;

import Cookies from "universal-cookie";

// contexts
import useMultiStoreDelivery from "@/components/AxrailCommerce/MultiStoreDeliverySelector/hooks/useMultiStoreDelivery";
import MerchantContext from "@/contexts/MerchantContext";
import { useOrder } from "@/contexts/OrderContext";
// utils
import { totalPagination, isLocalHost, isQLEggs } from "@/utils/util.js";

//constants
import { StoreTypes } from "@/enums/enums";

// split the sort_by in url to sort API param format
const handleFilterURL = (value) => {
  value = value.split("-");
  let field = value[0];
  if (value[0] == "price") {
    field = "deliveryPrice";
  } else if (value[0] === "date") {
    field = "updatedAt";
  }
  return { field: field, direction: value[1] };
};

function ProductCatalogueScreen() {
  const merchantInfoContext = useContext(MerchantContext);

  const cookie = new Cookies();
  let router = useRouter();

  const [sortSelected, setSortSelected] = useState("title-asc");
  const [selectedPage, setSelectedPage] = useState(1);
  const [totalItem, setTotalItem] = useState("");
  const [nextToken, setNextToken] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [itemListing, setItemListing] = useState([]);
  const [title, setTitle] = useState("");
  let tempProductList = [];
  const LIMIT = 20;
  const TOTAL_PAGES = totalPagination(total, LIMIT);
  const IS_QL_EGGS = Boolean(isQLEggs(merchantInfoContext?.domain));
  const { orderType } = useOrder();
  const { deliveryMode } = useMultiStoreDelivery();
  const { t } = useTranslation("common");

  // Get Total Product
  const getProductList = async (
    nextToken = 0,
    sort = handleFilterURL(sortSelected),
    getFromStart = false
  ) => {
    setIsLoading(true);
    const list = [];
    try {
      var params = {
        seoUrl: "collection/" + router.query.collectionName,
        storeId: merchantInfoContext?.storeId,
        nextToken: nextToken,
        limit: LIMIT,
        filter: {},
        sort: sort,
      };

      if (merchantInfoContext?.storeType === StoreTypes.MULTISTORE_STORETYPE)
        params["orderType"] = deliveryMode;
      else if (merchantInfoContext?.storeType === StoreTypes.AC_STORETYPE)
        params["orderType"] = orderType === "Delivery" ? "delivery" : "pickup";
      if (isLocalHost()) params["merchantId"] = merchantInfoContext?.merchantId;

      let res = await API.graphql(
        graphqlOperation(null, params)
      );

      if (res.data.listItemsByCollection.status === "true") {
        let data = res.data.listItemsByCollection.items.length;
        setTotalItem(data);
        if (getFromStart) {
          setItemListing(res.data.listItemsByCollection.items);
        } else {
          res.data.listItemsByCollection.items.forEach((product) => {
            if (!tempProductList.includes(product.itemId)) {
              tempProductList.push(product.itemId);
              list.push(product);
            }
          });
          setItemListing(list);
        }
        setTitle(res.data.listItemsByCollection.productCollectionName);
        setTotal(res.data.listItemsByCollection.total);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const sort = router.query.sort_by;
    const page = router.query.page ? parseInt(router.query.page) : 1;
    if (sort) {
      setSortSelected(sort);
      setSelectedPage(page);
      getProductList((page - 1) * LIMIT, handleFilterURL(sort));
    } else {
      setSortSelected("title-asc");
      setSelectedPage(page);
      getProductList((page - 1) * LIMIT, handleFilterURL("title-asc"), true);
    }
  }, [router.query]);

  return (
    <>
      <SEO title={title} keywords="" description="collection" />
      <div className="max-w-6xl m-auto w-full py-4 p-2">
        <button
          className="mr-auto px-2 py-1 hover:bg-white min-h-4 min-w-5 rounded-md flex items-center"
          onClick={() => router.back()}
        >
          <FaArrowLeft />
          <div className="ml-1">{t("go-back")}</div>
        </button>
      </div>
      <div className="max-w-6xl m-auto p-2 w-full">
        <ProductCatalogue
          className="w-full"
          isLoading={isLoading}
          sortSelected={sortSelected}
          itemListing={itemListing}
          totalItem={totalItem}
          total={total}
          seoUrl={"collection/" + router.query.collectionName}
          title={title}
          getProductList={getProductList}
          nextToken={nextToken}
          setNextToken={setNextToken}
          totalPages={TOTAL_PAGES}
          limit={LIMIT}
          selectedPage={selectedPage}
          isQLEggs={IS_QL_EGGS}
        />
      </div>
    </>
  );
}

export default ProductCatalogueScreen;