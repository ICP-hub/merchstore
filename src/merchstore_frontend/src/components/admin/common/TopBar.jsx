 import { useAuth } from "../../../auth/useClient";
import React from "react";
import toast from "react-hot-toast"
import { CiGrid41, CiLogout } from "react-icons/ci";

const TopBar = ({ sidebar, setSidebar }) => {
    const { disconnect } = useAuth()
    

    return (
        <div className="w-full bg-white  sticky top-0 z-40 rounded-2xl p-2">
            <div className="flex justify-between items-center">
                <div>
                    <button
                        className="bg-[#512E5F]/20  hover:bg-[#512E5F]/40  text-[#512E5F] rounded-xl p-2 flex justify-center items-center"
                        onClick={() => setSidebar(!sidebar)}
                    >
                        <CiGrid41 className="w-8 h-8" />
                    </button>
                </div>
                <div>
                <button 
                    className="bg-[#512E5F]/20  hover:bg-[#512E5F]/40  text-[#512E5F] rounded-xl p-2 flex justify-center items-center"
                    onClick={() => {
                        disconnect()
                        toast.success("Logout successfully.")
                      }}
                >
                  <CiLogout className="w-8 h-8" />
                </button>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
