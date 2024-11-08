"use client"
import GoogleMapView from '../components/GoogleMapView';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useContext, useEffect, useState } from 'react';
import { UserLocationContext } from '../context/UserLocationContext';
import InputField from '../components/inputField';
import AnimatedButton from '../UIComponents/AnimBtn';
import ReviewBox from '../components/ReviewBox';
import NewsBox from '../components/newsBox';
import GlobalApi from '../shared/GlobalApi';
  

export default function HomePage() {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const [ busStopsList, setBusStopsList ] = useState([]);

  useEffect(() => {
    if (userLocation && userLocation.lat && userLocation.lng) {
      getGooglePlaceBusStops()
    }
  }, [userLocation])

  const getGooglePlaceBusStops = () => {
    GlobalApi.getGooglePlaceBusStops(userLocation.lat, userLocation.lng)
      .then((resp) => {
        setBusStopsList(resp.data.data.results)
      })
      .catch((error) => {
        console.error('Failed to fetch bus stops:', error)
      })
  }

  return (
   <>
   
       <div className="relative">
        <GoogleMapView busStopsList={busStopsList} />

        {/* Overlay content for input and button component */}
        <div className="absolute top-[calc(80%-15px)] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-4 rounded-lg shadow-md flex items-center space-y-2 w-11/12 max-w-md md:max-w-lg lg:max-w-xl">
          <InputField />
          <AnimatedButton
              text="Find Routes"
            onClick={() => alert("Finding Routes")}
            color="black"
            borderColor="grey"
            shadowColor="grey"
          />
        </div>
      </div>

      {/* Container below the map, holding reviews and news */}
      <div className="flex flex-col md:flex-row p-4 gap-3">
        <div className="md:w-1/2 space-y-2">
          <ReviewBox
            title="Route Review 1"
            rating={4}
            start="Starting Point Name"
            end="Ending Location"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque..."
            onReadMore={() => alert("Read More clicked!")}
          />
          <ReviewBox
            title="Route Review 2"
            rating={5}
            start="Another Starting Point"
            end="Another Ending Location"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque..."
            onReadMore={() => alert("Read More clicked!")}
          />
        </div>

        <div className="md:w-1/2 space-y-2">
          <NewsBox
            title="News box title"
            description="This is a brief headline or description for the news box."
          />
          <NewsBox
            title="News box title"
            description="This is a brief headline or description for the news box."
          />
          <NewsBox
            title="News box title"
            description="This is a brief headline or description for the news box."
          />
        </div>
      </div>
   </>
  );
}
