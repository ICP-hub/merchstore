import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { isBrowser } from "react-device-detect";
import TopBar from "../../components/admin/common/TopBar";
import LeftSidebar from "../../components/admin/common/LeftSidebar";
import FullScreenInfinityLoader from "./FullScreenInfinityLoader";
import { Principal } from "@dfinity/principal";
import { useAuth, useBackend } from "../../auth/useClient";

function ProtectedAdmin({ children }) {
  // const { backend } = useBackend();
  const { principal, isConnected, backend } = useAuth();
  const [loading, setLoading] = useState(true);
  const [sidebar, setSidebar] = useState(isBrowser ? true : false);
  const [isAdmin, setIsAdmin] = useState(false); // Add isAdmin state
  const navigate = useNavigate();
  const [isAdminChecked, setIsAdminChecked] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Replace the setTimeout with your actual connection check logic
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulating a 3-second delay
        setLoading(false);
      } catch (error) {
        console.error("Error checking connection:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    checkConnection();
  }, []);

  useEffect(() => {
    const checkIsAdmin = async () => {
      try {
        if (isConnected) {
          console.log(principal.toText(), "principal");
          const res = await backend.isAdmin(principal);
          setIsAdmin(res);
          setIsAdminChecked(true);
        }
      } catch (error) {
        console.error("Error checking isAdmin:", error);
        setIsAdmin(false); // Set isAdmin to false in case of an error
        setIsAdminChecked(false);
      }
    };

    checkIsAdmin();
  }, [isConnected, backend, principal, navigate]);

  if (loading || !isAdminChecked) {
    // You can replace this with your loading indicator component
    return <FullScreenInfinityLoader />;
  }

  console.log(isAdmin);

  if (!isConnected) {
    return <Navigate to="/login" replace={true} />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="flex lg:grid lg:grid-cols-5 justify-start gap-3 p-3 bg-[#F5EEF8] h-screen relative">
      <LeftSidebar sidebar={sidebar} setSidebar={setSidebar} />
      <div
        className={
          sidebar
            ? ` h-full lg:col-span-4  hidden md:block`
            : `h-full w-full lg:col-span-5`
        }
      >
        <div className="flex flex-col gap-3">
          <TopBar sidebar={sidebar} setSidebar={setSidebar} />
          {children}
        </div>
      </div>
    </div>
  );
}

export default ProtectedAdmin;
