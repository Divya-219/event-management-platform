import { useContext, useEffect, useState, useMemo } from "react";
import EventCard from "../components/EventCard";
import Hero from "../components/Hero";
import { ThemeContext } from "../context/ThemeContext";
import Footer from "../components/Footer";



export default function EventsPage() {
const [events, setEvents] = useState([]);
const [error, setError] = useState("");
const [searchTerm, setSearchTerm] = useState("");
 const { darkMode } = useContext(ThemeContext);
const [category, setCategory] =useState("All");
const [sortBy, setSortBy] =useState("");
const [dateFilter, setDateFilter] = useState("All");
const [priceFilter, setPriceFilter] = useState("All");
const [loading, setLoading] = useState(true);
const [favorites, setFavorites] = useState(() => {
return JSON.parse(localStorage.getItem("favorites")) || [];
});
function toggleFavorite(eventId) 
{
  let updatedFavorites;
 if (favorites.includes(eventId)) 
  {
    updatedFavorites = favorites.filter((id) => id !== eventId);
  } else 
  {
    updatedFavorites = [...favorites, eventId];
  }
  setFavorites(updatedFavorites);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
}
    useEffect(() => {
  fetch("http://localhost:3000/events")
    .then((res) => res.json())
    .then((data) => {
      setEvents(data);
      setLoading(false);
    })
    .catch((error) => {
  console.error(error);
  setError("Failed to load events.");
  setLoading(false);
    });
    }, []);
   if (error) {
  return (
    <div className="p-8 text-center text-red-500 text-xl">
      {error}
    </div>
  );
}
   
const filteredEvents =useMemo(() => {
  return events
    .filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        category === "All" ? true : event.category === category;

      const eventDate = new Date(event.date);
      const today = new Date();

      let matchesDate = true;

      if (dateFilter === "Upcoming") {
        matchesDate = eventDate >= today;
      }

      if (dateFilter === "This Week") {
        const weekFromNow = new Date();
        weekFromNow.setDate(today.getDate() + 7);
        matchesDate = eventDate >= today && eventDate <= weekFromNow;
      }

      if (dateFilter === "This Month") {
        const monthFromNow = new Date();
        monthFromNow.setMonth(today.getMonth() + 1);
        matchesDate = eventDate >= today && eventDate <= monthFromNow;
      }

      let matchesPrice = true;

      if (priceFilter === "Free") {
        matchesPrice = event.price === 0;
      }

      if (priceFilter === "Under50") {
        matchesPrice = event.price < 50;
      }

      if (priceFilter === "50Plus") {
        matchesPrice = event.price >= 50;
      }

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDate &&
        matchesPrice
      );
    })
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "date") return new Date(a.date) - new Date(b.date);
      return 0;
    });
}, [
  events,
  searchTerm,
  category,
  dateFilter,
  priceFilter,
  sortBy
]);



  if (loading) {
  return (
    <div className="p-8 text-center text-2xl">
      Loading Events...
    </div>
  );
}
  return (
    <div
  className={`p-8 min-h-screen ${darkMode? "bg-gray-900 text-white": "bg-gray-50 text-gray-900"}`}>
       <Hero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}/>

      
  <h1
  className={`text-4xl font-bold mb-8 text-center ${
    darkMode ? "text-white" : "text-gray-800"}`}>
  
        Upcoming Events
  </h1>

  <div className="flex flex-wrap gap-4 mb-8">

  <select
    value={category}
    onChange={(e) =>
      setCategory(e.target.value)
    }
    className={`border p-3 rounded-lg ${
  darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black"
}`}>
    <option>All</option>
    <option>Music</option>
    <option>Sports</option>
    <option>Technology</option>
    <option>Business</option>
  </select>

  <select
    value={sortBy}
    onChange={(e) =>
      setSortBy(e.target.value)
    }
    className={`border p-3 rounded-lg ${
  darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black"
}`}>
    <option value="">
      Sort By
    </option>

    <option value="price">
      Price
    </option>

    <option value="date">
      Date
    </option>

  </select>


{/* DATE FILTER */}
<select
  value={dateFilter}
  onChange={(e) => setDateFilter(e.target.value)}
  className={`border p-3 rounded-lg ${
  darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black"
}`}>
  <option value="All">All Dates</option>
  <option value="Upcoming">Upcoming</option>
  <option value="This Week">This Week</option>
  <option value="This Month">This Month</option>
</select>

{/* PRICE FILTER */}
<select
  value={priceFilter}
  onChange={(e) => setPriceFilter(e.target.value)}
  className={`border p-3 rounded-lg ${
  darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black"
}`}>
  <option value="All">All Prices</option>
  <option value="Free">Free</option>
  <option value="Under50">Under $50</option>
  <option value="50Plus">$50+</option>
</select>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

 {filteredEvents.length === 0 ? (
  <div className="col-span-full text-center text-xl">
    No events found.
  </div>
) : (
  filteredEvents.map((event) => (
    <EventCard
      key={event.id}
      event={event}
      favorites={favorites}
      toggleFavorite={toggleFavorite}
    />
  ))
)}
</div>
<Footer />
    </div>
  );
}