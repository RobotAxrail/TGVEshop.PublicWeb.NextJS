import React from "react";

// TODO component later
const CustomTable = (props) => {
  const { tableHeadContent, tableBodyContent, tableBodyClassName } = props;
  return (
    <div className="bg-white rounded shadow-paper overflow-x-auto">
      <table className="max-w-1200 w-full table-fixed">
        <thead className="bg-primary text-white text-left">
          <tr>
            {tableHeadContent}
            {/* <th className="p-[16px] rounded-tl-lg"></th>
            <th className="p-[16px]">Product</th>
            <th className="p-[16px]">Price</th>
            <th className="p-[16px]"></th>
            <th className="p-[16px] rounded-tr-lg"></th> */}
          </tr>
        </thead>
        <tbody className={`${tableBodyClassName} text-[14px] font-semibold`}>
          {tableBodyContent}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
