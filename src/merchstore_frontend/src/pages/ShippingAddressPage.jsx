import React, { useEffect } from "react";
import { useState } from "react";
import Header from "../components/common/Header.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import AnimationView from "../components/common/AnimationView.jsx";
import Footer from "../components/common/Footer.jsx";
import { FaArrowRight } from "react-icons/fa";
import Button from "../components/common/Button.jsx";
import AddressForm from "../components/ContactPageComponents/AddressForm.jsx";
import UserAddressApiHandler from "../apiHandlers/UserAddressApiHandler.jsx";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import CartApiHandler from "../apiHandlers/CartApiHandler.jsx";
import ProductApiHandler from "../apiHandlers/ProductApi.jsx";
import {
  getCartItemDetails,
  totalCartSellPrice,
} from "../apiHandlers/cartUtils.js";
import EmptyCart from "../components/ProductComponents/EmptyCart.jsx";

import LoadingScreen from "../components/common/LoadingScreen.jsx";
import TabChanges from "../components/Tabchanges.jsx";
import IcpLogo from "../assets/IcpLogo.jsx";
import { useAuth } from "../auth/useClient.jsx";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Base Components.
/* ----------------------------------------------------------------------------------------------------- */
const ShippingAddressPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Header title={"ADDRESS"} />
      <AddressDetail />
      <Footer></Footer>
    </AnimationView>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <AddressDetail />.
