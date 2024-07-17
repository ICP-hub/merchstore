import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "regenerator-runtime/runtime";
import { AuthProvider } from "./auth/useClient";

ReactDOM.render(
  <React.StrictMode>
  <AuthProvider>
      <App />
    </AuthProvider> 
  </React.StrictMode>,
  document.getElementById("root")
);
