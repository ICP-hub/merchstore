import { ConnectedWalletButton } from "@nfid/identitykit/react";
import { createContext } from "react";

const AuthenticationContext = createContext();

export default function useAuthentication() {
  function login({ connectedAccount, icpBalance, ...props }) {
    return (
      <ConnectedWalletButton {...props}>
        {`Disconnect ${connectedAccount} ${icpBalance} ICP`}
      </ConnectedWalletButton>
    );
  }

  return { login };
}

export const AuthenticationProvider = ({ children }) => {
  const authentication = useAuthentication();
  console.log("Auth is ", authentication);
  return (
    <AuthContext.Provider value={authentication}>
      {children}
    </AuthContext.Provider>
  );
};
// isConnected,
// login,
// disconnect,
// principal,
// backend,
// identity,
// orderPlacementLoad,
// setOrderPlacementLoad,
// isCartUpdated,
// refreshCart
