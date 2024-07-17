//Decides if canister ids used are of production or development
const production = true;

export const host = production ? "https://icp-api.io" : "http://127.0.0.1:4943";

export const ids = {
  backendCan: production
    ? "l4mwy-piaaa-aaaak-akqdq-cai"
    : "bkyz2-fmaaa-aaaaa-qaaaq-cai",
  ICPtokenCan: production
    ? "ryjl3-tyaaa-aaaaa-aaaba-cai"
    : "ryjl3-tyaaa-aaaaa-aaaba-cai", //bw4dl-smaaa-aaaaa-qaacq-cai
  ckBTCtokenCan: production
    ? "mxzaz-hqaaa-aaaar-qaada-cai"
    : "mxzaz-hqaaa-aaaar-qaada-cai",
  ckETHtokenCan: production
    ? "ss2fx-dyaaa-aaaar-qacoq-cai"
    : "ss2fx-dyaaa-aaaar-qacoq-cai",
};
