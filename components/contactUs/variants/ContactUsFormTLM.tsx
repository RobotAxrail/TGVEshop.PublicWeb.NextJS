import MerchantContext from "@/contexts/MerchantContext";
import { createContactUsEnquiry } from "@/graphql/mutations";
import { setToastState } from "@/states/toastBarState";
import { PhoneIcon, MailIcon } from "@heroicons/react/outline";
import { useMutation } from "@tanstack/react-query";
import { API, graphqlOperation } from "aws-amplify";
import { useContext } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function ContactUsTLMForm({
  instagramLink,
  facebookLink,
  description,
  phoneNumber,
  email,
  title,
}: {
  instagramLink: string;
  facebookLink: string;
  description: string;
  phoneNumber: string;
  email: string;
  title: string;
}) {
  const { merchantId } = useContext(MerchantContext);
  const { mutate, isLoading } = useMutation({
    mutationKey: ["Contact Us"],
    mutationFn: async (v: any) =>
      await API.graphql(graphqlOperation(createContactUsEnquiry, v)),
    onSuccess({ data }: any) {
      const isSuccess = data?.createContactUsEnquiry.status === "true";
      setToastState({
        message: data?.createContactUsEnquiry.message,
        severity: isSuccess ? "success" : "error",
        show: true,
      });

      if (isSuccess) {
        const form = document.getElementById(
          "contact-us-form"
        ) as HTMLFormElement;
        form.reset();
      }
    },
  });

  async function onSubmit(e: any) {
    e.preventDefault();
    const value = [
      "natureOfBusiness",
      "companyName",
      "first-name",
      "last-name",
      "subject",
      "message",
      "email",
      "phone",
    ].reduce((p, c) => ({ ...p, [c]: e?.target[c]?.value }), {});
    mutate({
      contactEmail: value["email"],
      contactName: `${value["first-name"]} ${value["last-name"]}`,
      enquiry: `<br><br> I am interested in: ${value["subject"]} <br> Company: ${value["companyName"]} <br> Nature of Business: ${value["natureOfBusiness"]}  <br><br> ${value["message"]}`,
      merchantId,
    });
  }

  return (
    <div className="mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:px-8">
      <div className="relative bg-white shadow-xl border">
        <h2 className="sr-only p-0 m-0 text-[26px] font-semibold">
          Contact us
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="relative overflow-hidden bg-[#0F8983] py-10 px-6 sm:px-10 xl:p-12">
            <div
              className="pointer-events-none absolute inset-0 sm:hidden"
              aria-hidden="true"
            >
              <svg
                className="absolute inset-0 h-full w-full"
                width={343}
                height={388}
                viewBox="0 0 343 388"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
                  fill="url(#linear1)"
                  fillOpacity=".1"
                />
                <defs>
                  <linearGradient
                    id="linear1"
                    x1="254.553"
                    y1="107.554"
                    x2="961.66"
                    y2="814.66"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#fff" />
                    <stop offset={1} stopColor="#fff" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div
              className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 sm:block lg:hidden"
              aria-hidden="true"
            >
              <svg
                className="absolute inset-0 h-full w-full"
                width={359}
                height={339}
                viewBox="0 0 359 339"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
                  fill="url(#linear2)"
                  fillOpacity=".1"
                />
                <defs>
                  <linearGradient
                    id="linear2"
                    x1="192.553"
                    y1="28.553"
                    x2="899.66"
                    y2="735.66"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#fff" />
                    <stop offset={1} stopColor="#fff" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div
              className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 lg:block"
              aria-hidden="true"
            >
              <svg
                className="absolute inset-0 h-full w-full"
                width={160}
                height={678}
                viewBox="0 0 160 678"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
                  fill="url(#linear3)"
                  fillOpacity=".1"
                />
                <defs>
                  <linearGradient
                    id="linear3"
                    x1="192.553"
                    y1="325.553"
                    x2="899.66"
                    y2="1032.66"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#fff" />
                    <stop offset={1} stopColor="#fff" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3 className="text-[26px] font-semibold text-white p-0 m-0 ">
              {title}
            </h3>
            <p className="mt-6 max-w-3xl text-base text-white p-0">
              {description}
            </p>
            <dl className="mt-8 space-y-[24px]">
              <dt>
                <span className="sr-only">Phone number</span>
              </dt>
              {phoneNumber && (
                <dd className="flex text-[18px] text-white">
                  <PhoneIcon
                    className="h-6 w-6 flex-shrink-0 text-white"
                    aria-hidden="true"
                  />
                  <span className="ml-3">{phoneNumber}</span>
                </dd>
              )}
              <dt>
                <span className="sr-only">Email</span>
              </dt>
              {email && (
                <dd className="flex text-[18px] text-white">
                  <MailIcon
                    className="h-6 w-6 flex-shrink-0 text-white"
                    aria-hidden="true"
                  />
                  <span className="ml-3">{email}</span>
                </dd>
              )}
            </dl>
            <div role="list" className="mt-8 flex space-x-4">
              {facebookLink && (
                <div>
                  <a
                    className="text-white hover:text-white"
                    referrerPolicy="no-referrer"
                    href={facebookLink}
                    target="_blank"
                  >
                    <span className="sr-only">Facebook</span>
                    <FaFacebook className="w-6 h-6" />
                  </a>
                </div>
              )}
              {instagramLink && (
                <div>
                  <a
                    className="text-white hover:text-white"
                    referrerPolicy="no-referrer"
                    href={instagramLink}
                    target="_blank"
                  >
                    <span className="sr-only">Facebook</span>
                    <FaInstagram className="w-6 h-6" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Contact form */}
          <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
            <h3 className="text-2xl font-medium text-gray-900 p-0 m-0">
              Contact Us
            </h3>
            <form
              className="mt-6 grid grid-cols-1 gap-y-[20px] sm:grid-cols-2 sm:gap-x-8"
              onSubmit={onSubmit}
              id="contact-us-form"
            >
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-900"
                >
                  First name
                </label>
                <div className="mt-1">
                  <input
                    className="block border w-full rounded-full border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:border-red-500 focus:ring-red-500"
                    autoComplete="given-name"
                    placeholder="First Name"
                    name="first-name"
                    id="first-name"
                    type="text"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    className="block border w-full rounded-full border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:border-red-500 focus:ring-red-500"
                    placeholder="Last Name"
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    className="block border w-full rounded-full border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:border-red-500 focus:ring-red-500"
                    autoComplete="email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    id="email"
                    required
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Phone
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    className="block border w-full rounded-full border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:border-red-500 focus:ring-red-500"
                    aria-describedby="phone-optional"
                    placeholder="Phone number"
                    autoComplete="tel"
                    type="text"
                    name="phone"
                    id="phone"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-900"
                >
                  Choose one
                </label>
                <div className="mt-1">
                  <select
                    className="block border w-full rounded-full border-gray-300 py-2 px-5 text-gray-900 shadow-sm focus:border-red-500 focus:ring-red-500"
                    id="subject"
                    required
                  >
                    <option value="Foodicious F&B Expo">
                      Foodicious F&B Expo
                    </option>
                    <option value="Malaysia Food & Beverage Expo">
                      Malaysia Food & Beverage Expo
                    </option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-900"
                  htmlFor="companyName"
                >
                  Company Name
                </label>
                <div className="mt-1">
                  <input
                    className="block border w-full rounded-full border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:border-red-500 focus:ring-red-500"
                    aria-describedby="company-name"
                    placeholder="Company Name"
                    name="companyName"
                    id="companyName"
                    type="text"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-900"
                  htmlFor="natureOfBusiness"
                >
                  Nature of Business
                </label>
                <div className="mt-1">
                  <input
                    className="block border w-full rounded-full border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:border-red-500 focus:ring-red-500"
                    placeholder="Nature of Business"
                    aria-describedby="natureOfBusiness"
                    name="natureOfBusiness"
                    id="natureOfBusiness"
                    type="text"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <div className="flex justify-between">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Message
                  </label>
                  <span id="message-max" className="text-sm text-gray-500">
                    Max. 500 characters
                  </span>
                </div>
                <div className="mt-1">
                  <textarea
                    className="block border w-full rounded-md border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:border-red-500 focus:ring-red-500"
                    aria-describedby="message-max"
                    placeholder="Message"
                    defaultValue={""}
                    name="message"
                    id="message"
                    rows={4}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-2 w-full">
                <button
                  className="mt-2 flex w-full md:min-w-[200px] md:min-h-[50px] items-center justify-center border border-transparent bg-red-600 px-8 py-3 text-base shadow font-medium text-white hover:bg-red-700 md:py-[10px] md:px-[16px] md:text-[20px] rounded-full no-underline"
                  disabled={isLoading}
                  type="submit"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
