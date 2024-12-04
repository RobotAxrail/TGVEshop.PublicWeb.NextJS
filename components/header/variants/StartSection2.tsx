import { MenuIcon } from "@heroicons/react/outline";
import useIsScrollTop from "../hooks/useIsScrollTop";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function StartSection2({ setOpen }) {
  const router = useRouter();
  const { isTop } = useIsScrollTop(
    router?.pathname === "/",
    router?.pathname !== "/"
  );

  return (
    <div
      className={`w-full h-full flex items-center justify-center flex-row relative duration-200 ${
        isTop ? "text-white" : "text-black"
      }`}
    >
      <button
        className="p-2 rounded-md lg:hidden z-20"
        onClick={() => setOpen(true)}
        type="button"
      >
        <span className="sr-only">Open menu</span>
        <MenuIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
}
