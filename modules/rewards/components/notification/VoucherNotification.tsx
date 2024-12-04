import SEO from "@/components/seo/SEO";
import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, ReactElement } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Button } from "react-vant";

export const VoucherNotification = ({
  isViewingVoucher,
  children,
  selectedIndex,
}: {
  isViewingVoucher: boolean;
  children?: ReactElement | ReactElement[];
  selectedIndex: number;
}) => {
  const tabs = ["Sent", "Pending"];
  const router = useRouter();
  return (
    <div className="h-fit relative w-full">
      <SEO title="Vouchers" keywords="" description="Voucher notifications" />
      {!isViewingVoucher && (
        <div className="relative flex flex-row items-center justify-center h-12 mb-4">
          <div className="absolute flex left-0 inset-y-0 h-12">
            <Button
              icon={<FiArrowLeft />}
              className="hover:bg-[#EEF2F6] self-center"
              style={{
                borderRadius: "8px",
                border: "none",
                marginLeft: "-8px",
              }}
              text="Go Back"
              onClick={() => {
                router.push("/rewards");
              }}
            />
          </div>
          <label className="text-lg font-medium">Voucher Notification</label>
        </div>
      )}
      <Tab.Group selectedIndex={selectedIndex}>
        {!isViewingVoucher && (
          <Tab.List
            className={
              "flex flex-row space-x-1 w-full rounded-md shadow shadow-[rgba(16, 24, 40, 0.06)] p-[2px]"
            }
          >
            {tabs.map((title) => (
              <Tab as={Fragment} key={title}>
                {({ selected }) => (
                  <button
                    className={`w-full rounded-md px-0 sm:px-4 py-2 outline-none ${
                      selected && "bg-[#0A2540] text-white"
                    }`}
                    onClick={() =>
                      router.push({
                        pathname: "/rewards",
                        query: {
                          isReceive: selectedIndex === 0 ? "true" : "false",
                        },
                      })
                    }
                  >
                    {title}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
        )}
        <Tab.Panels className={"h-fit mt-6"}>{children}</Tab.Panels>
      </Tab.Group>
    </div>
  );
};
