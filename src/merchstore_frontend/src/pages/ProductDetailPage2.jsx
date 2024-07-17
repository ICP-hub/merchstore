// ProductDetailPage.js

import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/common/Header.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import AnimationView from "../components/common/AnimationView.jsx";
import Footer from "../components/common/Footer.jsx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import Button from "../components/common/Button.jsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";

import { Principal } from "@dfinity/principal";
import useClipboard from "react-use-clipboard";

const shirtList = [
  {
    image: "https://dummyimage.com/500x500/EF9A9A/fff",
    category: "Clothing and Accessories",
    subCategory: "Topwear",
    type: "T-shirts",
    gender: "Men's",
    brand: "BLIVE",
    name: "Typography Men Round Neck Brown,Black T-Shirt",
    description:
      "Pack of 2 Men Typography Round Neck Cotton Blend Brown, Black T-Shirt",
    specialPrice: 389,
    originalPrice: 1999,
    discountPercentage: 80,
    ratings: 3.5,
    numRatings: 22896,
    numReviews: 1514,

    sizeOptions: ["XS", "S", "M", "L", "XL", "XXL"],
    availableOffers: [
      "10% off on HSBC Bank Credit Card and EMI Transactions, up to ₹1,500 on orders of ₹5,000 and above",
      "Extra ₹500 off on HSBC Bank Credit Card EMI Transactions on products priced ₹24,990 and above",
      "5% Cashback on Flipkart Axis Bank Card",
      "Get at flat ₹389",
      // add more offers if available
    ],
    colorOptions: ["Brown", "Black", "Blue", "Orange", "Green", "Red"],
  },
  {
    name: "Red Graphic Tee",
    image: "https://dummyimage.com/500x500/EF9A9A/fff",
  },
  {
    name: "Green Polo Shirt",
    image: " https://dummyimage.com/500x500/EF9A9A/fff",
  },
  {
    name: "Yellow Striped Shirt",
    image: " https://dummyimage.com/500x500/EF9A9A/fff",
  },
  {
    name: "Blue Casual Shirt",
    image: "https://dummyimage.com/500x500/EF9A9A/fff",
  },
  {
    name: "Red Graphic Tee",
    image: "https://dummyimage.com/500x500/EF9A9A/fff",
  },
  {
    name: "Green Polo Shirt",
    image: "https://dummyimage.com/500x500/EF9A9A/fff",
  },
  {
    name: "Yellow Striped Shirt",
    image: "https://dummyimage.com/500x500/EF9A9A/fff",
  },
];

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
  // const { principal, isConnected } = useConnect();

  // const [backend] = useCanister("backend");

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [data, setData] = useState("");
  const [carts, setCarts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isProductInLocalCart, setProductInLocalCart] = useState(false);
  const [isProductInLocalWishlist, setProductInLocalWishlist] = useState(false);
  const { open } = useDialog();

  const { slug } = useParams();
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorChange = (color) => {
    setSelectedColor(color === selectedColor ? null : color);
  };
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeChange = (size) => {
    setSelectedSize(size === selectedSize ? null : size);
  };
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = [
    "RED",
    "GREEN",
    "BLUE",
    "YELLOW",
    "PURPLE",
    "ORANGE",
    "PINK",
    "TEAL",
    "INDIGO",
    "CYAN",
    "LIME",
    "GRAY",
  ];

  // const useBackend = () => {
  //   return useCanister("backend");
  // };

  // get product detail function

  const getProduct = async () => {
    try {
      const item = await backend.getProduct(slug);

      setData(item.ok);

      if (item.ok) {
        console.log(item.ok);
      }
    } catch (error) {
      console.error("Error listing user:", error);
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

  useEffect(() => {
    const listCarts = async () => {
      try {
        setLoading4(false);

        const cart = await backend.getCallerCartItems();
        setCarts(cart);
        console.log(cart);
      } catch (error) {
        console.error("Error listing carts:", error);
      } finally {
        setLoading4(false);
      }
    };

    listCarts();
  }, [backend]);
  useEffect(() => {
    // Check if the product is in the local cart
    const isProductInCart = carts.some(
      (item) =>
        item[1]?.product_slug === data?.slug &&
        item[1]?.principal.toText() === principal
    );
    setProductInLocalCart(isProductInCart);
  }, [carts, data, principal]);

  // add to cart functionality for adding items into cart
  const AddToCart = async () => {
    if (isConnected) {
      try {
        setLoading4(true);
        const res = await backend.addtoCartItems(
          slug,
          data.inventory,
          { title: data.title, slug: slug, short: "someShort" },
          { title: data.title, color: "red", slug: slug }
        );

        if ("ok" in res) {
          setProductInLocalCart(true);
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
        console.log("hello");
        setLoading4(false);
      }
    } else {
      toast.success("please login first");
      open();
    }
  };

  useEffect(() => {
    listWishlists();
  }, [backend]);

  const listWishlists = async () => {
    try {
      //setLoading4(true)

      const wishlist2 = await backend.listWishlistItems();
      setWishlist(wishlist2);

      console.log(wishlist2);
    } catch (error) {
      console.error("Error listing carts:", error);
    } finally {
      // setLoading4(false)
    }
  };

  useEffect(() => {
    // Check if the product is in the local cart
    const isProductInWishlist = wishlist.some(
      (item) =>
        item[1].product_slug === data.slug &&
        item[1].principal.toText() === principal
    );
    setProductInLocalWishlist(isProductInWishlist);
  }, [wishlist, data, principal]);
  // add to wishlist functionality for adding items to the wishlist

  const AddToWishlist = async () => {
    if (isConnected) {
      try {
        setLoading3(true);
        const res = await backend.addtoWishlist(slug);
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

        console.log("hello");
      }
    } else {
      toast.success("please login first");
      open();
    }
  };

  const removeToWishlist = async () => {
    try {
      const wishlistItem = wishlist.filter(
        (item) =>
          item[1].product_slug === data.slug &&
          item[1].principal.toText() === principal
      );
      console.log(wishlistItem[0][1].id);
      setLoading3(true);
      const res = await backend.deleteWishlistItems(wishlistItem[0][1].id);
      console.log(res);
      if ("ok" in res) {
        toast.success("The product has been removed to your wishlist.");
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
  const [mainImage, setMainImage] = useState(
    "https://dummyimage.com/600x600/EF9A9A/fff"
  );

  const handleImageClick1 = () => {
    setMainImage("https://dummyimage.com/300x300/EF9A9A/fff");
  };

  const handleImageClick2 = () => {
    setMainImage("https://dummyimage.com/400x400/EF9A9A/fff");
  };

  const handleImageClick3 = () => {
    setMainImage("https://dummyimage.com/500x500/EF9A9A/fff");
  };

  const [selectedColor2, setSelectedColor2] = useState("");
  const [selectedSize2, setSelectedSize2] = useState("");
  const [salePrice, setSalePrice] = useState(null);

  const handleColorChange2 = (color, sale_price) => {
    setSelectedColor2(color);
    setSalePrice(sale_price);
  };

  const handleSizeChange2 = (size) => {
    setSelectedSize2(size);
  };

  const [imgBlob, setImgBlob] = useState(null);

  const handleChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const blob = await blobFromFile(file);
      setImgBlob(blob);
    }
  };

  const blobFromFile = async (file) => {
    const ab = await file.arrayBuffer();
    return new Uint8Array(ab);
  };

  const imageSource =
    import.meta.env.MODE === "development"
      ? `http://127.0.0.1:4943/?canisterId=${
          import.meta.env.VITE_BACKEND_CANISTER_ID
        }&imgid=${slug}`
      : `https://${
          import.meta.env.VITE_BACKEND_CANISTER_ID
        }.raw.ic0.app/?imgid=${slug}`;

  const [isCopied, setCopied] = useClipboard(imgBlob);
  console.log(imageSource);
  return (
    <>
      <button onClick={setCopied}>
        Was it copied? {isCopied ? "Yes! 👍" : "Nope! 👎"}
      </button>
      <div className="form-control w-full my-4">
        <label
          htmlFor="image"
          className="label block text-sm font-medium text-gray-700"
        >
          <span className="label-text">Image:</span>
        </label>
        <input
          type="file"
          id="image"
          className="file-input file-input-bordered w-full border border-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          onChange={handleChange}
        />
        <div className="text-xs my-2 text-slate-500">
          Please try to avoid uploading huge images. Ideal size of image is
          1000x500 px. If you don't want to create/update image, leave this
          empty.
        </div>
        <div>
          <img
            id="product-image"
            alt="Product image"
            src={imageSource}
            className="my-4 w-48"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>
      </div>
      <div>
        <div>
          <h3>Select Color:</h3>
          {data?.variantColor?.map((colorOption, index) => (
            <label key={index}>
              <input
                type="radio"
                name="color"
                value={colorOption.color}
                checked={selectedColor2 === colorOption.color}
                onChange={() =>
                  handleColorChange2(
                    colorOption.color,
                    colorOption.variant_sale_price
                  )
                }
              />
              {colorOption.color}
            </label>
          ))}
        </div>
        <div>
          <h3>Select Size:</h3>
          {data?.variantSize?.map((sizeOption, index) => (
            <label key={index}>
              <input
                type="radio"
                name="size"
                value={sizeOption.size}
                checked={selectedSize2 === sizeOption.size}
                onChange={() => handleSizeChange2(sizeOption.size)}
              />
              {sizeOption.size}
            </label>
          ))}
        </div>
        {selectedColor2 && selectedSize2 && (
          <p>
            Sale Price: ${salePrice}, color: {selectedColor2}, size:{" "}
            {selectedSize2}
          </p>
        )}
      </div>
      <div className="container mx-auto xl:mt-12 mt-6 px-6 flex items-center md:items-start justify-between md:flex-col flex-col">
        <div className="flex flex-col   max-w-full  xl:ml-0  lg:flex-row">
          <div className="lg:w-2/5 xl:pr-6 relative">
            {/* Product Image */}
            {!loading ? (
              <div className="w-full h-[80%] rounded-md animate-pulse bg-gray-200"></div>
            ) : (
              <img
                src={mainImage}
                alt={data.title}
                className="w-full rounded-md"
              />
            )}
            {!loading ? (
              <div className="absolute top-2 left-2 w-12 h-6 animate-pulse bg-white py-2 px-2 rounded-full text-sm cursor-pointer font-semibold"></div>
            ) : (
              <div className="absolute top-2 left-2 bg-white py-1 px-2 max:w-16 rounded-full text-xs text-center cursor-pointer font-semibold">
                {data.category}
              </div>
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

            <div className="w-full flex mt-4 pr-4  gap-2">
              <img
                src="https://dummyimage.com/300x300/EF9A9A/fff"
                alt="img1"
                className={`w-1/3 rounded-md cursor-pointer
                ${
                  mainImage === "https://dummyimage.com/300x300/EF9A9A/fff"
                    ? "border-[2px] border-gray-400 shadow-lg"
                    : ""
                }`}
                onClick={handleImageClick1}
              />

              <img
                src="https://dummyimage.com/400x400/EF9A9A/fff"
                alt="img1"
                className={`w-1/3 rounded-md cursor-pointer
                ${
                  mainImage === "https://dummyimage.com/400x400/EF9A9A/fff"
                    ? "border-[2px] border-gray-400 shadow-lg     "
                    : ""
                }`}
                onClick={handleImageClick2}
              />

              <img
                src="https://dummyimage.com/500x500/EF9A9A/fff"
                alt="img1"
                className={`w-1/3 rounded-md cursor-pointer
                ${
                  mainImage === "https://dummyimage.com/500x500/EF9A9A/fff"
                    ? "border-[2px] border-gray-400 shadow-lg     "
                    : ""
                }`}
                onClick={handleImageClick3}
              />
            </div>
          </div>

          <div className="lg:w-3/5 mt-4 ml-6 lg:mt-0">
            {/* Product Details */}

            {!loading ? (
              <h2 className=" w-1/3 h-8 animate-pulse bg-gray-200 py-2 px-2 rounded-full text-sm cursor-pointer font-semibold"></h2>
            ) : (
              <h2 className="xl:text-2xl  font-bold mb-4">{data.title}</h2>
            )}

            {/* Ratings */}
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
            )}

            {/* Prices */}
            {!loading ? (
              <div className=" w-1/3 h-8  mt-4 animate-pulse bg-gray-200 py-2 px-2 rounded-full"></div>
            ) : (
              <div className="mb-4 flex items-center  text-gray-700">
                Price:
                <p className="text-green-600 mr-2">${data.price}</p>
                <p className="text-gray-600">
                  <s>${shirtList[0].originalPrice}</s>
                </p>
              </div>
            )}

            {/* Color and Size Options */}

            <div className="mb-4 space-y-3">
              {!loading ? (
                <div className=" w-full h-12 mt-4  animate-pulse bg-gray-200 py-2 px-2 rounded-full"></div>
              ) : (
                <div>
                  <h2 className="text-sm text-gray-700   mb-2">
                    COLOR OPTIONS :{selectedColor}
                  </h2>
                  <div className="flex  flex-wrap">
                    {colors.map((color) => (
                      <div
                        key={color}
                        className={`w-10 h-10 m-1 rounded-full bg-${color} cursor-pointer ${
                          selectedColor === color
                            ? "border-[2px] border-gray-300 shadow-md   scale-125  "
                            : ""
                        }`}
                        style={{ backgroundColor: color }}
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
                  <h2 className="text-sm text-gray-700 mb-4">
                    SELECT SIZE:{selectedSize}
                  </h2>
                  <div className="flex flex-wrap  ">
                    {sizes.map((size) => (
                      <div
                        key={size}
                        className={`bg-gray-200 text-gray-800 text-center py-2 px-4 rounded-md cursor-pointer mr-2 mb-2 ${
                          selectedSize === size
                            ? "border-black scale-125"
                            : "border-gray-300"
                        }`}
                        onClick={() => handleSizeChange(size)}
                      >
                        <span
                          className={`text-${
                            selectedSize === size ? "black" : "gray-500"
                          }`}
                        >
                          {size}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div></div>
                </div>
              )}

              {/* {<p className="text-gray-800 mt-4">Size Options:</p>
            <div className="flex flex-wrap">
              {shirtList[0].sizeOptions.map((size, index) => (
                <div
                  key={index}
                  className=""
                >
                  {size}
                </div>
              ))}
            </div>} */}
            </div>
            {!loading ? (
              <div className=" w-full h-36 mt-4 animate-pulse bg-gray-200 py-2 px-2 rounded-xl"></div>
            ) : (
              <div className="mb-4">
                <p className="text-gray-800">Description:</p>
                <li className="list-disc text-gray-800 ">
                  {shirtList[0].description}
                </li>
              </div>
            )}

            {/* Available Offers */}
            {!loading ? (
              <div className=" w-full h-36 mt-4 animate-pulse bg-gray-200 py-2 px-2 rounded-xl"></div>
            ) : (
              <div className="mb-4">
                <p className="text-gray-800">Available Offers:</p>
                <ul className="list-disc pl-4">
                  {shirtList[0].availableOffers.map((offer, index) => (
                    <li key={index} className="text-gray-700">
                      {offer}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Buy Now and Add to Cart Buttons */}
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
                      } ${
                        data?.inventory <= 0 && "opacity-50 hover:!bg-[#D02F2F]"
                      }`}
                      disabled={(loading4 && true) || data?.inventory <= 0}
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
                      {data?.inventory <= 0 ? "Out of Stock" : "Add to Cart"}
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {/* <Carousel /> */}
      </div>
    </>
  );
};

// const Carousel = () => {
//   const responsive = {
//     0: { items: 1 },
//     600: { items: 3 },
//     1024: { items: 4 },
//   };

//   return (
//     <AliceCarousel
//       mouseTracking
//       items={shirtList.map((shirt, index) => (
//         <div key={index} className=" container xl:pr-3 pr-2 mt-8 md:mt-12   ">
//           <img
//             src={shirt.image}
//             alt={shirt.name}
//             className="w-full h-60 object-cover rounded-md"
//           />
//           <p className="text-center mt-2">{shirt.name}</p>
//         </div>
//       ))}
//       responsive={responsive}
//     />
//   );
// };

export default ProductDetailPage;
