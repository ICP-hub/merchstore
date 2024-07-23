// import React, { createContext, useContext, useEffect, useState } from "react";
// import { AuthClient } from "@dfinity/auth-client";
// import { createActor } from "../../../../.dfx/local/canisters/merchstore_backend";

// const AuthContext = createContext();

// const defaultOptions = {
//   createOptions: {
//     idleOptions: {
//       idleTimeout: 1000 * 60 * 30,
//       disableDefaultIdleCallback: true,
//     },
//   },
//   loginOptionsII: {
//     identityProvider: "https://identity.ic0.app/#authorize",
//   },
//   loginOptionsNFID: {
//     identityProvider: `https://nfid.one/authenticate/?applicationName=my-ic-app#authorize`,
//   },
// };

// export const useAuthClient = (options = defaultOptions) => {
//   const [authClient, setAuthClient] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [identity, setIdentity] = useState(null);
//   const [principal, setPrincipal] = useState(null);
//   const [backend, setBackend] = useState(null);

//   const backendCanisterId = process.env.CANISTER_ID_MERCHSTORE_BACKEND;

//   useEffect(() => {
//     const initAuthClient = async () => {
//       const client = await AuthClient.create(options.createOptions);
//       setAuthClient(client);

//       const isAuthenticated = await client.isAuthenticated();
//       const identity = client.getIdentity();
//       const principal = identity.getPrincipal();

//       // if (principal.toText() === "2vxsx-fae") {
//       //   await logout();
//       //   return;
//       // }

//       setIsConnected(isAuthenticated);
//       setIdentity(identity);
//       setPrincipal(principal);
//       if (createActor) {
//         const backendActor = createActor(backendCanisterId, {
//           agentOptions: { identity, verifyQuerySignatures: false },
//         });
//         setBackend(backendActor);
//       }
//     };
//     initAuthClient();
//   }, []);

//   const login = async (provider) => {
//     return new Promise(async (resolve, reject) => {
//       try {
//         if (
//           authClient.isAuthenticated() &&
//           (await authClient.getIdentity().getPrincipal().isAnonymous()) ===
//             false
//         ) {
//           clientInfo(authClient);
//           resolve(authClient);
//         } else {
//           let opt = provider === "ii" ? "loginOptionsII" : "loginOptionsNFID";
//           authClient.login({
//             ...options[opt],
//             onError: (error) => reject(error),
//             onSuccess: () => {
//               clientInfo(authClient);
//               resolve(authClient);
//             },
//           });
//         }
//       } catch (error) {
//         console.log("error", error);
//         reject(error);
//       }
//     });
//   };

//   const clientInfo = async (client) => {
//     const isAuthenticated = await client.isAuthenticated();
//     const identity = client.getIdentity();
//     const principal = identity.getPrincipal();

//     // if (principal.toText() === "2vxsx-fae") {
//     //   await logout();
//     //   return;
//     // }

//     setAuthClient(client);
//     setIsConnected(isAuthenticated);
//     setIdentity(identity);
//     setPrincipal(principal);

//     if (
//       createActor &&
//       isAuthenticated &&
//       identity &&
//       principal &&
//       !principal.isAnonymous()
//     ) {
//       const backendActor = createActor(backendCanisterId, {
//         agentOptions: { identity, verifyQuerySignatures: false },
//       });

//       setBackend(backendActor);
//     }

//     return true;
//   };

//   const disconnect = async () => {
//     await authClient?.logout();
//     setIsAuthenticated(false);
//     setIdentity(null);
//     setPrincipal(null);
//     setBackend(null);
//   };

//   return {
//     login,
//     disconnect,
//     authClient,
//     isConnected,
//     identity,
//     principal,
//     backendCanisterId,
//     backend,
//   };
// };

// export const AuthProvider = ({ children }) => {
//   const auth = useAuthClient();
//   console.log("auth is ", auth);
//   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
// };

// export const useBackend = () => {};
// // Hook to access authentication context
// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useEffect, useState } from "react";
import { PlugLogin, StoicLogin, NFIDLogin, IdentityLogin } from "ic-auth";
import { createActor } from "../../../../.dfx/local/canisters/merchstore_backend";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";
import { CreateActor } from "ic-auth";
import { idlFactory } from "../../../../.dfx/local/canisters/merchstore_backend/merchstore_backend.did.js";

