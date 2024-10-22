import {
  IdentityKitProvider,
  IdentityKitTheme,
  ConnectWalletButton,
  ConnectWallet,
  useIdentityKit,
} from "@nfid/identitykit/react";
import { NFIDW, IdentityKitAuthType, IdentityKit } from "@nfid/identitykit";
import { useEffect } from "react";

const Trial = () => {
  //   useEffect(() => {
  //     const funOne = async () => {
  //       await IdentityKit.init();
  //     };
  //     funOne();
  //   }, []);
  return (
    <IdentityKitProvider
      signers={[NFIDW]}
      theme={IdentityKitTheme.LIGHT} // LIGHT, DARK, SYSTEM (by default)
      authType={IdentityKitAuthType.DELEGATION} // ACCOUNTS, DELEGATION (by default)
      signerClientOptions={{
        targets: [process.env.CANISTER_ID_MERCHSTORE_BACKEND],
      }}
    >
      <ConnectWallet />
    </IdentityKitProvider>
  );
};

export default Trial;
