import React from "react";
import { useState, useEffect } from "react";
import { CiCircleCheck } from "react-icons/ci";
//import { useCanister } from "@connect2ic/react";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";
import { useAuth } from "../../auth/useClient";
import IcpLogo from "../../assets/dfinity.svg";

const Shipping = () => {
  const [amount, setAmount] = useState("");
  const { backend } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(true);

  const shippingAmount = async () => {
    try {
      const items = await backend.getshippingamount();
      console.log(items);
      setAmount(items.shipping_amount);
    } catch (error) {
      console.error("Error listing Amount:", error);
    } finally {
      setLoading1(false);
    }
  };

  const updateAmount = async () => {
    const parsedAmount = parseFloat(amount);
    if (parsedAmount < 0) {
      toast.error("Shipping Amount must be zero or greater than zero");
      return;
    }

    try {
      setLoading(true);
      const items = await backend.updateshippingamount({
        shipping_amount: parsedAmount,
      });
      console.log(items);
      if ("ok" in items) {
        setAmount(items.shipping_amount);
        toast.success("Shipping Amount updated successfully");
      } else {
        toast.error("Failed to update the shipping Amount");
      }
    } catch (error) {
      console.error("Error while updating Amount:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    shippingAmount();
  }, [backend]);

  return (
    <>
      <div>
        <div className="w-full">
          <div className="styled-scrollbar flex flex-col bg-white rounded-2xl overflow-y-auto h-[calc(100vh-100px)] p-4">
            <div className="mb-5 justify-between items-center gap-2">
              <h1 className="uppercase text-xl font-semibold text-gray-800">
                Shipping amount
              </h1>
              <div className="my-2">
                <div className="border-2 p-1 items-center outline-none border-[#F4F2F2] w-full rounded-lg flex">
                  {/* <IcpLogo size={24} /> */}
                  <img src={IcpLogo} alt="icp logo" className="w-4 h-4" />
                  <input
                    id="title"
                    type="number"
                    value={loading1 ? "loading...." : amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-2 outline-none border-none w-full rounded-lg"
                    placeholder="Enter Shipping Amount"
                  />
                </div>
                <div className="flex flex-col items-end justify-end gap-4 mt-6">
                  <button
                    onClick={updateAmount}
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
                    UPDATE AMOUNT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
