import { useReducer, useState, useEffect, useContext } from "react";
import { useNavigate,useLocation} from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import {bookingReducer,initialState} from "../reducers/bookingReducer";



export default function Booking() {
const [state, dispatch] = useReducer(bookingReducer, initialState);
const [bookingRef, setBookingRef] = useState("");
const [errors, setErrors] = useState({});
const location = useLocation();
const navigate = useNavigate();
const { darkMode } =useContext(ThemeContext);
const event = location.state?.event;
const ticketTypes = event?.ticketTypes || [];
useEffect(() => {
  if (event?.ticketTypes?.length) {
    dispatch({
      type: "SET_TICKET_TYPE",
      payload: event.ticketTypes[0]
    });
  }
}, [event]);


if (!event) {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">
        Event not found
      </h2>
    </div>
  );
}

 function validateForm() {
  const newErrors = {};
  if (!state.attendee.name.trim()) 
    {
      newErrors.name = "Name is required";
    }
   if (!state.attendee.email.trim()) 
    {
      newErrors.email = "Email is required";
    }
    else if (!/^\S+@\S+\.\S+$/.test( state.attendee.email) ) 
    {
      newErrors.email = "Invalid email address";
    }
    if (!state.attendee.phone.trim()) 
    {
      newErrors.phone = "Phone is required";
    } 
    else if (!/^\d{10}$/.test(state.attendee.phone)) 
    {
      newErrors.phone = "Phone must be exactly 10 digits";
    }
   setErrors(newErrors);
   return (Object.keys(newErrors).length === 0);
  }
 return (
    <div className="p-8 max-w-3xl mx-auto">
    <h1 className="text-4xl font-bold mb-8">Ticket Booking</h1>
    <p className="mb-6 text-lg font-semibold text-gray-600">
    Step {state.step} of 3
   </p>
{/* STEP 1 */}

{state.step === 1 && (
  <div className={`p-6 rounded-xl shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
  <h2 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
      Select Tickets
  </h2>

 {/* Event Info */}
    <div className="mb-4">
      <p className="font-semibold text-lg">
        {event?.title}
      </p>

      <p className="text-sm text-gray-500">
        Date: {event?.date} | {event?.time}
      </p>
    </div>

{/* Ticket Type */}
    <select
      value={state.ticketType?.id || ""}
     onChange={(e) => {
  const selected = ticketTypes.find(
    (t) => t.id === Number(e.target.value)
  );

  if (!selected) return;

  dispatch({
    type: "SET_TICKET_TYPE",
    payload: selected
  });
}}
      className="border p-3 rounded-lg w-full mb-4">
      {ticketTypes.map((t) => (
        <option key={t.id} value={t.id}>
          {t.name} - ${t.price}
        </option>
      ))}
    </select>

{/* Quantity */}
    <input type="number" min="1"
      value={state.quantity}
      onChange={(e) =>
        dispatch({
          type: "SET_QUANTITY",
          payload: Number(e.target.value)
        })
      }
      className="border p-3 rounded-lg w-full mb-4"
    />

 {/* Total */}
    <div className="mb-4 text-lg font-semibold">
     Total Price: $
    {state.quantity * (state.ticketType?.price || 0)}
    </div>
    <button
      onClick={() => {
        if (state.quantity < 1) {
          alert("Please select at least 1 ticket");
          return;
        }
        dispatch({ type: "NEXT_STEP" });
      }}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg" >
      Continue
    </button>

  </div>
)}

 {/* STEP 2 */}
   {state.step === 2 && (
    <div className={`p-6 rounded-xl shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
     <h2 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
          Attendee Details
      </h2>

    <div className="space-y-4">
   <input type="text" placeholder="Name"
     value={state.attendee.name}
     onChange={(e) => {
    dispatch({
    type: "SET_ATTENDEE",
    payload: { name: e.target.value }
  });
  setErrors((prev) => ({
    ...prev,
    name: ""
  }));
}}
  
className="border p-3 rounded-lg w-full"/>

{errors.name && (
  <p className="text-red-500 text-sm">
    {errors.name}
  </p>
)}

<input type="email"placeholder="Email"
  value={state.attendee.email}
  onChange={(e) => {
  dispatch({
    type: "SET_ATTENDEE",
    payload: { email: e.target.value }
  });

  setErrors((prev) => ({
    ...prev,
    email: ""
  }));
}}
className="border p-3 rounded-lg w-full"/>
{errors.email && (
<p className="text-red-500 text-sm">
  {errors.email}
  </p>
)}

<input type="tel" placeholder="Phone"
  value={state.attendee.phone}
  onChange={(e) => {
    dispatch({
      type: "SET_ATTENDEE",
      payload: {
        phone: e.target.value
      }
    });

    setErrors((prev) => ({
      ...prev,
      phone: ""
    }));
  }}
  className="border p-3 rounded-lg w-full"/>

{errors.phone && (
  <p className="text-red-500 text-sm">
    {errors.phone}
  </p>
)}
</div>

    <div className="flex gap-4 mt-6">
    <button onClick={() =>
        dispatch({ type: "PREVIOUS_STEP" })
                    }
       className="bg-gray-300 px-6 py-3 rounded-lg" >
        Back
    </button>
<button onClick={() => {
      if (!validateForm()) return;
      const existingBookings =JSON.parse(localStorage.getItem("bookings")) || [];
       const ref = "BK-" + Date.now();
      const newBooking = {
         id: Date.now(),
        reference: ref,
         quantity: state.quantity,
        ticketType: state.ticketType,
        totalAmount: state.quantity * (state.ticketType?.price || 0),
        attendee: state.attendee,
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        status: "confirmed",
        bookingDate: new Date().toISOString()
      };

      setBookingRef(ref); 
      localStorage.setItem(
      "bookings",
      JSON.stringify([...existingBookings, newBooking])
      );

    dispatch({ type: "NEXT_STEP" });
}}
  className="bg-blue-600 text-white px-6 py-3 rounded-lg">
  Confirm Booking
  </button>
      
  </div>
  </div>
    )}
 {/* STEP 3 */}

      {state.step === 3 && (

        <div className={`p-6 rounded-xl shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h2 className={`text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}>
            Booking Confirmed..
          </h2>

        <p className="mb-3 font-bold">
           Booking Reference: {bookingRef}
        </p>
          <p className="mb-3">
            Tickets: {state.quantity}
          </p>

          <p className="mb-3">
            Name: {state.attendee.name}
          </p>

          <p className="mb-3">
            Email: {state.attendee.email}
          </p>

          <p className="flex gap-8 mb-6">
            Phone: {state.attendee.phone}
          </p>
          <div className="flex gap-6 mt-6">
          <button
            onClick={() =>
              dispatch({ type: "PREVIOUS_STEP" })
            }
            className="bg-gray-300 px-6 py-3 rounded-lg"
          >
            Back
          </button>
            <button
            onClick={() => {
  dispatch({ type: "RESET" });
  navigate("/my-bookings");
}}
            className="  bg-blue-500 px-6 py-3 rounded-lg"
          >
            My Bookings
          </button>
        </div>
      </div>
      )}

    </div>

  );

}