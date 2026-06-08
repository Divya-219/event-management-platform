import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function MyBookings() {
  const { darkMode } = useContext(ThemeContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
  fetch("http://localhost:3000/bookings?userId=user1")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  function cancelBooking(id)
  {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");

    if (!confirmCancel) return;
  fetch(`http://localhost:3000/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "cancelled" }),
    })
      .then(() => {
        setBookings((prev) =>
          prev.map((b) =>
            b.id === id ? { ...b, status: "cancelled" } : b
          )
        );
      });
  }

  const filteredBookings = bookings.filter((b) => {
    const eventDate = new Date(b.eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    if (filter === "all") return true;
    if (filter === "upcoming") return eventDate >= today;
    if (filter === "past") return eventDate < today;

    return true;
  });

  if (loading) {
    return <p className="p-8">Loading bookings...</p>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">My Bookings</h1>

      
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setFilter("all")}
          className="px-4 py-2 bg-gray-300 rounded" >
          All
        </button>
        <button
          onClick={() => setFilter("upcoming")}
          className="px-4 py-2 bg-green-500 text-white rounded">
          Upcoming
        </button>
        <button
          onClick={() => setFilter("past")}
          className="px-4 py-2 bg-red-500 text-white rounded">
          Past
        </button>
      </div>

      {filteredBookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-6">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className={`p-6 rounded-xl shadow-md ${darkMode ? "bg-gray-800 text-white" : "bg-white" }`}>
              <h2 className="text-2xl font-bold mb-2">
                {b.eventTitle}
              </h2>

              <p className="mb-2">
                Event Date: {new Date(b.eventDate).toLocaleDateString()}
              </p>

              <p className="mb-2">Tickets: {b.quantity}</p>

              <p className="mb-2 font-bold text-green-500">
                Total: ${b.totalAmount}
              </p>

              <p className="mb-4">
                Status:{" "}
                <span
                  className={
                    b.status === "cancelled" ? "text-red-500" : "text-green-500"
                  } >
                  {b.status}
                </span>
              </p>

              <button
                onClick={() => cancelBooking(b.id)}
                disabled={b.status === "cancelled"}
                className={`px-4 py-2 rounded-lg ${
                  b.status === "cancelled"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 text-white" }`}>
                {b.status === "cancelled" ? "Cancelled" : "Cancel Booking"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}