const AuthContext = createContext();

const canisterID = process.env.CANISTER_ID_MERCHSTORE_BACKEND;
const whitelist = [process.env.CANISTER_ID_MERCHSTORE_BACKEND];

export const useAuthClient = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [principal, setPrincipal] = useState(null);
  const [backend, setBackend] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [authClient, setAuthClient] = useState(null);

  const loginStatus = localStorage.getItem("loginStatus");

  // console.log(backendActor, "backend actor");

  // const createOptions = {
  //   idleOptions: {
  //     idleTimeout: 1000 * 60 * 30,
  //     disableDefaultIdleCallback: true,
  //   },
  // };

  useEffect(() => {
    const initAuthClient = async () => {
      const client = await AuthClient.create();
      setAuthClient(client);
      const isConnected = await client.isAuthenticated();
      const identity = client.getIdentity();
      const principal = identity.getPrincipal();
      // if (principal.toText() === "2vxsx-fae") {
      //   await logout();
      //   return;
      // }
      setIsConnected(isConnected);
      setIdentity(identity);
      setPrincipal(principal);

      if (createActor && loginStatus === null) {
        const backendActor = createActor(canisterID, {
          agentOptions: { identity },
        });
        setBackend(backendActor);
      }
      // const actor = await CreateActor(identity, idlFactory, canisterID);
      // setBackend(actor);
    };
    initAuthClient();
  }, []);

  useEffect(() => {
    const handlePlugLogin = async () => {
      const plugPrincipal = principal?.toText();
      if (plugPrincipal === "2vxsx-fae") {
        let userObject = await PlugLogin(whitelist);
        const agent = userObject.agent;
        const principal = Principal.fromText(userObject.principal);
        const actor = await CreateActor(agent, idlFactory, canisterID);
        setBackend(actor);
        setIsConnected(true);
        setPrincipal(principal);
        setIdentity(identity);

        await authClient.login({
          agent,
          onSuccess: () => {
            setIsConnected(true);
            setPrincipal(principal);
            setIdentity(identity);
          },
        });
      } else {
        return;
      }
    };
    // console.log("login status is ", loginStatus);
    if (loginStatus) {
      handlePlugLogin();
    }
  }, [principal]);

  const login = async (provider) => {
    if (authClient) {
      let userObject = {
        principal: "Not Connected.",
        agent: undefined,
        provider: "N/A",
      };
      if (provider === "Plug") {
        userObject = await PlugLogin(whitelist);
      } else if (provider === "Stoic") {
        userObject = await StoicLogin();
      } else if (provider === "NFID") {
        userObject = await NFIDLogin();
      } else if (provider === "Identity") {
        userObject = await IdentityLogin();
      }
      // userObject = await IdentityLogin();
      console.log("User Object:", userObject);
      const agent = userObject.agent;
      const identity = await userObject.agent._identity;
      const principal = Principal.fromText(userObject.principal);
      // const actor = createActor(canisterID, { agentOptions: { identity } });
      const actor = await CreateActor(agent, idlFactory, canisterID);
      setBackend(actor);
      setIsConnected(true);
      setPrincipal(principal);
      setIdentity(identity);

      if (userObject.provider !== "Plug") {
        await authClient.login({
          identity,
          onSuccess: () => {
            setIsConnected(true);
            setPrincipal(principal);
            setIdentity(identity);
          },
        });
      }
      if (!isConnected && userObject.provider === "Plug") {
        localStorage.setItem("loginStatus", true);
      }
    }
  };

  const disconnect = async () => {
    if (authClient) {
      await authClient.logout();
      setIsConnected(false);
      setPrincipal(null);
      setIdentity(null);
    }
    localStorage.removeItem("loginStatus");
  };

  return {
    isConnected,
    login,
    disconnect,
    principal,
    backend,
    identity,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();
  // console.log("auth is ", auth);
  // console.log(auth?.principal?.toText());
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useBackend = () => {};

export const useAuth = () => useContext(AuthContext);
