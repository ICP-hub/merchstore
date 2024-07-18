import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { createActor } from "../../../../.dfx/local/canisters/merchstore_backend";

const AuthContext = createContext();

const defaultOptions = {
  createOptions: {
    idleOptions: {
      idleTimeout: 1000 * 60 * 30,
      disableDefaultIdleCallback: true,
    },
  },
  loginOptionsII: {
    identityProvider: "https://identity.ic0.app/#authorize",
  },
  loginOptionsNFID: {
    identityProvider: `https://nfid.one/authenticate/?applicationName=my-ic-app#authorize`,
  },
};

export const useAuthClient = (options = defaultOptions) => {
  const [authClient, setAuthClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [backend, setBackend] = useState(null);

  const backendCanisterId = process.env.CANISTER_ID_MERCHSTORE_BACKEND;

  useEffect(() => {
    const initAuthClient = async () => {
      const client = await AuthClient.create(options.createOptions);
      setAuthClient(client);

      const isAuthenticated = await client.isAuthenticated();
      const identity = client.getIdentity();
      const principal = identity.getPrincipal();

      // if (principal.toText() === "2vxsx-fae") {
      //   await logout();
      //   return;
      // }

      setIsConnected(isAuthenticated);
      setIdentity(identity);
      setPrincipal(principal);
      if (createActor) {
        const backendActor = createActor(backendCanisterId, {
          agentOptions: { identity, verifyQuerySignatures: false },
        });
        setBackend(backendActor);
      }
    };
    initAuthClient();
  }, []);

  const login = async (provider) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (
          authClient.isAuthenticated() &&
          (await authClient.getIdentity().getPrincipal().isAnonymous()) ===
            false
        ) {
          clientInfo(authClient);
          resolve(authClient);
        } else {
          let opt = provider === "ii" ? "loginOptionsII" : "loginOptionsNFID";
          authClient.login({
            ...options[opt],
            onError: (error) => reject(error),
            onSuccess: () => {
              clientInfo(authClient);
              resolve(authClient);
            },
          });
        }
      } catch (error) {
        console.log("error", error);
        reject(error);
      }
    });
  };

  const clientInfo = async (client) => {
    const isAuthenticated = await client.isAuthenticated();
    const identity = client.getIdentity();
    const principal = identity.getPrincipal();

    // if (principal.toText() === "2vxsx-fae") {
    //   await logout();
    //   return;
    // }

    setAuthClient(client);
    setIsConnected(isAuthenticated);
    setIdentity(identity);
    setPrincipal(principal);

    if (
      createActor &&
      isAuthenticated &&
      identity &&
      principal &&
      !principal.isAnonymous()
    ) {
      const backendActor = createActor(backendCanisterId, {
        agentOptions: { identity, verifyQuerySignatures: false },
      });

      setBackend(backendActor);
    }

    return true;
  };

  const disconnect = async () => {
    await authClient?.logout();
    setIsAuthenticated(false);
    setIdentity(null);
    setPrincipal(null);
    setBackend(null);
  };

  return {
    login,
    disconnect,
    authClient,
    isConnected,
    identity,
    principal,
    backendCanisterId,
    backend,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();
  console.log("auth is ", auth);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useBackend = () => {};
// Hook to access authentication context
export const useAuth = () => useContext(AuthContext);

// import React, { createContext, useContext, useEffect, useState } from "react";
// import { PlugLogin, StoicLogin, NFIDLogin, IdentityLogin } from "ic-auth";
// import { createActor } from "../../../../.dfx/local/canisters/merchstore_backend";
// import { Principal } from "@dfinity/principal";
// import { AuthClient } from "@dfinity/auth-client";
// import { HelloIDL, CreateActor } from "ic-auth";

// const AuthContext = createContext();

// const canisterID = process.env.CANISTER_ID_MERCHSTORE_BACKEND;
// const whitelist = [process.env.CANISTER_ID_MERCHSTORE_BACKEND];

// export const useAuthClient = () => {
//   const [isConnected, setIsConnected] = useState(false);
//   const [principal, setPrincipal] = useState(null);
//   const [backend, setBackend] = useState(createActor(canisterID));
//   const [identity, setIdentity] = useState(null);
//   const [authClient, setAuthClient] = useState(null);

//   // console.log(backendActor, "backend actor");

//   useEffect(() => {
//     const initializeAuthClient = async () => {
//       const client = await AuthClient.create();
//       setAuthClient(client);
//       if (await client.isAuthenticated()) {
//         const identity = client.getIdentity();
//         const principal = identity.getPrincipal();
//         // const actor = createActor(canisterID, { agentOptions: { identity } });
//         const actor = await CreateActor(userObject.agent, HelloIDL, canisterID);
//         setIsConnected(true);
//         setPrincipal(principal);
//         setIdentity(identity);
//       }
//     };

//     initializeAuthClient();
//   }, []);

//   const login = async () => {
//     if (authClient) {
//       let userObject = {
//         principal: "Not Connected.",
//         agent: undefined,
//         provider: "N/A",
//       };
//       /* if (provider === "Plug") {
//         userObject = await PlugLogin(whitelist);
//       } else if (provider === "Stoic") {
//         userObject = await StoicLogin();
//       } else if (provider === "NFID") {
//         userObject = await NFIDLogin();
//       } else if (provider === "Identity") { */
//       //userObject = await IdentityLogin();
//       //}
//       userObject = await IdentityLogin();
//       console.log("User Object:", userObject);

//       const identity = await userObject.agent._identity;
//       const principal = Principal.fromText(userObject.principal);
//       const actor = await CreateActor(userObject.agent, HelloIDL, canisterID);
//       // const actor = createActor(canisterID, { agentOptions: { identity } });
//       const result = await actor.hello();
//       console.log("actor is ", actor);
//       console.log("result is ", result);
//       console.log(identity, "identity");
//       setIsConnected(true);
//       setPrincipal(principal);
//       setIdentity(identity);

//       await authClient.login({
//         identity,
//         onSuccess: () => {
//           setIsConnected(true);
//           setPrincipal(principal);
//           setIdentity(identity);
//         },
//       });
//     }
//   };

//   const disconnect = async () => {
//     if (authClient) {
//       await authClient.logout();
//       setIsConnected(false);
//       setPrincipal(null);
//       setIdentity(null);
//     }
//   };

//   return {
//     isConnected,
//     login,
//     disconnect,
//     principal,
//     backend,
//     identity,
//   };
// };

// export const AuthProvider = ({ children }) => {
//   const auth = useAuthClient();
//   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
// };

// export const useBackend = () => {};

// export const useAuth = () => useContext(AuthContext);
