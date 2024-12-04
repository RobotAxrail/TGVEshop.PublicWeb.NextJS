import { AiFillCaretDown } from "react-icons/ai/index";
import { Fragment, ReactElement } from "react";
import { Dialog, Switch, Transition } from "@headlessui/react";
import useTranslation from "next-translate/useTranslation";

export function CheckoutPageCard({ children }: { children: ReactElement }) {
  return (
    <div className="border border-gray-200 shadow-sm rounded-lg  p-2 md:p-4 bg-white">
      {children}
    </div>
  );
}

export function CheckoutPageIconButton({
  className,
  isLoading,
  children,
  variant,
  disabled,
  ...remaining
}: {
  children: ReactElement;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  variant?: string;
} & any) {
  const disabledStyle = "opacity-25 cursor-not-allowed hover:opacity-25";
  const variantClassNames = {
    outline:
      "text-primary border border-primary hover:opacity-50 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center",
    solid:
      "text-white bg-primary hover:opacity-90 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center",
  }[variant || "solid"];

  return (
    <button
      className={`${variantClassNames} ${className} duration-200 ${
        (disabled || isLoading) && disabledStyle
      }`}
      disabled={disabled}
      {...remaining}
    >
      {isLoading ? <LoadingSpinner /> : children}
      <span className="sr-only">Icon description</span>
    </button>
  );
}

export function CheckoutPageButton({
  className,
  isLoading,
  disabled,
  children,
  variant,
  ...remaining
}: {
  children: ReactElement;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  variant?: string;
} & any) {
  const disabledStyle = "opacity-25 cursor-not-allowed hover:opacity-25";
  const variantClassNames = {
    link: "font-medium text-primary underline hover:opacity-90",
    solid:
      "text-white bg-primary hover:opacity-90 font-medium rounded-lg px-5 py-2.5 text-center",
    outline:
      "font-medium text-primary border border-primary hover:opacity-50 rounded-lg px-5 py-2.5 text-center mr-2 mb-2",
  }[variant || "solid"];

  return (
    <button
      className={`${variantClassNames} ${className} duration-200 ${
        (disabled || isLoading) && disabledStyle
      }`}
      {...remaining}
      disabled={disabled}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  );
}

export function LoadingSpinner() {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="mr-2 w-5 h-5 text-white animate-spin dark:text-gray-600 fill-primary"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function Divider() {
  return <div className="border-t border-dotted border-gray-400 my-2 w-full" />;
}

export function CheckoutPageInput({
  register = {},
  label,
  ...remaining
}: { label: string; register?: any } & any) {
  return (
    <div className="flex flex-col border border-gray-200 rounded-lg px-4 py-2 w-full space-y-0.5 shadow-sm">
      <label className="text-xs">{label}</label>
      <input className="w-full outline-none" {...remaining} {...register} />
    </div>
  );
}

export function CheckoutPageSelect({
  register = {},
  options,
  label,
  ...remaining
}: {
  label: string;
  register?: any;
  options: {
    label: string;
    value: string;
  }[];
} & any) {
  return (
    <div className="flex flex-col border border-gray-200 rounded-lg px-4 py-2 w-full space-y-0.5 shadow-sm ">
      <label className="text-xs">{label}</label>
      <div className="w-full relative">
        <select
          className="w-full outline-none disable-webkit relative"
          {...remaining}
          {...register}
        >
          {options?.map(({ label, value }) => (
            <option className="pl-1" value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
        <div className="absolute right-0 z-10 top-0">
          <AiFillCaretDown />
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPagePhoneNumber({
  registerPhoneNumber,
  registerCountryCode,
  disabled,
}: {
  registerPhoneNumber: any;
  registerCountryCode: any;
  disabled?: boolean;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col border border-gray-200 rounded-lg px-4 py-2 w-full space-y-0.5 shadow-sm ">
      <label className="text-xs">{t("common:mobileNumber")}</label>
      <div className="w-full flex flex-row space-x-2">
        <div className="relative">
          <select
            disabled={disabled}
            className="outline-none disable-webkit relative w-14 z-10 bg-transparent"
            {...registerCountryCode}
          >
            {[
              { label: "+60", value: "+60" },
              { label: "+65", value: "+65" },
            ]?.map(({ label, value }) => (
              <option className="pl-1" value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
          <div className="absolute right-0 z-10 top-0">
            <AiFillCaretDown />
          </div>
        </div>
        <input
          disabled={disabled}
          className="w-full outline-none"
          placeholder={t("common:mobileNumber")}
          {...registerPhoneNumber}
        />
      </div>
    </div>
  );
}

export function CheckoutPageSwitch({
  setIsOpen,
  isOpen,
  label,
}: {
  setIsOpen: (e: boolean) => void;
  isOpen: boolean;
  label: string;
}) {
  return (
    <div className="w-full flex flex-row space-x-2 my-2">
      <Switch
        onChange={() => setIsOpen(!isOpen)}
        checked={!isOpen}
        className={`${
          isOpen ? "bg-primary" : "bg-gray-200"
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span className="sr-only">{label}</span>
        <span
          className={`${
            isOpen ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
      <div className="text-gray-500">{label}</div>
    </div>
  );
}

export const ScaleInTransition = ({
  children,
  isOpen,
}: {
  children: ReactElement;
  isOpen: boolean;
}) => {
  return (
    <Transition
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-100"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
      show={isOpen}
    >
      {isOpen && children}
    </Transition>
  );
};

export const ErrorLabel = ({ value }: { value?: string }) => {
  return (
    <ScaleInTransition isOpen={Boolean(value)}>
      <span className="text-red-500 text-sm m-0 pl-2"> {value} </span>
    </ScaleInTransition>
  );
};

export const ModalTransition = ({
  show,
  children,
}: {
  show: boolean;
  children: ReactElement;
}) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full transform overflow-hidden rounded-md bg-white p-5 text-left align-middle shadow-xl transition-all max-w-sm">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
