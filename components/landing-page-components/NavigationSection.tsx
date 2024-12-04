import { Popover, Transition } from "@headlessui/react";
import { HiX, HiMenu } from "react-icons/hi";
import { Fragment } from "react";
import { useRouter } from "next/router";
import useIsScrollTop from "../header/hooks/useIsScrollTop";

export default function AppBar({
  navigation,
  logo,
}: {
  logo: string;
  navigation: {
    name: string;
    href: string;
    selected: boolean;
  }[];
}) {
  const router = useRouter();
  const { isTop } = useIsScrollTop(true, false);

  return (
    <div
      className={`top-0 fixed z-20 w-full  ${
        isTop ? "bg-transparent" : "bg-white border-b"
      }`}
    >
      <Popover className={"max-w-7xl m-auto "}>
        <div className="relative px-4 py-3 sm:px-6 lg:px-8 md:h-[80px]">
          <nav
            className="relative flex items-center justify-between sm:h-10 lg:justify-between lg:h-full"
            aria-label="Global"
          >
            <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0 h-full">
              <div className="flex w-full items-center justify-between md:w-auto h-full">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-[50px] w-auto"
                    alt="Your Company"
                    src={logo}
                  />
                </a>
                <div className="-mr-2 flex items-center md:hidden">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    <HiMenu className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="hidden md:ml-10 md:block md:space-x-8 md:pr-4 z-20">
              {navigation?.map((item) => (
                <button
                  onClick={() => router.push(item?.href)}
                  key={item?.name}
                  className={
                    item?.selected
                      ? "text-[18px] font-medium text-red-600 hover:text-red-700 border-b-2 border-red-600 pb-2 cursor-pointer no-underline"
                      : "text-[18px] font-medium text-gray-500 hover:text-gray-900 cursor-pointer no-underline"
                  }
                >
                  {item.name}
                </button>
              ))}
            </div>
          </nav>
        </div>

        <Transition
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            className="absolute inset-x-0 top-0 z-20 origin-top-right transform p-2 transition md:hidden"
            focus
          >
            <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
              <div className="flex items-center justify-between px-5 pt-4">
                <div>
                  <img className="h-8 w-auto" src={logo} alt="" />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close main menu</span>
                    <HiX className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <button
                    onClick={() => router.push(item?.href)}
                    key={item.name}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 no-underline"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}
