// import React, { useEffect } from "react";
// import { useState } from "react";
// import Header from "../components/common/Header.jsx";
// import ScrollToTop from "../components/common/ScrollToTop.jsx";
// import AnimationView from "../components/common/AnimationView.jsx";
// import Footer from "../components/common/Footer.jsx";
// import { RadioGroup } from "@headlessui/react";
// import { FaArrowLeft } from "react-icons/fa";
// import placeHolderImage from "../assets/placeholderImg-Small.jpeg";
// import {
//   HiCheckBadge,
//   HiCheckCircle,
//   HiOutlineTrash,
//   HiTrash,
// } from "react-icons/hi2";
// import { HiOutlinePlus } from "react-icons/hi2";
// import { HiOutlineMinus } from "react-icons/hi2";
// import Button from "../components/common/Button.jsx";
// import { Link } from "react-router-dom";
// import CartApiHandler from "../apiHandlers/CartApiHandler.jsx";
// import ProductApiHandler from "../apiHandlers/ProductApi.jsx";
// import { getCartItemDetails } from "../apiHandlers/cartUtils.js";
// import UserAddressApiHandler from "../apiHandlers/UserAddressApiHandler.jsx";
// import NoImage from "../assets/placeholderImg-Small.jpeg";
// import { InfinitySpin, TailSpin } from "react-loader-spinner";
// import EmptyCart from "../components/ProductComponents/EmptyCart.jsx";
// import toast from "react-hot-toast";
// import { useAuth, useBackend } from "../auth/useClient.jsx";
// import Modal1 from "../components/common/Styles/Modal1.jsx";
// import TabChanges from "../components/Tabchanges.jsx";
// import IcpLogo from "../assets/IcpLogo.jsx";
// import LoadingScreen from "../components/common/LoadingScreen.jsx";
// import { useNavigate } from "react-router-dom";
// import PlaceorderModal from "../components/modal/PlaceOrderModal.jsx";
// import demoImg from "../assets/merch-logo2.png";

// /* ----------------------------------------------------------------------------------------------------- */
// /*  @ Main checkout Container
// /* ----------------------------------------------------------------------------------------------------- */
// const CheckoutPage = () => {
//   return (
//     <>
//       <AnimationView>
//         <ScrollToTop />
//         <Header title={"Checkout"} />
//         <Checkout />
//         <Footer></Footer>
//       </AnimationView>
//     </>
//   );
// };

// // Payment methods
// const pMethod = [
//   {
//     name: "Pay with plug",
//     value: "icp",
//     currency: "icp",
//   },
// ];

// /* ----------------------------------------------------------------------------------------------------- */
// /*  @ checkout Container
// /* ----------------------------------------------------------------------------------------------------- */
// const Checkout = () => {
//   const {
//     getCallerCartItems,
//     orderPlacement,
//     cartItems,
//     shippingAmount,
//     getShippingAmount,
//   } = CartApiHandler();
//   const { productList, getProductList } = ProductApiHandler(0);
//   const [paymentMethod, setPaymentMethod] = useState(pMethod[0]);
//   const [finalCart, setFinalCart] = useState(null);
//   const [userAddress, setUserAddress] = useState(null);
//   const [isChecked, setIsChecked] = useState(false);
//   const [isFinalCartLoading, setIsFinalCartLoading] = useState(true);
//   const [totalPriceNQty, setTotalPriceNQty] = useState(null);
//   const [updatedPriceNQty, setUpdatedPriceNQty] = useState(null);
//   const [successDelete, setSuccessDelete] = useState(true);
//   const [exchange, setExchange] = useState(1);
//   const [currencyLoad, setCurrencyLoad] = useState(true);
//   // const { backend } = useBackend();
//   const { backend } = useAuth();
//   const { CheckoutPageLoader } = LoadingScreen();

//   const cartItemDetails = getCartItemDetails(cartItems, productList);
//   // console.log("cartItemDetails", cartItemDetails);
//   // console.log("finalCart", finalCart);
//   const pathsForTabChanges = ["Home", "cart", "shipping-address", "checkout"];

//   // Increase quantity and price
//   const handleIncrease = (index) => {
//     const updatedCart = [...finalCart];
//     updatedCart[index].quantity += 1;
//     updatedCart[index].variantPriceBasedOnQty =
//       updatedCart[index].variantPrice * updatedCart[index].quantity;
//     updatedCart[index].variantSellPriceBasedOnQty =
//       updatedCart[index].variantSellPrice * updatedCart[index].quantity;
//     setFinalCart(updatedCart);
//     setIsChecked(index);
//   };
//   // Decrease quantity and price
//   const handleDecrease = (index) => {
//     if (finalCart[index].quantity > 1) {
//       const updatedCart = [...finalCart];
//       updatedCart[index].quantity -= 1;
//       updatedCart[index].variantPriceBasedOnQty =
//         updatedCart[index].variantPrice * updatedCart[index].quantity;
//       updatedCart[index].variantSellPriceBasedOnQty =
//         updatedCart[index].variantSellPrice * updatedCart[index].quantity;
//       setFinalCart(updatedCart);
//       setIsChecked(index);
//     }
//   };

//   // Update total price and qty
//   // Update Cart price and quantity on clicking check
//   const updateTotal = () => {
//     setUpdatedPriceNQty(totalPriceNQty);
//   };

//   // Required fields to pass for orderplacement
//   const updateProductsForPlacement = (products) => {
//     return products.map((product) => ({
//       id: String(product.product.id),
//       img: product.img1,
//       size: product.size,
//       title: product.product.title,
//       color: product.color,
//       sale_price: Number(product.variantSellPrice.toFixed(2)),
//       quantity: product.quantity,
//     }));
//   };

//   const getExchangeRate = async () => {
//     const paymentOpt = { Cryptocurrency: null };
//     // const paymentOpt1 = { Cryptocurrency: null };
//     try {
//       setCurrencyLoad(true);
//       const res = await backend.get_exchange_rates(
//         { class: paymentOpt, symbol: "icp" },
//         { class: paymentOpt, symbol: paymentMethod.currency }
//       );
//       // console.log("Exchange rate first Response ", res);
//       const exchangeRate =
//         parseInt(res?.Ok?.rate) / Math.pow(10, res?.Ok?.metadata?.decimals);
//       // console.log("Exchange rate ", exchangeRate);
//       setExchange(exchangeRate);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setCurrencyLoad(false);
//     }
//   };

