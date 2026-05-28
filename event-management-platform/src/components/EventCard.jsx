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

      </div>

    </div>
  );
}

