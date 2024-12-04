import { SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BadgeButton } from "../buttons/Buttons";
import { CartIcon } from "../icons/Icons";

export default function QLEggsHeader({ logo, cartList }) {
  const bucketUrl = process.env.BUCKET_URL;
  const router = useRouter();

  return (
    <React.Fragment>
      <nav className="w-screen py-1 max-w-6xl m-auto h-full px-3 md:px-2">
        <div className="w-full flex flex-row justify-between p-1 sm:p-2 h-full cursor-pointer items-center sm:mt-0">
          <Link href={"/"}>
            <img className="h-[50px]" src={`${bucketUrl}${logo}`} />
          </Link>
          <div className="flex flex-row space-x-4 h-full items-center">
            <Link href={"/search"}>
              <SearchIcon className="text-white h-6 w-6" />
            </Link>
            <BadgeButton
              className="bg-transparent relative"
              number={cartList?.length}
              onClick={() => {
                router.push("/checkout");
                (window as any).dataLayer.push({ event: "viewcartClicked" });
              }}
              icon={
                <Link href="/checkout">
                  <a className="text-sm font-medium">
                    <CartIcon className="w-6 h-6" color={"black"} />
                  </a>
                </Link>
              }
            />
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}
