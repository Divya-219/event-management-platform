import {useContext, useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Hero from "../components/Hero";
import { ThemeContext } from "../context/ThemeContext";




export default function EventsPage() {
  const [events, setEvents] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
     const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);
   const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
  className={`p-8 min-h-screen ${
    darkMode
      ? "bg-gray-900 text-white"
      : "bg-gray-50 text-gray-900"
  }`}
>
       <Hero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
  <h1
  className={`text-4xl font-bold mb-8 text-center ${
    darkMode ? "text-white" : "text-gray-800"
  }`}
>
        Upcoming Events
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
          />
        ))}
      </div>
    </div>
  );
}