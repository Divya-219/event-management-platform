import { useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export default function MyBookings() {
  const { darkMode } = useContext(ThemeContext);

  const [bookings, setBookings] =
    useState(() => {

      return JSON.parse(

        localStorage.getItem("bookings") || "[]"

      );

    });


  function cancelBooking(id) {

    const updatedBookings =
      bookings.filter((booking) => booking.id !== id);

    setBookings(updatedBookings);

    localStorage.setItem(
      "bookings",
      JSON.stringify(updatedBookings)
    );

  }

  return (

    <div className="p-8 max-w-5xl mx-auto">

      <h1 className="text-4xl font-bold mb-8">
        My Bookings
      </h1>

      {bookings.length === 0 ? (

        <p>No bookings yet.</p>

      ) : (

        <div className="space-y-6">

          {bookings.map((booking) => (

            <div
              key={booking.id}
              className={`p-6 rounded-xl shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`} >

              <h2 className={`text-2xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-800"}`}>
                {booking.attendee.name}
              </h2>

              <p className={`mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Email: {booking.attendee.email}
              </p>

              <p className={`mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Phone: {booking.attendee.phone}
              </p>

              <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Tickets: {booking.quantity}
              </p>

              <button
                onClick={() =>
                  cancelBooking(booking.id)
                }
                className={`px-5 py-2 rounded-lg ${darkMode ? "bg-blue-500 text-white" : "bg-blue-500 text-white"}`} >
                Cancel Booking
              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}