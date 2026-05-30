import {
  createContext,
  useEffect,
  useState
} from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({
  children
}) {

  const [darkMode, setDarkMode] =
    useState(() => {

      return JSON.parse(
        localStorage.getItem("darkMode")
      ) || false;

    });

  useEffect(() => {

    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );

  }, [darkMode]);

  function toggleTheme() {

    setDarkMode((prev) => !prev);

  }

  return (

    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme
      }}
    >

      <div
        className={
          darkMode
            ? "dark bg-gray-900 text-white min-h-screen"
            : "bg-gray-100 text-black min-h-screen"
        }
      >

        {children}

      </div>

    </ThemeContext.Provider>

  );

}