/* ----------------------------------------------------------------------------------------------------- */
const AddressDetail = () => {
  const { getAddressList, userAddressList } = UserAddressApiHandler();
  const { getCallerCartItems, cartItems, getShippingAmount, shippingAmount } =
    CartApiHandler();
  const { productList, getProductList } = ProductApiHandler(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);
  const [finalIsLoading, setFinalIsLoading] = useState(true);
  // const {backend} = useBackend();
  const { backend } = useAuth();
  const { ShippingAddressPageLoader } = LoadingScreen();

  // Get cart item details
  const cartItemDetails = getCartItemDetails(cartItems, productList);
  console.log(cartItemDetails, "cart items details");
  // console.log("Cart Item Details", cartItemDetails);
  const totalPrice = totalCartSellPrice(cartItemDetails);
  // console.log(cartItemDetails);
  const pathsForTabChanges = ["Home", "cart", "shipping-address"];

  // Fetch data parallelly when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        getAddressList(),
        getProductList(),
        getCallerCartItems(),
        getShippingAmount(),
      ]);
      // Hide the form on successful submit
      if (successfulSubmit) {
        setShowForm(false);
      }
    };
    fetchData();

    // Set time out for data load complete from backend
    const timeoutLoad = setTimeout(() => {
      setFinalIsLoading(false);
    }, 3000);
    return () => clearTimeout(timeoutLoad);
  }, [successfulSubmit, backend]);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };
  // console.log(selectedAddress);
  const addressDetails = userAddressList?.map((Address) => {
    // console.log(Address); //Op : [Array(3)] [{…}]
    return Address;
  });
  // Calculate total discount
  const totalDiscount = cartItemDetails?.reduce((sum, item) => {
    const discount =
      item.variantPriceBasedOnQty - item.variantSellPriceBasedOnQty;
    return sum + discount;
  }, 0);

  const handleCancel = (e) => {
    // ShowForm false if click cancel
    e.preventDefault(); // prevent warning : because formevent is running after opening form
    setShowForm(false);
  };

  return (
    <div className="container mx-auto p-6 max-md:px-2">
      <TabChanges paths={pathsForTabChanges} />
      {finalIsLoading ? (
        <ShippingAddressPageLoader />
      ) : (
        <div className="flex w-full max-md:flex-col gap-4">
          <div className="flex-1 flex flex-col gap-4">
            <div className="uppercase text-sm font-bold bg-black text-white p-6 rounded-xl">
              Delivery address
            </div>
            {cartItemDetails?.length === 0 ? (
              <EmptyCart />
            ) : (
              addressDetails
                ?.flat()
                .map((address, index) => (
                  <AddressCard
                    key={index}
                    address={address}
                    onSelect={() => handleAddressSelect(address)}
                    isSelected={address === selectedAddress}
                  />
                ))
            )}
            <NewAddressSection
              showForm={showForm}
              setShowForm={setShowForm}
              handleCancel={handleCancel}
              setSuccessfulSubmit={setSuccessfulSubmit}
            />
          </div>
          <div className="border-2 rounded-2xl max-h-96">
            {cartItemDetails?.length === 0 ? null : (
              <BillSection
                totalItem={cartItemDetails?.length}
                totalPrice={totalPrice}
                totalDiscount={totalDiscount}
                selectedAddress={selectedAddress}
                shippingAmount={shippingAmount}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <AddressCard />.
/* ----------------------------------------------------------------------------------------------------- */
export const AddressCard = ({ address, onSelect, isSelected }) => {
  const {
    firstname,
    lastname,
    phone_number,
    pincode,
    state,
    city,
    country,
    addressline1,
    addressline2,
    address_type,
  } = address;

  return (
    <div
      className={`md:flex border border-gray-300 rounded-xl p-2 w-full ${
        isSelected ? "bg-gray-200" : ""
      }`}
    >
      <div className="flex flex-col p-2">
        <div className="flex gap-2 items-center w-full">
          <span className="h-5 w-5">
            <input
              type="radio"
              className="h-4 w-4"
              checked={isSelected}
              onChange={onSelect}
            />
          </span>
          <div className="flex-1 flex sm:items-center gap-2 max-sm:flex-col">
            <p className="font-bold capitalize min-w-max">
              {firstname} {lastname}
            </p>
            <span className="px-2 py-1 rounded-md bg-gray-300 text-gray-500 uppercase text-xs flex items-center max-w-max font-semibold">
              {address_type}
            </span>
            <p className="font-semibold">{phone_number}</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <span className="h-5 w-5"></span>
          <div className="flex-1">
            <p className="capitalize">
              {addressline1},{addressline2}
            </p>
            <p className="font-semibold">
              {pincode},{state},{country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <NewAddressSection />
/* ----------------------------------------------------------------------------------------------------- */
const NewAddressSection = ({
  showForm,
  setShowForm,
  handleCancel,
  setSuccessfulSubmit,
}) => {
  return (
    <div className="border-2 rounded-xl">
      {!showForm ? (
        <Button
          className="font-semibold px-8 py-4"
          onClick={() => setShowForm(true)}
        >
          + New Address
        </Button>
      ) : (
        <p className="font-semibold px-8 py-4">
          Please fill the form to create a new address
        </p>
      )}
      {/* Form */}
      {showForm ? (
        <AddressForm
          onCancel={handleCancel}
          setSuccessfulSubmit={setSuccessfulSubmit}
          isNew={true}
        />
      ) : null}
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <BillSection />
/* ----------------------------------------------------------------------------------------------------- */
const BillSection = ({
  totalItem,
  totalPrice,
  totalDiscount,
  selectedAddress,
  shippingAmount,
}) => {
  const priceWithShippingAmount = totalPrice + shippingAmount; // Total Price with shipping amount
  // Pass radio button data to checkout page
  const handleCheckOut = () => {
    // If selected address null then return
    if (selectedAddress === null) {
      toast.error("Please Select an address to continue");
      return;
    }
    // Store Selected Address in localStorage;
    localStorage.setItem("CurrAddress", JSON.stringify(selectedAddress));
    // Navigate to Chekout and keep data as state;
    // navigate("/checkout", { state: selectedAddress });
  };

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
              ({totalItem} {totalItem > 1 ? "items" : "item"})
            </span>
          </p>
          <span className="font-bold flex items-center gap-1">
            <IcpLogo />
            {totalPrice?.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between px-6 gap-2 font-medium">
          <p className="capitalize text-slate-500">Delivery charges</p>
          <span className="flex gap-2">
            <p className="text-green-700 font-bold">
              {shippingAmount === 0 ? (
                "Free"
              ) : (
                <span className="flex items-center gap-1">
                  <IcpLogo />
                  {shippingAmount?.toFixed(2)}
                </span>
              )}
            </p>
          </span>
        </div>
      </div>
      <div className="border-b-2 py-4 flex flex-col gap-4 border-dashed">
        <div className="flex justify-between px-6 gap-2 font-bold">
          <p className="capitalize">Total Payable</p>
          <span className="flex items-center gap-1">
            <IcpLogo />
            {priceWithShippingAmount?.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="border-b-2 py-4 flex flex-col gap-4 border-dashed">
        <div className="px-6 text-green-700 flex gap-2">
          Your total saving on this order is{" "}
          <span className="flex items-center gap-1">
            <IcpLogo size={16} />
            {totalDiscount?.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="p-6">
        {selectedAddress !== null && (
          <Link
            to="/checkout"
            className="bg-black text-white m-auto py-2 px-4 rounded-full flex items-center justify-center text-xs md:text-sm w-full"
            onClick={handleCheckOut}
          >
            Continue
            <span className="ml-2">
              <FaArrowRight />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ShippingAddressPage;
