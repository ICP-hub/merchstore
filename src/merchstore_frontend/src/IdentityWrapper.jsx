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
// import { HttpAgent } from "@dfinity/agent";

export default function IdentityWrapper() {
  const canisterID = process.env.CANISTER_ID_MERCHSTORE_BACKEND;
  const { identity } = useIdentityKit();
  const [customAgent, setCustomAgent] = useState(null);
  // https://dev.nfid.one/rpc
  const nfidw = { ...NFIDW, providerUrl: "https://dev.nfid.one/rpc" };
  const signers = [nfidw, Plug];

  useEffect(() => {
    if (identity) {
      console.log("identity", identity);
      HttpAgent.create({ identity, host: "https://icp-api.io/" }).then(
        setCustomAgent
      );
    }
  }, [identity]);

  return (
    <IdentityKitProvider
      signers={signers}
      theme={IdentityKitTheme.SYSTEM}
      authType={IdentityKitAuthType.ACCOUNTS}
      agent={customAgent}
      signerClientOptions={{
        targets: [canisterID],
      }}
      onConnectFailure={(e) => {
        toast.error(
          e.message === "Not supported"
            ? "Internet Identity doesn’t support accounts. Switch to delegation."
            : e.message
        );
      }}
      onConnectSuccess={() => {
        // localStorage.setItem("authType", authType);
      }}
    >
      <AuthProvider>
        <App />
      </AuthProvider>
    </IdentityKitProvider>
  );
}
