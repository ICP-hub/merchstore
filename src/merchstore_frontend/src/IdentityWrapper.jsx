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
  const signers = [NFIDW, Plug];
  const canisterID = process.env.CANISTER_ID_MERCHSTORE_BACKEND;
  // const { identity } = useIdentityKit();
  // const [customAgent, setCustomAgent] = useState(null);

  // useEffect(() => {
  //   if (identity) {
  //     HttpAgent.create({ identity, host: "https://icp-api.io/" }).then(
  //       setCustomAgent
  //     );
  //   }
  // }, [identity]);

  return (
    <IdentityKitProvider
      signers={signers}
      theme={IdentityKitTheme.SYSTEM}
      authType={IdentityKitAuthType.DELEGATION}
      // agent={customAgent}
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
