// src/components/DarkModeSwitcher.tsx
import React, { useState, useEffect } from "react";
import useDarkMode from "@/app/hooks/useDarkMode"; // Adjust the path as necessary
import { DarkModeSwitch } from "react-toggle-dark-mode";

const DarkModeSwitcher: React.FC = () => {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkMode, setDarkMode] = useState<boolean>(colorTheme === "dark");

  // Ensure that the darkMode state is correctly updated when colorTheme changes
  useEffect(() => {
    setDarkMode(colorTheme === "dark");
  }, [colorTheme]);

  const toggleDarkMode = (checked: boolean): void => {
    setTheme(colorTheme);
    setDarkMode(checked);
  };

  return (
    <>
      <div
        className="rounded-xl bg-gray-300 dark:bg-transparent
      "
      >
        <DarkModeSwitch
          checked={darkMode}
          onChange={toggleDarkMode}
          size={24}
          sunColor="var(--accent-100)"
        />
      </div>
    </>
  );
};

export default DarkModeSwitcher;
