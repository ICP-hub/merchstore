import React, { useEffect, useState } from "react";
import { HiOutlineXMark, HiTrash } from "react-icons/hi2";
import { motion } from "framer-motion";
import { TailSpin } from "react-loader-spinner";

const Modal1 = ({
  title,
  icon,
  btnClr,
  action,
  actName,
  closeModal,
  isLoading,
  addOn,
}) => {
  const closeModalWithAnimation = () => {
    closeModal();
  };

  return (
    <div
      className={`fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]`}
    >
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl px-5 py-8 relative">
        <div className="text-center">
          <div className="bg-gray-200 w-20 h-20 rounded-full p-5 mx-auto">
            {icon}
          </div>
          <h4 className="text-xl text-[#333] font-semibold mt-4">{title}</h4>
        </div>
        <div className="text-right space-x-4"></div>
        <div className="flex space-x-4 mt-8">
          <button
            type="button"
            className="px-6 py-2.5 rounded-full w-full text-[#333] text-sm font-semibold border-none outline-none bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
            onClick={closeModalWithAnimation}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`px-6 py-2.5 rounded-full w-full text-white text-sm font-semibold border-none outline-none bg-${btnClr}-600 active:bg-${btnClr}-600 relative`}
            onClick={() => action()}
          >
            {isLoading ? (
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
              actName
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal1;
