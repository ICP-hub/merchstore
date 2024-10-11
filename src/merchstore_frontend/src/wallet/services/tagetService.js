import { Agent, HttpAgent } from "@dfinity/agent";
import { actorService } from "./actorService";
import { GenericError } from "./errorHandler";
import { idlFactory as ConsentMessageCanisterIDL } from "../consent_idl";
import { localStorageTTL } from "./local-strage-ttl";

const IC_HOSTNAME = "https://ic0.app";

export const targetService = {
  async validateTargets(targets, origin) {
    const agent = HttpAgent.createSync({ host: IC_HOSTNAME });
    const promises = targets.map(async (canisterId) => {
      const actor = actorService.getActor(
        canisterId,
        ConsentMessageCanisterIDL,
        agent
      );
      const cacheKey = `trusted_origins_${canisterId}`;
      const cache = localStorageTTL.getItem(cacheKey);
      let response;

      if (cache !== null) {
        response = cache;
      } else {
        response = await actor.icrc28_trusted_origins();
        localStorageTTL.setItem(cacheKey, response, 24);
      }

      if (!response.trusted_origins.includes(origin)) {
        throw new GenericError(
          `The target canister ${canisterId} has no the trusted origin: ${origin}`
        );
      }
    });

    await Promise.all(promises);
  },
};
