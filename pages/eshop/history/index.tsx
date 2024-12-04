import Image from "next/image";
import React, { useState } from "react";
import voucher1 from "public/assets/mock-images/vouchers/voucher1.svg";
import carticon from "public/assets/images/carticon.svg";
import { IoIosArrowDown } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/router";

const History = () => {
  const router = useRouter();
  const handleBack = () => {
    router.push("/eshop/cart"); // Navigate to /eshop
  };
  const mockTransactionHistory = {
    historyTransactions: [
      {
        id: "transaction_001",
        type: "Pick Up",
        category: "Merchandise",
        dateTime: "10 Aug 2024 08:00 AM",
        status: "Failed",
        items: [
          {
            name: "T-Shirt & Royale Pop Corn",
            price: 70.0,
            image: voucher1,
          },
          {
            name: "Voucher Buy 1 Get 1 Signature Popcorn (Small) + 1x Regular Drink/Mineral Water",
            price: 8.0,
            image: voucher1,
          },
        ],
        totalAmount: 78.0,
      },
      {
        id: "transaction_002",
        type: "Voucher",
        category: null,
        dateTime: "09 Aug 2024 08:00 AM",
        status: "Success",
        items: [
          {
            name: "Voucher Buy 1 Get 1 Signature Popcorn (Small) + 1x Regular Drink/Mineral Water",
            price: 8.0,
            image: voucher1,
          },
        ],
        totalAmount: 8.0,
      },
      {
        id: "transaction_003",
        type: "Delivery",
        category: "Product",
        dateTime: "08 Aug 2024 08:00 AM",
        status: "Success",
        items: [
          {
            name: "Original Tenpanyaki - Tama Garden",
            price: 23.02,
            image: voucher1,
          },
        ],
        totalAmount: 23.02,
      },
    ],
    filters: {
      transactionTypes: ["All Transaction", "Pick Up", "Voucher", "Delivery"],
      statusTypes: ["All Status", "Success", "Failed"],
      dateRanges: ["All Date"],
    },
  };

  const uniqueDates = [
    "All Date",
    ...new Set(
      mockTransactionHistory.historyTransactions.map((transaction) =>
        transaction.dateTime.split(" ").slice(0, 3).join(" ")
      )
    ),
  ];

  mockTransactionHistory.filters.dateRanges = uniqueDates;

  const [selectedTransactionType, setSelectedTransactionType] =
    useState("All Transaction");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedDate, setSelectedDate] = useState("All Date");

  // Add Dropdown component
  const Dropdown = ({ options, selected, onSelect }) => (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 bg-[#292929] rounded-full text-[12px] font-normal border-[1px] border-[#F4F4F5]">
        {selected}
        <IoIosArrowDown size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#292929] border-none min-w-[150px]">
        {options.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => onSelect(option)}
            className="text-[12px] font-normal hover:bg-[#3F3F3F] focus:bg-[#3F3F3F] cursor-pointer"
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Add this filter section before your transaction list
  const FilterSection = () => (
    <div className=" flex gap-2 mb-4 overflow-x-auto py-2 whitespace-nowrap scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <Dropdown
        options={mockTransactionHistory.filters.transactionTypes}
        selected={selectedTransactionType}
        onSelect={setSelectedTransactionType}
      />
      <Dropdown
        options={mockTransactionHistory.filters.statusTypes}
        selected={selectedStatus}
        onSelect={setSelectedStatus}
      />
      <Dropdown
        options={mockTransactionHistory.filters.dateRanges}
        selected={selectedDate}
        onSelect={setSelectedDate}
      />
    </div>
  );

  // Filter the transactions based on selected filters
  const filteredTransactions =
    mockTransactionHistory.historyTransactions.filter((transaction) => {
      const matchesType =
        selectedTransactionType === "All Transaction" ||
        transaction.type === selectedTransactionType;
      const matchesStatus =
        selectedStatus === "All Status" ||
        transaction.status === selectedStatus;

      // Add date filtering logic
      const transactionDate = transaction.dateTime
        .split(" ")
        .slice(0, 3)
        .join(" ");
      const matchesDate =
        selectedDate === "All Date" || transactionDate === selectedDate;

      return matchesType && matchesStatus && matchesDate;
    });

  return (
    <div className="p-4">
      <div className="flex items-center py-[20.5px] mb-4 gap-2">
        <GoArrowLeft
          size={16}
          onClick={handleBack}
          className="cursor-pointer"
        />
        <h1 className="font-medium text-[16px]">History Transaction </h1>
      </div>
      <FilterSection />
      <div className="flex flex-col gap-4">
        {filteredTransactions.map((transaction, index) => (
          <div
            key={transaction.id}
            className="flex flex-col gap-4 py-4 px-3 rounded-[12px] border border-[#D4D4D426]"
          >
            <div className="flex justify-between">
              <div className="flex gap-2">
                <div>
                  <Image src={carticon} />
                </div>
                <div className="font-medium">
                    <div className="flex items-center">
                  <p className="font-medium text-[12px]">{transaction.type}</p>
        
                </div>
                  <p className="text-[#D4D4D4] font-normal text-[12px]">
                    {transaction.dateTime}
                  </p>
                </div>
              </div>
              <div>
                <p
                  className={`h-[20px] px-2 rounded-[100px] flex items-center font-normal text-[12px] ${
                    transaction.status.toLocaleLowerCase() === "failed"
                      ? "bg-[#D31A1A]"
                      : "bg-[#02A771]"
                  }`}
                >
                  {transaction.status}
                </p>
              </div>
            </div>
            <hr className="border-[#D4D4D426]" />
            <div className="flex flex-col gap-4">
              {transaction.items.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-[50px] min-w-[50px]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="object-fit w-[50px] h-[50px]"
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div>
                      <p className="font-normal text-[12px]">{item.name}</p>
                    </div>
                    <div>
                      <p className="font-medium text-[12px]">
                        RM{item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