//   // Proceed order placement
//   const proceed = () => {
//     if (isChecked !== false) {
//       toast.error("You need to update the cart before proceed");
//       return;
//     }
//     const { totalPrice } = totalPriceNQty;
//     const products = updateProductsForPlacement(finalCart);
//     const shippingAddress = userAddress;
//     const totalAmount = (totalPrice + shippingAmount) / exchange;
//     const shippingCost = shippingAmount / exchange;
//     const subTotal = totalPrice / exchange;
//     const payment = paymentMethod.value;
//     orderPlacement(
//       products,
//       shippingAddress,
//       totalAmount,
//       subTotal,
//       payment,
//       shippingCost
//     );
//   };

//   const navigate = useNavigate();
//   const clearAll = async () => {
//     try {
//       setIsFinalCartLoading(true);

//       const res = await backend.clearallcartitmesbyprincipal();

//       if ("ok" in res) {
//         console.log(res);

//         toast.success("All items are removed");
//         navigate("/");
//       } else {
//         console.log("error while deleting all the items", res);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setSuccessClearAll(false);

//       setIsFinalCartLoading(false);
//     }
//   };

//   // Effect on get exchange
//   useEffect(() => {
//     getExchangeRate();
//   }, [paymentMethod]);

//   // Effect on initial Load : productlist , cart items
//   useEffect(() => {
//     getProductList();
//     getCallerCartItems();
//     getShippingAmount();
//   }, [successDelete, backend]);

//   // Set Initial Prices
//   useEffect(() => {
//     if (cartItemDetails !== undefined) {
//       setFinalCart(cartItemDetails);
//       const { totalPrice, totalQuantity } = cartItemDetails.reduce(
//         (totals, cartItem) => {
//           totals.totalPrice += cartItem.variantSellPriceBasedOnQty;
//           totals.totalQuantity += cartItem.quantity;
//           return totals;
//         },
//         { totalPrice: 0, totalQuantity: 0 }
//       );

//       setUpdatedPriceNQty({ totalPrice, totalQuantity });
//       const timeoutLoad = setTimeout(() => {
//         setIsFinalCartLoading(false);
//       }, 3000);
//       return () => clearTimeout(timeoutLoad);
//     }
//   }, [cartItems, productList, backend]);

//   // Effect on price and quantity
//   useEffect(() => {
//     if (finalCart && finalCart.length > 0) {
//       const { totalPrice, totalQuantity } = finalCart.reduce(
//         (totals, cartItem) => {
//           totals.totalPrice += cartItem.variantSellPriceBasedOnQty;
//           totals.totalQuantity += cartItem.quantity;
//           return totals;
//         },
//         { totalPrice: 0, totalQuantity: 0 }
//       );

//       setTotalPriceNQty({ totalPrice, totalQuantity });
//     }
//   }, [finalCart, isFinalCartLoading, backend]);

