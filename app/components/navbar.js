// components/Navbar.js
import React from 'react';
 
const Navbar = () => {
  return (
    <nav className="bg-white shadow-md w-full px-3 py-1">
      <div className="container mx-auto flex items-center justify-between">
        
        {/* Logo / Image Placeholder on the left side in navbar */}
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-300 mr-3"></div>
          <h1 className="text-xl font-semibold text-gray-800">AppName</h1>
        </div>
        
        <div className="flex items-center space-x-3 py-1">
          <p>About</p>
        <button className="flex items-center bg-blue-900 text-white px-3 py-2 rounded-full shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none">
      <span className="mr-2 text-sm" style={{fontSize:"11px"}}>Contact Traffic Officer</span>
      <i className="fa fa-comment text-icon text-white text-lg"></i>
       </button> 
    <i className="fa fa-bell text-gray-600 text-lg cursor-pointer"></i>
          <i className="fa fa-user-circle text-gray-600 text-lg cursor-pointer"></i>
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
