import React, { useState } from "react";

const ReviewBox = ({ title, rating, start, end, description }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

   const renderStars = () => (
    [...Array(5)].map((_, i) => (
      <i
        key={i}
        className={`fa fa-star ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
      ></i>
    ))
  );

   const toggleDescription = () => setShowFullDescription(!showFullDescription);

  return (
    <div className="bg-white p-4 rounded-lg border border-blue-800">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      
      <div className="flex items-center my-2 space-x-1">{renderStars()}</div>

       <div className="flex items-center my-3">
        <div className="flex flex-col text-sm text-black-600">
          <p className="flex items-center">
            <i className="fa fa-arrow-right mr-1"></i>
            Start: {start}
          </p>
          <p className="flex items-center">
            <i className="fa fa-map-marker-alt mr-1"></i>
            End: {end}
          </p>
        </div>
        
        <div className="flex space-x-2 text-black-500 text-lg ml-4">
          <i className="fa fa-bicycle"></i>
          <i className="fa fa-bus"></i>
          <i className="fa fa-car"></i>
          <i className="fa fa-walking"></i>
          <i className="fa fa-subway"></i>
        </div>
      </div>

       <p className="text-sm text-gray-700">
        {showFullDescription ? description : description.slice(0, 100) + (description.length > 100 ? "..." : "")}
      </p>

       {description.length > 100 && (
        <button
          onClick={toggleDescription}
          className="mt-4 text-sm font-semibold text-blue-500 hover:underline"
        >
          {showFullDescription ? "Show Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default ReviewBox;