//   return (
//     <div className="container mx-auto p-6 max-md:px-2">
//       <TabChanges paths={pathsForTabChanges} />
//       {isFinalCartLoading ? (
//         <CheckoutPageLoader />
//       ) : (
//         <>
//           {finalCart && finalCart.length > 0 ? (
//             <div className="flex gap-4 tracking-wider max-md:flex-col">
//               <div className="flex flex-col gap-4 flex-1">
//                 <span className="bg-black rounded-xl text-white py-4 px-6 font-medium">
//                   Checkout
//                 </span>
//                 {finalCart.map((cartItem, index) => (
//                   <CheckoutCard
//                     key={index}
//                     cartItem={cartItem}
//                     handleIncrease={() => handleIncrease(index)}
//                     handleDecrease={() => handleDecrease(index)}
//                     isChecked={isChecked === index}
//                     setIsChecked={setIsChecked}
//                     updateTotal={updateTotal}
//                     successDelete={successDelete}
//                     setSuccessDelete={setSuccessDelete}
//                     length={finalCart.length}
//                     clearAll={clearAll}
//                     getCallerCartItems={getCallerCartItems}
//                   />
//                 ))}
//                 <AddressSection
//                   setUserAddress={setUserAddress}
//                   userAddress={userAddress}
//                 />
//                 <PaymentSection
//                   paymentMethod={paymentMethod}
//                   setPaymentMethod={setPaymentMethod}
//                   pMethod={pMethod}
//                 />
//               </div>
//               <div className="border-2 rounded-2xl max-h-80 lg:min-w-96">
//                 <BillSection
//                   updatedPriceNQty={updatedPriceNQty}
//                   proceed={proceed}
//                   shippingAmount={shippingAmount}
//                   paymentMethod={paymentMethod}
//                   exchange={exchange}
//                   currencyLoad={currencyLoad}
//                   finalCart={finalCart}
//                 />
//               </div>
//             </div>
//           ) : (
//             <EmptyCart />
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// /* ----------------------------------------------------------------------------------------------------- */
// /*  @ <Checkout /> : <CheckoutCard />
// /* ----------------------------------------------------------------------------------------------------- */
// const CheckoutCard = ({
//   cartItem,
//   handleIncrease,
//   handleDecrease,
//   isChecked,
//   setIsChecked,
//   updateTotal,
//   successDelete,
//   setSuccessDelete,
//   clearAll,
//   length,
// }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { deleteCartItemById, isLoading, updateCart } = CartApiHandler();
//   const [deleteLoad, setDeleteLoad] = useState(false);
//   const [errorImage, setErrorImage] = useState(false);
//   const handleError = () => {
//     setErrorImage(true);
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const deleteCartItem = () => {
//     console.log(length);
//     if (length == 1) {
//       clearAll();
//     } else {
//       deleteCartItemById(
//         cartItem.product.slug,
//         cartItem.size,
//         cartItem.color,
//         setDeleteLoad,
//         setSuccessDelete,
//         closeModal
//       );
//       setSuccessDelete(true);
//     }
//   };

//   const toggleUpdate = () => {
//     updateCart(
//       cartItem.product.slug,
//       cartItem.quantity,
//       cartItem.color,
//       cartItem.size
//     );
//     setIsChecked(false);
//     updateTotal();
//   };

//   return (
//     <div className="border-2 rounded-2xl p-6 flex max-lg:flex-col">
//       <div className="flex gap-4 flex-1">
//         <div className="flex p-1 border border-gray-300 rounded-xl">
//           <img
//             src={errorImage ? placeHolderImage : cartItem.img1}
//             alt="_blank"
//             className="max-w-24 max-h-24 object-contain rounded-xl"
//             onError={handleError}
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <span className="border-2 px-2 py-1 text-xs uppercase font-semibold rounded-full max-w-max">
//             {cartItem.product.category}
//           </span>
//           <p className="text-lg font-semibold capitalize">
//             {cartItem.product.title}
//           </p>
//           <span className="flex gap-4">
//             <p className="capitalize text-xs">Size: {cartItem.size}</p>
//             <p className="capitalize text-xs">Color : {cartItem.color}</p>
//           </span>
//         </div>
//       </div>
//       <div className="flex justify-end flex-col gap-2 items-end">
//         <div className="flex gap-4 items-center">
//           <p className="font-semibold text-2xl flex items-center gap-1">
//             <IcpLogo />
//             {cartItem.variantSellPriceBasedOnQty}
//           </p>
//           <p className="line-through text-gray-500">
//             {cartItem.variantPriceBasedOnQty}
//           </p>
//         </div>
//         <div className="flex gap-4 items-center">
//           <Button onClick={openModal}>
//             <HiOutlineTrash size={24} color="grey" />
//           </Button>
//           {isModalOpen && (
//             <Modal1
//               closeModal={closeModal}
//               title={"Are you sure you want to remove ?"}
//               icon={<HiTrash size={40} color="red" />}
//               btnClr="red"
//               actName="Remove"
//               action={deleteCartItem}
//               isLoading={deleteLoad}
//               addOn={successDelete}
//             />
//           )}
//           <div className="flex items-center border rounded-md border-gray-300">
//             <Button
//               className="p-2 border-r border-r-gray-300"
//               onClick={() => handleDecrease()}
//             >
//               <HiOutlineMinus size={18} />
//             </Button>
//             <span className="min-w-16 flex items-center justify-center">
//               {cartItem.quantity}
//             </span>
//             <Button
//               className="p-2 border-l border-l-gray-300"
//               onClick={() => handleIncrease()}
//             >
//               <HiOutlinePlus size={18} />
//             </Button>
//           </div>
//           {isLoading ? (
//             <TailSpin
//               visible={true}
//               height="20"
//               width="20"
//               color="black"
//               ariaLabel="tail-spin-loading"
//               radius="1"
//               wrapperStyle={{}}
//               wrapperclassName=""
//             />
//           ) : (
//             isChecked && (
//               <HiCheckBadge
//                 color="green"
//                 size={24}
//                 className="cursor-pointer"
//                 onClick={toggleUpdate}
//               />
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ----------------------------------------------------------------------------------------------------- */
// /*  @ <Checkout /> : <AddressSection />
// /* ----------------------------------------------------------------------------------------------------- */
// const AddressSection = ({ setUserAddress, userAddress }) => {
//   const { getAddressList, userAddressList, isLoading } =
//     UserAddressApiHandler();
//   // const { backend } = useBackend();
//   const { backend } = useAuth();

//   const addressConfig = () => {
//     const localStorageAddress = JSON.parse(localStorage.getItem("CurrAddress"));
//     if (localStorageAddress) {
//       setUserAddress(localStorageAddress);
//     }
//   };

//   useEffect(() => {
//     getAddressList();
//   }, [backend]);

//   useEffect(() => {
//     addressConfig();
//   }, [userAddressList, isLoading]);

//   return (
//     <div className="p-6 border-2 rounded-2xl">
//       {!userAddress && (
//         <div className="flex gap-4">
//           <p>No address found! Please select an address to proceed</p>
//           <Link
//             to="/shipping-address"
//             className="text-xs font-medium border-2 rounded-md px-4 py-2 min-w-max flex items-center"
//           >
//             Select address
//           </Link>
//         </div>
//       )}
//       {userAddress && (
//         <div className="flex max-md:flex-col justify-between gap-4">
//           <div className="flex flex-col">
//             <h1 className="text-lg font-medium capitalize flex gap-2">
//               <span>{userAddress.firstname}</span>
//               <span>{userAddress.lastname}</span>
//             </h1>
//             <div className="flex gap-2 text-sm">
//               <span>{userAddress.addressline1}</span>
//               <span>{userAddress.addressline2}</span>
//             </div>
//             <p className="font-medium text-sm">{userAddress.phone_number}</p>
//             <div className="flex font-medium text-sm">
//               <span>{userAddress.pincode}</span>,
//               <span>{userAddress.state}</span>
//             </div>
//           </div>
//           <Link
//             to="/shipping-address"
//             className="px-4 py-2 bg-gray-900 rounded-md text-white font-medium text-xs uppercase max-h-8 max-w-max"
//           >
//             Edit Address
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// /* ----------------------------------------------------------------------------------------------------- */
// /*  @ <Checkout /> : <PaymentSection />
// /* ----------------------------------------------------------------------------------------------------- */
// const PaymentSection = ({ paymentMethod, setPaymentMethod, pMethod }) => {
//   return (
//     <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
//       <RadioGroup.Label className="text-black xl:text-sm text-xs font-semibold uppercase tracking-wider">
//         Payment Method
//       </RadioGroup.Label>
//       <div className="grid xl:grid-cols-3 grid-cols-2 gap-4 py-4 max-sm:flex max-sm:flex-col font-medium cursor-pointer">
//         {pMethod.map((plan) => (
//           <RadioGroup.Option
//             key={plan.name}
//             value={plan}
//             className={({ active, checked }) =>
//               `border p-3 rounded-xl text-sm uppercase border-gray-300 ${
//                 checked ? "bg-black text-white border-black" : "bg-white"
//               }`
//             }
//           >
//             {({ checked }) => (
//               <RadioGroup.Label className="flex justify-between w-full items-center cursor-pointer">
//                 <p>{plan.name}</p>
//                 {checked && (
//                   <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
//                     <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
//                     <path
//                       d="M7 13l3 3 7-7"
//                       stroke="#fff"
//                       strokeWidth={1.5}
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 )}
//               </RadioGroup.Label>
//             )}
//           </RadioGroup.Option>
//         ))}
//       </div>
//     </RadioGroup>
//   );
// };

