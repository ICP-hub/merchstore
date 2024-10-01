import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "regenerator-runtime/runtime";
import { AuthProvider } from "./auth/useClient";
import "@nfid/identitykit/react/styles.css";
import {
  IdentityKitAuthType,
  InternetIdentity,
  NFIDW,
  Plug,
  Stoic,
} from "@nfid/identitykit";

import { IdentityKitProvider, IdentityKitTheme } from "@nfid/identitykit/react";

ReactDOM.render(
  <IdentityKitProvider
    signers={[NFIDW, Plug, InternetIdentity, Stoic]}
    theme={IdentityKitTheme.SYSTEM}
    authType={IdentityKitAuthType.ACCOUNTS}
    signerClientOptions={{
      targets: [process.env.CANISTER_ID_MERCHSTORE_BACKEND],
    }}
    onConnectFailure={(e) => {
      toast.error(
        e.message === "Not supported"
          ? "Internet Identity doesn’t support accounts. Switch to delegation."
          : e.message
      );
    }}
    onConnectSuccess={() => {
      localStorage.setItem("authType", authType);
    }}
  >
    <AuthProvider>
      <App />
    </AuthProvider>
  </IdentityKitProvider>,
  document.getElementById("root")
);
