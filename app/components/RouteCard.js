const RouteCard = ({ route }) => {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200 space-y-1">
        <div className="text-sm text-gray-700 flex justify-between">
          <p>
            <span className="font-semibold">Time:</span> {route.time}
          </p>
        </div>
       
         <div className="text-sm text-gray-700 flex justify-between">
         <div className="text-xs iconcss text-gray-500 flex space-x-1 items-center mt-1">
         <i className="fas fa-walking  bg-blue-500 rounded-full"></i>  -- 
         <i className="fas fa-train  bg-purple-500 rounded-full"></i>  --
         <i className="fas fa-bus  bg-green-500 rounded-full"></i>  
 
         </div>
         <p className="font-semibold">{route.duration}</p>
        </div>

        <div className="text-sm text-gray-700 flex justify-between">
          <p>
            <span className="font-semibold"></span> {route.walkTime}
          </p>
          <p className="font-semibold">{route.details}</p>
        </div>  
        <div className="flex items-center justify-between mt-2">
          <button style={{textDecoration:"underline"}} className="text-blue-600 font-semibold text-sm ">
            Details
          </button>
          <i className="fas fa-bookmark"></i>

          <div className="flex items-center space-x-1 text-sm bgblue">
            <span className=" font-semibold">{route.rating}/5</span>
            <i className="fas fa-star text-yellow-500"></i>
            <span className="text-xs ">Avg</span>
          </div>
        </div>
      </div>
    );
  };

  export default RouteCard;