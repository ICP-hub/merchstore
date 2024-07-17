/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import React, { useEffect, useState } from "react";
import {
  HiListBullet,
  HiMapPin,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineShoppingCart,
  HiOutlineUser,
} from "react-icons/hi2";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import Modal1 from "../common/Styles/Modal1";
import { RiLogoutCircleLine } from "react-icons/ri";
// import { useConnect } from "@connect2ic/react";
import toast from "react-hot-toast";
import { useAuth } from "../../auth/useClient";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ MyProfilePageContainerMain : MyProTabs > tabComponents are the arr of tabs
/* ----------------------------------------------------------------------------------------------------- */
// const MyProTabs = ({ tabComponents }) => {
//   const [activeTab, setActiveTab] = useState(0);

//   const handleTabClick = (index) => {
//     setActiveTab(index);
//   };

//   return (
//     <motion.div className="flex max-md:flex-col p-6 gap-6">
//       <Tabs activeTab={activeTab} onTabClick={handleTabClick} />
//       <motion.div
//         key={activeTab}
//         initial={{ opacity: 0, y: -100 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 100 }}
//         transition={{ duration: 0.3, ease: "easeInOut" }}
//         className="w-full"
//       >
//         {tabComponents[activeTab]}
//       </motion.div>
//     </motion.div>
//   );
// };

/* Tabs Component : My Pro Tabs */

const Tabs = () => {
  const location = useLocation();
  // const { disconnect } = useConnect();
  const { disconnect } = useAuth();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disconnectLoad, setDisconnectLoad] = useState(false);
  const [successDisconnect, setSuccessDisconnect] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Disconnect function
  const disconnectAction = () => {
    try {
      setDisconnectLoad(true);
      disconnect();
      toast.success("Logout successfully");
    } catch (err) {
      console.error("Error during logout", err);
    } finally {
      setDisconnectLoad(false);
      setSuccessDisconnect(false);
    }
  };

  // Effect: navigate to homepage after disconnect;
  useEffect(() => {
    if (!successDisconnect) {
      navigate("/");
    }
  }, [successDisconnect]);

  const tabs = [
    {
      name: "Profile",
      icon: <HiOutlineUser size={24} />,
      route: "my-profile",
    },
    { name: "Orders", icon: <HiListBullet size={24} />, route: "my-order" },
    {
      name: "My Wishlist",
      icon: <HiOutlineShoppingCart size={24} />,
      route: "my-wishlist",
    },
    { name: "Address", icon: <HiMapPin size={24} />, route: "my-address" },
  ];

  return (
    <div className="px-2 bg-gray-900 text-white flex max-md:items-center max-md:justify-center flex-col gap-4 font-medium py-6 max-md:w-full rounded-2xl min-w-64 min-h-80 max-h-96">
      <h1 className="text-lg">Account Information</h1>
      {tabs.map((item, index) => (
        // Switch between tabs
        <Link
          key={index}
          to={`/${item.route}`}
          className={`flex items-center gap-4 w-full p-2 rounded-md ${
            location.pathname.includes(item.route)
              ? "bg-white text-black"
              : "hover:bg-white hover:text-black"
          }`}
        >
          <span className="max-md:ml-[25%]">{item.icon}</span>
          <span>{item.name}</span>
        </Link>
      ))}
      <Button
        className="flex items-center gap-4 w-full p-2 rounded-md hover:bg-white hover:text-black"
        onClick={openModal}
      >
        <HiOutlineArrowLeftOnRectangle size={24} />
        Disconnect
      </Button>
      {isModalOpen && (
        <Modal1
          closeModal={closeModal}
          title={"Are you sure you want to disconnect ?"}
          icon={<RiLogoutCircleLine size={40} color="gray" />}
          btnClr="gray"
          actName="Disconnect"
          action={disconnectAction}
          isLoading={disconnectLoad}
          addOn={successDisconnect}
        />
      )}
    </div>
  );
};

export { Tabs };
