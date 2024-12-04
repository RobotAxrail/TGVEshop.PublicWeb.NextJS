import { MenuIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";

export default function StartSection1({ setOpen, logo }: any) {
  return (
    <>
      <div className="h-full flex items-start justify-start flex-row relative">
        <div className="flex flex-row items-center justify-center h-full lg:hidden pl-4">
          <button
            className="bg-primary p-2 rounded-md text-headerFooterFontColor z-20"
            onClick={() => setOpen(true)}
            type="button"
          >
            <span className="sr-only">Open menu</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <a className="hidden lg:block cursor-pointer w-auto">
          <Link href="/" passHref>
            <img
              src={process.env.BUCKET_URL + logo}
              alt="logo"
              className="h-[92px]"
            />
          </Link>
        </a>
      </div>
    </>
  );
}
