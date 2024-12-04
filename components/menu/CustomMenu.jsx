import React, { useState, Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

import { Menu, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/outline";
import { useAuth } from "@/contexts/AuthContext";

const CustomMenu = (props) => {
  const { obj, menuItemsClassName, menuButtonClassName = "px-4 py-2" } = props;
  const { handleSignOut } = useAuth();
  const [customOpen, setCustomOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("common");

  return (
    <div className="hidden lg:flex lg:items-center lg:justify-center lg:mx-1">
      <div className="relative inline-block text-left">
        <Menu>
          {({ open }) => (
            <>
              <span className={`rounded-md`}>
                {/* bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 */}
                {obj.childItems.length > 0 ? (
                  <Menu.Button
                    className={`${menuButtonClassName} inline-flex justify-center w-full text-sm font-medium leading-5 text-headerFooterFontColor transition duration-150 ease-in-out  hover:text-black focus:outline-none focus:border-blue-300 focus:shadow-outline-blue`}
                  >
                    {obj.buttonIcon ? (
                      obj.buttonIcon
                    ) : (
                      <span className={menuButtonClassName}>{obj.title}</span>
                    )}
                  </Menu.Button>
                ) : (
                  <button
                    className={`${menuButtonClassName} inline-flex justify-center w-full text-sm font-medium leading-5 text-headerFooterFontColor transition duration-150 ease-in-out  hover:text-black focus:outline-none focus:border-blue-300 focus:shadow-outline-blue`}
                    onClick={() => {
                      if (obj.linkValue.includes("https:/")) {
                        window.open(obj.linkValue, "_blank", "noopener");
                      } else {
                        router.push("/" + obj.linkValue);
                      }
                    }}
                  >
                    {obj.buttonIcon ? (
                      obj.buttonIcon
                    ) : (
                      <span className={menuButtonClassName}>{obj.title}</span>
                    )}
                  </button>
                )}
              </span>

              <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className={`absolute right-0 mt-2 ${menuItemsClassName} origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none`}
                >
                  <div className="py-1 ">
                    {obj.childItems?.map((childObj, index) => {
                      return (
                        <Menu.Item key={index}>
                          {({ active }) =>
                            childObj.title === t("Sign Out") ? (
                              <React.Fragment>
                                <button
                                  className={`${
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
                                  } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left no-underline hover:bg-grey-100`}
                                  onClick={handleSignOut}
                                >
                                  {childObj.title}
                                </button>
                              </React.Fragment>
                            ) : childObj.linkValue.includes("https:/") ? (
                              <a
                                className={`${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left no-underline hover:bg-grey-100`}
                                target="_blank"
                                href={childObj.linkValue}
                                rel="noopener noreferrer"
                              >
                                {childObj.title}
                              </a>
                            ) : (
                              <Link href={"/" + childObj.linkValue} passHref>
                                <a
                                  className={`${
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
                                  } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left no-underline hover:bg-grey-100`}
                                >
                                  {childObj.title}
                                </a>
                              </Link>
                            )
                          }
                        </Menu.Item>
                      );
                    })}
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </div>
  );
};

const CustomMenu2 = (props) => {
  const { obj, menuItemsClassName, menuButtonClassName = "px-4 py-2" } = props;

  return (
    <div className="hidden lg:flex lg:items-center lg:justify-center lg:mx-1">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            onClick={() => console.log(obj)}
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Options
            {/* <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            /> */}
          </Menu.Button>
        </div>
        {obj.childItems.length > 0 && (
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      Edit
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      Duplicate
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      Archive
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      Move
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        )}
      </Menu>
    </div>
  );
};

export default CustomMenu;
