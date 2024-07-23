import React, { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import PR1 from "../../assets/fakeprod.png";
//import { useCanister } from "@connect2ic/react";
import placeholderImg from "../../assets/placeholderImg-Small.jpeg";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import CartItemsSmallLoader from "./CartItemsSmallLoader";
//import { useConnect } from "@connect2ic/react";
import IcpLogo from "../../assets/IcpLogo";
import { useAuth } from "../../auth/useClient";

const CartItemsSmall = () => {
  const [cartItems, setCartItems] = useState([]);
  const { principal, isConnected, backend } = useAuth();
  const [product, getProduct] = useState([]);
  const [quantity, setQuantity] = useState();
  const [id, setIds] = useState("");

  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [loading3, setLoading3] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [errorImage, setErrorImage] = useState(false);
  const handleError = () => {
    setErrorImage(true);
  };

  // const {backend}=useBackend()

  const getCartlist = async () => {
    try {
      const item = await backend.getCallerCartItems(10, 0);
      console.log(item, "Hello");
      const formatColor = item.data.map((item) => ({
        color: item.color,
      }));
      setColor(formatColor);
      const formatSize = item.data.map((item) => ({
        size: item.size,
      }));

      setSize(formatSize);
      // const formatIds = item.map((item) => ({
      //   id: item[1].id,
      // }));
      // setIds(formatIds);
      const formatQuantity = item.data.map((item) => ({
        quantity: item.quantity,
      }));
      setQuantity(formatQuantity);

      const formattedItems = item.data.map((item) => ({
        slug: item.product_slug,
      }));

      // Update state with the formatted items array
      setCartItems(formattedItems);

      if (item.ok) {
        console.log(item);
      }
    } catch (error) {
      console.error("Error listing cart:", error);
    } finally {
    }
  };

  console.log(cartItems);
  useEffect(() => {
    getCartlist();
  }, [backend]);

  const getProductCartlist = async () => {
    try {
      {
        setLoading(true);
        const productPromises = cartItems.map(async (productId) => {
          const productResponse = await backend.getProduct(productId.slug);
          return productResponse.ok; // Assuming `ok` property contains the product details
        });

        // Wait for all promises to resolve
        const products = await Promise.all(productPromises);

        getProduct(products);

        // Access and log the title property for each product
      }
    } catch (error) {
      console.error("Error ", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCartHandler = async (id) => {
    try {
      setLoading3(true);
      setLoadingItemId(id);

      const remove = await backend.deleteCartItems();
      getProductCartlist();
      getCartlist();
      if (remove) {
        toast.success("item removed successfully");
      }
    } catch (error) {
      console.error("deletion cannot be performed", error);
    } finally {
      setLoading3(false);
    }
  };
  useEffect(() => {
    // Call getProductWishlist only when wishlists have been updated
    if (cartItems !== "") {
      getProductCartlist();

      // Cleanup the timeout on component unmount
    }
  }, [backend, cartItems]);

  return (
    <>
      {loading ? (
        <div className=" p-3  mb-3 grid grid-cols-1 gap-3">
          {[...Array(cartItems.length)].slice(0, 3).map((_, index) => (
            <CartItemsSmallLoader key={index} />
          ))}
        </div>
      ) : (
        <div>
          {product.slice(0, 3).map((item, index) => (
            <div
              className="rounded-xl flex justify-between  mt-2 items-center gap-2 "
              key={index}
            >
              <div className="flex justify-start items-start gap-2">
                <div className="relative w-[100px]">
                  <img
                    src={
                      errorImage ? placeholderImg : item.variantColor[0].img1
                    }
                    alt={"product image"}
                    className="min-w-[100px] bg-gray-100 rounded-xl "
                    onError={handleError}
                  />
                  <span className="bg-green-500 absolute top-1 right-1 rounded-md text-[9px] w-4 h-4 flex justify-center items-center text-white p-1/2">
                    {quantity[index]?.quantity}
                  </span>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm border-[1px] uppercase px-2 py-1/2 text-gray-600 rounded-full max-w-max bg-gray-50 mb-1">
                    {item?.category}
                  </h4>
                  <h4 className="text-sm line-clamp-1 capitalize text-gray-900 leading-tight mb-1/2">
                    {item?.title}
                  </h4>
                  <div className="flex gap-2">
                    <h4 className="text-xs">
                      <span className="text-gray-500">Color: </span>
                      <span className="text-gray-800 capitalize">
                        {" "}
                        {color[index]?.color}
                      </span>
                    </h4>
                    <h4 className="text-xs">
                      <span className="text-gray-500">Size: </span>
                      <span className="text-gray-800 capitalize">
                        {size[index]?.size}
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between items-end h-full">
                <div className="flex flex-col justify-end items-end">
                  <h4 className="text-gray-500 text-xs line-through font-light">
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
                  </h4>
                  <h4 className="text-gray-900 text-md font-semibold flex gap-1 items-center">
                    <IcpLogo size={16} />
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
                  </h4>
                </div>
                {loading ? (
                  <div className="w-5 h-5 rounded-full bg-gray-100 animate-pulse"></div>
                ) : (
                  <>
                    <button
                      className={`w-5 h-5 text-gray-400 ${
                        loading3 && "opacity-50"
                      }`}
                      disabled={loading3 && true}
                      onClick={() => deleteCartHandler()}
                    >
                      {loading3 && loadingItemId === id[index].id ? (
                        <TailSpin
                          height="100%"
                          width="100%"
                          color="gray"
                          ariaLabel="tail-spin-loading"
                          radius="1"
                          visible={true}
                        />
                      ) : (
                        <HiOutlineTrash
                          title="Delete Item"
                          className={`w-full h-full`}
                        />
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CartItemsSmall;

// import React, { useEffect, useState } from "react";
// import { HiOutlineTrash } from "react-icons/hi2";
// import PR1 from "../../assets/fakeprod.png";
// import { useCanister } from "@connect2ic/react";
// import placeholderImg from "../../assets/placeholderImg-Small.jpeg";
// import toast from "react-hot-toast";
// import { TailSpin } from "react-loader-spinner";
// import CartItemsSmallLoader from "./CartItemsSmallLoader";

// const CartItemsSmall = () => {
//   const [cart,setCarts]=useState();
//   const [backend] = useCanister("backend");
//   const [product, setProduct] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loading3, setLoading3] = useState(false);

//   const listCarts = async () => {
//     try {
//       //setLoading(true)
//       const cart = await backend.getCallerCartItems();
//       console.log(cart);
//       //setCarts(cart);
//     } catch (error) {
//       console.error("Error listing carts:", error);
//     } finally {
//       //setLoading(false)
//     }
//   };
//   useEffect(() => {
//     listCarts();
//   }, [backend]);

//   //console.log(cart, 'carts');
//   useEffect(() => {
//     const getProduct = async () => {
//       try {
//         setLoading(true);

//         const product2 = await backend.getProduct(cart[1]?.product_slug);
//         console.log(product2);
//         setProduct(product2.ok);
//         //console.log(product2.ok)
//       } catch (error) {
//         console.error("Error listing Product:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (backend) {
//       getProduct();
//     }
//   }, [backend]);

//   const deleteCartHandler = async () => {
//     try {
//       setLoading3(true);

//       const res = await backend.deleteCartItems(cart[1]?.id);
//       console.log(res);
//       if ("ok" in res) {
//         toast.success("Product removed from cart.");
//         listCarts();
//         //window.location.reload()
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//     } finally {
//       setLoading3(false);
//     }
//   };

//   return (
//     <>
//       {loading ? (
//         <CartItemsSmallLoader />
//       ) : (
//         <div className="rounded-xl flex justify-between items-center gap-2">
//           <div className="flex justify-start items-start gap-2">
//             <img
//               src={product?.img ? product?.img : placeholderImg}
//               alt={"product image"}
//               className="w-[80px] bg-gray-100 rounded-xl"
//             />
//             <div className="flex flex-col">
//               <h4 className="text-sm border-[1px] px-2 py-1/2 text-gray-600 rounded-full max-w-max bg-gray-50 mb-1">
//                 {product?.category}
//               </h4>
//               <h4 className="text-sm line-clamp-2 text-gray-900 leading-tight mb-1/2">
//                 {product?.title}
//               </h4>
//               <div className="flex gap-2">
//                 <h4 className="text-xs">
//                   <span className="text-gray-500">Color: </span>
//                   <span className="text-gray-800">red</span>
//                 </h4>
//                 <h4 className="text-xs">
//                   <span className="text-gray-500">Size: </span>
//                   <span className="text-gray-800">small</span>
//                 </h4>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col justify-between items-end h-full">
//             <div className="flex flex-col justify-end items-end">
//               <h4 className="text-gray-500 text-xs line-through font-light">
//                 ${product?.price}
//               </h4>
//               <h4 className="text-gray-900 text-md font-semibold">
//                 ${product?.sellingPrice}
//               </h4>
//             </div>
//             {loading ? (
//               <div className="w-5 h-5 rounded-full bg-gray-100 animate-pulse"></div>
//             ) : (
//               <>
//                 <button
//                   className={`w-5 h-5 text-gray-400 ${
//                     loading3 && "opacity-50"
//                   }`}
//                   disabled={loading3 && true}
//                 >
//                   {loading3 ? (
//                     <TailSpin
//                       height="100%"
//                       width="100%"
//                       color="gray"
//                       ariaLabel="tail-spin-loading"
//                       radius="1"
//                       visible={true}
//                     />
//                   ) : (
//                     <HiOutlineTrash
//                       title="Delete Item"
//                       className={`w-full h-full`}
//                       onClick={deleteCartHandler}
//                     />
//                   )}
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CartItemsSmall;
