import React, { useContext, useEffect, useRef, useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";
import WELCOME from "../assets/welcome.svg";
import WAVES from "vanta/dist/vanta.waves.min";
import Button from "../components/common/Button";
import LOGO from "../assets/logo.svg";
import toast from "react-hot-toast";
import AnimationView from "../components/common/AnimationView";
import { TiChevronLeftOutline } from "react-icons/ti";
import { PiWalletBold } from "react-icons/pi";
import { useAuth } from "../auth/useClient";
import WalletModal from "../components/common/WalletModal";
import {
  ConnectedWalletButton,
  ConnectWallet,
  ConnectWalletButton,
  ConnectWalletDropdownMenu,
  IdentityKitContext,
  IdentityKitProvider,
  IdentityKitTheme,
  useIdentityKit,
} from "@nfid/identitykit/react";

export default function LoginPage() {
  // const { open } = useDialog();
  // const { isConnected, disconnect } = useConnect()
  const { isConnected, login } = useAuth();
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const handleWalletModalOpen = () => setIsLoggedIn(true);
  // const handleWalletModalClose = () => setIsLoggedIn(false);

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

  // const loginHandler = () => {
  //   // open();
  //   login("ii");
  // };

  const logoutHandler = () => {
    disconnect();
    toast.success("Logout successfully.");
  };
  // console.log(isConnected);
  // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // const toggleLoginModal = () => {
  //   // setIsLoginModalOpen((prev) => !prev);
  // };

  // useEffect(() => {
  //   let modal = document.getElementById("ik-identity-kit-modal");
  //   if (isLoginModalOpen) {
  //     modal.classList.remove("ik-hidden");
  //   } else {
  //     modal.classList.add("ik-hidden");
  //   }
  // }, [isLoginModalOpen]);

  return (
    <>
      {/* {isLoggedIn && <WalletModal onModalClose={handleWalletModalClose} />} */}
      {isConnected ? (
        <Navigate to="/" replace={true}></Navigate>
      ) : null}
      <AnimationView>
        <div
          ref={myRef}
          className="w-full h-screen flex justify-center items-center px-6"
        >
          <div className="w-full md:w-1/2 bg-white/50 backdrop-blur-sm p-2 rounded-2xl border-[1px] shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-10 rounded-xl flex flex-col items-center justify-center">
                <img src={LOGO} alt={"Logo"} className="h-[50px] mb-2" />
                <p className="text-xl md:text-2xl font-bold text-center">
                  Connect Your Wallet!
                </p>
                <p className="text-xs text-gray-700 mb-10 text-center">
                  Select what wallet you want to connect below
                </p>

                <ConnectWallet
                  connectButtonComponent={ConnectBtn}
                  className="rounded-full bg-black"
                />

                {/* {!isConnected && (
                  <Button
                    // onClick={handleWalletModalOpen}
                    onClick={login}
                    className="w-full rounded-full text-white font-semibold bg-black border border-black px-4 py-2 mb-3 flex justify-center items-center gap-1.5"
                  >
                    <PiWalletBold className="w-5 h-5" /> Connect Your Wallet
                  </Button>
                )}
                {isConnected && (
                  <Button
                    onClick={logoutHandler}
                    className="w-full rounded-full text-white font-semibold bg-black border border-black px-4 py-2 mb-3 flex justify-center items-center"
                  >
                    <PiWalletBold className="w-5 h-5" />
                    Disconnect
                  </Button>
                )} */}
                <Button
                  onClick={() => navigate("/")}
                  className="w-full rounded-full text-black font-semibold bg-white border border-white px-4 py-2 flex justify-center items-center text-md"
                >
                  <TiChevronLeftOutline className="w-5 h-5" />
                  Return to Home
                </Button>
              </div>
              <div className="bg-black p-10 rounded-xl flex items-center justify-center hidden md:block overflow-hidden">
                <img src={WELCOME} alt={"Welcome"} className="" />
              </div>
            </div>
          </div>
        </div>
      </AnimationView>
    </>
  );
}

const ConnectBtn = ({ onClick, ...props }) => {
  const navigate = useNavigate();
  const processClick = () => {
    onClick();
  };

  return (
    <Button
      onClick={processClick}
      className="w-full rounded-full text-white font-semibold bg-black border border-black px-4 py-2 mb-3 flex justify-center items-center gap-1.5"
    >
      <PiWalletBold className="w-5 h-5" /> Connect Your Wallet
    </Button>
  );
};

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

// Login  plug
// import React, { useEffect, useRef, useState } from "react";

// import { Navigate, useNavigate } from "react-router-dom";
// import WELCOME from "../assets/welcome.svg";
// import WAVES from "vanta/dist/vanta.waves.min";
// import Button from "../components/common/Button";
// import LOGO from "../assets/logo.svg";
// import toast from "react-hot-toast";
// import AnimationView from "../components/common/AnimationView";
// import { TiChevronLeftOutline } from "react-icons/ti";
// import { PiWalletBold } from "react-icons/pi";
// import { useAuth } from "../auth/useClient";
// import WalletModal from "../components/common/WalletModal";

// export default function LoginPage() {
//   // const { open } = useDialog();
//   // const { isConnected, disconnect } = useConnect()
//   const { isConnected, disconnect, login } = useAuth();
//   const [vantaEffect, setVantaEffect] = useState(null);
//   const myRef = useRef(null);
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const handleWalletModalOpen = () => setIsLoggedIn(true);
//   const handleWalletModalClose = () => setIsLoggedIn(false);

//   useEffect(() => {
//     let intervalId;

//     if (!vantaEffect) {
//       // Apply the smooth background transition class initially
//       myRef.current.classList.add("smooth-bg");

//       setVantaEffect(
//         WAVES({
//           el: myRef.current,
//           color: getRandomColor(), // Set initial color
//         })
//       );
//     }

//     const changeColor = () => {
//       setVantaEffect((prevEffect) => {
//         prevEffect.setOptions({ color: getRandomColor() });
//         return prevEffect;
//       });
//     };

//     const startColorChange = () => {
//       intervalId = setInterval(changeColor, 10000); // Change color every 10 seconds
//     };

//     startColorChange();

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, [vantaEffect]);

