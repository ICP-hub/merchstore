import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/common/Header.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import AnimationView from "../components/common/AnimationView.jsx";
import Footer from "../components/common/Footer.jsx";

import { HiOutlinePlus } from "react-icons/hi2";
import { HiOutlineMinus } from "react-icons/hi2";
import Button from "../components/common/Button.jsx";
import toast from "react-hot-toast";
import { GoCheckCircle } from "react-icons/go";
import {
  HiCheckBadge,
  HiCheckCircle,
  HiOutlineTrash,
  HiTrash,
} from "react-icons/hi2";
import { FcOk } from "react-icons/fc";
import { TailSpin } from "react-loader-spinner";
import EmptyCart from "../components/ProductComponents/EmptyCart.jsx";

import NoImage from "../assets/product/p1-front.jpg";
import { useAuth, useBackend } from "../auth/useClient.jsx";
import Total from "../components/common/Total.jsx";
import Modal1 from "../components/common/Styles/Modal1.jsx";
import { LuTrash } from "react-icons/lu";
import TabChanges from "../components/Tabchanges.jsx";
import IcpLogo from "../assets/IcpLogo.jsx";
import placeholderImg from "../assets/placeholderImg-Small.jpeg";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ main cartpage Container
/* ----------------------------------------------------------------------------------------------------- */

const CartPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Header title={"CART"} />
      <Cart></Cart>

      <Footer></Footer>
    </AnimationView>
  );
};
/* ----------------------------------------------------------------------------------------------------- */
/*  @ cart  Container
/* ----------------------------------------------------------------------------------------------------- */

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { principal, isConnected, backend } = useAuth();
  const [product, getProduct] = useState([]);
  const [id, setIds] = useState("");
  const [quantity, setQuantity] = useState();
  const [carts, setCarts] = useState([]);
  const [isQuantityChanged, setIsQuantityChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [size, setSize] = useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [errorImage, setErrorImage] = useState(false);
  const handleError = () => {
    setErrorImage(true);
  };

  // const { backend } = useBackend();
  // States for modal : ClearAll
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successClearAll, setSuccessClearAll] = useState(true);
  const [clearCartLoad, setClearCartLoad] = useState(false);
  const [flag, setFlag] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  /************ Modal End */

  const pathsForTabChanges = ["Home", "cart"];

  const getCartlist = async () => {
    try {
      const item = await backend.getCallerCartItems(10, 0);

      console.log(item.data);
      const formatColor = item.data.map((item) => ({
        color: item.color,
      }));
      setColor(formatColor);
      const formatSize = item.data.map((item) => ({
        size: item.size,
      }));

      setSize(formatSize);

      const formatQuantity = item.data.map((item) => ({
        quantity: item.quantity,
      }));
      setQuantity(formatQuantity);

      const formattedItems = item.data.map((item) => ({
        slug: item.product_slug,
      }));

      // Update state with the formatted items array
      setCartItems(formattedItems);
      console.log(formattedItems);

      if (item) {
        setCarts(item.data);
        console.log(item.data);
      }
    } catch (error) {
      console.error("Error listing cart:", error);
    } finally {
    }
  };

  const getProductCartlist = async () => {
    try {
      const productPromises = cartItems.map(async (productId) => {
        const productResponse = await backend.getProduct(productId.slug);
        return productResponse.ok; // Assuming `ok` property contains the product details
      });

      // Wait for all promises to resolve
      const products = await Promise.all(productPromises);

      getProduct(products);

      console.log(products);
      // Access and log the title property for each product
    } catch (error) {
      console.error("Error while getting wishlist ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCartlist();
  }, [backend, successClearAll]);

  const increment = (index) => {
    setFlag(true);
    setQuantity((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[index] = {
        ...updatedQuantities[index],
        quantity: updatedQuantities[index].quantity + 1,
      };
      setIsQuantityChanged(true);
      setSelectedItemIndex(index);
      return updatedQuantities;
    });
  };

  const decrement = (index) => {
    setFlag(true);
    setQuantity((prevQuantities) => {
      if (prevQuantities[index].quantity > 1) {
        const updatedQuantities = [...prevQuantities];
        updatedQuantities[index] = {
          ...updatedQuantities[index],
          quantity: updatedQuantities[index].quantity - 1,
        };
        setIsQuantityChanged(true);
        setSelectedItemIndex(index);
        return updatedQuantities;
      }
      return prevQuantities;
    });
  };

  const deleteCart = async (id, color, size) => {
    try {
      console.log(id, size, color);
      const remove = await backend.deleteCartItems(id, size, color);
      if (remove) {
        getCartlist();

        toast.success("item removed successfully");
      }
      console.log(remove);
    } catch (error) {
      console.error("deletion cannot be performed", error);
    }
  };
  useEffect(() => {
    if (cartItems !== undefined) {
      getProductCartlist();
    }
  }, [backend, cartItems]);

  const updateQuantity = async (id, quantity, color, size) => {
    try {
      setLoadingItemId(id);
      setIsLoading(true);
      // Your update logic here
      const res = await backend.updateCartItems(id, quantity, color, size);
      setUpdateSuccess(true);

      toast.success("Quantity changed");
      setUpdateSuccess(true);
    } catch (error) {
      console.error("Error updating quantity:", error);
      setUpdateSuccess(false);
    } finally {
      setIsLoading(false);
      setIsQuantityChanged(false);
      setUpdateSuccess(false);
      setFlag(false);
    }
  };

  const clearAll = async () => {
    try {
      setLoading(true);
      setClearCartLoad(true);
      const res = await backend.clearallcartitmesbyprincipal();

      if ("ok" in res) {
        console.log(res);

        getCartlist();
        toast.success("All items are removed");
        navigate("/");
      } else {
        console.log("error while deleting all the items", res);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setClearCartLoad(false);
      setSuccessClearAll(false);
      getCartlist();
      setLoading(false);
    }
  };

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    // Calculate the total price based on the prices of items in the cart
    const newTotalPrice = product.reduce(
      (acc, item, index) =>
        acc +
        (item.variantColor.find(
          (variant) => variant.color === color[index]?.color
        )?.variant_sale_price || 0) *
          quantity[index]?.quantity,
      0
    );

    setTotalPrice(newTotalPrice.toFixed(2));
  }, [product, updateSuccess]);

  return (
    <>
      <div className="container mx-auto px-6">
        <TabChanges paths={pathsForTabChanges} />
      </div>
      {loading ? (
        <div className="container mx-auto mt-4 px-6 flex items-center md:items-start justify-between md:flex-row flex-col">
          <div className="   rounded-xl mb-3 mt-4 grid grid-cols-1 gap-3  md:w-[70%]">
            {[...Array(3)].map((_, index) => (
              <div
                className="rounded-xl xl:flex justify-between  border-2 border-gray-200  items-center gap-2"
                key={index}
              >
                <div className="flex justify-start items-start gap-2 mt-3">
                  <div className="w-24  h-24 mb-2  bg-gray-300 rounded-lg ml-2 animated-pulse"></div>
                  <div className="flex flex-col mt-2">
                    <h4 className="w-[75px] h-[20px] rounded-full bg-gray-300 animated-pulse mb-1"></h4>
                    <h4 className="w-[150px] h-[25px] rounded-full bg-gray-300 animated-pulse mb-2"></h4>
                    <div className="flex gap-2">
                      <h4 className="w-[60px] h-[15px] rounded-full bg-gray-300 animated-pulse"></h4>
                      <h4 className="w-[60px] h-[15px] rounded-full bg-gray-300 animated-pulse"></h4>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between xl:items-end h-full mt-12 mr-2 xl:mb-0 mb-2">
                  <div className="flex flex-col justify-end items-end gap-1">
                    <h4 className="w-[80px] h-[20px] rounded-full bg-gray-300 animated-pulse"></h4>
                    <h4 className="w-[80px] h-[20px] rounded-full bg-gray-300 animated-pulse"></h4>
                    <div className="w-[130px] h-[30px] rounded-full bg-gray-300 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-2 rounded-2xl  md:ml-4 mt-4 md:h-[30%] ">
            <div className="flex flex-col">
              <div className="border-b-2 py-6">
                <span className="uppercase font-semibold px-6 text-xl text-slate-500">
                  Price details
                </span>
              </div>
              <div className="border-b-2 py-2 flex flex-col gap-4 border-dashed">
                <div className="flex justify-between px-6 gap-2 font-medium">
                  <p className="bg-gray-300 h-6 w-28 animate-pulse rounded-xl"></p>
                  <span className="bg-gray-300 h-6 w-12 animate-pulse rounded-xl"></span>
                </div>
                <div className="flex justify-between px-6 gap-2 font-medium">
                  <p className="bg-gray-300 h-6 w-36 animate-pulse rounded-xl"></p>
                  <span className="flex gap-2">
                    <p className="bg-gray-300 h-6 w-12 animate-pulse rounded-xl"></p>
                  </span>
                </div>
              </div>
              <div className="border-b-2 py-4 flex flex-col gap-4 border-dashed">
                <div className="flex justify-between px-6 gap-2 font-bold">
                  <p className="bg-gray-300 h-6 w-28 animate-pulse rounded-xl"></p>
                  <span className="bg-gray-300 h-6 w-12 animate-pulse rounded-xl"></span>
                </div>
              </div>
              <div className="border-b-2 py-4 flex flex-col gap-4 border-dashed">
                <div className="px-6">
                  <div className="bg-gray-300 h-6 w-72 animate-pulse rounded-xl"></div>
                </div>
              </div>
              <div className="p-6"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto mt-4 px-6 flex items-center md:items-start justify-between md:flex-row flex-col">
          <div className="md:w-[70%] w-[100%] ">
            <div className="flex items-end justify-end border-2 border-gray-300 mt-2   rounded-xl   p-5 w-[100%]">
              <Button
                className="bg-black rounded-full text-sm text-white px-3 py-2"
                onClick={openModal}
              >
                Clear All
              </Button>
              {isModalOpen && (
                <Modal1
                  closeModal={closeModal}
                  title={"Are you sure you want to clear cart ?"}
                  icon={<LuTrash size={40} color="red" />}
                  btnClr="red"
                  actName="Yes,Clear!"
                  action={clearAll}
                  isLoading={clearCartLoad}
                  addOn={successClearAll}
                />
              )}
            </div>

            <div>
              {product.map((item, index) => (
                <>
                  <div className=" md:flex flex-wrap items-center m-0  xl: justify-between border-2 border-gray-300 mt-4  rounded-xl  p-2 py-2 w-[100%]">
                    <div className="">
                      <div className="flex m-2">
                        <img
                          src={
                            errorImage
                              ? placeholderImg
                              : item.variantColor[0].img1
                          }
                          alt=""
                          className="w-24  h-24 border-2 border-gray-300 bg-gray-400 rounded-lg ml-2"
                          onError={handleError}
                        />
                        <div className="md:mt-6 md:ml-2 ml-4">
                          <p className="border-2 border-gray-300 px-2 py-1 text-xs uppercase font-medium rounded-full max-w-max">
                            {item.category}
                          </p>
                          <p>{item.title}</p>
                          <span className="text-xs xl:text:sm">
                            <span className="text-gray-400 ">size:</span>
                            {size[index]?.size}
                          </span>
                          <span className="text-xs xl:text:sm">
                            {" "}
                            <span className="text-gray-400  ">color:</span>{" "}
                            {color[index]?.color}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="xl:mt-4 mt-2">
                      <div className="flex flex-col items-end  ">
                        <s className="text-gray-400 text-xs">
                          {(() => {
                            const selectedVariant = item.variantColor.find(
                              (variant) => variant.color === color[index]?.color
                            );
                            return selectedVariant
                              ? (
                                  selectedVariant.variant_price *
                                  quantity[index]?.quantity
                                ).toFixed(2)
                              : null;
                          })()}
                        </s>

                        <p className="text-left flex items-center gap-1">
                          <IcpLogo size={20} />
                          {(() => {
                            const selectedVariant = item.variantColor.find(
                              (variant) => variant.color === color[index]?.color
                            );
                            return selectedVariant
                              ? (
                                  selectedVariant.variant_sale_price *
                                  quantity[index]?.quantity
                                ).toFixed(2)
                              : null;
                          })()}
                        </p>
                      </div>
                      <div className="xl:flex">
                        <div className="flex items-center justify-end">
                          <Button
                            className=""
                            onClick={() =>
                              deleteCart(
                                cartItems[index].slug,
                                color[index]?.color,
                                size[index]?.size
                              )
                            }
                          >
                            <HiOutlineTrash className="w-5 h-5 text-gray-400 m-1 xl:m-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-end">
                          <button
                            className="bg-gray-100 py-2 px-4 border-t border-l border-b border-gray-300 rounded-l-md hover:bg-gray-200"
                            onClick={() => decrement(index)}
                          >
                            <HiOutlineMinus />
                          </button>
                          <p className="w-16 text-center py-1 px-2 border-t border-b border-gray-300 bg-gray-100">
                            {quantity[index]?.quantity}
                          </p>
                          <button
                            className="bg-gray-100 py-2 px-4 border-t border-r border-b border-gray-300 rounded-r-md hover:bg-gray-200"
                            onClick={() => increment(index)}
                          >
                            <HiOutlinePlus />
                          </button>

                          {isQuantityChanged && selectedItemIndex === index && (
                            <button
                              className="ml-2 bg-black text-white rounded-md py-2 px-4"
                              onClick={() =>
                                updateQuantity(
                                  id[index].id,
                                  quantity[index]?.quantity,
                                  size[index]?.size,
                                  color[index]?.color
                                )
                              }
                              disabled={isLoading}
                            >
                              {isLoading && loadingItemId === id[index].id ? (
                                // Loading spinner
                                <TailSpin
                                  height="20"
                                  width="20"
                                  color="white"
                                  ariaLabel="tail-spin-loading"
                                  radius="1"
                                  visible={true}
                                />
                              ) : (
                                // Default icon
                                <div className="flex">
                                  {/* <HiCheckBadge
                                        color="green"
                                        size={24}
                                        className="cursor-pointer"
                                      />  */}
                                  Update Cart
                                </div>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>

          <Total totalPrice={totalPrice} flag={flag} />
        </div>
        //   ) : (
        //     <div className="px-6 mt-4 m-auto container">
        //       <EmptyCart></EmptyCart>
        //     </div>
        //   )}
        // </>
      )}
    </>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ cart card  Container
/* ----------------------------------------------------------------------------------------------------- */

// const CartItem = ({ item, id }) => {

//   return (
//     <div className=" md:flex flex-wrap items-center m-0  xl: justify-between border border-gray-300 mt-4  rounded-xl  p-2 py-2 w-[100%]">
//       <div>
//         <div className="flex m-2">
//           <input
//             type="checkbox"
//             className="form-checkbox h-5 w-5 text-yellow-500  rounded-none"
//             name="selectItem"
//           />
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNJNcA6I9f85ESkLkHq4HKYJ-CjzIdVXQTL25Am9yjcA&s"
//             alt=""
//             className="w-24  h-24 border border-gray-300 bg-gray-400 rounded-lg ml-2"
//           />
//           <div className="md:mt-6 md:ml-2 ml-4">
//             <p className="border border-gray-300 rounded-full w-16 item-center pl-2">
//               Other
//             </p>
//             <p>{item.title}</p>
//             <span className="text-xs xl:text:sm">
//               <span className="text-gray-400 ">Type:</span> Stereo
//             </span>
//             <span className="text-xs xl:text:sm">
//               {" "}
//               <span className="text-gray-400  ">color:</span> Blue
//             </span>
//           </div>
//         </div>
//       </div>
//       <div className="xl:mt-4 mt-2">
//         <div className="flex flex-col items-end  ">
//           <s className="text-gray-400 text-xs">$50.00</s>

//           <p className="text-left">{item.price}</p>
//         </div>
//         <div className="xl:flex">
//           <div className="flex items-center justify-end">
//             <Button className="" onClick={() => deleteCart(item.id)}>
//               <HiOutlineTrash className="w-5 h-5 text-gray-400 m-1 xl:m-4" />
//             </Button>
//           </div>

//           <div className="flex items-center justify-end">
//             <button
//               className="bg-gray-100   py-2 px-4 border-t border-l border-b  border-gray-300 rounded-l-md hover:bg-gray-200"
//               onClick={decrement}
//             >
//               <HiOutlineMinus />
//             </button>
//             <p
//               type="text"
//               className="w-16 text-center  py-1 px-2 border-t border-b border-gray-300   bg-gray-100  "
//             >
//               {id[1].id}
//             </p>

//             <button
//               className="bg-gray-100   py-2 px-4 border-t border-r border-b border-gray-300  rounded-r-md hover:bg-gray-200"
//               onClick={increment}
//             >
//               <HiOutlinePlus />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default CartPage;
