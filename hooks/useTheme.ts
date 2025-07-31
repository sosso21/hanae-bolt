"use client";

import { useState, useEffect } from "react";
import { Theme, getTheme, setTheme as setThemeValue, applyTheme } from "@/lib/theme";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('system');

  useEffect(() => {
    const currentTheme = getTheme();
    setThemeState(currentTheme);
    applyTheme(currentTheme);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeValue(newTheme);
    setThemeState(newTheme);
  };

  return { theme, setTheme };
}
