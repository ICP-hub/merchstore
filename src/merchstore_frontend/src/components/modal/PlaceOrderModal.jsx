import {
  AnimatePresence,
  motion,
  useAnimate,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import useMeasure from "react-use-measure";
import { useAuth } from "../../auth/useClient";

const PlaceorderModal = ({ isOpen, setIsOpen, children }) => {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const { orderPlacementLoad } = useAuth();

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });

    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={orderPlacementLoad ? null : handleClose}
          className="fixed inset-0 z-50 bg-neutral-950/70"
        >
          <motion.div
            id="drawer"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              ease: "easeInOut",
            }}
            className="absolute bottom-0 h-[75vh] w-full overflow-hidden rounded-t-3xl bg-black"
            style={{ y }}
            drag="y"
            dragControls={controls}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
            }}
          >
            <div className="absolute left-0 right-0 top-0 z-10 flex justify-center bg-neutral-900 p-4">
              <button
                onPointerDown={(e) => {
                  controls.start(e);
                }}
                className="h-2 w-14 cursor-grab touch-none rounded-full bg-neutral-700 active:cursor-grabbing"
              ></button>
            </div>
            <div className="relative z-0 h-full overflow-y-scroll p-4 pt-12">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
//   const handleConfirm = () => {
//     // console.log("Final cart", data);
//     proceed();
//   };
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={() => setIsOpen(false)}
//           className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
//         >
//           <motion.div
//             initial={{ scale: 0, rotate: "12.5deg" }}
//             animate={{ scale: 1, rotate: "0deg" }}
//             exit={{ scale: 0, rotate: "0deg" }}
//             onClick={(e) => e.stopPropagation()}
//             className="bg-gradient-to-br from-gray-600 to-black text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
//           >
//             <HiOutlineShoppingCart className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
//             <div className="relative z-10">
//               <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-black grid place-items-center mx-auto">
//                 <HiOutlineShoppingCart />
//               </div>
//               <h3 className="text-xl font-bold text-center mb-2">
//                 Verify your order details
//               </h3>
//               <div className="my-6 w-full rounded-2xl px-4">
//                 {data.map((item, index) => (
//                   <div className="flex" key={index}>
//                     <div className="flex border items-center justify-center p-1">
//                       <img
//                         src={item.img1.data}
//                         alt={item.product.title}
//                         className="min-w-24 min-h-24 max-w-min max-h-min object-contain"
//                       />
//                     </div>
//                     <div className="flex flex-col w-full items-start px-4">
//                       <h1 className="text-xl line-clamp-1">
//                         {item.product.title}
//                       </h1>
//                       <div className="text-xs text-gray-300 flex flex-col items-start">
//                         <p>Quantity : {item.quantity}</p>
//                         <p className="font-semibold">
//                           ICP {item.variantSellPrice}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 <div className="w-full h-px bg-white my-4"></div>
//                 <div className="flex w-full items-center font-semibold">
//                   <p className="min-h-24 min-w-24 flex max-w-min max-h-min items-center justify-center">
//                     Total :
//                   </p>
//                   <div className="ml-4 w-full items-start flex">
//                     <div className="flex items-start flex-col">
//                       <h4>ICP {totalPrice}</h4>
//                       <span className="font-light italic text-xs">
//                         (including shipping amount)
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
//                 >
//                   Nah, go back
//                 </button>
//                 <button
//                   //   onClick={() => setIsOpen(false)}
//                   //   onClick={() => proceed()}
//                   onClick={handleConfirm}
//                   className="bg-white hover:opacity-90 transition-opacity text-black font-semibold w-full py-2 rounded"
//                 >
//                   Confirm
//                 </button>
//               </div>
//               <p className="text-xs flex w-full items-end justify-end mt-4">
//                 Click 'Confirm' to complete your purchase or 'Go back' to edit."
//               </p>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

export default PlaceorderModal;
