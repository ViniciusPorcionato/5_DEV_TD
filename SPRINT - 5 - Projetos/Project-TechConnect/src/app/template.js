"use client";

import { Header } from "@/components/Header";
import { UserProvider } from "@/context/userContext";
import ThemeProvider from "@/providers/themeProvides";
import { useEffect, useState } from "react";

export default function Template({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Header />
      {children}
    </>
  );
}
