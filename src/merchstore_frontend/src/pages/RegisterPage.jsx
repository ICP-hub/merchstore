import React from "react";
import Header from "../components/common/Header.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import AnimationView from "../components/common/AnimationView.jsx";

import "@fortawesome/fontawesome-free/css/all.css";

import Footer from "../components/common/Footer.jsx";
import ImageToParticle from "react-image-particles";
import IMAGE from "../assets/color.png";

const LoginPage = () => {
  return (
    <>
      {/* <AnimationView>
        <ScrollToTop />
        <Header /> */}
      <div className="relative h-screen w-full">
        <img
          className="w-full md:h-full  h-full   object-cover"
          src="https://img.freepik.com/free-photo/female-hand-typing-keyboard-laptop_1150-15742.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1707004800&semt=ais"
          alt=""
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white     overflow-hidden md:h-[400px]  rounded-lg shadow-lg md:flex sm:flex-row flex flex-col   mt-8">
            {/*we can use overflow-scroll to fix for the screen sizes  */}
            <div className="flex flex-col items-center md:w-[100%] order-last md:order-first">
              <i className="fa-brands fa-stumbleupon md:mt-10 m-2"></i>
              <div className="m-2 flex flex-col items-center justify-center">
                <p className="text-2xl font-bold">Ready To Get Merch?</p>
                <p className="text-xs text-gray-500 mt-2">
                  Are you ready for Merch cart?
                </p>
              </div>

              <input
                type="text"
                placeholder="Your Full name"
                className="border border-gray-400 text-white font-bold py-2 px-4 rounded-full m-2 text-sm sm:w-64 md:w-72 w-64"
              />
              <input
                type="text"
                placeholder="Your Email"
                className="border border-gray-400 text-white font-bold py-2 px-4 rounded-full w-64 sm:w-64 text-sm md:w-72"
              />
              <button
                type="submit"
                className="bg-black text-white py-2 px-4 rounded-full m-4 w-64 sm:w-64 text-sm md:w-72"
              >
                Sign Up Plug Wallet
              </button>

              <p className="text-gray-500  mb-4  text-xs">
                {" "}
                &nbsp; &nbsp; By signing up, you agree to our
                <br />
                <span className="font-bold text-black">
                  {" "}
                  Terms of services
                </span>{" "}
                and <span className="font-bold text-black">Privacy Policy</span>
              </p>
            </div>
            <div
              className="flex flex-col h items-center justify-center bg-black   md:m-1 rounded-lg  w-full shadow-lg order-first  sm:order-last md:order-last
                   "
            >
              <ImageToParticle
                path={IMAGE}
                width={300}
                height={300}
                numParticles={1800}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <Footer></Footer>
      </AnimationView> */}
    </>
  );
};

export default LoginPage;
