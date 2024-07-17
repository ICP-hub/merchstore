import React from "react";
import Button from "../common/Button";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Pagination Buttons
/* ----------------------------------------------------------------------------------------------------- */
const PaginationButton = ({ children, isActive, onClick }) => (
  <Button
    onClick={onClick}
    className={`focus:bg-slate-200 hover:bg-slate-200 px-4 py-2 rounded-md ${
      isActive ? "bg-slate-200" : ""
    }`}
  >
    {children}
  </Button>
);

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Main Pagination Component
/* ----------------------------------------------------------------------------------------------------- */
const Pagination = ({
  productsPerPage,
  totalProducts,
  currentPage,
  paginate,
  setInitialLoad,
}) => {
  // Calculate the total number of pages needed
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-between max-w-full py-6">
      {/* Previous button */}
      <Button
        onClick={() => {
          paginate(currentPage - 1);
          setInitialLoad(true);
        }}
        className="font-semibold flex items-center gap-1"
        disabled={currentPage === 0}
      >
        <BsArrowLeft /> Previous
      </Button>

      {/* Page number buttons */}
      {/* <div className="flex items-center font-semibold gap-1">
        {pageNumbers.map((pageNumber) => (
          <PaginationButton
            key={pageNumber}
            isActive={currentPage === pageNumber}
            onClick={() => paginate(pageNumber)}
          >
            {pageNumber}
          </PaginationButton>
        ))}
      </div> */}

      {/* Next button */}
      <Button
        onClick={() => {
          paginate(currentPage + 1);
          setInitialLoad(true);
        }}
        className="font-semibold flex items-center gap-1"
        // disabled={currentPage === Math.ceil(totalProducts / productsPerPage)}
      >
        Next <BsArrowRight />
      </Button>
    </div>
  );
};

export default Pagination;
