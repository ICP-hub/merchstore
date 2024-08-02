import React, { useEffect, useMemo, useState } from "react";

import Table, {
  DetailButton,
  SelectColumnFilter,
  StatusPill,
} from "./utils/Table";
import { InfinitySpin } from "react-loader-spinner";
import { Principal } from "@dfinity/principal";
import ShortText from "./ShortText";
import { useAuth, useBackend } from "../../auth/useClient";

const UserDetails = () => {
  const textDecoder = new TextDecoder("utf-8"); // Specify the appropriate encoding

  const columns = React.useMemo(
    () => [
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Principal",
        accessor: "id",
        Cell: ({ value }) => <ShortText text={value} />,
      },
      {
        Header: "FIRST NAME",
        accessor: "firstName",
      },
      {
        Header: "LAST NAME",
        accessor: "lastName",
      },
    ],
    []
  );

  // const { backend } = useBackend();
  const { backend } = useAuth();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [statistics, setStatistics] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    listusers();
  }, [backend, page]);

  const listusers = async () => {
    try {
      setLoading(true);
      const userData = await backend.listUsers(8, page);
      setUser(userData.data);
      setTotalPages(parseInt(userData.total_pages));
    } catch (error) {
      console.error("Error listing all Users:", error);
    } finally {
      setLoading(false);
    }
  };

  const itemsPerPage = 8; // Number of items per page

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

  const extractedData = user.map((data) => ({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    id: data.id.toText(),
    id2: data.id,
  }));
  console.log(extractedData);

  return (
    <div className="styled-scrollbar  flex flex-col bg-white  rounded-2xl h-[calc(100vh-100px)] p-4 overflow-y-scroll">
      <div className="">
        <div className="mb-6 flex justify-between items-center gap-2">
          <h1 className="uppercase text-xl font-semibold text-gray-900 ">
            Users List
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

export default UserDetails;
