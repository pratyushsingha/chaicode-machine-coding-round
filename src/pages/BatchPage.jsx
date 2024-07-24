import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { GrNext, GrPrevious } from "react-icons/gr";
import Button from "../components/Button";

const columns = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="flex space-x-3">
        <img
          src="/sqlImage.png"
          alt="Course"
          className="w-24 h-16 rounded-lg"
        />
        <p className="self-center">{row.original.title}</p>
      </div>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "validity",
    header: "Validity/Expiry",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Button
        classname={`${
          row.original.status === "Published"
            ? "bg-[#76c275] border-green-800"
            : "bg-gray-300  border-gray-600"
        }`}
      >
        {row.original.status}
      </Button>
    ),
  },
];

const BatchPage = () => {
  const [batches, setBatches] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const getBatches = async () => {
    const response = await fetch(
      "https://mocki.io/v1/98df0de2-16da-476b-93a9-c9d3aa9f7e86"
    );
    const data = await response.json();
    setBatches(data.batches);
  };

  useEffect(() => {
    getBatches();
  }, []);

  const table = useReactTable({
    columns,
    data: batches,
    state: {
      globalFilter,
    },
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
  });

  return (
    <Container bg="bg-pink-300" textColor="text-[#444B79]">
      <section className="flex justify-center items-center">
        <div className="bg-white rounded-2xl w-8/12 p-10">
          <h2 className="h2">Batches</h2>
          <p>Create learner’s batch and share information at the same time.</p>
          <div className="flex space-x-3 my-5">
            <input
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="rounded px-2 py-1"
              type="text"
              placeholder="Search by Title (alt+k or cmd+k)"
            />
            <button className="bg-[#6C6BAF] py-1 px-2 rounded-md text-white">
              Search
            </button>
          </div>
          <table className="min-w-full bg-white">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-gray-200 text-left">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-4 py-2 border">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-t">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-2 border">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-2 text-center"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-end items-end mt-4 ">
            <label htmlFor="rowsPerPage" className="mr-2 self-center">
              Rows per page
            </label>

            <select
              id="rowsPerPage"
              className="border border-gray-300 p-2 rounded self-center"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 20, 30, 40].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <button
              className="p-2 rounded self-center"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <GrPrevious />
            </button>
            <button
              className="p-2 rounded ml-2 self-center"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <GrNext />
            </button>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default BatchPage;