// /* ----------------------------------------------------------------------------------------------------- */
// /*  @ <Checkout /> : <BillSection />
// /* ----------------------------------------------------------------------------------------------------- */
// const BillSection = ({
//   updatedPriceNQty,
//   proceed,
//   shippingAmount,
//   paymentMethod,
//   exchange,
//   currencyLoad,
//   finalCart,
// }) => {
//   const priceWithShippingAmount = updatedPriceNQty.totalPrice + shippingAmount;
//   const [isOpen, setIsOpen] = useState(false);
//   const { orderPlacementLoad, setOrderPlacementLoad } = useAuth();

//   return (
//     <div className="flex flex-col">
//       <PlaceorderModal isOpen={isOpen} setIsOpen={setIsOpen}>
//         <OrderModalData
//           proceed={proceed}
//           data={finalCart}
//           totalPrice={priceWithShippingAmount}
//           setIsOpen={setIsOpen}
//         />
//       </PlaceorderModal>
//       <div className="border-b-2 py-6">
//         <span className="uppercase font-semibold px-6 text-xl text-slate-500">
//           Price details
//         </span>
//       </div>
//       <div className="border-b-2 py-2 flex flex-col gap-4 border-dashed">
//         <div className="flex justify-between px-6 gap-2 font-medium">
//           <p className="text-slate-500">
//             Price
//             <span className="italic">
//               ({updatedPriceNQty.totalQuantity}{" "}
//               {updatedPriceNQty.totalQuantity > 1 ? "items" : "item"})
//             </span>
//           </p>
//           <span className="font-bold flex items-center gap-2">
//             {/* <IcpLogo /> */}
//             <span>{paymentMethod.name}</span>
//             {currencyLoad ? (
//               <span className="animate-pulse bg-gray-300 text-gray-300 rounded-md">
//                 00.0000
//               </span>
//             ) : (
//               (updatedPriceNQty.totalPrice / exchange).toFixed(4)
//             )}
//           </span>
//         </div>
//         <div className="flex justify-between px-6 gap-2 font-medium">
//           <p className="capitalize text-slate-500">Delivery charges</p>
//           <span className="flex gap-2">
//             <p className="text-green-700 font-bold">
//               {shippingAmount === 0 ? (
//                 "Free"
//               ) : (
//                 <span className="flex items-center gap-2">
//                   {/* <IcpLogo /> */}
//                   <span>{paymentMethod.name}</span>
//                   {currencyLoad ? (
//                     <span className="animate-pulse bg-gray-300 text-gray-300 rounded-md">
//                       00.0000
//                     </span>
//                   ) : (
//                     (shippingAmount / exchange)?.toFixed(4)
//                   )}
//                 </span>
//               )}
//             </p>
//           </span>
//         </div>
//       </div>
//       <div className="border-b-2 py-4 flex flex-col gap-4 border-dashed">
//         <div className="flex justify-between px-6 gap-2 font-bold">
//           <p className="capitalize">Total Payable</p>
//           <span className="flex items-center gap-2">
//             {/* <IcpLogo /> */}
//             <span>{paymentMethod.name}</span>
//             {currencyLoad ? (
//               <span className="animate-pulse bg-gray-300 text-gray-300 rounded-md">
//                 00.0000
//               </span>
//             ) : (
//               (priceWithShippingAmount / exchange)?.toFixed(4)
//             )}
//           </span>
//         </div>
//       </div>
//       <div className="p-6 flex w-full">
//         <Button
//           className="p-2 min-w-full min-h-10 text-white border bg-black rounded-full font-medium text-sm relative"
//           // onClick={() => proceed()}
//           onClick={() => setIsOpen(true)}
//           disabled={orderPlacementLoad}
//         >
//           Place order
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

// const OrderModalData = ({ setIsOpen, proceed, data, totalPrice }) => {
//   const { orderPlacementLoad, setOrderPlacementLoad } = useAuth();

//   const handleConfirm = () => {
//     setOrderPlacementLoad(true);
//     proceed();
//   };

//   return (
//     <div className="mx-auto max-w-2xl space-y-4 text-neutral-400 py-4">
//       <h2 className="text-4xl font-bold text-neutral-200">
//         Verify your order details
//       </h2>
//       <div className="py-6">
//         {data.map((item, index) => (
//           <div className="flex space-x-4" key={index}>
//             <img
//               src={item.product.variantColor[0].img1}
//               alt={item.product.title}
//               className="min-h-24 min-w-24 max-h-24 max-w-24 object-contain"
//             />
//             <div className="flex w-full flex-col space-y-2">
//               <h1 className="text-xl">{item.product.title}</h1>
//               <p className="text-xs">Quantity : {item.quantity}</p>
//               <p className="text-sm font-semibold mt-auto">
//                 ICP {item.variantSellPriceBasedOnQty}
//               </p>
//             </div>
//           </div>
//         ))}
//         <div className="h-px bg-neutral-300 my-6"></div>
//         <div className="flex w-full my-6 text-xl font-semibold">
//           <h4 className="w-24">Total</h4>
//           <h4 className="ml-4">ICP {totalPrice} (including shipping amount)</h4>
//         </div>
//         <p className="text-xs font-light my-6">
//           Click 'Confirm' to complete your purchase or 'Go back' to edit."
//         </p>
//         <div className="flex gap-2 my-6">
//           <button
//             onClick={orderPlacementLoad ? null : () => setIsOpen(false)}
//             className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
//           >
//             Nah, go back
//           </button>

