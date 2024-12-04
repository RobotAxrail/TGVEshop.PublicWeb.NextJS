import { useState, useContext } from "react";
import { useRouter } from "next/router";
// icons
import {
  BookOpenIcon,
  CollectionIcon,
  IdentificationIcon,
  GiftIcon,
} from "@heroicons/react/outline";
import { ChevronRightIcon } from "@/components/icons/Icons";
import { useAuth } from "@/contexts/AuthContext";
import MerchantContext from "@/contexts/MerchantContext";
// import { ReactComponent as NextIcon } from "@/images/next-icon.svg";
import { StoreTypes } from "@/enums/enums";
import useTranslation from "next-translate/useTranslation";

const fullSideBarMenu = [
  {
    label: "My Account",
    icon: <IdentificationIcon className="text-primary w-8 h-8" />,
    page: "/my-profile",
  },
  {
    label: "Address Book",
    icon: <BookOpenIcon className="text-primary w-8 h-8" />,
    page: "/address-book",
  },
  {
    label: "My Orders",
    icon: <CollectionIcon className="text-primary w-8 h-8" />,
    page: "/order",
  },
  {
    label: "My Point History",
    icon: <GiftIcon className="text-primary w-8 h-8" />,
    page: "/point-history",
  },
  {
    label: "My Reward",
    icon: <GiftIcon className="text-primary w-8 h-8" />,
    page: "/rewards",
  },
];

function SideBarProfile(props) {
  const { value, membershipTierActivated } = props;
  const { user } = useAuth();
  const router = useRouter();
  const { t } = useTranslation("common");
  const { storeType } = useContext(MerchantContext);
  //   const { customerData } = useContext(DocumentContext);

  const [selectedTab, setSelectedTab] = useState(value);

  const toRenderSideBarMenu = () => {
    if (storeType === StoreTypes.WARUNG_STORETYPE) {
      return fullSideBarMenu.filter(
        (data) =>
          data.label != "Address Book" && data.label != "My Point History"
      );
    }

    // if (membershipTierActivated) {
    //temporary hardcoded to hide member point history for all cases
    if (false) {
      return fullSideBarMenu;
    } else {
      return fullSideBarMenu.slice(0, 3);
    }
  };

  const handleListItemClick = (event, index, item) => {
    setSelectedTab(index);
    router.push({
      pathname: item.page,
    });
  };
  return (
    <div className="bg-white rounded-lg border">
      <ul className="list-none p-0 m-0">
        <li className="px-4 flex items-center pb-2.5 pt-3">
          <div className="flex-shrink-0 min-w-[56px]">
            <div className="h-10 w-10 rounded-full flex bg-primary text-white justify-center items-center text-xl pointer-events-none ring-2 ring-white">
              U
            </div>
          </div>
          <div className="flex-auto my-1">
            <p className="text-sm m-0">
              {!!user?.firstName && !!user?.lastName
                ? `${user?.firstName} ${user?.lastName}`
                : t("No Name Available")}
            </p>
            <p className="text-[12px] opacity-50 m-0">{user?.primaryEmail}</p>
          </div>
        </li>
        <hr className="h-1px bg-grey-divider" />

        {toRenderSideBarMenu().map((item, index) => (
          <li
            key={index}
            className={[
              "relative cursor-pointer hover:bg-blue-100 bg-opacity-[0.08] last:hover:rounded-b-lg",
              selectedTab === item.label
                ? "bg-blue-300 bg-opacity-[0.08]"
                : "bg-white",
            ].join(" ")}
            selected={selectedTab === item.label}
            onClick={(event) => handleListItemClick(event, index, item)}
          >
            <div className="flex pl-4 pr-12 py-2.5 items-center">
              <div className="flex-shrink-0 min-w-[56px]">
                <div
                  className={[
                    "h-10 w-10 rounded-full flex justify-center items-center text-xl pointer-events-none ring-2 ring-white",
                    selectedTab === item.label
                      ? "bg-blue-300 bg-opacity-10"
                      : "bg-white",
                  ].join(" ")}
                >
                  {item.icon}
                </div>
              </div>
              <div className="flex-auto my-1">
                <p className="text-[14px] m-0">{t(item.label)}</p>
              </div>
            </div>
            <div className="top-1/2 right-[16px] absolute transform -translate-y-1/2">
              <button
                className="p-3 flex text-center mr-[-12px] opacity-60"
                title={item.label}
              >
                <ChevronRightIcon className="fill-current w-4 h-3" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBarProfile;
