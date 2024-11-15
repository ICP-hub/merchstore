import React, { useEffect, useRef, useState, Fragment } from "react";
import LOGO from "../../assets/logo.svg";
import {
  HiOutlineBars2,
  HiOutlineShoppingCart,
  HiOutlineUser,
} from "react-icons/hi2";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import WAVES from "vanta/dist/vanta.waves.min";
import { Menu, Transition } from "@headlessui/react";
import { useConnect } from "@connect2ic/react";
import toast from "react-hot-toast";
import {
  RiContactsFill,
  RiContactsLine,
  RiDashboardFill,
  RiDashboardLine,
  RiHeart3Fill,
  RiHeart3Line,
  RiHome2Fill,
  RiHome2Line,
  RiLogoutBoxRLine,
  RiNftFill,
  RiNftLine,
  RiShoppingBagFill,
  RiShoppingBagLine,
  RiStickyNote2Fill,
  RiStickyNote2Line,
  RiUser3Fill,
  RiUser3Line,
} from "react-icons/ri";
import { PiUsersFourFill, PiUsersFour } from "react-icons/pi";
import CartItemsSmall from "../cart/CartItemsSmall";
import TrendingProducts from "./TrendingProducts";
import Avatar from "boring-avatars";

const getRandomColor = () => {
  const minDarkness = 20; // Minimum darkness level (0-255)
  const maxDarkness = 100; // Maximum darkness level (0-255)
  const range = maxDarkness - minDarkness + 1;

  const red = Math.floor(Math.random() * range + minDarkness)
    .toString(16)
    .padStart(2, "0");
  const green = Math.floor(Math.random() * range + minDarkness)
    .toString(16)
    .padStart(2, "0");
  const blue = Math.floor(Math.random() * range + minDarkness)
    .toString(16)
    .padStart(2, "0");

  return `#${red}${green}${blue}`;
};

