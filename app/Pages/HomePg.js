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
import { useRouter } from 'next/navigation';  
import { fetchReviews } from '../api/ReviewService'; 

export default function HomePage() {
  const { userLocation } = useContext(UserLocationContext)
  const [busStopsList, setBusStopsList] = useState([]);
  const [reviews, setReviews] = useState([]);  
  const [error, setError] = useState(null);  
  const [destination, setDestination] = useState('mmmm');  
  const router = useRouter();  

  useEffect(() => {
     if(userLocation?.lat && userLocation?.lng) {
      getGooglePlaceBusStops()
     }

     fetchReviews()
      .then((fetchedReviews) => setReviews(fetchedReviews))
      .catch(() => setError("Failed to fetch reviews"));

  }, [userLocation]);

  const getGooglePlaceBusStops = () => {
    GlobalApi.getGooglePlaceBusStops(userLocation.lat, userLocation.lng)
      .then((resp) => setBusStopsList(resp.data.data.results))
      .catch((error) => console.error('Failed to fetch bus stops:', error))
  };

   const handleFindRouteClick = () => {
    const exampleRouteStops = [
      { lat: 7.138630650306481, lng: -73.12030916267051 },
      { lat: 7.137353168103846, lng: -73.12040572219504 },
      {lat: 7.134414945503464,lng: -73.12034134917869},
      {lat: 7.125426758035116,lng: -73.11838870101585},
    ];
    const validRouteStops = exampleRouteStops.filter(
      (stop) => stop.lat && stop.lng && typeof stop.lat === 'number' && typeof stop.lng === 'number'
    );
    if (validRouteStops.length < 2) {
      console.error('Invalid routeStopsList:', validRouteStops);
      return;
    }
    setDestination("Hi!!!")
    const routeStopsListString = encodeURIComponent(JSON.stringify(validRouteStops));
    const encodedDestination = encodeURIComponent(destination);
    const url = `/FindRoute?routeStopsList=${routeStopsListString}&destination=${destination}`;
    console.log('Navigating to:', url); // Debugging log
    router.push(url);
    
  };

  return (
    <>
      <div className="relative">
        <GoogleMapView busStopsList={busStopsList} />

        <div className="absolute top-[calc(80%-15px)] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-4 rounded-lg shadow-md flex items-center space-y-2 w-11/12 max-w-md md:max-w-lg lg:max-w-xl">
          <InputField />
          <AnimatedButton
            text="Find Routes"
            onClick={handleFindRouteClick} // Call above function on button click
            color="black"
            borderColor="grey"
            shadowColor="grey"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row p-4 gap-3">
        <div className="md:w-1/2 space-y-2">
          {error && <div className="text-red-500">{error}</div>}

          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewBox
                key={review.id}
                title={review.title}
                rating={review.stars}
                start={review.route.name}
                end={review.route.name}
                description={review.content}
                onReadMore={() => alert('Read More clicked!')}
              />
            ))
          ) : (
            <div>No reviews are available</div>
          )}
        </div>

        <div className="md:w-1/2 space-y-2">
          <NewsBox title="News box title" description="This is a brief headline or description for the news box." />
          <NewsBox title="News box title" description="This is a brief headline or description for the news box." />
          <NewsBox title="News box title" description="This is a brief headline or description for the news box." />
        </div>
      </div>
    </>
  )
}
