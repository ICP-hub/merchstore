/* ----------------------------------------------------------------------------------------------------- */
/*  @  imports.
/* ----------------------------------------------------------------------------------------------------- */
import React, { useEffect, useRef, useState } from "react";
import Button from "../components/common/Button";
import { formatDate } from "./MyOrderPage";
import AnimationView from "../components/common/AnimationView";
import ScrollToTop from "../components/common/ScrollToTop";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import {
  HorizontalStepperComponent,
  VerticalStepperComponent,
  // VerticalStepperComponent,
} from "../components/common/Stepper";
import CartApiHandler from "../apiHandlers/CartApiHandler";
import { useParams } from "react-router-dom";
import NoImage from "../assets/placeholderImg-Small.jpeg";
import TabChanges from "../components/Tabchanges";
import IcpLogo from "../assets/IcpLogo";
import Invoice from "./admin/invoice";
import { useReactToPrint } from "react-to-print";
import LoadingScreen from "../components/common/LoadingScreen";

/* ----------------------------------------------------------------------------------------------------- */
/*  @  Base : MyOrderDetailPage.
/* ----------------------------------------------------------------------------------------------------- */
const MyOrderDetailPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Header title={"OrderDetails"}></Header>
      <MyOrderDetailContainerMain />
      <Footer></Footer>
    </AnimationView>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @  MyOrderDetailPage : <MyOrderContainerMain />.
