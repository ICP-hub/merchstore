import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../auth/useClient";

// Custom hook : initialize the backend Canister

const UserAddressApiHandler = () => {
  // Init backend
  // const { backend } = useBackend();
  const { backend } = useAuth();
  const { principal } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [userAddressList, setUserAddressList] = useState(null);
  // {firstname:text; country:text; city:text; email:text; state:text; address_type:text; phone_number:text; pincode:text; lastname:text; addressline1:text; addressline2:text}
  // Create Address
  const createAddress = async (address, setSuccessfulSubmit) => {
    // console.log(address);
    try {
      setIsLoading(true);
      const response = await backend.createAddress({
        ...address,
        address_type: "default",
      });
      console.log("Create Address Response ", response);
      toast.success("Address created successfully");
      setSuccessfulSubmit(true);
    } catch (err) {
      toast.error("Failed to create address");
      console.error("Error creating address : ", err);
    } finally {
      setIsLoading(false);
      setSuccessfulSubmit(false);
    }
  };

  // Get Address List
  const getAddressList = async () => {
    try {
      setIsLoading(true);
      const response = await backend.listUserAddresses();
      console.log("getAddressList response", response);
      setUserAddressList(response);
    } catch (err) {
      console.error("Error fetching address list", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update Address
  const updateAddress = async (address, setSuccessfulSubmit) => {
    if (!principal) {
      toast.error("You need to login first");
      return;
    }
    try {
      setIsLoading(true);
      // Getting this error > Error updating address :  Error: Wrong number of message arguments
      // await backend.updateAddress({ ...address, address_type: "default" });
      const response = await backend.updateAddress(
        { ...address, address_type: "default" },
        address.id,
        principal
      );
      console.log("updateAddressResponse ", response);
      if (response.ok) {
        toast.success("Address updated successfully");
        setSuccessfulSubmit(true);
      } else {
        toast.error(Object.keys(response.err));
        return;
      }
    } catch (err) {
      toast.error("Failed to update address");
      console.error("Error updating address : ", err);
    } finally {
      setIsLoading(false);
      setSuccessfulSubmit(false);
    }
  };

  // Returns
  return {
    createAddress,
    getAddressList,
    updateAddress,
    isLoading,
    userAddressList,
  };
};

export default UserAddressApiHandler;
