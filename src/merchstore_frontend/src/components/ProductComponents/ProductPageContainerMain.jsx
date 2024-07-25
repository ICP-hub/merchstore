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
import Button from "../common/Button";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ ProductPageContainerMain 
/* ----------------------------------------------------------------------------------------------------- */
const ProductPageContainerMain = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { getCategoryList, categoryList } = ProductApiHandler({ currentPage });
  const { backend } = useAuth();
  const [productList, setProductList] = useState(null);
  const [productLoad, setProductLoad] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(
    sessionStorage.getItem("category") || "all"
  );

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePrevPage = () =>
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0));

  const getProductList = async (category) => {
    sessionStorage.setItem("category", category);
    setProductLoad(true);
    try {
      const response = await backend.listallProducts(8, currentPage, true);
      if (category === "all") {
        setProductList(response.data);
      } else {
        const filteredProducts = response.data.filter(
          (product) => product.category === category
        );
        setProductList(filteredProducts);
      }
    } catch (err) {
      console.error("Error fetching product list:", err);
    } finally {
      setProductLoad(false);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, [backend]); // Only run when backend changes

  useEffect(() => {
    getProductList(selectedCategory); // Use selectedCategory directly
  }, [currentPage, backend, selectedCategory]); // Update when any of these change

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto p-6 rounded-2xl max-md:px-2">
      <div className="flex max-md:flex-col">
        <div className="space-y-4 min-w-60">
          <h1 className="font-semibold text-lg">Categories</h1>
          {categoryList ? (
            <div className="space-y-1">
              <button
                className={`w-full border rounded-full px-4 py-2 ${
                  selectedCategory === "all" ? "bg-black text-white" : ""
                }`}
                onClick={() => handleCategoryClick("all")}
              >
                All
              </button>
              {categoryList.map((category) => (
                <button
                  key={category.slug}
                  className={`w-full border rounded-full px-4 py-2 ${
                    selectedCategory === category.slug
                      ? "bg-black text-white"
                      : ""
                  }`}
                  onClick={() => handleCategoryClick(category.slug)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          ) : (
            <div>Loading</div>
          )}
        </div>
        <div className="w-full">
          {productLoad ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
              {Array.from({ length: 8 }, (_, index) => (
                <TrendingProductCardLoader key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
              {productList?.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          )}
          <div className="flex justify-between items-center w-full mt-8">
            <Button
              className="font-semibold flex items-center gap-1"
              onClick={handlePrevPage}
            >
              Previous
            </Button>
            <Button
              className="font-semibold flex items-center gap-1"
              onClick={handleNextPage}
            >
              Next
            </Button>
          </div>
        </div>
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
        placeholder="Search on Merch Store"
        icon
        value={searchProductInput}
        onChange={(e) => setSearchProductInput(e.target.value)}
      />
    </SmoothList>
  );
};

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
