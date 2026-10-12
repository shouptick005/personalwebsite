"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type CheckResultContextValue = {
  checkResult: string;
  setCheckResult: (value: string) => void;
};

const CheckResultContext = createContext<CheckResultContextValue | null>(null);

/** Shares the self-check outcome with the teardown form, so it can be added to the request. */
export function CheckResultProvider({ children }: { children: ReactNode }) {
  const [checkResult, setCheckResult] = useState("");
  return <CheckResultContext.Provider value={{ checkResult, setCheckResult }}>{children}</CheckResultContext.Provider>;
}

export function useCheckResult(): CheckResultContextValue {
  const ctx = useContext(CheckResultContext);
  if (!ctx) throw new Error("useCheckResult must be used inside <CheckResultProvider>");
  return ctx;
}
