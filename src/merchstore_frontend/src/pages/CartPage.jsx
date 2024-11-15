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
import { Link, useNavigate } from "react-router-dom";
import CartApiHandler from "../apiHandlers/CartApiHandler.jsx";
import ProductApiHandler from "../apiHandlers/ProductApi.jsx";
import { getCartItemDetails } from "../apiHandlers/cartUtils.js";
import UserAddressApiHandler from "../apiHandlers/UserAddressApiHandler.jsx";
import NoImage from "../assets/placeholderImg-Small.jpeg";
import { TailSpin } from "react-loader-spinner";
import EmptyCart from "../components/ProductComponents/EmptyCart.jsx";
import toast from "react-hot-toast";
import { useAuth, useBackend } from "../auth/useClient.jsx";
import Modal1 from "../components/common/Styles/Modal1.jsx";
import TabChanges from "../components/Tabchanges.jsx";
import IcpLogo from "../assets/IcpLogo.jsx";
import LoadingScreen from "../components/common/LoadingScreen.jsx";
import { LuTrash } from "react-icons/lu";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ Main checkout Container
/* ----------------------------------------------------------------------------------------------------- */
const CartPage = () => {
  return (
    <>
      {/* <AnimationView>
        <ScrollToTop />
        <Header title={"Cart"} /> */}
      <Cart />
      {/* <Footer></Footer>
      </AnimationView> */}
    </>
  );
};

