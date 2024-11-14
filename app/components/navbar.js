// components/Navbar.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isSignedIn, setIsSignedIn } = useAuth();

  const handleUserIconClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Clear user-related data from localStorage
    localStorage.clear() // Or localStorage.removeItem('token') if you have a specific item
    // Set the isSignedIn state to false (sign the user out)
    setIsSignedIn(false)
    // Redirect to login page (or home page)
    window.location.href = '/auth/login' // Adjust the redirect URL as needed
  }

  return (
    <nav className="bg-white shadow-md w-full px-3 py-1">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo / Image Placeholder */}
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-300 mr-3"></div>
          <h1 className="text-xl font-semibold text-gray-800">AppName</h1>
        </div>

        <div className="flex items-center space-x-3 py-1">
          <p>About</p>
          <button className="flex items-center bg-blue-900 text-white px-3 py-2 rounded-full shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none">
            <span className="mr-2 text-sm" style={{ fontSize: '11px' }}>
              Contact Traffic Officer
            </span>
            <i className="fa fa-comment text-icon text-white text-lg"></i>
          </button>
          <i className="fa fa-bell text-gray-600 text-lg cursor-pointer"></i>
          <div className="relative">
            <i
              className="fa fa-user-circle text-gray-600 text-lg cursor-pointer"
              onClick={handleUserIconClick}
            ></i>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {isSignedIn ? (
                  <div className="p-2 space-y-1">
                    <a className="block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-md">
                      Account
                    </a>
                    <a className="block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-md">
                      Settings
                    </a>
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
                      href="/../auth/signup"
                      className="block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-md"
                    >
                      Sign Up
                    </a>
                    <a
                      href="/../auth/login"
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

      <div className="lg:hidden flex justify-end mt-3">
        <button className="text-gray-600">
          <i className="fa fa-bars text-xl"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;