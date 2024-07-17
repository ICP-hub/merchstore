import React from "react";
import placeholderImg from "../../assets/placeholderImg-Small.jpeg";

const CartItemsSmallLoader = () => {
  return (
    <div className="rounded-xl flex justify-between items-center gap-2">
      <div className="flex justify-start items-start gap-2">
        <img
          src={placeholderImg}
          alt={"product image"}
          className="w-[80px] bg-gray-100 rounded-xl animated-pulse"
        />
        <div className="flex flex-col">
          <h4 className="w-[75px] h-[20px] rounded-full bg-gray-100 animated-pulse mb-1"></h4>
          <h4 className="w-[150px] h-[25px] rounded-full bg-gray-100 animated-pulse mb-2"></h4>
          <div className="flex gap-2">
            <h4 className="w-[60px] h-[15px] rounded-full bg-gray-100 animated-pulse"></h4>
            <h4 className="w-[60px] h-[15px] rounded-full bg-gray-100 animated-pulse"></h4>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end h-full">
        <div className="flex flex-col justify-end items-end gap-1">
          <h4 className="w-[40px] h-[20px] rounded-full bg-gray-100 animated-pulse"></h4>
          <h4 className="w-[60px] h-[20px] rounded-full bg-gray-100 animated-pulse"></h4>
        </div>

        <div className="w-5 h-5 rounded-full bg-gray-100 animate-pulse"></div>
      </div>
    </div>
  );
};

export default CartItemsSmallLoader;
