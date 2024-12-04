import { useEffect, Fragment } from "react";

import { Transition } from "@headlessui/react";
import { SuccessIcon, FailedIcon, CloseIcon } from "@/components/icons/Icons";

import { useToastStore } from "@/states/toastBarState";
const Toast = (props) => {
  const [toastbar, setToastbar] = useToastStore();
  const { isQLEggs } = props;

  const closeAlert = () => setToastbar({ ...toastbar, show: false });

  // closing alert after a period
  useEffect(() => {
    let alertTimer = null;
    let timeoutDuration = 5500;
    if (isQLEggs) {
      timeoutDuration = 7500;
    }
    if (
      toastbar.show &&
      (toastbar.autoClose === undefined || toastbar.autoClose === true)
    ) {
      setTimeout(closeAlert, timeoutDuration);
    }

    return () => clearTimeout(alertTimer);
  }, [closeAlert, toastbar]);

  return (
    <Transition
      as={Fragment}
      show={toastbar.show}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-2000"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className="fixed sm:top-24 left-3 right-3 
        top-3 
        transition-all 
        z-[11230] 
        flex items-middle justify-center"
      >
        <div
          className={[
            "drop-shadow-lg text-sm rounded text-white flex items-middle justify-center",
            toastbar.severity === "success" ? "bg-green-alert" : "bg-[#E74C3C]",
          ].join(" ")}
        >
          <div className="mr-3 py-2.5 pl-4">
            {toastbar.severity === "success" ? <SuccessIcon /> : <FailedIcon />}
          </div>

          <div className="py-3">{toastbar.message}</div>
          <div className="py-2.5 pr-2.5 ml-4">
            <button
              onClick={closeAlert}
              type="button"
              title="Close"
              className="
              pt-0.5 pl-0.5 pr-1.5 pb-1.5 
              transition-all 
              font-medium 
              rounded-full 
              inline-flex items-middle
              hover:bg-black hover:bg-opacity-10"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Toast;
