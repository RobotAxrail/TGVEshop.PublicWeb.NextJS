import axios from "axios";

// We don't need ICollectionMenu and ISortField since they're not in the GraphQL schema
interface IApiResponse {
  statusCode: number;
  body: ICollectionResponse;
}

export interface ICollectionResponse {
  data: {
    getHomeScreenCollectionCache: {
      collectionsAndItems: Array<{
        collectionImage: string;
        homeCollectionTitle: string;
        items: Array<{
          compareAtPrice: number;
          cover: string;
          deliveryCompareAtPrice?: number;
          deliveryCompareAtPriceRange?: number[];
          deliveryPrice?: number;
          deliveryPriceRange?: number[];
          deliveryPriceWithTax?: number;
          deliveryPriceWithTaxRange?: number[];
          description: string;
          effectiveEndDateTime?: string;
          effectiveStartDateTime?: string;
          hasStock: boolean;
          hasVariant?: boolean;
          homeCollectionId?: string;
          homeCollectionTitle?: string;
          image?: string;
          isDisabled?: boolean;
          isNewArrival?: boolean;
          isPreOrder?: boolean;
          itemId: string;
          itemProperty?: string;
          memberDiscount?: {
            type: string;
            value: number;
          };
          price: number;
          priceWithTax?: number;
          productIsDisabled?: boolean;
          promotionEndDateTime?: string;
          promotionStartDateTime?: string;
          seoUrl?: string;
          title: string;
          totalRatings?: number;
          totalReviews?: number;
          updatedAt?: string;
          video?: string;
        }>;
        productCollectionId?: string;
        productCollectionName?: string;
        productCollectionSeoUrl?: string;
        selectedTags?: Array<{
          smartTaggingId: string;
          tagName: string;
          taggingId: string;
        }>;
        sequence?: number;
      }>;
      hasStock: boolean;
      message?: string;
      productStatus?: string;
      status: string;
    };
  };
}

export async function fetchHomeScreenCollections(
  accessToken: string,
  merchantId: string,
  orderType: string,
  storeId: string
): Promise<ICollectionResponse> {
  try {
    const params = {
      accessToken,
      merchantId,
      orderType,
      storeId
    };

    const response = await axios.post<IApiResponse>(
      `https://2z26v6uyevavng3nuzghdq2fce.appsync-api.ap-southeast-1.amazonaws.com/graphql/getHomeScreenCollectionCache`,
      params
    );

    if (response.data.statusCode !== 200) {
      throw new Error("Failed to fetch collections");
    }

    return response.data.body;
  } catch (error) {
    console.error("getHomeScreenCollections error:", error);
    throw error;
  }
}