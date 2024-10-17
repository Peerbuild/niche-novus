"use client";
import { useState, createContext, ReactNode, useContext } from "react";

const SyncContext = createContext({
  syncing: false,
  setSyncing: (syncing: boolean) => {},
});

export default function SyncProvider({ children }: { children: ReactNode }) {
  const [syncing, setSyncing] = useState(false);

  return (
    <SyncContext.Provider value={{ syncing, setSyncing }}>
      {children}
    </SyncContext.Provider>
  );
}

export function useSync() {
  const data = useContext(SyncContext);
  if (data === undefined) {
    throw new Error("useSync must be used within SyncProvider");
  }
  return data;
}
