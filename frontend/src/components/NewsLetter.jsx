import React, { useState } from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    
    if (!email) {
      setStatus({ type: "error", message: "Please enter a valid email." });
      return;
    }
    setStatus({ type: "success", message: "Subscribed successfully!" });
    setEmail("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 py-16 px-4 md:px-8 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center space-y-6"
    >
      
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 animate-fadeIn">
        Never Miss a Taste!
      </h2>

      
      <p className="text-gray-700 md:text-lg max-w-xl">
        Subscribe to receive our latest dishes, exclusive offers, and chef's specials directly in your inbox.
      </p>

      
      <form
        onSubmit={handleSubscribe}
        className="flex flex-col sm:flex-row w-full max-w-2xl border border-gray-300 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
      >
        <input
          type="email"
          placeholder="Enter your email id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-3 text-gray-700 outline-none border-b sm:border-b-0 sm:border-r border-gray-300 focus:ring-2 focus:ring-red-400 transition-all"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-500 text-white font-semibold px-6 py-3 hover:bg-red-600 transition-all duration-300"
        >
          Subscribe
        </motion.button>
      </form>

      
      {status && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-sm font-medium ${
            status.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {status.message}
        </motion.p>
      )}
    </motion.div>
  );
};

export default Newsletter;