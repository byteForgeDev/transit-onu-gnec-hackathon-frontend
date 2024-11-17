
export const findClosestStop = async (origin, stops) => {
    if (!origin || stops.length === 0) return null;
  
    const distances = await Promise.all(
      stops.map(async (stop) => {
        const distanceMatrixService = new google.maps.DistanceMatrixService();
        return new Promise((resolve, reject) => {
          distanceMatrixService.getDistanceMatrix(
            {
              origins: [origin],
              destinations: [{ lat: stop.lat, lng: stop.lng }],
              travelMode: google.maps.TravelMode.DRIVING,
            },
            (response, status) => {
              if (status === google.maps.DistanceMatrixStatus.OK) {
                const distance = response.rows[0].elements[0].distance.value; // Distance in meters
                resolve({ stop, distance });
              } else {
                reject(`Error fetching distance matrix: ${status}`);
              }
            }
          );
        });
      })
    );
  
    // Sort stops by distance and return the closest one
    const closest = distances.sort((a, b) => a.distance - b.distance)[0];
    return closest ? closest.stop : null;
  };
  
  export const calculateOptimizedRoute = async ({
    userLocation,
    destinationLocation,
    busStopsList,
    setDirections,
  }) => {
    if (!userLocation || !destinationLocation || busStopsList.length === 0) return;
  
    try {
      // Find closest stops
      const closestToUser = await findClosestStop(userLocation, busStopsList);
      const closestToDestination = await findClosestStop(destinationLocation, busStopsList);
  
      if (closestToUser && closestToDestination) {
        const directionsService = new google.maps.DirectionsService();
  
        const request = {
          origin: { lat: closestToUser.lat, lng: closestToUser.lng },
          destination: { lat: closestToDestination.lat, lng: closestToDestination.lng },
          travelMode: google.maps.TravelMode.DRIVING,
        };
  
        directionsService.route(request, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error('Failed to fetch optimized directions:', status);
          }
        });
      } else {
        console.warn('No valid stops found for optimization.');
      }
    } catch (error) {
      console.error('Error optimizing route:', error);
    }
  };