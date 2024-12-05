import { EShopLayout } from "@/components/layouts/EShopLayout";
import MerchantContext from "@/contexts/MerchantContext";
import { useSearch } from "@/contexts/SearchContext";
import { customerSearchProducts } from "@/graphql/queries";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API, graphqlOperation } from "aws-amplify";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";

interface Filter {
  and: Array<{
    merchantId?: { eq: string };
    itemTitle?: { wildcard: string };
  }>;
}

const SearchListing = () => {
  const merchantInfoContext = useContext(MerchantContext);
  const router = useRouter();
  const { searchQuery } = useSearch();

  const { data: productData, isLoading } = useQuery({
    queryKey: ["fetch search product query", searchQuery],
    queryFn: async () => {
      let filter: Filter = {
        and: [
          {
            merchantId: { eq: merchantInfoContext.merchantId },
          },
        ],
      };
      if (searchQuery && searchQuery.trim() !== "") {
        filter.and.push({
          itemTitle: { wildcard: `*${searchQuery}*` },
        });
      }
      const params = {
        limit: 20,
        nextToken: 0,
        sort: {
          field: "updatedAt",
          direction: "desc",
        },
        filter: filter,
        merchantId: merchantInfoContext.merchantId,
        storeId: merchantInfoContext.storeId,
        orderType: "pickup",
      };
      const { data } = (await API.graphql(
        graphqlOperation(customerSearchProducts, params)
      )) as any;
      return data?.customerSearchProducts;
    },
  });

  //   useEffect(() => {
  //     queryClient.invalidateQueries({ queryKey: ["fetch search product query"] });
  //   }, [searchValue]);

  const handleBack = () => {
    router.back();
  };

  return (
    <EShopLayout>
      <div className="p-4 flex flex-col gap-5">
        <div className="flex items-center py-4">
          <GoArrowLeft
            size={16}
            onClick={handleBack}
            className="cursor-pointer"
          />
          <h2 className="text-white font-medium text-[16px] px-2 py-1">Back</h2>
        </div>

        {/* Render items */}
        {!isLoading && (
          <div className="flex flex-col gap-4">
            {productData?.items?.map((item) => (
              <div className="" key={item?.itemId}>
                <div className="flex gap-[10px]">
                  <div
                    className="w-[100px] h-[100px] relative flex-shrink-0 cursor-pointer"
                    onClick={() => router.push(`/eshop/${item.seoUrl}`)}
                  >
                    <img
                      src={process.env.BUCKET_URL + item.cover}
                      className="object-cover block rounded-[10px] w-[100px] h-[100px]"
                    />
                  </div>

                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-[6px]">
                      <h1 className="font-normal text-[14px] text-[#D4D4D4]">
                        {item?.title}
                      </h1>
                      <p className="font-medium text-[14px]">
                        RM{item?.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <div
                        className="w-[22.5px] h-[22.5px] border-[1px] border-[#FFFFFF] rounded-full flex items-center justify-center cursor-pointer"
                        // onClick={() => decrementQuantity(item.itemId)}
                      >
                        <Minus size={8.25} />
                      </div>
                      <div>0</div>
                      {/* <div>{cart![item.itemId]?.quantity || 0}</div> */}
                      <div
                        className="w-[22.5px] h-[22.5px] border-[1px] border-[#FFFFFF] rounded-full flex items-center justify-center cursor-pointer"
                        // onClick={() =>
                        //   incrementQuantity(item.itemId, item.seoUrl, item.price)
                        // }
                      >
                        <Plus size={8.25} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {isLoading && <LoaderComponent />}
      </div>
    </EShopLayout>
  );
};

const LoaderComponent = () => {
  return <>loading...</>;
};

export default SearchListing;
