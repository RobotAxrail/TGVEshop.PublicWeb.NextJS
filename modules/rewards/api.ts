import {
  acceptRejectVoucher,
  generateVoucherQrCode,
  redeemVoucherByPoints,
  shareVoucher
} from "@/graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import {
  getMerchantVoucherList,
  getCustomerVoucherList,
  getStampingCampaignList,
} from "@/graphql/queries";
import dateJS from "dayjs";

// Queries

export async function getStampingList({
  customerId,
  merchantId,
  nextToken,
  filter,
  limit,
  sort,
}: {
  customerId: string;
  merchantId: string;
  nextToken?: string;
  limit: number;
  filter?: any;
  sort?: any;
}) {
  const {
    data: { getStampingCampaignList: res },
  } = (await API.graphql(
    graphqlOperation(getStampingCampaignList, {
      customerId,
      merchantId,
      nextToken,
      filter,
      limit,
      sort,
    })
  )) as any;

  return {
    list: res?.stampingCampaignList,
    nextToken: res?.nextToken,
    total: res?.total,
  };
}

export async function getMyVoucherList({
  merchantId,
  customerId,
  filterType
}: {
  customerId: string;
  merchantId: string;
  filterType?: string
}) {
  const {
    data: { getCustomerVoucherList: res },
  } = (await API.graphql(
    graphqlOperation(getCustomerVoucherList, {
      customerId,
      merchantId,
      filterType
    })
  )) as any;

  return {
    nextToken: res?.nextToken,
    list: res?.voucherList,
    total: res?.total,
  };
}

export async function getMerchVoucherList({
  requiredPoints = true,
  merchantId,
  nextToken,
  filter,
  limit,
  sort,
}: {
  requiredPoints: boolean;
  merchantId: string;
  nextToken?: string;
  limit: number;
  filter?: any;
  sort?: any;
}) {
  const {
    data: { getMerchantVoucherList: res },
  } = (await API.graphql(
    graphqlOperation(getMerchantVoucherList, {
      requiredPoints,
      merchantId,
      nextToken,
      filter,
      limit,
      sort,
    })
  )) as any;

  return {
    nextToken: res?.nextToken,
    list: res?.voucherList,
    total: res?.total,
  };
}

// Mutations
export async function generateQRCode({
  voucherCode,
  customerId,
}: {
  voucherCode: string;
  customerId: string;
}) {
  const expiryDate = dateJS().add(5, "minutes").toISOString();
  const {
    data: { generateVoucherQrCode: res },
  } = (await API.graphql(
    graphqlOperation(generateVoucherQrCode, {
      expiryDate,
      voucherCode,
      customerId,
    })
  )) as any;
  return res;
}

export async function redeemVoucherWithPoints({
  merchantId,
  customerId,
  voucherId,
}: {
  customerId: string;
  voucherId: string;
  merchantId: string;
}) {
  const {
    data: { redeemVoucherByPoints: res },
  } = (await API.graphql(
    graphqlOperation(redeemVoucherByPoints, {
      merchantId,
      customerId,
      voucherId,
    })
  )) as any;
  return res;
}

export async function shareMyVoucher({
  customerId,
  quantity,
  receiverContactType,
  receiverEmail,
  receiverNumber,
  voucherCode,
}: {
  customerId: string;
  quantity: number;
  receiverContactType: string;
  receiverEmail?: string;
  receiverNumber?: string;
  voucherCode: string;
}) {
  const {
    data: { shareVoucher: res },
  } = (await API.graphql(
    graphqlOperation(shareVoucher, {
      customerId,
      quantity,
      receiverContactType,
      receiverEmail,
      receiverNumber,
      voucherCode,
    })
  )) as any;
  return res;
}

export async function acceptOrRejectVoucher({
  action,
  confirmationDate,
  customerId,
  voucherCode,
}: {
  action: string,
  confirmationDate: string,
  customerId: string;
  voucherCode: string;
}) {
  const {
    data: { acceptRejectVoucher: res },
  } = (await API.graphql(
    graphqlOperation(acceptRejectVoucher, {
      action,
      confirmationDate,
      customerId,
      voucherCode,
    })
  )) as any;
  return res;
}