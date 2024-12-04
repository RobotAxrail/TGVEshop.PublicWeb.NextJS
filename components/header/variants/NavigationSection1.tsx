import CustomMenu from "@/components/menu/CustomMenu";
import Image from "next/image";
import Link from "next/link";

export default function NavigationSection1({ siteNav, logo }: any) {
  return (
    <>
      <div className="hidden lg:flex lg:items-center h-full w-full items-center justify-center">
        {siteNav?.map((obj, idx) => (
          <CustomMenu
            menuButtonClassName="whitespace-nobreak px-2"
            obj={obj}
            key={idx}
          />
        ))}
      </div>
      <div className="w-full h-full flex items-center justify-center flex-row relative lg:hidden">
        <a className="block lg:hidden cursor-pointer">
          <Link href="/" passHref>
            <Image
              src={process.env.BUCKET_URL + logo}
              objectFit="contain"
              layout="fill"
              alt="logo"
            />
          </Link>
        </a>
      </div>
    </>
  );
}
