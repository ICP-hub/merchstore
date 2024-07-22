import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Table, {
  DetailButton,
  SelectColumnFilter,
  StatusActive,
  StatusPill,
} from "./utils/Table"; // Update the import
/* import item1 from "../../assets/merchandise1.png";
 */ import { useAuth, useBackend } from "../../auth/useClient";
import { CiCirclePlus } from "react-icons/ci";
import { InfinitySpin } from "react-loader-spinner";
import IcpLogo from "../../assets/IcpLogo";

const Products = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "title",
      },

      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Status",
        accessor: "active",
        Filter: SelectColumnFilter, // new
        Cell: StatusPill,
      },
      {
        Header: "PRICE",
        accessor: "price",
        Cell: ({ value }) => (
          <div className="flex items-center">
            <IcpLogo size={24} /> {/* Include the IcpLogo component */}
            <span className=" ml-1">{value}</span>{" "}
            {/* Display the price value */}
          </div>
        ),
      },
      ,
      // {
      //   Header: "INVENTORY",
      //   accessor: "inventory",
      // },
      {
        Header: "Detail",
        accessor: "slug",
        Cell: DetailButton,
      },
    ],
    []
  );

  // const { backend } = useBackend();
  const { backend } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    listAllProducts();
  }, [page]);

  const listAllProducts = async () => {
    try {
      console.log(backend);
      const items = await backend.listallProducts(8, page);
      setProducts(items.data);

      console.log(items.data);
    } catch (error) {
      console.error("Error listing all product:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalpage = async () => {
    try {
      const res = await backend.getstatisticaldetailforadmin();
      setStatistics(res.ok);
    } catch {}
  };
  useEffect(() => {
    totalpage();
  }, [page]);

  const itemsPerPage = 8; // Number of items per page

  const handleNext = () => {
    const totalPages = statistics.totalProducts
      ? Math.ceil(parseInt(statistics.totalProducts) / itemsPerPage)
      : 0;
    console.log(totalPages);
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  // Get data from the second element of each sub-array
  const extractedData = products.map((data, key) => ({
    title: data.title,
    slug: data.slug,
    category: data.category,
    active: data.active ? "active" : "inactive",
    price: data.variantColor[0].variant_price,
    inventory: data.variantColor[0].inventory,
  }));

  return (
    <div className="styled-scrollbar  flex flex-col bg-white  rounded-2xl h-[calc(100vh-100px)] p-4 overflow-y-scroll overflow-x-hidden">
      <div className="">
        <div className="mb-5 flex justify-between items-center">
          <h1 className="uppercase text-xl font-semibold text-gray-900 ">
            Products
          </h1>
          <div>
            <Link
              to="/admin/products/create-product"
              className="uppercase font-medium flex items-center justify-center gap-2 bg-[#512E5F]/20  hover:bg-[#512E5F]/20  text-[#512E5F] rounded-xl px-6 py-3"
            >
              <CiCirclePlus className="w-5 h-5" /> NEW PRODUCT
            </Link>
          </div>
        </div>
        {/* <div className="flex justify-between items-center">
          <div className="my-4">
            <button
              onClick={showAll}
              className="bg-gray-200 p-2 border mx-2 border-gray-500 rounded"
            >
              All Product
            </button>
            <button
              onClick={activeProduct}
              className="bg-gray-200 p-2 border mx-2 border-gray-500 rounded"
            >
              Active
            </button>
            <button
              onClick={pausedProduct}
              className="bg-gray-200 p-2 border border-gray-500 rounded"
            >
              Paused
            </button>
          </div>
          <div>
            <div>
              <input
                onChange={searchProduct}
                type="text"
                placeholder="Search..."
                className="border border-gray-500 p-2 outline-none"
              />
            </div>
          </div>
        </div> */}
        <div className="w-full">
          {loading ? (
            <div className="w-full h-[300px] flex justify-center items-center">
              <InfinitySpin
                width="200"
                color="black"
                ariaLabel="tail-spin-loading"
                visible={true}
              />
            </div>
          ) : (
            <Table
              columns={columns}
              data={extractedData}
              handleNext={handleNext}
              handleprevious={handlePrevious}
              page1={page}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
