// Identity Kit
// import { useCanister, useConnect, useTransfer } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { Actor, HttpAgent } from "@dfinity/agent";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useClient";
// direct payment idl
// import { idlFactory } from "../wallet/ledger.did";
// transfer approve idl
import { idlFactory } from "../wallet/token-icp-ledger";
import { host, ids } from "../DevConfig";
import usePaymentTransfer from "../auth/usePaymentTransfer";
import { AccountIdentifier } from "@dfinity/ledger-icp";
import { useAgent, useIdentityKit } from "@nfid/identitykit/react";
import { fromHexString } from "@dfinity/candid";

const CartApiHandler = () => {
  const { principal, backend, refreshCart, setOrderPlacementLoad } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState(null);
  const [orderList, setOrderList] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [shippingAmount, setShippingAmount] = useState(null);
  const [orderPlacementData, setOrderPlacementData] = useState(null);
  const [checkOutClicked, setCheckoutClicked] = useState(0);
  const navigate = useNavigate();
  const { identity } = useIdentityKit();
  const authenticatedAgent = useAgent();

  // Direct payment
  // useEffect(() => {
  //   const paymentProcess = async () => {
  //     const actor = Actor.createActor(idlFactory, {
  //       agent: authenticatedAgent,
  //       canisterId: "ryjl3-tyaaa-aaaaa-aaaba-cai",
  //     });

  //     const destinationPrincipal =
  //       "l5yk2-7stgd-323wb-cjj7k-7sceo-t7szo-4uexa-wwzc5-vlsyw-isehy-3qe";
  //     const address = AccountIdentifier.fromPrincipal({
  //       principal: Principal.fromText(destinationPrincipal),
  //     }).toHex();

  //     const transferArgs = {
  //       to: fromHexString(address),
  //       fee: { e8s: BigInt(10000) },
  //       memo: BigInt(0),
  //       from_subaccount: [],
  //       created_at_time: [],
  //       amount: {
  //         e8s: BigInt(parseInt(orderPlacementData.totalAmount * 10 ** 8)),
  //       },
  //     };

  //     try {
  //       const response = await actor.transfer(transferArgs);
  //       console.log("transfer success response", response);
  //       try {
  //         if (response.Ok) finalizeOrder(orderPlacementData);
  //         else {
  //           console.error("Payment failed", response);
  //           toast.error("Payment failed, Please check your wallet balance");
  //         }
  //       } catch (err) {
  //         console.error("Transaction failed", err);
  //         toast.error("Transaction failed");
  //       }
  //     } catch (err) {
  //       console.error("transfer failed response", err);
  //       toast.error("Transaction failed", err);
  //     } finally {
  //       setOrderPlacementLoad(false);
  //     }
  //   };
  //   if (orderPlacementData) paymentProcess();
  // }, [orderPlacementData]);

  // Transfer approve payment
  useEffect(() => {
    const paymentProcess = async () => {
      const actor = Actor.createActor(idlFactory, {
        agent: authenticatedAgent,
        canisterId: "ryjl3-tyaaa-aaaaa-aaaba-cai",
      });

      // Acc info
      const acc = {
      owner: Principal.fromText(process.env.CANISTER_ID_MERCHSTORE_BACKEND),
          /* owner: Principal.fromText(
          "oavgn-aq63y-4ppgd-ws735-bqrrn-xdhtc-m3azu-6qga7-i4phr-c7nie-wqe"
        ), */
        subaccount: [],
      };

      const icrc2_approve_args = {
        from_subaccount: [],
        spender: acc,
        fee: [],
        memo: [],
        amount: BigInt(orderPlacementData.totalAmount * 10 ** 8 + 100000),
        created_at_time: [],
        expected_allowance: [],
        expires_at: [],
      };
      // console.log(orderPlacementData);
      //const amount = BigInt(orderPlacementData.totalAmount * 10 ** 8 + 10_000);
      //const totalamount = 210_000;
      const totalamount = BigInt(orderPlacementData.totalAmount * 10 ** 8);
      console.log("totalamount", totalamount);

      try {
        const response = await actor.icrc2_approve(icrc2_approve_args);
        console.log("Response from payment approve", response);
        try {
          if (response.Ok) {
            try {
              const finalOrderResponse = await backend.place_order(
                {
                  awb: orderPlacementData.awb,
                  paymentStatus: orderPlacementData.paymentStatus,
                  paymentMethod: orderPlacementData.paymentMethod,
                  shippingAmount: orderPlacementData.shippingAmount,
                  orderStatus: orderPlacementData.orderStatus,
                  userid: orderPlacementData.userid,
                  paymentAddress: response.Ok.toString(),
                  totalAmount: orderPlacementData.totalAmount,
                  shippingAddress: orderPlacementData.shippingAddress,
                  products: orderPlacementData.products,
                  subTotalAmount: orderPlacementData.subTotalAmount,
                },
                orderPlacementData.principal,
                totalamount,
                orderPlacementData.paymentOption
              );
              console.log("Final Order Response", finalOrderResponse);
              navigate("/order-confirm");
            } catch (err) {
              console.error("Error in final order", err);
            }
          } else {
            console.error("Payment failed", response);
            toast.error("Payment failed, Please check your wallet balance");
          }
        } catch (err) {
          console.error("Transaction failed", err);
          toast.error("Transaction failed");
        }
      } catch (err) {
        console.error("Error in transfer approve", err);
        toast.error("Failed in transfer approve");
      } finally {
        setOrderPlacementLoad(false);
      }
    };
    if (orderPlacementData) paymentProcess();
  }, [orderPlacementData]);

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
    // setOrderPlaceMentLoad(true);
    // {awb:text; paymentStatus:text; paymentMethod:text; shippingAmount:float64; orderStatus:text; userid:principal; paymentAddress:text; totalAmount:float64; shippingAddress:record {id:text; firstname:text; country:text; city:text; email:text; state:text; address_type:text; phone_number:text; pincode:text; lastname:text; addressline1:text; addressline2:text}; products:vec record {id:nat; color:text; size:text; sale_price:float64; quantity:nat8}; subTotalAmount:float64}) → (variant {ok:record {id:text; awb:text; timeUpdated:int; paymentStatus:text; paymentMethod:text; shippingAmount:float64; orderStatus:text; userid:principal; paymentAddress:text; timeCreated:int; totalAmount:float64; shippingAddress:record {id:text; firstname:text; country:text; city:text; email:text; state:text; address_type:text; phone_number:text; pincode:text; lastname:text; addressline1:text; addressline2:text}; products:vec record {id:nat; color:text; size:text; sale_price:float64; quantity:nat8}; subTotalAmount:float64};
    // If user not logged in :
    // console.log("principal is ", principal);
    setCheckoutClicked((prev) => prev + 1);
    // if (!principal) {
    //   toast.error("You need to login first");
    //   return;
    // }

    // const transformedTotal = Number(totalAmount * 10 ** 8);
    // console.log(transformedTotal);
    // setTotalAmountForTransfer(Math.round(transformedTotal));

    try {
      // const userid = principal;
      // Create Object Orderdetails
      const paymentOption = {
        [payment]: null,
      };

      const orderDetails = {
        awb: "awb_static",
        paymentStatus: "success",
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
        principal,
        totalAmount,
        paymentOption,
      };
      setOrderPlacementData(orderDetails);
      // console.log("Order details is ", orderDetails);
    } catch (err) {
      console.error("Error while transfering amount ", err);
    }
  };

  // Get Order List
  const getOrderList = async () => {
    try {
      setIsLoading(true);
      const response = await backend.listUserOrders(100, 0);
      console.log("getOrderList response ", response);
      setOrderList(response);
    } catch (err) {
      console.error("Failed to fetch user order list", err);
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
    // orderPlacementLoad,
    // setOrderPlaceMentLoad,
    shippingAmount,
    getShippingAmount,
    updateCart,
  };
};