//           <div className="relative w-full h-10 flex items-center justify-center">
//             {orderPlacementLoad ? (
//               <InfinitySpin
//                 visible={true}
//                 color="#4fa94d"
//                 ariaLabel="infinity-spin-loading"
//                 className="w-full h-full flex items-center justify-center"
//               />
//             ) : (
//               <button
//                 onClick={handleConfirm}
//                 className="bg-white text-gray-600 font-semibold w-full h-full py-2 rounded transition-opacity hover:opacity-90"
//               >
//                 Confirm
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// Identity kit
import React, { useEffect } from "react";
import { useState } from "react";
import Header from "../components/common/Header.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import AnimationView from "../components/common/AnimationView.jsx";
import Footer from "../components/common/Footer.jsx";
import { RadioGroup } from "@headlessui/react";
import { FaArrowLeft } from "react-icons/fa";
import placeHolderImage from "../assets/placeholderImg-Small.jpeg";
import {
  HiCheckBadge,
  HiCheckCircle,
  HiOutlineTrash,
  HiTrash,
} from "react-icons/hi2";
import { HiOutlinePlus } from "react-icons/hi2";
import { HiOutlineMinus } from "react-icons/hi2";
import Button from "../components/common/Button.jsx";
import { Link } from "react-router-dom";
import CartApiHandler from "../apiHandlers/CartApiHandler.jsx";
import ProductApiHandler from "../apiHandlers/ProductApi.jsx";
import { getCartItemDetails } from "../apiHandlers/cartUtils.js";
import UserAddressApiHandler from "../apiHandlers/UserAddressApiHandler.jsx";
import NoImage from "../assets/placeholderImg-Small.jpeg";
import { InfinitySpin, TailSpin } from "react-loader-spinner";
import EmptyCart from "../components/ProductComponents/EmptyCart.jsx";
import toast from "react-hot-toast";
import { useAuth, useBackend } from "../auth/useClient.jsx";
import Modal1 from "../components/common/Styles/Modal1.jsx";
import TabChanges from "../components/Tabchanges.jsx";
import IcpLogo from "../assets/IcpLogo.jsx";
import LoadingScreen from "../components/common/LoadingScreen.jsx";
import { useNavigate } from "react-router-dom";
import PlaceorderModal from "../components/modal/PlaceOrderModal.jsx";
import demoImg from "../assets/merch-logo2.png";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Main checkout Container
/* ----------------------------------------------------------------------------------------------------- */
const CheckoutPage = () => {
  return (
    <>
      {/* <AnimationView>
        <ScrollToTop />
        <Header title={"Checkout"} /> */}
      <Checkout />
      {/* <Footer></Footer>
      </AnimationView> */}
    </>
  );
};

// Payment methods
const pMethod = [
  {
    name: "Pay with plug",
    value: "icp",
    currency: "icp",
  },
  {
    name: "Pay with NFID",
    value: "icp",
    currency: "icp",
  },
  // {
  //   name: "CKBTC",
  //   value: "ckbtc",
  //   currency: "btc",
  // },
  /* {
    name: "Fiat Payment",
    value: "fiat-payment",
  }, */
  // {
  //   name: "Pay with paypal",
  //   value: "paypal-payment",
  // },
];

