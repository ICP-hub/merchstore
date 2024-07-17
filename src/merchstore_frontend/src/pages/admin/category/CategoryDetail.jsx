import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth, useBackend } from "../../../auth/useClient";
import { CiCircleCheck, CiCircleChevLeft, CiTrash } from "react-icons/ci";
import { TailSpin } from "react-loader-spinner";

const CategoryDetail = () => {
  // const { backend } = useBackend();
  const { backend } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const [category, setCategory] = useState([]); // Add state for email
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const param = useParams();

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    status: "",
    active: "",
  });

  const getCategory = async () => {
    try {
      setLoading2(true);

      const item = await backend.getCategory(param.slug);
      console.log(item.ok);
      if (item.ok) {
        setFormData({
          name: item.ok.name,
          image: item.ok.category_img,
          status: item.ok.featured ? true : false,
          active: item.ok.active ? true : false,
        });
        setCategory(item.ok);
        console.log(item.ok.category_img);
      }
    } catch (error) {
      console.error("Error listing user:", error);
    } finally {
      setLoading2(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter category title");
      return false;
    } else if (!formData.image.trim()) {
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

      const res = await backend.updateCategory(
        category.slug,
        formData.name,
        formData.image,

        formData.status,
        formData.active
      );

      console.log(res);
      if ("ok" in res) {
        toast.success("Category Updated Successfully");
        // getCategory()
      } else if ("error" in res && res.error.includes("already exists")) {
        toast.error(
          "Category with this name already exists. Please choose a different name."
        );
      }
    } catch (error) {
      toast.error("An error occurred while updating the category.");
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    try {
      setLoading(true);

      const res = await backend.deleteCategory(slug);

      console.log(res);
      if ("ok" in res) {
        toast.success("Category Permanently Deleted.");

        navigate("/admin/categories");
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
            Category Detail : {loading2 ? "loading..." : category.name}
          </h1>
          <div>
            <Link
              to="/admin/categories"
              className="uppercase font-medium flex items-center justify-center gap-2 bg-[#512E5F]/20  hover:bg-[#512E5F]/20  text-[#512E5F] rounded-xl px-6 py-3"
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
                value={loading2 ? "loading..." : formData.name}
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
                name="image"
                value={formData.image}
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

            <div className="flex flex-col items-end justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  handleSubmit();
                  setClick(true);
                }}
                type="submit"
                className={`bg-[#512E5F] text-md tracking-wide py-2 px-4 rounded-xl text-white font-medium flex justify-center items-center gap-2 ${
                  loading && "opacity-50"
                }`}
                disabled={loading}
              >
                {loading && click ? (
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
                UPDATE CATEGORY
              </button>
            </div>
          </form>
          <div className="flex flex-col items-end justify-end gap-4 mt-4">
            <button
              onClick={() => {
                if (
                  window.confirm("Are you sure you wish to delete this item?")
                )
                  handleDelete(param.slug);
                setClick(false);
              }}
              type="submit"
              className={`bg-red-500 text-md tracking-wide py-2 px-4 rounded-xl text-white font-medium flex justify-center items-center gap-2 ${
                loading && "opacity-50"
              }`}
              disabled={loading}
            >
              {loading && !click ? (
                <TailSpin
                  height="20"
                  width="20"
                  color="white"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  visible={true}
                />
              ) : (
                <CiTrash className="w-5 h-5" />
              )}
              DELETE CATEGORY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
