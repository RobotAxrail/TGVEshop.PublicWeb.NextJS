import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { TbAlertTriangle } from "react-icons/tb";
import { Button } from "react-vant";

export default function ActionDialog({
  type = "good",
  title,
  content,
  okButtonTitle,
  mainAction,
  closeAction,
  open,
  isLoading = false,
}: {
  type?: string;
  title: string;
  content: string;
  okButtonTitle: string;
  mainAction: () => any;
  closeAction: () => any;
  open: boolean;
  isLoading?: boolean;
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-999"
        onClose={closeAction}
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    {type === "bad" && (
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <TbAlertTriangle
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title className="text-xl font-medium text-gray-900 my-1.5">
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{content}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6 space-x-2 justify-end">
                  <Button
                    disabled={isLoading}
                    style={{
                      borderRadius: "0.375rem",
                      padding: "0 16px",
                      fontSize: 14,
                      fontWeight: 400,
                      color: "#0A2541",
                      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                      transition: "background-color 0.2s ease-in-out",
                    }}
                    onClick={() => closeAction()}
                  >
                    Cancel
                  </Button>
                  <Button
                    loading={isLoading}
                    style={{
                      backgroundColor: type === "good" ? "#0A2541" : "#F04438",
                      borderRadius: "0.375rem",
                      padding: "0 16px",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#fff",
                      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                      transition: "all 0.2s ease-in-out",
                    }}
                    onClick={() => mainAction()}
                  >
                    {okButtonTitle}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
