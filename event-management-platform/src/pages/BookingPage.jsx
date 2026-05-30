import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {
  bookingReducer,
  initialState
} from "../reducers/bookingReducer";

export default function Booking() {

  const [state, dispatch] = useReducer(
    bookingReducer,
    initialState
  );
  const navigate = useNavigate();

  return (

    <div className="p-8 max-w-3xl mx-auto">

      <h1 className="text-4xl font-bold mb-8">
        Ticket Booking
      </h1>
 {/* STEP 1 */}

      {state.step === 1 && (

<div className="bg-white p-6 rounded-xl shadow-md">
 <h2 className="text-2xl font-bold mb-4">
            Select Tickets
          </h2>
 <input type="number"min="1"
            value={state.quantity}
            onChange={(e) =>
              dispatch({
                type: "SET_QUANTITY",
                payload: Number(e.target.value)
              })
            }
            className="border p-3 rounded-lg w-full mb-6"
          />

          <button onClick={() =>
              dispatch({ type: "NEXT_STEP" })
            }
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Continue
          </button>

        </div>

      )}
 {/* STEP 2 */}

      {state.step === 2 && (

        <div className="bg-white p-6 rounded-xl shadow-md">
     <h2 className="text-2xl font-bold mb-4">
            Attendee Details
          </h2>

          <div className="space-y-4">

            <input type="text" placeholder="Name"
              value={state.attendee.name}
              onChange={(e) =>
                dispatch({
                  type: "SET_ATTENDEE",
                  payload: {
                    name: e.target.value
                  }
                })
              }
              className="border p-3 rounded-lg w-full"
            />

            <input
              type="email" placeholder="Email"
              value={state.attendee.email}
              onChange={(e) =>
                dispatch({
                  type: "SET_ATTENDEE",
                  payload: {
                    email: e.target.value
                  }
                })
              }
              className="border p-3 rounded-lg w-full"
            />

            <input type="text" placeholder="Phone"
              value={state.attendee.phone}
              onChange={(e) =>
                dispatch({
                  type: "SET_ATTENDEE",
                  payload: {
                    phone: e.target.value
                  }
                })
              }
              className="border p-3 rounded-lg w-full"
            />

          </div>

          <div className="flex gap-4 mt-6">

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

    const existingBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const newBooking = {
      id: Date.now(),

      quantity: state.quantity,

      attendee: state.attendee,

      bookingDate: new Date().toISOString()
    };

    localStorage.setItem(
      "bookings",
      JSON.stringify([
        ...existingBookings,
        newBooking
      ])
    );

    dispatch({ type: "NEXT_STEP" });

  }}
  className="bg-blue-600 text-white px-6 py-3 rounded-lg"
>
  Confirm Booking
</button>


          </div>

        </div>

      )}
 {/* STEP 3 */}

      {state.step === 3 && (

        <div className="bg-white p-6 rounded-xl shadow-md">

          <h2 className="text-3xl font-bold mb-6">
            Booking Confirmed..
          </h2>

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
            onClick={() => navigate("/my-bookings") }
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