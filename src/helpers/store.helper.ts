import Store from "../interfaces/store.interface";
import InMemoryStore from "../services/in-memory.store";

export function getStore(): Store {
    return new InMemoryStore();
}