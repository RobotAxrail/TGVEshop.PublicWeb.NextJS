import { useContext } from "react";
import MerchantContext from "@/contexts/MerchantContext";
import Head from "next/head";
import { isQLEggs } from "@/utils/util";

const SEO = ({ keywords, description, title }) => {
  const merchantInfoContext = useContext(MerchantContext);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <meta charSet="utf-8" />
        <link rel="icon" href={merchantInfoContext?.favicon} />
        <title>
          {title +
            (isQLEggs(merchantInfoContext?.domain) ? ` | QL Eggs` : merchantInfoContext?.name ? ` | ${merchantInfoContext?.name}` : "")}
        </title>
      </Head>
    </>
  );
};

export default SEO;
