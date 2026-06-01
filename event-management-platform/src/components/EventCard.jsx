import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";


export default function EventCard({ event, favorites = [], toggleFavorite } ) {
const { darkMode } = useContext(ThemeContext);
const isFavorite = favorites.includes(event.id);
  return (

 <div
  className={`rounded-lg shadow-md overflow-hidden relative ${
    darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>

      <button onClick={() => toggleFavorite(event.id)}
        className="absolute top-3 right-3 text-2xl">
        {isFavorite ? "❤️" : "♡"}
      </button>

      <img src={event.image} alt={event.title}className="w-full h-52 object-cover" />

      <div className="p-4">
     <h2 className={`text-xl font-bold mb-1 ${darkMode ? "text-white" : "text-gray-800"}`}>
        {event.title}
        </h2>

        <p className={`text-sm ${darkMode ? "text-orange-400" : "text-orange-600"} font-medium mb-1`}>
          {event.category}
        </p>

        <p className={`text-sm mb-1 ${darkMode? "text-gray-300": "text-gray-600"}`}>  {event.date} | {event.location}</p>

        <p className={`text-sm mb-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          {event.time}
        </p>

        <p className="font-semibold mt-2 text-green-600">
          ${event.price}
        </p>
         <Link to={`/event/${event.id}`}
         className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
>
          View Details
          </Link>
      </div>

    </div>
  );
}

