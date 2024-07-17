import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
// import { useConnect } from "@connect2ic/react";
import FullScreenInfinityLoader from "./FullScreenInfinityLoader";
import { useAuth } from "../../auth/useClient";

function Protected({ children }) {
  // const { isConnected } = useConnect()
  const { isConnected } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating an asynchronous check for connection status
    const checkConnection = async () => {
      // Replace the setTimeout with your actual connection check logic
      setTimeout(() => {
        setLoading(false);
      }, 3000); // Simulating a 3-second delay
    };

    checkConnection();
  }, []);

  if (loading) {
    // You can replace this with your loading indicator component
    return <FullScreenInfinityLoader />;
  }

  if (!isConnected) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
}

export default Protected;
