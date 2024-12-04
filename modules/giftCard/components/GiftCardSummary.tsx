import PaymentOptionsRadioButton from "modules/rewards/components/common/PaymentOptionsRadioButtons";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { Button } from "react-vant";

const GiftCardSummary = ({
  register,
  watch,
  setValue,
  errors,
  clearErrors,
  getValues,
  onSubmit,
  currency,
}: any) => {
  const { t } = useTranslation();

  const paymentMethodOptions = [
    {
      id: "1",
      name: "E-Wallet",
      value: "WA",
    },
    {
      id: "2",
      name: "Credit/Debit Card",
      value: "CC",
    },
    {
      id: "3",
      name: "Bank Transfer",
      value: "DD",
    },
  ];

  return (
    <div className="flex flex-col lg:m-5 bg-white rounded-xl border-solid px-6 border-[#CDD5DF]">
      <h3 className="text-2xl mb-4">Order Summary</h3>
      <div className="flex flex-col divide-y-2">
        <div className="h-full w-full overflow-hidden rounded-xl shadow-lg border-[#E3E8EF]">
          <div className="w-full h-[300px] relative">
            <Image
              alt="image"
              priority={true}
              layout="fill"
              objectFit="cover"
              src={process.env.BUCKET_URL + getValues("image")}
            />
          </div>
          <div className="flex flex-col my-[30px] mx-8 lg:mx-[55px] items-start justify-center">
            <label className="text-sm text-[#697586]">
              From: {watch("senderName")}
            </label>
            <h1 className="text-xl">{watch("giftCardTitle")}</h1>
            <p className="text-[#697586]">{watch("giftCardMessage")}</p>
            <h1 className="text-2xl text-[#008CDC]">
              Here’s a {currency} {getValues("giftCardAmount")} gift voucher
            </h1>
          </div>
        </div>
        <>
          <div className="flex my-5 justify-between">
            <p className="m-0 mt-5">{getValues("giftCardTemplateTitle")}</p>
            <p className="m-0 mt-5">x{watch("giftCardQuantity")}</p>
            <p className="m-0 mt-5">
              {currency} {watch("totalAmount")}
            </p>
          </div>
          <div>
            <PaymentOptionsRadioButton
              isLoading={false}
              paymentMethodOptions={paymentMethodOptions}
              clearErrors={clearErrors}
              setValue={setValue}
              register={register}
              errors={errors}
              watch={watch}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex my-3 justify-between">
              <h3 className="text-[18px] m-0">Total: </h3>
              <h3 className="text-[18px] m-0">
                {currency} {watch("totalAmount")}
              </h3>
            </div>
            <p className="text-sm">
              *By proceeding, you have agreed to the Terms of Service and
              Privacy Policy
            </p>
            <div className="m-6">
              <Button
                type="primary"
                style={{
                  borderRadius: 8,
                  width: "100%",
                  backgroundColor: "primary",
                }}
                onClick={onSubmit}
                loading={false}
                disabled={false}
                className="disabled:bg-[#EDEDED] disabled:text-[#9E9E9E] disabled:border-none"
              >
                {t("common:confirm")}
              </Button>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default GiftCardSummary;