export default CartApiHandler;

// // import { useCanister, useConnect, useTransfer } from "@connect2ic/react";
// import { Principal } from "@dfinity/principal";
// import { Actor, HttpAgent } from "@dfinity/agent";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../auth/useClient";
// import { idlFactory } from "../wallet/ledger.did";
// import { host, ids } from "../DevConfig";
// import usePaymentTransfer from "../auth/usePaymentTransfer";

// // Custom hook : initialize the backend Canister

// // Payment Address
// // const usePaymentTransfer = (totalAmount) => {
// //   // Receiver address will be in .env file : for now dev id
// //   const [transfer] = useTransfer({
// //     to: "uktss-xp5gu-uwif5-hfpwu-rujms-foroa-4zdkd-ofspf-uqqre-wxqyj-cqe",
// //     amount: Number(totalAmount),
// //   });
// //   return transfer;
// // };

// // CartApiHandler : main
// const CartApiHandler = () => {
//   // Init backend
//   // const { backend } = useBackend();
//   // const { principal } = useConnect();
//   const { principal, identity, backend, refreshCart, setOrderPlacementLoad } =
//     useAuth();
//   const [isLoading, setIsLoading] = useState(false);
//   const [cartItems, setCartItems] = useState(null);
//   const [orderList, setOrderList] = useState(null);
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [shippingAmount, setShippingAmount] = useState(null);
//   const [totalAmountForTransfer, setTotalAmountForTransfer] = useState(null);
//   // const paymentAddressForTransfer = usePaymentTransfer(totalAmountForTransfer);
//   const [orderPlacementData, setOrderPlacementData] = useState(null);
//   // const [orderPlacementLoad, setOrderPlaceMentLoad] = useState(false);
//   const { transfer, loading, error } = usePaymentTransfer();
//   const [checkOutClicked, setCheckoutClicked] = useState(0);
//   const navigate = useNavigate();

