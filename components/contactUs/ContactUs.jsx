import DynamicRenderer from "../DynamicRenderer/DynamicRenderer";
import ContactUsForm2 from "./variants/ContactUsForm2";
import ContactUsForm1 from "./variants/ContactUsForm1";
import { Fragment, useState, useContext } from "react";
import EWarungFooter from "../footer/EwarungFooter";
import { FiPhoneCall, FiMail, FiMapPin } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";

// contexts
import MerchantContext from "@/contexts/MerchantContext";

//apis
import { fetchStoreInformation } from "@/apis/getStoreInformation";

// component
import Map from "./Map";

// style
import classes from "./ContactUs.module.scss";

// utils
import { isValidEmail } from "@/utils/util";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";

const ContactUsFormTLM = dynamic(() => import("./variants/ContactUsFormTLM"));

// validate input, return true if it is invalid
const validateInput = (
  value,
  condition,
  errorMessage,
  currentMessage,
  setErrorMessage
) => {
  if (value.trim() === "" || condition) {
    setErrorMessage(errorMessage);
    return true;
  } else if (currentMessage !== "") {
    setErrorMessage("");
  }
  return false;
};

const ContactUs = (props) => {
  const {
    layout,
    contactUsRichText,
    stores,
    isEnableEnquiry,
    input,
    setInput,
    handleFormSubmit,
  } = props;
  const [onSubmit, setOnSubmit] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [enquiryErrorMessage, setEnquiryErrorMessage] = useState("");
  const merchantInfoContext = useContext(MerchantContext);
  const { t } = useTranslation("common");

  const fetchStoreInfoPayload = {
    merchantId: merchantInfoContext.merchantId,
  };

  const { data, isLoading, error } = useQuery(
    ["storeInformation"],
    () => fetchStoreInformation(fetchStoreInfoPayload),
    {
      enabled: merchantInfoContext.storeType === "warung",
      refetchInterval: 30000,
    }
  );

  const checkInput = () => {
    // disable inputs and button
    setOnSubmit(true);
    // check input
    const checkName = validateInput(
      input.name,
      !(3 <= input.name.length && input.name.length <= 32),
      t("Name must be between"),
      nameErrorMessage,
      setNameErrorMessage
    );
    const checkEmail = validateInput(
      input.email,
      !isValidEmail(input.email),
      t("E-Mail Address does not"),
      emailErrorMessage,
      setEmailErrorMessage
    );
    const checkEnquiry = validateInput(
      input.enquiry,
      !(10 <= input.enquiry.length && input.enquiry.length <= 3000),
      t("Enquiry must be between"),
      enquiryErrorMessage,
      setEnquiryErrorMessage
    );

    if (checkName || checkEmail || checkEnquiry) {
      setOnSubmit(false);
      return;
    } else {
      handleFormSubmit();
      setOnSubmit(false);
    }
  };
  const onInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      {merchantInfoContext.storeType !== "warung" ? (
        <div className="mt-5 mx-2">
          <DynamicRenderer
            structure={layout}
            componentMap={{
              ContactUs1: ContactUsForm1,
              ContactUs2: ContactUsForm2,
              ContactUsFormTLM,
              Map: MapWrapper,
              RichText,
              Header,
            }}
            dynamicProps={{
              RichText: { contactUsRichText },
              ContactUsFormTLM: {
                handleFormSubmit,
                isEnableEnquiry,
                onInputChange,
                onSubmit,
              },
              Map: { stores },
              ContactUs2: {
                handleFormSubmit,
                isEnableEnquiry,
                onInputChange,
                onSubmit,
              },
              ContactUs1: {
                enquiryErrorMessage,
                emailErrorMessage,
                nameErrorMessage,
                isEnableEnquiry,
                onInputChange,
                checkInput,
                onSubmit,
                classes,
                input,
              },
            }}
          />
        </div>
      ) : (
        <div className="flex flex-col justify-between">
          <div className="p-5 mb-10 h-screen">
            <h1>{t("Contact Us")}</h1>
            <div className="text-left flex flex-row">
              <div className="bg-opacity-100 bg-primary p-3 h-10 rounded">
                <FiPhoneCall
                  className="mb-2"
                  style={{ stroke: "white", fontSize: "1.2rem" }}
                ></FiPhoneCall>
              </div>
              <p className="ml-2 mt-2 text-[18px]">{data?.smsMobileNo}</p>
            </div>
            {!(data?.email === "default@email.com") ? (
              <div className="text-left flex flex-row">
                <div className="bg-opacity-100 bg-primary p-3 h-10 rounded">
                  <FiMail
                    className="mb-2"
                    style={{ stroke: "white", fontSize: "1.2rem" }}
                  ></FiMail>
                </div>
                <p className="ml-2 mt-2 text-[18px]">{data?.email}</p>
              </div>
            ) : null}

            <div className="text-left flex flex-row">
              <div className="bg-opacity-100 bg-primary p-3 h-10 rounded">
                <FiMapPin
                  className="mb-2"
                  style={{ stroke: "white", fontSize: "1.2rem" }}
                ></FiMapPin>
              </div>
              <p className="ml-2 mt-2 text-[18px]">{data?.address}</p>
            </div>
            <MapWrapper></MapWrapper>
          </div>
          <div className="order-last">
            <EWarungFooter></EWarungFooter>
          </div>
        </div>
      )}
    </Fragment>
  );
};

function RichText({ contactUsRichText }) {
  return <div dangerouslySetInnerHTML={{ __html: contactUsRichText }} />;
}

function MapWrapper({ stores }) {
  return (
    <div className="my-16">
      {stores?.length > 0 && (
        <div className="my-4">
          <Map stores={stores} />
        </div>
      )}
    </div>
  );
}

function Header() {
  const { t } = useTranslation("common");
  return <h1 className="text-[30px] font-semibold pb-5">{t("Contact Us")}</h1>;
}

export default ContactUs;
