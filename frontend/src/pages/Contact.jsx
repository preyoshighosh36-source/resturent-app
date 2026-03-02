import React, { useState } from "react";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus("Please fill all fields.");
      return;
    }

    setStatus("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen py-16 px-6">

      
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Contact <span className="text-orange-500">FlavorNest</span>
        </h1>
        <p className="text-gray-500 mt-4">
          We'd love to hear from you. Reach out for reservations, feedback, or questions.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

        
        <div className="bg-white shadow-xl rounded-xl p-8 hover:shadow-2xl transition">

          <h2 className="text-2xl font-semibold mb-6">Send Message</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />

            <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition">
              Send Message
            </button>

          </form>

          {status && (
            <p className="mt-4 text-green-600 font-medium">{status}</p>
          )}

        </div>

        
        <div className="flex flex-col gap-6 justify-center">

          <h2 className="text-2xl font-semibold">Visit Our Restaurant</h2>

          <div className="flex items-center gap-3 text-gray-600">
            <MapPin className="text-orange-500" />
            Barddhaman, West Bengal, India
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <Phone className="text-orange-500" />
            +91 9876543210
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <Mail className="text-orange-500" />
            contact@flavornest.com
          </div>

          
          <div className="flex gap-5 mt-4">

            <a href="#" className="hover:text-blue-600">
              <Facebook />
            </a>

            <a href="#" className="hover:text-pink-500">
              <Instagram />
            </a>

            <a href="#" className="hover:text-blue-400">
              <Twitter />
            </a>

            <a href="#" className="hover:text-red-500">
              <Youtube />
            </a>

          </div>

        </div>
      </div>

      
      <div className="max-w-6xl mx-auto mt-16">

        <iframe
          title="FlavorNest Location"
          src="https://www.google.com/maps?q=Bardhaman,West+Bengal&output=embed"
          className="w-full h-[400px] rounded-xl shadow-lg border"
          loading="lazy"
        ></iframe>

      </div>
    </div>
  );
};

export default Contact;