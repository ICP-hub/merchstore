import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth, useBackend } from "../../auth/useClient";
import Table, {
  DetailButton,
  SelectColumnFilter,
  StatusActive,
  StatusPill,
  StatusRead,
} from "./utils/Table"; // Update the import
import { CiCirclePlus } from "react-icons/ci";
import { InfinitySpin } from "react-loader-spinner";

const Message = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      /* {
        Header: "Read",
        accessor: "read",
        Filter: SelectColumnFilter, // new
        Cell: StatusRead,
      }, */
      {
        Header: "Detail",
        accessor: "id",
        Cell: DetailButton,
      },
    ],
    []
  );

  // const { backend } = useBackend();
  const { backend } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [statistics, setStatistics] = useState([]);
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
    const totalPages = statistics.totalContacts
      ? Math.ceil(parseInt(statistics.totalContacts) / itemsPerPage)
      : 0;
    console.log(totalPages);
    if (page < totalPages-1) {
      setPage(page + 1);
   
    }
  };

  const handleprevious = () => {
    if (page > 0) {
      setPage(page - 1);
    
    }
  };

  useEffect(() => {
    listAllMessage();
  }, [page]);

  const listAllMessage = async () => {
    try {
      setLoading(true);
      const message = await backend.listContacts(8, page);
      console.log(message.data);
      setMessages(message.data);
    } catch (error) {
      console.error("Error listing all Message:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get data from the second element of each sub-array
  const extractedData = messages.map((data) => data);
  console.log(extractedData);

  return (
    <div className="styled-scrollbar  flex flex-col bg-white  rounded-2xl h-[calc(100vh-100px)] p-4 overflow-y-scroll overflow-x-hidden">
      <div className="">
        <div className="mb-6 flex justify-between items-center gap-2">
          <h1 className="uppercase text-xl font-semibold text-gray-900 ">
            Messages
          </h1>
          <div></div>
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

export default Message;
