const ProductTabPanels = ({
  title,
  bodyContent,
  productDetail,
  userReview,
  description = "",
}) => {
  // if (!productDetail) productDetail = [{}];
  // const {} = productDetail;

  return (
    // <div className={[classes.root, "rounded bg-white border"].join(" ")}>
    //   <div
    //     className={[
    //       classes["description-review-tab-box"],
    //       "leading-normal",
    //     ].join(" ")}
    //   >
    //     {/* <DocumentTextIcon width='3rem' className="text-[#dbdbdb]" /> */}
    //     <div className="font-semibold font-[18px] py-[14px]">
    //       Product description
    //     </div>
    //     <span>
    //       <div
    //         className="break-words"
    //         dangerouslySetInnerHTML={{
    //           __html:
    //             description !== "" ? description : productDetail.description,
    //         }}
    //       />
    //     </span>
    //   </div>
    // </div>
    <div className="rounded bg-white border mt-3">
      <div className="flex flex-col m-6">
        <div className="font-semibold font-[18px] pb-[14px]">{title}</div>
        {bodyContent}
      </div>
    </div>
  );
};

export default ProductTabPanels;
