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
import { NFID } from "@nfid/embed";

const AuthContext = createContext();

const canisterID = process.env.CANISTER_ID_MERCHSTORE_BACKEND;
const whitelist = [process.env.CANISTER_ID_MERCHSTORE_BACKEND];

export const useAuthClient = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [principal, setPrincipal] = useState(null);
  const [backend, setBackend] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [authClient, setAuthClient] = useState(null);
  const [nfid, setNfid] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuthClient = async () => {
      try {
        const client = await AuthClient.create();
        setAuthClient(client);
        const isAuthenticated = await client.isAuthenticated();
        const identity = client.getIdentity();
        const principal = identity.getPrincipal();

        setIsConnected(isAuthenticated);
        setIdentity(identity);
        setPrincipal(principal);

        if (isAuthenticated) {
          const actor = await createActor(canisterID, {
            agentOptions: { identity },
          });
          setBackend(actor);
        } else {
          setBackend(createActor(canisterID));
        }
      } catch (err) {
        console.error("Error initializing AuthClient:", err);
        setError("Failed to initialize AuthClient.");
      }
    };

    initAuthClient();
  }, []);

  useEffect(() => {
    const initNFID = async () => {
      try {
        const nfIDInstance = await NFID.init({
          application: {
            name: "NFID Login",
            logo: "https://dev.nfid.one/static/media/id.300eb72f3335b50f5653a7d6ad5467b3.svg",
          },
        });
        setNfid(nfIDInstance);
      } catch (error) {
        console.error("Error initializing NFID:", error);
        setError("Failed to initialize NFID.");
      }
    };

    initNFID();
  }, []);

  useEffect(() => {
    const handlePlugLogin = async () => {
      if (principal?.toText() === "2vxsx-fae") {
        try {
          const userObject = await PlugLogin(whitelist);
          const agent = userObject.agent;
          const principal = Principal.fromText(userObject.principal);
          const actor = await CreateActor(agent, idlFactory, canisterID);

          setBackend(actor);
          setIsConnected(true);
          setPrincipal(principal);
          setIdentity(userObject.agent._identity);

          await authClient.login({ agent });
        } catch (err) {
          console.error("Error during Plug login:", err);
          setError("Failed to log in with Plug.");
        }
      }
    };

    const loginStatus = localStorage.getItem("loginStatus");
    if (loginStatus) {
      handlePlugLogin();
    }
  }, [principal, authClient]);

  const login = async (provider) => {
    if (!authClient) return;

    try {
      let userObject;
      if (provider === "Plug") {
        userObject = await PlugLogin(whitelist);
      } else if (provider === "Stoic") {
        userObject = await StoicLogin();
      } else if (provider === "NFID") {
        if (nfid) {
          const delegationResult = await nfid.getDelegation({
            targets: [canisterID],
          });
          const principal = Principal.from(delegationResult.getPrincipal());
          setPrincipal(principal);
          const id = await nfid.getIdentity();
          setIdentity(id);

          if (id) setIsConnected(true);
        } else {
          throw new Error("NFID is not initialized.");
        }
      } else if (provider === "Identity") {
        userObject = await IdentityLogin();
      } else {
        throw new Error("Unknown provider.");
      }

      const agent = userObject.agent;
      const identity = agent._identity;
      const principal = Principal.fromText(userObject.principal);
      const actor = await CreateActor(agent, idlFactory, canisterID);

      setBackend(actor);
      setIsConnected(true);
      setPrincipal(principal);
      setIdentity(identity);

      if (provider !== "Plug") {
        await authClient.login({ identity });
      }

      if (provider === "Plug") {
        localStorage.setItem("loginStatus", "true");
      }
    } catch (err) {
      console.error(`Error during ${provider} login:`, err);
      setError(`Failed to log in with ${provider}.`);
    }
  };

  const disconnect = async () => {
    if (authClient) {
      try {
        await authClient.logout();
        setIsConnected(false);
        setPrincipal(null);
        setIdentity(null);
        setBackend(null);
        localStorage.removeItem("loginStatus");
      } catch (err) {
        console.error("Error during logout:", err);
        setError("Failed to log out.");
      }
    }
  };

  return {
    isConnected,
    login,
    disconnect,
    principal,
    backend,
    identity,
    error,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();
  console.log("Auth is ", auth);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useBackend = () => {};

export const useAuth = () => useContext(AuthContext);
