import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { useBackend, useAuth } from "../../../auth/useClient";
import { HiArrowDownLeft } from "react-icons/hi2";
import { CiCircleCheck, CiCircleChevLeft } from "react-icons/ci";
import { TailSpin } from "react-loader-spinner";
const CreateCategory = () => {
  // const { backend } = useBackend();
  const { backend } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    img: "",
    status: true,
    active: true,
  });

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter category title");
      return false;
    } else if (!formData.img.trim()) {
      toast.error("Please enter category image");
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, type, checked } = e.target;

    // If the input is a checkbox, use the 'checked' property as the value
    const value = type === "checkbox" ? checked : e.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!validateForm()) {
        return;
      }
      setLoading(true);
      //const formattedName = formData.name.trim().replace(/\s+/g, "-");

      const res = await backend.createCategory(
        formData.name,
        formData.img,
        formData.status,
        formData.active
      );

      console.log(res);
      if ("ok" in res) {
        toast.success("Category Added Successfully");
        setFormData({ name: "" });
        setFormData({ img: "" });
      } else if ("error" in res && res.error.includes("already exists")) {
        toast.error("Category already exists. Please choose a different name.");
      }
    } catch (error) {
      toast.error("An error occurred while creating the category.");
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="styled-scrollbar flex flex-col bg-white  rounded-2xl overflow-y-auto h-[calc(100vh-100px)] p-4">
        <div className="mb-5 flex justify-between items-center gap-2">
          <h1 className="uppercase text-xl font-semibold text-gray-900 ">
            Create a Category
          </h1>
          <div>
            <Link
              className="uppercase font-medium flex items-center justify-center gap-2 bg-[#512E5F]/20  hover:bg-[#512E5F]/20  text-[#512E5F] rounded-xl px-6 py-3"
              to="/admin/categories"
            >
              <CiCircleChevLeft className="w-5 h-5" /> Go back
            </Link>
          </div>
        </div>
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <div className="my-2">
              <label
                htmlFor="title"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Category Title
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F5EEF8] w-full rounded-lg"
                placeholder="Enter Category Title"
                disabled={loading}
              />
            </div>
            <div className="my-2">
              <label className="uppercase text-sm text-black font-medium mb-0 tracking-wide">
                Category Image
              </label>
              <input
                type="text"
                id="image"
                name="img"
                value={formData.img}
                className="border-2 p-2 outline-none border-[#F5EEF8] w-full rounded-lg"
                onChange={handleInputChange}
                placeholder="image"
                disabled={loading}
              />
            </div>
            <div className="flex">
              <div className="m-2">
                <input
                  id="statusCheckbox"
                  name="status"
                  type="checkbox"
                  checked={formData.status}
                  onChange={handleInputChange}
                  className="hidden"
                  disabled={loading}
                />
                <label
                  htmlFor="statusCheckbox"
                  className="cursor-pointer flex items-center text-gray-700"
                >
                  <span className="relative inline-block w-8 h-4 transition duration-200 ease-in-out bg-gray-300 rounded-full cursor-pointer">
                    <span
                      className={`absolute inset-y-0 left-0 w-4 h-4 transition duration-200 ease-in-out transform ${
                        formData.status ? "translate-x-full" : "translate-x-0"
                      } bg-white border rounded-full`}
                    ></span>
                  </span>
                  <span className="ml-2">Featured</span>
                </label>
              </div>

              <div className="m-2">
                <input
                  id="activeCheckbox"
                  name="active"
                  type="checkbox"
                  checked={formData.active}
                  onChange={handleInputChange}
                  className="hidden"
                  disabled={loading}
                />
                <label
                  htmlFor="activeCheckbox"
                  className="cursor-pointer flex items-center text-gray-700"
                >
                  <span className="relative inline-block w-8 h-4 transition duration-200 ease-in-out bg-gray-300 rounded-full cursor-pointer">
                    <span
                      className={`absolute inset-y-0 left-0 w-4 h-4 transition duration-200 ease-in-out transform ${
                        formData.active ? "translate-x-full" : "translate-x-0"
                      } bg-white border rounded-full`}
                    ></span>
                  </span>
                  <span className="ml-2">Active</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleSubmit}
                type="submit"
                className={`bg-[#512E5F] text-md tracking-wide py-2 px-4 rounded-xl text-white font-medium flex justify-center items-center gap-2 ${
                  loading && "opacity-50"
                }`}
                disabled={loading}
              >
                {loading ? (
                  <TailSpin
                    height="20"
                    width="20"
                    color="white"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    visible={true}
                  />
                ) : (
                  <CiCircleCheck className="w-5 h-5" />
                )}
                SUBMIT CATEGORY
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
