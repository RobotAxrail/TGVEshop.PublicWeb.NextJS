import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

// component
import ContactUs from "@/components/contactUs/ContactUs";
import SEO from "@/components/seo/SEO";

// API
import { API, graphqlOperation, withSSRContext } from "aws-amplify";
import { fetchContactUsInfo } from "@/apis/getContactUsInfo";
import { createContactUsEnquiry } from "@/graphql/mutations";
// rest api
import { getMerchantData } from "../apis/merchant";

// content
import { setToastState } from "@/states/toastBarState";
import Cookies from "universal-cookie";

// context
import MerchantContext from "@/contexts/MerchantContext";
import { getDomainForSSR } from "@/utils/util";

// contact us page
const ContactUsScreen = ({ layout }) => {
  const merchantInfoContext = useContext(MerchantContext);
  const cookie = new Cookies();

  const [input, setInput] = useState({
    name: "",
    email: "",
    enquiry: "",
  });

  // handle form submit
  const handleFormSubmit = async () => {
    try {
      var params = {
        contactEmail: input.email,
        contactName: input.name,
        enquiry: input.enquiry,
      };
      const res = await API.graphql(
        graphqlOperation(createContactUsEnquiry, params)
      );
      // clear inputs
      setInput({
        name: "",
        email: "",
        enquiry: "",
      });

      if (res && res.data.createContactUsEnquiry.status === "true") {
        setToastState({
          show: true,
          severity: "success",
          message: res.data.createContactUsEnquiry.message,
        });
      } else {
        setToastState({
          show: true,
          severity: "error",
          message: res.data.createContactUsEnquiry.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchContactUsPayload = {
    merchantId: merchantInfoContext.merchantId,
  };

  const { data, isLoading, error } = useQuery(
    ["contactUsInfo"],
    () => fetchContactUsInfo(fetchContactUsPayload),
    {
      enabled: merchantInfoContext.storeType !== "warung",
      refetchInterval: 30000,
    }
  );

  return (
    <>
      <SEO title="Contact Us" keywords="" description="Contact Us" />
      <ContactUs
        layout={layout}
        stores={
          data?.storeList
            ? data.storeList
            : []
        }
        contactUsRichText={data?.contactUsContent}
        isEnableEnquiry={data?.contactUsFormEnabled}
        input={input}
        setInput={setInput}
        handleFormSubmit={handleFormSubmit}
      />
    </>
  );
};

export default ContactUsScreen;

export async function getServerSideProps(context) {
  const { domain, shopId } = getDomainForSSR(context);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ECS_API_ENDPOINT}/getLayout`,
    {
      headers: { "Content-Type": "application/json" },
      referrerPolicy: "no-referrer",
      credentials: "same-origin",
      redirect: "follow",
      cache: "no-cache",
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        merchantId: domain,
        pageType: "contact-us",
      }),
    }
  );

  const { body, statusCode } = await response.json();
  let res = body.layout;
  // Return s the default layout if no layout is found
  if (statusCode !== 200)
    res = [
      {
        sectionName: "RichText",
        isFullWidth: false,
        sectionStyles: "",
        children: [
          {
            gridStyles: "col-span-12",
            blockType: "Header",
            blockProps: {},
          },
          {
            gridStyles: "col-span-12",
            blockType: "RichText",
            blockProps: {},
          },
        ],
      },
      {
        sectionName: "Map",
        isFullWidth: false,
        sectionStyles: "",
        children: [
          {
            gridStyles: "col-span-12",
            blockType: "Map",
            blockProps: {},
          },
        ],
      },
      {
        sectionName: "Contact Us Form",
        isFullWidth: false,
        sectionStyles: "",
        children: [
          {
            blockType: "ContactUs1",
            gridStyles: "col-span-12 mt-10",
            blockProps: {},
          },
        ],
      },
    ];

  return {
    props: {
      layout: res,
    },
  };
}
