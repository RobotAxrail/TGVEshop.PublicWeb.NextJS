import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
// contexts
import MerchantContext from "@/contexts/MerchantContext";
// image
import appStore from "@/images/download-app-store.svg";
import googlePlay from "@/images/google-play-badge.svg";
// icons library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTranslation from "next-translate/useTranslation";

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

const Footer = (props) => {
  const {
    siteNav,
    faqList,
    contactUsInfo,
    footerList,
    footerStyles = "text-headerFooterFontColor",
  } = props;
  const merchantInfoContext = useContext(MerchantContext);
  const footerNavList = siteNav?.filter((data) => data.menuType === "footer");
  const { t } = useTranslation("common");

  const legalPoliciesToDisplayList =
    merchantInfoContext.footerItemLists
      ?.filter((footerItem) => footerItem.display)
      ?.map((footerItem) => legalPoliciesMap.get(footerItem.footerType)) ?? [];

  const socialMediaIconsList = [
    {
      name: "facebook",
      src: <FontAwesomeIcon icon={faFacebook} />,
      url: merchantInfoContext.facebookUrl,
    },
    {
      name: "instagram",
      src: <FontAwesomeIcon icon={faInstagram} />,
      url: merchantInfoContext.instagramUrl,
    },
    {
      name: "youtube",
      src: <FontAwesomeIcon icon={faYoutube} />,
      url: merchantInfoContext.youtubeUrl,
    },
    {
      name: "twitter",
      src: <FontAwesomeIcon icon={faTwitter} />,
      url: merchantInfoContext.twitterUrl,
    },
    {
      name: "tiktok",
      src: <FontAwesomeIcon icon={faTiktok} />,
      url: merchantInfoContext.tiktokUrl,
    },
    {
      name: "linkedin",
      src: <FontAwesomeIcon icon={faLinkedin} />,
      url: merchantInfoContext.linkedInUrl,
    },
  ];
  const merchantInfoList = [
    {
      type: "FAQ",
      name: "FAQ",
      link: "/faq",
      activate: faqList ? faqList.items.length > 0 : false,
    },
    {
      type: "About Us",
      name: t("About Us"),
      link: "/about-us",
      activate:
        merchantInfoContext.aboutUsBanner ||
          merchantInfoContext.aboutUsDescription
          ? true
          : false,
    },
    {
      type: "Contact Us",
      name: t("Contact Us"),
      link: "/contact-us",
      activate: contactUsInfo && contactUsInfo.contactUsRichText ? true : false,
    },
  ];

  return (
    <footer className={`${footerStyles} bg-primary box-border mt-10`}>
      <div className="mx-auto max-w-1200 sm:px-6 ">
        <div className="py-10">
          <div className="flex flex-col md:flex-row">
            <div className="flex basis-1/3 flex-col px-7 border-b border-b-headerFooterFontColor md:border-r md:border-r-headerFooterFontColor md:border-b-transparent">
              <div className="mr-auto">
                <img
                  src={process.env.BUCKET_URL + merchantInfoContext.logo}
                  className="py-5 flex w-auto h-[100px] md:h-[200px] mb-8 flex-col"
                  alt="logo"
                />
              </div>

              <div className="mb-2 font-bold">
                {merchantInfoContext.name}{" "}
                {merchantInfoContext.merchantRegistrationNumber && (
                  <>({merchantInfoContext.merchantRegistrationNumber})</>
                )}
              </div>
              <div className="mb-2 text-[13px]">
                <div dangerouslySetInnerHTML={{ __html: merchantInfoContext.footerDescription }} />
              </div>
              <div className="flex flex-row justify-start mb-5 items-center">
                {socialMediaIconsList?.map((obj, index) => {
                  if (obj.url === null) return;
                  return (
                    <div className="w-[20px] h-[20px] mr-3 " key={index}>
                      <a
                        target="_blank"
                        href={
                          obj.url.includes("https://")
                            ? obj.url
                            : "https://" + obj.url
                        }
                        rel="noopener noreferrer"
                      >
                        {obj.src}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 basis-2/3 flex-1 grid grid-cols-none xs:grid-cols-6 xs:grid-flow-rows gap-4 px-7 auto">
              <div className="row-span-2 xs:col-span-2 flex flex-col justify-start">
                {legalPoliciesToDisplayList?.map((legalPolicy, i) => (
                  <React.Fragment key={i}>
                    {legalPolicy?.link && (
                      <div className="mb-1 text-[13px]" key={i}>
                        <Link passHref href={legalPolicy?.link}>
                          <a className="no-underline">{legalPolicy?.name}</a>
                        </Link>
                      </div>
                    )}
                  </React.Fragment>
                ))}
                {merchantInfoList.map((obj, index) => {
                  if (obj.activate) {
                    return (
                      <div className="mb-1 text-[13px]" key={index}>
                        <Link passHref href={obj?.link}>
                          <a className="no-underline">{obj?.name}</a>
                        </Link>
                      </div>
                    );
                  }
                })}
              </div>
              <div className="xs:col-span-4">
                <div className="grid xs:grid-cols-2 gap-4 ">
                  {footerList?.map((obj, idx) => {
                    if (obj.childItems.length > 0) {
                      return (
                        <div className="" key={idx}>
                          <div className="mb-1 font-bold text-[14px]">
                            {obj.title}
                          </div>
                          {obj?.childItems?.length > 0 && (
                            <div className="text-[13px]">
                              {obj?.childItems?.map((o, idx) => (
                                <div className="mb-1" key={idx}>
                                  {!o?.linkValue?.includes("http") ? (
                                    <Link passHref href={`/${o.linkValue}`}>
                                      <a className="no-underline">{o.title}</a>
                                    </Link>
                                  ) : (
                                    <a
                                      referrerPolicy="no-referrer"
                                      className="no-underline"
                                      href={o?.linkValue}
                                      target="_blank"
                                    >
                                      {o.title}
                                    </a>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    } else {
                      return (
                        <div className="" key={idx}>
                          <div className="text-[13px] mb-1" key={idx}>
                            {!obj?.linkValue?.includes("http") ? (
                              <Link passHref href={`/${obj.linkValue}`}>
                                <a className="no-underline">{obj.title}</a>
                              </Link>
                            ) : (
                              <a
                                referrerPolicy="no-referrer"
                                className="no-underline"
                                href={obj?.linkValue}
                                target="_blank"
                              >
                                {obj.title}
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
                {/* google play & app store */}
                <div className="mt-3 flex flex-col xs:flex-row">
                  {merchantInfoContext.googlePlayUrl && (
                    <div className="mb-1 xs:mr-3 xs:mb-0">
                      <a
                        target="_blank"
                        href={
                          merchantInfoContext.googlePlayUrl.includes("https://")
                            ? merchantInfoContext.googlePlayUrl
                            : "https://" + merchantInfoContext.googlePlayUrl
                        }
                        rel="noopener noreferrer"
                      >
                        <Image src={googlePlay} alt="google-play" />
                      </a>
                    </div>
                  )}
                  {merchantInfoContext.playStoreUrl && (
                    <div>
                      <a
                        target="_blank"
                        href={
                          merchantInfoContext.playStoreUrl.includes("https://")
                            ? merchantInfoContext.playStoreUrl
                            : "https://" + merchantInfoContext.playStoreUrl
                        }
                        rel="noopener noreferrer"
                      >
                        <Image src={appStore} alt="app-store" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
              {merchantInfoContext.copyright && (
                <div className="xs:col-span-full text-sm flex flex-col justify-end">
                  {merchantInfoContext.copyright}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
