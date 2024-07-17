import { createContext, useState } from "react";

const ModalContext = createContext({});

export const ModalProvider = ({ children }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [response, setResponse] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [btnName, setBtnName] = useState("Okay");

    const resetModal = () => {
        setTitle("");
        setDesc("");
        setOpenModal(false);
        setResponse(false);
        setBtnName("Okay");
    };

    const showModal = ({ modalTitle, modalDesc, btnName }) => {
        setTitle(modalTitle);
        setDesc(modalDesc);
        setOpenModal(true);
        setBtnName(btnName);
    };

    return (
        <ModalContext.Provider
            value={{
                title,
                setTitle,
                desc,
                setDesc,
                response,
                setResponse,
                openModal,
                setOpenModal,
                resetModal,
                showModal,
                btnName,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export default ModalContext;
