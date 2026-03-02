import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import logo3 from "../assets/logo3.png";
import { LogOut, Package, ShoppingCart, UserCircle, Calendar as CalendarIcon } from 'lucide-react';

const Navbar = () => {
  const { navigate, user, setUser,cartCount } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUser(false);
    localStorage.removeItem("user"); 
    navigate("/login");
  };

  return (
    <nav className='bg-cyan-50 shadow-md sticky top-0 z-50 py-3'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>

          
          <div className='flex items-center'>
            <Link to="/">
              <img src={logo3} alt="logo3" className='w-55'/>
            </Link>
          </div>

          
          <div className='hidden md:flex items-center space-x-8'>
            <Link to="/" className='text-gray-700 hover:text-blue-600 transition-colors font-medium'>Home</Link>
            <Link to="/menu" className='text-gray-700 hover:text-blue-600 transition-colors font-medium'>Menus</Link>
            <Link to="/contact" className='text-gray-700 hover:text-blue-600 transition-colors font-medium'>Contact</Link>
          </div>

          
          <div className='flex items-center space-x-4'>

           <button
  onClick={() => navigate("/cart")}
  className='relative p-2 hover:bg-gray-100 rounded-lg transition-colors'
>
  <ShoppingCart size={22} className='text-gray-700'/>

  {cartCount > 0 && (
    <span className='absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium'>
      {cartCount}
    </span>
  )}
</button>

            
            <div className='hidden md:block relative' ref={profileRef}>
              {user ? (
                <>
                  <button
                    className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
                    onClick={() => setIsProfileOpen(prev => !prev)}
                  >
                    <UserCircle size={30} className='text-gray-700'/>
                  </button>

                  {isProfileOpen && (
                    <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50'>
                      <Link to="/my-bookings" className='flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors'>
                        <CalendarIcon size={18} className='mr-3'/>
                        My Bookings
                      </Link>

                      <Link to="/my-orders" className='flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors'>
                        <Package size={18} className='mr-3'/>
                        My Orders
                      </Link>

                      <button
                        onClick={handleLogout}
                        className='flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors'
                      >
                        <LogOut size={18} className='mr-3'/> Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className='bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium cursor-pointer'
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>

        
        <div className='md:hidden'>
          <button
            className='p-2 bg-gray-200 rounded-lg mt-2'
            onClick={() => setIsMenuOpen(prev => !prev)}
          >
            Menu
          </button>

          {isMenuOpen && (
            <div className='py-4 border-t border-gray-200'>
              <div className='flex flex-col space-y-3'>
                <Link to="/" className='text-gray-700 hover:text-blue-600 transition-colors font-medium'>Home</Link>
                <Link to="/menu" className='text-gray-700 hover:text-blue-600 transition-colors font-medium'>Menus</Link>
                <Link to="/contact" className='text-gray-700 hover:text-blue-600 transition-colors font-medium'>Contact</Link>

                {user ? (
                  <div className='relative'>
                    <button
                      className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
                      onClick={() => setIsProfileOpen(prev => !prev)}
                    >
                      <UserCircle size={30} className='text-gray-700'/>
                    </button>

                    {isProfileOpen && (
                      <div className='mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100'>
                        <Link to="/my-bookings" className='flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors'>
                          <CalendarIcon size={18} className='mr-3'/>
                          My Bookings
                        </Link>

                        <Link to="/my-orders" className='flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors'>
                          <Package size={18} className='mr-3'/>
                          My Orders
                        </Link>

                        <button
                          onClick={handleLogout}
                          className='flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors'
                        >
                          <LogOut size={18} className='mr-3'/> Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className='bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium cursor-pointer'
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;