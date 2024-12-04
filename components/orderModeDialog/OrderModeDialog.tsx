import React, { useContext, useEffect, useState } from "react";
import MobileViewFullScreenModal from "../dialog/MobileViewFullScreenModal/MobileViewFullScreenModal";
import { OrderModalStateActions, OrderTypes } from "@/enums/enums";
import { ICustomerFavouriteAddress, IOrderModalState } from "types";
import MerchantContext from "@/contexts/MerchantContext";
import { useOrder } from "@/contexts/OrderContext";
import { useAuth } from "@/contexts/AuthContext";
import bookSVG from "@/images/book.svg";
import bookSelectedSVG from "@/images/book-selected.svg";
import truckSVG from "@/images/truck.svg";
import truckSVGSelected from "@/images/truck-selected.svg";
import shoppingBagSVG from "@/images/shopping-bag.svg";
import shoppingBagSVGSelected from "@/images/shopping-bag-selected.svg";
import useTranslation from "next-translate/useTranslation";

//utils
import Cookies from "universal-cookie";
import { API, graphqlOperation } from "aws-amplify";
import { getCustomerFavouriteAddresses } from "@/graphql/queries";
import { ArrowLeftIcon, XIcon } from "@heroicons/react/outline";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import Image from "next/image";
import DineinDialog from "./DineinDialog";
import DeliveryDialog from "./DeliveryDialog";
import PickupDialog from "./PickupDialog";
import { useSingleStoreFullfilment } from "../AxrailCommerce/SingleStoreFullfilmentSelector/context/SingleStoreFullfilmentContext";
import { useRouter } from "next/router";
import { isLocalHost } from "@/utils/util";


interface ICustomerFavouriteAddressesRes {
  addresses: Array<ICustomerFavouriteAddress>;
  message: string;
  status: string;
}
interface IOrderModeDialog {
  orderModalState: IOrderModalState;
  dispatchOrderModalState: (dispatchProps: {
    type: string;
    data?: { addressDetailToEdit: any };
  }) => void;
}

