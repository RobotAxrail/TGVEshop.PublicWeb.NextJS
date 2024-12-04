import { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";
import classes from "./MobileViewFullScreenModal.module.scss";

function MobileViewFullScreenModal({
  open,
  onClose,
  children,
  fullScreen = true,
  scrollable = true,
  ...props
}) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        onClose={onClose}
        // className={`fixed z-[1110] inset-0 overflow-y-auto ml-auto mr-auto ${props?.className}`}
        className={[
          "fixed z-[1110] inset-0",
          fullScreen
            ? "h-[var(--app-height)]"
            : "min-h-0 lg:min-h-[var(--app-height)]",
        ].join(" ")}
      >
        <div
          className={[
            "flex sm:items-center justify-center flex-1",
            "h-full",
          ].join(" ")}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className={"fixed inset-0 bg-black bg-opacity-30 h-full"}
            />
          </Transition.Child>
          {/*
          ...and another Transition.Child to apply a separate transition
          to the contents.
        */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={[
                `relative text-sm ${props.className}`,
                scrollable ? "overflow-y-scroll" : "overflow-hidden",
                fullScreen ? "h-full" : "min-h-0 lg:min-h-[var(--app-height)]",
                classes["no-scrollbar"],
              ].join(" ")}
            >
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default MobileViewFullScreenModal;
