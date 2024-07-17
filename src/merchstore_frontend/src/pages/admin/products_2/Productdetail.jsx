import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
//import { useCanister } from "@connect2ic/react";
import { CiCircleCheck, CiCircleChevLeft, CiTrash } from "react-icons/ci";
import { TailSpin } from "react-loader-spinner";

const ProductDetail = () => {
  //const [backend] = useCanister("backend");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const param = useParams();

  const [formData, setFormData] = useState({
    title: "",
    status: "",
    description: "",
    category: "",
    price: 0,
    inventory: 0,
    img1: "",
    img2: "",
    img3: "",
  });

  const getProduct = async () => {
    try {
      setLoading2(true);

      const item = await backend.getProduct(param.slug);
      if (item.ok) {
        setFormData({
          title: item.ok.title,
          status: item.ok.status,
          description: item.ok.description,
          category: item.ok.category,
          price: item.ok.price,
          inventory: item.ok.inventory,
          img1: item.ok.img1,
          img2: item.ok.img2,
          img3: item.ok.img3,
        });
        setProduct(item.ok);
        console.log(item.ok);
      }
    } catch (error) {
      console.error("Error listing user:", error);
    } finally {
      setLoading2(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getProduct();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [backend]);

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Please enter Product title");
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!validateForm()) {
        return;
      }
      setLoading(true);

      const existingProduct = await backend.getProduct(param.slug);

      const requestData = {
        title: formData.title,
        status: formData.status,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        inventory: parseInt(formData.inventory, 10),
        img1: formData.img1,
        img2: formData.img2,
        img3: formData.img3,
      };

      if (existingProduct.ok) {
        const res = await backend.updateProduct(param.slug, requestData);

        if ("ok" in res) {
          toast.success("Product Updated Successfully");
        }
      } else {
        const res = await backend.createProduct(requestData);

        if ("ok" in res) {
          toast.success("Product Added Successfully");
        }
      }
    } catch (error) {
      toast.error("An error occurred while processing the product.");
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    try {
      setLoading(true);

      const res = await backend.deleteProduct(slug);

      console.log(res);
      if ("ok" in res) {
        toast.success("Product Permanently Deleted.");

        navigate("/admin/products");
      }
    } catch (error) {
      toast.error("An error occurred while creating the Product.");
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    listAllCategories();
  }, []);

  const listAllCategories = async () => {
    try {
      setLoading3(true);
      const category = await backend.listCategories();
      setCategories(category);
    } catch (error) {
      console.error("Error listing all category:", error);
    } finally {
      setLoading3(false);
    }
  };
  /*  const [blobInput, setBlobInput] = useState(null);
  const [imgBlob, setImgBlob] = useState(null);
  const [imageSource, setImageSource] = useState("");
  const blobFromFile = async () => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const blob = new Blob([reader.result], { type: "image/*" });
        resolve(blob);
      };
      reader.onerror = reject;

      if (blobInput) {
        reader.readAsArrayBuffer(blobInput);
      } else {
        reject(new Error("No file input provided."));
      }
    });
  };

  useEffect(() => {
    const convertBlobFromFile = async () => {
      if (blobInput) {
        try {
          const blob = await blobFromFile();
          setImgBlob(blob);
        } catch (error) {
          console.error("Error converting file to blob:", error);
        }
      }
    };

    convertBlobFromFile();
  }, [blobInput]); */
  return (
    <div className="w-full">
      <div className="styled-scrollbar flex flex-col bg-white  rounded-2xl overflow-y-auto h-[calc(100vh-100px)] p-4">
        <div className="mb-5 flex justify-between items-center gap-2">
          <h1 className="uppercase text-xl font-semibold text-gray-900 ">
            Product Detail : {loading2 ? "loading..." : product.title}
          </h1>
          <div>
            <Link
              to="/admin/products"
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
                Enter Product Title
              </label>
              <input
                id="title"
                name="title"
                value={loading2 ? "loading..." : formData.title}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F5EEF8] w-full rounded-lg"
                placeholder="Enter Product Title"
                disabled={loading}
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="description"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Product Description
              </label>
              <input
                id="description"
                name="description"
                value={loading2 ? "loading..." : formData.description}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F5EEF8] w-full rounded-lg"
                placeholder="Enter Product Description"
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
                className="border-2 p-2 outline-none border-[#F5EEF8] w-full rounded-lg"
                value={formData.category}
                onChange={handleInputChange}
                disabled={loading}
              >
                <option value="">Select Product Category</option>
                {categories.map((item, index) => (
                  <option
                    value={item[1].name}
                    key={index}
                    selected={formData.category === item[1].name}
                  >
                    {item[1].name}
                  </option>
                ))}
              </select>
            </div>
            <div className="my-2">
              <label
                htmlFor="price"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Product Price
              </label>
              <input
                id="price"
                name="price"
                value={loading2 ? 0 : formData.price}
                onChange={handleInputChange}
                type="number"
                className="border-2 p-2 outline-none border-[#F5EEF8] w-full rounded-lg"
                placeholder="Enter Product Price"
                disabled={loading}
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="inventory"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Product Inventory
              </label>
              <input
                id="inventory"
                name="inventory"
                value={loading2 ? 0 : formData.inventory}
                onChange={handleInputChange}
                type="number"
                className="border-2 p-2 outline-none border-[#F5EEF8] w-full rounded-lg"
                placeholder="Enter Product inventory"
                disabled={loading}
              />
            </div>

            <div className="my-2">
              <label
                htmlFor="img1"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Image One Url
              </label>
              <input
                id="img1"
                name="img1"
                value={loading2 ? "loading..." : formData.img1}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F5EEF8] w-full rounded-lg"
                placeholder="Enter Image One Url"
                disabled={loading}
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="img2"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Image Two Url
              </label>
              <input
                id="img2"
                name="img2"
                value={loading2 ? "loading..." : formData.img2}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F5EEF8] w-full rounded-lg"
                placeholder="Enter Image Two Url"
                disabled={loading}
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="img3"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Image Three Url
              </label>
              <input
                id="img3"
                name="img3"
                value={loading2 ? "loading..." : formData.img3}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F5EEF8] w-full rounded-lg"
                placeholder="Enter Image Three Url"
                disabled={loading}
              />
            </div>

            {/* <div className="my-2">
              <label
                htmlFor="image"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Product Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                value={loading2 ? "loading..." : formData.image}
                className="border-2 p-2 outline-none border-[#F5EEF8] w-full rounded-lg"
                placeholder="Select Product image"
                disabled={loading}
              />
              {imgBlob && (
                <img
                  src={URL.createObjectURL(imgBlob)}
                  alt="Selected Image"
                  className="mt-2 w-32 h-32 object-cover rounded-lg"
                />
              )}
            </div> */}

            <div className="my-2">
              <label
                htmlFor="title"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Select Product status
              </label>
              <select
                className="border-2 p-2 outline-none border-[#F5EEF8] w-full rounded-lg"
                disabled={loading}
                value={formData.status}
                onChange={handleInputChange}
                name="status" // Ensure you have a name attribute
              >
                <option
                  value="active"
                  defaultValue={product.status === "active"}
                >
                  Active
                </option>
                <option
                  value="inactive"
                  defaultValue={product.status === "inactive"}
                >
                  Inactive
                </option>
              </select>
            </div>

            <div className="flex flex-col items-end justify-end gap-4 mt-6">
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
                UPDATE PRODUCT
              </button>
            </div>
          </form>
          <div className="flex flex-col items-end justify-end gap-4 mt-4">
            <button
              onClick={() => {
                if (
                  window.confirm("Are you sure you wish to delete this item?")
                )
                  handleDelete(product.slug);
              }}
              type="submit"
              className={`bg-red-500 text-md tracking-wide py-2 px-4 rounded-xl text-white font-medium flex justify-center items-center gap-2 ${
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
                <CiTrash className="w-5 h-5" />
              )}
              DELETE PRODUCT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
