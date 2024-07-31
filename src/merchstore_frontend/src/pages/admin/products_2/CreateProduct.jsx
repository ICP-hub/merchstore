import React, { useEffect, useState } from "react";
import toast from "react-hot-toast"
import { Link } from "react-router-dom";
import { CiCircleCheck, CiCircleChevLeft } from "react-icons/ci";
import { TailSpin } from "react-loader-spinner";
//import { useCanister } from "@connect2ic/react";

const CreateCategory = () => {
 // const [backend] = useCanister("backend");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    status: "active",
    description: "",
    category: "",
    price: 0,
    inventory: 0,
    img1: "",
    img2: "",
    img3: "",
  });
  ;
  /* const [blobInput, setBlobInput] = useState(null);
  const [imgBlob, setImgBlob] = useState(null);
  const [imageSource, setImageSource] = useState(''); */

  /* useEffect(async () => {
    if (blobInput) {
      const item = await backend.storeBlobImg(blobInput);
      setImgBlob(item);
        }
  }, [blobInput]); */

  /* useEffect(() => {
    const backendCanisterId = 'a4gq6-oaaaa-aaaab-qaa4q-cai';
    const developmentMode = 'development';

    if (developmentMode) {
      setImageSource(`http://127.0.0.1:3000/?canisterId=${backendCanisterId}&imgid=${'test'}`);
    } else {
      setImageSource(`https://${backendCanisterId}.raw.ic0.app/?imgid=${'test'}`);
    }
  }, []); */

  /*  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setBlobInput(file);
  };
 */
  useEffect(() => {
    listAllCategories();
    listAllProducts();
  }, []);

  const listAllCategories = async () => {
    try {
      setLoading2(true);
      const category = await backend.listCategories();
      setCategories(category);
    } catch (error) {
      console.error("Error listing all category:", error);
    } finally {
      setLoading2(false);
    }
  };
  /*   const blobFromFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const blob = new Blob([reader.result], { type: file.type });
        resolve(blob);
      };
      reader.onerror = reject;

      if (file) {
        reader.readAsArrayBuffer(file);
      } else {
        reject(new Error("No file provided."));
      }
    });
  }; */

  /*   const handleFileChange = async (e) => {
    const file = e.target.files[0];
    try {
      const blob = await blobFromFile(file);
      console.log(blob);
      setFormData((prevData) => ({
        ...prevData,
        image: blob,
      }));
      console.log(formData);
      setSelectedFile(file); // Update selectedFile state
    } catch (error) {
      console.error("Error converting file to blob:", error);
    }
  }; */

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Please enter Product title");
      return false;
    }
    return true;
  };
  const listAllProducts = async () => {
    try {
      const items = await backend.listProducts();
      return items; // Return the list of products
    } catch (error) {
      console.error("Error listing all products:", error);
      throw error; // Propagate the error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!validateForm()) {
        return;
      }
      setLoading(true);

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

      // Check if the product title already exists
      const products = await listAllProducts();
      const existingProduct = products.find(
        (product) => product.title === requestData.title
      );

      if (existingProduct) {
        toast.error(
          "Product with this title already exists. Please choose a different title."
        );
      } else {
        // If the product doesn't exist, proceed with creating it
        const res = await backend.createProduct(requestData);

        console.log(res);
        if ("ok" in res) {
          toast.success("Product Added Successfully");
          setFormData({
            title: "",
            status: "active",
            description: "",
            category: "",
            price: 0,
            inventory: 0,
            img1: "",
            img2: "",
            img3: "",
          });
        }
      }
    } catch (error) {
      toast.error("An error occurred while creating the product.");
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(selectedFile, "selectedFile");

  return (
    <div className="w-full">
      <div className="styled-scrollbar flex flex-col bg-white  rounded-2xl overflow-y-auto h-[calc(100vh-100px)] p-4">
        <div className="mb-5 flex justify-between items-center gap-2">
          <h1 className="uppercase text-xl font-semibold text-gray-900 ">
            Create a Product
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
                value={formData.title}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F5EEF8] w-full rounded-lg"
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
                className="border-2 p-2 outline-none border-[#F5EEF8] w-full rounded-lg"
                placeholder="Enter Product description"
                disabled={loading}
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="title"
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
                  <option value={item[1].slug} key={index}>
                    {item[1].name}
                  </option>
                ))}
              </select>
            </div>
            <div className="my-2">
              <label
                htmlFor="title"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Product Price
              </label>
              <input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                type="number"
                className="border-2 p-2 outline-none border-[#F5EEF8] w-full rounded-lg"
                placeholder="Enter product price"
                disabled={loading}
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="title"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Product Inventory
              </label>
              <input
                id="inventory"
                name="inventory"
                value={formData.inventory}
                onChange={handleInputChange}
                type="number"
                className="border-2 p-2 outline-none border-[#F5EEF8] w-full rounded-lg"
                placeholder="Enter Product Inventory"
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
                value={formData.img1}
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
                value={formData.img2}
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
                value={formData.img3}
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
                value={blobInput}
                onChange={handleFileChange}
                className="border-2 p-2 outline-none border-[#F5EEF8] w-full rounded-lg"
                placeholder="Select Product image"
                disabled={loading}
              />
               {selectedFile && (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected Image"
                  className="mt-2 w-32 h-32 object-cover rounded-lg"
                />
              )} 
            </div> */}

            <div className="flex justify-end mt-6">
              <button
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
