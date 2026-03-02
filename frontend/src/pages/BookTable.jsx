import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const BookTable = () => {

  const { addBooking, navigate } = useContext(AppContext);

  const [name, setName] = useState("");
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const [booked, setBooked] = useState(false);

  const handleBooking = () => {

    if (!name || !guests || !date || !time || !phone) {
      alert("Please fill all fields");
      return;
    }

    const newBooking = {
      id: Date.now(),
      name,
      guests,
      date,
      time,
      phone,
    };

    addBooking(newBooking);

    setBooked(true);

    setTimeout(() => {
      navigate("/my-bookings");
    }, 2000);
  };

  if (booked) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">

        <h1 className="text-4xl font-bold mb-4">
          Table Booked Successfully 🎉
        </h1>

        <p>Your reservation is confirmed.</p>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-xl">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Book a Table
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            placeholder="Guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <button
            onClick={handleBooking}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Confirm Booking
          </button>

        </div>

      </div>

    </div>
  );
};

export default BookTable;