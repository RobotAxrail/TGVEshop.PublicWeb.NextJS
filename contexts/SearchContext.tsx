import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";

const SearchContext = createContext<any>(null);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { query } = router;
  const searchValue = (query?.query as string) || "";

  const handleSearch = (value) => {
    setSearchQuery(value);

    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set("query", value);
      if (router.pathname !== "/eshop/search") {
        router.push(`/eshop/search?query=${encodeURIComponent(value)}`);
      }
    } else {
      url.searchParams.delete("query");
    }
    window.history.pushState({}, "", url);
  };

  useEffect(() => {
    if (searchValue) {
      setSearchQuery(searchValue);
    }
  }, []);

  const contextValue = { searchQuery, setSearchQuery, handleSearch };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook for using the context
export const useSearch = () => {
  return useContext(SearchContext);
};
