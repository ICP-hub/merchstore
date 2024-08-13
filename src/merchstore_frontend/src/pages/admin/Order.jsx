import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Table, {
  DetailButton,
  SelectColumnFilter,
  StatusActive,
  StatusOrder,
  StatusPayment,
  StatusPill,
} from "./utils/Table"; // Update the import
/* import item1 from "../../assets/merchandise1.png";
 */ //import { useCanister } from "@connect2ic/react";
import { CiCirclePlus } from "react-icons/ci";
import { InfinitySpin } from "react-loader-spinner";
import ShortText from "./ShortText";
import { useAuth } from "../../auth/useClient";

const Order = () => {
  //const [backend] = useCanister("backend");
  const { backend } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handleprevious = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "User Id",
        accessor: "userId",
        Cell: ({ value }) => <ShortText text={value} />,
      },
      {
        Header: "payment Address",
        accessor: "paymentAddress",
      },
      {
        Header: "Payment Status",
        accessor: "paymentStatus",
        Cell: StatusPayment,
      },
      {
        Header: "order status",
        accessor: "orderStatus",
        Filter: SelectColumnFilter, // new
        Cell: StatusOrder,
      },
      {
        Header: "Detail",
        accessor: "id",
        Cell: DetailButton,
      },
    ],
    []
  );
  useEffect(() => {
    listAllOrders();
  }, [page]);
  console.log(backend);

  const listAllOrders = async () => {
    try {
      console.log("hello");

      const items = await backend.listallOrders(8, page);
      console.log(items, "orders");
      setOrders(items.data);
      setTotalPages(parseInt(items.total_pages));
    } catch (error) {
      console.error("Error listing all Orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get data from the second element of each sub-array
  const extractedData = orders.map((data) => ({
    userId: data.userid.toText(),
    paymentAddress: data.paymentAddress,
    paymentStatus: data.paymentStatus,
    orderStatus: data.orderStatus,
    id: data.id,
  }));
  console.log(extractedData);

  return (
    <div className="styled-scrollbar  flex flex-col bg-white  rounded-2xl h-[calc(100vh-100px)] p-4 overflow-y-scroll overflow-x-hidden">
      <div className="">
        <div className="mb-6 flex justify-between items-center gap-2">
          <h1 className="uppercase text-xl font-semibold text-gray-900 ">
            Orders
          </h1>
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

export default Order;
