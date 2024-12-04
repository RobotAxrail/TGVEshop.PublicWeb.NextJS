import ImageGallery from "@/components/imageGallery/ImageGallery";

export default function ProductImageSection1({
  productDetail,
  productImage,
  currentPath,
  imageIndex,
  _image,
  selectedUOMImage,
}) {
  return (
    <div className="w-auto">
      <ImageGallery
        imageIndex={imageIndex}
        selectedImage={selectedUOMImage}
        thumbnailList={
          currentPath === "product-bundle"
            ? _image
            : Array.isArray(productImage)
            ? [...productImage]
            : []
        }
        noImage={Array.isArray(productImage) ? productImage.length === 0 : true}
        videoUrl={
          !!productDetail.video
            ? process.env.BUCKET_URL + productDetail.video
            : null
        }
      />
    </div>
  );
}
