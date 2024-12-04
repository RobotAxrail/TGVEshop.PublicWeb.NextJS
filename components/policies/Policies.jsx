import React, { Fragment, useContext } from "react";
import MerchantContext from "@/contexts/MerchantContext";
import { StoreTypes } from "@/enums/enums";

const legalPolicyMappingList = [
  {
    type: "Privacy",
    name: "Privacy Policy",
  },
  {
    type: "Refund",
    name: "Refund Policy",
  },
  {
    type: "Term Of Service",
    name: "Terms of Service",
  },
  {
    type: "Shipping",
    name: "Shipping Policy",
  },
];

const Policies = (props) => {
  const { storeType } = useContext(MerchantContext);
  const title = legalPolicyMappingList.find(
    (obj) => obj.type === props.selectedPolicy.policyType
  ).name;
  const data = props.selectedPolicy.policyContent;
  let dataArr = data.split("\n");
  let lastIndex = dataArr.length - 1;
  return (
    <>
      {storeType === StoreTypes.WARUNG_STORETYPE ? (
        <div className="flex flex-col items-center">
          <div className="text-center">
            <h1>{title}</h1>
            <p>{dataArr[0]}</p>
          </div>
          <div className="mx-4 md:mx-8">
            {dataArr.splice(1).map((data, idx) => {
              if (data.includes("SECTION")) {
                return (
                  <p key={idx} className="text-lg font-bold">
                    {data}
                  </p>
                );
              } else if (data !== "" && !data.includes("SECTION")) {
                if (!data.includes("(a)") && !data.includes("https")) {
                  return (
                    <p
                      key={idx}
                      className={[idx + 1 !== lastIndex ? "" : "italic"].join(
                        " "
                      )}
                    >
                      {data}
                    </p>
                  );
                } else if (data.includes("https")) {
                  let legalText = data.split("(https://");

                  let legalTextContent = legalText[0];
                  let legalTextContentLink = legalTextContent.split(" ");
                  let lastWord = legalTextContentLink
                    .slice(
                      legalTextContentLink.length - 4,
                      legalTextContentLink.length - 1
                    )
                    .join(" ");
                  let legalTextUrl =
                    "https://" +
                    legalText[1].replace(")", "").replace("pdf.", "pdf");

                  return (
                    <p key={idx}>
                      {legalTextContent.replace(lastWord, "")}
                      <a href={legalTextUrl} target="_blank">
                        {lastWord}
                      </a>
                    </p>
                  );
                } else {
                  let legalText = data.split(":");
                  let legalTextList = legalText.splice(1)[0].split(";");
                  return (
                    <>
                      <p key={idx}>{legalText[0] + ":"}</p>
                      <ul className="list-none">
                        {legalTextList.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </>
                  );
                }
              }
            })}
          </div>
        </div>
      ) : (
        <div className="p-5">
          <h1>{title}</h1>
          <div>
            <div dangerouslySetInnerHTML={{ __html: data }} />
          </div>
        </div>
      )}
    </>
  );
};

export default Policies;
