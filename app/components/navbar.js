import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNewsDropdownOpen, setIsNewsDropdownOpen] = useState(false);  
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu
  const { isSignedIn, setIsSignedIn } = useAuth();

  const handleUserIconClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNewsIconClick = () => {
    setIsNewsDropdownOpen(!isNewsDropdownOpen);
  };

  const handleLogout = () => {
    // Clear user-related data from localStorage
    localStorage.clear(); // Or localStorage.removeItem('token') if you have a specific item
    // Set the isSignedIn state to false (sign the user out)
    setIsSignedIn(false);
    // Redirect to login page (or home page)
    window.location.href = '/auth/login'; // Adjust the redirect URL as needed
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md w-full px-3 py-2">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo with Image */}
        <div className="flex items-center">
          <img src="/logo.png" alt="AppName Logo" className="w-[140px] object-contain" />
        </div>

        {/* Hamburger Menu Icon */}
        <div className="lg:hidden flex items-center space-x-3">
          <button className="text-gray-600 text-xl" onClick={toggleMenu}>
            <i className="fa fa-bars"></i> {/* Hamburger Icon */}
          </button>
        </div>

        {/* Large Screen Navbar Items */}
        <div className="hidden lg:flex items-center space-x-3 py-1">
          <p>About</p>
          <button className="flex items-center bg-blue-900 text-white px-3 py-2 rounded-full shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none">
            <span className="mr-2 text-sm" style={{ fontSize: '11px' }}>Contact Traffic Officer</span>
            <i className="fa fa-comment text-icon text-white text-lg"></i>
          </button>
          
          {/* Bell Icon with Dropdown for News */}
          <div className="relative">
            <i className="fa fa-bell text-gray-600 text-lg cursor-pointer" onClick={handleNewsIconClick}></i>
            {isNewsDropdownOpen && (
              <div className="absolute right-0 mt-4 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-2 space-y-2">
                <div className="flex flex-col">
                  <div className="font-bold text-sm">New Traffic Regulation</div>
                  <div className="text-xs text-gray-600">The latest traffic regulation is in effect from today.</div>
                </div>
                <hr />
                <div className="flex flex-col">
                  <div className="font-bold text-sm">Road Maintenance Notice</div>
                  <div className="text-xs text-gray-600">Expect delays on Main Street due to ongoing roadwork.</div>
                </div>
                <hr />
                <div className="flex flex-col">
                  <div className="font-bold text-sm">Weather Update</div>
                  <div className="text-xs text-gray-600">Heavy rains are expected this weekend, drive safely!</div>
                </div>
                <hr />
                <div className="flex flex-col">
                  <div className="font-bold text-sm">New Public Transport Routes</div>
                  <div className="text-xs text-gray-600">New routes are being introduced for better connectivity.</div>
                </div>
                <hr />
              </div>
            )}
          </div>

          {/* User Profile Icon with Dropdown */}
          <div className="relative">
            <i
              className="fa fa-user-circle text-gray-600 text-lg cursor-pointer"
              onClick={handleUserIconClick}
            ></i>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {isSignedIn ? (
                  <div className="p-2 space-y-1">
                    <a className="block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-md">Account</a>
                    <a className="block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-md">Settings</a>
                    <button
                      className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-md"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="p-2 space-y-1">
                    <a
                      href="/auth/signup"
                      className="block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-md"
                    >
                      Sign Up
                    </a>
                    <a
                      href="/auth/login"
                      className="block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-md"
                    >
                      Login
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

     

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col space-y-2 p-4 bg-white border-t border-gray-200 shadow-lg mt-3">
          <p>About</p>
          <button className="flex items-center bg-blue-900 text-white px-3 py-2 rounded-full shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none w-full">
            <span className="mr-2 text-sm" style={{ fontSize: '11px' }}>Contact Traffic Officer</span>
            <i className="fa fa-comment text-icon text-white text-lg"></i>
          </button>
          
          <div className="relative">
            <i className="fa fa-bell text-gray-600 text-lg cursor-pointer" onClick={handleNewsIconClick}></i>
            {isNewsDropdownOpen && (
              <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-2 space-y-2">
                <div className="flex flex-col">
                  <div className="font-bold text-sm">New Traffic Regulation</div>
                  <div className="text-xs text-gray-600">The latest traffic regulation is in effect from today.</div>
                </div>
                <hr />
                <div className="flex flex-col">
                  <div className="font-bold text-sm">Road Maintenance Notice</div>
                  <div className="text-xs text-gray-600">Expect delays on Main Street due to ongoing roadwork.</div>
                </div>
                <hr />
                <div className="flex flex-col">
                  <div className="font-bold text-sm">Weather Update</div>
                  <div className="text-xs text-gray-600">Heavy rains are expected this weekend, drive safely!</div>
                </div>
                <hr />
                <div className="flex flex-col">
                  <div className="font-bold text-sm">New Public Transport Routes</div>
                  <div className="text-xs text-gray-600">New routes are being introduced for better connectivity.</div>
                </div>
                <hr />
              </div>
            )}
          </div>

          {/* User Profile Icon with Dropdown */}
          <div className="relative">
            <i
              className="fa fa-user-circle text-gray-600 text-lg cursor-pointer"
              onClick={handleUserIconClick}
            ></i>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {isSignedIn ? (
                  <div className="p-2 space-y-1">
                    <a className="block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-md">Account</a>
                    <a className="block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-md">Settings</a>
                    <button
                      className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-md"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="p-2 space-y-1">
                    <a
                      href="/auth/signup"
                      className="block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-md"
                    >
                      Sign Up
                    </a>
                    <a
                      href="/auth/login"
                      className="block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-md"
                    >
                      Login
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
