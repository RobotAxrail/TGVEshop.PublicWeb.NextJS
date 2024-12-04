import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faWhatsapp,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import useTranslation from "next-translate/useTranslation";

export default function SocialMediaSharingButtons1({ currentUrl, title }) {
  const socialMediaLinks = [
    {
      link: "https://www.facebook.com/sharer/sharer.php?u=" + currentUrl,
      iconStyles: "text-[#284de4] text-[25px] pl-1",
      icon: faFacebook,
    },
    {
      link: `https://telegram.me/share/url?url=${currentUrl}&text=${title}`,
      iconStyles: "text-[#1a8ad5] text-[25px] pl-1",
      icon: faTelegram,
    },
    {
      link: `https://api.whatsapp.com/send?text=${title} ${currentUrl}`,
      iconStyles: "text-green-500 text-[25px] pl-1",
      icon: faWhatsapp,
    },
  ];
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-row gap-2 mt-2">
      <label className="align-middle relative">{t("Share")}:</label>
      {socialMediaLinks.map(({ link, iconStyles, icon }) => {
        return (
          <a
            rel="noopener noreferrer"
            className="no-underline"
            target="_blank"
            href={link}
            key={link}
          >
            <FontAwesomeIcon icon={icon} className={iconStyles} />
          </a>
        );
      })}
    </div>
  );
}
