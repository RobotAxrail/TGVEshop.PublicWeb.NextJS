import axios from "axios";

// Interface for the API response
interface IApiResponse {
  statusCode: number;
  body: IBannerResponse;
}

// Interface for the banner response
export interface IBannerResponse {
  data: {
    getLandingPageBannerCache: {
      banners: Array<{
        buttonAction: string;
        buttonActionValue: string;
        buttonTitle: string;
        description: string;
        detailPageImage: string;
        homeImage: string;
        isDisabled: boolean;
        landingPageBannerId: string;
        merchantId: string;
        selectedItem?: {
          itemId: string;
          itemImage: string;
          itemProperty: string;
          itemSeoUrl: string;
          itemTitle: string;
        };
        selectedTags?: Array<{
          smartTaggingId: string;
          tagName: string;
          taggingId: string;
        }>;
        seoDescription: string;
        seoTitle: string;
        seoUrl: string;
        sequence: number;
        title: string;
      }>;
      message: string;
      status: string;
    };
  };
}

export async function fetchLandingPageBanners(
  accessToken: string,
  merchantId: string
): Promise<IBannerResponse> {
  try {
    const params = {
      accessToken,
      merchantId
    };

    const response = await axios.post<IApiResponse>(
      `${process.env.NEXT_PUBLIC_ECS_API_ENDPOINT}/getLandingPageBannerCache`,
      params
    );

    if (response.data.statusCode !== 200) {
      throw new Error("Failed to fetch banners");
    }

    return response.data.body;
  } catch (error) {
    console.error("getLandingPageBanners error:", error);
    throw error;
  }
}