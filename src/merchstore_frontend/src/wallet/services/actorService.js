import { Actor } from "@dfinity/agent";

class ActorService {
  getActor(canisterId, factory, agent) {
    return Actor.createActor(factory, { canisterId, agent });
  }
}

export const actorService = new ActorService();
