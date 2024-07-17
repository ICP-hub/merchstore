import React from "react";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import { BsSearch } from "react-icons/bs";
import Button from "./Button";
import { RotatingLines, TailSpin } from "react-loader-spinner";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ Component Searchbar.
/* ----------------------------------------------------------------------------------------------------- */
const SearchBar = ({
  type,
  placeholder,
  icon,
  buttonText,
  value,
  onChange,
  onSearchClick,
  isLoading,
}) => {
  return (
    <div className="border border-slate-500 flex max-md:w-full px-1 py-1 rounded-full items-center gap-2 bg-white">
      {icon && <BsSearch size={25} className="ml-2" />}
      <input
        type={type}
        className={`w-full focus:outline-none placeholder:font-medium ${
          !icon && "ml-4" // Add ml-4 only when icon is not present
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {isLoading ? (
        <span className="px-4">
          <TailSpin
            visible={true}
            height="30"
            width="30"
            color="black"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperclassName=""
          />
        </span>
      ) : (
        buttonText?.length > 0 && (
          <Button
            className="bg-black text-white px-4 py-1 rounded-full"
            onClick={onSearchClick}
          >
            {buttonText}
          </Button>
        )
      )}
    </div>
  );
};

export default SearchBar;
