import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() 
{
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  return (
  <nav className={`flex items-center justify-between px-8 py-4 shadow-md 
      ${darkMode ? "bg-gray-900 text-white": "bg-white text-black" }`}>
  <div className="flex items-center gap-3">

  <img src="/images/Logo.png"alt="Event Logo"className="h-10 w-10"/>
      <h1 className="text-2xl font-bold text-orange-500">
      Event Management Platform
      </h1>
      </div>
      <div className="flex items-center gap-6 text-lg">
      <Link to="/"className="hover:text-orange-600 transition"> 
          Events
        </Link>

        <Link to="/my-bookings" className="hover:text-orange-600 transition">
          My Bookings
        </Link>
      <button onClick={toggleTheme}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg"> {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </div>

    </nav>
  );
}