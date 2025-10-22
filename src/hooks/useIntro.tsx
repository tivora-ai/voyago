"use client";
import { createContext, useContext, useEffect, useState } from "react";
const IntroCtx = createContext<{ done: boolean; finish: () => void }>({ done: false, finish: () => {} });
export const IntroProvider = ({ children }: { children: React.ReactNode }) => {
  const [done, setDone] = useState(false);
  const finish = () => { setDone(true); };
  return <IntroCtx.Provider value={{ done, finish }}>{children}</IntroCtx.Provider>;
};
export const useIntro = () => useContext(IntroCtx);
