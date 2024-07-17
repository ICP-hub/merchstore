import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth, useBackend } from "../../auth/useClient";
import Table, {
  DetailButton,
  SelectColumnFilter,
  StatusPill,
} from "./utils/Table"; // Update the import
import { CiCirclePlus } from "react-icons/ci";
import { InfinitySpin } from "react-loader-spinner";

const Categories = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Status",
        accessor: "active",
        Filter: SelectColumnFilter, // new
        Cell: StatusPill,
      },
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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const handleNext = () => {
    setPage(page + 1);
  };

  const handleprevious = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    listAllCategories();
  }, [page]);

  const listAllCategories = async () => {
    try {
      setLoading(true);
      const category = await backend.listCategories(8, page);
      console.log(category, "hello from list categories");

      setCategories(category.data);
    } catch (error) {
      console.error("Error listing all category:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get data from the second element of each sub-array
  const extractedData = categories.map((data) => ({
    name: data.name,
    slug: data.slug,
    active: data.active ? "active" : "inactive",
  }));
  console.log(extractedData);

  return (
    <div className="styled-scrollbar  flex flex-col bg-white  rounded-2xl h-[calc(100vh-100px)] p-4 overflow-y-scroll overflow-x-hidden">
      <div className="">
        <div className="mb-6 flex justify-between items-center gap-2">
          <h1 className="uppercase text-xl font-semibold text-gray-900 ">
            Categories
          </h1>
          <div>
            <Link
              to="/admin/categories/create-category"
              className="uppercase font-medium flex items-center justify-center gap-2 bg-[#512E5F]/20  hover:bg-[#512E5F]/20  text-[#512E5F] rounded-xl px-6 py-3"
            >
              <CiCirclePlus className="w-5 h-5" /> Create New
            </Link>
          </div>
        </div>
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
              handleprevious={handleprevious}
              page1={page}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