//   // const loginHandler = () => {
//   //   // open();
//   //   login("ii");
//   // };

//   const logoutHandler = () => {
//     disconnect();
//     toast.success("Logout successfully.");
//   };
//   // console.log(isConnected);

//   return (
//     <>
//       {/* {isLoggedIn && <WalletModal onModalClose={handleWalletModalClose} />} */}
//       {isConnected ? (
//         <Navigate to="/my-profile" replace={true}></Navigate>
//       ) : null}
//       <AnimationView>
//         <div
//           ref={myRef}
//           className="w-full h-screen flex justify-center items-center px-6"
//         >
//           <div className="w-full md:w-1/2 bg-white/50 backdrop-blur-sm p-2 rounded-2xl border-[1px] shadow-lg">
//             <div className="grid grid-cols-1 md:grid-cols-2">
//               <div className="p-10 rounded-xl flex flex-col items-center justify-center">
//                 <img src={LOGO} alt={"Logo"} className="h-[50px] mb-2" />
//                 <p className="text-xl md:text-2xl font-bold text-center">
//                   Connect Your Wallet!
//                 </p>
//                 <p className="text-xs text-gray-700 mb-10 text-center">
//                   Select what wallet you want to connect below
//                 </p>
//                 {!isConnected && (
//                   <Button
//                     // onClick={handleWalletModalOpen}
//                     onClick={login}
//                     className="w-full rounded-full text-white font-semibold bg-black border border-black px-4 py-2 mb-3 flex justify-center items-center gap-1.5"
//                   >
//                     <PiWalletBold className="w-5 h-5" /> Connect Your Wallet
//                   </Button>
//                 )}
//                 {isConnected && (
//                   <Button
//                     onClick={logoutHandler}
//                     className="w-full rounded-full text-white font-semibold bg-black border border-black px-4 py-2 mb-3 flex justify-center items-center"
//                   >
//                     <PiWalletBold className="w-5 h-5" />
//                     Disconnect
//                   </Button>
//                 )}
//                 <Button
//                   onClick={() => navigate("/")}
//                   className="w-full rounded-full text-black font-semibold bg-white border border-white px-4 py-2 flex justify-center items-center"
//                 >
//                   <TiChevronLeftOutline className="w-5 h-5" />
//                   Return to Home
//                 </Button>
//               </div>
//               <div className="bg-black p-10 rounded-xl flex items-center justify-center hidden md:block overflow-hidden">
//                 <img src={WELCOME} alt={"Welcome"} className="h-full" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </AnimationView>
//     </>
//   );
// }

// const getRandomColor = () => {
//   const minDarkness = 20; // Minimum darkness level (0-255)
//   const maxDarkness = 100; // Maximum darkness level (0-255)
//   const range = maxDarkness - minDarkness + 1;

//   const red = Math.floor(Math.random() * range + minDarkness)
//     .toString(16)
//     .padStart(2, "0");
//   const green = Math.floor(Math.random() * range + minDarkness)
//     .toString(16)
//     .padStart(2, "0");
//   const blue = Math.floor(Math.random() * range + minDarkness)
//     .toString(16)
//     .padStart(2, "0");

//   return `#${red}${green}${blue}`;
// };
