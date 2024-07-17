import React from "react";
import NoImage from "../../assets/placeholderImg-Small.jpeg";

const LoadingScreen = () => {
  /* ----------------------------------------------------------------------------------------------------- */
  /*  @ NewArrivalLoadingScreen : <HomePageBottom />
/* ----------------------------------------------------------------------------------------------------- */
  const NewArrivalLoadingScreen = () => {
    return (
      <div className="px-6 md:container md:mx-auto mb-10">
        <div
          data-aos="fade-up"
          className="p-6 grid sm:grid-cols-2 max-h-full overflow-hidden gap-2 border-[1px] border-dashed rounded-2xl"
        >
          <div data-aos="fade-up" className="order-2 sm:order-1 flex flex-col">
            <div className="flex-1 overflow-auto flex flex-col gap-2">
              <p className="text-sm text-slate-600">NEW ARRIVAL</p>
              <h1 className="h-8 max-md:h-6 pb-4 bg-gray-300 rounded-lg animate-pulse"></h1>
              <p className=" h-40  bg-gray-200 rounded-lg animate-pulse"></p>
            </div>
          </div>
          <div className="order-1 sm:order-2 rounded-2xl bg-gray-200 justify-center items-center flex shadow-lg mb-4 md:mb-0 animate-pulse">
            <div className="h-80 w-80 "></div>
          </div>
        </div>
      </div>
    );
  };

  /* ----------------------------------------------------------------------------------------------------- */
  /*  @ SavedAddress Loading Screen : <MyAddressPage />
/* ----------------------------------------------------------------------------------------------------- */
  const MyAddressLoadingScreen = () => {
    return (
      <div className="border-t px-2 sm:px-8 py-4 flex max-lg:flex-col max-lg:gap-3">
        <div className="gap-3 flex-1">
          <div className="flex gap-3">
            <div className="capitalize text-lg font-medium bg-gray-300 w-36 h-6 animate-pulse rounded-md mb-2"></div>
          </div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex gap-3 text-sm font-medium mb-2">
              <div className="bg-gray-300 w-40 h-4 animate-pulse rounded-md"></div>
            </div>
          ))}
        </div>
        <div className="animate-pulse">
          <button className="py-2 px-4 bg-gray-500 text-white font-medium text-sm lg:rounded-full max-lg:rounded-md h-9 w-28"></button>
        </div>
      </div>
    );
  };
  /* ----------------------------------------------------------------------------------------------------- */
  /*  @ Shipping Address Loading Screen : <ShippingAddress />
 /* ----------------------------------------------------------------------------------------------------- */
  const ShippingAddressPageLoader = () => {
    return (
      <div className="flex w-full max-md:flex-col gap-4">
        <div className="flex-1 flex flex-col gap-4">
          <div className="md:flex border border-gray-300 rounded-xl p-2 w-full bg-gray-100">
            <div className="flex flex-col p-2 animate-pulse">
              <div className="flex gap-2 items-center w-full">
                <span className="h-5 w-5 bg-gray-300 rounded-full"></span>
                <div className="flex-1 flex sm:items-center gap-2 max-sm:flex-col mb-2">
                  <p className="font-bold capitalize min-w-max bg-gray-300 h-5 w-32 rounded-md"></p>
                  <span className="px-2 py-1 rounded-md bg-gray-300 text-gray-500 uppercase text-xs flex items-center max-w-max font-semibold h-5"></span>
                  <p className="font-semibold bg-gray-300 h-5 w-24 rounded-md"></p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <span className="h-5 w-5"></span>
                <div className="flex-1">
                  <p className="capitalize bg-gray-300 h-5 w-48 rounded-md mb-2"></p>
                  <p className="font-semibold bg-gray-300 h-5 w-36 rounded-md"></p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-2 rounded-xl">
            <button className="font-semibold px-8 py-4">+ New Address</button>
          </div>
        </div>
        <div className="border-2 rounded-2xl max-h-96">
          <div className="flex flex-col">
            <div className="border-b-2 py-6">
              <span className="uppercase font-semibold px-6 text-xl text-slate-500">
                Price details
              </span>
            </div>
            <div className="border-b-2 py-2 flex flex-col gap-4 border-dashed">
              <div className="flex justify-between px-6 gap-2 font-medium">
                <p className="bg-gray-300 h-6 w-28 animate-pulse rounded-xl"></p>
                <span className="bg-gray-300 h-6 w-12 animate-pulse rounded-xl"></span>
              </div>
              <div className="flex justify-between px-6 gap-2 font-medium">
                <p className="bg-gray-300 h-6 w-36 animate-pulse rounded-xl"></p>
                <span className="flex gap-2">
                  <p className="bg-gray-300 h-6 w-12 animate-pulse rounded-xl"></p>
                </span>
              </div>
            </div>
            <div className="border-b-2 py-4 flex flex-col gap-4 border-dashed">
              <div className="flex justify-between px-6 gap-2 font-bold">
                <p className="bg-gray-300 h-6 w-28 animate-pulse rounded-xl"></p>
                <span className="bg-gray-300 h-6 w-12 animate-pulse rounded-xl"></span>
              </div>
            </div>
            <div className="border-b-2 py-4 flex flex-col gap-4 border-dashed">
              <div className="px-6">
                <div className="bg-gray-300 h-6 w-72 animate-pulse rounded-xl"></div>
              </div>
            </div>
            <div className="p-6"></div>
          </div>
        </div>
      </div>
    );
  };

  /* ----------------------------------------------------------------------------------------------------- */
  /*  @ Checkout Loading Screen : <CheckoutPage />
/* ----------------------------------------------------------------------------------------------------- */
  const CheckoutPageLoader = () => {
    return (
      <div className="flex gap-4 tracking-wider max-md:flex-col">
        <div className="flex flex-col gap-4 flex-1">
          <span className="bg-black rounded-xl text-white py-4 px-6 font-medium">
            Checkout
          </span>
          <div className="border-2 rounded-2xl p-6 flex max-lg:flex-col">
            <div className="flex gap-4 flex-1">
              <div className="flex p-1 border border-gray-300 rounded-xl">
                <img
                  src={NoImage}
                  alt="_blank"
                  className="max-w-24 max-h-24 object-contain rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <span className="border-2 px-2 py-1 text-xs uppercase font-semibold w-3/12 bg-gray-300 h-5 rounded-md animate-pulse"></span>
                <p className="text-lg font-semibold capitalize flex gap-1 w-full">
                  <span className="w-4/12 bg-gray-300 h-5 rounded-md animate-pulse"></span>
                  <span className="w-6/12 bg-gray-300 h-5 rounded-md animate-pulse"></span>
                  <span className="w-2/12 bg-gray-300 h-5 rounded-md animate-pulse"></span>
                  <span className="w-5/12 bg-gray-300 h-5 rounded-md animate-pulse"></span>
                </p>
                <span className="flex gap-4">
                  <p className="capitalize text-xs flex gap-1 items-center">
                    <span className="w-6 bg-gray-300 h-3 rounded-md animate-pulse"></span>
                    <span className="w-2 bg-gray-300 h-3 rounded-md animate-pulse"></span>
                  </p>
                  <p className="capitalize text-xs flex gap-1 items-center">
                    <span className="w-6 bg-gray-300 h-3 rounded-md animate-pulse"></span>
                    <span className="w-6 bg-gray-300 h-3 rounded-md animate-pulse"></span>
                  </p>
                </span>
              </div>
            </div>
            <div className="flex justify-end flex-col gap-2 items-end">
              <div className="flex gap-4 items-center">
                <p className="font-semibold text-2xl flex items-center gap-1 w-10 bg-gray-300 h-6 rounded-md animate-pulse"></p>
                <p className="line-through text-gray-500 w-6 bg-gray-300 h-4 rounded-md animate-pulse"></p>
              </div>
              <div className="flex gap-4 items-center w-4/12 h-6 bg-gray-300 rounded-md animate-pulse"></div>
            </div>
          </div>
          <div className="p-6 border-2 rounded-2xl">
            <div className="flex max-md:flex-col justify-between gap-4 animate-pulse">
              <div className="flex flex-col gap-2 w-full">
                <h1 className="text-lg font-medium capitalize flex gap-2">
                  <span className="w-4/12 h-5 bg-gray-300 rounded-md"></span>
                  <span className="w-4/12 h-5 bg-gray-300 rounded-md"></span>
                </h1>
                <div className="flex gap-2 text-sm">
                  <span className="w-8/12 h-3 bg-gray-300 rounded-md"></span>
                  <span className="w-4/12 h-3 bg-gray-300 rounded-md"></span>
                  <span className="w-6/12 h-3 bg-gray-300 rounded-md"></span>
                </div>
                <p className="w-8/12 h-3 bg-gray-300 rounded-md"></p>
                <div className="flex font-medium text-sm">
                  <span className="w-4/12 h-3 bg-gray-300 rounded-md"></span>,
                  <span className="w-4/12 h-3 bg-gray-300 rounded-md"></span>
                </div>
              </div>
              <span className=" bg-gray-600 rounded-md w-4/12 h-6"></span>
            </div>
          </div>
          <div
            id="headlessui-radiogroup-:rb:"
            role="radiogroup"
            aria-labelledby="headlessui-label-:rd:"
          >
            <label
              className="text-black xl:text-sm text-xs font-semibold uppercase tracking-wider"
              id="headlessui-label-:rd:"
              role="none"
            >
              Payment Method
            </label>
            <div
              className="grid xl:grid-cols-3 grid-cols-2 gap-4 py-4 max-sm:flex max-sm:flex-col font-medium"
              role="none"
            >
              <div className="border-2 p-3 rounded-md text-sm uppercase animate-pulse bg-gray-300 h-10 w-full">
                <div className="flex justify-between w-full items-center"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-2 rounded-2xl max-h-96">
          <div className="flex flex-col">
            <div className="border-b-2 py-6">
              <span className="uppercase font-semibold px-6 text-xl text-slate-500">
                Price details
              </span>
            </div>
            <div className="border-b-2 py-2 flex flex-col gap-4 border-dashed">
              <div className="flex justify-between px-6 gap-2 font-medium">
                <p className="bg-gray-300 h-6 w-28 animate-pulse rounded-md"></p>
                <span className="bg-gray-300 h-6 w-12 animate-pulse rounded-md"></span>
              </div>
              <div className="flex justify-between px-6 gap-2 font-medium">
                <p className="bg-gray-300 h-6 w-36 animate-pulse rounded-md"></p>
                <span className="flex gap-2">
                  <p className="bg-gray-300 h-6 w-12 animate-pulse rounded-md"></p>
                </span>
              </div>
            </div>
            <div className="border-b-2 py-4 flex flex-col gap-4 border-dashed">
              <div className="flex justify-between px-6 gap-2 font-bold">
                <p className="bg-gray-300 h-6 w-28 animate-pulse rounded-md"></p>
                <span className="bg-gray-300 h-6 w-12 animate-pulse rounded-md"></span>
              </div>
            </div>
            <div className="border-b-2 py-4 flex flex-col gap-4 border-dashed">
              <div className="px-6 flex items-center justify-center">
                <div className="bg-gray-300 h-6 w-8/12 animate-pulse rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ----------------------------------------------------------------------------------------------------- */
  /*  @ OrderList Loading Screen : <MyOrderPage />
/* ----------------------------------------------------------------------------------------------------- */
  const OrderListLoader = () => {
    const skeletonArray = Array.from({ length: 2 }, (_, index) => index);

    return (
      <div className="flex flex-col">
        {skeletonArray.map((index) => (
          <div
            key={index}
            className="border-t px-2 sm:px-8 py-4 flex max-lg:flex-col justify-between animate-pulse"
          >
            <div className="flex max-md:flex-col gap-3">
              <div className="flex p-1 border border-gray-300 rounded-xl max-w-max">
                <img
                  src={NoImage}
                  alt="_blank"
                  className="max-w-24 max-h-24 object-contain rounded-xl"
                />
              </div>
              <div className="flex flex-col lg:justify-center gap-2">
                <div className="w-40 h-4 bg-gray-300 rounded"></div>
                <div className="w-20 h-3 bg-gray-300 rounded"></div>
                <div className="w-24 h-3 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="flex max-lg:ml-auto max-md:ml-0 gap-6">
              <div className="flex flex-col justify-center gap-2">
                <div className="w-20 h-4 bg-gray-300 rounded"></div>
                <div className="w-16 h-6 bg-gray-300 rounded"></div>
              </div>
              <div className="flex justify-center flex-col gap-2">
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                <div className="flex gap-6">
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const OrderDetailPageLoader = () => {
    return (
      <div className="container mx-auto p-6 tracking-wider flex flex-col gap-6">
        <div className="text-gray-600 gap-2 flex text-sm font-semibold py-6 items-center">
          <span className="min-w-max" href="/">
            Home
          </span>
          <span> &gt; </span>
          <span className="min-w-max" href="/my-profile">
            my-profile
          </span>
          <span> &gt; </span>
          <span className="min-w-max" href="/my-order">
            my-order
          </span>
          <span> &gt; </span>
          <span
            className="min-w-max"
            href="/56b533b0-fb52-488c-9856-9781941d4ab9"
          >
            56b533b0-fb52-488c-9856-9781941d4ab9
          </span>
        </div>
        <div className="flex border border-dashed rounded-2xl border-gray-900 min-w-full max-sm:flex-col">
          <div className="sm:w-1/2 sm:border-r sm:border-r-gray-900 border-dashed max-sm:border-b max-sm:border-b-gray-900">
            <div className="flex flex-col gap-3 px-2 sm:px-8 py-4">
              <h3 className="font-medium text-lg">Delivery Address</h3>
              <div className="animate-pulse w-40 h-4 bg-gray-300"></div>
              <div className="animate-pulse w-60 h-4 bg-gray-300"></div>
              <div className="animate-pulse w-80 h-4 bg-gray-300"></div>
              <div className="animate-pulse w-64 h-4 bg-gray-300"></div>
              <div className="animate-pulse w-52 h-4 bg-gray-300"></div>
            </div>
          </div>
          <div className="sm:w-1/2 ">
            <div className="flex flex-col gap-3 px-2 sm:px-8 py-4">
              <h3 className="font-medium text-lg">More Actions</h3>
              <div className="animate-pulse w-32 h-4 bg-gray-300"></div>
              <div className="animate-pulse w-48 h-4 bg-gray-300"></div>
              <div className="animate-pulse w-56 h-4 bg-gray-300"></div>
            </div>
          </div>
        </div>
        <div className="border border-dashed border-gray-900 rounded-2xl capitalize p-8">
          <div>
            <div className="flex items-center p-8">
              <div className="relative">
                <div className="animate-pulse w-8 h-8 shrink-0 mx-[-1px] border-2 border-green-500 p-1.5 flex items-center justify-center rounded-full"></div>
                <div className="animate-pulse w-4/12 h-1 bg-green-500"></div>
                <div className="relative">
                  <div className="animate-pulse w-8 h-8 shrink-0 mx-[-1px] border-2 border-gray-300 p-1.5 flex items-center justify-center rounded-full"></div>
                  <div className="animate-pulse w-4/12 h-1 bg-gray-400"></div>
                  <div className="relative">
                    <div className="animate-pulse w-8 h-8 shrink-0 mx-[-1px] border-2 border-gray-300 p-1.5 flex items-center justify-center rounded-full"></div>
                    <div className="animate-pulse w-4/12 h-1 bg-gray-400"></div>
                    <div className="relative">
                      <div className="animate-pulse w-8 h-8 shrink-0 mx-[-1px] border-2 border-gray-300 p-1.5 flex items-center justify-center rounded-full"></div>
                      <div className="animate-pulse w-4/12 h-1 bg-gray-400"></div>
                      <div className="relative">
                        <div className="animate-pulse w-8 h-8 shrink-0 mx-[-1px] border-2 border-gray-300 p-1.5 flex items-center justify-center rounded-full"></div>
                        <div className="animate-pulse w-4/12 h-1 bg-gray-400"></div>
                        <div className="relative">
                          <div className="animate-pulse w-8 h-8 shrink-0 mx-[-1px] border-2 border-gray-300 p-1.5 flex items-center justify-center rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return {
    NewArrivalLoadingScreen,
    MyAddressLoadingScreen,
    ShippingAddressPageLoader,
    CheckoutPageLoader,
    OrderListLoader,
    OrderDetailPageLoader,
  };
};

export default LoadingScreen;
