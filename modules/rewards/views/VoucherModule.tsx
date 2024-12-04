import FilledTab from "../components/common/FilledTab";
import { VoucherPointsTab } from "./VoucherPointsTab";
import { VoucherDealsTabs } from "./VoucherDealsTab";
import { Tab } from "@headlessui/react";
import React from "react";

export default function VoucherModule() {
  return (
    <div className="w-full">
      <FilledTab title={["Points", "Deals"]}>
        <Tab.Panel>
          <VoucherPointsTab />
        </Tab.Panel>
        <Tab.Panel>
          <VoucherDealsTabs />
        </Tab.Panel>
      </FilledTab>
    </div>
  );
}
