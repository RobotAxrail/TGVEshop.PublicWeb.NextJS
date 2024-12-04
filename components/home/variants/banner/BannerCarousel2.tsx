import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import { useRouter } from "next/router";
import { useState } from "react";
export default function BannerCarousel2({ bannerList }) {
  const [slide, setSlide] = useState(0);
  const BUCKET_URL = process.env.BUCKET_URL;
  const router = useRouter();

  return (
    <div className="h-full w-full relative">
      <div className="absolute bottom-0 right-0 z-10 p-4 md:p-8">
        <div className="flex flex-row gap-2">
          {bannerList.map((_, index) => (
            <button
              onClick={() => setSlide(index)}
              key={index}
              className={`rounded-full border-white border-[2px] max-h-5 max-w-5 p-1 cursor-pointer ${
                slide === index ? "bg-white" : "bg-transparent"
              }`}
            />
          ))}
        </div>
      </div>

      <AliceCarousel
        onSlideChange={(e) => setSlide(e.slide)}
        autoPlayInterval={3000}
        disableButtonsControls
        activeIndex={slide}
        disableDotsControls
        autoPlay
        infinite
        items={bannerList.map(({ homeImage, title, description, seoUrl }) => {
          return (
            <div
              className="pb-[100%] md:pb-[56.25%] w-screen bg-cover relative"
              style={{
                backgroundImage: `url('${BUCKET_URL + homeImage}')`,
              }}
            >
              <div className="w-full h-full bg-gray-800 bg-opacity-40 absolute">
                <div className="flex flex-col text-white w-full md:w-[700px] lg:w-[900px] xl:w-[1000px] mx-auto m-auto justify-end h-full pl-4 md:pl-0 pb-10 md:pb-12 lg:pb-36 xl:pb-36">
                  <p
                    className="text-3xl m-0 font-[600] font-playFair "
                    style={{
                      font: "normal normal 600 30px/40px Playfair Display",
                    }}
                  >
                    {title}
                  </p>
                  <div
                    className="mt-1 md:mt-4 mb-2 md:mb-8 max-w-[90%] md:max-w-[50%]"
                    style={{
                      font: "normal normal normal 18px/21px Georgia",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                  />
                  <button
                    className="duration-100 text-md md:text-xl bg-white px-8 py-4 md:px-11 md:py-4 rounded w-fit text-black hover:brightness-90"
                    style={{
                      font: "normal normal normal Georgia",
                    }}
                    onClick={() =>
                      router.push({
                        pathname: `/${seoUrl}`,
                        state: { seoUrl },
                      } as any)
                    }
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      />
    </div>
  );
}
