
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Search, X } from 'lucide-react';

const Menu = () => {
  const { menus } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMenus, setFilteredMenus] = useState(menus || []);

  
  useEffect(() => {
    if (!searchQuery) {
      setFilteredMenus(menus || []);
    } else {
      const filtered = (menus || []).filter((menu) =>
        menu.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMenus(filtered);
    }
  }, [searchQuery, menus]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white py-12'>
      <div className='container mx-auto px-4'>
        
        <div className='text-center mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold'>
            Our <span className='text-yellow-500'>Menu</span>
          </h1>
          <p className='text-gray-600 max-w-2xl mx-auto mt-2'>
            Explore our delicious selection of handcrafted dishes made with the finest ingredients.
          </p>
        </div>

        
        <div className='max-w-2xl mx-auto mb-8'>
          <div className='relative'>
            <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
            <input
              type='text'
              placeholder='Search for your favorite dish...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-12 py-4 rounded-full border-2 border-gray-200 focus:border-yellow-500 focus:outline-none transition-colors duration-300 text-gray-700 placeholder-gray-400 shadow-md'
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
              >
                <X className='w-5 h-5' />
              </button>
            )}
          </div>
        </div>

        
        <div className='mb-6 text-center'>
          {searchQuery && (
            <p className='text-gray-600'>
              Found <span className='font-semibold text-yellow-600'>{filteredMenus.length}</span>{" "}
              {filteredMenus.length === 1 ? "result" : "results"} for "<span className='italic'>{searchQuery}</span>"
            </p>
          )}
        </div>

        
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {filteredMenus && filteredMenus.length > 0 ? (
            filteredMenus.map((menu) => (
              <div
                key={menu.id}
                className='bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4 flex flex-col items-center text-center'
              >
                <img
                  src={menu.image}
                  alt={menu.name}
                  className='h-40 w-full object-cover rounded-lg mb-4'
                />
                <h3 className='text-lg font-semibold text-gray-800'>{menu.name}</h3>
                <p className='text-gray-500 mt-2'>{menu.description}</p>
                <p className='text-yellow-500 font-bold mt-2'>${menu.price}</p>
              </div>
            ))
          ) : (
            <p className='text-gray-500 col-span-full text-center'>
              {searchQuery ? "No results found." : "Our menu will appear here."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;