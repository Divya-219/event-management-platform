import { useContext,useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export default function EventDetails() {
 const { darkMode } = useContext(ThemeContext);
  const { id } = useParams();

  const [event, setEvent] = useState(null);

  useEffect(() => {

    fetch(`http://localhost:3000/events/${id}`)
      .then((response) => response.json())

      .then((data) => setEvent(data));
      

  }, [id]);

  if (!event) {
    return (
      <div className="p-8 text-xl">
        Loading...
      </div>
    );
  }

  return (

    <div className="p-8 max-w-5xl mx-auto">

     <img src={event.image} alt={event.title}
        className="w-full h-[500px] object-cover rounded-2xl mb-8"
      />


      <span className="text-orange-600 font-bold text-2xl">
        {event.category}
      </span>

      <h1 className="text-3xl font-bold mt-3 mb-6">
        {event.title}
      </h1>

      <p className={`text-lg mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
        Location: {event.location}
      </p>

      <p className={` text-lg mb-6  
      ${darkMode ? "text-gray-300": "text-gray-600" }`}>
        Date: {event.date} | Time: {event.time}
      </p>

      <p className="text-2xl font-bold text-green-600 mb-8">
        ${event.price}
      </p>

      <p className="text-lg leading-8 mb-10">
        {event.description}
      </p>

      <Link
        to={`/booking/${event.id}`} state={{ event }}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
      >
        Book Tickets
      </Link>

    </div>

  );

}