/* ----------------------------------------------------------------------------------------------------- */
const MyOrderDetailContainerMain = () => {
  const { getOrderById, orderDetails, isLoading } = CartApiHandler();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { OrderDetailPageLoader } = LoadingScreen();

  const pathsForTabChanges = ["Home", "my-profile", "my-order", id];
  // Filter orderList from params
  useEffect(() => {
    getOrderById(id);
  }, []);

  console.log("orderDetails", orderDetails);

  const handleOpenInvoice = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="container mx-auto p-6 tracking-wider flex flex-col gap-6">
        {isLoading && <OrderDetailPageLoader />}
        {!isLoading && orderDetails === undefined && (
          <div>Invalid Order ID</div>
        )}
        {!isLoading && orderDetails && orderDetails !== null && (
          <>
            <TabChanges paths={pathsForTabChanges} />
            <DeliveryInfo
              shippingAddress={orderDetails.shippingAddress}
              handleOpenInvoice={handleOpenInvoice}
              orderStatus={orderDetails.orderStatus}
            />
            <DeliveryStepper orderStatus={orderDetails.orderStatus} />
            <OrderItemComp products={orderDetails.products} />
          </>
        )}
      </div>
      {/***********Invoice : hidden : open print section only on click */}
      {isOpen && (
        <div className="hidden">
          <Invoice
            userId={orderDetails?.id}
            userName={`${orderDetails?.shippingAddress?.firstname} ${orderDetails?.shippingAddress?.lastname}`}
            usermobile={orderDetails?.shippingAddress?.phone_number}
            useraddress={orderDetails?.shippingAddress?.addressline1}
            userpincode={orderDetails?.shippingAddress?.pincode}
            usercity={orderDetails?.shippingAddress?.city}
            userstate={orderDetails?.shippingAddress?.state}
            usercountry={orderDetails?.shippingAddress?.country}
            awb={orderDetails?.awb}
            paymentAddress={orderDetails?.paymentAddress}
            products={orderDetails?.products}
            orderId={orderDetails?.id}
            onAfterPrint={() => setIsOpen(false)}
          />
        </div>
      )}
    </>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @  MyOrderDetailPage : MyOrderContainerMain: <DeliveryInfo /> > Left 
/* ----------------------------------------------------------------------------------------------------- */
const DeliveryInfo = ({ shippingAddress, handleOpenInvoice, orderStatus }) => {
  return (
    <div className="flex border border-dashed  rounded-2xl border-gray-900 min-w-full max-sm:flex-col">
      <div className="sm:w-1/2 sm:border-r sm:border-r-gray-900 border-dashed max-sm:border-b max-sm:border-b-gray-900">
        <div className="flex flex-col gap-3 px-2 sm:px-8 py-4">
          <h3 className="font-medium text-lg">Delivery Address</h3>
          <h4 className="font-medium">
            {shippingAddress?.firstname} {shippingAddress?.lastname}
          </h4>
          <p className="text-sm">
            {shippingAddress?.addressline1},{shippingAddress?.addressline2},
            {shippingAddress?.pincode},{shippingAddress?.state}
          </p>
          <div className="flex gap-2 text-sm">
            <p className="font-medium">Email</p>
            <p>{shippingAddress?.email}</p>
          </div>
          <div className="flex gap-2 text-sm">
            <p className="font-medium">Phone Number</p>
            <p>{shippingAddress?.phone_number}</p>
          </div>
        </div>
      </div>
      <MoreActions
        handleOpenInvoice={handleOpenInvoice}
        orderStatus={orderStatus}
      />
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @  MyOrderDetailPage : MyOrderContainerMain: <DeliveryInfo /> > Right 
/* ----------------------------------------------------------------------------------------------------- */
const MoreActions = ({ handleOpenInvoice, orderStatus }) => {
  return (
    <div className="sm:w-1/2 ">
      <div className="flex flex-col gap-3 px-2 sm:px-8 py-4">
        <h3 className="font-medium text-lg">More Actions</h3>
        <div className="flex gap-2 text-sm">
          <p className="font-medium">Payment Status:</p>
          <p className="font-medium text-green-700">{orderStatus}</p>
        </div>
        <div className="flex gap-2 text-sm">
          <p className="font-medium">Delivery Status:</p>
          <p className="font-medium text-gray-700">Pending</p>
        </div>
        <div className="flex gap-2 text-sm">
          <Button
            className="p-2  rounded-md bg-black text-white font-medium"
            onClick={handleOpenInvoice}
          >
            Download Invoice
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @  MyOrderDetailPage : MyOrderContainerMain: <DeliveryStepper />  
/* ----------------------------------------------------------------------------------------------------- */
const DeliveryStepper = ({ orderStatus }) => {
  const labels = ["confirmed", "shipped", "out for delivery", "delivered"];

  const [isVertical, setIsVertical] = useState(window.innerWidth <= 768);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Effect : check Label index with orderStauts : setCureentStep
  useEffect(() => {
    const index = labels.indexOf(orderStatus);
    if (index !== -1) {
      setCurrentStep(index);
    }
  }, [orderStatus, labels]);

  const handleStepChange = (newStep) => {
    setCurrentStep(newStep);
  };

  return (
    <>
      <div className="text-xs font-semibold uppercase">Delivery Status</div>
      {orderStatus === "cancelled" ? (
        <div className="text-2xl border border-dashed border-gray-900 p-8 rounded-2xl">
          Your order has been cancelled!
        </div>
      ) : (
        <div
          className={`border border-dashed border-gray-900 rounded-2xl capitalize ${
            !isVertical ? "p-8" : null
          }`}
        >
          {isVertical ? (
            <VerticalStepperComponent
              labels={labels}
              // subLabels={subLabels}
              // showController={true}
              currentStep={currentStep}
              onStepChange={handleStepChange}
            />
          ) : (
            <HorizontalStepperComponent
              labels={labels}
              // subLabels={subLabels}
              // showController={true}
              currentStep={currentStep}
              onStepChange={handleStepChange}
            />
          )}
        </div>
      )}
    </>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @  MyOrderDetailPage : MyOrderContainerMain: <OrderItemComp />  
/* ----------------------------------------------------------------------------------------------------- */
const OrderItemComp = ({ products }) => {
  return (
    <div className="border-dashed border-gray-900 border rounded-2xl">
      <div className="flex flex-col">
        {products?.map((product, index) => (
          <div
            key={product?.id}
            // Don't need border-b for the last item
            className={`flex flex-col sm:flex-row gap-2 sm:items-center p-4 ${
              index !== products?.length - 1
                ? "border-b border-b-gray-900 border-dashed"
                : ""
            }`}
          >
            <div className="w-full sm:w-32 h-32">
              <img
                className="h-full w-full object-contain rounded-md"
                src={product?.img === "" ? NoImage : product?.img}
                alt={product?.title}
              />
            </div>
            <div className="flex flex-col gap-1 overflow-hidden flex-1">
              <p className="font-medium capitalize">
                {product?.title.length > 60
                  ? `${product?.title.substring(0, 60)}...`
                  : product?.title}
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Quantity: {product?.quantity}
              </p>
              <p className="text-xs text-gray-600 flex gap-2">
                Price:
                <span className="flex items-center gap-1">
                  <IcpLogo size={16} />
                  {product?.sale_price.toLocaleString()}
                </span>
              </p>
              <span className="text-xs text-gray-600 flex gap-4">
                <p>Size: {product?.size}</p>
                <p>Color: {product?.color}</p>
              </span>
              <span className="font-medium flex items-center gap-2">
                Total:
                <span className="flex gap-1">
                  <IcpLogo />
                  {(product?.quantity * product?.sale_price)?.toLocaleString()}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrderDetailPage;