//   // const navigate = useNavigate();

//   // Effect arraning final data for payment
//   // useEffect(() => {
//   //   const paymentAddressProcess = async () => {
//   //     if (totalAmountForTransfer !== null) {
//   //       try {
//   //         const response = await paymentAddressForTransfer();
//   //         // If response undefined return
//   //         if (response === undefined) {
//   //           toast.error("Something went wrong");
//   //           return;
//   //         }
//   //         // Proceed : get height
//   //         const { height } = response;
//   //         const paymentId = height.toString();
//   //         setOrderPlacementData((prev) => ({
//   //           ...prev,
//   //           paymentAddress: paymentId,
//   //         }));
//   //       } catch (error) {
//   //         console.error("Error getting payment address:", error);
//   //       }
//   //     }
//   //   };
//   //   paymentAddressProcess();
//   // }, [totalAmountForTransfer]);

//   // Effect hook for final placement : Call backend
//   // useEffect(() => {
//   //   if (orderPlacementData) {
//   // const proceedFinalPayment = async () => {
//   //   setOrderPlaceMentLoad(true);
//   //   if (orderPlacementData.paymentAddress === null) return;
//   //   // Second verification : required???
//   //   if (orderPlacementData.paymentAddress === "") {
//   //     toast.error("Invalid payment Id!");
//   //     return;
//   //   }
//   //   // Proceed backend
//   //   try {
//   //     setOrderPlaceMentLoad(true);
//   //     const response = await backend.createOrder(orderPlacementData);
//   //     console.log("orderPlacement response ", response);
//   //     if (response.ok) {
//   //       toast.success("Order successfully Placed");
//   //       // Navigate to OrderConfirmationPage
//   //       navigate("/order-confirm");
//   //       // Clear cart after successful order placement
//   //       await backend.clearallcartitmesbyprincipal();
//   //     } else {
//   //       toast.error(Object.keys(response.err));
//   //       return;
//   //     }
//   //   } catch (err) {
//   //     toast.error("Failed to place order");
//   //     console.error("Error Order Placement", err);
//   //   } finally {
//   //     setOrderPlaceMentLoad(false);
//   //   }
//   // };
//   // proceedFinalPayment();
//   //   }
//   // }, [orderPlacementData]);

//   useEffect(() => {
//     const paymentAddressProcess = async () => {
//       console.log("Order placement data ", orderPlacementData);
//       if (totalAmountForTransfer !== null) {
//         // setOrderPlaceMentLoad(true);
//         try {
//           const response = await transfer(
//             "kws6j-lg7qz-4hnac-saj7i-l2i7g-i2rnx-zaby7-yvn5r-ggp37-ebev6-aae",
//             totalAmountForTransfer,
//             ""
//           );
//           console.log("response ", response);
//           // If response undefined return
//           if (response == undefined) {
//             toast.error("Something went wrong");
//             return;
//           }

