import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ShoppingCart } from "lucide-react";

const MenuCard = ({ menu }) => {
  const { navigate, addToCart } = useContext(AppContext);

  const handleAdd = () => {
    if (!menu.isAvailable) return;
    addToCart(menu, 1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">

      <div
        onClick={() => navigate(`/menu-details/${menu._id}`)}
        className="relative h-56 overflow-hidden cursor-pointer"
      >
        <img
          src={menu.image}
          alt={menu.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {!menu.isAvailable && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 rounded-full text-sm font-semibold">
            Unavailable
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {menu.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4">
          {menu.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <p className="text-2xl font-bold text-gray-900">
            ₹{menu.price}
          </p>

          <button
            onClick={handleAdd}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all duration-300 ${
              menu.isAvailable
                ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;