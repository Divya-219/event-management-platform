import { Link } from "react-router-dom";
export default function EventCard({ event }) {
  return (

    <div className="bg-white rounded-lg shadow-md overflow-hidden">

      <img
        src={event.image}
        alt={event.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">

       <h2 className="text-xl font-bold mb-1 text-gray-800">
          {event.title}
        </h2>

        <p className="text-sm text-orange-600 font-medium mb-1">{event.category}</p>

        <p  className="text-gray-600 text-sm mb-1">  {event.date} | {event.location}</p>

        <p className="text-gray-600 text-sm mb-1">{event.time}</p>

        <p className="font-semibold mt-2 text-green-600">
          ${event.price}
        </p>
            <Link
            to={`/event/${event.id}`}
            className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            View Details
          </Link>
      </div>

    </div>
  );
}

