"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserLocationContext } from "../context/UserLocationContext";
import GoogleMapView from "../components/GoogleMapView";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/navbar";
import { getAddressFromCoordinates, getCoordinatesFromAddress } from "../api/google-place/route";
import RouteCard from "../components/RouteCard";
import { useRouter } from "next/navigation";  

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

// Helper to retrieve the token from localStorage
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};


const FindRoute = () => {
  const { userLocation } = useContext(UserLocationContext);
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination") || ""; 
  const [startingAddress, setStartingAddress] = useState("Loading...");
  const [destinationLocation, setDestinationLocation] = useState(null);
  const routeStopsList = searchParams.get('routeStopsList');
  const [parsedRouteStops, setParsedRouteStops] = useState([]);

  useEffect(() => {
    // Fetch starting address based on user's current location
    if (userLocation?.lat && userLocation?.lng) {
      const fetchAddress = async () => {
        const token = getToken();

        if (!token) {
          throw new Error('No token found in localStorage');
        }
        const address = await getAddressFromCoordinates(userLocation.lat, userLocation.lng, token);
        setStartingAddress(address || "Address not found");
      };
      fetchAddress();
    }
  }, [userLocation]);

  useEffect(() => {
    // Fetch destination location coordinates
    if (destination) {
      getCoordinatesFromAddress(destination)
        .then((coords) => {
          if (coords) setDestinationLocation(coords)
        })
        .catch((error) =>
          console.error('Error fetching destination coordinates:', error)
        )
    }

    try {
      const decodedRouteStops = JSON.parse(decodeURIComponent(routeStopsList))
      setParsedRouteStops(decodedRouteStops)
      console.log('Parsed Route Stops 2:', parsedRouteStops)
    } catch (error) {
      console.error('Failed to parse routeStopsList:', error)
    }
  }, [destination, routeStopsList]);

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <div className="md:w-1/3 bglightgray p-2 overflow-y-auto space-y-1 h-screen">
          <div className="space-y-2">
            <div className="flex items-center border border-green-500 rounded-lg p-3">
              <i className="fas fa-arrow-right mr-2"></i>
              <input
                type="text"
                placeholder="Starting Point"
                value={startingAddress}
                className="w-full focus:outline-none bg-lightgray"
                readOnly
              />
            </div>
            <div className="flex items-center border border-green-500 rounded-lg p-3">
              <i className="fas fa-map-marker-alt text-green-500 mr-2"></i>
              <input
                type="text"
                placeholder="Destination"
                value={destination}
                className="w-full focus:outline-none bg-lightgray"
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
          <GoogleMapView
            destinationLocation={destinationLocation}
            busStopsList={[]}
            routeStopsList={parsedRouteStops}
            startingLocation={userLocation}
          />
        </div>
      </div>
    </>
  )
};

export default FindRoute;
