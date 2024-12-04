import axios from "axios";

interface IApiResponse {
  statusCode: number;
  body: IProductDetailsResponse;
}

export interface IProductDetailsResponse {
  data: {
    getProductDetails: {
      cover: string;
      description: string;
      discountPercentage?: number;
      image: string[];
      isPreOrder: boolean;
      message: string;
      modifierGroups?: Array<{
        isItemsControlAvailable: boolean;
        isSelected: boolean;
        modifier: Array<{
          availableStatus: boolean;
          isSelected: boolean;
          modifierId: string;
          modifierName: string;
          price: number;
        }>;
        modifierGroupId: string;
        modifierGroupName: string;
        modifierGroupType: string;
        requestRemark: string;
        selectionRangeMax: number;
        selectionRangeMin: number;
      }>;
      priceComparedAtPriceRange: number[];
      priceRange: number[];
      productIsDisabled: boolean;
      productUOMs: Array<{
        barcode: string;
        compareAtPrice: number;
        price: number;
        productId: string;
        productTitle: string;
        quantityForSales: number;
        storeId: string;
        // Add other productUOMs fields as needed
      }>;
      status: string;
      title: string;
      totalRatings: number;
      totalReviews: number;
      variantName1?: string;
      variantName2?: string;
      variantName3?: string;
      variantValues1?: string[];
      variantValues2?: string[];
      variantValues3?: string[];
      video?: string;
    };
  };
}

export async function fetchProductDetails(
  customerId: string | null,
  domain: string | null,
  merchantId: string,
  orderType: string,
  seoUrl: string,
  storeId: string
): Promise<IProductDetailsResponse> {
  try {
    const params = {
      customerId,
      domain,
      merchantId,
      orderType,
      seoUrl,
      storeId,
    };

    const response = await axios.post<IApiResponse>(
      `${process.env.NEXT_PUBLIC_ECS_API_ENDPOINT}/getProductDetails`,
      params
    );

    if (response.data.statusCode !== 200) {
      throw new Error("Failed to fetch product details");
    }

    return response.data.body;
  } catch (error) {
    console.error("getProductDetails error:", error);
    throw error;
  }
}