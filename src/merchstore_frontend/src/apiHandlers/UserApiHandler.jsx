// import { useBackend } from "../auth/useClient";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../auth/useClient";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Custom hook : initialize the backend Canister

const UserApiHanlder = () => {
  // Init backend
  // const { backend } = useBackend();
  const [isLoading, setIsLoading] = useState("");
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);
  const { backend } = useAuth();
  const navigate = useNavigate();
  // Create Contact
  const createContact = async ({ name, email, contact_number, message }) => {
    // Temporary for contact component
    name = name || "";
    contact_number = contact_number || "";
    message = message || "";
    try {
      setIsLoading(true);
      // console.log(name, email, contact_number, message);
      const res = await backend.createContact({
        name,
        email,
        message,
        contact_number,
      });
      if ("ok" in res) {
        toast.success("Details sent successfully");
        setSuccessfulSubmit(true);
        navigate("/");
      }
    } catch (err) {
      toast.error("Failed to send contact");
      console.error("Error creating contact : ", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Returns
  return { createContact, isLoading, successfulSubmit };
};

export default UserApiHanlder;