//           if (response.err) {
//             toast.error("Failed to make payment");
//             return;
//           }
//           // Proceed : get height
//           const { height } = response;

//           // setOrderPlacementData((prev) => ({
//           //   ...prev,
//           //   paymentAddress: String(height?.height),
//           // }));
//           const updatedOrderPlacementData = {
//             ...orderPlacementData,
//             paymentAddress: String(height?.height),
//           };

//           console.log("Final order placement data", updatedOrderPlacementData);

//           if (
//             !updatedOrderPlacementData.paymentAddress ||
//             updatedOrderPlacementData.paymentAddress === "undefined"
//           ) {
//             toast.error("Invalid payment ID. Check your wallet!");
//             navigate("/cart");

//             return;
//           } else {
//             finalizeOrder(updatedOrderPlacementData);
//           }
//         } catch (error) {
//           console.error("Error getting payment address:", error);
//           toast.error("Please login first");
//           navigate("/login");
//           setOrderPlacementLoad(false);
//         }
//       }
//     };
//     paymentAddressProcess();
//   }, [totalAmountForTransfer, checkOutClicked]);

//   // console.log("order placementData", orderPlacementData);
//   // Get caller cart items

//   const getCallerCartItems = async () => {
//     try {
//       setIsLoading(true);
//       const response = await backend.getCallerCartItems(100, 0);
//       console.log("getCallerCartItems response ", response);
//       setCartItems(response.data);
//     } catch (err) {
//       console.error("Error Fetching Cart", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Finalize order
//   const finalizeOrder = async (data) => {
//     // console.log("Finalize order", data);
//     try {
//       const finalOrderResponse = await backend.createOrder(data);
//       console.log("Final Order Response ", finalOrderResponse);
//       navigate("/order-confirm");
//     } catch (err) {
//       console.error("Error After payment process", err);
//       toast.error("Payment failed! Check you wallet");
//     } finally {
//       setOrderPlacementLoad(false);
//     }
//   };

//   // GetShipping Amount
//   const getShippingAmount = async () => {
//     try {
//       setIsLoading(true);
//       const response = await backend.getshippingamount();
//       setShippingAmount(response.shipping_amount);
//     } catch (err) {
//       console.log("Shipping Amount error ", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Gether order placement data for proceed
//   const orderPlacement = async (
//     products,
//     shippingAddress,
//     totalAmount,
//     subTotal,
//     payment,
//     shippingCost
//   ) => {
//     // setOrderPlaceMentLoad(true);
//     // {awb:text; paymentStatus:text; paymentMethod:text; shippingAmount:float64; orderStatus:text; userid:principal; paymentAddress:text; totalAmount:float64; shippingAddress:record {id:text; firstname:text; country:text; city:text; email:text; state:text; address_type:text; phone_number:text; pincode:text; lastname:text; addressline1:text; addressline2:text}; products:vec record {id:nat; color:text; size:text; sale_price:float64; quantity:nat8}; subTotalAmount:float64}) → (variant {ok:record {id:text; awb:text; timeUpdated:int; paymentStatus:text; paymentMethod:text; shippingAmount:float64; orderStatus:text; userid:principal; paymentAddress:text; timeCreated:int; totalAmount:float64; shippingAddress:record {id:text; firstname:text; country:text; city:text; email:text; state:text; address_type:text; phone_number:text; pincode:text; lastname:text; addressline1:text; addressline2:text}; products:vec record {id:nat; color:text; size:text; sale_price:float64; quantity:nat8}; subTotalAmount:float64};
//     // If user not logged in :
//     // console.log("principal is ", principal);
//     setCheckoutClicked((prev) => prev + 1);
//     // if (!principal) {
//     //   toast.error("You need to login first");
//     //   return;
//     // }

//     const transformedTotal = Number(totalAmount * 10 ** 8);
//     console.log(transformedTotal);
//     setTotalAmountForTransfer(Math.round(transformedTotal));

