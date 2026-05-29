import { Link } from "react-router-dom";


export default function Navbar() {
  return (

    <nav className="flex items-center justify-between px-8 py-4 shadow-md bg-white">
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

      </div>

    </nav>
  );
}