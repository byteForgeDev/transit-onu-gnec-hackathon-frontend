// components/InputField.js
import React from 'react';

const InputField = () => {
  return (
    <div className="flex items-center w-full bg-gray-50 border border-gray-200 rounded-md">
      <span className="pl-3 text-green-600">
        <i className="fas fa-map-marker-alt h-6 w-6" aria-hidden="true"></i>
      </span>
      <input
        type="text"
        placeholder="Enter destination"
        className="w-full p-3 bg-gray-50 outline-none text-gray-600 rounded-r-md"
      />
    </div>
  );
};

export default InputField;