/* ----------------------------------------------------------------------------------------------------- */
/*  @ checkout Container
/* ----------------------------------------------------------------------------------------------------- */
const Checkout = () => {
  const {
    getCallerCartItems,
    orderPlacement,
    cartItems,
    shippingAmount,
    getShippingAmount,
  } = CartApiHandler();
  const { productList, getProductList } = ProductApiHandler(0);
  const [paymentMethod, setPaymentMethod] = useState(pMethod[0]);
  const [finalCart, setFinalCart] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isFinalCartLoading, setIsFinalCartLoading] = useState(true);
  const [totalPriceNQty, setTotalPriceNQty] = useState(null);
  const [updatedPriceNQty, setUpdatedPriceNQty] = useState(null);
  const [successDelete, setSuccessDelete] = useState(true);
  // const [exchange, setExchange] = useState(1);
  // const [currencyLoad, setCurrencyLoad] = useState(true);
  // const { backend } = useBackend();
  const { backend, principal } = useAuth();
  const { CheckoutPageLoader } = LoadingScreen();

  const cartItemDetails = getCartItemDetails(cartItems, productList);
  // console.log("cartItemDetails", cartItemDetails);
  // console.log("finalCart", finalCart);
  const pathsForTabChanges = ["Home", "cart", "shipping-address", "checkout"];

  // Increase quantity and price
  const handleIncrease = (index) => {
    const updatedCart = [...finalCart];
    updatedCart[index].quantity += 1;
    updatedCart[index].variantPriceBasedOnQty =
      updatedCart[index].variantPrice * updatedCart[index].quantity;
    updatedCart[index].variantSellPriceBasedOnQty =
      updatedCart[index].variantSellPrice * updatedCart[index].quantity;
    setFinalCart(updatedCart);
    setIsChecked(index);
  };
  // Decrease quantity and price
  const handleDecrease = (index) => {
    if (finalCart[index].quantity > 1) {
      const updatedCart = [...finalCart];
      updatedCart[index].quantity -= 1;
      updatedCart[index].variantPriceBasedOnQty =
        updatedCart[index].variantPrice * updatedCart[index].quantity;
      updatedCart[index].variantSellPriceBasedOnQty =
        updatedCart[index].variantSellPrice * updatedCart[index].quantity;
      setFinalCart(updatedCart);
      setIsChecked(index);
    }
  };

  // Update total price and qty
  // Update Cart price and quantity on clicking check
  const updateTotal = () => {
    setUpdatedPriceNQty(totalPriceNQty);
  };

  // Required fields to pass for orderplacement
  const updateProductsForPlacement = (products) => {
    return products.map((product) => ({
      id: String(product.product.id),
      img: product.img1,
      size: product.size,
      title: product.product.title,
      color: product.color,
      sale_price: Number(product.variantSellPrice.toFixed(4)),
      quantity: product.quantity,
    }));
  };

  // const getExchangeRate = async () => {
  //   const paymentOpt = { Cryptocurrency: null };
  //   // const paymentOpt1 = { Cryptocurrency: null };
  //   try {
  //     setCurrencyLoad(true);
  //     const res = await backend.get_exchange_rates(
  //       { class: paymentOpt, symbol: "icp" },
  //       { class: paymentOpt, symbol: paymentMethod.currency }
  //     );
  //     // console.log("Exchange rate first Response ", res);
  //     const exchangeRate =
  //       parseInt(res?.Ok?.rate) / Math.pow(10, res?.Ok?.metadata?.decimals);
  //     // console.log("Exchange rate ", exchangeRate);
  //     setExchange(exchangeRate);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     // Loading
  //     setCurrencyLoad(false);
  //   }
  // };

  // console.log("exchange state ", exchange);
  // console.log("total Price will be ", priceWithShippingAmount / exchange);

  // Proceed order placement
  const proceed = () => {
    if (isChecked !== false) {
      toast.error("You need to update the cart before proceed");
      return;
    }
    const { totalPrice } = totalPriceNQty;
    const products = updateProductsForPlacement(finalCart);
    // console.log("final cart", finalCart);
    // console.log("PRodcuts are  ", products);
    const shippingAddress = userAddress;
    const totalAmount = totalPrice + shippingAmount;
    const shippingCost = shippingAmount;
    const subTotal = totalPrice;
    const payment = paymentMethod.value;
    console.log(
      "order proceed",
      products,
      shippingAddress,
      totalAmount,
      subTotal,
      payment,
      shippingCost
    );
    orderPlacement(
      products,
      shippingAddress,
      totalAmount,
      subTotal,
      payment,
      shippingCost
    );
  };

  const navigate = useNavigate();
  const clearAll = async () => {
    try {
      setIsFinalCartLoading(true);

      const res = await backend.clearallcartitmesbyprincipal();

      if ("ok" in res) {
        console.log(res);
        toast.success("All items are removed");
        navigate("/");
      } else {
        console.log("error while deleting all the items", res);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSuccessClearAll(false);

      setIsFinalCartLoading(false);
    }
  };

  // Effect on get exchange
  // useEffect(() => {
  //   getExchangeRate();
  // }, [paymentMethod]);

  // Effect on initial Load : productlist , cart items
  useEffect(() => {
    getProductList();
    getCallerCartItems();
    getShippingAmount();
  }, [successDelete, principal]);

  // Set Initial Prices
  useEffect(() => {
    if (cartItemDetails !== undefined && productList) {
      setFinalCart(cartItemDetails);
      const { totalPrice, totalQuantity } = cartItemDetails.reduce(
        (totals, cartItem) => {
          totals.totalPrice += cartItem.variantSellPriceBasedOnQty;
          totals.totalQuantity += cartItem.quantity;
          return totals;
        },
        { totalPrice: 0, totalQuantity: 0 }
      );

      setUpdatedPriceNQty({ totalPrice, totalQuantity });
      // Loading : till all the data gather from backend
      //const timeoutLoad = setTimeout(() => {
      setIsFinalCartLoading(false);
      //}, 3000);
      //return () => clearTimeout(timeoutLoad);
    }
  }, [cartItems, productList, backend]);

  // Effect on price and quantity
  useEffect(() => {
    if (finalCart && finalCart.length > 0) {
      const { totalPrice, totalQuantity } = finalCart.reduce(
        (totals, cartItem) => {
          totals.totalPrice += cartItem.variantSellPriceBasedOnQty;
          totals.totalQuantity += cartItem.quantity;
          return totals;
        },
        { totalPrice: 0, totalQuantity: 0 }
      );

      setTotalPriceNQty({ totalPrice, totalQuantity });
    }
  }, [finalCart, isFinalCartLoading, backend]);

  // console.log("finalcart", finalCart);

  return (
    <div className="container mx-auto p-6 max-md:px-2">
      <TabChanges paths={pathsForTabChanges} />
      {isFinalCartLoading ? (
        <CheckoutPageLoader />
      ) : (
        <>
          {finalCart && finalCart.length > 0 ? (
            <div className="flex gap-4 tracking-wider max-md:flex-col">
              <div className="flex flex-col gap-4 flex-1">
                <span className="bg-black rounded-xl text-white py-4 px-6 font-medium">
                  Checkout
                </span>
                {finalCart.map((cartItem, index) => (
                  <CheckoutCard
                    key={index}
                    cartItem={cartItem}
                    handleIncrease={() => handleIncrease(index)}
                    handleDecrease={() => handleDecrease(index)}
                    isChecked={isChecked === index}
                    setIsChecked={setIsChecked}
                    updateTotal={updateTotal}
                    successDelete={successDelete}
                    setSuccessDelete={setSuccessDelete}
                    length={finalCart.length}
                    clearAll={clearAll}
                    getCallerCartItems={getCallerCartItems}
                  />
                ))}
                <AddressSection
                  setUserAddress={setUserAddress}
                  userAddress={userAddress}
                />
                {/* <PaymentSection
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  pMethod={pMethod}
                /> */}
              </div>
              <div className="border-2 rounded-2xl max-h-80 lg:min-w-96">
                <BillSection
                  updatedPriceNQty={updatedPriceNQty}
                  proceed={proceed}
                  shippingAmount={shippingAmount}
                  paymentMethod={paymentMethod}
                  // exchange={exchange}
                  // currencyLoad={currencyLoad}
                  finalCart={finalCart}
                />
              </div>
            </div>
          ) : (
            <EmptyCart />
          )}
        </>
      )}
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <Checkout /> : <CheckoutCard />
/* ----------------------------------------------------------------------------------------------------- */
const CheckoutCard = ({
  cartItem,
  handleIncrease,
  handleDecrease,
  isChecked,
  setIsChecked,
  updateTotal,
  successDelete,
  setSuccessDelete,
  clearAll,
  length,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteCartItemById, isLoading, updateCart } = CartApiHandler();
  const [deleteLoad, setDeleteLoad] = useState(false);
  const [errorImage, setErrorImage] = useState(false);
  const handleError = () => {
    setErrorImage(true);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteCartItem = () => {
    console.log(length);
    if (length == 1) {
      clearAll();
    } else {
      deleteCartItemById(
        cartItem.product.slug,
        cartItem.size,
        cartItem.color,
        setDeleteLoad,
        setSuccessDelete,
        closeModal
      );
      setSuccessDelete(true);
    }
  };

  const toggleUpdate = () => {
    updateCart(
      cartItem.product.slug,
      cartItem.quantity,
      cartItem.color,
      cartItem.size
    );
    setIsChecked(false);
    updateTotal();
  };

  return (
    <div className="border-2 rounded-2xl p-6 flex max-lg:flex-col">
      <div className="flex gap-4 flex-1">
        <div className="flex p-1 border border-gray-300 rounded-xl">
          <img
            src={errorImage ? placeHolderImage : cartItem.img1}
            alt="_blank"
            className="max-w-24 max-h-24 object-contain rounded-xl"
            onError={handleError}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="border-2 px-2 py-1 text-xs uppercase font-semibold rounded-full max-w-max">
            {cartItem.product.category}
          </span>
          <p className="text-lg font-semibold capitalize">
            {cartItem.product.title}
          </p>
          <span className="flex gap-4">
            <p className="capitalize text-xs">Size: {cartItem.size}</p>
            <p className="capitalize text-xs">Color : {cartItem.color}</p>
          </span>
        </div>
      </div>
      <div className="flex justify-end flex-col gap-2 items-end">
        <div className="flex gap-4 items-center">
          <p className="font-semibold text-2xl flex items-center gap-1">
            <IcpLogo />
            {cartItem.variantSellPriceBasedOnQty}
          </p>
          <p className="line-through text-gray-500">
            {cartItem.variantPriceBasedOnQty}
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <Button onClick={openModal}>
            <HiOutlineTrash size={24} color="grey" />
          </Button>
          {isModalOpen && (
            <Modal1
              closeModal={closeModal}
              title={"Are you sure you want to remove ?"}
              icon={<HiTrash size={40} color="red" />}
              btnClr="red"
              actName="Remove"
              action={deleteCartItem}
              isLoading={deleteLoad}
              addOn={successDelete}
            />
          )}
          <div className="flex items-center border rounded-md border-gray-300">
            <Button
              className="p-2 border-r border-r-gray-300"
              onClick={() => handleDecrease()}
            >
              <HiOutlineMinus size={18} />
            </Button>
            <span className="min-w-16 flex items-center justify-center">
              {cartItem.quantity}
            </span>
            <Button
              className="p-2 border-l border-l-gray-300"
              onClick={() => handleIncrease()}
            >
              <HiOutlinePlus size={18} />
            </Button>
          </div>
          {isLoading ? (
            <TailSpin
              visible={true}
              height="20"
              width="20"
              color="black"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperclassName=""
            />
          ) : (
            isChecked && (
              <button
                onClick={toggleUpdate}
                className="flex justify-center items-center gap-1 bg-gray-200 rounded-md py-1 px-2"
              >
                <HiCheckBadge
                  color="green"
                  size={24}
                  className="cursor-pointer"
                />{" "}
                Update
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <Checkout /> : <AddressSection />
/* ----------------------------------------------------------------------------------------------------- */
const AddressSection = ({ setUserAddress, userAddress }) => {
  // const { getAddressList, userAddressList, isLoading } =
  //   UserAddressApiHandler();
  // const { backend } = useBackend();
  // const { backend } = useAuth();

  // const addressConfig = () => {
  // const localStorageAddress = JSON.parse(localStorage.getItem("CurrAddress"));
  // if (localStorageAddress) {
  //   setUserAddress(localStorageAddress);
  // }

  // if (userAddressList && userAddressList.length > 0) {
  //   const addresses = userAddressList.map((address) => address);
  //   console.log(addresses, "Address list");
  //   // setUserAddress(addresses[0]);
  // }
  // };

  // useEffect(() => {
  //   getAddressList();
  // }, [backend]);

  useEffect(() => {
    // addressConfig();
    const localStorageAddress = JSON.parse(localStorage.getItem("CurrAddress"));
    if (localStorageAddress) {
      setUserAddress(localStorageAddress);
    }
  }, []);

  // useEffect(() => {
  //   console.log("User address is", userAddress);
  // }, [userAddress]);

  return (
    <div className="p-6 border-2 rounded-2xl">
      {!userAddress && (
        <div className="flex gap-4">
          <p>No address found! Please select an address to proceed</p>
          <Link
            to="/shipping-address"
            className="text-xs font-medium border-2 rounded-md px-4 py-2 min-w-max flex items-center"
          >
            Select address
          </Link>
        </div>
      )}
      {userAddress && (
        <div className="flex max-md:flex-col justify-between gap-4">
          <div className="flex flex-col">
            <h1 className="text-lg font-medium capitalize flex gap-2">
              <span>{userAddress.firstname}</span>
              <span>{userAddress.lastname}</span>
            </h1>
            <div className="flex gap-2 text-sm">
              <span>{userAddress.addressline1}</span>
              <span>{userAddress.addressline2}</span>
            </div>
            <p className="font-medium text-sm">{userAddress.phone_number}</p>
            <div className="flex font-medium text-sm">
              <span>{userAddress.pincode}</span>,
              <span>{userAddress.state}</span>
            </div>
          </div>
          <Link
            to="/shipping-address"
            className="px-4 py-2 bg-gray-900 rounded-md text-white font-medium text-xs uppercase max-h-8 max-w-max"
          >
            Edit Address
          </Link>
        </div>
      )}
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <Checkout /> : <PaymentSection />
/* ----------------------------------------------------------------------------------------------------- */
const PaymentSection = ({ paymentMethod, setPaymentMethod, pMethod }) => {
  return (
    <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
      <RadioGroup.Label className="text-black xl:text-sm text-xs font-semibold uppercase tracking-wider">
        Payment Method
      </RadioGroup.Label>
      <div className="grid xl:grid-cols-3 grid-cols-2 gap-4 py-4 max-sm:flex max-sm:flex-col font-medium cursor-pointer">
        {pMethod.map((plan) => (
          <RadioGroup.Option
            key={plan.name}
            value={plan}
            className={({ active, checked }) =>
              `border p-3 rounded-xl text-sm uppercase border-gray-300 ${
                checked ? "bg-black text-white border-black" : "bg-white"
              }`
            }
          >
            {({ checked }) => (
              <RadioGroup.Label className="flex justify-between w-full items-center cursor-pointer">
                <p>{plan.name}</p>
                {checked && (
                  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                    <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
                    <path
                      d="M7 13l3 3 7-7"
                      stroke="#fff"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </RadioGroup.Label>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <Checkout /> : <BillSection />
/* ----------------------------------------------------------------------------------------------------- */
const BillSection = ({
  updatedPriceNQty,
  proceed,
  shippingAmount,
  paymentMethod,
  // exchange,
  // currencyLoad,
  finalCart,
}) => {
  // const { orderPlacementLoad } = CartApiHandler();
  // const { backend } = useBackend();
  // const { backend } = useAuth();
  // const [exchange, setExchange] = useState(1);
  // const [currencyLoad, setCurrencyLoad] = useState(true);
  const priceWithShippingAmount = updatedPriceNQty.totalPrice + shippingAmount;
  const [isOpen, setIsOpen] = useState(false);
  const { orderPlacementLoad, setOrderPlacementLoad } = useAuth();

  // console.log("Final cart is ", finalCart);

  // const getExchangeRate = async () => {
  //   const paymentOpt = { Cryptocurrency: null };
  //   // const paymentOpt1 = { Cryptocurrency: null };
  //   try {
  //     setCurrencyLoad(true);
  //     const res = await backend.get_exchange_rates(
  //       { class: paymentOpt, symbol: "icp" },
  //       { class: paymentOpt, symbol: paymentMethod.currency }
  //     );
  //     // console.log("Exchange rate first Response ", res);
  //     const exchangeRate =
  //       parseInt(res?.Ok?.rate) / Math.pow(10, res?.Ok?.metadata?.decimals);
  //     // console.log("Exchange rate ", exchangeRate);
  //     setExchange(exchangeRate);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     // Loading
  //     setCurrencyLoad(false);
  //   }
  // };

  // // console.log("exchange state ", exchange);
  // // console.log("total Price will be ", priceWithShippingAmount / exchange);

  // useEffect(() => {
  //   getExchangeRate();
  // }, [paymentMethod]);

  return (
    <div className="flex flex-col">
      <PlaceorderModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <OrderModalData
          proceed={proceed}
          data={finalCart}
          totalPrice={priceWithShippingAmount}
          setIsOpen={setIsOpen}
        />
      </PlaceorderModal>
      <div className="border-b-2 py-6">
        <span className="uppercase font-semibold px-6 text-xl text-slate-500">
          Price details
        </span>
      </div>
      <div className="border-b-2 py-2 flex flex-col gap-4 border-dashed">
        <div className="flex justify-between px-6 gap-2 font-medium">
          <p className="text-slate-500">
            Price
            <span className="italic">
              ({updatedPriceNQty.totalQuantity}{" "}
              {updatedPriceNQty.totalQuantity > 1 ? "items" : "item"})
            </span>
          </p>
          <span className="font-bold flex items-center gap-2">
            {/* <IcpLogo /> */}
            {/* <span>{paymentMethod.name}</span> */}

            {updatedPriceNQty.totalPrice.toFixed(4)}
          </span>
        </div>
        <div className="flex justify-between px-6 gap-2 font-medium">
          <p className="capitalize text-slate-500">Delivery charges</p>
          <span className="flex gap-2">
            <p className="text-green-700 font-bold">
              {shippingAmount === 0 ? (
                "Free"
              ) : (
                <span className="flex items-center gap-2">
                  {/* <IcpLogo /> */}
                  {/* <span>{paymentMethod.name}</span> */}

                  {shippingAmount?.toFixed(4)}
                </span>
              )}
            </p>
          </span>
        </div>
      </div>
      <div className="border-b-2 py-4 flex flex-col gap-4 border-dashed">
        <div className="flex justify-between px-6 gap-2 font-bold">
          <p className="capitalize">Total Payable</p>
          <span className="flex items-center gap-2">
            {/* <IcpLogo /> */}
            {/* <span>{paymentMethod.name}</span> */}
            {priceWithShippingAmount?.toFixed(4)}
          </span>
        </div>
      </div>
      <div className="p-6 flex w-full">
        <Button
          className="p-2 min-w-full min-h-10 text-white border bg-black rounded-full font-medium text-sm relative"
          // onClick={() => proceed()}
          onClick={() => setIsOpen(true)}
          // disabled={orderPlacementLoad}
        >
          Place order
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPage;

const OrderModalData = ({ setIsOpen, proceed, data, totalPrice }) => {
  const { orderPlacementLoad, setOrderPlacementLoad } = useAuth();

  const handleConfirm = () => {
    // console.log("data", data, totalPrice);
    // console.log(orderPlacementLoad);
    setOrderPlacementLoad(true);
    proceed();
  };

  // console.log("OrderPlacement load is", orderPlacementLoad);

  return (
    <div className="mx-auto max-w-2xl space-y-4 text-neutral-400 py-4">
      <h2 className="text-4xl font-bold text-neutral-200">
        Verify your order details
      </h2>
      <div className="py-6">
        {data.map((item, index) => (
          <div className="flex space-x-4" key={index}>
            <img
              src={item.product.variantColor[0].img1}
              alt={item.product.title}
              className="min-h-24 min-w-24 max-h-24 max-w-24 object-contain"
            />
            <div className="flex w-full flex-col space-y-2">
              <h1 className="text-xl">{item.product.title}</h1>
              <p className="text-xs">Quantity : {item.quantity}</p>
              <p className="text-sm font-semibold mt-auto">
                ICP {item.variantSellPriceBasedOnQty}
              </p>
            </div>
          </div>
        ))}
        <div className="h-px bg-neutral-300 my-6"></div>
        <div className="flex w-full my-6 text-xl font-semibold">
          <h4 className="w-24">Total</h4>
          <h4 className="ml-4">ICP {totalPrice} (including shipping amount)</h4>
        </div>
        <p className="text-xs font-light my-6">
          Click 'Confirm' to complete your purchase or 'Go back' to edit."
        </p>
        <div className="flex gap-2 my-6">
          <button
            onClick={orderPlacementLoad ? null : () => setIsOpen(false)}
            className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
          >
            Nah, go back
          </button>

          <div className="relative w-full h-10 flex items-center justify-center">
            {orderPlacementLoad ? (
              <InfinitySpin
                visible={true}
                color="#4fa94d"
                ariaLabel="infinity-spin-loading"
                className="w-full h-full flex items-center justify-center"
              />
            ) : (
              <button
                onClick={handleConfirm}
                className="bg-white text-gray-600 font-semibold w-full h-full py-2 rounded transition-opacity hover:opacity-90"
              >
                Confirm
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
