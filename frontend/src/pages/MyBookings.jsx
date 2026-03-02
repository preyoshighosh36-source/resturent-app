import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {

  const { bookings } = useContext(AppContext);
  const navigate = useNavigate();

  if (!bookings || bookings.length === 0) {
    return (
      <div className="h-screen flex flex-col justify-center items-center gap-6 bg-gradient-to-br from-gray-100 to-gray-200">

        <h1 className="text-4xl font-bold text-gray-800">
          No Table Bookings Yet 🍽️
        </h1>

        <p className="text-gray-500">
          Reserve your table and enjoy your meal.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/book-table")}
            className="bg-black text-white px-6 py-3 rounded-xl hover:scale-105 transition"
          >
            Book a Table
          </button>

          <button
            onClick={() => navigate("/")}
            className="border px-6 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            Go Home
          </button>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-10">

      <div className="max-w-6xl mx-auto">

        
        <div className="flex justify-between items-center mb-12">

          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              My Table Bookings
            </h1>
            <p className="text-gray-500">
              Manage your reservations
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-6 py-2 rounded-xl hover:opacity-80 transition"
          >
            Home
          </button>

        </div>

        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {bookings.map((booking) => (

            <div
              key={booking.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border"
            >

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {booking.name}
                </h2>

                <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Reserved
                </span>
              </div>

              <div className="space-y-2 text-gray-600">

                <p>👥 Guests: <span className="font-medium">{booking.guests}</span></p>

                <p>📅 Date: <span className="font-medium">{booking.date}</span></p>

                <p>⏰ Time: <span className="font-medium">{booking.time}</span></p>

                <p>📞 Phone: <span className="font-medium">{booking.phone}</span></p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default MyBookings;