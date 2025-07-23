import type { PersistStorage } from "zustand/middleware";
import localforage from "@/utils/localforage";

export const createStorage = <T = unknown>() => {
  const storage: PersistStorage<T> = {
    getItem(name) {
      return localforage.getItem(name);
    },
    setItem(name, value) {
      localforage.setItem(name, value);
    },
    removeItem(name) {
      localforage.removeItem(name);
    },
  };
  return storage;
};
