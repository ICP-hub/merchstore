import React from "react";
import error from "../assets/error2.svg";
import { Link } from "react-router-dom";

//Error page component

const Error404Page = () => {
  return (
    <div className="w-screen h-screen relative bg-gray-200 relative overflow-hidden">
      <div className="sm:flex w-full  md:flex-col sm:flex-row md:mt-24 xl:mt-0">
        <div className="w-full md:w-1/2   absolute md:right  xl:mt-16 flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center  ">
          <p className="text-7xl md:text-6xl lg:text-9xl font-bold tracking-wider text-gray-900">
            Oops!
          </p>
          <p className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-900 mt-2">
            Page Not Found
          </p>
          <p className="text-lg md:text-xl lg:text-xl text-gray-900/50 my-12">
            Sorry, the page you are looking for could not be found.
          </p>
          <button className="flex items-center space-x-2 bg-gray-900   tracking-wider text-white px-6 py-3 text-lg rounded-full uppercase transition duration-150">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>

            <span>Return Home</span>
          </button>
        </div>
        <img
          src={error}
          alt=""
          className="sm:w-[50%] md:ml-24 absolute bottom-0 md:right-2 xl:left-[40%]   "
        />
      </div>
    </div>
  );
};

export default Error404Page;
