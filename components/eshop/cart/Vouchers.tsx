import React, { useContext, useEffect, useState } from "react";
import Voucher from "./Voucher";
import { API, graphqlOperation } from "aws-amplify";
import MerchantContext from "@/contexts/MerchantContext";
import { getCustomerVoucherList, getGiftCardDetail } from "@/graphql/queries";


type GetCustomerVoucherResponse = {
  data: {
    getCustomerVoucherList: {
      message: string;
      status: string;
      totalItem: number;
      voucherList: Record<string, any>[];
    }
  }
};

const Vouchers = () => {
  const merchantInfoContext = useContext(MerchantContext);
  const [voucherList, setVoucherList] = useState([]);
  const mockVouchers = {
    items: [
      {
        id: 1,
        name: "Voucher Buy 1 Get 1 Signature Popcorn (Small) + 1x Regular Drink/Mineral Water",
      },
      {
        id: 2,
        name: "Voucher Buy 1 Get 1 Signature Popcorn (Small) + 1x Regular Drink/Mineral Water",
      },
      {
        id: 3,
        name: "Voucher Buy 1 Get 1 Signature Popcorn (Small) + 1x Regular Drink/Mineral Water",
      },
    ],
  };

  const [selectedVoucherId, setSelectedVoucherId] = useState(null);

  const handleVoucherClick = (id) => {
    setSelectedVoucherId(id);
  };


  const fetchVoucherListings = async () => {
    try {
      let params = {
        merchantId: merchantInfoContext.merchantId,
        customerId: "7c029e21-0b11-461b-9187-cd6f2c9d7f8b",
        filterType: "",
      };

      const res = (await API.graphql(
        graphqlOperation(getCustomerVoucherList, params)
      )) as GetCustomerVoucherResponse;
      setVoucherList(res.data.getCustomerVoucherList.voucherList);

    } catch (error) {
      console.error("Error fetching voucher listings", error);
    }
  };

  useEffect(() => {
    fetchVoucherListings();

  }, [merchantInfoContext, voucherList]);

  return (
    <div className = "p-4 flex flex-col gap-6">
        <h1 className="font-medium text-[18px]">My Vouchers</h1>
        <div className = "flex flex-col gap-4">
      {voucherList.map((voucher, index) => (
        <Voucher
          key={voucher.voucherId}
          id={voucher.voucherId}
          title={voucher.description}
          expiry={voucher.expiryDate}
          isSelected={selectedVoucherId === voucher.voucherId}
          onClick={handleVoucherClick}
        />
      ))}
      </div>
    </div>
  );
};

export default Vouchers;