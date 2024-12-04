import { useAuth } from "@/contexts/AuthContext";
import MerchantContext from "@/contexts/MerchantContext";
import { placeGiftCardOrderToSQS } from "@/graphql/mutations";
import {
  getCustomerOrderPaymentMessage,
  getGiftCardTemplateList,
} from "@/graphql/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API, graphqlOperation } from "aws-amplify";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import { z } from "zod";

const getGiftCardList = async () => {
  try {
    const response: any = await API.graphql(
      graphqlOperation(getGiftCardTemplateList)
    );

    return response.data.getGiftCardTemplateList.giftCardTemplateList || [];
  } catch (error) {
    console.log("error fetching gift card list", error);
  }
};

const callPlaceGiftCard = async (params: any) => {
  try {
    const {
      data: { placeGiftCardOrderToSQS: res },
    }: any = await API.graphql(
      graphqlOperation(placeGiftCardOrderToSQS, params)
    );
    return res;
  } catch (error) {
    console.log("error fetching gift card list", error);
  }
};

const pollingPaymentMsg = async (messageId: string) => {
  try {
    const {
      data: { getCustomerOrderPaymentMessage: res },
    }: any = await API.graphql(
      graphqlOperation(getCustomerOrderPaymentMessage, {
        messageId,
      })
    );
    return res;
  } catch (error) {
    return false;
  }
};

const schema = z.object({
  giftCardQuantity: z.preprocess(
    (a) => parseInt(a as string, 10),
    z
      .number({
        invalid_type_error: "Please enter a valid number",
        required_error: "Please enter a valid number",
      })
      .positive()
      .int()
      .min(1, "Minimum 1 gift card")
      .max(100, "Maximum 100 gift cards")
  ),
  giftCardTemplateId: z.string().nonempty("Please select a gift card"),
  paymentMethod: z.string().nonempty("Please select a payment method"),
  giftCardAmount: z.preprocess(
    (a) => parseInt(a as string, 10),
    z.number().min(10, "Minimum gift card value is 10")
  ),
  totalAmount: z.number().min(10, "Minimum gift card value is 10"),
  giftCardTitle: z
    .string()
    .nonempty("Please enter a title")
    .refine((value) => {
      return value.length <= 30;
    }, "Maximum 30 characters"),
  giftCardMessage: z.string().nonempty("Please enter a message"),
  // .refine((value) => {
  //   return value?.split("").length <= 30;
  // }, "Maximum 30 words"),
  senderName: z.string().nonempty("Please enter a sender name"),
  image: z.string().nonempty("Please select an image"),
});

const useGiftCardController = () => {
  const { merchantId } = useContext(MerchantContext);
  const cookie = new Cookies();
  const signInData = cookie.get("signIn");
  const { user } = useAuth();
  const [openModal, setOpenModal] = React.useState(false);
  const [openRedeemModal, setOpenRedeemModal] = React.useState(false);
  const [redirectingToGateway, setRedirectingToGateway] = useState(false);

  const onSubmit = async (data: any) => {
    setRedirectingToGateway(true);
    const payload = {
      accessToken: signInData?.accessToken || "",
      merchantId: merchantId,
      giftCardTemplateId: data.giftCardTemplateId,
      giftCardQuantity: data.giftCardQuantity,
      giftCardAmount: data.giftCardAmount,
      giftCardTitle: data.giftCardTitle,
      giftCardMessage: data.giftCardMessage,
      paymentMethod: data.paymentMethod,
      senderName: data.senderName,
      customerFirstName: user.firstName,
      customerLastName: user.lastName,
      customerMobileNo: user.mobileNo,
      email: user.primaryEmail,
      platform: "publicWeb",
    };
    mutatePlaceGiftCard(payload);
  };

  const {
    handleSubmit,
    setValue,
    getValues,
    register,
    formState: { errors },
    watch,
    clearErrors,
  } = useForm({
    defaultValues: {
      giftCardTemplateId: "",
      giftCardQuantity: 1,
      giftCardAmount: 10,
      giftCardTitle: "",
      giftCardMessage: "",
      paymentMethod: "",
      senderName: "",
      totalAmount: 10,
      giftCardTemplateTitle: "",
      image: "",
    },
    resolver: zodResolver(schema),
  });

  const [messageId, setMessageId] = useState<string>("");

  const { data: listOfGiftCards, isFetched: listGiftCardIsFetched } = useQuery({
    queryKey: ["giftCardList"],
    queryFn: getGiftCardList,
    refetchOnWindowFocus: false,
  });

  const { mutate: mutatePlaceGiftCard } = useMutation({
    mutationKey: ["callPlaceGiftCard"],
    mutationFn: callPlaceGiftCard,
    onSuccess: (response: any) => {
      if (response.status === "true" && response.messageId) {
        setMessageId(response.messageId);
      }
    },
    onError: (error: string) => {
      setRedirectingToGateway(false);
    },
  });

  useQuery({
    queryKey: ["getCustomerOrderPaymentMessage"],
    queryFn: () => {
      return pollingPaymentMsg(messageId);
    },
    enabled: messageId !== "",
    refetchOnWindowFocus: false,
    refetchInterval: messageId !== "" ? 2000 : false,
    onSuccess: (response: any) => {
      if (response?.gatewayPaymentUrl) {
        setMessageId("");
        const url = `${response.gatewayPaymentUrl}?${response.gatewayPaymentParams}`;
        window.location.assign(url);
      }
    },
    onError: (error: string) => {
      setRedirectingToGateway(false);
    },
  });

  return {
    getValues,
    listOfGiftCards,
    register,
    watch,
    setValue,
    clearErrors,
    errors,
    onSubmit: handleSubmit(onSubmit),
    setOpenModal,
    openModal,
    setOpenRedeemModal,
    openRedeemModal,
    redirectingToGateway,
    listGiftCardIsFetched,
  };
};

export default useGiftCardController;
