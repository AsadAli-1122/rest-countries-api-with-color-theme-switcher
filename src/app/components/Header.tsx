"use client";

import React, { useState, useEffect } from "react";

const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    const theme = localStorage.getItem("theme") === "dark";
    setDarkMode(theme);
  }, []);

  useEffect(() => {
    if (darkMode === null) return; 

    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  if (darkMode === null) return null; 

  return (
    <div className="flex justify-between items-center p-4 shadow-md bg-white text-black dark:bg-[var(--color-dark-blue)] dark:text-white">
      <div className="max-w-5xl w-full mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Where in the world?</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 py-2 px-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-900 cursor-pointer duration-200 ease-in-out shadow-sm shadow-gray-950/20"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </div>
  );
};

export default Header;
