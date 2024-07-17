// /* ----------------------------------------------------------------------------------------------------- */
// /*  @ Imports.
// /* ----------------------------------------------------------------------------------------------------- */
// import { BsQrCodeScan } from "react-icons/bs";
// import Button from "../common/Button";
// import React from "react";

// /* ----------------------------------------------------------------------------------------------------- */
// /*  @  MyProfilePageContainerMain : MyProAccount.
// /* ----------------------------------------------------------------------------------------------------- */
// const MyProAccount = () => {
//   return (
//     <div className="flex max-[1024px]:flex-col rounded-2xl bg-gray-900  w-full max-[1024px]:gap-8 overflow-hidden">
//       <div className="flex items-center justify-center min-w-72 p-6">
//         <BsQrCodeScan size={170} color="gray" />
//       </div>
//       <div className="w-full gap-4 flex flex-col bg-gray-100 px-6 py-12">
//         <div className="flex gap-4">
//           <MyProInput type="text" label="first name" placeholder="first name" />
//           <MyProInput label="Last Name" type="text" placeholder="last name" />
//         </div>
//         <MyProInput
//           label="Principal ID"
//           type="text"
//           placeholder="principal id"
//         />
//         <MyProInput label="Amount" type="text" placeholder="amount" />
//         <MyProInput label="Email" type="email" placeholder="email" />
//         <Button className="text-white bg-red-500 p-2 rounded-full mt-4">
//           Update My Profile
//         </Button>
//       </div>
//     </div>
//   );
// };

// /* ----------------------------------------------------------------------------------------------------- */
// /*  @ Common Input Component for MyProAccount
// /* ----------------------------------------------------------------------------------------------------- */
// const MyProInput = ({ type, placeholder, label }) => {
//   return (
//     <div className=" flex flex-col gap-1 w-full items-center">
//       <label className=" h-full flex items-center w-full font-semibold  uppercase text-xs px-3">
//         {label}
//       </label>
//       <div className="w-full flex">
//         <input
//           type={type}
//           placeholder={placeholder}
//           className="focus:outline-none flex-1 px-3 py-2 border border-slate-600 h-full rounded-md text-black w-full"
//         />
//       </div>
//     </div>
//   );
// };

// export default MyProAccount;
