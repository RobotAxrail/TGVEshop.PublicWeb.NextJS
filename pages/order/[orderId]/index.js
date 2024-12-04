import React, { useState, useContext, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
//API
import { API, graphqlOperation, withSSRContext } from "aws-amplify";
import { getCustomerOrderDetailList, getOrderInvoice } from "@/graphql/queries";
import { createOrderReview, createProductReview } from "@/graphql/mutations";

// rest api
import { getMerchantData } from "../../../apis/merchant";

// components
const OrderDetails = dynamic(() => import("@/components/orders/OrderDetails"));
import WarungOrderDetails from "@/components/orders/ewarung/WarungOrderDetails";
import SEO from "@/components/seo/SEO";

import Cookies from "universal-cookie";
import { setToastState } from "@/states/toastBarState";
import { getDomainForSSR } from "@/utils/util";
// contexts
import MerchantContext from "@/contexts/MerchantContext";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { fetchOrderDetail } from "../../../apis/getCustomerOrderDetail";

import { StoreTypes } from "@/enums/enums";

const OrderDetailScreen = (props) => {
  const merchantInfoContext = useContext(MerchantContext);
  const cookie = new Cookies();
  const router = useRouter();
  const [allowedToFetch, setAllowedToFetch] = useState(false);
  const { data } = useQuery(
    ["orderDetails"],
    () =>
      fetchOrderDetail(
        cookie?.get("signIn")?.accessToken || "",
        router.query.orderId,
        props.domain,
        merchantInfoContext.merchantId
      ),
    {
      refetchInterval: 30000,
      enabled: allowedToFetch,
    }
  );

  useEffect(() => {
    if (data?.order && data?.order.status === "Order Completed")
      setAllowedToFetch(false);
    else setAllowedToFetch(true);
  }, [data?.order.status]);

  const { invoiceObj, orderDataObj } = props;

  const [orderObj, setOrderObj] = useState(orderDataObj);
  const [printModalState, setPrintModalState] = useState({});
  const [formValues, setFormValues] = useState({ review: "" });
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [openItemReviewModal, setOpenItemReviewModal] = useState(false);
  const [selectedItemToReview, setSelectedItemToReview] = useState({});

  const { storeType } = useContext(MerchantContext);
  const isWarung = storeType === StoreTypes.WARUNG_STORETYPE;

  const onPrintInvoice = () => {
    setPrintModalState({
      show: true,
      title: "Print Invoice",
      content: invoiceObj,
    });
  };

  const handleClose = (type) => {
    if (type === "order") {
      setOpenReviewModal(false);
      setFormValues({ review: "" }); // clear data
    } else {
      setOpenItemReviewModal(false);
      setFormValues({ review: "", rating: 1 }); // clear data
    }
  };

  const handleSubmitOrderReview = async () => {
    try {
      const cookie = new Cookies();
      let params = {
        customerId: cookie.get("sessionId"),
        attachment: "",
        comment: formValues.review,
        orderId: data.order.orderId,
      };
      let res = await API.graphql(graphqlOperation(createOrderReview, params));
      if (res.data.createOrderReview.status === "true") {
        handleClose("order");
        setToastState({
          show: true,
          severity: "success",
          message: "Review has been submitted.",
        });
      } else {
        setToastState({
          show: true,
          severity: "error",
          message:
            "Something went wrong. Unable to submit review, please try again",
        });
      }
    } catch (error) {}
  };

  const handleSubmitItemReview = async () => {
    try {
      const cookie = new Cookies();
      let params = {
        rating: formValues.rating,
        comment: formValues.review,
        orderDetailId: selectedItemToReview.orderDetailId,
        reviewAsAnonymous: formValues.reviewAsAnonymous,
      };

      let res = await API.graphql(
        graphqlOperation(createProductReview, params)
      );
      if (res.data.createProductReview.status === "true") {
        handleClose("item");
        setToastState({
          show: true,
          severity: "success",
          message: "Review has been submitted.",
        });
        setOrderObj({
          ...orderObj,
          orderDetails: orderObj.orderDetails.map((item) => {
            if (item.orderDetailId === selectedItemToReview.orderDetailId) {
              return { ...item, hasReviewed: true };
            } else {
              return item;
            }
          }),
        });
      } else {
        setToastState({
          show: true,
          severity: "error",
          message:
            "Something went wrong. Unable to submit review, please try again",
        });
      }
    } catch (error) {}
  };

  return (
    <>
      <SEO title="Order Detail" keywords="" description="Order Detail" />
      {!isWarung ? (
        <OrderDetails
          orderDetail={data?.orderDetails}
          order={data?.order}
          printModalState={printModalState}
          onPrintInvoice={onPrintInvoice}
          setFormValues={setFormValues}
          formValues={formValues}
          handleSubmitOrderReview={handleSubmitOrderReview}
          openReviewModal={openReviewModal}
          setOpenReviewModal={setOpenReviewModal}
          // item review props
          openItemReviewModal={openItemReviewModal}
          setOpenItemReviewModal={setOpenItemReviewModal}
          selectedItemToReview={selectedItemToReview}
          setSelectedItemToReview={setSelectedItemToReview}
          handleSubmitItemReview={handleSubmitItemReview}
        />
      ) : (
        <WarungOrderDetails
          order={data.order}
          orderDetail={data.orderDetails}
        />
      )}
    </>
  );
};

export default OrderDetailScreen;

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();

  const { domain } = getDomainForSSR(context);
  let signInInfo = context.req.cookies["signIn"];

  //commented out dependency props due to difference in values from server and frontend causing it to not query the cached api and client will get undefined on initial load instead of data
  await queryClient.prefetchQuery(
    [
      "orderDetails",
      // {
      //   accessToken:
      //     signInInfo !== undefined ? JSON.parse(signInInfo).accessToken : "",
      //   orderId: context.params.orderId,
      //   merchantId: merchantId,
      // },
    ],
    () =>
      fetchOrderDetail(
        signInInfo !== undefined ? JSON.parse(signInInfo).accessToken : "",
        context.params.orderId,
        domain
      )
  );
  const checkHasOrderDetail = queryClient.getQueryData([
    "orderDetails",
    // {
    //   accessToken:
    //     signInInfo !== undefined ? JSON.parse(signInInfo).accessToken : "",
    //   orderId: context.params.orderId,
    //   merchantId: merchantId,
    // },
  ]);
  if (checkHasOrderDetail === null) return { notFound: true };

  try {
    var invoiceParams = {
      domain: domain,
      orderId: context.params.orderId,
    };
    const SSR = withSSRContext();
    const { data: invoiceResp } = await SSR.API.graphql(
      graphqlOperation(getOrderInvoice, invoiceParams)
    );

    let invoiceDataObj = {};
    if (invoiceResp.getOrderInvoice.status === "true")
      invoiceDataObj = invoiceResp.getOrderInvoice.order;

    return {
      props: {
        invoiceObj: invoiceDataObj,
        dehydratedState: dehydrate(queryClient),
        domain,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
