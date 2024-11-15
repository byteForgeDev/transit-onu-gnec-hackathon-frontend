"use client";

import React, { useContext, useEffect, useState } from "react";
import { UserLocationContext } from "../context/UserLocationContext";
import GoogleMapView from "../components/GoogleMapView";
import RouteCard from "../components/RouteCard";
import { useSearchParams } from "next/navigation";  
import Navbar from "../components/navbar";

const routeData = [
  {
    time: "08:30am - 09:30am",
    duration: "50 min",
    details: "Train departs every 10 min",
    walkTime: "11 min",
    rating: 3.5,
  },
  {
    time: "02:30am - 09:30am",
    duration: "50 min",
    details: "Train departs every 10 min",
    walkTime: "11 min",
    rating: 3.5,
  },
  {
    time: "07:30am - 09:30am",
    duration: "50 min",
    details: "Train departs every 10 min",
    walkTime: "11 min",
    rating: 3.5,
  },
  {
    time: "09:00am - 09:50am",
    duration: "50 min",
    details: "Train departs every 20 min",
    walkTime: "8 min",
    rating: 4.0,
  },
];

const FindRoute = () => {
  const { userLocation } = useContext(UserLocationContext);
  const searchParams = useSearchParams();
  const routeStopsList = searchParams.get("routeStopsList");
  const destination = searchParams.get("destination");

  const [parsedRouteStops, setParsedRouteStops] = useState([]);
  // Format the user's location as a string for the starting point input
  const formattedLocation = userLocation
    ? `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`
    : "";

  useEffect(() => {
    console.log("Destination:", destination);
    console.log("Raw routeStopsList from query:", routeStopsList);
    console.log("query: ", [searchParams.get("routeStopsList"), searchParams.get("destination")] )

      try {
        const decodedRouteStops = JSON.parse(decodeURIComponent(routeStopsList));
        setParsedRouteStops(decodedRouteStops);
      console.log("Parsed Route Stops 2:", parsedRouteStops);

      } catch (error) {
        console.error("Failed to parse routeStopsList:", error);
      }
  }, [destination, routeStopsList]);

  useEffect(() => {
    console.log("Parsed Route Stops:", parsedRouteStops);
  }, [parsedRouteStops]);

  return (
    <>
      <Navbar />
      <div className="flex h-screen ">
        <div className="md:w-1/3 bglightgray p-2 overflow-y-auto space-y-1 h-screen">
          <div className="flex iconsection items-center mt-2 space-x-3">
            <button className="">
              <i className="fas fa-walking bg-blue-500 rounded-full"></i>
            </button>
            <button className="">
              <i className="fas fa-train bg-purple-500 rounded-full"></i>
            </button>
            <button className="">
              <i className="fas fa-bus p-2 bg-green-500 rounded-full"></i>
            </button>
            <button className="">
              <i className="fas fa-bicycle p-2 bg-blue-500 rounded-full"></i>
            </button>
          </div>
          <div className="space-y-2">
            <div
              style={{ backgroundColor: 'white' }}
              className="flex items-center border border-green-500 rounded-lg p-3"
            >
              <i className="fas fa-arrow-right mr-2"></i>
              <input
                type="text"
                placeholder="Starting Point"
                value={formattedLocation || ''}
                className="w-full focus:outline-none"
                readOnly
              />
            </div>
            <div
              style={{ backgroundColor: 'white' }}
              className="flex items-center border border-green-500 rounded-lg p-3"
            >
              <i className="fas fa-map-marker-alt text-green-500 mr-2"></i>
              <input
                type="text"
                value={destination || ''}
                placeholder="Destination"
                className="w-full focus:outline-none"
                readOnly
              />
            </div>
          </div>

          <hr className="py-4 hrstyle" />

          <div className="space-y-1">
            {routeData.map((route, index) => (
              <RouteCard key={index} route={route} />
            ))}
          </div>
        </div>

        <div className="md:w-2/3">
          <GoogleMapView busStopsList={[]} routeStopsList={parsedRouteStops} />
        </div>
      </div>
    </>
  )
};

export default FindRoute;
