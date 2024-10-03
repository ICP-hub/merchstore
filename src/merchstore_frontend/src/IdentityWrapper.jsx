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
import { HttpAgent } from "@dfinity/agent";
import { AuthProvider } from "./auth/useClient";
import { DelegationIdentity } from "@dfinity/identity";

export default function IdentityWrapper() {
  const signers = [NFIDW, Plug, InternetIdentity, Stoic];
  const [customAgent, setCustomAgent] = useState();

  const canisterID = process.env.CANISTER_ID_MERCHSTORE_BACKEND;
  const {
    agent,
    isInitializing,
    user,
    isUserConnecting,
    authType,
    icpBalance,
    identity,
    signer,
    delegationType,
    accounts,
    connect,
    disconnect,
    fetchIcpBalance,
  } = useIdentityKit();

  useEffect(() => {
    HttpAgent.create().then(setCustomAgent);
  }, []);

  return (
    <IdentityKitProvider
      signers={signers}
      theme={IdentityKitTheme.SYSTEM}
      agent={customAgent}
      authType={IdentityKitAuthType.DELEGATION}
      signerClientOptions={{
        targets: [canisterID],
      }}
      // onConnectFailure={(e) => {
      //   toast.error(
      //     e.message === "Not supported"
      //       ? "Internet Identity doesn’t support accounts. Switch to delegation."
      //       : e.message
      //   );
      // }}
      // onConnectSuccess={() => {}}
    >
      <AuthProvider>
        <App />
      </AuthProvider>
    </IdentityKitProvider>
  );
}
