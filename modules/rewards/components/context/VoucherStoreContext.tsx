import { addUpdateDeleteVoucherCart } from "@/graphql/mutations";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCustomerVoucherCart } from "@/graphql/queries";
import MerchantContext from "@/contexts/MerchantContext";
import { API, graphqlOperation } from "aws-amplify";
import { createContext, ReactElement, useCallback, useContext } from "react";
import Cookies from "universal-cookie";
import { setToastState } from "@/states/toastBarState";
import { StoreTypes } from "@/enums/enums";

const VoucherStoreContext = createContext<{
  voucherIsInCart: (voucherId: string) => boolean;
  getVoucher: (voucherId: string) => TVoucher;
  voucherCart: TVoucher[];
  isLoading: boolean;
  isUpdating: boolean;
  refetchCart: () => void;
  updateVoucherCart: ({
    voucherPrice,
    voucherId,
    quantity,
  }: {
    voucherPrice?: number;
    voucherId: string;
    quantity: number;
  }) => void;
}>({} as any);

export default function useVoucherCart() {
  return useContext(VoucherStoreContext);
}

type TUpdateCart =
  | {
      voucherPrice: number;
      voucherQuantity: number;
      merchantId: string;
      customerId: string;
      voucherId: string;
      action: "CREATE";
    }
  | {
      voucherCartId: string;
      voucherId: string;
      voucherPrice: number;
      voucherQuantity: number;
      action: "UPDATE";
    }
  | {
      voucherCartId: string;
      action: "DELETE";
    };

type TVoucher = {
  voucherImage: string;
  voucherTitle: string;
  voucherCartId: string;
  createdAt: string;
  customerId: string;
  merchantId: string;
  voucherId: string;
  voucherPrice: number;
  voucherQuantity: number;
  voucherTotalPrice: number;
};

export function VoucherStoreProvider({ children }: { children: ReactElement }) {
  const { merchantId, storeType } = useContext(MerchantContext);
  const cookie = new Cookies();
  const customerId = (cookie.get("signIn") as any)?.customerId;
  const {
    data: voucherCart,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () => await getVoucherCart({ customerId, merchantId }),
    queryKey: ["fetchVoucherCart"],
    enabled:
      Boolean(customerId) && storeType !== StoreTypes.WHATSAPP_CRM_STORETYPE,
  });
  const { mutate, isLoading: isUpdating } = useMutation({
    mutationFn: (props: TUpdateCart) => updateCart(props),
    mutationKey: ["updateVoucherCart"],
    onSuccess(data, variables) {
      if (data?.status === "true") {
        refetch();
        setToastState({
          severity: "success",
          show: true,
          message: {
            DELETE: "Voucher removed from cart.",
            UPDATE: "Voucher quantity is updated.",
            CREATE: "Voucher added to cart",
          }[variables?.action],
        });
      } else {
        setToastState({
          message: "An error has occured while updating voucher cart.",
          severity: "error",
          show: true,
        });
      }
    },
  });

  function updateVoucherCart({
    voucherPrice,
    voucherId,
    quantity,
  }: {
    voucherPrice?: number;
    voucherId: string;
    quantity: number;
  }) {
    const isInCart = voucherIsInCart(voucherId);
    if (quantity === 0 && isInCart) {
      const voucher = getVoucher(voucherId);
      mutate({ action: "DELETE", voucherCartId: voucher?.voucherCartId });
    } else if (quantity > 0 && isInCart) {
      const voucher = getVoucher(voucherId);
      mutate({
        voucherCartId: voucher?.voucherCartId,
        voucherPrice: voucher?.voucherPrice,
        voucherQuantity: quantity,
        action: "UPDATE",
        voucherId,
      });
    } else if (quantity > 0 && !isInCart) {
      mutate({
        voucherQuantity: quantity,
        action: "CREATE",
        voucherPrice,
        merchantId,
        customerId,
        voucherId,
      });
    }
  }

  const getVoucher = useCallback(
    (voucherId: string) =>
      voucherCart?.filter(({ voucherId: id }) => id === voucherId)[0],
    [voucherCart]
  );

  const voucherIsInCart = useCallback(
    (voucherId: string) =>
      voucherCart?.filter(({ voucherId: id }) => id === voucherId)?.length > 0,
    [voucherCart]
  );

  return (
    <VoucherStoreContext.Provider
      value={{
        refetchCart: refetch,
        voucherCart,
        updateVoucherCart,
        getVoucher,
        voucherIsInCart,
        isUpdating,
        isLoading,
      }}
    >
      {children}
    </VoucherStoreContext.Provider>
  );
}

async function updateCart(props: TUpdateCart) {
  const {
    data: { addUpdateDeleteVoucherCart: res },
  } = (await API.graphql(
    graphqlOperation(addUpdateDeleteVoucherCart, props)
  )) as any;
  return res;
}

async function getVoucherCart(props: {
  merchantId: string;
  customerId: string;
}) {
  const {
    data: {
      getCustomerVoucherCart: { voucher },
    },
  } = (await API.graphql(graphqlOperation(getCustomerVoucherCart, props))) as {
    data: { getCustomerVoucherCart: { voucher: TVoucher[] } };
  };

  return voucher || [];
}
