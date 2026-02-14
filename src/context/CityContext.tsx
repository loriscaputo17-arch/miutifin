"use client";

import { createContext, useContext, useEffect, useState } from "react";

type CityContextType = {
  city: string;
  setCity: (city: string) => void;
};

const CityContext = createContext<CityContextType | null>(null);

export function CityProvider({ children }: { children: React.ReactNode }) {
  const [city, setCityState] = useState("Milano");

  /* load from localStorage */
  useEffect(() => {
    const saved = localStorage.getItem("city");
    if (saved) setCityState(saved);
  }, []);

  const setCity = (c: string) => {
    setCityState(c);
    localStorage.setItem("city", c);
  };

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
}

/* hook comodo */
export function useCity() {
  const ctx = useContext(CityContext);
  if (!ctx) throw new Error("useCity must be used inside CityProvider");
  return ctx;
}
