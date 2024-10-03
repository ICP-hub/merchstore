import React from "react";
import AnimationView from "../components/common/AnimationView";
import ScrollToTop from "../components/common/ScrollToTop";
import Header from "../components/common/Header";
import Hero from "../components/common/Hero";
import Footer from "../components/common/Footer";
import { Tabs } from "../components/MyProfilePageComponents/MyProTabs";
import { BsQrCodeScan } from "react-icons/bs";
import Button from "../components/common/Button";
import { useEffect, useState } from "react";

import Avatar from "boring-avatars";
import toast from "react-hot-toast";
import { RiCheckLine, RiFileCopyLine } from "react-icons/ri";
import useClipboard from "react-use-clipboard";
import { TailSpin } from "react-loader-spinner";
import { CommonInput } from "../components/common/InputFields";
import { useAuth } from "../auth/useClient";
import { useIdentityKit } from "@nfid/identitykit/react";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Base Components: MyProfilePage.
/* ----------------------------------------------------------------------------------------------------- */

const MyProfilePage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Header title={"AccountInfo"}></Header>
      <MyProfilePageContainerMain />
      <Footer></Footer>
    </AnimationView>
  );
};

const MyProfilePageContainerMain = () => {
  return (
    <div className="container mx-auto py-6 tracking-wider">
      <div className="flex max-md:flex-col p-6 gap-6">
        <Tabs />
        <MyProAccount />
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @  MyProfilePageContainerMain : MyProAccount.
/* ----------------------------------------------------------------------------------------------------- */
const MyProAccount = () => {
  // const { principal, isConnected } = useConnect();

  // const [backend] = useCanister("backend");
  // const { backend } = useBackend();
  const { principal, isConnected, backend } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const [email, setEmail] = useState(""); // Add state for email
  const [firstName, setFirstName] = useState(""); // Add state for FirstName
  const [lastName, setLastName] = useState(""); // Add state for LastName
  const [user, setUser] = useState([]); // Add  state user
  const [inputsDisabled, setInputsDisabled] = useState(true);
  const { identity } = useIdentityKit();
  const [isCopied, setCopied] = useClipboard(principal, {
    successDuration: 1000,
  });

  const validateForm = () => {
    if (!firstName.trim()) {
      toast.error("Please enter first name");
      return false;
    }
    if (!lastName.trim()) {
      toast.error("Please enter last name");
      return false;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const getUser = async () => {
    try {
      setLoading2(true);
      setInputsDisabled(false);
      const item = await backend.getUserdetailsbycaller();

      if (item.ok) {
        setEmail(item.ok.email);
        setFirstName(item.ok.firstName);
        setLastName(item.ok.lastName);
        setUser(item.ok);
        setInputsDisabled(true);
        console.log(item.ok);
      }
    } catch (error) {
      console.error("Error listing user:", error);
    } finally {
      setLoading2(false);
    }
  };
  console.log(user?.id?.toText(), "user");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getUser();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [backend]);

  const updateProfileHandler = async () => {
    try {
      if (!validateForm()) {
        return;
      }
      setLoading(true);

      // Log input values for debugging
      //console.log("Updating profile with:", email, firstName, lastName)

      const res = await backend.updateUser(email, firstName, lastName);

      // Log the entire response for debugging
      console.log("Response from backend:", res);

      if ("ok" in res) {
        toast.success("Profile Successfully Updated.");
        setInputsDisabled(true);
        // getUser()
      } else {
        // Display error message
        toast.error("Profile update failed. Please try again.");
        console.error("Unexpected response from backend:", res);
      }
    } catch (error) {
      // Log and display error message
      console.error("An error occurred while updating profile:", error);
      toast.error(
        "An error occurred while updating profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full border border-gray-300 rounded-2xl tracking-normal">
      <div className="flex justify-between items-center border-b px-2 sm:px-4 py-2">
        <h1 className="font-medium text-lg">My Profile</h1>
        <Button
          className="bg-black text-white px-4 py-2 rounded-full"
          onClick={() => setInputsDisabled(!inputsDisabled)}
        >
          Edit Profile
        </Button>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-start items-center gap-4 px-2 sm:px-4 py-4">
        <div className="w-full md:w-1/4 flex flex-col items-center justify-center gap-3">
          <div className="rounded-full w-[100px]">
            <Avatar
              size={100}
              name={principal?.toText()}
              variant="beam"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
          </div>
          <h4 className="text-center font-semibold text-gray-900 text-lg">
            {loading2 ? (
              <span className="animate-pulse bg-gray-300 h-[20px] w-[150px] rounded-full"></span>
            ) : (
              `${firstName} ${lastName}`
            )}
          </h4>
        </div>
        <div className="w-full md:w-3/4 flex flex-col gap-3">
          <div className="flex gap-4">
            <CommonInput
              type="text"
              label="first name"
              placeholder="first name"
              divClass={loading2 && ` animate-pulse`}
              value={loading2 ? "please wait..." : firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={inputsDisabled}
            />
            <CommonInput
              label="Last Name"
              type="text"
              placeholder="last name"
              divClass={loading2 && ` animate-pulse`}
              value={loading2 ? "please wait..." : lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={inputsDisabled}
            />
          </div>
          <CommonInput
            label="Email"
            type="text"
            placeholder="email"
            divClass={loading2 && ` animate-pulse`}
            value={loading2 ? "please wait..." : email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={inputsDisabled}
          />
          <div className="relative pr-9">
            <CommonInput
              label="Principal ID"
              type="text"
              className="pr-8"
              placeholder="principal id"
              value={principal}
              disabled={true}
            />
            <button
              onClick={() => {
                setCopied();
                toast.success("Principal copied successfully");
              }}
              className="absolute bottom-2 right-2 text-gray-400"
            >
              {isCopied ? (
                <RiCheckLine className="w-5 h-5 text-emerald-500" />
              ) : (
                <RiFileCopyLine className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
          {/* <CommonInput
            label="Wallet Amount"
            type="text"
            placeholder="amount"
            disabled={inputsDisabled}
          /> */}
          {/* <TelephoneInput
          label="Phone Number"
          divClass="border border-gray-300 rounded-full bg-white mb-4"
          inputClass="focus:outline-none py-2 px-0 h-[38px] placeholder:font-light"
          disabled={inputsDisabled}
        /> */}
          {/*           {!inputsDisabled && ( */}

          <Button
            className={`sm:w-48 w-full text-white bg-gray-900 p-2 rounded-full mt-1 flex gap-2 justify-center ${
              inputsDisabled && "opacity-50"
            } ${loading && "opacity-50"}`}
            onClick={updateProfileHandler}
            disabled={inputsDisabled || loading}
          >
            {loading && (
              <TailSpin
                height="20"
                width="20"
                color="white"
                ariaLabel="tail-spin-loading"
                radius="1"
                visible={true}
              />
            )}{" "}
            Update My Profile
          </Button>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
