"use client";

import React, { useState, useEffect, useContext } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import mockImage from "../../public/assets/mock-images/mockbanner.png";
import Image from "next/image";
import { fetchLandingPageBanners, IBannerResponse } from '../../apis/eshop/getLandingPageBannerCache';
import {
  getLandingPageBannerCache,
  getShopByCategoryCache,
  getHomeScreenCollectionCache,
  getFeaturedHomeCollectionCache,
} from "@/graphql/queries";
import MerchantContext from "@/contexts/MerchantContext";
import { API, graphqlOperation } from "aws-amplify";
import { isLocalHost } from "@/utils/util";
// Mock Data Component



const useMockBannerData = () => {
  return {
    getLandingPageBannerCache: {
      banners: [
        {
          homeImage: mockImage,
          landingPageBannerId: "banner-001",
          title: "Gundam",
        },
        {
          homeImage: "/api/placeholder/1920/600",
          landingPageBannerId: "banner-002",
          title: "New Arrivals",
        },
        {
          homeImage: "/api/placeholder/1920/600",
          landingPageBannerId: "banner-003",
          title: "Clearance Sale",
        },
      ],
      message: "Success",
      status: 200,
    },
  };
};

export default function HomeBannerCarousel() {
  const merchantInfoContext = useContext(MerchantContext);
  const bannerData = useMockBannerData();
  const banners = bannerData.getLandingPageBannerCache.banners;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<any>();
  const [bannerDatas, setBannerDatas] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLandingPageBannerCache = async () => {
    try {
      setIsLoading(true);
      const params = {
        merchantId: merchantInfoContext.merchantId,
      }

      const { data } = await API.graphql(
        graphqlOperation(getLandingPageBannerCache, isLocalHost() ? params : {})
      );

      setBannerDatas(data);
    } catch(error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }
  

  useEffect(() => {
    fetchLandingPageBannerCache();
  } , [merchantInfoContext])
  // const [bannerData, setBannerData] = useState<IBannerResponse | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // useEffect(() => {
  //   const getBanners = async () => {
  //     try {
  //       setIsLoading(true);
  //       const result = await fetchLandingPageBanners(
  //         "your-access-token",
  //         "merchant-123"
  //       );
  //       setBannerData(result);
  //     } catch (error) {
  //       setError(error instanceof Error ? error.message : 'An error occurred');
  //       // Fallback to mock data if API fails
  //       setBannerData(mockBannerData as any);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   getBanners();
  // }, []);


  // Auto-advance effect with looping
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (currentIndex === banners.length - 1) {
        api.scrollTo(0);
        setCurrentIndex(0);
      } else {
        api.scrollNext();
      }
    }, 3000);

    // Update currentIndex when carousel changes
    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });

    // Cleanup interval on component unmount
    return () => {
      clearInterval(interval);
      api.off("select");
    };
  }, [api, currentIndex, banners.length]);


  if (isLoading || !bannerDatas) {
    return <div className="flex items-center justify-center">Loading...</div>;
  }
  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <Carousel
        className="w-full"
        setApi={setApi}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {bannerDatas?.getLandingPageBannerCache?.banners?.map((banner) => (
            <CarouselItem key={banner.landingPageBannerId}>
              <div className="relative w-full">
                <img
                  src={process.env.BUCKET_URL + banner.homeImage}
                  alt={banner.title}
                  className="w-full h-auto max-h-[600px] object-cover select-none"
                  width={100}
                  height={50}
                  draggable={false}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Indicators */}
      <div className="flex justify-center items-center mt-4">
        {bannerDatas?.getLandingPageBannerCache?.banners?.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              api?.scrollTo(index);
              setCurrentIndex(index);
            }}
            className={`w-[6px] h-[6px] mx-2 rounded-full transition-colors duration-300 ${
              index === currentIndex ? "bg-[#FF0013]" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}