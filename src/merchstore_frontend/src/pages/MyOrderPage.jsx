/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import React, { useEffect, useState } from "react";
import FakeProdImg from "../assets/fakeprod.png";
import { BsFillBagCheckFill, BsTruck } from "react-icons/bs";
import Button from "../components/common/Button";
import { BsArrowRightCircle } from "react-icons/bs";
import AnimationView from "../components/common/AnimationView";
import ScrollToTop from "../components/common/ScrollToTop";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Tabs } from "../components/MyProfilePageComponents/MyProTabs";
import CartApiHandler from "../apiHandlers/CartApiHandler";
import NoImage from "../assets/placeholderImg-Small.jpeg";
import { Link } from "react-router-dom";

import IcpLogo from "../assets/IcpLogo";
import LoadingScreen from "../components/common/LoadingScreen";
import { useAuth } from "../auth/useClient";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Main: MyOrderPage.
/* ----------------------------------------------------------------------------------------------------- */
const MyOrderPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Header title={"Orders"}></Header>
      <MyOrderPageContainerMain />
      <Footer></Footer>
    </AnimationView>
  );
};

// Date formatter to 'Dec 26th, 9:31pm
export const formatDate = (timestamp) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(Number(timestamp) / 1e6));
/* ----------------------------------------------------------------------------------------------------- */
/*  @ MyOrderPage : MyOrderPageContainerMain.
/* ----------------------------------------------------------------------------------------------------- */
const MyOrderPageContainerMain = () => {
  return (
    <div className="container mx-auto py-6 tracking-wider">
      <div className="flex max-md:flex-col p-6 gap-6">
        <Tabs />
        <MyOrders />
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ MyOrderPage : MyOrderPageContainerMain : MyOrders Component.
/* ----------------------------------------------------------------------------------------------------- */
const MyOrders = () => {
  const { getOrderList, orderList, isLoading } = CartApiHandler();
  const [myOrderList, setMyOrderList] = useState(null);
  const [finalIsLoading, setFinalIsLoading] = useState(true);
  // const {backend} = useBackend()
  const { backend } = useAuth();
  const { OrderListLoader } = LoadingScreen();

  useEffect(() => {
    getOrderList();
  }, [backend]);

  // console.log(myOrderList);

  useEffect(() => {
    const updatedMyOrderList = orderList?.map(
      ([id, { products, timeCreated, totalAmount }]) => {
        const [{ title, img }] = products;
        return {
          id,
          title,
          timeCreated,
          img,
          totalAmount,
        };
      }
    );
    setMyOrderList(updatedMyOrderList);
    // Loading : gather all backend data
    const timeoutLoad = setTimeout(() => {
      setFinalIsLoading(false);
    }, 3000);
    return () => clearTimeout(timeoutLoad);
  }, [orderList, backend]);

  return (
    <div className="flex flex-col w-full border border-gray-300 rounded-2xl tracking-normal">
      <h1 className="font-medium text-lg px-2 sm:px-8 py-4 flex items-center gap-2">
        My recent orders ({myOrderList?.length || 0})
      </h1>

      {finalIsLoading && (
        <div className="capitalize font-medium">
          <OrderListLoader />
        </div>
      )}

      {!finalIsLoading && myOrderList?.length === 0 && (
        <div className="p-8 capitalize font-medium">
          You haven't ordered any items. Check out our products.
        </div>
      )}

      {!finalIsLoading && myOrderList?.length > 0 && (
        <div className="flex flex-col">
          {myOrderList.map((order, index) => (
            <div
              key={index}
              className="border-t px-2 sm:px-8 py-4 flex max-lg:flex-col justify-between"
            >
              <div className="flex max-md:flex-col gap-3">
                <div className="flex p-1 border border-gray-300 rounded-xl max-w-max">
                  <img
                    className="max-w-24 max-h-24 object-contain rounded-xl"
                    src={order?.img === "" ? NoImage : order?.img}
                    alt="_blank"
                  />
                </div>
                <div className="flex flex-col lg:justify-center">
                  <p className="text-lg capitalize font-medium">
                    {order?.title}
                  </p>
                  <p className="text-xs uppercase">Order Id: {order?.id}</p>
                  <p className="uppercase text-xs">
                    {formatDate(order?.timeCreated)}
                  </p>
                </div>
              </div>
              <div className="flex max-lg:ml-auto max-md:ml-0 gap-6">
                <div className="flex flex-col justify-center">
                  <span className="text-[12px] uppercase">Total amount</span>
                  <p className="text-lg font-medium flex items-center gap-1">
                    <IcpLogo />
                    {order?.totalAmount}
                  </p>
                </div>
                <div className="flex justify-center flex-col">
                  <div className="h-4 w-4"></div>
                  <div className="flex gap-6">
                    <Button className="hover:text-green-500">
                      <BsTruck size={20} />
                    </Button>
                    <Link to={`/my-order-detail/${order?.id}`}>
                      <BsArrowRightCircle size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrderPage;
