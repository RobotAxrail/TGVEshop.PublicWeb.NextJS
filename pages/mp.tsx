import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import SEO from "@/components/seo/SEO";
import { API, graphqlOperation } from "aws-amplify";
import {
  getPaymentOptions,
  getManualPaymentOrderStatus,
} from "@/graphql/queries";
import {
  generateManualPaymentReceiptUploadLink,
  uploadManualPaymentReceipt,
} from "@/graphql/mutations";
import { useCart } from "@/contexts/CartContext";
import InfoCard from "@/components/ewarung/InfoCard";
import PriceWithCurrency from "@/components/priceWithCurrency/PriceWithCurrency";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage as faImageRegular,
  faFilePdf,
} from "@fortawesome/free-regular-svg-icons";
import { getMerchantData } from "../apis/merchant";
import { MANUAL_PAYMENT_ORDER_PAYMENT_COMPLETED_STATUS_LIST } from "@/enums/orderStatus";
import Cookies from "universal-cookie";
import { getDomainForSSR, isLocalHost } from "@/utils/util";
import MerchantContext from "@/contexts/MerchantContext";
import { setToastState } from "@/states/toastBarState";
import { StoreTypes } from "@/enums/enums";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import PaymentMethodList from "@/components/checkout/manual-payment/PaymentMethodList";
import WarungUploadDropZone from "@/components/uploadDropZone/WarungUploadDropZone";
import CheckoutLayout from "@/components/checkout/CheckoutLayout";
import TextDisabledDisplay from "@/components/shared/TextDisabledDisplay";
import useUploadDropZone from "@/hooks/useUploadDropZone";
import ManualPaymentBottomSection from "@/components/checkout/manual-payment/ManualPaymentBottomSection";
import { IPaymentMethod } from "../types";

