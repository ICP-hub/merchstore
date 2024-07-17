/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports 
/* ----------------------------------------------------------------------------------------------------- */
import React, { useEffect, useState } from "react";
import AnimationView from "../components/common/AnimationView";
import ScrollToTop from "../components/common/ScrollToTop";
import Header from "../components/common/Header";
import { Tabs } from "../components/MyProfilePageComponents/MyProTabs";
import Footer from "../components/common/Footer";
import Button from "../components/common/Button";
import AddressForm from "../components/ContactPageComponents/AddressForm";
import UserAddressApiHandler from "../apiHandlers/UserAddressApiHandler";
import { useAuth, useBackend } from "../auth/useClient";
import LoadingScreen from "../components/common/LoadingScreen";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Base 
/* ----------------------------------------------------------------------------------------------------- */
const MyAddressPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Header title={"Address"}></Header>
      <MyAddressContainerMain />
      <Footer></Footer>
    </AnimationView>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ MyAddress Page : <MyAddressContainerMain /> 
/* ----------------------------------------------------------------------------------------------------- */
const MyAddressContainerMain = () => {
  return (
    <div className="container mx-auto py-6 tracking-wider">
      <div className="flex max-md:flex-col p-6 gap-6">
        <Tabs />
        <MyAddress />
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ MyAddress Page : <MyAddressContainerMain /> : <MyAddress Component />.
/* ----------------------------------------------------------------------------------------------------- */
const MyAddress = () => {
  const [editMode, setEditMode] = useState(false);
  const [newAddress, setNewAddress] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const { getAddressList, userAddressList, isLoading } =
    UserAddressApiHandler();
  const { MyAddressLoadingScreen } = LoadingScreen();
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);
  const [finalIsLoadig, setFinalIsLoading] = useState(true);
  // const { backend } = useBackend();
  const { backend } = useAuth();

  const addressDetails = userAddressList?.map((Address) => {
    // console.log(Address); //Op : [Array(3)] [{…}]
    // Extract required props
    return Address;
  });

  const handleEditMode = () => {
    setEditMode(true);
  };

  const handleNewAddress = () => {
    setNewAddress(true);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEditMode(false);
    setNewAddress(false);
  };

  // Effect getAddressList : re-render on successful submit
  useEffect(() => {
    getAddressList();
    // Loading : gather all backend data
    const timeoutLoad = setTimeout(() => {
      setFinalIsLoading(false);
    }, 3000);
    return () => clearTimeout(timeoutLoad);
  }, [successfulSubmit, backend]);

  // console.log(userAddressList);

  // Swich to saved form after form
  useEffect(() => {
    if (!isLoading) {
      setEditMode(false);
      setNewAddress(false);
    }
  }, [isLoading, backend]);

  return (
    <div className="w-full rounded-2xl border border-gray-300">
      <div className="flex justify-between px-2 sm:px-8 py-4 font-medium ">
        <h1 className="text-lg">My Address</h1>
        {/* Hide button if form is open */}
        {!newAddress && !editMode ? (
          <Button onClick={handleNewAddress} className="text-sm">
            + Add a new Address
          </Button>
        ) : null}
      </div>
      {newAddress || editMode ? (
        <AddressForm
          onCancel={handleCancel}
          isNew={newAddress}
          setSuccessfulSubmit={setSuccessfulSubmit}
          initialFormValues={
            editMode && addressDetails
              ? addressDetails?.flat()[selectedAddressIndex]
              : {}
          }
        />
      ) : finalIsLoadig ? (
        <MyAddressLoadingScreen />
      ) : addressDetails?.length === 0 ? (
        <div className="px-2 sm:px-8 py-4 font-medium">
          You haven't saved an address yet
        </div>
      ) : (
        addressDetails?.flat().map((address, index) => (
          <MyAddressSaved
            key={index}
            onEditMode={() => {
              handleEditMode();
              setSelectedAddressIndex(index);
            }}
            userAddress={address}
          />
        ))
      )}
    </div>
  );
};
/* ----------------------------------------------------------------------------------------------------- */
/*  @ MyAddress Page : <MyAddressContainerMain /> : <MyAddressSaved Component />.
/* ----------------------------------------------------------------------------------------------------- */
const MyAddressSaved = ({ onEditMode, userAddress }) => {
  const {
    firstname,
    lastname,
    addressline1,
    addressline2,
    pincode,
    state,
    country,
    phone_number,
  } = userAddress;

  const addressFields = [
    addressline1,
    addressline2,
    pincode,
    state,
    country,
    phone_number,
  ];

  return (
    <div className="border-t px-2 sm:px-8 py-4 flex max-lg:flex-col max-lg:gap-3">
      <div className="gap-3 flex-1">
        {/* Display user's first name and last name */}
        <div className="flex gap-3">
          <div className="capitalize text-lg font-medium">
            {firstname} {lastname}
          </div>
        </div>

        {/* address details */}
        {addressFields?.map((value, index) => (
          <div key={index} className="flex gap-3 text-sm font-medium">
            <div>{value}</div>
          </div>
        ))}
      </div>
      <div className="">
        <Button
          className="py-2 px-4 bg-gray-900 text-white font-medium text-sm lg:rounded-full max-lg:rounded-md"
          onClick={onEditMode}
        >
          Edit Address
        </Button>
      </div>
    </div>
  );
};

export default MyAddressPage;