const OrderModeDialog: React.FC<IOrderModeDialog> = ({
  orderModalState,
  dispatchOrderModalState,
}) => {
  const { merchantId, orderOption, storeType } = useContext(MerchantContext);
  const { t } = useTranslation("common");
  const { isSingleStoreFullfilment } = useSingleStoreFullfilment() as any;
  const {
    orderType,
    handleChangeOrderType,
    tableNumber,
    setTableNumber,
    googleMapsIsLoaded,
    deliveryAddressList,
    setDeliveryAddressList,
  } = useOrder();

  const { isAuthenticated } = useAuth();
  const cookie = new Cookies();
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [merchantOrderMode, setMerchantOrderMode] = useState([]);
  const { section } = orderModalState;
  const router = useRouter();

  const availableOrderMode = new Map<
    `${OrderTypes}`,
    { title: string; unselectedImage: string; selectedImage: string }
  >([
    [
      OrderTypes.DELIVERY,
      {
        title: "Delivery",
        unselectedImage: truckSVG,
        selectedImage: truckSVGSelected,
      },
    ],
    [
      OrderTypes.PICKUP,
      {
        title: "Pick Up",
        unselectedImage: shoppingBagSVG,
        selectedImage: shoppingBagSVGSelected,
      },
    ],
    [
      OrderTypes.DINEIN,
      {
        title: "Dine In",
        unselectedImage: bookSVG,
        selectedImage: bookSelectedSVG,
      },
    ],
  ]);

  const handleChangeSection = (
    section: "Add" | "Edit" | "Home",
    addressDetailToEdit: any = null
  ) => {
    let orderModalStateType = "";

    const defaultSection = "Home";

    const sectionMap = new Map([
      ["Add", "ADD_ADDRESS"],
      ["Edit", "EDIT_ADDRESS"],
      [defaultSection, "HOME"],
    ]);

    orderModalStateType =
      OrderModalStateActions[
      sectionMap.get(section ? section : defaultSection)
      ];

    dispatchOrderModalState({
      type: orderModalStateType,
      ...(section === "Edit" && {
        data: {
          addressDetailToEdit: addressDetailToEdit,
        },
      }),
    });
  };

  const getDeliveryAddressList = async () => {
    setIsAddressLoading(true);

    try {
      var params = {
        accessToken: cookie.get("signIn")?.accessToken,
        customerId: cookie.get("signIn")?.customerId,
      };
      if (isLocalHost()) {
        params['merchantId'] = merchantId
      }
      let res = (await API.graphql(
        graphqlOperation(getCustomerFavouriteAddresses, params)
      )) as GraphQLResult<{
        getCustomerFavouriteAddresses: ICustomerFavouriteAddressesRes;
      }>;
      if (res && res.data.getCustomerFavouriteAddresses.message === "Success") {
        setDeliveryAddressList(
          res.data.getCustomerFavouriteAddresses.addresses
        );
        localStorage.setItem(
          "addressList",
          JSON.stringify(res.data.getCustomerFavouriteAddresses.addresses)
        );
      }
      setIsAddressLoading(false);
    } catch (error) {
      setIsAddressLoading(false);
    }
  };

  useEffect(() => {
    getDeliveryAddressList();
  }, []);

  const getTitleText = () => {
    const titleTextMap = new Map([
      [null, t("How would you like to order?")],
      ["Add", t("Add address")],
      ["Edit", t("Edit address")],
    ]);

    return titleTextMap.get(section);
  };

  return (
    <MobileViewFullScreenModal
      className="bg-white md:h-[90vh] p-5 w-[100%] sm:h-[100%] sm:w-[60%] sm:max-w-[36rem] sm:mt-[2rem] sm:mb-[2rem] sm:rounded-lg overflow-hidden flex flex-col"
      scrollable={isSingleStoreFullfilment}
      open={orderModalState?.view}
      onClose={() =>
        dispatchOrderModalState({
          type: OrderModalStateActions.CLOSE,
        })
      }
    >
      <>
        <div className="grid grid-cols-[auto_250px_auto] mb-3">
          {section === "Edit" || section === "Add" ? (
            <button
              className="text-left"
              onClick={() => handleChangeSection("Home")}
            >
              <ArrowLeftIcon className="w-6 h-6 text-primary" />
            </button>
          ) : (
            <div></div>
          )}
          {router.pathname !== "/checkout" ? (
            <h3 className="text-primary text-center">{getTitleText()}</h3>
          ) : (
            <div />
          )}

          <button
            className="text-right outline-none"
            onClick={() =>
              dispatchOrderModalState({
                type: OrderModalStateActions.CLOSE,
              })
            }
          >
            <XIcon className="w-6 h-6 text-primary" />
          </button>
        </div>
        {section !== "Add" &&
          section !== "Edit" &&
          router.pathname !== "/checkout" && (
            <div>
              <ul
                className={`grid ${orderOption.length > 1
                  ? `justify-between grid-cols-${orderOption.length}`
                  : "justify-center grid-cols-[250px]"
                  }  p-0 m-0 w-full`}
              >
                {[...availableOrderMode]
                  .filter((orderMode) => orderOption.includes(orderMode[0]))
                  .map((option) => {
                    const orderMode = availableOrderMode.get(option[0]);
                    return (
                      <li
                        key={option[0]}
                        className={[
                          "h-[4rem] pb-5 tab tab-bordered hover:none border-b-[1px] list-none",
                          orderType === option[0] &&
                          "border-b-[3px] border-primary",
                        ].join(" ")}
                      >
                        <button
                          type="button"
                          role="tab"
                          onClick={() => handleChangeOrderType(option[0])}
                        >
                          <div
                            className={`flex flex-col ${orderType === option[0] && "text-primary"
                              }`}
                          >
                            <Image
                              key={option[0]}
                              alt={orderMode.title}
                              src={
                                orderType === option[0]
                                  ? orderMode.selectedImage
                                  : orderMode.unselectedImage
                              }
                              width={25}
                              height={25}
                              priority={true}
                            />
                            {t(orderMode.title)}
                          </div>
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}
        {/* Order Mode Details */}
        {orderType === OrderTypes.DELIVERY && (
          <DeliveryDialog
            isAddressLoading={isAddressLoading}
            favAddressList={deliveryAddressList}
            setFavAddressList={setDeliveryAddressList}
            orderType={orderType}
            section={section}
            handleChangeSection={handleChangeSection}
            dispatchOrderModalState={dispatchOrderModalState}
            orderModalState={orderModalState}
            getDeliveryAddressList={getDeliveryAddressList}
            isAuthenticated={isAuthenticated}
            googleMapsIsLoaded={googleMapsIsLoaded}
          />
        )}

        {orderType === OrderTypes.PICKUP && <PickupDialog />}

        {orderType === OrderTypes.DINEIN && (
          <DineinDialog
            tableNumber={tableNumber}
            setTableNumber={setTableNumber}
            dispatchOrderModalState={dispatchOrderModalState}
          />
        )}
      </>
    </MobileViewFullScreenModal>
  );
};

export default OrderModeDialog;
