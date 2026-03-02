
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-20 pb-10 px-6">

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">

        
        <div>
          <h2 className="text-3xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
            🍴 FlavorNest
          </h2>

          <p className="text-gray-400 leading-relaxed text-sm">
            Welcome to <span className="text-yellow-400 font-semibold">FlavorNest</span> —
            where passion meets flavor. We serve freshly prepared meals made with
            high-quality ingredients to give you an unforgettable dining experience.
          </p>

          <p className="text-gray-500 text-sm mt-4">
            From quick bites to special dinners, FlavorNest brings comfort,
            taste, and happiness to your table.
          </p>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-5">
            Explore
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li className="hover:text-yellow-400 transition cursor-pointer hover:translate-x-1">
              Home
            </li>
            <li className="hover:text-yellow-400 transition cursor-pointer hover:translate-x-1">
              Menu
            </li>
            <li className="hover:text-yellow-400 transition cursor-pointer hover:translate-x-1">
              Reservations
            </li>
            <li className="hover:text-yellow-400 transition cursor-pointer hover:translate-x-1">
              Popular Dishes
            </li>
            <li className="hover:text-yellow-400 transition cursor-pointer hover:translate-x-1">
              Contact
            </li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-5">
            Contact
          </h3>

          <div className="space-y-3 text-gray-400 text-sm">
            <p>📍 Bardhaman, West Bengal</p>
            <p>📞 +91 98765 43210</p>
            <p>📧 support@flavornest.com</p>
            <p>⏰ 10:00 AM – 11:00 PM</p>
          </div>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-5">
            Get Delicious Updates
          </h3>

          <p className="text-gray-400 text-sm mb-4">
            Subscribe to receive special offers and new dishes updates.
          </p>

          <div className="flex bg-gray-800 rounded-full overflow-hidden">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 bg-transparent outline-none text-sm"
            />
            <button className="bg-yellow-400 text-black px-5 font-semibold hover:bg-yellow-500 transition">
              Join
            </button>
          </div>

          
          <div className="flex gap-4 mt-6">
            <a className="p-3 bg-gray-800 rounded-full hover:bg-yellow-400 hover:scale-110 transition duration-300 cursor-pointer">
              <FaFacebookF />
            </a>

            <a className="p-3 bg-gray-800 rounded-full hover:bg-yellow-400 hover:scale-110 transition duration-300 cursor-pointer">
              <FaInstagram />
            </a>

            <a className="p-3 bg-gray-800 rounded-full hover:bg-yellow-400 hover:scale-110 transition duration-300 cursor-pointer">
              <FaTwitter />
            </a>

            <a className="p-3 bg-gray-800 rounded-full hover:bg-yellow-400 hover:scale-110 transition duration-300 cursor-pointer">
              <FaYoutube />
            </a>
          </div>
        </div>

      </div>

      
      <div className="border-t border-gray-800 mt-14 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} FlavorNest • Crafted with ❤️ for food lovers
      </div>

    </footer>
  );
}