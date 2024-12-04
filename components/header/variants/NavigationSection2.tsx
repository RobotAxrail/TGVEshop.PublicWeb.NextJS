import CustomMenu from "@/components/menu/CustomMenu";
import { useRouter } from "next/router";
import useIsScrollTop from "../hooks/useIsScrollTop";

export default function NavigationSection2({ siteNav }) {
  const router = useRouter();
  const { isTop } = useIsScrollTop(
    router?.pathname === "/",
    router?.pathname !== "/"
  );

  return (
    <div
      className={`flex flex-row items-center justify-center pb-0 lg:pb-6 gap-8 ${
        isTop ? "text-white" : "text-black"
      }`}
    >
      {siteNav?.length > 0
        ? siteNav?.map((obj, idx) => (
            <CustomMenu
              menuButtonClassName="duration-200"
              key={idx}
              obj={obj}
            />
          ))
        : [1, 2, 3, 4, 5].map((index) => {
            return (
              <div
                className="rounded bg-slate-200 h-4 w-20 animate-pulse hidden lg:block"
                key={index}
              />
            );
          })}
    </div>
  );
}
