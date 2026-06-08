import { useReducer, useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { bookingReducer, initialState } from "../reducers/bookingReducer";

export default function Booking() {
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  const [bookingRef, setBookingRef] = useState("");
  const [errors, setErrors] = useState({});
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { id } = useParams();

  
  useEffect(() => {
  async function fetchEvent() {
    try {
      const res = await fetch(`http://localhost:3000/events/${id}`);

      if (!res.ok) {
        throw new Error("Event not found");
      }

      const data = await res.json();
      setEvent(data);

      if (data.ticketTypes?.length) {
        dispatch({
          type: "SET_TICKET_TYPE",
          payload: data.ticketTypes[0],
        });
      }
    } catch (err) {
      alert(err.message);
      navigate("/");
    }
  }

  fetchEvent();
}, [id, navigate]);
  function validateForm() {
  const newErrors = {};
    if (!state.attendee.name.trim()) newErrors.name = "Name is required";
    if (!state.attendee.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(state.attendee.email))
      newErrors.email = "Invalid email address";
    if (!state.attendee.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(state.attendee.phone))
      newErrors.phone = "Phone must be exactly 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function confirmBooking() {
    if (!validateForm()) return;

    setLoading(true);
    const ref = "BK-" + Date.now();

    const newBooking = {
      
    userId: "user1" ,
      reference: ref,
      quantity: state.quantity,
      ticketType: state.ticketType,
      totalAmount: state.quantity * (state.ticketType?.price || 0),
      attendee: state.attendee,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      status: "confirmed",
      bookingDate: new Date().toISOString(),
    };

   try {
      const res = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking),
      });
      if (!res.ok) throw new Error("Booking failed");

      await res.json();
      setBookingRef(ref);
      dispatch({ type: "NEXT_STEP" });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!event) {
    return (
      <div className="p-8 text-center text-xl font-bold">
        Loading event...
      </div>
    );
  }

  const totalPrice = state.quantity * (state.ticketType?.price || 0);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Ticket Booking</h1>
      <p className="mb-6 text-lg font-semibold text-gray-600">
        Step {state.step} of 3
      </p>

      {/* STEP 1 */}
      {state.step === 1 && (
        <div className={`p-6 rounded-xl shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>Select Tickets</h2>
          <div className="mb-4">
            <p className="font-semibold text-lg">{event.title}</p>
            <p className="text-sm text-gray-500">Date: {event.date} | {event.time}</p>
          </div>

          <select
            value={state.ticketType?.id || ""}
            onChange={(e) => {
              const selected = event.ticketTypes.find(t => t.id === Number(e.target.value));
              if (selected) dispatch({ type: "SET_TICKET_TYPE", payload: selected });
            }}
            className="border p-3 rounded-lg w-full mb-4" >
            {event.ticketTypes.map(t => (
              <option key={t.id} value={t.id}>
                {t.name} - ${t.price}
              </option>
            ))}
          </select>

          <input
            type="number"min="1"
            value={state.quantity}
            onChange={e => dispatch({ type: "SET_QUANTITY", payload: Number(e.target.value) })}
            className="border p-3 rounded-lg w-full mb-4"
          />

          <div className="mb-4 text-lg font-semibold">Total Price: ${totalPrice}</div>

          <button
            onClick={() => state.quantity < 1 ? alert("Select at least 1 ticket") : dispatch({ type: "NEXT_STEP" })}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Continue
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {state.step === 2 && (
        <div className={`p-6 rounded-xl shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>Attendee Details</h2>

          <div className="space-y-4">
            <input type="text" placeholder="Name" value={state.attendee.name}
              onChange={e => { dispatch({ type: "SET_ATTENDEE", payload: { name: e.target.value } }); setErrors(prev => ({ ...prev, name: "" })); }}
              className="border p-3 rounded-lg w-full" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <input type="email" placeholder="Email" value={state.attendee.email}
              onChange={e => { dispatch({ type: "SET_ATTENDEE", payload: { email: e.target.value } }); setErrors(prev => ({ ...prev, email: "" })); }}
              className="border p-3 rounded-lg w-full" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <input type="tel" placeholder="Phone" value={state.attendee.phone}
              onChange={e => { dispatch({ type: "SET_ATTENDEE", payload: { phone: e.target.value } }); setErrors(prev => ({ ...prev, phone: "" })); }}
              className="border p-3 rounded-lg w-full" />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div className="flex gap-4 mt-6">
            <button onClick={() => dispatch({ type: "PREVIOUS_STEP" })} className="bg-gray-300 px-6 py-3 rounded-lg">Back</button>
            <button onClick={confirmBooking} disabled={loading} className="bg-blue-600 text-white px-6 py-3 rounded-lg">
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {state.step === 3 && (
        <div className={`p-6 rounded-xl shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h2 className={`text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}>Booking Confirmed...</h2>
          <p className="mb-3 font-bold">Booking Reference: {bookingRef}</p>
           <p>
        <strong>Event:</strong> {event.title}
      </p>
        <p>
        <strong>Date:</strong> {event.date}
      </p>

      <p>
        <strong>Ticket Type:</strong>{" "}
        {state.ticketType?.name}
      </p>
          <p className="mb-3">Tickets: {state.quantity}</p>
          <p className="mb-3">Name: {state.attendee.name}</p>
          <p className="mb-3">Email: {state.attendee.email}</p>
          <p className="mb-3">Phone: {state.attendee.phone}</p>

          <div className="flex gap-6 mt-6">
            <button onClick={() => dispatch({ type: "PREVIOUS_STEP" })} className="bg-gray-300 px-6 py-3 rounded-lg">Back</button>
            <button onClick={() => { dispatch({ type: "RESET" }); navigate("/my-bookings"); }} className="bg-blue-500 px-6 py-3 rounded-lg">My Bookings</button>
          </div>
        </div>
      )}
    </div>
  );
}