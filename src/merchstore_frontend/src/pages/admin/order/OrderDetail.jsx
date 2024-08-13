import React, { useEffect, useState, useRef, Fragment } from "react";
import {
  CiCircleCheck,
  CiCircleChevLeft,
  CiCircleRemove,
  CiEdit,
  CiTrash,
} from "react-icons/ci";
import { useReactToPrint } from "react-to-print";
import IcpLogo from "../../../assets/IcpLogo";

import ProductCard from "./ProductCard";
//import { useCanister } from "@connect2ic/react";
import { FiDollarSign } from "react-icons/fi";
import moment from "moment";
import { Dialog, Transition } from "@headlessui/react";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import Invoice from "../invoice";
import { useAuth } from "../../../auth/useClient";
const OrderDetail = () => {
  const param = useParams();
  //const [backend] = useCanister("backend");
  const { backend } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const [order, setOrder] = useState([]);
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenOS, setIsOpenOS] = useState(false);
  let [isOpenPS, setIsOpenPS] = useState(false);
  const [url, setUrl] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [orderVisible, setOrderVisible] = useState(false);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const getOrder = async () => {
    try {
      const item = await backend.getOrder(param.id);
      console.log(item);
      console.log(item.ok);
      if (item.ok) {
        setOrder(item.ok);
        setUrl(item.ok.awb);
        setOrderStatus(item.ok.orderStatus);
        setPaymentStatus(item.ok.paymentStatus);
      }
    } catch (error) {
      console.error("Error getting order:", error);
    } finally {
      setLoading2(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getOrder();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [backend]);

  const getDate = (timestamp) => {
    const converted = Number(timestamp) / 1000000;
    const date = new Date(converted);
    return `${date}`;
  };

  const handleSubmitAwb = async () => {
    try {
      setLoading(true);

      const res = await backend.updateTrackingUrl(order.id, url);
      console.log(res);
      if ("ok" in res) {
        setIsOpen(false);
        toast.success("Tracking Url Updated Successfully");
      }
    } catch (error) {
      toast.error("An error occurred ");
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPS = async () => {
    try {
      setLoading(true);

      const res = await backend.updatePaymentstatus(order.id, paymentStatus);
      console.log(res);
      if ("ok" in res) {
        setIsOpenPS(false);
        toast.success("Payment Status Updated Successfully");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOS = async () => {
    try {
      setLoading(true);

      const res = await backend.updateOrderStatus(order.id, orderStatus);
      console.log(res);
      if ("ok" in res) {
        setIsOpenOS(false);
        toast.success("Order Status Updated Successfully");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="styled-scrollbar flex flex-col bg-white  rounded-2xl overflow-y-auto h-[calc(100vh-100px)] p-4">
          <div className="mb-5 flex justify-between items-center gap-2">
            <h1 className="uppercase text-xl font-semibold text-gray-900  flex justify-start items-center gap-2">
              Order Id :{" "}
              {loading2 ? (
                <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
              ) : (
                order?.id
              )}
            </h1>
            <div className="flex gap-4">
              <div>
                {orderVisible && (
                  <Invoice
                    ref={componentRef}
                    userId={order.userId}
                    userName={`${order?.shippingAddress?.firstname || ""} ${
                      order.shippingAddress?.lastname || ""
                    }`}
                    usermobile={order.shippingAddress?.phone_number || ""}
                    useraddress={order.shippingAddress?.addressline1 || ""}
                    userpincode={order.shippingAddress?.pincode || ""}
                    usercity={order.shippingAddress?.city || ""}
                    userstate={order.shippingAddress?.state || ""}
                    usercountry={order.shippingAddress?.country || ""}
                    awb={order.awb || ""}
                    paymentAddress={order.paymentAddress}
                    products={order.products}
                    orderId={order.id}
                    onAfterPrint={() => setOrderVisible(false)}
                  />
                )}
                <button
                  onClick={() => {
                    setOrderVisible(true);
                    if (handlePrint) {
                      handlePrint();
                    }
                  }}
                  className="uppercase font-medium flex items-center justify-center gap-2 bg-[#512E5F]/20  hover:bg-[#512E5F]/20  text-[#512E5F] rounded-xl px-6 py-3"
                >
                  Print
                </button>
              </div>

              <Link
                to="/admin/orders"
                className="uppercase font-medium flex items-center justify-center gap-2 bg-[#512E5F]/20  hover:bg-[#512E5F]/20  text-[#512E5F] rounded-xl px-6 py-3"
              >
                <CiCircleChevLeft className="w-5 h-5" /> Go back
              </Link>
            </div>
          </div>

          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="border-2 border-[#512E5F]/20 rounded-xl p-4">
                <h1 className="uppercase text-black font-semibold text-xl mb-2 tracking-wide">
                  General
                </h1>
                <div className="border-b-2 border-[#512E5F]/20 mb-3"></div>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1">
                    <div className="flex flex-col gap-0 leading-tight">
                      <h6 className="text-sm font-light text-black uppercase tracking-wide">
                        User Principal Id
                      </h6>
                      <h6 className="text-lg font-semibold text-black">
                        {loading2 ? (
                          <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                        ) : (
                          order?.userid.toText()
                        )}
                      </h6>
                    </div>
                  </div>
                  <div className="grid grid-cols-1">
                    <div className="flex flex-col gap-0 leading-tight">
                      <h6 className="text-sm font-light text-black uppercase tracking-wide  flex items-center gap-2">
                        AWB{" "}
                        <CiEdit
                          className="w-5 h-5 cursor-pointer"
                          title="Tracking Url"
                          onClick={openModal}
                        />
                      </h6>
                      <h6 className="text-lg font-semibold text-black">
                        {loading2 ? (
                          <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                        ) : order?.awb === "" ? (
                          "..."
                        ) : (
                          url
                        )}
                      </h6>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex flex-col gap-0 leading-tight">
                      <h6 className="text-sm font-light text-black uppercase tracking-wide">
                        Payment Method
                      </h6>
                      <h6 className="text-lg font-semibold text-black">
                        {loading2 ? (
                          <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                        ) : (
                          order?.paymentMethod
                        )}
                      </h6>
                    </div>
                    <div className="flex flex-col gap-0 leading-tight">
                      <h6 className="text-sm font-light text-black uppercase tracking-wide">
                        Payment Id
                      </h6>
                      <h6 className="text-lg font-semibold text-black">
                        {loading2 ? (
                          <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                        ) : (
                          order?.paymentAddress
                        )}
                      </h6>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex flex-col gap-0 leading-tight">
                      <h6 className="text-sm font-light text-black uppercase tracking-wide  flex items-center gap-1">
                        Payment Status{" "}
                        <CiEdit
                          className="w-5 h-5 cursor-pointer"
                          title="Tracking Url"
                          onClick={() => setIsOpenPS(true)}
                        />
                      </h6>
                      {loading2 ? (
                        <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                      ) : (
                        <>
                          {paymentStatus === "pending" ? (
                            <h6 className="text-lg font-semibold uppercase text-yellow-500">
                              pending
                            </h6>
                          ) : paymentStatus === "rejected" ? (
                            <h6 className="text-lg font-semibold uppercase text-red-500">
                              rejected
                            </h6>
                          ) : paymentStatus === "success" ? (
                            <h6 className="text-lg font-semibold uppercase text-green-500">
                              success
                            </h6>
                          ) : (
                            ""
                          )}
                        </>
                      )}
                    </div>
                    <div className="flex flex-col gap-0 leading-tight">
                      <h6 className="text-sm font-light text-black uppercase tracking-wide flex items-center gap-1">
                        Order Status{" "}
                        <CiEdit
                          className="w-5 h-5 cursor-pointer"
                          title="Tracking Url"
                          onClick={() => setIsOpenOS(true)}
                        />
                      </h6>
                      {loading2 ? (
                        <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                      ) : (
                        <>
                          {orderStatus === "processing" ? (
                            <div className="text-lg font-semibold uppercase text-yellow-500">
                              processing
                            </div>
                          ) : orderStatus === "confirmed" ? (
                            <div className="text-lg font-semibold uppercase text-amber-500">
                              confirmed
                            </div>
                          ) : orderStatus === "shipped" ? (
                            <div className="text-lg font-semibold uppercase text-blue-500">
                              shipped
                            </div>
                          ) : orderStatus === "delivered" ? (
                            <div className="text-lg font-semibold uppercase text-green-500">
                              delivered
                            </div>
                          ) : orderStatus === "out for delivery" ? (
                            <div className="text-lg font-semibold uppercase text-green-500">
                              out for delivery
                            </div>
                          ) : orderStatus === "cancelled" ? (
                            <div className="text-lg font-semibold uppercase text-red-500">
                              cancelled
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex flex-col gap-0 leading-tight">
                      <h6 className="text-sm font-light text-black uppercase tracking-wide">
                        Order Date
                      </h6>
                      <h6 className="text-sm font-semibold text-black">
                        {loading2 ? (
                          <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                        ) : (
                          moment(getDate(order?.timeCreated)).format(
                            "MMM Do YYYY, h:mm a"
                          )
                        )}
                      </h6>
                    </div>
                    <div className="flex flex-col gap-0 leading-tight">
                      <h6 className="text-sm font-light text-black uppercase tracking-wide">
                        Last Updated
                      </h6>
                      <h6 className="text-sm font-semibold text-black">
                        {loading2 ? (
                          <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                        ) : (
                          moment(getDate(order?.timeUpdated)).format(
                            "MMM Do YYYY, h:mm a"
                          )
                        )}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-2 border-[#512E5F]/20 rounded-xl p-4">
                <h1 className="uppercase text-black font-semibold text-xl mb-2 tracking-wide">
                  Payment
                </h1>
                <div className="border-b-2 border-[#512E5F]/20 mb-3"></div>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2">
                    <div className="flex flex-col gap-0 leading-tight">
                      <h6 className="text-sm font-light text-black uppercase tracking-wide">
                        Subtotal Amount
                      </h6>
                      <h6 className="text-lg font-semibold text-black">
                        {loading2 ? (
                          <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                        ) : (
                          <span className="flex items-center gap-1">
                            <IcpLogo size={24} />{" "}
                            {order?.subTotalAmount.toFixed(2)}
                          </span>
                        )}
                      </h6>
                    </div>
                    <div className="flex flex-col gap-0 leading-tight">
                      <h6 className="text-sm font-light text-black uppercase tracking-wide">
                        Shipping Amount
                      </h6>
                      <h6 className="text-lg font-semibold text-black">
                        {loading2 ? (
                          <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                        ) : (
                          <span className="flex items-center gap-1">
                            <IcpLogo size={24} />{" "}
                            {order?.shippingAmount.shipping_amount}
                          </span>
                        )}
                      </h6>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex flex-col gap-0 leading-tight">
                      <h6 className="text-sm font-light text-black uppercase tracking-wide">
                        Total Amount
                      </h6>
                      <h6 className="text-lg font-semibold text-black">
                        {loading2 ? (
                          <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                        ) : (
                          <span className="flex items-center gap-1">
                            <IcpLogo size={24} />{" "}
                            {order?.totalAmount.toFixed(2)}
                          </span>
                        )}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-2 border-[#512E5F]/20 rounded-xl p-4">
                <h1 className="uppercase text-black font-semibold text-xl mb-2 tracking-wide">
                  Shipping
                </h1>
                <div className="border-b-2 border-[#512E5F]/20 mb-3"></div>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2">
                    <div className="flex flex-col gap-0 leading-tight">
                      <h6 className="text-sm font-light text-black uppercase tracking-wide">
                        First name
                      </h6>
                      <h6 className="text-lg font-semibold text-black">
                        {loading2 ? (
                          <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                        ) : (
                          order?.shippingAddress?.firstname
                        )}
                      </h6>
                    </div>
                    <div className="flex flex-col gap-0 leading-tight">
                      <h6 className="text-sm font-light text-black uppercase tracking-wide">
                        Last Name
                      </h6>
                      <h6 className="text-lg font-semibold text-black">
                        {loading2 ? (
                          <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                        ) : (
                          order?.shippingAddress?.lastname
                        )}
                      </h6>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex flex-col gap-0 leading-tight">
                      <h6 className="text-sm font-light text-black uppercase tracking-wide">
                        Street Address
                      </h6>
                      <h6 className="text-lg font-semibold text-black">
                        {loading2 ? (
                          <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                        ) : (
                          order?.shippingAddress?.addressline1
                        )}
                      </h6>
                    </div>

                    <div className="flex flex-col gap-0 leading-tight">
                      <h6 className="text-sm font-light text-black uppercase tracking-wide">
                        Mobile Number
                      </h6>
                      <h6 className="text-lg font-semibold text-black">
                        {loading2 ? (
                          <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                        ) : (
                          order?.shippingAddress?.phone_number
                        )}
                      </h6>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex flex-col gap-0 leading-tight">
                      <h6 className="text-sm font-light text-black uppercase tracking-wide">
                        Email Address
                      </h6>
                      <h6 className="text-lg font-semibold text-black">
                        {loading2 ? (
                          <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                        ) : (
                          order?.shippingAddress?.email
                        )}
                      </h6>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex flex-col gap-0 leading-tight">
                      <h6 className="text-sm font-light text-black uppercase tracking-wide">
                        Country
                      </h6>
                      <h6 className="text-lg font-semibold text-black">
                        {loading2 ? (
                          <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                        ) : (
                          order?.shippingAddress?.country
                        )}
                      </h6>
                    </div>
                    <div className="flex flex-col gap-0 leading-tight">
                      <h6 className="text-sm font-light text-black uppercase tracking-wide">
                        State
                      </h6>
                      <h6 className="text-lg font-semibold text-black">
                        {loading2 ? (
                          <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                        ) : (
                          order?.shippingAddress?.state
                        )}
                      </h6>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex flex-col gap-0 leading-tight">
                      <h6 className="text-sm font-light text-black uppercase tracking-wide">
                        City
                      </h6>
                      <h6 className="text-lg font-semibold text-black">
                        {loading2 ? (
                          <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                        ) : (
                          order?.shippingAddress?.city
                        )}
                      </h6>
                    </div>
                    <div className="flex flex-col gap-0 leading-tight">
                      <h6 className="text-sm font-light text-black uppercase tracking-wide">
                        Pin/Zip Code
                      </h6>
                      <h6 className="text-lg font-semibold text-black">
                        {loading2 ? (
                          <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                        ) : (
                          order?.shippingAddress?.pincode
                        )}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
              <div className="border-2 border-[#512E5F]/20 rounded-xl p-4">
                <h1 className="uppercase text-black font-semibold text-xl mb-2 tracking-wide">
                  Product
                </h1>
                <div className="border-b-2 border-[#512E5F]/20 mb-3"></div>
                <div className="flex flex-col gap-4">
                  {order?.products?.map((product, i) => (
                    <ProductCard key={i} product={product} loading={loading2} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {}{" "}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900 uppercase"
                  >
                    Update Tracking Url
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="my-2">
                      <label
                        htmlFor="title"
                        className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
                      >
                        Tracking Url
                      </label>
                      <input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        type="text"
                        className="border-2 p-2 outline-none border-[#F5EEF8] w-full rounded-lg"
                        placeholder="Tracking Url"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-start justify-start gap-2 mt-6">
                      <button
                        onClick={handleSubmitAwb}
                        type="submit"
                        className={`bg-[#512E5F] text-md tracking-wide py-2 px-4 rounded-xl text-white font-medium flex justify-center items-center gap-2 ${
                          loading && "opacity-50"
                        }`}
                        disabled={loading}
                      >
                        {loading ? (
                          <TailSpin
                            height="20"
                            width="20"
                            color="white"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            visible={true}
                          />
                        ) : (
                          <CiCircleCheck className="w-5 h-5" />
                        )}
                        UPDATE
                      </button>
                      <button
                        onClick={closeModal}
                        className={`bg-[#512E5F]/50 text-md tracking-wide py-2 px-4 rounded-xl text-white font-medium flex justify-center items-center gap-2 ${
                          loading && "opacity-50"
                        }`}
                        disabled={loading}
                      >
                        <CiCircleRemove className="w-5 h-5" />
                        CLOSE
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isOpenPS} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900 uppercase"
                  >
                    Update Payment Status
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="my-2">
                      <label
                        htmlFor="title"
                        className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
                      >
                        Payment Status
                      </label>
                      <select
                        className="border-2 p-2 outline-none border-[#F5EEF8] w-full rounded-lg"
                        disabled={loading}
                        value={paymentStatus}
                        onChange={(e) => setPaymentStatus(e.target.value)}
                        name="status" // Ensure you have a name attribute
                      >
                        <option
                          value="pending"
                          defaultValue={paymentStatus === "pending"}
                        >
                          Pending
                        </option>
                        <option
                          value="success"
                          defaultValue={paymentStatus === "success"}
                        >
                          Success
                        </option>
                        <option
                          value="rejected"
                          defaultValue={paymentStatus === "rejected"}
                        >
                          Rejected
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-start justify-start gap-2 mt-6">
                      <button
                        onClick={handleSubmitPS}
                        type="submit"
                        className={`bg-[#512E5F] text-md tracking-wide py-2 px-4 rounded-xl text-white font-medium flex justify-center items-center gap-2 ${
                          loading && "opacity-50"
                        }`}
                        disabled={loading}
                      >
                        {loading ? (
                          <TailSpin
                            height="20"
                            width="20"
                            color="white"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            visible={true}
                          />
                        ) : (
                          <CiCircleCheck className="w-5 h-5" />
                        )}
                        UPDATE
                      </button>
                      <button
                        onClick={() => setIsOpenPS(false)}
                        className={`bg-[#512E5F]/50 text-md tracking-wide py-2 px-4 rounded-xl text-white font-medium flex justify-center items-center gap-2 ${
                          loading && "opacity-50"
                        }`}
                        disabled={loading}
                      >
                        <CiCircleRemove className="w-5 h-5" />
                        CLOSE
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isOpenOS} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900 uppercase"
                  >
                    Update Order Status
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="my-2">
                      <label
                        htmlFor="title"
                        className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
                      >
                        Order Status
                      </label>
                      <select
                        className="border-2 p-2 outline-none border-[#F5EEF8] w-full rounded-lg"
                        disabled={loading}
                        value={orderStatus}
                        onChange={(e) => setOrderStatus(e.target.value)}
                        name="status" // Ensure you have a name attribute
                      >
                        <option
                          value="processing"
                          defaultValue={orderStatus === "processing"}
                        >
                          Processing
                        </option>
                        <option
                          value="confirmed"
                          defaultValue={orderStatus === "confirmed"}
                        >
                          Confirmed
                        </option>
                        <option
                          value="shipped"
                          defaultValue={orderStatus === "shipped"}
                        >
                          Shipped
                        </option>
                        <option
                          value="out for delivery"
                          defaultValue={orderStatus === "out for delivery"}
                        >
                          Out for delivery
                        </option>

                        <option
                          value="delivered"
                          defaultValue={orderStatus === "delivered"}
                        >
                          Delivered
                        </option>
                        <option
                          value="cancelled"
                          defaultValue={orderStatus === "cancelled"}
                        >
                          Cancelled
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-start justify-start gap-2 mt-6">
                      <button
                        onClick={handleSubmitOS}
                        type="submit"
                        className={`bg-[#512E5F] text-md tracking-wide py-2 px-4 rounded-xl text-white font-medium flex justify-center items-center gap-2 ${
                          loading && "opacity-50"
                        }`}
                        disabled={loading}
                      >
                        {loading ? (
                          <TailSpin
                            height="20"
                            width="20"
                            color="white"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            visible={true}
                          />
                        ) : (
                          <CiCircleCheck className="w-5 h-5" />
                        )}
                        UPDATE
                      </button>
                      <button
                        onClick={() => setIsOpenOS(false)}
                        className={`bg-[#512E5F]/50 text-md tracking-wide py-2 px-4 rounded-xl text-white font-medium flex justify-center items-center gap-2 ${
                          loading && "opacity-50"
                        }`}
                        disabled={loading}
                      >
                        <CiCircleRemove className="w-5 h-5" />
                        CLOSE
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default OrderDetail;
