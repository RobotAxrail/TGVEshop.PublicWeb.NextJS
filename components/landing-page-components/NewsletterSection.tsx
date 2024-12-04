import MerchantContext from "@/contexts/MerchantContext";
import { createContactUsEnquiry } from "@/graphql/mutations";
import { setToastState } from "@/states/toastBarState";
import { useMutation } from "@tanstack/react-query";
import { API, graphqlOperation } from "aws-amplify";
import { useContext } from "react";

export type EventProps = {
  title: string;
  onClickSendEmail: (email: string) => void;
  backgroundImage: string;
};

export default function NewsletterSection({
  title,
  onClickSendEmail,
  backgroundImage,
}: EventProps) {
  const { merchantId } = useContext(MerchantContext);

  const { mutate, isLoading } = useMutation({
    mutationKey: ["Contact Us"],
    mutationFn: async (v: any) =>
      await API.graphql(graphqlOperation(createContactUsEnquiry, v)),
    onSuccess({ data }: any) {
      const isSuccess = data?.createContactUsEnquiry.status === "true";
      setToastState({
        message: isSuccess ? "Subscribed" : "Something went wrong",
        severity: isSuccess ? "success" : "error",
        show: true,
      });

      if (isSuccess) {
        const form = document.getElementById(
          "newsletter-form"
        ) as HTMLFormElement;
        form.reset();
      }
    },
  });

  async function onSubmit(e: any) {
    e.preventDefault();
    const value = ["email"].reduce(
      (p, c) => ({ ...p, [c]: e?.target[c]?.value }),
      {}
    );
    mutate({
      enquiry: `Subscribe Newsletter`,
      contactEmail: value["email"],
      contactName: value["email"],
      merchantId,
    });
  }
  return (
    <div
      className={`h-[360px] flex flex-col justify-center p-6 text-center relative`}
    >
      <img
        className="absolute top-0 left-0 h-full w-full object-cover"
        src={backgroundImage}
      />
      <div className="mx-auto text-xl md:text-3xl font-bold z-10">{title}</div>
      <div className="mt-12 mx-auto w-full lg:w-1/2 xl:w-1/2  z-10">
        <form
          className="h-16 w-full sm:pl-8 rounded-full bg-white shadow flex flex-col items-center space-y-8 sm:space-y-0 sm:flex-row sm:justify-between relative border"
          id="newsletter-form"
          onSubmit={onSubmit}
        >
          <input
            className="py-4 sm:py-2 outline-none px-4 md:px-2 text-lg text-gray-600 w-full bg-transparent"
            placeholder="yourmail@mail.com"
            disabled={isLoading}
            type="email"
            id="email"
            required
          />
          <div className="flex items-center md:pr-2">
            <button
              className="inline-flex min-w-[150px] rounded-full bg-red-600 px-[16px] py-[10px] text-base font-semibold leading-7 text-white hover:bg-red-700 absolute right-0 md:right-2 w-full md:w-fit md:mt-0 mt-3 text-center"
              disabled={isLoading}
              type="submit"
            >
              <div className="w-full">Send Email</div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