// Payment methods
const pMethod = [
  {
    name: "ICP",
    value: "icp",
    currency: "icp",
  },
  {
    name: "CKBTC",
    value: "ckbtc",
    currency: "btc",
  },
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
const Cart = () => {
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successClearAll, setSuccessClearAll] = useState(true);
  const [clearCartLoad, setClearCartLoad] = useState(false);
  const [flag, setFlag] = useState(false);
  const [empty, setEmpty] = useState(false);
  const navigate = useNavigate();
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // console.log("finalCart", finalCart);
  const pathsForTabChanges = ["Home", "cart"];

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
  // console.log(finalCart, "final cart");
  const clearAll = async () => {
    try {
      setIsFinalCartLoading(true);
      setClearCartLoad(true);
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
      setClearCartLoad(false);
      setSuccessClearAll(false);

      setIsFinalCartLoading(false);
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
      id: product.orderId,
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
    const shippingAddress = userAddress;
    const totalAmount = totalPrice + shippingAmount;
    const shippingCost = shippingAmount;
    const subTotal = totalPrice;
    const payment = paymentMethod.value;
    orderPlacement(
      products,
      shippingAddress,
      totalAmount,
      subTotal,
      payment,
      shippingCost
    );
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

  // useEffect(() => {
  //   console.log("fc", finalCart);
  // }, [finalCart]);

  useEffect(() => {
    if (cartItems && productList) {
      // console.log("ci", cartItems);
      const cartItemDetails = getCartItemDetails(cartItems, productList);
      // setFinalCartDetails(cartItemDetails);
      // console.log("cid", cartItemDetails);
      setFinalCart(cartItemDetails);
    }
  }, [cartItems, productList]);

  // Set Initial Prices
  /*  useEffect(() => {
    if (cartItemDetails !== undefined) {
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
      const timeoutLoad = setTimeout(() => {
        setIsFinalCartLoading(false);
      }, 3000);
      return () => clearTimeout(timeoutLoad);
    }
  }, [cartItems, productList, backend]); */
  // Set Initial Prices
  useEffect(() => {
    if (finalCart) {
      const { totalPrice, totalQuantity } = finalCart.reduce(
        (totals, cartItem) => {
          totals.totalPrice += cartItem.variantSellPriceBasedOnQty;
          totals.totalQuantity += cartItem.quantity;
          return totals;
        },
        { totalPrice: 0, totalQuantity: 0 }
      );

      setUpdatedPriceNQty({ totalPrice, totalQuantity });

      // Directly set loading to false after data processing
      setIsFinalCartLoading(false);
    }
  }, [finalCart]);

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
        <FinalCartLoader />
      ) : (
        <>
          {finalCart && finalCart.length > 0 ? (
            <div className="flex gap-4 tracking-wider max-md:flex-col">
              <div className="flex flex-col gap-4 flex-1">
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
                    // getCallerCartItems={getCallerCartItems}
                  />
                ))}
              </div>
              <div className="border-2 rounded-2xl max-h-80 lg:min-w-96">
                <BillSection
                  updatedPriceNQty={updatedPriceNQty}
                  proceed={proceed}
                  shippingAmount={shippingAmount}
                  paymentMethod={paymentMethod}
                  // exchange={exchange}
                  // currencyLoad={currencyLoad}
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
    console.log("open");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    console.log("close");
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
/*  @ <Checkout /> : <BillSection />
/* ----------------------------------------------------------------------------------------------------- */
const BillSection = ({
  updatedPriceNQty,
  proceed,
  shippingAmount,
  paymentMethod,
  // exchange,
  // currencyLoad,
}) => {
  const { orderPlacementLoad } = CartApiHandler();
  const navigate = useNavigate();
  // const { backend } = useBackend();
  // const { backend } = useAuth();
  // const [exchange, setExchange] = useState(1);
  // const [currencyLoad, setCurrencyLoad] = useState(true);
  const priceWithShippingAmount = updatedPriceNQty.totalPrice + shippingAmount;

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
            <span>{paymentMethod.name}</span>
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
                  <span>{paymentMethod.name}</span>
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
            <span>{paymentMethod.name}</span>
            {priceWithShippingAmount?.toFixed(4)}
          </span>
        </div>
      </div>
      <div className="p-6 flex w-full">
        <Button
          className="p-2 min-w-full min-h-10 text-white border bg-black rounded-full font-medium text-sm relative"
          onClick={() => navigate("/shipping-address")}
          disabled={orderPlacementLoad}
        >
          {orderPlacementLoad ? (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <TailSpin
                visible={true}
                height="20"
                width="20"
                color="white"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperclassName=""
              />
            </div>
          ) : (
            "Proceed"
          )}
        </Button>
      </div>
    </div>
  );
};

// Loader
const FinalCartLoader = () => {
  return (
    <div className="flex gap-4 tracking-wider max-md:flex-col">
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex items-end justify-end border-2 border-gray-300 mt-2   rounded-xl   p-5 w-[100%]">
          <Button className="bg-black rounded-full text-sm text-white px-3 py-2">
            Clear All
          </Button>
        </div>
        <div className="border-2 rounded-2xl p-6 flex max-lg:flex-col">
          <div className="flex gap-4 flex-1">
            <div className="flex p-1 border border-gray-300 rounded-xl">
              <img
                src={NoImage}
                alt="_blank"
                className="max-w-24 max-h-24 object-contain rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className="border-2 px-2 py-1 text-xs uppercase font-semibold w-3/12 bg-gray-300 h-5 rounded-md animate-pulse"></span>
              <p className="text-lg font-semibold capitalize flex gap-1 w-full">
                <span className="w-4/12 bg-gray-300 h-5 rounded-md animate-pulse"></span>
                <span className="w-6/12 bg-gray-300 h-5 rounded-md animate-pulse"></span>
                <span className="w-2/12 bg-gray-300 h-5 rounded-md animate-pulse"></span>
                <span className="w-5/12 bg-gray-300 h-5 rounded-md animate-pulse"></span>
              </p>
              <span className="flex gap-4">
                <p className="capitalize text-xs flex gap-1 items-center">
                  <span className="w-6 bg-gray-300 h-3 rounded-md animate-pulse"></span>
                  <span className="w-2 bg-gray-300 h-3 rounded-md animate-pulse"></span>
                </p>
                <p className="capitalize text-xs flex gap-1 items-center">
                  <span className="w-6 bg-gray-300 h-3 rounded-md animate-pulse"></span>
                  <span className="w-6 bg-gray-300 h-3 rounded-md animate-pulse"></span>
                </p>
              </span>
            </div>
          </div>
          <div className="flex justify-end flex-col gap-2 items-end">
            <div className="flex gap-4 items-center">
              <p className="font-semibold text-2xl flex items-center gap-1 w-10 bg-gray-300 h-6 rounded-md animate-pulse"></p>
              <p className="line-through text-gray-500 w-6 bg-gray-300 h-4 rounded-md animate-pulse"></p>
            </div>
            <div className="flex gap-4 items-center w-4/12 h-6 bg-gray-300 rounded-md animate-pulse"></div>
          </div>
        </div>
        <div className="border-2 rounded-2xl p-6 flex max-lg:flex-col">
          <div className="flex gap-4 flex-1">
            <div className="flex p-1 border border-gray-300 rounded-xl">
              <img
                src={NoImage}
                alt="_blank"
                className="max-w-24 max-h-24 object-contain rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className="border-2 px-2 py-1 text-xs uppercase font-semibold w-3/12 bg-gray-300 h-5 rounded-md animate-pulse"></span>
              <p className="text-lg font-semibold capitalize flex gap-1 w-full">
                <span className="w-4/12 bg-gray-300 h-5 rounded-md animate-pulse"></span>
                <span className="w-6/12 bg-gray-300 h-5 rounded-md animate-pulse"></span>
                <span className="w-2/12 bg-gray-300 h-5 rounded-md animate-pulse"></span>
                <span className="w-5/12 bg-gray-300 h-5 rounded-md animate-pulse"></span>
              </p>
              <span className="flex gap-4">
                <p className="capitalize text-xs flex gap-1 items-center">
                  <span className="w-6 bg-gray-300 h-3 rounded-md animate-pulse"></span>
                  <span className="w-2 bg-gray-300 h-3 rounded-md animate-pulse"></span>
                </p>
                <p className="capitalize text-xs flex gap-1 items-center">
                  <span className="w-6 bg-gray-300 h-3 rounded-md animate-pulse"></span>
                  <span className="w-6 bg-gray-300 h-3 rounded-md animate-pulse"></span>
                </p>
              </span>
            </div>
          </div>
          <div className="flex justify-end flex-col gap-2 items-end">
            <div className="flex gap-4 items-center">
              <p className="font-semibold text-2xl flex items-center gap-1 w-10 bg-gray-300 h-6 rounded-md animate-pulse"></p>
              <p className="line-through text-gray-500 w-6 bg-gray-300 h-4 rounded-md animate-pulse"></p>
            </div>
            <div className="flex gap-4 items-center w-4/12 h-6 bg-gray-300 rounded-md animate-pulse"></div>
          </div>
        </div>
        <div className="border-2 rounded-2xl p-6 flex max-lg:flex-col">
          <div className="flex gap-4 flex-1">
            <div className="flex p-1 border border-gray-300 rounded-xl">
              <img
                src={NoImage}
                alt="_blank"
                className="max-w-24 max-h-24 object-contain rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className="border-2 px-2 py-1 text-xs uppercase font-semibold w-3/12 bg-gray-300 h-5 rounded-md animate-pulse"></span>
              <p className="text-lg font-semibold capitalize flex gap-1 w-full">
                <span className="w-4/12 bg-gray-300 h-5 rounded-md animate-pulse"></span>
                <span className="w-6/12 bg-gray-300 h-5 rounded-md animate-pulse"></span>
                <span className="w-2/12 bg-gray-300 h-5 rounded-md animate-pulse"></span>
                <span className="w-5/12 bg-gray-300 h-5 rounded-md animate-pulse"></span>
              </p>
              <span className="flex gap-4">
                <p className="capitalize text-xs flex gap-1 items-center">
                  <span className="w-6 bg-gray-300 h-3 rounded-md animate-pulse"></span>
                  <span className="w-2 bg-gray-300 h-3 rounded-md animate-pulse"></span>
                </p>
                <p className="capitalize text-xs flex gap-1 items-center">
                  <span className="w-6 bg-gray-300 h-3 rounded-md animate-pulse"></span>
                  <span className="w-6 bg-gray-300 h-3 rounded-md animate-pulse"></span>
                </p>
              </span>
            </div>
          </div>
          <div className="flex justify-end flex-col gap-2 items-end">
            <div className="flex gap-4 items-center">
              <p className="font-semibold text-2xl flex items-center gap-1 w-10 bg-gray-300 h-6 rounded-md animate-pulse"></p>
              <p className="line-through text-gray-500 w-6 bg-gray-300 h-4 rounded-md animate-pulse"></p>
            </div>
            <div className="flex gap-4 items-center w-4/12 h-6 bg-gray-300 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="border-2 rounded-2xl max-h-96">
        <div className="flex flex-col">
          <div className="border-b-2 py-6">
            <span className="uppercase font-semibold px-6 text-xl text-slate-500">
              Price details
            </span>
          </div>
          <div className="border-b-2 py-2 flex flex-col gap-4 border-dashed">
            <div className="flex justify-between px-6 gap-2 font-medium">
              <p className="bg-gray-300 h-6 w-28 animate-pulse rounded-md"></p>
              <span className="bg-gray-300 h-6 w-12 animate-pulse rounded-md"></span>
            </div>
            <div className="flex justify-between px-6 gap-2 font-medium">
              <p className="bg-gray-300 h-6 w-36 animate-pulse rounded-md"></p>
              <span className="flex gap-2">
                <p className="bg-gray-300 h-6 w-12 animate-pulse rounded-md"></p>
              </span>
            </div>
          </div>
          <div className="border-b-2 py-4 flex flex-col gap-4 border-dashed">
            <div className="flex justify-between px-6 gap-2 font-bold">
              <p className="bg-gray-300 h-6 w-28 animate-pulse rounded-md"></p>
              <span className="bg-gray-300 h-6 w-12 animate-pulse rounded-md"></span>
            </div>
          </div>
          <div className="border-b-2 py-4 flex flex-col gap-4 border-dashed">
            <div className="px-6 flex items-center justify-center">
              <div className="bg-gray-300 h-6 w-8/12 animate-pulse rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
