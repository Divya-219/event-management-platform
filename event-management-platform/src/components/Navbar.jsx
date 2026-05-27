import { Link } from "react-router-dom";

export default function Navbar() {
  return (

    <nav className="flex items-center justify-between px-8 py-4 shadow-md bg-white">

      <h1 className="text-2xl font-bold text-blue-600">
        Event Management
      </h1>

      <div className="flex items-center gap-6 text-lg">

        <Link to="/"className="hover:text-blue-600" >
          Events
        </Link>

        <Link to="/my-bookings" className="hover:text-blue-600"
        >
          My Bookings
        </Link>

      </div>

    </nav>
  );
}