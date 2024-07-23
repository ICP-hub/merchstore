import { motion } from "framer-motion";
import PlugSvg from "../../assets/wallet-images/plug.png";
import NFIDSvg from "../../assets/wallet-images/nfid.png";
// import StoicSvg from "../../assets/wallet-images/stoic.png";
import DfinitySvg from "../../assets/wallet-images/dfinity.svg";
import { useAuth } from "../../auth/useClient";

const WalletModal = ({ onModalClose }) => {
  const { login, plugLogin } = useAuth();

  const handleClick = (provider) => {
    if (provider === "Plug") {
      plugLogin();
    } else {
      login(provider);
    }
  };

  const animationVar = {
    rest: {},
    hover: {
      scale: 1.05,
      originX: 0,
      background: "#000000",
      color: "#ffffff",
    },
  };

  return (
    <div
      className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
      onClick={onModalClose}
    >
      <div className="bg-white rounded-3xl overflow-hidden">
        <motion.div
          whileHover="hover"
          whileTap="hover"
          variants={animationVar}
          className="px-8 py-3 mr-24 md:mr-32 w-full font-medium text-lg hover:bg-foreground min-w-64"
          onClick={() => handleClick("Plug")}
        >
          <div className="flex items-center space-x-4">
            <img
              src={PlugSvg}
              className="max-h-16 min-h-16 max-w-16 min-w-16 object-contain"
              alt="Plug logo"
            />
            <span>Plug</span>
          </div>
        </motion.div>
        <motion.div
          whileHover="hover"
          whileTap="hover"
          variants={animationVar}
          className="px-8 py-3 mr-24 md:mr-32 w-full font-medium text-lg hover:bg-foreground min-w-64"
          onClick={() => handleClick("NFID")}
        >
          <div className="flex items-center space-x-4">
            <img
              src={NFIDSvg}
              className="max-h-16 min-h-16 max-w-16 min-w-16 object-contain"
              alt="NFID logo"
            />
            <span>NFID</span>
          </div>
        </motion.div>
        {/* Uncomment and modify the following block if Stoic integration is required */}
        {/* <motion.div
          whileHover="hover"
          whileTap="hover"
          variants={animationVar}
          className="px-8 py-3 mr-24 md:mr-32 w-full font-medium text-lg hover:bg-foreground min-w-64"
          onClick={(event) => handleClick("Stoic", event)}
        >
          <div className="flex items-center space-x-4">
            <img
              src={StoicSvg}
              className="max-h-16 min-h-16 max-w-16 min-w-16 object-contain"
              alt="Stoic logo"
            />
            <span>Stoic</span>
          </div>
        </motion.div> */}
        <motion.div
          whileHover="hover"
          whileTap="hover"
          variants={animationVar}
          className="px-8 py-3 mr-24 md:mr-32 w-full font-medium text-lg hover:bg-foreground min-w-64"
          onClick={() => handleClick("Identity")}
        >
          <div className="flex items-center space-x-4">
            <img
              src={DfinitySvg}
              className="max-h-16 min-h-16 max-w-16 min-w-16 object-contain"
              alt="Internet Identity logo"
            />
            <span>Internet Identity</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WalletModal;
