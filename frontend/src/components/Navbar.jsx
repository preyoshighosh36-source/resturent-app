import React, { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import logo3 from "../assets/logo3.png";
import {
  LogOut,
  Package,
  ShoppingCart,
  UserCircle,
  Calendar as CalendarIcon,
  LayoutDashboard
} from "lucide-react";

const Navbar = () => {
  const { navigate, user, admin, logout, cartCount } = useContext(AppContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-cyan-50 shadow-md sticky top-0 z-50 py-3">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/">
            <img src={logo3} className="w-52" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">

            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>

            <Link to="/menu" className="hover:text-blue-600">
              Menus
            </Link>

            <Link to="/contact" className="hover:text-blue-600">
              Contact
            </Link>

            {/* ADMIN DASHBOARD BUTTON */}
            {admin && (
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </button>
            )}

          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">

            {/* CART */}
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 hover:bg-gray-100 rounded-lg"
            >
              <ShoppingCart size={22} />

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* PROFILE */}
            <div className="relative" ref={profileRef}>

              {(user || admin) ? (
                <>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <UserCircle size={30} />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border">

                      {user && (
                        <>
                          <Link
                            to="/my-bookings"
                            className="flex items-center px-4 py-2 hover:bg-gray-100"
                          >
                            <CalendarIcon size={18} className="mr-2" />
                            My Bookings
                          </Link>

                          <Link
                            to="/my-orders"
                            className="flex items-center px-4 py-2 hover:bg-gray-100"
                          >
                            <Package size={18} className="mr-2" />
                            My Orders
                          </Link>
                        </>
                      )}

                      {admin && (
                        <button
                          onClick={() => navigate("/admin/dashboard")}
                          className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"
                        >
                          <LayoutDashboard size={18} className="mr-2" />
                          Dashboard
                        </button>
                      )}

                      <button
                        onClick={logout}
                        className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 w-full"
                      >
                        <LogOut size={18} className="mr-2" />
                        Logout
                      </button>

                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg"
                >
                  Login
                </button>
              )}

            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;