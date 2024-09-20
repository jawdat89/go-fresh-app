// src/hooks/useDarkMode.ts
import { useEffect, useState } from "react";

const key = "go-fresh-theme";

export default function useDarkMode(): [ThemeMode, (theme: ThemeMode) => void] {
  // Initialize state with 'light' or 'dark', or fallback to system preference if not set
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const storedTheme = localStorage.getItem(key);
    return storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const colorTheme: ThemeMode = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);

    // Save theme to local storage
    localStorage.setItem(key, theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
