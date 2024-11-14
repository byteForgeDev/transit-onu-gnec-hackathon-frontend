"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserLocationContext } from "../context/UserLocationContext";
import GoogleMapView from "../components/GoogleMapView";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/navbar";
import { getAddressFromCoordinates, getCoordinatesFromAddress } from "../api/google-place/route";
import RouteCard from "../components/RouteCard";

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
  const destination = searchParams.get("destination") || ""; 
  const [startingAddress, setStartingAddress] = useState("Loading...");
  const [destinationLocation, setDestinationLocation] = useState(null);

  useEffect(() => {
    // Fetch starting address based on user's current location
    if (userLocation?.lat && userLocation?.lng) {
      const fetchAddress = async () => {
        const address = await getAddressFromCoordinates(userLocation.lat, userLocation.lng);
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
          if (coords) setDestinationLocation(coords);
        })
        .catch(error => console.error("Error fetching destination coordinates:", error));
    }
  }, [destination]);

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
            startingLocation={userLocation}
            destinationLocation={destinationLocation}
          />
        </div>
      </div>
    </>
  );
};

export default FindRoute;
