import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { StoreTypes } from "@/enums/enums";
import { Fragment } from "react";
import Link from "next/link";
import LanguageDropdown from "@/components/LanguageDropdown";
import { GlobeIcon } from "@heroicons/react/solid";
import useTranslation from "next-translate/useTranslation";

export default function MobileSideBar({
  isAuthenticated,
  toggleListItem,
  handleSignOut,
  profileNavs,
  storeType,
  setOpen,
  siteNav,
  isOpen,
  open,
  isQLEggs,
}: {
  toggleListItem: (p: any) => void;
  setOpen: (b: boolean) => void;
  isAuthenticated: boolean;
  handleSignOut: () => void;
  profileNavs: any[];
  storeType: string;
  siteNav: any[];
  isOpen: Object;
  open: boolean;
  isQLEggs: boolean;
}) {
  const { t } = useTranslation("common");
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        className="fixed inset-0 flex z-40 lg:hidden"
        onClose={setOpen}
        as="div"
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative max-w-xs w-full bg-primary shadow-xl pb-12 flex flex-col overflow-y-auto">
            <div className="px-4 pt-5 pb-2 flex">
              <button
                type="button"
                className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400 outline-none"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">{t("Close menu")}</span>
                <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            {/* Links */}
            {siteNav?.length > 0 && (
              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {siteNav?.map((category, index) => (
                  <div key={index} className="flow-root">
                    <div key={category.title}>
                      {category.childItems.length > 0 ? (
                        <a
                          id={`${category.siteNavigationId}-heading-mobile`}
                          className="font-medium no-underline text-headerFooterFontColor"
                          onClick={() => {
                            toggleListItem(category.siteNavigationId);
                          }}
                        >
                          {t(category.title)}
                        </a>
                      ) :
                      category.linkValue.includes("http") ? (
                        <a
                          className="-m-2 p-2 block no-underline text-headerFooterFontColor"
                          target="_blank"
                          href={category.linkValue}
                          rel="noopener noreferrer"
                        >
                          {t(category.title)}
                        </a>
                      ) : (
                          <Link href={"/" + category.linkValue} passHref>
                            <a
                              id={`${category.siteNavigationId}-heading-mobile`}
                              className="font-medium no-underline text-headerFooterFontColor"
                            >
                              {t(category.title)}
                            </a>
                          </Link>
                      )}

                      {(isOpen as any)?.show[category.siteNavigationId] ? (
                        <ul
                          role="list"
                          aria-labelledby={`${category.siteNavigationId}-heading-mobile`}
                          className={"mt-6 flex flex-col space-y-6"}
                        >
                          {category.childItems.map((item) => (
                            <li key={item.title} className="flow-root">
                              <>
                              {item.linkValue.includes("http") ? (
                                <a
                                  className="-m-2 p-2 block no-underline text-headerFooterFontColor"
                                  target="_blank"
                                  href={item.linkValue}
                                  rel="noopener noreferrer"
                                >
                                  {t(item.title)}
                                </a>
                              ) : (
                                <Link href={"/" + item.linkValue} passHref>
                                  <a className="-m-2 p-2 block no-underline text-headerFooterFontColor">
                                    {t(item.title)}
                                  </a>
                                </Link>
                              )}
                              </>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="px-4 pt-4 space-y-6">
              <div className="flow-root">
                {/* Search */}
                <Link
                  href={
                    storeType === StoreTypes.WARUNG_STORETYPE
                      ? {
                        pathname: "/collections-menu",
                        query: { type: "search" },
                      }
                      : "/search"
                  }
                  passHref
                >
                  <a className="-m-2 p-2 block font-medium no-underline text-headerFooterFontColor">
                    {t("Search")}
                  </a>
                </Link>
              </div>
            </div>
            {isAuthenticated ? (
              <>
                {(profileNavs as any)?.childItems.length > 0 && (
                  <div className="py-6 px-4 space-y-6">
                    {(profileNavs as any)?.childItems.map((item, index) => (
                      <div className="flow-root" key={index}>
                        {item.title ===  t("Sign Out") ? (
                          <button
                            className="-m-2 p-2 block font-medium no-underline text-headerFooterFontColor"
                            onClick={handleSignOut}
                          >
                            {t("Sign Out")}
                          </button>
                        ) : (
                          <Link href={item.linkValue} passHref>
                            <a className="-m-2 p-2 block font-medium no-underline text-headerFooterFontColor">
                              {t(item.title)}
                            </a>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="py-6 px-4 space-y-6">
                {storeType === StoreTypes.WARUNG_STORETYPE && (
                  <div className="flow-root">
                    <Link href="/collections-menu" passHref>
                      <a className="-m-2 p-2 block font-medium no-underline text-headerFooterFontColor">
                        {t("View Menu")}
                      </a>
                    </Link>
                  </div>
                )}
                {!isQLEggs && (
                  <>
                    <div className="flow-root">
                      <Link href="/login" passHref>
                        <a className="-m-2 p-2 block font-medium no-underline text-headerFooterFontColor">
                          {t("Sign in")}
                        </a>
                      </Link>
                    </div>
                    <div className="flow-root">
                      <Link href="/register" passHref>
                        <a className="-m-2 p-2 block font-medium no-underline text-headerFooterFontColor">
                          {t("Create account")}
                        </a>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
            <div className="px-4 py-2">
              <div className="flex flex-row text-headerFooterFontColor items-center border w-fit px-2 py-1 rounded-md">
                <GlobeIcon className="h-4 w-4" />
                <LanguageDropdown />
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
