import useIsScrollTop from "../hooks/useIsScrollTop";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MiddleSection2({ logo }) {
  const router = useRouter();
  const { isTop } = useIsScrollTop(
    router?.pathname === "/",
    router?.pathname !== "/"
  );

  return (
    <div className="flex w-full h-full items-center justify-center">
      <a className="cursor-pointer">
        <Link href="/" passHref>
          <img
            src={process.env.BUCKET_URL + logo}
            className="h-[30px] md:h-[60px] object-cover my-3 duration-200"
            alt="logo"
            style={{
              filter:
                !isTop || router?.pathname !== "/"
                  ? "invert(0)"
                  : "invert(100%)",
            }}
          />
        </Link>
      </a>
    </div>
  );
}
