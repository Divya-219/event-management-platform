import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Footer() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <footer
      className={`mt-12 py-8 border-t text-center ${
        darkMode
          ? "bg-gray-900 text-gray-300 border-gray-700"
          : "bg-gray-100 text-gray-700 border-gray-300"
      }`}
    >
      <p className="text-lg font-semibold">
        Event Management Platform
      </p>

      <p className="text-sm mt-2">
        © {new Date().getFullYear()} All rights reserved.
      </p>

      
    </footer>
  );
}