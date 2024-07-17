import React from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from "react-table";
import { Button, PageButton } from "./Button";
import { classNames } from "./Utils";
import { SortIcon, SortUpIcon, SortDownIcon } from "./Icons";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <label className="flex gap-x-3 items-center">
      {/* <span className="text-gray-700">Search: </span> */}
      <input
        type="text"
        className="bg-[#F5EEF8] rounded-lg  outline-none px-2 py-2"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </label>
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <label className="flex gap-x-2 items-baseline">
      <span className="text-gray-700">{render("Header")}: </span>
      <select
        className="bg-[#F5EEF8] rounded-lg  outline-none px-4 py-2"
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function StatusPill({ value }) {
  const status = value ? value.toLowerCase() : "unknown";

  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        status === "active" ? "bg-green-100 text-green-800" : null,
        status === "inactive" ? "bg-yellow-100 text-yellow-800" : null
      )}
    >
      {status}
    </span>
  );
}

export function StatusActive({ value }) {
  const status = value ? "inactive" : "active";

  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        status.startsWith("active") ? "bg-green-100 text-green-800" : null,
        status.startsWith("inactive") ? "bg-yellow-100 text-yellow-800" : null,
        status.startsWith("offline") ? "bg-red-100 text-red-800" : null
      )}
    >
      {status}
    </span>
  );
}

export function StatusPayment({ value }) {
  //const status = value ? "inactive" : "active";

  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        value.startsWith("pending") ? "bg-yellow-100 text-yellow-800" : null,
        value.startsWith("rejected") ? "bg-red-100 text-red-800" : null,
        value.startsWith("success") ? "bg-green-100 text-green-800" : null
      )}
    >
      {value}
    </span>
  );
}

export function StatusOrder({ value }) {
  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        value.startsWith("processing") ? "bg-yellow-100 text-yellow-800" : null,
        value.startsWith("confirmed") ? "bg-amber-100 text-amber-800" : null,
        value.startsWith("shipped") ? "bg-blue-100 text-blue-800" : null,
        value.startsWith("out for delivery")
          ? "bg-blue-100 text-blue-800"
          : null,

        value.startsWith("delivered") ? "bg-green-100 text-green-800" : null,
        value.startsWith("cancelled") ? "bg-red-100 text-red-800" : null
      )}
    >
      {value}
    </span>
  );
}

export function StatusRead({ value }) {
  const status = value ? "unread" : "read";

  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        status === "read" ? "bg-green-100 text-green-800" : null,
        status === "unread" ? "bg-yellow-100 text-yellow-800" : null
      )}
    >
      {status}
    </span>
  );
}

export function DetailButton({ value }) {
  return (
    <Link
      to={value}
      className="bg-[#512E5F] text-md tracking-wide py-2 px-4 rounded-xl text-white font-medium"
    >
      Detail
    </Link>
  );
}

export function AvatarCell({ value, column, row }) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10">
        <img
          className="h-10 w-10 rounded-full"
          src={row.original[column.imgAccessor]}
          alt=""
        />
      </div>
      <div className="ml-4">
        <div className="text-sm font-medium text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">
          {row.original[column.emailAccessor]}
        </div>
      </div>
    </div>
  );
}

function Table({ columns, data, handleNext, handleprevious, page1 }) {
  //const data2 = data;
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,

    nextPage,
    previousPage,
    setPageSize,

    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination // new
  );

  // Render the UI for your table
  return (
    <>
      <div className="sm:flex sm:gap-x-2 justify-between items-center">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        {headerGroups.map((headerGroup) =>
          headerGroup.headers.map((column) =>
            column.Filter ? (
              <div className="mt-2 sm:mt-0" key={column.id}>
                {column.render("Filter")}
              </div>
            ) : null
          )
        )}
      </div>
      {/* table */}
      <div className="mt-4 flex flex-col">
        {/* <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8"> */}
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-7">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-[#F5EEF8] sm:rounded-lg">
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-[#F5EEF8]"
              >
                <thead className="bg-[#F5EEF8]">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        // Add the sorting props to control sorting. For this example
                        // we can add them into the header props
                        <th
                          scope="col"
                          className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          <div className="flex items-center justify-between">
                            {column.render("Header")}
                            {/* Add a sort direction indicator */}
                            <span>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <SortDownIcon className="w-4 h-4 text-[#512E5F]" />
                                ) : (
                                  <SortUpIcon className="w-4 h-4 text-[#512E5F]" />
                                )
                              ) : (
                                <SortIcon className="w-4 h-4 text-[#512E5F] opacity-0 group-hover:opacity-100" />
                              )}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-[#F5EEF8]"
                >
                  {page.map((row, i) => {
                    // new
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          //  console.log(cell)
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="px-6 py-4 whitespace-nowrap"
                              role="cell"
                            >
                              {cell.column.Cell.name === "defaultRenderer" ? (
                                <div className="text-sm text-gray-500">
                                  {cell.render("Cell")}
                                </div>
                              ) : (
                                cell.render("Cell")
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <div className="py-3 flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex gap-x-2 items-baseline">
            <span className="text-sm text-gray-700">
              Page <span className="font-medium">{page1}</span>
            </span>
            <label>
              <span className="sr-only">Items Per Page</span>
              <select
                className="mt-1 block w-full bg-[#F5EEF8] rounded-lg  outline-none px-2 py-2"
                value={state.pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-lg -space-x-px"
              aria-label="Pagination"
            >
              <PageButton
                className="!rounded-l-lg !bg-[#F5EEF8] !hover:bg-[#F5EEF8] !border-[#512E5F]"
                onClick={() => {
                  handleprevious();
                }}
              >
                <span className="sr-only">First</span>
                <HiChevronDoubleLeft
                  className="h-5 w-5 text-[#512E5F]"
                  aria-hidden="true"
                />
              </PageButton>
              <PageButton
                className="!bg-[#F5EEF8] !hover:bg-[#F5EEF8] !border-[#512E5F]"
                onClick={() => {
                  handleprevious();
                }}
              >
                <span className="sr-only">Previous</span>
                <HiChevronLeft
                  className="h-5 w-5 text-[#512E5F]"
                  aria-hidden="true"
                />
              </PageButton>
              <PageButton
                className=" !bg-[#F5EEF8] !hover:bg-[#F5EEF8] !border-[#512E5F]"
                onClick={() => handleNext()}
              >
                <span className="sr-only">Next</span>
                <HiChevronRight
                  className="h-5 w-5 text-[#512E5F]"
                  aria-hidden="true"
                />
              </PageButton>
              <PageButton
                className="!rounded-r-lg !bg-[#F5EEF8] !hover:bg-[#F5EEF8] !border-[#512E5F]"
                onClick={() => handleNext()}
              >
                <span className="sr-only">Last</span>
                <HiChevronDoubleRight
                  className="h-5 w-5 text-[#512E5F]"
                  aria-hidden="true"
                />
              </PageButton>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
