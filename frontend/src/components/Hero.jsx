import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import hero from "../assets/hero.avif";

const Hero = () => {
  const { navigate } = useContext(AppContext);

  return (
    <div className="relative w-full h-[90vh]">
      
      <img
        src={hero}
        alt="hero"
        className="w-full h-full object-cover"
      />

      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/60">
        <h1 className="text-5xl font-bold mb-4">Welcome to</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-center">
          Experience the taste of perfection - where every bite tells a story.
        </p>

        
        <div className="flex gap-4">
        
          <button
            onClick={() => navigate("/menu")}
            className="bg-orange-500 px-6 py-3 rounded-lg font-semibold 
                       shadow-md hover:shadow-lg transition-all duration-300"
          >
            Explore Menu
          </button>

          
          <button
            onClick={() => navigate("/book-table")}
            className="cursor-pointer bg-transparent border-2 border-orange-500 text-white 
                       font-semibold px-6 py-3 rounded-full backdrop-blur-sm 
                       hover:bg-orange-500 hover:text-white hover:scale-105 
                       transition-all duration-300 shadow-md"
          >
            Book a Table
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;