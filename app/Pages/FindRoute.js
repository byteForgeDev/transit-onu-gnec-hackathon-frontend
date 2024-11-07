import React, { useContext } from 'react';
import { UserLocationContext } from '../context/UserLocationContext';
import GoogleMapView from '../components/GoogleMapView';
import RouteCard from '../components/RouteCard';

 const routeData = [
  {
    time: "08:30am - 09:30am",
    duration: "50 min",
    details: "Train departs every 10 min",
    walkTime: "11 min",
    rating: 3.5
  },
  {
    time: "02:30am - 09:30am",
    duration: "50 min",
    details: "Train departs every 10 min",
    walkTime: "11 min",
    rating: 3.5
  },
  {
    time: "07:30am - 09:30am",
    duration: "50 min",
    details: "Train departs every 10 min",
    walkTime: "11 min",
    rating: 3.5
  },
  {
    time: "09:00am - 09:50am",
    duration: "50 min",
    details: "Train departs every 20 min",
    walkTime: "8 min",
    rating: 4.0
  },
];



const FindRoute = () => {
  const { userLocation } = useContext(UserLocationContext);

  return (
    <div className="flex h-screen ">
      
       <div className="md:w-1/3 bglightgray p-2 overflow-y-auto space-y-1 h-screen">
          <div className="flex  iconsection items-center mt-2 space-x-3">
          
          <button className=" ">
          <i className="fas fa-walking  bg-blue-500 rounded-full"></i> 
          </button> 
           <button className=" ">
              <i className="fas fa-train  bg-purple-500 rounded-full"></i>
            </button>
            <button className=" ">
              <i className="fas fa-bus p-2 bg-green-500 rounded-full"></i>
            </button>
            {/* <button className=" ">
              <i className="fas fa-car p-2 bg-yellow-500 rounded-full"></i>
            </button> */}
            <button className="">
              <i className="fas fa-bicycle p-2 bg-blue-500 rounded-full"></i>
            </button>
          </div>
          <div className="space-y-2 " >
            <div style={{backgroundColor:"white"}} className="flex items-center border border-green-500 rounded-lg p-3">
              <i className="fas fa-arrow-right  mr-2"></i>

              <input
                type="text"
                placeholder="Starting Point"
                className="w-full focus:outline-none"
              />
            </div>
            <div style={{backgroundColor:"white"}} className="flex items-center border border-green-500 rounded-lg p-3">
            <i className="fas fa-map-marker-alt text-green-500 mr-2"></i>
            <input
                type="text"
                placeholder="Destination"
                className="w-full focus:outline-none"
              />
            </div>
          </div>

<hr className='py-4 hrstyle'/>

        <div className="space-y-1">
          {routeData.map((route, index) => (
            <RouteCard key={index} route={route} />
          ))}
        </div>
      </div>

       <div className="md:w-2/3 sticky top-0 h-screen">
        <GoogleMapView userLocation={userLocation} />
      </div>
    </div>
  );
};

export default FindRoute;
