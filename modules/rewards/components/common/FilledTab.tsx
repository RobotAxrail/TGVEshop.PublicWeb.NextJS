import { Tab } from "@headlessui/react";
import { Fragment, ReactElement } from "react";

export default function FilledTab({
  enabledPadding,
  children,
  title,
}: {
  children: ReactElement | ReactElement[];
  enabledPadding?: boolean;
  title: string[];
}) {
  return (
    <Tab.Group>
      <div className={enabledPadding ? "px-2" : ""}>
        <Tab.List className={"rounded-md shadow-sm p-1 border bg-white"}>
          {title?.map((title) => (
            <Tab as={Fragment} key={title}>
              {({ selected }) => (
                <button
                  className={`p-2 w-[50%] ${
                    selected
                      ? "bg-primary text-white rounded-md"
                      : "text-gray-500"
                  }`}
                >
                  {title}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
      </div>

      <Tab.Panels className={"pt-4"}>{children}</Tab.Panels>
    </Tab.Group>
  );
}
