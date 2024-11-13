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
<<<<<<< HEAD

const getToken = () => {
  return localStorage.getItem("token");
};

const URL1 = 'http://localhost:8080/api/reviews?sort=none';

const fetchReviews = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(URL1, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const reviews = response.data;
    return reviews;  
  } catch (error) {
    console.log("Error fetching reviews:", error);
    throw error;
  }
};
=======
import { fetchReviews } from '../api/ReviewService'; 
>>>>>>> 09026ae02a6cd9f8464220bfb329816314baa89d

export default function HomePage() {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const [busStopsList, setBusStopsList] = useState([]);
  const [reviews, setReviews] = useState([]);  
  const [error, setError] = useState(null);  
  const [destination, setDestination] = useState("");  
  const router = useRouter();  

  useEffect(() => {
    if (userLocation && userLocation.lat && userLocation.lng) {
      getGooglePlaceBusStops();
    }

     fetchReviews()
      .then((reviews) => {
        setReviews(reviews); 
      })
      .catch((error) => {
        setError("Failed to fetch reviews");
      });

  }, [userLocation]);

  const getGooglePlaceBusStops = () => {
    GlobalApi.getGooglePlaceBusStops(userLocation.lat, userLocation.lng)
      .then((resp) => {
        setBusStopsList(resp.data.data.results);
      })
      .catch((error) => {
        console.error('Failed to fetch bus stops:', error);
      });
  };

   const handleFindRouteClick = () => {
   
      router.push(`/FindRoute?destination=${destination}`);  
    
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

          {reviews && reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewBox
                key={review.id}
                title={review.title}
                rating={review.stars}
                start={review.route.name}
                end={review.route.name}  
                description={review.content}
                onReadMore={() => alert("Read More clicked!")}
              />
            ))
          ) : (
            <div>No reviews are available</div>  
          )}
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
