import React, { useEffect } from "react";
import { HiCheck, HiTrash } from "react-icons/hi";
//import api from "../../api/api";

const formData = [
    {
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "08012345678",
        company: "Google",
        social: "https://twitter.com/johndoe",
    },
    {
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "08012345678",
        company: "Google",
        social: "https://twitter.com/johndoe",
    },
    {
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "08012345678",
        company: "Google",
        social: "https://twitter.com/johndoe",
    },
    {
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "08012345678",
        company: "Google",
        social: "https://twitter.com/johndoe",
    },
    {
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "08012345678",
        company: "Google",
        social: "https://twitter.com/johndoe",
    },
    {
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "08012345678",
        company: "Google",
        social: "https://twitter.com/johndoe",
    },
    {
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "08012345678",
        company: "Google",
        social: "https://twitter.com/johndoe",
    },
    {
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "08012345678",
        company: "Google",
        social: "https://twitter.com/johndoe",
    },
    {
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "08012345678",
        company: "Google",
        social: "https://twitter.com/johndoe",
    },
];

const Sample = () => {
    const [isLoading, setIsLoading] = React.useState(false);
  /*   const [contactData, setContactData] = React.useState([]);
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await api.get("/contacts");
                console.log(response);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []); */

  /*   const deleteForm = async () => {
        try {
            const response = api.delete("/contacts/2", {});
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }; */

    const numLoaders = 6;
    const renderLoaders = () => {
        let loaders = [];
        for (let i = 0; i < numLoaders; i++) {
            loaders.push(<Skeletons key={i} />);
        }
        return loaders;
    };

    return (
        <>
            <div className="styled-scrollbar flex flex-col bg-white  rounded-2xl overflow-y-auto h-[calc(100vh-100px)] p-4">
                <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                    <h4 className="text-2xl font-semibold text-gray-900 ">
                        Contact Form Data
                    </h4>
                </div>
                {isLoading ? (
                    <div className="grid gap-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                        {renderLoaders()}
                    </div>
                ) : (
                    <div className="grid gap-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                        {formData.map((data, index) => (
                            <FormData key={index} data={data} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Sample;

const FormData = ({ data }) => {
    return (
        <div className="bg-gray-100  rounded-2xl p-4">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold text-gray-900 ">
                        {data.name}
                    </h4>
                    <div className="flex gap-3">
                        {/* <Tooltip
                            content="Mark as Seen"
                            className="bg-gray-200 text-black  "
                            placement="top"
                        >
                            <Button className="bg-[#CE2E2D]/20  hover:bg-[#CE2E2D]/40  text-[#CE2E2D] rounded-xl p-2 ">
                                <HiCheck className="w-5 h-5" />
                            </Button>
                        </Tooltip> */}
                        {/* <Tooltip
                            content="Delete"
                            className="bg-gray-200 text-black  "
                            placement="top"
                        > */}
                            <button
                                title="Delete"
                                className="bg-[#CE2E2D]/20  hover:bg-[#CE2E2D]/40  text-[#CE2E2D] rounded-xl p-2"
                            
                            >
                                <HiTrash className="w-5 h-5" />
                            </button>
                       {/*  </Tooltip> */}
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <h6 className="text-sm font-semibold text-gray-900 ">
                        Email
                    </h6>
                    <p className="text-sm text-gray-500 ">
                        {data.email}
                    </p>
                </div>
                <div className="flex flex-col gap-1">
                    <h6 className="text-sm font-semibold text-gray-900 ">
                        Phone
                    </h6>
                    <p className="text-sm text-gray-500 ">
                        {data.phone}
                    </p>
                </div>
                <div className="flex flex-col gap-1">
                    <h6 className="text-sm font-semibold text-gray-900 ">
                        Company
                    </h6>
                    <p className="text-sm text-gray-500 ">
                        {data.company}
                    </p>
                </div>
                <div className="flex flex-col gap-1">
                    <h6 className="text-sm font-semibold text-gray-900 ">
                        Social
                    </h6>
                    <p className="text-sm text-gray-500 ">
                        {data.social}
                    </p>
                </div>
            </div>
        </div>
    );
};

const Skeletons = () => {
    return (
        <div className="min-h-[250px] bg-gray-100  rounded-2xl p-4">
            <div className="animate-pulse flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <div className="w-1/4 h-4 bg-gray-300  rounded"></div>
                    <div className="flex gap-3">
                        <div className="w-8 h-8 bg-gray-300  rounded"></div>
                        <div className="w-8 h-8 bg-gray-300  rounded"></div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="w-1/4 h-4 bg-gray-300  rounded"></div>
                    <div className="w-1/3 h-4 bg-gray-300  rounded"></div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="w-1/4 h-4 bg-gray-300  rounded"></div>
                    <div className="w-1/3 h-4 bg-gray-300  rounded"></div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="w-1/4 h-4 bg-gray-300  rounded"></div>
                    <div className="w-1/3 h-4 bg-gray-300  rounded"></div>
                </div>
            </div>
        </div>
    );
};
