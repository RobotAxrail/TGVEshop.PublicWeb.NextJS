import { useRouter } from "next/router";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

export type TCompanyInfo = {
  companyPhoneNumber: string;
  companyEmail: string;
  companyLogo: string;
  companyName: string;
  companyCountry: string;
  companyAddress: string;
};
export type TFooterProps = {
  links: {
    name: string;
    link: string;
  }[];
  companyInfo: TCompanyInfo;
  isEmpty?: boolean;
  facebookUrl?: string;
  instagramUrl?: string;
};

export default function FooterSection({
  facebookUrl,
  instagramUrl,
  companyInfo,
  links,
}: TFooterProps) {
  const router = useRouter();
  return (
    <footer className="bg-white no-underline" aria-labelledby="footer-heading">
      <div className="hidden mt-20"></div>
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8 ">
        <div className="py-12 grid grid-cols-6 gap-4 border-t border-gray-300">
          <div className="grid col-span-6 md:col-span-2">
            <img
              src={companyInfo.companyLogo}
              className="h-[150px] w-auto"
              alt="logo"
            />
            <h2 className="mt-4 mb-8 font-medium text-xl text-[#0F8983]">
              {companyInfo.companyName}
            </h2>
            <div className="flex flex-row space-x-4 text-[#0F8983]">
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
              )}
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                >
                  <FaFacebook className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>
          <div className="grid grid-col-1 col-span-6 md:grid-cols-3 md:col-span-4 gap-12">
            <div className="mt-12 md:mt-0">
              <h3 className="mb-4 font-bold text-[16px] text-[#0F8983]">
                Links
              </h3>
              <div role="list" className="mt-4 space-y-4">
                {links.map((link: any) => (
                  <div key={link.name}>
                    <button
                      onClick={() => router.push(link.link)}
                      className="text-[18px] hover:text-gray-400 no-underline m-0"
                    >
                      {link.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 font-bold text-[16px] text-[#0F8983]">
                Contact
              </h3>
              <div className="space-y-2">
                <span className="flex flex-row items-center">
                  <HiOutlinePhone color="#0F8983" />
                  <p className="ml-4 text-[18px] m-0">
                    {companyInfo.companyPhoneNumber}
                  </p>
                </span>
                <span className="flex flex-row items-center">
                  <HiOutlineMail color="#0F8983" />
                  <p className="ml-4 text-[18px] m-0">
                    {companyInfo.companyEmail}
                  </p>
                </span>
              </div>
            </div>
            <div className="md:mt-0">
              <h3 className="mb-4 font-bold text-[16px] text-[#0F8983]">
                Address
              </h3>
              <h5 className="font-bold text-[18px] m-0">
                {companyInfo.companyCountry}
              </h5>
              <p className="text-[18px] m-0">{companyInfo.companyAddress}</p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-300 pt-8 md:flex md:items-center md:justify-between">
          <p className="mt-8 mx-auto text-sm md:order-1 md:mt-0 m-0">
            &copy; {new Date().getFullYear()} {companyInfo.companyName}. All
            rights reserved.
          </p>
        </div>
      </div>
      <div className="h-2 bg-[#0F8983]" />
    </footer>
  );
}
