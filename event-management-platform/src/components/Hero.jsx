import heroImage from "../assets/image2.jpg";

export default function Hero({
  searchTerm,
  setSearchTerm,
}) {

  return (

    <section className="bg-[#1b1919] text-white rounded-3xl overflow-hidden mb-12 shadow-2xl">

      <div className="grid md:grid-cols-2 items-center">
{/* Left Side */}
        <div className="p-10 md:p-16">

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">

            Discover Amazing Events
            

          </h1>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">

            Book tickets for conferences,
            music festivals, sports events,
            workshops and more.

          </p>
{/*sreach bar*/}
          <div className="flex bg-white rounded-2xl overflow-hidden shadow-lg mb-8">

            <input
              type="text"
              placeholder="Search events by title..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full px-6 py-4 text-gray-700 outline-none"
            />

            <button className="bg-orange-500 hover:bg-orange-600 transition px-8 font-semibold">

              Search

            </button>

          </div>

          

        </div>

{/* Right Side Image */}
        <div className="hidden md:block h-full">

          <img
            src={heroImage}
            alt="Events"
            className="w-full h-full object-cover"
          />

        </div>

      </div>

    </section>
  );
}