const ManualPaymentInfoScreen = ({
  selectedManualPaymentOption,
  manualPaymentOptionList,
  orderInfo,
}) => {
  const cookie = new Cookies();
  const router = useRouter();
  const { getCartList } = useCart() as any;

  interface IGenerateMPReceiptUploadLinkProps {
    fileName: string;
    orderNumber: string;
    manualPaymentMethodName: string;
  }

  const SUPPORTED_FILE_TYPE = {
    "image/*": [],
    "application/pdf": [],
  };

  const { merchantId, storeType, phone, whatsappNo } =
    useContext(MerchantContext);

  const [selectedPaymentMethodName, setSelectedPaymentMethodName] =
    useState("");

  const callGenerateManualPaymentReceiptUploadLink = async ({
    fileName,
    orderNumber,
    manualPaymentMethodName,
  }: IGenerateMPReceiptUploadLinkProps) => {
    const response = (await API.graphql(
      graphqlOperation(generateManualPaymentReceiptUploadLink, {
        fileName: fileName,
        orderNumber: orderNumber,
        manualPaymentMethodName: manualPaymentMethodName,
      })
    )) as GraphQLResult<any>;

    return response.data.generateManualPaymentReceiptUploadLink as string;
  };

  //state for uploadDropZone component
  const {
    filePath,
    uploadedFiles,
    setUploadedFiles,
    onDropIsLoading,
    uploadProgress,
    onDrop,
  } = useUploadDropZone(
    `manual-payment/${merchantId}/receipt/${orderInfo.orderNumber}`,
    SUPPORTED_FILE_TYPE,
    async (fileName) =>
      await callGenerateManualPaymentReceiptUploadLink({
        fileName: fileName,
        orderNumber: orderInfo.orderNumber,
        manualPaymentMethodName:
          selectedPaymentMethodName,
      })
  );

  const [uploadIsLoading, setUploadIsLoading] = useState(false);

  const handleUploadReceipt = async () => {
    try {
      setUploadIsLoading(true);
      const params = {
        fileName: filePath,
        orderNumber: orderInfo.orderNumber,
        manualPaymentMethodName:
          selectedPaymentMethodName,
      };
      if (isLocalHost()) {
        params["merchantId"] = merchantId;
      }
      const res = (await API.graphql(
        graphqlOperation(uploadManualPaymentReceipt, params)
      )) as GraphQLResult<any>;
      if (res.data.uploadManualPaymentReceipt.status === "true") {
        setToastState({
          show: true,
          severity: "success",
          message: "Receipt successfully submitted.",
        });
        getCartList();
        setTimeout(() => {
          router.push(
            `/payment-confirmation?orderNumber=${orderInfo.orderNumber}`
          );
        }, 2000);
      } else {
        setToastState({
          show: true,
          severity: "error",
          message: "Receipt failed to upload, please try again.",
        });
      }
      setUploadIsLoading(false);
    } catch (error) {
      setToastState({
        show: true,
        severity: "error",
        message: "Receipt failed to upload, please try again.",
      });
      setUploadIsLoading(false);
    }
  };

  useEffect(() => {
    getCartList();
    if (
      storeType === StoreTypes.WARUNG_STORETYPE &&
      orderInfo &&
      orderInfo?.orderId !== null
    ) {
      cookie.set("lastOrderId", orderInfo?.orderId, {
        path: "/",
      });
    }
  }, []);

  type manualPaymentOptionsId = string;

  const paymentMethodMap = new Map<manualPaymentOptionsId, IPaymentMethod>(
    manualPaymentOptionList.map((manualPaymentOption) => [
      manualPaymentOption.manualPaymentOptionsId,
      {
        id: manualPaymentOption.manualPaymentOptionsId,
        title: manualPaymentOption.manualPaymentMethodName,
        infoText: manualPaymentOption.paymentInstructions,
        qrCode: manualPaymentOption.qrCode,
        paymentLink: manualPaymentOption.TNGPaymentLink,
      },
    ])
  );

  //Map for all the contents to be shown is this page
  const infoCardMap = new Map([
    [
      "orderSummary",
      {
        children: (
          <div className="collapse px-site-padding py-0 collapse-arrow text-primary">
            <input type="checkbox" className="p-0" />
            <div className="collapse-title flex justify-between p-0 items-center">
              <h3 className="card-title text-base m-0 text-primary font-semibold">
                Order Summary
              </h3>
            </div>
            <div className="collapse-content p-0">
              <div className="font-normal text-xs divide-y divide-dashed text-custom-black">
                <div className="flex justify-between pb-3">
                  <span className="m-0">Subtotal</span>
                  <span className="m-0">
                    <PriceWithCurrency value={orderInfo.grandTotal} />
                  </span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="m-0">Total</span>
                  <span className="m-0 text-primary">
                    <PriceWithCurrency value={orderInfo.grandTotal} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
    [
      "totalAmount",
      {
        title: "Total Amount",
        topRightComponent: (
          <h3 className="card-title text-base text-primary m-0 font-semibold">
            <PriceWithCurrency value={orderInfo.grandTotal} />
          </h3>
        ),
        children: (
          <div>
            <TextDisabledDisplay
              label="Order ID"
              value={orderInfo.orderNumber}
            />
            <PaymentMethodList
              paymentMethodMap={paymentMethodMap}
              setSelectedPaymentMethodName={setSelectedPaymentMethodName}
            />
          </div>
        ),
      },
    ],
    [
      "confirmYourOrder",
      {
        title: "Confirm your order",
        children: (
          <div className="w-full text-center box-border h-auto">
            <WarungUploadDropZone
              handleUpload={handleUploadReceipt}
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              uploadIsLoading={uploadIsLoading}
              onDropIsLoading={onDropIsLoading}
              useDropzoneProps={{
                noClick: true,
                disabled: onDropIsLoading,
                onDrop,
                multiple: false,
                accept: SUPPORTED_FILE_TYPE,
              }}
              uploadProgress={uploadProgress}
              uploadButtonLabel="Submit"
              browseSubtitle="Click here to upload proof of payment."
              icon={
                <FontAwesomeIcon
                  icon={
                    uploadedFiles.find((file) => file.type.includes("image"))
                      ? faImageRegular
                      : faFilePdf
                  }
                  className={["text-primary text-3xl"].join(" ")}
                />
              }
            />
          </div>
        ),
      },
    ],
  ]);

  return (
    <>
      <SEO
        title={"Manual Payment Info"}
        keywords=""
        description="Manual Payment Info"
      />
      <CheckoutLayout pageModule="payment">
        <div>
          {infoCardMap.size > 0 &&
            [...infoCardMap].map((infoCard) => (
              <InfoCard
                key={infoCard[0]}
                className="mb-5"
                title={infoCard[1].title}
                topRightComponent={infoCard[1].topRightComponent}
              >
                {infoCard[1].children}
              </InfoCard>
            ))}
          <ManualPaymentBottomSection
            storeType={storeType}
            phoneNum={phone}
            whatsappNo={whatsappNo}
          />
        </div>
      </CheckoutLayout>
    </>
  );
};

export async function getServerSideProps(context) {
  const { domain } = getDomainForSSR(context);
  let merchantId = "";
  if (context.req.cookies["merchantId"]) {
    merchantId = context.req.cookies["merchantId"];
  } else {
    const merchantJsonData = await getMerchantData(domain);
    merchantId = merchantJsonData.merchantId;
  }

  try {
    const orderNumber = context.query?.id ?? "";
    //Call api to get all the payment options
    const getPaymentOptionsAPI = API.graphql(
      graphqlOperation(getPaymentOptions, {
        domain: domain,
      })
    ) as Promise<GraphQLResult<any>>;

    //get order status to validate if the order is pending payment, paid or expired
    const getManualPaymentOrderStatusAPI = API.graphql(
      graphqlOperation(getManualPaymentOrderStatus, {
        domain: domain,
        orderNumber: orderNumber,
      })
    ) as Promise<GraphQLResult<any>>;

    const [paymentOptionsRes, orderStatusRes] = await Promise.all([
      getPaymentOptionsAPI,
      getManualPaymentOrderStatusAPI,
    ]);

    const paymentOptionsResData = paymentOptionsRes.data.getPaymentOptions;

    const manualPaymentOptionToShow =
      paymentOptionsResData.manualPaymentOptionList[0];

    const orderStatusResData = orderStatusRes.data?.getManualPaymentOrderStatus;

    //if order is not created, return 404
    if (orderStatusResData.status === "false") {
      console.log({ statusFalse: orderStatusResData });
      return { notFound: true };
    }

    //if order is already accepted
    if (
      MANUAL_PAYMENT_ORDER_PAYMENT_COMPLETED_STATUS_LIST.includes(
        orderStatusResData?.orderStatus
      )
    ) {
      return {
        redirect: {
          permanent: false,
          destination: `/payment-success?orderNumber=${orderNumber}`,
        },
      };
      //if customer failed or havent made payment
    } else if (orderStatusResData.orderStatus === "Payment Failed") {
      return {
        redirect: {
          permanent: false,
          destination: `/order-expired?orderNumber=${orderNumber}`,
        },
      };
    } else {
      //if order is not yet accepted or uploaded receipt to
      if (manualPaymentOptionToShow) {
        return {
          props: {
            selectedManualPaymentOption: manualPaymentOptionToShow,
            manualPaymentOptionList:
              paymentOptionsResData.manualPaymentOptionList,
            orderInfo: {
              orderNumber: orderNumber,
              grandTotal: orderStatusResData.grandTotal,
              orderStatus: orderStatusResData.orderStatus,
              orderId: orderStatusResData.orderId,
            },
          },
        };
      } else {
        //no manual payment options
        console.log({ notFound: orderStatusResData });
        return { notFound: true };
      }
    }
  } catch (error) {
    console.log("error", error);
    return { notFound: true };
  }
}

export default ManualPaymentInfoScreen;
