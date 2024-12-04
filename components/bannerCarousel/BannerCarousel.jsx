import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// styles
import "react-alice-carousel/lib/alice-carousel.css";
import classes from "./BannerCarousel.module.scss";

// component
import AliceCarousel from "react-alice-carousel";

function BannerCarousel({ bannerList = [], loading, setLoading }) {
  const router = useRouter();
  const [paddingTop, setPaddingTop] = useState(0);

  const items = bannerList?.map((data, index) => {
    const imageDisplay = process.env.BUCKET_URL + data.homeImage;

    return (
      <div
        className="relative h-full lg:h-[400px] max-h-[67vh] min-h-[200px] rounded-20 w-full cursor-pointer bg-black bg-opacity-[5%]"
        style={{ paddingTop }}
        key={index}
      >
        <Image
          src={imageDisplay}
          alt={data.title}
          layout="fill"
          objectFit="contain"
          onLoad={(e) => {
            setPaddingTop(`calc(100% / 2.56`);
            setLoading(false);
          }}
          onClick={() => {
            if (data?.seoUrl?.length > 0)
              router.push({
                pathname: `/${data.seoUrl}`,
                state: {
                  seoUrl: data.seoUrl,
                },
              });
          }}
        />
      </div>
    );
  });

  const ControlButton = ({ type }) => {
    return (
      <div className="rounded-full bg-white h-8 w-8 flex justify-center items-center cursor-pointer">
        {type === "next" ? (
          <FiChevronRight fontSize={18} />
        ) : (
          <FiChevronLeft fontSize={18} />
        )}
      </div>
    );
  };

  return (
    <div className={classes.container}>
      {items?.length > 0 && (
        <AliceCarousel
          autoHeight
          items={items}
          autoPlayInterval={3000}
          autoPlay={items?.length > 1}
          disableButtonsControls={items?.length === 1}
          disableDotsControls={items?.length === 1}
          renderNextButton={() => <ControlButton type="next" />}
          renderPrevButton={() => <ControlButton type="prev" />}
          infinite
        />
      )}
    </div>
  );
}

export default BannerCarousel;
