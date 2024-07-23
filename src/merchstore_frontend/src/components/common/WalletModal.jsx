import { motion } from "framer-motion";
import PlugSvg from "../../assets/wallet-images/plug.png";
import NFIDSvg from "../../assets/wallet-images/nfid.png";
import StoicSvg from "../../assets/wallet-images/stoic.png";
import DfinitySvg from "../../assets/wallet-images/dfinity.svg";
import { useAuth } from "../../auth/useClient";

const WalletModal = ({ onModalClose }) => {
  const { login, plugLogin } = useAuth();
  const walletOptions = [
    { name: "Plug", image: PlugSvg, provider: "Plug" },
    { name: "NFID", image: NFIDSvg, provider: "NFID" },
    // { name: "Stoic", image: StoicSvg, provider: "Stoic" },
    { name: "Internet Identity", image: DfinitySvg, provider: "Identity" },
  ];

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
        {walletOptions.map((wallet, index) => (
          <motion.div
            key={index}
            whileHover="hover"
            whileTap="hover"
            variants={animationVar}
            className="px-8 py-3 mr-24 md:mr-32 w-full font-medium text-lg hover:bg-foreground min-w-64"
            onClick={() =>
              wallet.provider === "Plug" ? plugLogin() : login(wallet.provider)
            }
          >
            <div className="flex items-center space-x-4">
              <img
                src={wallet.image}
                className="max-h-16 min-h-16 max-w-16 min-w-16 object-contain"
                alt={`${wallet.name} logo`}
              />
              <span>{wallet.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WalletModal;
