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
import Pagination from '../components/pagination';

export default function HomePage() {
  const { userLocation } = useContext(UserLocationContext);
  const [busStopsList, setBusStopsList] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [destination, setDestination] = useState("");
  const [currentPage, setCurrentPage] = useState(1);  
  const reviewsPerPage = 2;  
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
        setError('Failed to fetch reviews');
      });
  }, [userLocation]);

  const getGooglePlaceBusStops = () => {
    GlobalApi.getGooglePlaceBusStops(userLocation.lat, userLocation.lng)
      .then((resp) => setBusStopsList(resp.data.data.results))
      .catch((error) => console.error('Failed to fetch bus stops:', error));
  };

  const handleFindRouteClick = () => {
    const formattedDestination = destination.replace(/\s+/g, '-');
    // const exampleRouteStops = [
    //   {    "lat": 7.138630650306481,    "lng": -73.12030916267051},
    //   {    "lat": 7.137353168103846,    "lng": -73.12040572219504},
    //   {    "lat": 7.134414945503464,    "lng": -73.12034134917869},
    //   {    "lat": 7.125426758035116,    "lng": -73.11838870101585},
    //   {    "lat": 7.1073745508056625,    "lng": -73.11415426396884},
    //   {    "lat": 7.102557448785846,    "lng": -73.11115951968672},
    //   {    "lat": 7.085780367561053,    "lng": -73.1079185826894},
    //   {    "lat": 7.071544919330213,    "lng": -73.1060893793183},
    //   {    "lat": 7.060699223994249,    "lng": -73.09147634303929}
    
    // ];
    const exampleRouteStops = [];
    const validRouteStops = exampleRouteStops.filter(
      (stop) => stop.lat && stop.lng && typeof stop.lat === 'number' && typeof stop.lng === 'number'
    );
    if (validRouteStops.length < 1) {
      console.log("lulu op");
    } else if (validRouteStops.length < 2) {
      console.error('Invalid routeStopsList:', validRouteStops);
      return;
    }
    const routeStopsListString = encodeURIComponent(JSON.stringify(validRouteStops));
    const encodedDestination = encodeURIComponent(destination);
    const url = `/FindRoute?routeStopsList=${routeStopsListString}&destination=${formattedDestination}`;
    console.log('Navigating to:', url); // Debugging log
    router.push(url);
  };

  // Get current reviews based on pagination
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage); 

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="relative">
        <GoogleMapView busStopsList={busStopsList} />

        <div className="absolute top-[calc(80%-15px)] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-4 rounded-lg shadow-md flex items-center space-y-2 w-11/12 max-w-md md:max-w-lg lg:max-w-xl">
          <InputField value={destination} onChange={setDestination} />
          <AnimatedButton
            text="Find Routes"
            onClick={handleFindRouteClick}
            color="black"
            borderColor="grey"
            shadowColor="grey"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row p-4 gap-3">
        <div className="md:w-1/2 space-y-2">
          {error && <div className="text-red-500">{error}</div>}

          {currentReviews && currentReviews.length > 0 ? (
            currentReviews.map((review) => (
              <ReviewBox
                key={review.id}
                title={review.title}
                rating={review.stars}
                start={review.route.name}
                end={review.route.name}
                description={review.content}
              />
            ))
          ) : (
            <div>No reviews are available</div>
          )}

           <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
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