//     try {
//       // const userid = principal;
//       // Create Object Orderdetails
//       const paymentOption = {
//         [payment]: null,
//       };

//       const orderDetails = {
//         awb: "testing",
//         paymentStatus: "success",
//         paymentMethod: payment,
//         shippingAmount: {
//           shipping_amount: shippingCost,
//         },
//         orderStatus: "confirmed",
//         userid: principal,
//         // Payment address is backend canister id? Or icp || ckbtc canister id?
//         paymentAddress: "",
//         totalAmount: totalAmount,
//         shippingAddress: shippingAddress,
//         products: products,
//         subTotalAmount: subTotal,
//         // From , To ,
//         // principal,
//         // To?
//         totalAmount,
//         paymentOption,
//       };
//       setOrderPlacementData(orderDetails);
//       // console.log("Order details is ", orderDetails);
//     } catch (err) {
//       console.error("Error while transfering amount ", err);
//     }

//     // setTotalAmountForTransfer(totalAmount);
//     // const userid = Principal.fromText(principal);

//     // const paymentCanister = getPaymentCanisterId(payment);
//     // const tokenActor = await createTokenActor(
//     //   Principal.fromText(paymentCanister)
//     // );
//     // const { metadata, balance } = await fetchMetadataAndBalance(
//     //   tokenActor,
//     //   principal
//     // );
//     // const formattedMetadata = formatTokenMetaData(metadata);
//     // // console.log("metaData is ", metadata);
//     // // console.log("balance is ", balance);
//     // console.log("metadata ", formattedMetadata);
//     // const parsedBalance = parseInt(balance, 10);
//     // console.log("Balance:", parsedBalance);
//     // transferApprove(
//     //   parsedBalance,
//     //   formattedMetadata,
//     //   tokenActor,
//     //   totalAmount,
//     //   orderDetails
//     // );
//   };

//   // const getPaymentCanisterId = (tokenType) => {
//   //   switch (tokenType) {
//   //     case "icp":
//   //       return ids.ICPtokenCan;
//   //     case "ckbtc":
//   //       return ids.ckBTCtokenCan;
//   //     default:
//   //       return null;
//   //   }
//   // };

//   // const fetchMetadataAndBalance = async (tokenActor, ownerPrincipal) => {
//   //   console.log(tokenActor, ownerPrincipal.toText());
//   //   try {
//   //     const [metadata, balance] = await Promise.all([
//   //       tokenActor.icrc1_metadata(),
//   //       tokenActor.icrc1_balance_of({
//   //         owner: ownerPrincipal,
//   //         subaccount: [],
//   //       }),
//   //     ]);
//   //     console.log("Fetched metadata:", metadata);
//   //     return { metadata, balance };
//   //   } catch (err) {
//   //     console.error("Error fetching metadata and balance:", err);
//   //     throw err;
//   //   }
//   // };

//   // /**************************** Payment Process ******************/
//   // const createTokenActor = async (canisterId) => {
//   //   console.log("identity in cartApiHandler: ", identity);
//   //   const agent = new HttpAgent({
//   //     identity,
//   //     host,
//   //   });
//   //   let tokenActor = Actor.createActor(idlFactory, {
//   //     agent,
//   //     canisterId,
//   //   });

//   //   return tokenActor;
//   // };

//   // const formatTokenMetaData = (arr) => {
//   //   const resultObject = {};
//   //   arr.forEach((item) => {
//   //     const key = item[0];
//   //     const value = item[1][Object.keys(item[1])[0]];
//   //     resultObject[key] = value;
//   //   });
//   //   return resultObject;
//   // };

//   // const transferApprove = async (
//   //   currentBalance,
//   //   currentMetaData,
//   //   tokenActor,
//   //   totalAmount,
//   //   orderDetails
//   // ) => {
//   //   try {
//   //     const decimals = parseInt(currentMetaData["icrc1:decimals"], 10);
//   //     // const sendableAmount = parseInt(
//   //     //   ((price_share * quantity) / exchange) * Math.pow(10, decimals),
//   //     //   10
//   //     // );
//   //     const sendableAmount = parseInt(totalAmount * Math.pow(10, decimals), 10);

