import React, { useEffect, useState } from "react";
import SearchBar from "../common/SearchBar";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import SmoothList from "react-smooth-list";
import ProductApiHandler from "../../apiHandlers/ProductApiHandler";
import NoDataFound from "../common/NoDataFound";
import { CategoriesVertical } from "./Categories";
import { useLocation, useNavigate } from "react-router-dom";
import TrendingProductCardLoader from "../common/TrendingProductCardLoader";
import { useAuth } from "../../auth/useClient";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ ProductPageContainerMain 
/* ----------------------------------------------------------------------------------------------------- */
const ProductPageContainerMain = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const { backend } = useAuth();
  // Retrieve data and methods from the ProductApiHandler
  const {
    productList,
    isLoading,
    getProductList,
    searchProductByCategory,
    searchProductByName,
  } = ProductApiHandler({ currentPage });

  // Extract category
  // State variables for pagination

  const [productsPerPage] = useState(8); // State to prevent continuous re-renders. Only load on mount
  // useEffect hook to fetch product list on initial load

  // useLocation for navigating to the current product category from homePageBottom: pass the state
  const { state } = useLocation();

  useEffect(() => {
    if (initialLoad) {
      getProductList();
      // If navigating from the homepage by clicking CategoryCard
      if (state !== null) {
        searchProductByCategory(state);
        // console.log(state);
        // If reload product page clear history and show 'all' products
        window.history.replaceState({}, "");
      }
      setInitialLoad(false);
    }
  }, [getProductList, initialLoad, currentPage, backend]);
  console.log(currentPage);

  return (
    <div className="container mx-auto p-6 rounded-2xl max-md:px-2">
      {/* Top container : search bar */}
      <ProductPageContainerTop searchProductByName={searchProductByName} />
      {/* Main container : categories, products, and pagination : pass productList */}
      <ContainerMid
        productList={productList}
        loading={isLoading}
        searchProductByCategory={searchProductByCategory}
        state={state}
        currentPage={currentPage}
        productsPerPage={productsPerPage}
        setCurrentPage={setCurrentPage}
        setInitialLoad={setInitialLoad}
      />
    </div>
  );
};

// Top Container component
export const ProductPageContainerTop = ({ searchProductByName }) => {
  const [searchProductInput, setSearchProductInput] = useState("");

  useEffect(() => {
    searchProductByName(searchProductInput);
  }, [searchProductInput]);

  return (
    <SmoothList
      delay={200}
      className="max-md:px-2 py-6 flex items-center gap-6 max-md:flex-col max-md:items-start sm:justify-between"
    >
      <div className="font-bold text-3xl">Give All You Need</div>
      {/* Search bar component : dynamic value and change handler */}
      <SearchBar
        type="text"
        placeholder="Search on Merch Store"
        icon
        value={searchProductInput}
        onChange={(e) => setSearchProductInput(e.target.value)}
      />
    </SmoothList>
  );
};

// Main container : categories, products, and pagination
const ContainerMid = ({
  productList,
  loading,
  searchProductByCategory,
  state,
  currentPage,
  productsPerPage,
  setCurrentPage,
  setInitialLoad,
}) => {
  // Number of products to display per page
  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = Math.min(startIndex + productsPerPage, productList?.length);
  const currentProducts = productList?.slice(startIndex, endIndex);
  // Function to handle pagination

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex gap-2 max-md:flex-col py-6">
      <CategoriesVertical
        searchProductByCategory={searchProductByCategory}
        state={state}
      />

      <div className="w-full md:w-5/6">
        {/* Render loading screen only when loading */}
        {loading && (
          <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-8 max-lg:grid-cols-2 max-sm:grid-cols-1 pb-4 border-b border-b-slate-500">
            {Array.from({ length: 8 }, (_, index) => (
              <TrendingProductCardLoader key={index} />
            ))}
          </div>
        )}

        {!loading && productList?.length === 0 && (
          <div className="text-center text-gray-500 font-semibold w-full bg-gray-300 rounded-2xl">
            <NoDataFound
              title={"No Product Found"}
              bgcolor={"bg-white/50 backdrop-blur-sm"}
            />
          </div>
        )}

        {!loading && productList?.length > 0 && (
          <>
            <SmoothList
              delay={200}
              className="grid lg:grid-cols-3 xl:grid-cols-4 gap-8 max-lg:grid-cols-2 max-sm:grid-cols-1 pb-4 border-b border-b-slate-500"
            >
              {currentProducts.length === 0
                ? productList.map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))
                : currentProducts.map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))}
            </SmoothList>

            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={productList?.length}
              currentPage={currentPage}
              paginate={setCurrentPage}
              setInitialLoad={setInitialLoad}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPageContainerMain;
