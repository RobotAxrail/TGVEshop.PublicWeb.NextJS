import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MdOutlineClose } from "react-icons/md";

export default function GiftCardDialog({ children, open, onClose }: any) {
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative " onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 z-[21]" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto z-[22]">
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
                <Dialog.Panel className=" w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <button
                    className="cursor-pointer absolute top-1 right-1 p-2 hover:brightness-75 z-20 outline-none rounded-full w-10 h-10 bg-slate-200 flex items-center justify-center"
                    onClick={onClose}
                  >
                    <MdOutlineClose />
                  </button>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
