import { API, graphqlOperation } from "aws-amplify";
import { getCustomerVoucherList, getGiftCardDetail } from "@/graphql/queries";
import { generateVoucherQrCode } from "@/graphql/mutations";

export async function getListGiftCard({
  merchantId,
  customerId,
  filterType,
  voucherType,
}: {
  customerId: string;
  merchantId: string;
  filterType?: string;
  voucherType?: string;
}) {
  const {
    data: { getCustomerVoucherList: res },
  } = (await API.graphql(
    graphqlOperation(getCustomerVoucherList, {
      customerId,
      merchantId,
      filterType,
      voucherType,
    })
  )) as any;

  return {
    nextToken: res?.nextToken,
    list: res?.voucherList,
    total: res?.total,
  };
}

export async function getGiftCardDetailInfo({
  merchantId,
  voucherId,
}: {
  merchantId: string;
  voucherId: string;
}) {
  const {
    data: { getGiftCardDetail: res },
  } = (await API.graphql(
    graphqlOperation(getGiftCardDetail, {
      merchantId,
      voucherId,
    })
  )) as any;

  return res;
}

export async function generateQRCode({ voucherCode }: { voucherCode: string }) {
  const {
    data: { generateVoucherQrCode: res },
  } = (await API.graphql(
    graphqlOperation(generateVoucherQrCode, {
      // expiryDate,
      voucherCode,
      customerId: "public",
    })
  )) as any;
  return res;
}
