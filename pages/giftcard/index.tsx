import GiftCardSVG from "@/images/giftcard.svg";
import _ from "lodash";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  LoadingSpinner,
  ModalTransition,
} from "pages/checkout/components/common";
import { useContext, useRef } from "react";
import useGiftCardController from "./controllers/useGiftCardController";
import { withProtected } from "@/utils/routeProtection";
import MerchantContext from "@/contexts/MerchantContext";

const SEO = dynamic(import("@/components/seo/SEO"));
const GiftCardSummary = dynamic(
  import("../../modules/giftCard/components/GiftCardSummary")
);
const GiftCardSetup = dynamic(
  import("../../modules/giftCard/components/GiftCardSetup")
);

function NavigateToPaymentGatewayLoader({
  redirectingToGateway,
}: {
  redirectingToGateway: boolean;
}) {
  const { t } = useTranslation();
  return (
    <ModalTransition show={redirectingToGateway}>
      <div className="flex flex-row space-x-3">
        <LoadingSpinner />
        <p className="m-0 font-medium">{t("common:placing-order")}</p>
      </div>
    </ModalTransition>
  );
}

const GiftCard = () => {
  const {
    register,
    watch,
    setValue,
    errors,
    clearErrors,
    getValues,
    listOfGiftCards,
    onSubmit,
    redirectingToGateway,
    listGiftCardIsFetched,
  } = useGiftCardController();
  const { currency } = useContext(MerchantContext);
  const ref = useRef(null);
  const scrollTo = (re: any) => {
    setTimeout(() => {
      ref?.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 10);
  };

  return (
    <>
      <SEO title="Gift Card" keywords="" description="gift card" />

      <NavigateToPaymentGatewayLoader
        redirectingToGateway={redirectingToGateway}
      />
      <div className=" ">
        <div className="h-auto lg:h-[450px] bg-gradient-to-r from-[#0C3053] to-[#1D8AFB]">
          <div className="flex flex-col md:flex-row lg:mx-20 2xl:mx-[150px] justify-between relative">
            <div className="text-white flex flex-col items-start p-10 lg:px-0 w-full ">
              <h1 className="text-[24px] lg:text-[30px] m-0">
                Gift Card of Your Choice
              </h1>
              <p className="text-[14px] lg:text-[16px]">
                Spread happiness by giving gifts to friends, best friends or
                family that can be used to buy our product
              </p>
              <h1 className="text-[16px] lg:text-[18px] mt-[40px] mb-0">
                Ready to spread happiness?
              </h1>
              <p className="text-[14px] lg:text-[16px]">
                Select a gift card and complete your order. You’ll then get gift
                links you can send to your recipients personally.
              </p>
            </div>
            <>
              <div className="hidden lg:block lg:w-full lg:h-[450px] relative">
                <Image
                  alt="image"
                  priority={true}
                  layout="fill"
                  sizes="100vw"
                  objectFit="contain"
                  src={GiftCardSVG}
                />
              </div>
            </>
          </div>
        </div>
        <div className="relative z-10 bg-[#f0f0f0] py-10 mx-7 lg:mx-20 2xl:mx-[150px]">
          {!listGiftCardIsFetched && (
            <>
              {Array.from(Array(3)).map((_, index) => {
                return (
                  <div className="flex flex-col" key={index}>
                    <p className="animate-pulse bg-gray-400 w-1/3 h-[18px] lg:h-[18px] rounded-xl mt-0 mb-4"></p>
                    <div className="flex overflow-x-auto pb-10 scrollbar-hidden">
                      <div className="flex flex-nowrap ">
                        {Array.from(Array(5)).map(
                          (item: any, index: number) => {
                            return (
                              <div className="px-3 mt-1" key={index}>
                                <div className="animate-pulse bg-gray-400 w-[250px] h-[150px] rounded-xl "></div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
          {listGiftCardIsFetched && (
            <div className="flex flex-col">
              <h2 className="text-2xl mt-0 mb-6">Pick a greeting card</h2>

              {listOfGiftCards?.map((item: any) => {
                return (
                  <div className="flex flex-col" key={item.category}>
                    <p className="font-[500] text-[20px] mt-0 mb-4">
                      {_.startCase(_.toLower(item.category))}
                    </p>
                    <div className="flex overflow-x-auto pb-10 scrollbar-hidden">
                      <div className="flex flex-nowrap ">
                        {item?.giftCardTemplateList?.map((template, index) => {
                          return (
                            <div
                              className="inline-block px-3 mt-1"
                              key={template.giftCardTemplateId}
                            >
                              <div
                                className={`w-[250px] cursor-pointer h-[150px] max-w-xs overflow-hidden rounded-xl shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out ${
                                  watch("giftCardTemplateId") ===
                                  template.giftCardTemplateId
                                    ? "outline-2 outline-[#1D8AFB] outline"
                                    : ""
                                }`}
                                onClick={() => {
                                  setValue(
                                    "giftCardTemplateId",
                                    template.giftCardTemplateId
                                  );
                                  setValue(
                                    "giftCardTemplateTitle",
                                    template.title
                                  );
                                  setValue("giftCardTitle", template.title);
                                  setValue(
                                    "giftCardMessage",
                                    template.description
                                  );
                                  setValue("image", template.image);
                                  scrollTo(ref);
                                }}
                              >
                                <Image
                                  alt="image"
                                  priority={true}
                                  width={250}
                                  height={150}
                                  className={`rounded-lg`}
                                  src={process.env.BUCKET_URL + template.image}
                                />
                              </div>
                              <p className="text-center">{template.title}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {!_.isEmpty(getValues("giftCardTemplateId")) && (
            <div
              id="scroll-to"
              className={`grid gap-6 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-5 scroll-mt-[100px]`}
              ref={ref}
            >
              <div className="lg:col-span-1 2xl:col-span-3">
                <GiftCardSetup
                  register={register}
                  watch={watch}
                  errors={errors}
                  setValue={setValue}
                  currency={currency}
                />
              </div>
              <div className="lg:col-span-1 2xl:col-span-2">
                <GiftCardSummary
                  register={register}
                  setValue={setValue}
                  watch={watch}
                  errors={errors}
                  clearErrors={clearErrors}
                  getValues={getValues}
                  onSubmit={onSubmit}
                  currency={currency}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withProtected(GiftCard);
