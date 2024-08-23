import React, { useEffect, useState } from "react";
import SearchBar from "../common/SearchBar";
import ProductCard from "./ProductCard";
// import Pagination from "./Pagination";
import SmoothList from "react-smooth-list";
import ProductApiHandler from "../../apiHandlers/ProductApiHandler";
import NoDataFound from "../common/NoDataFound";
import { CategoriesVertical } from "./Categories";
import { useLocation, useNavigate } from "react-router-dom";
import TrendingProductCardLoader from "../common/TrendingProductCardLoader";
import { useAuth } from "../../auth/useClient";
import Button from "../common/Button";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ ProductPageContainerMain 
/* ----------------------------------------------------------------------------------------------------- */
const ProductPageContainerMain = () => {
  const [currentPage, setCurrentPage] = useState(0);
  // const { getCategoryList, categoryList, isLoading } = ProductApiHandler({ currentPage });
  const { backend } = useAuth();
  const [categoryList, setCategoryList] = useState(null);
  const [productList, setProductList] = useState(null);
  const [productLoad, setProductLoad] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(
    sessionStorage.getItem("category") || "all"
  );
  const [searchProductInput, setSearchProductInput] = useState("");

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePrevPage = () =>
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0));

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const getProductList = async (category) => {
    sessionStorage.setItem("category", category);
    setProductLoad(true);
    setSearchProductInput("");
    try {
      if (category === "all") {
        const response = await backend.listallProducts(8, currentPage, true);
        setProductList(response);
        console.log("Product list response ", response);
      } else {
        const filteredProducts = await backend.search_by_category(
          8,
          currentPage,
          true,
          selectedCategory
        );
        console.log("filtered products are ", filteredProducts);
        setProductList(filteredProducts);
      }
    } catch (err) {
      console.error("Error fetching product list:", err);
    } finally {
      setProductLoad(false);
    }
  };

  // Get Category List
  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const categoryListResponse = await backend.listCategories(10, 0);
        setCategoryList(categoryListResponse.data);
        console.log("Category list response ", categoryListResponse);
      } catch (err) {
        console.error("Error fetching category list ", err);
      }
    };

    fetchCategoryList();
  }, [backend]);

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategory]);

  useEffect(() => {
    getProductList(selectedCategory);
  }, [currentPage, backend, selectedCategory]);

  useEffect(() => {
    // Search by title
    const searchByTitle = async () => {
      setProductLoad(true);
      try {
        const response = await backend.search_by_title(
          8,
          currentPage,
          true,
          searchProductInput
        );
        setProductList(response);
        console.log("response searchby input", response);
      } catch (err) {
        console.error("Error fetching search by title ", err);
      } finally {
        setProductLoad(false);
      }
    };
    if (searchProductInput.length >= 3) {
      searchByTitle();
    }
  }, [searchProductInput]);

  return (
    <div className="container mx-auto p-6 rounded-2xl max-md:px-2">
      <ProductPageContainerTopSearch
        searchProductInput={searchProductInput}
        setSearchProductInput={setSearchProductInput}
      />
      <ProductPageContainerMid
        categoryList={categoryList}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
        onProductLoad={productLoad}
        productList={productList}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
    </div>
  );
};

// Top search bar
const ProductPageContainerTopSearch = ({
  searchProductInput,
  setSearchProductInput,
}) => {
  return (
    <SmoothList
      delay={200}
      className="max-md:px-2 py-6 flex items-center gap-6 max-md:flex-col max-md:items-start sm:justify-between"
    >
      <div className="font-bold text-3xl">Give All You Need</div>
      {/* Search bar component : dynamic value and change handler */}
      <SearchBar
        type="text"
        placeholder="Search Products"
        icon
        value={searchProductInput}
        onChange={(e) => setSearchProductInput(e.target.value)}
      />
    </SmoothList>
  );
};

