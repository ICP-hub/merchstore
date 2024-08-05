// import { useCanister, useConnect, useTransfer } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { Actor, HttpAgent } from "@dfinity/agent";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useClient";
import { idlFactory } from "../wallet/ledger.did";
import { host, ids } from "../DevConfig";

// Custom hook : initialize the backend Canister

// Payment Address
// const usePaymentTransfer = (totalAmount) => {
//   // Receiver address will be in .env file : for now dev id
//   const [transfer] = useTransfer({
//     to: "uktss-xp5gu-uwif5-hfpwu-rujms-foroa-4zdkd-ofspf-uqqre-wxqyj-cqe",
//     amount: Number(totalAmount),
//   });
//   return transfer;
// };

// CartApiHandler : main
const CartApiHandler = () => {
  // Init backend
  // const { backend } = useBackend();
  // const { principal } = useConnect();
  const { principal, identity, backend, refreshCart } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState(null);
  const [orderList, setOrderList] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [shippingAmount, setShippingAmount] = useState(null);
  const [totalAmountForTransfer, setTotalAmountForTransfer] = useState(null);
  // const paymentAddressForTransfer = usePaymentTransfer(totalAmountForTransfer);
  const [orderPlacementData, setOrderPlacementData] = useState(null);
  const [orderPlacementLoad, setOrderPlaceMentLoad] = useState(false);

  // const navigate = useNavigate();

  // Effect arraning final data for payment
  // useEffect(() => {
  //   const paymentAddressProcess = async () => {
  //     if (totalAmountForTransfer !== null) {
  //       try {
  //         const response = await paymentAddressForTransfer();
  //         // If response undefined return
  //         if (response === undefined) {
  //           toast.error("Something went wrong");
  //           return;
  //         }
  //         // Proceed : get height
  //         const { height } = response;
  //         const paymentId = height.toString();
  //         setOrderPlacementData((prev) => ({
  //           ...prev,
  //           paymentAddress: paymentId,
  //         }));
  //       } catch (error) {
  //         console.error("Error getting payment address:", error);
  //       }
  //     }
  //   };
  //   paymentAddressProcess();
  // }, [totalAmountForTransfer]);

  // Effect hook for final placement : Call backend
  // useEffect(() => {
  //   if (orderPlacementData) {
  // const proceedFinalPayment = async () => {
  //   setOrderPlaceMentLoad(true);
  //   if (orderPlacementData.paymentAddress === null) return;
  //   // Second verification : required???
  //   if (orderPlacementData.paymentAddress === "") {
  //     toast.error("Invalid payment Id!");
  //     return;
  //   }
  //   // Proceed backend
  //   try {
  //     setOrderPlaceMentLoad(true);
  //     const response = await backend.createOrder(orderPlacementData);
  //     console.log("orderPlacement response ", response);
  //     if (response.ok) {
  //       toast.success("Order successfully Placed");
  //       // Navigate to OrderConfirmationPage
  //       navigate("/order-confirm");
  //       // Clear cart after successful order placement
  //       await backend.clearallcartitmesbyprincipal();
  //     } else {
  //       toast.error(Object.keys(response.err));
  //       return;
  //     }
  //   } catch (err) {
  //     toast.error("Failed to place order");
  //     console.error("Error Order Placement", err);
  //   } finally {
  //     setOrderPlaceMentLoad(false);
  //   }
  // };
  // proceedFinalPayment();
  //   }
  // }, [orderPlacementData]);

  // Get caller cart items
  const getCallerCartItems = async () => {
    try {
      setIsLoading(true);
      const response = await backend.getCallerCartItems(100, 0);
      console.log("getCallerCartItems response ", response);
      setCartItems(response.data);
    } catch (err) {
      console.error("Error Fetching Cart", err);
    } finally {
      setIsLoading(false);
    }
  };

  // GetShipping Amount
  const getShippingAmount = async () => {
    try {
      setIsLoading(true);
      const response = await backend.getshippingamount();
      setShippingAmount(response.shipping_amount);
    } catch (err) {
      console.log("Shipping Amount error ", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Gether order placement data for proceed
  const orderPlacement = async (
    products,
    shippingAddress,
    totalAmount,
    subTotal,
    payment,
    shippingCost
  ) => {
    // {awb:text; paymentStatus:text; paymentMethod:text; shippingAmount:float64; orderStatus:text; userid:principal; paymentAddress:text; totalAmount:float64; shippingAddress:record {id:text; firstname:text; country:text; city:text; email:text; state:text; address_type:text; phone_number:text; pincode:text; lastname:text; addressline1:text; addressline2:text}; products:vec record {id:nat; color:text; size:text; sale_price:float64; quantity:nat8}; subTotalAmount:float64}) → (variant {ok:record {id:text; awb:text; timeUpdated:int; paymentStatus:text; paymentMethod:text; shippingAmount:float64; orderStatus:text; userid:principal; paymentAddress:text; timeCreated:int; totalAmount:float64; shippingAddress:record {id:text; firstname:text; country:text; city:text; email:text; state:text; address_type:text; phone_number:text; pincode:text; lastname:text; addressline1:text; addressline2:text}; products:vec record {id:nat; color:text; size:text; sale_price:float64; quantity:nat8}; subTotalAmount:float64};
    // If user not logged in :
    console.log("principal is ", principal);
    if (principal === undefined) {
      toast.error("You need to login first");
      return;
    }
    setTotalAmountForTransfer(totalAmount);
    // const userid = Principal.fromText(principal);
    // const userid = principal;
    // Create Object Orderdetails
    const paymentOption = {
      [payment]: null,
    };

    const orderDetails = {
      awb: "testing",
      paymentStatus: "testing",
      paymentMethod: payment,
      shippingAmount: {
        shipping_amount: shippingCost,
      },
      orderStatus: "confirmed",
      userid: principal,
      // Payment address is backend canister id? Or icp || ckbtc canister id?
      paymentAddress: "",
      totalAmount: totalAmount,
      shippingAddress: shippingAddress,
      products: products,
      subTotalAmount: subTotal,
      // From , To ,
      principal,
      // To?
      totalAmount,
      paymentOption,
    };
    // setOrderPlacementData(orderDetails);
    console.log("Order details is ", orderDetails);

    const paymentCanister = getPaymentCanisterId(payment);
    const tokenActor = await createTokenActor(
      Principal.fromText(paymentCanister)
    );
    const { metadata, balance } = await fetchMetadataAndBalance(
      tokenActor,
      principal
    );
    const formattedMetadata = formatTokenMetaData(metadata);
    // console.log("metaData is ", metadata);
    // console.log("balance is ", balance);
    console.log("metadata ", formattedMetadata);
    const parsedBalance = parseInt(balance, 10);
    console.log("Balance:", parsedBalance);
    transferApprove(
      parsedBalance,
      formattedMetadata,
      tokenActor,
      totalAmount,
      orderDetails
    );
  };

  const getPaymentCanisterId = (tokenType) => {
    switch (tokenType) {
      case "icp":
        return ids.ICPtokenCan;
      case "ckbtc":
        return ids.ckBTCtokenCan;
      default:
        return null;
    }
  };

  const fetchMetadataAndBalance = async (tokenActor, ownerPrincipal) => {
    console.log(tokenActor, ownerPrincipal.toText());
    try {
      const [metadata, balance] = await Promise.all([
        tokenActor.icrc1_metadata(),
        tokenActor.icrc1_balance_of({
          owner: ownerPrincipal,
          subaccount: [],
        }),
      ]);
      console.log("Fetched metadata:", metadata);
      return { metadata, balance };
    } catch (err) {
      console.error("Error fetching metadata and balance:", err);
      throw err;
    }
  };

  /**************************** Payment Process ******************/
  const createTokenActor = async (canisterId) => {
    console.log("identity in cartApiHandler: ", identity);
    const agent = new HttpAgent({
      identity,
      host,
    });
    let tokenActor = Actor.createActor(idlFactory, {
      agent,
      canisterId,
    });

    return tokenActor;
  };

  const formatTokenMetaData = (arr) => {
    const resultObject = {};
    arr.forEach((item) => {
      const key = item[0];
      const value = item[1][Object.keys(item[1])[0]];
      resultObject[key] = value;
    });
    return resultObject;
  };

  const transferApprove = async (
    currentBalance,
    currentMetaData,
    tokenActor,
    totalAmount,
    orderDetails
  ) => {
    try {
      const decimals = parseInt(currentMetaData["icrc1:decimals"], 10);
      // const sendableAmount = parseInt(
      //   ((price_share * quantity) / exchange) * Math.pow(10, decimals),
      //   10
      // );
      const sendableAmount = parseInt(totalAmount * Math.pow(10, decimals), 10);

      console.log("sendable amount console ", sendableAmount);
      console.log("current balance console ", currentBalance);
      if (currentBalance > sendableAmount) {
        let transaction = {
          from_subaccount: [],
          spender: {
            owner: Principal.fromText(ids.backendCan),
            subaccount: [],
          },
          amount: Number(sendableAmount) + Number(currentMetaData["icrc1:fee"]),
          expected_allowance: [],
          expires_at: [],
          fee: [currentMetaData["icrc1:fee"]],
          memo: [],
          created_at_time: [],
        };
        console.log("transaction ", transaction);
        // console.log("Token Actor ICRC2 APPROVE", tokenActor.icrc2_approve);
        const approveRes = await tokenActor.icrc2_approve(transaction);
        console.log("Payment Approve Response ", approveRes);
        if (approveRes.Err) {
          const errorMessage = `Insufficient funds. Balance: ${approveRes.Err.InsufficientFunds.balance}`;
          toast.error(errorMessage);
          return;
        } else {
          afterPaymentApprove(
            parseInt(approveRes?.Ok).toString(),
            sendableAmount,
            currentBalance
          );
          afterPaymentApprove(orderDetails);
        }
      } else {
        console.log("Insufficient Balance to purchase");
        toast.error(
          `Insufficient balance. Balance : ${currentBalance / 10 ** 8}`
        );
      }
    } catch (err) {
      console.error("Error in transfer approve", err);
    } finally {
    }
  };

  // After payment approve
  const afterPaymentApprove = async (orderDetails) => {
    console.log("Payment Approve done!!");
    console.log("order confirming..........");
    try {
      const response = await backend.place_order(orderDetails);
      console.log("response after order confirm ", response);
    } catch (err) {
      console.error("Failed to get response after order confirm ", err);
    } finally {
    }
  };

  // Get Order List
  const getOrderList = async () => {
    try {
      setIsLoading(true);
      const response = await backend.listUserOrders();
      console.log("getOrderList response ", response);
      setOrderList(response);
    } catch (err) {
      console.error("Failed to fetch user order list");
    } finally {
      setIsLoading(false);
    }
  };

  // Get individual Order
  const getOrderById = async (id) => {
    try {
      setIsLoading(true);
      const response = await backend.getOrder(id);
      console.log("getOrderById response ", response);
      setOrderDetails(response.ok);
    } catch (err) {
      console.error("Error fetching order", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delte Cart Item
  const deleteCartItemById = async (
    id,
    size,
    color,
    setDeleteLoad,
    setSuccessDelete,
    closeModel
  ) => {
    try {
      setDeleteLoad(true);
      const response = await backend.deleteCartItems(id, size, color);
      console.log("Delete cart item response ", response);
      toast.success("Item removed successfully");
    } catch (err) {
      toast.error("Failed to remove item");
      console.error(err);
    } finally {
      setDeleteLoad(false);
      setSuccessDelete(false);
      refreshCart();
      closeModel();
    }
  };

  // Update cart
  const updateCart = async (id, quantity, color, size) => {
    try {
      setIsLoading(true);
      await backend.updateCartItems(id, quantity, size, color);
    } catch (err) {
      console.error("error updating cart ", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Effects
  // useEffect(() => {
  //   getExchangeRate();
  // }, [backend]);

  // Returns
  return {
    getCallerCartItems,
    orderPlacement,
    getOrderList,
    getOrderById,
    isLoading,
    cartItems,
    orderList,
    orderDetails,
    deleteCartItemById,
    orderPlacementLoad,
    shippingAmount,
    getShippingAmount,
    updateCart,
  };
};

export default CartApiHandler;
