import { useState, useEffect } from "react";
import { useAuth } from "../auth/useClient";
import { useLocation } from "react-router-dom";

// Custom hook: initialize the backend Canister
const ProductApiHandler = ({ currentPage = 0, category = 0 }) => {
  const { backend } = useAuth();

  const [productList, setProductList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryList, setCategoryList] = useState(null);
  const [initialProductList, setInitialProductList] = useState([]); // For 'all' filter in category tab
  const [searchResults, setSearchResults] = useState(null);
  const { state } = useLocation();
  console.log(state);
  /* ----------------------------------------------------------------------------------------------------- */
  /*  @ Product related
  /* ----------------------------------------------------------------------------------------------------- */
  const getProductList = async () => {
    // Prevent fetching products if category search is active

    try {
      setIsLoading(true);
      const response = await backend.listallProducts(100, currentPage, true);
      console.log(response);
      setProductList(response.data);
      setInitialProductList(response.data);
    } catch (err) {
      console.error("Error fetching product list:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const searchProductByName = async (searchInput) => {
    // Prevent search by name if category search is active

    try {
      if (!searchInput || searchInput.length <= 2) {
        setSearchResults(null);
        setProductList(initialProductList);
        return;
      }

      const searchTerm = searchInput.toLowerCase();
      const filteredProducts = initialProductList.filter(({ title }) =>
        title.toLowerCase().includes(searchTerm)
      );

      setSearchResults(filteredProducts);
      setProductList(filteredProducts);
    } catch (err) {
      console.error("Error searching by name:", err);
    }
  };
  // console.log(currentPage);

  /* ----------------------------------------------------------------------------------------------------- */
  /*  @ Category related
  /* ----------------------------------------------------------------------------------------------------- */
  const searchProductByCategory = async (searchInput) => {
    try {
      setIsLoading(true);
      console.log(category, "current  category page");

      const productsFound = await backend.search_by_category(
        8,
        category,
        true,
        searchInput
      );
      console.log(productsFound);
      setProductList(productsFound.data);
      console.log("Product found ", productsFound);
    } catch (err) {
      console.error("Error searching by category:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   searchProductByCategory();
  // }, [currentPage]);

  const getCategoryList = async () => {
    try {
      setIsLoading(true);
      const categorylist = await backend.listCategories(10, 0);
      setCategoryList(categorylist.data);
    } catch (err) {
      console.error("Error Fetching Category List", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    initialProductList,
    productList,
    isLoading,
    getProductList,
    categoryList,
    searchProductByCategory,
    getCategoryList,
    searchProductByName,
    searchResults,
  };
};

export default ProductApiHandler;