const HeaderMain = ({ title }) => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const location = useLocation(); // Get the current location
  //const isHomePage = location.pathname === "/" // Check if it's the homepage
  const navigate = useNavigate();
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  const { isConnected, disconnect, principal } = useConnect();

  /*   const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }; */

  useEffect(() => {
    let intervalId;

    if (!vantaEffect) {
      // Apply the smooth background transition class initially
      myRef.current.classList.add("smooth-bg");

      setVantaEffect(
        WAVES({
          el: myRef.current,
          color: getRandomColor(), // Set initial color
        })
      );
    }

    const changeColor = () => {
      setVantaEffect((prevEffect) => {
        prevEffect.setOptions({ color: getRandomColor() });
        return prevEffect;
      });
    };

    const startColorChange = () => {
      intervalId = setInterval(changeColor, 10000); // Change color every 10 seconds
    };

    startColorChange();

    return () => {
      clearInterval(intervalId);
    };
  }, [vantaEffect]);
 
  return (
    <div
      ref={myRef}
      className="w-full h-[650px] md:h-[650px] relative z-10 bg-gray-200 bg-cover bg-center bg-no-repeat overflow-hidden "
    >
      <nav className="w-full z-20 bg-transparent fixed top-0">
        <div className="md:container md:mx-auto">
          <div className="w-full bg-white/50 backdrop-blur-sm px-6 py-5 rounded-b-2xl shadow-md border-b-[1px] border-l-[1px] border-r-[1px]">
            <div className="flex justify-between items-center gap-2">
              <div>
                <Link to="/">
                  <img src={LOGO} alt="logo" className="h-12" />
                </Link>
              </div>
              <div className="flex justify-center items-center nav-menu  md:block hidden">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link font-bold tracking-wider text-gray-900"
                      : "nav-link font-semibold tracking-wider text-gray-700"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link font-bold tracking-wider text-gray-900"
                      : "nav-link font-semibold tracking-wider text-gray-700"
                  }
                >
                  Shop
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link font-bold tracking-wider text-gray-900"
                      : "nav-link font-semibold tracking-wider text-gray-700"
                  }
                >
                  About
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link font-bold tracking-wider text-gray-900"
                      : "nav-link font-semibold tracking-wider text-gray-700"
                  }
                >
                  Contact
                </NavLink>
                <div className="animation rounded-xl"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="block md:hidden">
                  <Menu as="div" className="relative inline-block text-left">
                    <div className="mb-0">
                      <Menu.Button
                        className={
                          "border-[1px] border-gray-700 rounded-full w-12 h-12 rounded-full flex justify-center items-center"
                        }
                      >
                        <HiOutlineBars2 className="w-7 h-7 text-gray-700" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-2xl bg-white !backdrop-blur-3xl  shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-2 py-2 flex flex-col gap-2">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/"
                                className={`${
                                  active
                                    ? "bg-gray-100 text-gray"
                                    : "text-gray-900"
                                } group flex w-full items-center rounded-xl px-3 py-2 text-md font-semibold tracking-wider`}
                              >
                                {active ? (
                                  <RiHome2Fill
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <RiHome2Line
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                                Home
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/products"
                                className={`${
                                  active
                                    ? "bg-gray-100 text-gray"
                                    : "text-gray-900"
                                } group flex w-full items-center rounded-xl px-3 py-2 text-md font-semibold tracking-wider`}
                              >
                                {active ? (
                                  <RiShoppingBagFill
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <RiShoppingBagLine
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                                Shop
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/about"
                                className={`${
                                  active
                                    ? "bg-gray-100 text-gray"
                                    : "text-gray-900"
                                } group flex w-full items-center rounded-xl px-3 py-2 text-md font-semibold tracking-wider`}
                              >
                                {active ? (
                                  <PiUsersFourFill
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PiUsersFour
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                                About
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/contact"
                                className={`${
                                  active
                                    ? "bg-gray-100 text-gray"
                                    : "text-gray-900"
                                } group flex w-full items-center rounded-xl px-3 py-2 text-md font-semibold tracking-wider`}
                              >
                                {active ? (
                                  <RiContactsFill
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <RiContactsLine
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                                Contact
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="order-first md:order-last">
                  {isConnected ? (
                    <div>
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div className="mb-0">
                          <Menu.Button
                            className={
                              "border-[1px] border-gray-700 rounded-full w-12 h-12 rounded-full flex justify-center items-center"
                            }
                          >
                            {/* <Avvvatars style={"shape"} value={principal} size={40}  /> */}
                            <Avatar
                              size={40}
                              name={principal}
                              variant="beam"
                              colors={[
                                "#92A1C6",
                                "#146A7C",
                                "#F0AB3D",
                                "#C271B4",
                                "#C20D90",
                              ]}
                            />
                            {/* <HiOutlineUser className="w-7 h-7 text-gray-700" /> */}
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-2xl bg-white !backdrop-blur-3xl  shadow-lg ring-1 ring-black/5 focus:outline-none">
                            {/*  {isConnected ? ( */}
                            <>
                              {/* {isAdmin && ( */}
                              <div className="px-2 py-2 ">
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to="/admin"
                                      className={`${
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-900"
                                      } group flex w-full items-center rounded-xl px-3 py-2 text-md font-semibold tracking-wider`}
                                    >
                                      {active ? (
                                        <RiDashboardFill
                                          className="mr-2 h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <RiDashboardLine
                                          className="mr-2 h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      )}
                                      Dashboard
                                    </Link>
                                  )}
                                </Menu.Item>
                              </div>
                              {/*  )}  */}

                              <div className="px-2 py-2 flex flex-col gap-2">
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to="/my-profile"
                                      className={`${
                                        active
                                          ? "bg-gray-100 text-gray"
                                          : "text-gray-900"
                                      } group flex w-full items-center rounded-xl px-3 py-2 text-md font-semibold tracking-wider`}
                                    >
                                      {active ? (
                                        <RiUser3Fill
                                          className="mr-2 h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <RiUser3Line
                                          className="mr-2 h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      )}
                                      Profile
                                    </Link>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to="/my-order"
                                      className={`${
                                        active
                                          ? "bg-gray-100 text-gray"
                                          : "text-gray-900"
                                      } group flex w-full items-center rounded-xl px-3 py-2 text-md font-semibold tracking-wider`}
                                    >
                                      {active ? (
                                        <RiStickyNote2Fill
                                          className="mr-2 h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <RiStickyNote2Line
                                          className="mr-2 h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      )}
                                      Orders
                                    </Link>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to="/my-address"
                                      className={`${
                                        active
                                          ? "bg-gray-100 text-gray"
                                          : "text-gray-900"
                                      } group flex w-full items-center rounded-xl px-3 py-2 text-md font-semibold tracking-wider`}
                                    >
                                      {active ? (
                                        <RiNftFill
                                          className="mr-2 h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <RiNftLine
                                          className="mr-2 h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      )}
                                      My Address
                                    </Link>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to="/my-wishlist"
                                      className={`${
                                        active
                                          ? "bg-gray-100 text-gray"
                                          : "text-gray-900"
                                      } group flex w-full items-center rounded-xl px-3 py-2 text-md font-semibold tracking-wider`}
                                    >
                                      {active ? (
                                        <RiHeart3Fill
                                          className="mr-2 h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <RiHeart3Line
                                          className="mr-2 h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      )}
                                      Wishlist
                                    </Link>
                                  )}
                                </Menu.Item>
                              </div>
                            </>
                            {/*  ) : (
                          ""
                        )} */}
                            <div className="px-2 py-2">
                              <Menu.Item>
                                {/* {isConnected ? ( */}
                                <button
                                  onClick={() => {
                                    disconnect();
                                    toast.success("Logout successfully.");
                                  }}
                                  className="bg-black text-white group flex w-full items-center rounded-xl px-3 py-2 text-md font-semibold tracking-wider"
                                >
                                  <RiLogoutBoxRLine
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                  Disconnect
                                </button>
                                {/* ) : (
                             null
                            )} */}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  ) : (
                    <button
                      onClick={() => navigate("/login")}
                      className="border-[1px] border-gray-700 rounded-full w-12 h-12 rounded-full flex justify-center items-center"
                    >
                      <HiOutlineUser className="w-7 h-7 text-gray-700" />
                    </button>
                  )}
                </div>

                {/* <button
                  onClick={() => navigate("/cart")}
                  className="border-[1px] border-gray-700 rounded-full w-12 h-12 rounded-full relative  flex justify-center items-center"
                >
                  <HiOutlineShoppingCart className="w-7 h-7 text-gray-700" />
                  <span className="bg-red-500 absolute top-2 right-2 rounded-full text-[9px] w-3 h-3 flex justify-center items-center text-white p-1/2">
                    12
                  </span>
                </button> */}
                <div>
                  <Menu as="div" className="relative inline-block text-left">
                    <div className="mb-0">
                      <Menu.Button className="border-[1px] border-gray-700 rounded-full w-12 h-12 rounded-full relative  flex justify-center items-center">
                        <HiOutlineShoppingCart className="w-7 h-7 text-gray-700" />
                        <span className="bg-red-500 absolute top-2 right-2 rounded-full text-[9px] w-3 h-3 flex justify-center items-center text-white p-1/2">
                          12
                        </span>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="mt-2 absolute right-0 w-80 md:w-96 origin-top-right rounded-2xl bg-white  shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="border-b-[1px] border-gray-200 px-3 py-3 mb-1">
                          <h2 className="text-lg text-gray-900 font-semibold">
                            My Cart (12)
                          </h2>
                        </div>
                        <div className="p-3">
                          <div className="border-[1px] border-gray-200 p-3 rounded-xl mb-3 grid grid-cols-1 gap-3">
                            <CartItemsSmall />
                            <CartItemsSmall />
                            <CartItemsSmall />
                          </div>
                          <button
                            onClick={() => navigate("/cart")}
                            className="border-[1px] border-gray-200 w-full text-center capitalize tracking-wider p-2 rounded-full text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 transition-all ease-in-out duration-300"
                          >
                            view all
                          </button>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* {isHomePage && <WelcomeText />} */}
      <TrendingProducts />
      <motion.div
        style={{ x: x }}
        className=" text-[50px] md:text-[200px] font-black tracking-widest text-white absolute -bottom-[22px] md:-bottom-[90px] flex justify-center w-full"
      >
        {title}
      </motion.div>
    </div>
  );
};

export default HeaderMain;
