import { useEffect, useState } from "react";
import EShopNavBar from "../eshop/EShopNavBar";
import { useRouter } from "next/router";
import { useSearch } from "@/contexts/SearchContext";

export const EShopLayout = ({ children }) => {
  const { handleSearch, searchQuery } = useSearch();

  return (
    <div className="flex flex-col  gap-4">
      <div className="px-4 pt-5">
        <EShopNavBar onSearch={handleSearch} searchQuery={searchQuery} />
      </div>
      {children}
    </div>
  );
};
