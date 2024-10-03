import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "regenerator-runtime/runtime";
import { AuthProvider } from "./auth/useClient";
import "@nfid/identitykit/react/styles.css";
import IdentityWrapper from "./IdentityWrapper";

ReactDOM.render(<IdentityWrapper />, document.getElementById("root"));
