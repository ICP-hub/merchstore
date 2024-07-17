import React, { useEffect, useState } from "react";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import Button from "../common/Button";
import SmoothList from "react-smooth-list";
import ProductApiHandler from "../../apiHandlers/ProductApiHandler";

// const categories = ["All", "Home", "Music", "Phone", "Storage", "Other"];
/* ----------------------------------------------------------------------------------------------------- */
/*  @ CategoriesVertical : Product Page.
/* ----------------------------------------------------------------------------------------------------- */
const CategoriesVertical = ({ searchProductByCategory, state }) => {
  const { categoryList, getCategoryList } = ProductApiHandler(1);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [initialRender, setInitialRender] = useState(true);

  const categories = ["All"];

  // Category name from category list:
  if (categoryList !== null) {
    categoryList.map(({ name }) => categories.push(name));
  }

  // ApplyFilter based on category
  const handleCategoryFilter = (category, index) => {
    // If navigating from the HomePage
    searchProductByCategory(category);
    setFocusedIndex(index);
    setInitialRender(false);
  };

  useEffect(() => {
    if (initialRender && state === null) {
      setFocusedIndex(0);
    } else {
      setFocusedIndex(-1);
    }
  }, [state, initialRender]);

  // Call getCategoryList at page reload
  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <SmoothList
      delay={200}
      className="flex flex-col min-w-40 gap-1 max-md:w-full max-md:items-center nax-md:justify-center"
    >
      <h1 className="text-lg font-bold">Categories</h1>
      {categories.map((category, index) => (
        <Button
          key={index}
          className={`focus:outline-none py-2 px-4 rounded-full   capitalize ${
            (initialRender && state === category) || focusedIndex === index
              ? "bg-black text-white"
              : ""
          } focus:bg-black hover:text-white hover:bg-black focus:text-white flex items-start font-semibold max-md:text-sm w-full max-md:justify-center capitalize`}
          onClick={() => handleCategoryFilter(category, index)}
        >
          {category}
        </Button>
      ))}
    </SmoothList>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ CategoriesVertical : Home Page.
/* ----------------------------------------------------------------------------------------------------- */
const CategoriesHorizontal = ({ searchProductByCategory }) => {
  const { categoryList, getCategoryList } = ProductApiHandler(0);
  const [focusedIndex, setFocusedIndex] = useState(0);
  // Extract categories using a loop
  const categories = ["All"];
  // Show category name from category list:
  if (categoryList !== null) {
    // categoryList.map(([cateSlug, { name }]) => categories.push(name));
    // Display only featured categories for HomePage ???
    categoryList.forEach((item) => {
      if (item.featured) {
        categories.push(item.name);
      }
    });
  }

  // ApplyFilter based on category
  const handleCategoryFilter = (category, index) => {
    searchProductByCategory(category);
    setFocusedIndex(index);
  };

  // Call getCategoryList at page reload
  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <SmoothList
      delay={200}
      className="flex justify-between  max-lg:flex-col gap-2"
    >
      <SmoothList
        delay={200}
        className="flex gap-2 max-md:overflow-x-auto snap-proximity snap-x scroll-container"
        style={scrollStyle}
      >
        {categories.map((category, index) => (
          <Button
            key={index}
            className={`px-4 py-1 rounded-full capitalize ${
              focusedIndex === index ? "bg-black text-white" : ""
            }
            hover:border hover:border-black focus:border focus:border-black  focus:bg-black hover:text-white hover:bg-black focus:text-white border border-slate-500  flex items-start font-semibold text-sm focus:outline-none min-w-max `}
            autoFocus={focusedIndex === index}
            onClick={() => handleCategoryFilter(category, index)}
          >
            {category}
          </Button>
        ))}
      </SmoothList>
      {/* <Button
        onClick={() => navigate("/products")}
        className="hidden md:block px-4 py-1 rounded-full hover:border hover:border-black focus:border focus:border-black  focus:bg-black hover:text-white hover:bg-black focus:text-white border border-slate-500 bg-white flex items-start font-semibold text-sm max-w-max"
      >
        See All Products
      </Button> */}
    </SmoothList>
  );
};

// Hide Scrollbar : https://stackoverflow.com/a/68111307/18721948
export const scrollStyle = {
  msOverflowStyle: "none", // hide scrollbar for IE, Edge, and Firefox
  scrollbarWidth: "none", // hide scrollbar for Firefox
  "&::WebkitScrollbar": {
    display: "none", // hide scrollbar for Chrome, Safari, and Opera
  },
  scrollSnapType: "x proximity", // enable horizontal scrolling with snap points
  WebkitOverflowScrolling: "touch", // Optional: Enables smooth scrolling on iOS devices
};

export { CategoriesHorizontal, CategoriesVertical };
