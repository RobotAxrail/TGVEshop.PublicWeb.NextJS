import React, { useState, useEffect, useContext } from "react";
import Items from "./Items";
import voucher1 from "../../public/assets/mock-images/vouchers/voucher1.svg";
import voucher2 from "../../public/assets/mock-images/vouchers/voucher2.svg";
import voucher3 from "../../public/assets/mock-images/vouchers/voucher3.svg";
import { MdNavigateNext } from "react-icons/md";
import { useRouter } from "next/router";

import {
  getLandingPageBannerCache,
  getShopByCategoryCache,
  getHomeScreenCollectionCache,
  getFeaturedHomeCollectionCache,
} from "@/graphql/queries";
import MerchantContext from "@/contexts/MerchantContext";
import { API, graphqlOperation } from "aws-amplify";
import Cookies from "universal-cookie";

interface getHomeScreen{
  data: {
    getHomeScreenCollectionCache: {
      collectionsAndItems: any[];
    };
  };
}

const Collections = ({ searchQuery }) => {
  const router = useRouter();
  const merchantInfoContext = useContext(MerchantContext);
  const [isDesktop, setIsDesktop] = useState(false); // To detect screen size
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [collectionList, setCollectionList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [homeScreenCollections, setHomeScreenCollections] = useState({
    data: {
      getHomeScreenCollectionCache: {
        collectionsAndItems: [],
      },
    },
  });
  const cookie = new Cookies();
  const getHomeScreenCollectionCacheList = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = {
        merchantId: merchantInfoContext.merchantId,
        orderType: merchantInfoContext.orderOption[1].toLocaleLowerCase(),
        storeId: merchantInfoContext.storeId,
      };

      const { data } = (await API.graphql(
        graphqlOperation(getHomeScreenCollectionCache, params)
      ) as getHomeScreen);

      // Keep the data structure consistent
      setHomeScreenCollections({ data });

      const collections =
        data.getHomeScreenCollectionCache?.collectionsAndItems || [];
      setCollectionList(collections);

      const uniqueCategories = [
        ...new Set(
          collections.map((collection) => collection.homeCollectionTitle)
        ),
      ];
      setCategories(uniqueCategories);
      setSelectedCategory(uniqueCategories[0] || "");
    } catch (err) {
      console.error("Error fetching collections:", err);
      setError("Failed to fetch collections.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (merchantInfoContext) {
      getHomeScreenCollectionCacheList();
    }
  }, [merchantInfoContext]);

  // Extract unique categories from mock data

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSeeAll = (collection) => {
    router.push(`/eshop/${collection}`); // Navigate to /eshop
  };

  // Check for desktop screen size
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // Tailwind `md` breakpoint
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!merchantInfoContext || 
        !homeScreenCollections?.data?.getHomeScreenCollectionCache?.collectionsAndItems?.length) {
      return;
    }
    getHomeScreenCollectionCacheList();
  }, [merchantInfoContext]);

  const filteredCollections = homeScreenCollections?.data?.getHomeScreenCollectionCache?.collectionsAndItems?.length 
  ? homeScreenCollections.data.getHomeScreenCollectionCache.collectionsAndItems
      .filter((collection) =>
        // Only apply category filter if in desktop mode and a category is selected
        isDesktop
          ? !selectedCategory ||
            collection.homeCollectionTitle === selectedCategory
          : true
      )
      .map((collection) => ({
        ...collection,
        items: collection.items.filter((item) =>
          searchQuery
            ? item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (item.description?.toLowerCase() || "").includes(
                searchQuery.toLowerCase()
              )
            : true
        ),
      }))
      .filter((collection) => collection.items.length > 0) : [];

  const LoadingSkeleton = () => (
    <div className="flex flex-col gap-6">
      {/* Category Skeleton - Only for Desktop */}
      {isDesktop && (
        <div className="flex gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 w-24 bg-gray-600 rounded animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Collections Skeleton */}
      {[1, 2, 3].map((section) => (
        <div key={section} className="flex flex-col gap-4">
          {/* Title and See All Skeleton */}
          {!isDesktop && (
            <div className="flex justify-between items-center">
              <div className="h-6 w-32 bg-gray-600 rounded animate-pulse" />
              <div className="h-4 w-16 bg-gray-600 rounded animate-pulse" />
            </div>
          )}

          {/* Items Row Skeleton */}
          <div
            className="flex gap-3 overflow-x-auto no-scrollbar"
            style={{
              display: "flex",
              gap: "12px",
              overflowX: "auto",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE 10+
            }}
          >
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="min-w-[160px] flex-shrink-0 animate-pulse"
              >
                <div className="w-full h-[160px] bg-gray-600 rounded-[12px] mb-2" />
                <div className="h-4 w-3/4 bg-gray-600 rounded mb-2" />
                <div className="h-4 w-1/2 bg-gray-600 rounded" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  if (isLoading) {
    return <LoadingSkeleton />;
  }
  return (
    <div className="flex flex-col gap-6">
      {/* Category Selector - Only for Desktop */}
      {isDesktop && (
        <div className="flex gap-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 ${
                selectedCategory === category
                  ? "border-b-2 border-red-500 font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Filtered Collections */}
      {filteredCollections.length === 0 ? (
        <div className="text-center py-4 text-gray-400">No items found</div>
      ) : (
        filteredCollections.map((collection) => (
          <div key={collection.homeCollectionTitle}>
            {!isDesktop && (
              <div className="flex justify-between">
                <h2 className="mb-4 font-medium text-[16px]">
                  {collection.homeCollectionTitle}
                </h2>
                <p
                  className="text-[#FF0013] font-normal text-[12px]"
                  onClick={() =>
                    handleSeeAll(collection.productCollectionSeoUrl)
                  }
                >
                  See all <MdNavigateNext />
                </p>
              </div>
            )}
            <div
              className="flex gap-3 overflow-x-auto no-scrollbar"
              style={{
                display: "flex",
                gap: "12px",
                overflowX: "auto",
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE 10+
              }}
            >
              {collection.items.map((product) => (
                <Items
                  key={product.itemId}
                  image={process.env.BUCKET_URL + product.cover}
                  title={product.title}
                  price={product.price}
                  description={product.description}
                  itemId={product.itemId}
                  seoUrl={product.seoUrl}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Collections;
