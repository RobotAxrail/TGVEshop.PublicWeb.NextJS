import React, { useContext, useEffect, useState } from "react";
import { Input } from "react-vant";
import { LuSettings2 } from "react-icons/lu";
import Image from "next/image";
import searchicon from "public/assets/images/search-icon-eshop.svg";
import MerchantContext from "@/contexts/MerchantContext";
import { API, graphqlOperation } from "aws-amplify";
import { getCustomerVoucherList } from "@/graphql/queries";
import { Minus, Plus } from "lucide-react";

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

const VoucherCart = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [voucherList, setVoucherList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const merchantInfoContext = useContext(MerchantContext);
  const [quantities, setQuantities] = useState({});

  const handleIncrement = (voucherId) => {
    setQuantities(prev => ({
      ...prev,
      [voucherId]: Math.min((prev[voucherId] || 0) + 1, (voucherList.find(v => v.voucherId === voucherId)?.remainingQuantity || 1))
    }));
  };

  const handleDecrement = (voucherId) => {
    setQuantities(prev => ({
      ...prev,
      [voucherId]: Math.max((prev[voucherId] || 0) - 1, 0) // Changed minimum to 0
    }));
  };

  const fetchVoucherListings = async () => {
    try {
      setIsLoading(true);
      let params = {
        merchantId: merchantInfoContext.merchantId,
        customerId: "7c029e21-0b11-461b-9187-cd6f2c9d7f8b",
        filterType: "",
      };

      const res = (await API.graphql(
        graphqlOperation(getCustomerVoucherList, params)
      )) as GetCustomerVoucherResponse;
      
      if (res.data?.getCustomerVoucherList?.voucherList) {
        const vouchers = res.data.getCustomerVoucherList.voucherList;
        setVoucherList(vouchers);
        // Initialize quantities to 0
        const initialQuantities = {};
        vouchers.forEach(voucher => {
          initialQuantities[voucher.voucherId] = 0; // Changed initial value to 0
        });
        setQuantities(initialQuantities);
      }
    } catch (error) {
      console.error("Error fetching voucher listings", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVoucherListings();
  }, [merchantInfoContext]);

  const filteredVouchers = voucherList.filter((voucher) =>
    voucher.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3 w-full justify-between">
        <div className="flex-grow relative">
          <Input
            placeholder="Search voucher"
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
            className="bg-[#292929] h-[40px] px-10 py-2 rounded-[50px] placeholder:font-normal placeholder:text-[13px] text-[#B5BBC4]"
          />
          <div className="absolute left-[12px] top-1/2 transform -translate-y-1/2 flex items-center">
            <Image src={searchicon} alt="Search" width={16} height={16} />
          </div>
        </div>
        <div className="bg-[#292929] w-[40px] h-[40px] rounded-full flex items-center justify-center">
          <LuSettings2 size={17.5} />
        </div>
      </div>

      <div className="bg-[#292929] p-3 rounded-[16px] flex flex-col gap-5">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 animate-pulse">
                <div className="w-[60px] h-[60px] bg-gray-600 rounded-[8px]" />
                <div className="flex-grow">
                  <div className="h-4 bg-gray-600 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-600 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredVouchers.length === 0 ? (
          <div className="text-center py-4 text-gray-400">
            No vouchers found
          </div>
        ) : (
          filteredVouchers.map((voucher) => (
            <div 
              key={voucher.voucherCode} 
              className="flex gap-4 items-start"
            >
              <img
                src={process.env.BUCKET_URL + voucher.voucherIcon}
                alt={voucher.title}
                className="w-[60px] h-[60px] rounded-[8px] object-cover"
              />
              <div className="flex flex-col gap-1 flex-grow">
                <h3 className="text-[14px] font-medium">{voucher.title}</h3>
                <div 
                  className="text-[12px] text-[#D4D4D4]"
                  dangerouslySetInnerHTML={{ __html: voucher.description }}
                />
                <p className="text-[12px] text-[#D4D4D4]">
                  Expires: {new Date(voucher.expiryDate).toLocaleDateString()}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-4 items-center">
                    <div
                      className="w-[19.5px] h-[19.5px] border-[1px] border-[#FFFFFF] rounded-full flex items-center justify-center cursor-pointer"
                      onClick={() => handleDecrement(voucher.voucherId)}
                    >
                      <Minus size={8.25} />
                    </div>
                    <div>{quantities[voucher.voucherId] || 0}</div>
                    <div
                      className="w-[19.5px] h-[19.5px] border-[1px] border-[#FFFFFF] rounded-full flex items-center justify-center cursor-pointer"
                      onClick={() => handleIncrement(voucher.voucherId)}
                    >
                      <Plus size={8.25} />
                    </div>
                  </div>
                  <p className="text-[12px] text-[#D4D4D4]">
                    Available: {voucher.remainingQuantity}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VoucherCart;