import React, { useState } from 'react';
import Sidebar from './Sidebar';
import logo1 from './page/img/logo2.png';
import profil from './page/img/pp2.avif';

const Header = ({ onLogout }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);

  return (
    <header className="bg-gradient-to-r from-orange-900 via-orange-200 to-orange-600 py-2 px-8 fixed top-0 left-0 right-0 z-50 w-full">
      <div className="container mx-auto flex items-center justify-between">
        {/* Sidebar Toggle (Hamburger Icon) */}
          <Sidebar />
        
        {/* FoodieVenture Logo (Left) */}
        <div className="flex items-center">
          <img src={logo1} alt="FoodieVenture Icon" className="w-20 h-20 mr-2" />
          <h1 className="text-3xl font-bold text-orange-100 cursor-pointer">
            FoodieVenture
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex items-center w-full max-w-xl ml-4">
          <div className="flex w-full border rounded-lg bg-gray-100">
            <input 
              type="text" 
              className="p-2 w-full rounded-lg bg-transparent text-black placeholder-gray-500 focus:outline-none" 
              placeholder="Search for images, or videos…" 
            />
            <button 
              onClick={() => setIsSearchVisible(!isSearchVisible)} 
              className="p-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Profile Menu & Notifications */}
        <div className="flex items-center space-x-4">
          {/* Notifications Icon (optional) */}
          <svg className="w-6 h-6 text-gray-700 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22c1.104 0 2-.896 2-2H10c0 1.104.896 2 2 2zM19 17V7c0-4-3-7-7-7s-7 3-7 7v10l-2 2v1h18v-1l-2-2z"></path>
          </svg>

          {/* Profile Picture and Menu */}
          <div className="flex items-center">
            <img 
              src={profil} // Changed src link to the imported profil variable
              alt="User" 
              className="w-10 h-10 rounded-full cursor-pointer" 
              onClick={() => setIsProfileMenuVisible(!isProfileMenuVisible)} 
            />
            <span className="ml-2 text-white">Naziya Famala</span>
          </div>
          {isProfileMenuVisible && (
            <div className="absolute top-full mt-0 w-48 bg-white shadow-lg rounded-md py-2">
              <a href="/logout" onClick={onLogout} className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 flex items-center">
                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7" />
                </svg>
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;