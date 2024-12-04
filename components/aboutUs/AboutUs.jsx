import { Fragment } from "react";
import { NormalImage } from "@/components/image/CustomImage";
import EWarungFooter from "../footer/EwarungFooter";
import useTranslation from 'next-translate/useTranslation';

const AboutUs = (props) => {
  const { info } = props;
  const { t } = useTranslation('common');

  return (
    <Fragment>
      {info.storeType !== "warung" ? (
        <div className="text-center py-5">
          <h1 className="text-3xl font-semibold pb-5">{t("About Us")}</h1>
          {info.aboutUsBanner || info.aboutUsDescription ? (
            <>
              {info.aboutUsBanner && (
                <NormalImage
                  alt="About us banner"
                  src={process.env.BUCKET_URL + info.aboutUsBanner}
                />
              )}
              <div
                className="text-left md:py-[10px]"
                dangerouslySetInnerHTML={{
                  __html:
                    info.aboutUsDescription !== "" && info.aboutUsDescription,
                }}
              />
            </>
          ) : (
            <p>{t("No content available")}</p>
          )}
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-between">
            <div className="p-5 mb-10">
              <h1>{t("About Us")}</h1>
              {info.aboutUsDescription ? (
                <div
                  className="text-left md:py-[10px]"
                  dangerouslySetInnerHTML={{
                    __html:
                      info.aboutUsDescription !== "" && info.aboutUsDescription,
                  }}
                />
              ) : (
                <p>{t("No content available")}</p>
              )}
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 order-last">
              <EWarungFooter></EWarungFooter>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default AboutUs;
