// ProductDetailPage.js

import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/common/Header.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import AnimationView from "../components/common/AnimationView.jsx";
import Footer from "../components/common/Footer.jsx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import { IoHeartOutline, IoHeart } from "react-icons/io5";
import Button from "../components/common/Button.jsx";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { HiOutlinePlus } from "react-icons/hi2";
import { HiOutlineMinus } from "react-icons/hi2";
import placeholderImg from "../assets/placeholderImg-Small.jpeg";

import img1 from "../assets/product/p2-front.jpeg";
import img2 from "../assets/product/p1-back.jpg";
import img3 from "../assets/product/p2-back.jpeg";

import IcpLogo from "../assets/IcpLogo.jsx";
import { useAuth, useBackend } from "../auth/useClient.jsx";

const ProductDetailPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Header title={"DETAILS"} />
      <ProductDetail />

      <Footer />
    </AnimationView>
  );
};
const ProductDetail = () => {
  const { principal, isConnected, backend } = useAuth();

  // const { backend } = useBackend();
  const [loading, setLoading] = useState(false);

  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [data, setData] = useState("");
  const [carts, setCarts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isProductInLocalCart, setProductInLocalCart] = useState(true);
  const [isProductInLocalWishlist, setProductInLocalWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState();

  const [sellingPrice, setSellingPrice] = useState();
  const { slug } = useParams();
  const [selectedColor, setSelectedColor] = useState();
  const [inventory, setInventory] = useState();
  const [mainImage, setMainImage] = useState("");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [image, setImage] = useState({
    img1: "",
    img2: " ",
    img3: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [unit, setUnit] = useState("cm"); // 'cm' or 'inches'
  const [errorImage, setErrorImage] = useState(false);

  const [errorImage1, setErrorImage1] = useState(false);
  const [errorImage2, setErrorImage2] = useState(false);
  const [errorImage3, setErrorImage3] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleUnit = () => {
    setUnit(unit === "cm" ? "inch" : "cm");
  };

  const renderSize = (size) => {
    if (unit === "cm") {
      return size;
    } else {
      return (size * 0.393701).toFixed(2);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % Object.keys(image).length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? Object.keys(image).length - 1 : prevIndex - 1
    );
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.color === selectedColor ? null : color.color);
    if (color.inventory < 5) {
      toast(` !!! Hurry up only ${color.inventory} piece left !!!`);
    }

    setProductInLocalCart(false);
    setPrice(color.variant_sale_price);
    setSellingPrice(color.variant_price);
    setInventory(color.inventory);
    setMainImage(color.img1);

    setImage({ img1: color.img1, img2: color.img2, img3: color.img3 });
  };
  const [selectedSize, setSelectedSize] = useState();

  const handleSizeChange = (size) => {
    setSelectedSize(size === selectedSize ? null : size);
  };

  // get product detail function

  const getProduct = async () => {
    try {
      const item = await backend.getProduct(slug);

      setData(item.ok);
      setSelectedColor(item.ok.variantColor[0].color);
      setSelectedSize(item.ok.variantSize[0].size);
      setSellingPrice(item.ok.variantColor[0].variant_price);
      setPrice(item.ok.variantColor[0].variant_sale_price);
      setMainImage(item.ok.variantColor[0].img1);
      setImage({
        img1: item.ok.variantColor[0].img1,
        img2: item.ok.variantColor[0].img2,
        img3: item.ok.variantColor[0].img3,
      });

      if (item.ok) {
        console.log(item.ok);
      }
    } catch (error) {
      console.error("Error listing product details:", error);
    } finally {
      setLoading(true);
    }
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getProduct();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [backend]);
  const listCarts = async () => {
    try {
      setLoading4(false);

      const cart = await backend.getCallerCartItems(10, 0);
      setCarts(cart.data);
    } catch (error) {
      console.error("Error listing carts:", error);
    } finally {
      setLoading4(false);
    }
  };

  useEffect(() => {
    listCarts();
  }, [backend]);

  useEffect(() => {
    // Check if the product is in the local cart
    const isProductInCart = carts.some(
      (item) =>
        item?.product_slug === data?.slug &&
        item?.color === selectedColor &&
        item?.size === selectedSize
    );
    setProductInLocalCart(isProductInCart);
  }, [data, selectedColor, selectedSize, principal]);

  // add to cart functionality for adding items into cart
  const AddToCart = async () => {
    if (isConnected) {
      if (!selectedColor) {
        toast.error("please select at least one color");
      } else if (!selectedSize) {
        toast.error("please select at least one size");
      } else {
        try {
          setLoading4(true);

          const res = await backend.addtoCartItems(
            slug,
            selectedSize,
            selectedColor,
            quantity
          );

          if ("ok" in res) {
            toast.success("item added to cart Successfully");
            console.log("     Item added successfully     ", res);
          } else {
            // Log an error if the response does not have "ok" property
            console.error("Unexpected response from backend:", res);
          }
        } catch (error) {
          // Log the error for debugging
          console.error("An error occurred adding items to cart:", error);
        } finally {
          setLoading4(false);
          navigate("/cart");
          listCarts();
        }
      }
    } else {
      toast.error("Please login first");
    }
  };

  useEffect(() => {
    listWishlists();
  }, [backend]);

  const listWishlists = async () => {
    try {
      //setLoading4(true)

      const wishlist2 = await backend.listWishlistItems(10, 0);
      setWishlist(wishlist2.data);
    } catch (error) {
      console.error("Error listing wishlist:", error);
    } finally {
      // setLoading4(false)
    }
  };

  useEffect(() => {
    // Check if the product is in the local cart
    const isProductInWishlist = wishlist.some(
      (item) => item.product_slug === data.slug
    );
    setProductInLocalWishlist(isProductInWishlist);
  }, [wishlist, data, principal]);
  // add to wishlist functionality for adding items to the wishlist

  const AddToWishlist = async () => {
    if (isConnected) {
      try {
        setLoading3(true);
        const res = await backend.addtoWishlist(
          data.slug,
          data.variantSize[0].size,
          data.variantColor[0].color
        );
        setProductInLocalWishlist(true);

        if ("ok" in res) {
          toast.success("item added to wishlist Successfully");
          console.log("     Item added  to wishlist successfully     ", res);
        } else {
          // Log an error if the response does not have "ok" property
          console.error("Unexpected response from backend:", res);
        }
      } catch (error) {
        // Log the error for debugging
        console.error("An error occurred adding items to wishlist:", error);
      } finally {
        setLoading3(false);
      }
    } else {
      toast.error("please login first");
    }
  };

  const removeToWishlist = async () => {
    try {
      setLoading3(true);
      const res = await backend.deleteWishlistItems(
        data.slug,
        data.variantSize[0].size,
        data.variantColor[0].color
      );

      if ("ok" in res) {
        toast.success("The product has been removed from your wishlist.");
        setProductInLocalWishlist(false);

        listWishlists();
        //window.location.reload()
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading3(false); // Set loading to false when the update is complete (success or error)
    }
  };
  // Image gallery function for selection of better product details

  const handleImageClick1 = () => {
    setMainImage(image.img1);
  };

  const handleImageClick2 = () => {
    setMainImage(image.img2);
  };

  const handleImageClick3 = () => {
    setMainImage(image.img3);
  };

  const increment = async (item) => {
    setQuantity(quantity + 1);
  };
  const decrement = (item) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleError = () => {
    setErrorImage(true);
  };
  const handleError1 = () => {
    setErrorImage1(true);
  };
  const handleError2 = () => {
    setErrorImage2(true);
  };
  const handleError3 = () => {
    setErrorImage3(true);
  };

  const calculateDiscountPercentage = () => {
    if (price === 0) {
      return 0;
    }
    const discountPercentage = ((sellingPrice - price) / sellingPrice) * 100;

    return Math.round(discountPercentage);
  };
  const discount = calculateDiscountPercentage();
  return (
    <>
      <div className="container mx-auto xl:mt-12 mt-6 px-6 flex items-center md:items-start justify-between md:flex-col flex-col">
        <div>
          {isOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 overflow-hidden">
              <div className="bg-white rounded w-[80%] sm:w-[40%] xl:h-[80%]  h-[30%] shadow-lg">
                <div className="  relative w-full h-7 bg-gray-700 flex items-center  ">
                  <span
                    className="  top-0  mb-1 text-3xl text-white  cursor-pointer"
                    onClick={closeModal}
                  >
                    &times;
                  </span>
                </div>
                <div className="relative ">
                  <img
                    src={Object.values(image)[currentImageIndex]}
                    alt={`Image ${currentImageIndex + 1}`}
                    className="   h-full  "
                    onClick={closeModal}
                  />
                  <button
                    className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-700 hover:text-gray-900"
                    onClick={prevImage}
                  >
                    &#10094;
                  </button>
                  <button
                    className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-700 hover:text-gray-900"
                    onClick={nextImage}
                  >
                    &#10095;
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col   max-w-full  xl:ml-0  lg:flex-row ">
          <div className="lg:w-2/6 xl:pr-6 relative">
            {/* Product Image */}
            {!loading ? (
              <div className="w-full h-[100%] rounded-md animate-pulse bg-gray-200"></div>
            ) : (
              <img
                src={errorImage ? placeholderImg : mainImage}
                alt={data.title}
                className="w-full rounded-md cursor-pointer"
                onClick={openModal}
                onError={handleError}
              />
            )}
            {!loading ? (
              <div className="absolute top-2 left-2 w-12 h-6 animate-pulse bg-white py-2 px-2 rounded-full text-sm cursor-pointer font-semibold"></div>
            ) : (
              <Link to="/products">
                <div className="absolute top-2 left-2 bg-white py-1 px-2 uppercase max:w-16 rounded-full text-xs text-center cursor-pointer font-semibold">
                  {data.category}
                </div>
              </Link>
            )}

            {!loading ? (
              <div
                className={`absolute top-2  right-2 xl:right-8 bg-white p-2 rounded-full shadow-sm w-[40px] h-[40px]`}
              ></div>
            ) : (
              <button
                onClick={() => {
                  isProductInLocalWishlist
                    ? removeToWishlist()
                    : AddToWishlist();
                }}
                className={`absolute top-2  right-2 xl:right-8 bg-white p-2 rounded-full shadow-sm w-[40px] h-[40px] ${
                  loading3 && "opacity-50"
                }`}
                disabled={loading3 && true}
              >
                {loading3 ? (
                  <TailSpin
                    height="100%"
                    width="100%"
                    color="black"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    visible={true}
                  />
                ) : (
                  <>
                    {isProductInLocalWishlist ? (
                      <IoHeart className="text-[#D02F2F]" size="1.5em" />
                    ) : (
                      <IoHeartOutline size="1.5em" />
                    )}
                  </>
                )}
              </button>
            )}

            {!loading ? (
              <div className="w-[96rem] flex mt-2 pr-4  gap-2"></div>
            ) : (
              <div className="w-full flex mt-2 pr-4  gap-2">
                <img
                  src={errorImage1 ? placeholderImg : image.img1}
                  alt="img1"
                  className={`w-1/3 rounded-md cursor-pointer
                    ${
                      mainImage === image.img1
                        ? "border-[2px] border-gray-400 shadow-lg"
                        : ""
                    }`}
                  onClick={handleImageClick1}
                  onError={handleError1}
                />

                <img
                  src={errorImage2 ? placeholderImg : image.img2}
                  alt="img1"
                  className={`w-1/3 rounded-md cursor-pointer
                    ${
                      mainImage === image.img2
                        ? "border-[2px] border-gray-400 shadow-lg     "
                        : ""
                    }`}
                  onClick={handleImageClick2}
                  onError={handleError2}
                />

                <img
                  src={errorImage3 ? placeholderImg : image.img3}
                  alt="img1"
                  className={`w-1/3 rounded-md cursor-pointer
                    ${
                      mainImage === image.img3
                        ? "border-[2px] border-gray-400 shadow-lg     "
                        : ""
                    }`}
                  onClick={handleImageClick3}
                  onError={handleError3}
                />
              </div>
            )}
          </div>

          <div className="lg:w-4/6 mt-4 sm:ml-3 sm:pl-3  lg:mt-0   ">
            {/* Product Details */}

            {!loading ? (
              <h2 className=" w-1/3 h-8 animate-pulse bg-gray-200 py-2 px-2 rounded-full text-sm cursor-pointer font-semibold"></h2>
            ) : (
              <h2 className="xl:text-2xl  font-bold mb-4 uppercase">
                {data.title}
              </h2>
            )}

            {/* Ratings
            {!loading ? (
              <div className=" w-1/3 h-8 mt-4 animate-pulse bg-gray-200 py-2 px-2 rounded-full"></div>
            ) : (
              <div className="mb-4 flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className="text-yellow-500 text-2xl inline-block"
                  >
                    {index < Math.floor(shirtList[0].ratings) ? (
                      <AiFillStar />
                    ) : (
                      <AiOutlineStar />
                    )}
                  </span>
                ))}
                <p className="text-gray-800 ml-2">
                  ({shirtList[0].numReviews} reviews)
                </p>
              </div>
            )} */}

            {/* Prices */}
            {!loading ? (
              <div className=" w-1/3 h-8  mt-4 animate-pulse bg-gray-200 py-2 px-2 rounded-full"></div>
            ) : (
              <div className="mb-3 flex  items-center gap-1 text-gray-700 capitalize ">
                <p className="text-gray-800 flex items-center ml-1  gap-1">
                  {" "}
                  <IcpLogo size={20} className="gap-1" />
                  {price}
                </p>
                <p className="text-gray-500 mx-2 text-sm ">
                  <s className="flex"> {sellingPrice}</s>
                </p>
                <div className="flex items-center gap-2">
                  <span className="bg-green-600 text-white text-xs font-medium rounded-md px-2 py-1 max-w-max">
                    {discount}% off
                  </span>
                </div>
              </div>
            )}

            {/* Color and Size Options */}

            <div className="mb-4 space-y-3">
              {!loading ? (
                <div className=" w-full h-12 mt-4  animate-pulse bg-gray-200 py-2 px-2 rounded-full"></div>
              ) : (
                <div>
                  <h2 className=" text-gray-700 uppercase  mb-2">
                    SELECTED COLOR : {selectedColor}
                  </h2>
                  <div className="flex  flex-wrap">
                    {data.variantColor.map((color, index) => (
                      <div
                        key={index}
                        className={`w-10 h-10 m-1 rounded-full mx-2 bg-${
                          color.color
                        } cursor-pointer ${
                          selectedColor === color.color
                            ? "border-[2px] border-gray-300  scale-110 shadow-md mx-2    "
                            : ""
                        }`}
                        style={{ backgroundColor: color.color }}
                        onClick={() => handleColorChange(color)}
                      />
                    ))}
                  </div>
                  <div></div>
                </div>
              )}
              {!loading ? (
                <div className=" w-full h-12 mt-4 animate-pulse bg-gray-200 py-2 px-2 rounded-full"></div>
              ) : (
                <div>
                  <h2 className=" text-gray-700 mb-4 uppercase">
                    SELECTED SIZE : {selectedSize}
                  </h2>
                  <div className="flex flex-wrap  ">
                    {data.variantSize.map((size, index) => (
                      <div
                        key={index}
                        className={`bg-gray-200 text-gray-800 text-center py-2 px-4 rounded-md cursor-pointer mx-2 mb-2 ${
                          selectedSize === size.size
                            ? " border border-gray-400 scale-110 mx-2"
                            : "border-gray-300"
                        }`}
                        onClick={() => handleSizeChange(size.size)}
                      >
                        <span
                          className={`text-${
                            selectedSize === size ? "black" : "gray-500"
                          }`}
                        >
                          {size.size}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="">
                    <button
                      className="   text-gray-700 text-xs   py-2  px-2 rounded uppercase"
                      onClick={toggleModal}
                    >
                      Open Size Chart
                    </button>
                    {showModal && (
                      <div className="fixed z-10 inset-0  text-center overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
                        <div className="relative bg-white rounded-lg w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 shadow-lg">
                          <div className="p-8">
                            <span
                              className="absolute top-0 right-0  pr-2 cursor-pointer text-xl"
                              onClick={toggleModal}
                            >
                              &times;
                            </span>
                            <h2 className="text-lg font-bold mb-4 text-center">
                              T-Shirt Size Chart
                            </h2>
                            <div className="flex justify-center text-sm mb-4">
                              <button
                                className={`px-4 py-2 border border-black  rounded-r-none rounded-md ${
                                  unit === "cm"
                                    ? " bg-black text-white"
                                    : " text-black "
                                }`}
                                onClick={toggleUnit}
                              >
                                Cms
                              </button>
                              <button
                                className={`px-4 py-2  border border-black rounded-l-none rounded-md ${
                                  unit === "inch"
                                    ? "bg-black text-white"
                                    : " text-black"
                                }`}
                                onClick={toggleUnit}
                              >
                                In
                              </button>
                            </div>
                            <div className="overflow-x-auto">
                              <table className="w-full border-collapse">
                                <thead className="bg-gray-50 text-sm">
                                  <tr>
                                    <th className="py-2 border">Size</th>
                                    <th className="py-2 border">
                                      Chest ({unit})
                                    </th>
                                    <th className="py-2 border">
                                      Front Length ({unit})
                                    </th>
                                    <th className="py-2 border">
                                      Sleeve Length ({unit})
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="text-sm">
                                  <tr>
                                    <td className="py-2 border">S</td>
                                    <td className="py-2 border">
                                      {renderSize(96.5)}
                                    </td>
                                    <td className="py-2 border">
                                      {renderSize(69.2)}
                                    </td>
                                    <td className="py-2 border">
                                      {renderSize(20.3)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="py-2 border">M</td>
                                    <td className="py-2 border">
                                      {renderSize(101.6)}
                                    </td>
                                    <td className="py-2 border">
                                      {renderSize(71.1)}
                                    </td>
                                    <td className="py-2 border">
                                      {renderSize(21.0)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="py-2 border">L</td>
                                    <td className="py-2 border">
                                      {renderSize(106.7)}
                                    </td>
                                    <td className="py-2 border">
                                      {renderSize(73.0)}
                                    </td>
                                    <td className="py-2 border">
                                      {renderSize(21.6)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="py-2 border">XL</td>
                                    <td className="py-2 border">
                                      {renderSize(111.8)}
                                    </td>
                                    <td className="py-2 border">
                                      {renderSize(74.9)}
                                    </td>
                                    <td className="py-2 border">
                                      {renderSize(22.2)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="py-2 border">2XL</td>
                                    <td className="py-2 border">
                                      {renderSize(116.8)}
                                    </td>
                                    <td className="py-2 border">
                                      {renderSize(76.2)}
                                    </td>
                                    <td className="py-2 border">
                                      {renderSize(22.9)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="py-2 border">3XL</td>
                                    <td className="py-2 border">
                                      {renderSize(121.9)}
                                    </td>
                                    <td className="py-2 border">
                                      {renderSize(77.5)}
                                    </td>
                                    <td className="py-2 border">
                                      {renderSize(23.5)}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {!loading ? (
              <div className=" w-1/3 h-12  mt-4 animate-pulse bg-gray-200 py-2 px-2 rounded-full"></div>
            ) : (
              <div className="flex items-center justify-start ml-2">
                <button className="    " onClick={decrement}>
                  <HiOutlineMinus />
                </button>
                <p type="text" className="w-12 text-center     ">
                  {quantity}
                </p>

                <button className=" " onClick={increment}>
                  <HiOutlinePlus />
                </button>
              </div>
            )}

            <div className="flex mt-4">
              {!loading ? (
                <div
                  className={`bg-gray-200 text-white py-2 px-4 h-12 animate-pulse rounded-full w-full  mb-2 lg:w-1/3`}
                ></div>
              ) : (
                <>
                  {isProductInLocalCart ? (
                    <Link
                      to="/cart"
                      className="bg-black text-white text-center py-2 px-4 rounded-full w-full  mb-2 lg:w-1/3"
                    >
                      Go to Cart
                    </Link>
                  ) : (
                    <Button
                      onClick={AddToCart}
                      className={`bg-black text-white text-center  py-2 px-4 rounded-full w-full  mb-2 lg:w-1/3 ${
                        loading4 && " flex items-center justify-center"
                      } ${inventory < quantity && "opacity-30"}`}
                      disabled={(loading4 && true) || inventory < quantity}
                    >
                      {loading4 ? (
                        <TailSpin
                          height="20"
                          width="20"
                          color="white"
                          ariaLabel="tail-spin-loading"
                          radius="1"
                          visible={true}
                        />
                      ) : (
                        ""
                      )}{" "}
                      {inventory && inventory < quantity ? ( //inventory>=quantity<=0
                        "Out of Stock"
                      ) : (
                        <p className="ml-2"> Add to Cart</p>
                      )}
                    </Button>
                  )}
                </>
              )}
            </div>
            {!loading ? (
              <div className=" w-full h-36 mt-4 animate-pulse bg-gray-200 py-2 px-2 rounded-xl"></div>
            ) : (
              <div className="mb-4 mt-8 flex flex-wrap flex-col">
                <p className="text-gray-800 uppercase">Description:</p>
                <p className="list-disc text-gray-800 ">{data.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
