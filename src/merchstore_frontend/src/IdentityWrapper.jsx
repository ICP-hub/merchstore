import { useEffect, useState } from "react";
import {
  IdentityKitProvider,
  IdentityKitTheme,
  useIdentityKit,
} from "@nfid/identitykit/react";
import {
  IdentityKitAuthType,
  MockedSigner,
  NFIDW,
  Plug,
  InternetIdentity,
  Stoic,
} from "@nfid/identitykit";

import App from "./App";
import { AuthProvider } from "./auth/useClient";
import { HttpAgent } from "@dfinity/agent";
import toast from "react-hot-toast";
// import { HttpAgent } from "@dfinity/agent";

export default function IdentityWrapper() {
  // const [mount, setMount] = useState(false);
  // //https://dev.nfid.one/rpc
  // const signers = [NFIDW, Plug];
  // // const [customAgent, setCustomAgent] = useState(null);

  // useState(() => {
  //   setMount(true);
  // }, []);

  // const targetCanister = process.env.CANISTER_ID_MERCHSTORE_BACKEND;

  return (
    // <IdentityKitProvider
    //   signers={signers}
    //   theme={IdentityKitTheme.SYSTEM}
    //   authType={IdentityKitAuthType.DELEGATION}
    //   signerClientOptions={{
    //     targets: [targetCanister],
    //   }}
    //   onConnectSuccess={() => console.log("connected")}
    //   onConnectFailure={(e) => {
    //     toast.error(
    //       e.message === "Not supported"
    //         ? "Internet Identity doesn’t support accounts. Switch to delegation."
    //         : e.message
    //     );
    //   }}
    // >
    <AuthProvider>
      <App />
    </AuthProvider>
    // </IdentityKitProvider>
  );
}
