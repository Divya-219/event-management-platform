export const initialState = {

  step: 1,

  quantity: 1,
  ticketType: { id: 1, name: "General", price: 50 },
  attendee: {
    name: "",
    email: "",
    phone: ""
  }

};


export function bookingReducer(state, action) {
  switch (action.type) {

    case "SET_QUANTITY":
      return {
        ...state,
        quantity: action.payload
      };

    case "SET_TICKET_TYPE":
      return {
        ...state,
        ticketType: action.payload
      };

    case "SET_ATTENDEE":
      return {
        ...state,
        attendee: {
          ...state.attendee,
          ...action.payload
        }
      };

    case "NEXT_STEP":
      return {
        ...state,
        step: state.step + 1
      };

    case "PREVIOUS_STEP":
      return {
        ...state,
        step: state.step - 1
      };

    default:
      return state;
  }
}
