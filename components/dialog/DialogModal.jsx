import { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";

function DialogModal(props) {
  const {
    open,
    onClose,
    smallDialog = true,
    title = "",
    className = "",
    children,
    type = null,
    contentClassName = "p-5",
  } = props;

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        onClose={() => {
          if (type !== "orderOption") {
            onClose();
          } else {
          }
        }}
        className={[
          "fixed inset-0 overflow-y-auto",
          type === "orderOption" ? "z-40" : "z-[1110]",
        ].join(" ")}
      >
        {/*
          Use one Transition.Child to apply one transition to the overlay...
        */}

        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
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
                "relative bg-white rounded-lg sm:max-w-1200 mx-3 ",
                smallDialog ? "max-w-sm" : "w-[90%]",
                className,
              ].join(" ")}
            >
              <div className={`${contentClassName} h-full`}>
                <div className="text-center h-full">
                  {title && (
                    <Dialog.Title className="text-2xl font-bold text-gray-900">
                      {title}
                    </Dialog.Title>
                  )}
                  <div className="text-sm h-full">{children}</div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default DialogModal;
