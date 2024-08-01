import React, { useEffect, useState } from "react";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { CiCircleCheck, CiCircleChevLeft } from "react-icons/ci";
import { TailSpin } from "react-loader-spinner";
import { useBackend, useAuth } from "../../../auth/useClient";

import { WithContext as ReactTags } from "react-tag-input";
import { TiDeleteOutline } from "react-icons/ti";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import IcpLogo from "../../../assets/IcpLogo";
const CreateCategory = () => {
  // const { backend } = useBackend();
  const { backend } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [categorylist, setCategorylist] = useState([]);
  const navigate = useNavigate();

  const [tags, setTags] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    status: false, // Assuming status is a boolean
    description: "",
    trending: false, // Assuming trending is a boolean
    newArrival: false, // Assuming newArrival is a boolean
    category: "",

    variants: [
      {
        img1: "",
        img2: "",
        img3: "",

        inventory: "",
        color: "",
        variant_price: "",
        variant_sale_price: "",
      },
    ],
    sizes: [{ size: "" }],
  });

  useEffect(() => {
    listAllCategories();
    listAllProducts();
  }, [backend, formData]);

  const listAllCategories = async () => {
    try {
      setLoading2(true);
      const category = await backend.listCategories(10, 0);
      setCategorylist(category.data);
    } catch (error) {
      console.error("Error listing all category:", error);
    } finally {
      setLoading2(false);
    }
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

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const newVariants = [...formData.variants];
    newVariants[index] = { ...newVariants[index], [name]: value };
    setFormData({
      ...formData,
      variants: newVariants,
    });
  };
  const handleSizeChange = (index, e) => {
    const { value } = e.target;
    const newSizes = [...formData.sizes];
    newSizes[index] = { size: value };
    setFormData({
      ...formData,
      sizes: newSizes,
    });
  };

  const handleAddVariant = () => {
    setFormData({
      ...formData,
      variants: [
        ...formData.variants,
        {
          img1: "",
          img2: "",
          img3: "",

          inventory: "",
          color: "",
          variant_price: "",
          variant_sale_price: "",
        },
      ],
    });
  };
  const handleRemoveVariant = (index) => {
    const newVariants = [...formData.variants];
    newVariants.splice(index, 1);
    setFormData({
      ...formData,
      variants: newVariants,
    });
  };

  const handleAddSize = () => {
    setFormData({
      ...formData,
      sizes: [...formData.sizes, { size: "" }],
    });
  };
  const handleRemoveSize = (index) => {
    const newSizes = [...formData.sizes];
    newSizes.splice(index, 1);
    setFormData({
      ...formData,
      sizes: newSizes,
    });
  };
  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Please enter Product title");
      return false;
    } else if (!formData.description.trim()) {
      toast.error("Please enter Product description");
      return false;
    } else if (!formData.category.trim()) {
      toast.error("Please enter Product category");
      return false;
    } else if (
      formData.variants.some(
        (color) =>
          !color.color.trim() ||
          !color.inventory.trim() ||
          !color.variant_price.trim() ||
          !color.variant_sale_price.trim() ||
          !color.img1.trim() ||
          !color.img2.trim() ||
          !color.img2.trim()
      )
    ) {
      toast.error("Please enter a valid value for all variant colors");
      return false;
    } else if (formData.sizes.some((size) => !size.size.trim())) {
      toast.error("Please enter a valid value for all variant sizes");
      return false;
    }

    // If all validations pass, return true
    return true;
  };

  const listAllProducts = async () => {
    try {
      const items = await backend.listallProducts();

      return items;
    } catch (error) {
      console.error("Error listing all products:", error);
      throw error;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!validateForm()) {
        return;
      } else {
        console.log("hello");

        const requestData = {
          title: formData.title,
          active: formData.status,

          description: formData.description,
          trending: formData.trending,
          newArrival: formData.newArrival,
          category: formData.category,
        };
        const variantColors = formData.variants.map((variant) => ({
          img1: variant.img1,
          img2: variant.img2,
          img3: variant.img3,

          inventory: parseInt(variant.inventory),
          color: variant.color,
          variant_price: parseFloat(variant.variant_price),
          variant_sale_price: parseFloat(variant.variant_sale_price),
        }));
        const variantSizes = formData.sizes.map((size) => ({
          size: size.size,
        }));

        // const products = await listAllProducts();
        // console.log(products);
        // const existingProduct = products.some(
        //   (product) => product.title === requestData.title
        // );

        // if (existingProduct) {
        //   console.log();
        //   toast.error(
        //     "Product with this title already exists. Please choose a different title."
        //   );
        // } else {
        setLoading(true);
        const res = await backend.createProduct(
          requestData,
          variantSizes,
          variantColors
        );

        console.log(res);
        if ("ok" in res) {
          toast.success("Product Added Successfully");
          navigate("/admin/products");

          setFormData({
            title: "",
            status: "",
            description: "",
            trending: "",
            newArrival: "",

            category: "",

            variants: [
              {
                img1: "",
                img2: "",
                img3: "",

                inventory: "",
                color: "",
                variant_price: "",
                variant_sale_price: "",
              },
            ],
            sizes: [
              {
                size: "",
              },
            ],
          });
        }
      }
      //   }
    } catch (error) {
      toast.error("An error occurred while creating the product.");
      console.error("An error occurred:", error);
      navigate("/admin/products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="styled-scrollbar flex flex-col  bg-white  rounded-2xl overflow-y-auto h-[calc(100vh-100px)] p-4">
        <div className="mb-5 flex justify-between items-center gap-2">
          <h1 className="uppercase text-xl font-semibold text-gray-900 dark:text-white">
            Create a Product
          </h1>
          <div>
            <Link
              to="/admin/products"
              className="uppercase font-medium flex items-center justify-center gap-2 bg-[#330000]/20 dark:bg-[#330000]/20 hover:bg-[#330000]/20 dark:hover:bg-[#330000]/20 text-[#330000] rounded-xl px-6 py-3"
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
                Enter Product Title
              </label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Product Title"
                disabled={loading}
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="title"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Product Description
              </label>
              <input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Product description"
                disabled={loading}
              />
            </div>

            <div className="my-2">
              <label
                htmlFor="category"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Select Product Category
              </label>
              <select
                name="category"
                id="category"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                value={formData.category}
                onChange={handleInputChange}
                disabled={loading}
              >
                <option value="">Select Product Category</option>
                {categorylist.map((item, index) => (
                  <option value={item.name} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6 ">
              <h3 className="uppercase text-sm text-black font-medium mb-0 tracking-wide">
                Color Variants
              </h3>
              {formData.variants.map((variant, index) => (
                <div key={index} className="grid grid-cols-4 mb-4">
                  <input
                    type="text"
                    value={variant.color}
                    onChange={(e) => handleVariantChange(index, e)}
                    id={`color`}
                    name={`color`}
                    placeholder="Color"
                    className="mr-2 mb-2 px-3 py-2 md:w-auto border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                    disabled={loading}
                  />
                  <input
                    type="number"
                    value={variant.inventory}
                    onChange={(e) => handleVariantChange(index, e)}
                    id={`inventory`}
                    name={`inventory`}
                    placeholder="Inventory"
                    className="mr-2 mb-2 px-3 py-2 md:w-auto border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg remove-arrow"
                    disabled={loading}
                  />
                  <div className="mr-2 mb-2 px-1 py-2 md:w-auto border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg flex ">
                    <IcpLogo size={24} />
                    <input
                      type="number"
                      value={variant.variant_price}
                      onChange={(e) => handleVariantChange(index, e)}
                      id={`variant_price`}
                      name={`variant_price`}
                      placeholder="Variant Price"
                      className="w-[80%] ml-2  outline-none   border-transparent focus:border-transparent remove-arrow"
                      disabled={loading}
                    />
                  </div>
                  <div className="mr-2 mb-2 px-1 py-2 md:w-auto border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg flex ">
                    <IcpLogo size={24} />
                    <input
                      type="number"
                      value={variant.variant_sale_price}
                      onChange={(e) => handleVariantChange(index, e)}
                      id={`variant_sale_price`}
                      name={`variant_sale_price`}
                      placeholder="Variant Sale Price"
                      className="w-[80%] ml-2  outline-none   border-transparent focus:border-transparent remove-arrow"
                      disabled={loading}
                    />
                  </div>
                  <input
                    type="text"
                    value={variant.img1}
                    onChange={(e) => handleVariantChange(index, e)}
                    id={`img1`}
                    name={`img1`}
                    placeholder="Varient Image One Url"
                    className="mr-2 mb-2 px-3 py-2 md:w-auto border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    value={variant.img2}
                    onChange={(e) => handleVariantChange(index, e)}
                    id={`img2`}
                    name={`img2`}
                    placeholder="Varient Image Two Url"
                    className="mr-2 mb-2 px-3 py-2 md:w-auto border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    value={variant.img3}
                    onChange={(e) => handleVariantChange(index, e)}
                    id={`img3`}
                    name={`img3`}
                    placeholder="Varient Image Three Url"
                    className="mr-2 mb-2 px-3 py-2 md:w-auto border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                    disabled={loading}
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveVariant(index)}
                    className="bg-red-500 text-white mr-2 mb-2 px-3 py-2 flex  items-center justify-center w-12 h-10 rounded hover:bg-red-600"
                  >
                    <TiDeleteOutline className="w-5 h-5 text-2xl" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddVariant}
                className="bg-[#671a1a] text-white py-2 px-4 rounded hover:bg-[#671a1aeb]"
              >
                <IoMdAddCircleOutline className="w-5 h-5 text-2xl" />
              </button>
            </div>

            <div>
              <div>
                <h3 className="uppercase text-sm text-black font-medium mb-0 tracking-wide">
                  Sizes
                </h3>
                {formData.sizes.map((size, index) => (
                  <div key={index} className="mb-4">
                    <input
                      id={"size"}
                      name={`size`}
                      type="text"
                      value={size.size}
                      onChange={(e) => handleSizeChange(index, e)}
                      placeholder="Size"
                      className="mr-2 mb-2 px-3 py-2 md:w-auto border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSize(index)}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                      <TiDeleteOutline className="w-5 h-5 text-2xl" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddSize}
                className="bg-[#671a1a] text-white py-2 px-4 rounded hover:bg-[#671a1ae2]"
              >
                <IoMdAddCircleOutline className="w-5 h-5 text-2xl" />
              </button>
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
                  <span className="ml-2">Active</span>
                </label>
              </div>

              <div className="m-2">
                <input
                  id="trendingCheckbox"
                  name="trending"
                  type="checkbox"
                  checked={formData.trending}
                  onChange={handleInputChange}
                  className="hidden"
                  disabled={loading}
                />
                <label
                  htmlFor="trendingCheckbox"
                  className="cursor-pointer flex items-center text-gray-700"
                >
                  <span className="relative inline-block w-8 h-4 transition duration-200 ease-in-out bg-gray-300 rounded-full cursor-pointer">
                    <span
                      className={`absolute inset-y-0 left-0 w-4 h-4 transition duration-200 ease-in-out transform ${
                        formData.trending ? "translate-x-full" : "translate-x-0"
                      } bg-white border rounded-full`}
                    ></span>
                  </span>
                  <span className="ml-2">Trending</span>
                </label>
              </div>

              <div className="m-2">
                <input
                  id="newArrivalsCheckbox"
                  name="newArrival"
                  type="checkbox"
                  checked={formData.newArrival}
                  onChange={handleInputChange}
                  className="hidden"
                  disabled={loading}
                />
                <label
                  htmlFor="newArrivalsCheckbox"
                  className="cursor-pointer flex items-center text-gray-700"
                >
                  <span className="relative inline-block w-8 h-4 transition duration-200 ease-in-out bg-gray-300 rounded-full cursor-pointer">
                    <span
                      className={`absolute inset-y-0 left-0 w-4 h-4 transition duration-200 ease-in-out transform ${
                        formData.newArrival
                          ? "translate-x-full"
                          : "translate-x-0"
                      } bg-white border rounded-full`}
                    ></span>
                  </span>
                  <span className="ml-2">New Arrivals</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className={`bg-[#330000] text-md tracking-wide py-2 px-4 rounded-xl text-white font-medium flex justify-center items-center gap-2 ${
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
                SUBMIT PRODUCT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
