import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useTranslation from 'next-translate/useTranslation';
// contexts
import MerchantContext from "@/contexts/MerchantContext";

// API
import { API, graphqlOperation } from "aws-amplify";
import { getStoreInformation } from "@/graphql/queries";
import { isLocalHost } from "@/utils/util";

// image
import appStore from "@/images/download-app-store.svg";
import googlePlay from "@/images/google-play-badge.svg";
// icons library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faYoutube,
  faInstagram,
  faTiktok,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { legalPoliciesType } from "@/enums/enums";

// utils
import { isDateBetween } from "@/utils/util";

const legalPolicyMappingList = [
  {
    type: "Privacy",
    name: "Privacy Policy",
    link: "/policy/privacy",
  },
  {
    type: "Refund",
    name: "Refund Policy",
    link: "/policy/refund",
  },
  {
    type: "Terms Of Service",
    name: "Terms of Service",
    link: "/policy/term-of-service",
  },
  {
    type: "Shipping",
    name: "Shipping Policy",
    link: "/policy/shipping",
  },
];

const legalPoliciesMap = new Map([
  [
    legalPoliciesType.PRIVACY,
    { name: "Privacy Policy", link: "/policy/privacy" },
  ],
  [legalPoliciesType.REFUND, { name: "Refund Policy", link: "/policy/refund" }],
  [
    legalPoliciesType.TERMS_OF_SERVICE,
    { name: "Terms of Service", link: "/policy/term-of-service" },
  ],
  [
    legalPoliciesType.SHIPPING,
    { name: "Shipping Policy", link: "/policy/shipping" },
  ],
]);

const EWarungFooter = (props) => {
  const {
    siteNav,
    faqList,
    contactUsInfo,
    footerStyles = "text-headerFooterFontColor",
  } = props;
  const merchantInfoContext = useContext(MerchantContext);
  const { t } = useTranslation('common');
  const [footerData, setFooterData] = useState(null)
  const fetchFooterDetails = async () => {
    try {
      let params = {};
      if (isLocalHost()) {
        params["merchantId"] = merchantInfoContext.merchantId;
      }
      let res: any = null
      res = await API.graphql(
        graphqlOperation(getStoreInformation, params)
      );
      setFooterData(res.data.getStoreInformation)
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchFooterDetails()
  }, [])

  return (
    <footer className={`${footerStyles} bg-primary box-border w-full`}>
      <div className="mx-auto max-w-1400">
        <div className="py-10 pl-5">
          <div className="mb-2 font-bold text-[18px]">
            {merchantInfoContext.name}{" "}
            {merchantInfoContext.merchantRegistrationNumber && (
              <>({merchantInfoContext.merchantRegistrationNumber})</>
            )}
          </div>
          {
            !(footerData?.email === "default@email.com") ?
              <div className="mb-2 text-[13px]">
                {t("email")}: {footerData?.email}
              </div> : null
          }
          <div className="mb-2 text-[13px]">
            {t("Contact")}: {footerData?.smsMobileNo}
          </div>
          <div className="mb-2 text-[13px]">
            {t("address")}: {footerData?.address}
          </div>

          <div className="py-4">
            <div className="mb-2 font-bold text-[18px]">
              {t("Resources")}
            </div>
            <Link scroll={false} href={{ pathname: '/policy/refund' }} >
              <div className="mb-2 text-[13px] cursor-pointer">
                {t("Refund Policy")}
              </div>
            </Link>
            <Link scroll={false} href={{ pathname: '/policy/privacy' }} >
              <div className="mb-2 text-[13px] cursor-pointer">
                {t("Privacy Policy")}
              </div>
            </Link>
            <Link scroll={false} href={{ pathname: '/policy/shipping' }} >
              <div className="mb-2 text-[13px] cursor-pointer">
                {t("Shipping Policy")}
              </div>
            </Link>
            <Link scroll={false} href={{ pathname: '/about-us' }} >
              <div className="mb-2 text-[13px] cursor-pointer">
                {t("About Us")}
              </div>
            </Link>
            <Link scroll={false} href={{ pathname: '/contact-us' }} >
              <div className="mb-2 text-[13px] cursor-pointer">
                {t("Contact Us")}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EWarungFooter;
