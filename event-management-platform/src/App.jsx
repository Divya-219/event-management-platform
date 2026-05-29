import{
    BrowserRouter,
    Routes,
    Route
}
from "react-router-dom";
import Navbar from "./components/Navbar";
import EventsPage from "./pages/EventsPage";
import EventDetails from "./pages/EventDetails";
import BookingPage from "./pages/BookingPage";
import MyBookings from "./pages/MyBookings";
function App() {
    return(
        <BrowserRouter>
          <Navbar />

            <Routes>
                <Route path="/" element={<EventsPage />} />
                <Route path="/event/:id" element={<EventDetails />} />
                <Route path="/booking/:id" element={<BookingPage />} />
                <Route path="/my-bookings" element={<MyBookings />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App;
