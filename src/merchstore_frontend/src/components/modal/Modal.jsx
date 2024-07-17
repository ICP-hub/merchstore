import React from "react";
import useModal from "./useModal";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
//import api from '../api/api'

const Modal = () => {
    const { title, desc, resetModal, btnName } = useModal();
   /*  const logout = async() => {
        const response = await api.post('/logout', {})
        console.log(response);
    } */
    const dropIn = {
        hidden: {
            y: "-100vh",
            opacity: 0,
        },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 0.2,
                type: "spring",
                damping: 25,
                stiffness: 500,
            },
        },
        exit: {
            y: "100vh",
            opacity: 0,
        },
    };
    /* const navigator = useNavigate();
    const closeModal = async(response) => {
        if (response) {
            resetModal();
            await logout();
            navigator("/login");
        }else {
            resetModal();
        }
    }; */
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={resetModal}
            className="absolute top-0 left-0 flex justify-center items-center z-50 w-full h-full bg-[#000000e1] max-w-[100vw] overflow-hidden"
        >
            <motion.div
                variants={dropIn}
                initial='hidden'
                animate="visible"
                transition={{ duration: 0.5 }}
                exit='exit'
                onClick={(e) => e.stopPropagation()}
                className="p-4 md:p-6 rounded-xl bg-white  "
            >
                <h2 className="text-lg">{title}</h2>
                <p className="max-w-sm my-2">{desc}</p>
                <button
                    onClick={() => closeModal(true)}
                    className="py-2 px-3 bg-red-400 mr-4 rounded-lg"
                >
                    {btnName}
                </button>
                <button
                    onClick={() => closeModal(false)}
                    className="py-2 px-3 bg-blue-400 mr-4 rounded-lg"
                >
                    Cancel
                </button>
            </motion.div>
        </motion.div>
    );
};

export default Modal;
