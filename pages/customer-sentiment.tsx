import React, { useEffect, useState, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import Custom404 from "./404";

// Components
import FeedbackModal from "@/components/feedback/FeedbackModal";
import SEO from "@/components/seo/SEO";

//API
import { API, graphqlOperation } from "aws-amplify";
import { submitCustomerFeedbackSurvey } from "@/graphql/mutations";

// utils
import Cookies from "universal-cookie";
import { withProtected } from "@/utils/routeProtection";
import { createCookieForSignInData, isLocalHost } from "@/utils/util";
// context
import MerchantContext from "@/contexts/MerchantContext";

import { setToastState } from "@/states/toastBarState";

const CustomerSentimentScreen = () => {
    const merchantInfoContext = useContext(MerchantContext);

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [validUser, setValidUser] = useState(true)
    const { query } = router;

    const { t } = useTranslation("common");

    const [formValues, setFormValues] = useState({
      rating: null,
      additionalFeedback: "",
      accessToken: "",
    });
    const [submitted, setSubmitted] = useState(false);

    function checkFeedbackId() {
      if (!!query?.feedbackId) {
        return true;
      }
      return false;
    }

    const handleSubmitFeedback = async () => {
      const cookie = new Cookies();
      setIsLoading(true);
      if (checkFeedbackId()) {
        try {

          const issueClosed = query?.issueClosed || "";

          var params = {
            ...formValues,
            accessToken: cookie.get("signIn")?.accessToken,
            feedbackId: query?.feedbackId || "",
            ...(issueClosed && { issueClosed: issueClosed === "true" }),
          };
          if (isLocalHost()) {
            params["merchantId"] = merchantInfoContext.merchantId;
          }

          const submitFeedbackRes: any = await API.graphql(
            graphqlOperation(submitCustomerFeedbackSurvey, params)
          );

          setToastState({
            show: true,
            severity:
              submitFeedbackRes.data.submitCustomerFeedbackSurvey.status ===
              "true"
                ? "success"
                : "error",
            message:
              submitFeedbackRes.data.submitCustomerFeedbackSurvey.message,
          });

          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setIsLoading(false);
          setSubmitted(true);
        } catch (error) {
          console.log(error);
          setToastState({
            show: true,
            severity: "error",
            message: "Something went wrong. Please try again later",
          });
          setIsLoading(false);
        }
      } else {
        setToastState({
          show: true,
          severity: "error",
          message: "Feedback id not found.",
        });
      }
    };

    return (
        <>
         <SEO title={t("Feedback")} keywords="" description="Feedback" />
         {!validUser ? (
        <   Custom404 showButton={false} />
        ): (
          <div className="min-w-full flex justify-center">
            <FeedbackModal 
              formValues={formValues}
              setFormValues={setFormValues}
              handleSubmitFeedback={handleSubmitFeedback}
              isLoading={isLoading}
              submitted={submitted}
            />
          </div>
        )}
        </>
    )


}

CustomerSentimentScreen.title = "Feedback";
export default withProtected(CustomerSentimentScreen);