const ProductPageContainerMid = ({
  categoryList,
  selectedCategory,
  onCategoryClick,
  onProductLoad,
  productList,
  handleNextPage,
  handlePrevPage,
}) => {
  const totalPages = parseInt(productList?.total_pages);
  const currentPage = parseInt(productList?.current_page);

  return (
    <div className="flex gap-2 max-md:flex-col py-6 w-full">
      <div className="flex flex-col min-w-40 gap-2 max-md:w-full max-md:items-center nax-md:justify-center">
        <h1 className="text-lg font-bold">Categories</h1>
        <SmoothList delay={200}>
          {categoryList ? (
            <>
              <button
                className={`px-4 py-2 rounded-full focus:bg-black hover:text-white hover:bg-black focus:text-white flex items-start font-semibold max-md:text-sm w-full max-md:justify-center capitalize mb-px ${
                  selectedCategory === "all" ? "bg-black text-white" : ""
                }`}
                onClick={() => onCategoryClick("all")}
              >
                All
              </button>
              {categoryList?.map((category, index) => (
                <button
                  index={index}
                  className={`px-4 py-2 rounded-full focus:bg-black hover:text-white hover:bg-black focus:text-white flex items-start font-semibold max-md:text-sm w-full max-md:justify-center capitalize mb-px ${
                    selectedCategory === category.slug
                      ? "bg-black text-white"
                      : ""
                  }`}
                  onClick={() => onCategoryClick(category.slug)}
                >
                  {category.name}
                </button>
              ))}
            </>
          ) : (
            <div>Loading..</div>
          )}
        </SmoothList>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex w-full">
          {onProductLoad ? (
            <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-8 max-lg:grid-cols-2 max-sm:grid-cols-1 pb-4 border-b border-b-slate-500">
              {Array.from({ length: 8 }, (_, index) => (
                <TrendingProductCardLoader key={index} />
              ))}
            </div>
          ) : productList ? (
            productList.data.length > 0 ? (
              <SmoothList
                delay={200}
                className="grid lg:grid-cols-3 xl:grid-cols-4 gap-8 max-lg:grid-cols-2 max-sm:grid-cols-1 pb-4 border-b border-b-slate-500"
              >
                {productList.data.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </SmoothList>
            ) : (
              <div className="text-center text-gray-500 font-semibold w-full bg-gray-300 rounded-2xl">
                <NoDataFound
                  title={"No Product Found"}
                  bgcolor={"bg-white/50 backdrop-blur-sm"}
                />
              </div>
            )
          ) : null}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
        />
      </div>
    </div>
  );
};

const Pagination = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
}) => {
  return (
    <div className="flex items-center gap-2 mt-4">
      {/* Prev Button: Show only if currentPage is greater than 1 */}
      {currentPage > 1 && (
        <button
          className="font-semibold flex items-center gap-1 px-4 py-2 border border-gray-300 rounded justify-start"
          onClick={handlePrevPage}
        >
          Prev
        </button>
      )}

      {/* Next Button: Show only if currentPage is less than totalPages */}
      <div className="flex w-full justify-end">
        {currentPage < totalPages && (
          <button
            className="font-semibold flex justify-end items-center gap-1 px-4 py-2 border border-gray-300 rounded"
            onClick={handleNextPage}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
// const ProductPageContainerMain = () => {
// const [initialLoad, setInitialLoad] = useState(true);
// const [currentPage, setCurrentPage] = useState(0);
// const { backend } = useAuth();
// // Retrieve data and methods from the ProductApiHandler
// const {
//   productList,
//   isLoading,
//   getProductList,
//   searchProductByCategory,
//   searchProductByName,
// } = ProductApiHandler({ currentPage });

// // Extract category
// // State variables for pagination

// const [productsPerPage] = useState(8); // State to prevent continuous re-renders. Only load on mount
// // useEffect hook to fetch product list on initial load

// // useLocation for navigating to the current product category from homePageBottom: pass the state
// const { state } = useLocation();

// useEffect(() => {
//   if (initialLoad) {
//     getProductList();
//     // If navigating from the homepage by clicking CategoryCard
//     if (state !== null) {
//       searchProductByCategory(state);
//       // console.log(state);
//       // If reload product page clear history and show 'all' products
//       window.history.replaceState({}, "");
//     }
//     setInitialLoad(false);
//   }
// }, [getProductList, initialLoad, currentPage, backend]);

// return (
// <div className="container mx-auto p-6 rounded-2xl max-md:px-2">
//   {/* Top container : search bar */}
//   <ProductPageContainerTop searchProductByName={searchProductByName} />
//   {/* Main container : categories, products, and pagination : pass productList */}
//   <ContainerMid
//     productList={productList}
//     loading={isLoading}
//     searchProductByCategory={searchProductByCategory}
//     state={state}
//     currentPage={currentPage}
//     productsPerPage={productsPerPage}
//     setCurrentPage={setCurrentPage}
//     setInitialLoad={setInitialLoad}
//   />
// </div>
// );
// };

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
        placeholder="Search Products"
        icon
        value={searchProductInput}
        onChange={(e) => setSearchProductInput(e.target.value)}
      />
    </SmoothList>
  );
};

// const ProductPageContainerMain = () => {
// const [initialLoad, setInitialLoad] = useState(true);
// const [currentPage, setCurrentPage] = useState(0);
// const { backend } = useAuth();
// // Retrieve data and methods from the ProductApiHandler
// const {
//   productList,
//   isLoading,
//   getProductList,
//   searchProductByCategory,
//   searchProductByName,
// } = ProductApiHandler({ currentPage });

// // Extract category
// // State variables for pagination

// const [productsPerPage] = useState(8); // State to prevent continuous re-renders. Only load on mount
// // useEffect hook to fetch product list on initial load

// // useLocation for navigating to the current product category from homePageBottom: pass the state
// const { state } = useLocation();

// useEffect(() => {
//   if (initialLoad) {
//     getProductList();
//     // If navigating from the homepage by clicking CategoryCard
//     if (state !== null) {
//       searchProductByCategory(state);
//       // console.log(state);
//       // If reload product page clear history and show 'all' products
//       window.history.replaceState({}, "");
//     }
//     setInitialLoad(false);
//   }
// }, [getProductList, initialLoad, currentPage, backend]);

// return (
// <div className="container mx-auto p-6 rounded-2xl max-md:px-2">
//   {/* Top container : search bar */}
//   <ProductPageContainerTop searchProductByName={searchProductByName} />
//   {/* Main container : categories, products, and pagination : pass productList */}
//   <ContainerMid
//     productList={productList}
//     loading={isLoading}
//     searchProductByCategory={searchProductByCategory}
//     state={state}
//     currentPage={currentPage}
//     productsPerPage={productsPerPage}
//     setCurrentPage={setCurrentPage}
//     setInitialLoad={setInitialLoad}
//   />
// </div>
// );
// };

// // Main container : categories, products, and pagination
// const ContainerMid = ({
//   productList,
//   loading,
//   searchProductByCategory,
//   state,
//   currentPage,
//   productsPerPage,
//   setCurrentPage,
//   setInitialLoad,
// }) => {
//   // Number of products to display per page
//   // Calculate the start and end index for the current page
//   const startIndex = (currentPage - 1) * productsPerPage;
//   const endIndex = Math.min(startIndex + productsPerPage, productList?.length);
//   const currentProducts = productList?.slice(startIndex, endIndex);
//   // Function to handle pagination

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="flex gap-2 max-md:flex-col py-6">
//       <CategoriesVertical
//         searchProductByCategory={searchProductByCategory}
//         state={state}
//       />

//       <div className="w-full md:w-5/6">
//         {/* Render loading screen only when loading */}
//         {loading && (
//           <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-8 max-lg:grid-cols-2 max-sm:grid-cols-1 pb-4 border-b border-b-slate-500">
//             {Array.from({ length: 8 }, (_, index) => (
//               <TrendingProductCardLoader key={index} />
//             ))}
//           </div>
//         )}

//         {!loading && productList?.length === 0 && (
//           <div className="text-center text-gray-500 font-semibold w-full bg-gray-300 rounded-2xl">
//             <NoDataFound
//               title={"No Product Found"}
//               bgcolor={"bg-white/50 backdrop-blur-sm"}
//             />
//           </div>
//         )}

//         {!loading && productList?.length > 0 && (
//           <>
//             <SmoothList
//               delay={200}
//               className="grid lg:grid-cols-3 xl:grid-cols-4 gap-8 max-lg:grid-cols-2 max-sm:grid-cols-1 pb-4 border-b border-b-slate-500"
//             >
//               {currentProducts.length === 0
//                 ? productList.map((product, index) => (
//                     <ProductCard key={index} product={product} />
//                   ))
//                 : currentProducts.map((product, index) => (
//                     <ProductCard key={index} product={product} />
//                   ))}
//             </SmoothList>

//             <Pagination
//               productsPerPage={productsPerPage}
//               totalProducts={productList?.length}
//               currentPage={currentPage}
//               paginate={setCurrentPage}
//               setInitialLoad={setInitialLoad}
//             />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

export default ProductPageContainerMain;
