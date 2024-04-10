import React, { useState, useEffect } from "react";
import useDarkSide from "@/hooks/useDarkSide"; // Adjust the path as necessary
import { DarkModeSwitch } from "react-toggle-dark-mode";

const DarkModeSwitcher: React.FC = () => {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState<boolean>(colorTheme === "dark");

  // Ensure that the darkSide state is correctly updated when colorTheme changes
  useEffect(() => {
    setDarkSide(colorTheme === "dark");
  }, [colorTheme]);

  const toggleDarkMode = (checked: boolean): void => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <>
      <div
        className="rounded-xl bg-gray-300 dark:bg-transparent
      "
      >
        <DarkModeSwitch
          checked={darkSide}
          onChange={toggleDarkMode}
          size={24}
        />
      </div>
    </>
  );
};

export default DarkModeSwitcher;
