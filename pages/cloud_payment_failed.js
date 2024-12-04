import SEO from "@/components/seo/SEO";

const CloudPaymentFailed = () => {
  return (
    <>
      <SEO title="Payment Failed" keywords="" description="Payment Failed" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: "8px",
          height: "calc(100dvh - 92px)",
        }}
      >
        <h1 className="text-2xl my-0 font-geist font-medium">
          Your payment couldn't be processed, please try again.
        </h1>
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

export default CloudPaymentFailed;
