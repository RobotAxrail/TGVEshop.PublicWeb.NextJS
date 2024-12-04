import { useState, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";

// icons
import { DocumentDuplicateIcon } from "@heroicons/react/outline";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";

// components
import { Transition } from "@headlessui/react";

//API
import { API, graphqlOperation } from "aws-amplify";
import { getVirtualGoodsRedemptionCode } from "@/graphql/queries";

const Codes = ({ list }) => {
  return (
    <>
      {list.map((code) => {
        return (
          <p key={code.code}>
            <DocumentDuplicateIcon
              width="10"
              height="10"
              className="text-primary"
            />
            {code.virtualGoodsRedemptionId}
          </p>
        );
      })}
    </>
  );
};

const VirtualCode = (props) => {
  const [virtualCode, setVirtualCode] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const { t } = useTranslation("common");

  // useEffect(() => {
  //   getVirtualProductCode();
  // }, [props]);

  const getVirtualProductCode = async () => {
    try {
      var params = null;
      params = {
        merchantId: "00c20727-ecdf-4799-b834-4b725f8e79df",
        orderDetailId: props.orderDetailId,
      };
      let res = await API.graphql(
        graphqlOperation(getVirtualGoodsRedemptionCode, params)
      );
      if (
        res.data.getVirtualGoodsRedemptionCode.status === "true" &&
        res.data.getVirtualGoodsRedemptionCode.virtualGoodsRedemption
      ) {
        let data =
          res.data.getVirtualGoodsRedemptionCode.virtualGoodsRedemption;
        setVirtualCode(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {virtualCode && virtualCode.length > 0 && (
        <div className="text-[12px] text-gray-400">
          <p>{t("Virtual Product Code")}</p>

          {virtualCode.length > 3 ? (
            <>
              <Codes list={virtualCode.slice(0, 3)} />
              <Transition
                show={showMore}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-2000"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Codes list={virtualCode.slice(3, virtualCode.length)} />
              </Transition>
              <button
                className="text-primary font-semibold text-[14.4px] flex items-center"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? (
                  <>
                    {t("Show Less")}
                    <ChevronUpIcon width="18px" className="ml-2" />
                  </>
                ) : (
                  <>
                    {t("Show More")}
                    <ChevronDownIcon width="18px" className="ml-2" />
                  </>
                )}
              </button>
            </>
          ) : (
            <Codes list={virtualCode} />
          )}
        </div>
      )}
    </>
  );
};

export default VirtualCode;
