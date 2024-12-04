import React from "react";
import Item from "@/components/collection/Item";

const Recommendation = (props) => {
  const { recommendationsList, titleStyle, title } = props;
  return (
    <div className="p-3 m:p-0">
      {recommendationsList?.length > 0 && (
        <>
          {" "}
          <div className={`pt-5 pb-[15px] font-semibold ${titleStyle}`}>
            {title}
          </div>
          <Item itemPerPage={4} itemList={recommendationsList} />
        </>
      )}
    </div>
  );
};

export default Recommendation;