//   //     console.log("sendable amount console ", sendableAmount);
//   //     console.log("current balance console ", currentBalance);
//   //     if (currentBalance > sendableAmount) {
//   //       let transaction = {
//   //         from_subaccount: [],
//   //         spender: {
//   //           owner: Principal.fromText(ids.backendCan),
//   //           subaccount: [],
//   //         },
//   //         amount: Number(sendableAmount) + Number(currentMetaData["icrc1:fee"]),
//   //         expected_allowance: [],
//   //         expires_at: [],
//   //         fee: [currentMetaData["icrc1:fee"]],
//   //         memo: [],
//   //         created_at_time: [],
//   //       };
//   //       console.log("transaction ", transaction);
//   //       // console.log("Token Actor ICRC2 APPROVE", tokenActor.icrc2_approve);
//   //       const approveRes = await tokenActor.icrc2_approve(transaction);
//   //       console.log("Payment Approve Response ", approveRes);
//   //       if (approveRes.Err) {
//   //         const errorMessage = `Insufficient funds. Balance: ${approveRes.Err.InsufficientFunds.balance}`;
//   //         toast.error(errorMessage);
//   //         return;
//   //       } else {
//   //         afterPaymentApprove(
//   //           parseInt(approveRes?.Ok).toString(),
//   //           sendableAmount,
//   //           currentBalance
//   //         );
//   //         afterPaymentApprove(orderDetails);
//   //       }
//   //     } else {
//   //       console.log("Insufficient Balance to purchase");
//   //       toast.error(
//   //         `Insufficient balance. Balance : ${currentBalance / 10 ** 8}`
//   //       );
//   //     }
//   //   } catch (err) {
//   //     console.error("Error in transfer approve", err);
//   //   } finally {
//   //   }
//   // };

//   // // After payment approve
//   // const afterPaymentApprove = async (orderDetails) => {
//   //   console.log("Payment Approve done!!");
//   //   console.log("order confirming..........");
//   //   try {
//   //     const response = await backend.place_order(orderDetails);
//   //     console.log("response after order confirm ", response);
//   //   } catch (err) {
//   //     console.error("Failed to get response after order confirm ", err);
//   //   } finally {
//   //   }
//   // };

//   // Get Order List
//   const getOrderList = async () => {
//     try {
//       setIsLoading(true);
//       const response = await backend.listUserOrders(100, 0);
//       console.log("getOrderList response ", response);
//       setOrderList(response);
//     } catch (err) {
//       console.error("Failed to fetch user order list", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Get individual Order
//   const getOrderById = async (id) => {
//     try {
//       setIsLoading(true);
//       const response = await backend.getOrder(id);
//       console.log("getOrderById response ", response);
//       setOrderDetails(response.ok);
//     } catch (err) {
//       console.error("Error fetching order", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Delte Cart Item
//   const deleteCartItemById = async (
//     id,
//     size,
//     color,
//     setDeleteLoad,
//     setSuccessDelete,
//     closeModel
//   ) => {
//     try {
//       setDeleteLoad(true);
//       const response = await backend.deleteCartItems(id, size, color);
//       console.log("Delete cart item response ", response);
//       toast.success("Item removed successfully");
//     } catch (err) {
//       toast.error("Failed to remove item");
//       console.error(err);
//     } finally {
//       setDeleteLoad(false);
//       setSuccessDelete(false);
//       refreshCart();
//       closeModel();
//     }
//   };

//   // Update cart
//   const updateCart = async (id, quantity, color, size) => {
//     try {
//       setIsLoading(true);
//       await backend.updateCartItems(id, quantity, size, color);
//     } catch (err) {
//       console.error("error updating cart ", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Effects
//   // useEffect(() => {
//   //   getExchangeRate();
//   // }, [backend]);

//   // Returns
//   return {
//     getCallerCartItems,
//     orderPlacement,
//     getOrderList,
//     getOrderById,
//     isLoading,
//     cartItems,
//     orderList,
//     orderDetails,
//     deleteCartItemById,
//     // orderPlacementLoad,
//     // setOrderPlaceMentLoad,
//     shippingAmount,
//     getShippingAmount,
//     updateCart,
//   };
// };

// export default CartApiHandler;
