import React from "react";
import Button from "./Button";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
} from "react-icons/bs";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ Component Footer.
/* ----------------------------------------------------------------------------------------------------- */
const Footer = () => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], [-800, 0]);
  return (
    <div className="relative pt-[50px]  !z-0">
      {/* <motion.div
        style={{ x: x }}
        className="overflow-hidden text-[80px] md:text-[200px] font-black tracking-widest text-gray-50 absolute top-[15px] md:-top-[15px] flex justify-center w-full"
      >
        FOOTER
      </motion.div> */}
      <div className="px-6 bg-gray-50">
        <div className="tracking-wider py-6 border-b border-slate-200">
          <div className="container mx-auto max-md:p-2 flex justify-between max-md:flex-col py-4">
            <div className="flex md:gap-8 max-md:flex-col max-md:gap-2">
              <div className="flex flex-col gap-4 max-md:gap-2">
                <p className="font-semibold">About</p>
                <span className="text-slate-600 flex flex-col items-start gap-1">
                  <Link to="/about">About Us</Link>
                  <Link to="/contact">Contact Us</Link>
                </span>
              </div>
              <div className="flex flex-col gap-4 max-md:gap-2">
                <p className="font-semibold">Support</p>
                <span className="text-slate-600 flex flex-col items-start gap-1">
                  <Link to="/shipping-policy">Shipping</Link>
                  <Link to="/return-policy">Return</Link>
                  <Link to="/faq">FAQ</Link>
                </span>
              </div>
            </div>
            <div className="flex mt-auto flex-col gap-2">
              <p className="font-semibold text-slate-600">Social Media</p>
              <div className="flex gap-2">
                <Link className="p-3 rounded-full bg-black">
                  <BsTwitterX size={20} color="white" />
                </Link>
                <Link className="p-3 rounded-full bg-black">
                  <BsFacebook size={20} color="white" />
                </Link>
                <Link className="p-3 rounded-full bg-black">
                  <BsLinkedin size={20} color="white" />
                </Link>
                <Link className="p-3 rounded-full bg-black">
                  <BsInstagram size={20} color="white" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto text-slate-600 py-4 max-md:px-2 text-xs font-semibold">
          <div className="flex justify-between max-md:flex-col">
            <p>
              Copyright &copy; {new Date().getFullYear()} MerchStore. All rights
              reserved
            </p>
            <span className="flex gap-4">
              <Link to="/term-of-service">Terms and Service</Link>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
