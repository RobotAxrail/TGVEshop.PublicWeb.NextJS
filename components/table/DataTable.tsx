import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Button } from "../ui/button";
import { useRouter } from "next/router";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: boolean;
  total?: number;
  currentPage?: number;
  setNextToken?: any;
  isApiFetching?: boolean;
  onClickRow?: any;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination = true,
  total,
  setNextToken,
  isApiFetching,
  onClickRow,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(total / 10),
  });

  const calculatePageRange = (
    currentPage: number,
    totalPages: number,
    maxPagesToShow: number
  ) => {
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);
    let startPage = Math.max(currentPage - halfPagesToShow, 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    if (totalPages - endPage < halfPagesToShow) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    return [...Array(endPage - startPage + 1)].map((_, i) => startPage + i);
  };

  const totalPages = Math.ceil(total / 10);
  const pageRange = calculatePageRange(
    table.getState().pagination.pageIndex + 1,
    totalPages,
    10
  );

  return (
    <>
      <div className="rounded-md border p-1">
        <Table>
          <TableHeader className="bg-[#EEF2F6]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isApiFetching && table.getRowModel().rows?.length === 0 && (
              <TableRow className="z-50 overflow-hidden bg-gray-100 opacity-75 ">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            )}
            {table.getRowModel().rows?.length > 0 &&
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`${onClickRow} && cursor-pointer`}
                  onClick={() => {
                    if (onClickRow) onClickRow(row.original);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {!isApiFetching && table.getRowModel().rows?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <div className="flex items-center justify-center space-x-2 mt-5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.previousPage();
              setNextToken((table.getState().pagination.pageIndex - 1) * 10);
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <div className="flex items-center justify-center text-sm font-medium gap-2">
            {pageRange.map((item) => (
              <Button
                className={
                  table.getState().pagination.pageIndex + 1 === item
                    ? "text-white"
                    : ""
                }
                variant={
                  table.getState().pagination.pageIndex + 1 === item
                    ? "default"
                    : "ghost"
                }
                size="sm"
                onClick={() => {
                  table.setPageIndex(item - 1);
                  setNextToken((item - 1) * 10);
                }}
              >
                {item}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.nextPage();
              setNextToken((table.getState().pagination.pageIndex + 1) * 10);
            }}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
}
