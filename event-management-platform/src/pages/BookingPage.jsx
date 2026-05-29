import { useReducer } from "react";

import {
  bookingReducer,
  initialState
} from "../reducers/bookingReducer";

export default function Booking() {

  const [state, dispatch] = useReducer(
    bookingReducer,
    initialState
  );

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
              onClick={() =>
                dispatch({ type: "NEXT_STEP" })
              }
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Continue
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

          <p className="mb-6">
            Phone: {state.attendee.phone}
          </p>

          <button
            onClick={() =>
              dispatch({ type: "PREVIOUS_STEP" })
            }
            className="bg-gray-300 px-6 py-3 rounded-lg"
          >
            Back
          </button>

        </div>

      )}

    </div>

  );

}