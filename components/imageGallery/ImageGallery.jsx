import { useState, useEffect, useCallback, useRef } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import Image from "next/image";

// icons
import empty from "@/images/empty-cart.svg";

// components
import ImageGallery from "react-image-gallery";
import InnerImageZoom from "react-inner-image-zoom";

// styles
import "react-image-gallery/styles/css/image-gallery.css";
import classes from "./ImageGallery.module.scss";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

const ImageGalleryCustom = (props) => {
  const { noImage = false, videoUrl } = props;
  const [items, setItems] = useState([]);
  const [imageSize, setImageSize] = useState({ width: 300, height: 300 });

  const refImg = useRef(null);
  const refVideo = useRef(null);

  const memoizedHandleRender = useCallback((props) => {
    const { isVideo, videoUrl } = props;

    if (isVideo) {
      return (
        <div className="max-height-450px w-full xs-down:w-full xs-down:object-cover">
          <video controls width="300" autoPlay muted ref={refVideo} id="video">
            <source src={videoUrl} type="video/mp4" />
            Sorry, your browser doesn&apos;t support embedded videos.
          </video>
        </div>
      );
    }
    if (refImg.current !== null) {
      if (refImg.current.state.currentIndex !== 0 && videoUrl !== undefined) {
        refVideo.current.pause();
      }
    }

    return (
      <div className="max-height-450px w-full xs-down:w-full xs-down:object-cover mb-[16px]">
        <InnerImageZoom
          src={props.original}
          zoomSrc={props.original}
          zoomType="hover"
          zoomPreload={true}
          hideHint={true}
        />
      </div>
    );
  }, []);

  useEffect(() => {
    // add height and width onload
    if (Array.isArray(props.thumbnailList) && props.thumbnailList.length > 0) {
      let img = document.createElement("img");
      img.src = process.env.BUCKET_URL + props.thumbnailList[0];
      img.onload = function () {
        setImageSize({ width: img.width, height: img.height });
      };
    }
  }, []);

  useEffect(() => {
    let itemList = [];
    let firstItem = props.thumbnailList[0];
    itemList.push({
      original: process.env.BUCKET_URL + firstItem,
      thumbnail: process.env.BUCKET_URL + firstItem,
      originalHeight: imageSize.height,
      originalWidth: imageSize.width,
      thumbnailHeight: "100px",
      thumbnailWidth: "100px",
      thumbnailClass:
        props.thumbnailList.length > 1
          ? "product-detail-image-gallery-thumbnail"
          : "product-detail-image-gallery-thumbnail-one",
    });

    props.thumbnailList?.map((item, idx) => {
      let newItem = {};
      if (item?.isVideo && idx > 0 && !!videoUrl) {
        newItem = { ...itemList[0] };
        newItem["isVideo"] = item.isVideo;
        newItem["videoUrl"] = videoUrl;
        itemList.push(newItem);
      } else if (!item?.isVideo && idx > 0) {
        newItem["original"] = process.env.BUCKET_URL + item;
        newItem["thumbnail"] = process.env.BUCKET_URL + item;
        newItem["originalHeight"] = imageSize.width;
        newItem["originalWidth"] = imageSize.height;
        newItem["thumbnailHeight"] = "100px";
        newItem["thumbnailWidth"] = "100px";
        newItem["thumbnailClass"] =
          props.thumbnailList.length > 1
            ? classes["image-gallery-thumbnail"]
            : classes["image-gallery-thumbnail-one"];
        itemList.push(newItem);
      }
    });
    if (!!videoUrl) {
      var temp = itemList[0];
      itemList[0] = itemList[1];
      itemList[1] = temp;
    }
    setItems(itemList);
  }, [props.thumbnailList, imageSize]);

  if (noImage) {
    return (
      <div className={classes["no-image-container"]}>
        <Image src={empty} width={empty.width} height={empty.height} />
      </div>
    );
  }

  function itemHaveVideo() {
    if (items?.findIndex((item) => item?.isVideo) !== -1) {
      return true;
    }

    return false;
  }

  useEffect(() => {
    // change img when selected option changed
    const selectedImgIndex = (element) => element === props.selectedImage;
    const filteredList = props.thumbnailList.filter(
      (item) => typeof item === "string"
    );
    const getVariantIndex = (
      itemHaveVideo() ? props.thumbnailList : filteredList
    ).findIndex(selectedImgIndex);

    refImg.current.slideToIndex(getVariantIndex === -1 ? 0 : getVariantIndex);
  }, [props.selectedImage]);

  function renderThumbnail(thumbnail) {
    return (
      <div className="relative">
        {!!thumbnail.videoUrl && (
          <div className="absolute inset-0 z-10 text-3xl h-full w-full flex items-center justify-center">
            <BsFillPlayCircleFill />
          </div>
        )}

        <Image
          src={thumbnail.thumbnail}
          alt={"thumbnail"}
          objectFit="cover"
          height={100}
          width={100}
          className={`${!!thumbnail.videoUrl && "opacity-30"}`}
        />
      </div>
    );
  }

  return (
    <div className="p-0 960-up:pr-6">
      <ImageGallery
        items={items}
        renderItem={memoizedHandleRender}
        ref={refImg}
        renderThumbInner={renderThumbnail}
        originalHeight="100%"
        originalWidth="100%"
        infinite={false}
        lazyLoad={true}
        thumbnailPosition="bottom"
        showFullscreenButton={false}
        showPlayButton={false}
        showBullets={items.length > 1 ? true : false}
        showNav={items.length > 1 ? true : false}
        showThumnbails={items.length > 1 ? true : false}
        fullscreen={false}
        useBrowserFullscreen={false}
        additionalClass={[classes["image-gallery"], "mx-auto"].join(" ")}
      />
    </div>
  );
};

export default ImageGalleryCustom;
