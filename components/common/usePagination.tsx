import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export type TQueryListFunc<T extends object> = (p: {
  nextToken?: string;
  limit: number;
  page: number;
}) => Promise<{
  nextToken: string;
  total: number;
  list: T[];
}>;

function usePagination<T extends object>({
  queryKey,
  queryFunc,
  pageLimit,
  useQueryParams,
}: {
  queryKey: string;
  queryFunc: TQueryListFunc<T>;
  pageLimit: number;
  useQueryParams?: { refetchOnWindowFocus: boolean };
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [nextToken, setNextToken] = useState<string>();
  const [currentQueryKey, setCurrentQueryKey] = useState(
    `${queryKey}-${new Date().toISOString()}`
  );
  const { data, isLoading, refetch } = useQuery({
    ...useQueryParams,
    queryKey: [currentQueryKey, currentPage, pageLimit],
    onSuccess: (data) => {
      setNextToken(data?.nextToken);
      setTotalPages(
        (Math.floor(data.total / pageLimit)) + (data.total % pageLimit > 0 ? 1 : 0)
      );
    },
    queryFn: async () => {
      return await queryFunc({
        nextToken,
        limit: pageLimit,
        page: currentPage,
      });
    },
  });

  const refreshPagination = () =>
    setCurrentQueryKey(`${queryKey}-${new Date().toISOString()}`);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevData) => (prevData += 1));
    }
  };
  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prevData) => (prevData -= 1));
    }
  };

  const handleSetCurrentPage = (value: number) => {
    let clampedPage = Math.min(Math.max(value, 0), totalPages - 1);
    setCurrentPage(clampedPage);
  };

  // current page starts from index zero
  // total page returns the total amount of counted pages
  return {
    items: data?.list as T[],
    currentPage,
    totalPages,
    isLoading,
    refreshPagination,
    handleNext,
    handlePrev,
    handleSetCurrentPage,
    refetch
  } as {
    items: T[];
    currentPage: number
    totalPages: number
    isLoading: boolean
    refreshPagination : () => void
    handleNext: () => void
    handlePrev: () => void
    handleSetCurrentPage: (value: number) => void
    refetch:  <TPageData>(options?: RefetchOptions & RefetchQueryFilters<TPageData>) => Promise<QueryObserverResult<any, unknown>>
  };
}

export default usePagination;
