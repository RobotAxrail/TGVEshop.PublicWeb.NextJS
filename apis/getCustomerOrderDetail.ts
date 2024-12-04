import { API, graphqlOperation } from "aws-amplify";
import { getCustomerOrderDetailList } from "@/graphql/queries";
import { GraphQLResult } from "@aws-amplify/api-graphql";

//response object is too big, if you have the time please help to replace the 'any' types with actual types.
interface OrderDetail {
  associatedProducts: Array<any>;
  comment: string;
  createdAt: string;
  createdBy: string;
  deliveryCompareAtPrice: number;
  deliveryPrice: number;
  deliveryPriceWithTax: number;
  fulfilledQuantity: number;
  isFreeItem: boolean;
  itemId: string;
  itemImage: string;
  itemIsVirtualGoods: boolean;
  itemProperty: string;
  itemSku: string;
  itemStatus: string;
  itemTitle: string;
  itemVariantName1: string;
  itemVariantName2: string;
  itemVariantName3: string;
  itemVariantValue1: string;
  itemVariantValue2: string;
  itemVariantValue3: string;
  mandatoryItem: boolean;
  manualPaymentReceipt: string;
  merchantId: string;
  orderDetailId: string;
  orderId: string;
  orderNumber: string;
  orderedQuantity: number;
  pickupCompareAtPrice: number;
  pickupPrice: number;
  pickupPriceWithTax: number;
  promoCode: string;
  promoCodeDiscount: number;
  rating: number;
  refundQuantity: number;
  selectedModifierGroups: Array<any>;
  subtotal: number;
  subtotalWithTax: number;
  totalDiscount: number;
  totalPromoCodeDiscount: number;
  totalVoucherDiscount: number;
  updatedAt: string;
  updatedBy: string;
  voucherDiscount: number;
  voucherNumber: string;
}

interface IOrderDetail {
  message: string;
  order: any;
  orderDetails: Array<OrderDetail>;
  status: string;
}

const fetchOrderDetail = async (
  accessToken: string,
  orderId: string,
  domain: string
) => {
  const response = (await API.graphql(
    graphqlOperation(getCustomerOrderDetailList, {
      accessToken: accessToken,
      orderId: orderId,
      domain: domain,
    })
  )) as GraphQLResult<{ getCustomerOrderDetailList: IOrderDetail }>;
  if (response.data.getCustomerOrderDetailList.status === "false") return null;
  // console.log({ data: response.data.getCustomerOrderDetailList });
  return response.data.getCustomerOrderDetailList;
};

export { fetchOrderDetail };
