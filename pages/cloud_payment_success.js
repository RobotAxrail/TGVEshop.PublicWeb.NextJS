import SEO from "@/components/seo/SEO";

const CloudPaymentSuccess = () => {
  return (
    <>
      <SEO title="Payment Succcess" keywords="" description="Payment Success" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: "4px",
          height: "calc(100dvh - 92px)",
        }}
      >
        <h1 className="text-2xl my-0 font-geist font-medium">
          The payment is successful!
        </h1>
        <p className="text-base font-geist m-0 mb-4 text-neutral-700">
          Kindly check your email for the payment receipt
        </p>
        <a
          href="https://wa.me/60106633068"
          className="text-base text-blue-600 font-geist no-underline"
        >
          Click here to return to the chat
        </a>
      </div>
    </>
  );
};

export default CloudPaymentSuccess;
