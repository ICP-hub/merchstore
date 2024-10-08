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
// import { HttpAgent } from "@dfinity/agent";

export default function IdentityWrapper() {
  // const [mount, setMount] = useState(false);
  // https://dev.nfid.one/rpc
  // const nfidw = { ...NFIDW, providerUrl: "https://dev.nfid.one/rpc" };
  const signers = [NFIDW, Plug];

  // useEffect(() => {
  //   HttpAgent.create({ host: "https://icp-api.io/" }).then(setCustomAgent);
  // }, []);

  // useState(() => {
  //   setMount(true);
  // }, []);

  return (
    <IdentityKitProvider
      signers={signers}
      theme={IdentityKitTheme.SYSTEM}
      authType={IdentityKitAuthType.DELEGATION}
      signerClientOptions={{
        derivationOrigin: "https://ez3it-6qaaa-aaaak-akwyq-cai.icp0.io/",
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
