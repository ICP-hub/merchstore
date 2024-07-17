import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import IcpLogo from "../../assets/IcpLogo";
import toast from "react-hot-toast";

const Total = ({ totalPrice, flag }) => {
  const navigate = useNavigate();
  return (
    <div
      className=" flex flex-col items-start justify-start
       border-2 border-gray-300 max:m-10 w-[100%] md:mt-2  mt-8  rounded-xl  p-2 py-2  md:w-[25%]   max:h-48 "
    >
      <p className="text-xl font-bold p-2">Summary order</p>
      <div className="flex justify-between w-full">
        <p className="p-2 text-gray-400 ">Subtotal:</p>
        <span className=" p-2 font-bold text-black flex items-center gap-1 ">
          {" "}
          <IcpLogo size={20} />
          {totalPrice}
        </span>
      </div>

      <Button
        className="bg-black text-white  m-auto  py-2 px-4 rounded-full   text-xs  md:text-sm w-full md:w-36 xl:w-72"
        onClick={() => {
          if (!flag) {
            navigate("/shipping-address");
          } else {
            toast.error("you need to update the cart before proceed");
          }
        }}
      >
        Place order
      </Button>
    </div>
  );
};

export default Total;
