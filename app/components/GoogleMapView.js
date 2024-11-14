'use client'

import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api'
import React, { useContext, useEffect, useState } from 'react'
import { UserLocationContext } from '../context/UserLocationContext'
import { getStops } from '../api/google-place/route'
import Markers from './Markers'

const GoogleMapView = ({ destinationLocation }) => {
  const { userLocation } = useContext(UserLocationContext)
  const [map, setMap] = useState(null)
  const [directionsResponse, setDirectionsResponse] = useState([])
  const [busStopsList, setBusStopsList] = useState([])

  const containerStyle = {
    width: '100%',
    height: '100vh',
  }

  const onLoadMap = async (mapInstance) => {
    setMap(mapInstance)
  }

  const calculateRoute = () => {
    if (userLocation && destinationLocation) {
      const directionsService = new google.maps.DirectionsService()

      const request = {
        origin: userLocation,
        destination: destinationLocation,
        travelMode: google.maps.TravelMode.DRIVING, 
        provideRouteAlternatives: true,  
      }

      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result.routes)
        } else {
          console.error('Directions request failed due to ', status)
        }
      })
    }
  }

  useEffect(() => {
    if (userLocation && destinationLocation) {
      calculateRoute()

      // Fetch bus stops near the user's current location
      const fetchBusStops = async () => {
        try {
          const stops = await getStops(userLocation.lat, userLocation.lng)  
          setBusStopsList(stops)
        } catch (error) {
          console.error('Error fetching bus stops:', error)
        }
      }

      fetchBusStops()
    }
  }, [userLocation, destinationLocation])

  useEffect(() => {
    if (userLocation && destinationLocation && map) {
      // Ihis will Adjust map bounds to show both the user location and destination location
      const bounds = new google.maps.LatLngBounds()
      bounds.extend(userLocation)
      bounds.extend(destinationLocation)
      map.fitBounds(bounds)
    }
  }, [userLocation, destinationLocation, map])

  return (
    <div className="h-screen">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation || { lat: 0, lng: 0 }}
          zoom={17}
          onLoad={onLoadMap}
        >
           {userLocation && (
            <Marker
              position={userLocation}
              title="Your Location"
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', // For test: This is aGreen marker for user current location , 
              }}
            />
          )}

           {destinationLocation && (
            <Marker
              position={destinationLocation}
              title="Destination Location"
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', // For test: This is a Red marker for destination
              }}
            />
          )}

          {/* Render all routes with different colors */}
          {directionsResponse.length > 0 &&
            directionsResponse.map((route, index) => (
              <DirectionsRenderer
                key={index}
                directions={{ routes: [route] }}
                polylineOptions={{
                  strokeColor: `hsl(${(index * 360) / directionsResponse.length}, 100%, 50%)`, // I've used  HSL for different colors
                  strokeWeight: 5,
                }}
              />
            ))}

          {/* Bus stop markers */}
          {Array.isArray(busStopsList) && busStopsList.slice(0, 8).map((busStop, index) => (
            <Marker
              key={index}
              position={{
                lat: busStop.lat,
                lng: busStop.lng
              }}
              title={`Bus Stop: ${busStop.name}`}
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', // For test: I've used  Blue marker  here for bus stops for now
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default GoogleMapView
