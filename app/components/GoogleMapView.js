'use client'

import { GoogleMap, DirectionsRenderer, useLoadScript } from '@react-google-maps/api'
import React, { useContext, useEffect, useState } from 'react'
import { UserLocationContext } from '../context/UserLocationContext'
import Markers from './Markers'

const GoogleMapView = ({ busStopsList, routeStopsList = [] }) => {
  const { userLocation, setUserLocation } = useContext(UserLocationContext)
  const [map, setMap] = useState(null)
  const [AdvancedMarkerElement, setAdvancedMarkerElement] = useState(null)
  const [clickedLocation, setClickedLocation] = useState(null)
  const [directions, setDirections] = useState(null)

  const containerStyle = {
    width: '100%',
    height: '100vh',
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: ['places', 'marker'],
  })

  const isValidLocation = (location) => {
    return location && !isNaN(location.lat) && !isNaN(location.lng)
  }

  const onLoadMap = async (mapInstance) => {
    setMap(mapInstance)
    try {
      const { AdvancedMarkerElement } = await google.maps.importLibrary('marker')
      setAdvancedMarkerElement(() => AdvancedMarkerElement)
    } catch (error) {
      console.error('Error loading AdvancedMarkerElement library:', error)
    }
  }

  const handleMapClick = (event) => {
    const lat = event.latLng.lat()
    const lng = event.latLng.lng()
    setClickedLocation({ lat, lng })
    console.log('Clicked Location:', { lat, lng })
  }

  const calculateDirections = async () => {
    if (routeStopsList.length > 1) {
      const validStops = routeStopsList.filter(
        (stop) => stop.lat && stop.lng && typeof stop.lat === 'number' && typeof stop.lng === 'number'
      )

      if (validStops.length > 1) {
        try {
          const directionsService = new window.google.maps.DirectionsService()
          const waypoints = validStops.slice(1, -1).map((stop) => ({
            location: { lat: stop.lat, lng: stop.lng },
            stopover: true,
          }))
          const request = {
            origin: validStops[0],
            destination: validStops[validStops.length - 1],
            waypoints,
            travelMode: window.google.maps.TravelMode.DRIVING,
          }
          const response = await directionsService.route(request)
          if (response.status === 'OK') {
            setDirections(response)
          } else {
            console.error('Failed to fetch directions:', response.status)
          }
        } catch (error) {
          console.error('Error calculating directions:', error)
        }
      } else {
        console.warn('Not enough valid stops to calculate directions.')
      }
    }
  }

  useEffect(() => {
    if (isLoaded && (!userLocation || !isValidLocation(userLocation))) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
            setUserLocation(newLocation)
          },
          (error) => {
            console.error('Error getting user location:', error)
            setUserLocation({ lat: 40.7128, lng: -74.0060 }) // Default location (e.g., New York)
          }
        )
      } else {
        console.error('Geolocation is not supported by this browser.')
        setUserLocation({ lat: 40.7128, lng: -74.0060 }) // Default location
      }
    }
  }, [isLoaded, userLocation, setUserLocation])

  useEffect(() => {
    if (isLoaded && routeStopsList.length > 1) {
      calculateDirections()
    } else {
      setDirections(null) // Clear directions if there are not enough stops
    }
  }, [isLoaded, routeStopsList])

  if (!isLoaded) {
    return <div>Loading Map...</div>
  }

  return (
    <div className="h-screen">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={isValidLocation(userLocation) ? userLocation : { lat: 0, lng: 0 }}
        zoom={17}
        onLoad={onLoadMap}
        onClick={handleMapClick}
        options={{ mapId: '4cfa72a33bb70a22' }}
      >
        {AdvancedMarkerElement && map && (
          <>
            {routeStopsList.length > 1 && directions ? (
              <DirectionsRenderer directions={directions} />
            ) : (
              <>
                <Markers
                  map={map}
                  AdvancedMarkerElement={AdvancedMarkerElement}
                  userLocation={userLocation}
                />
                {busStopsList.slice(0, 8).map((busStop, index) => (
                  <Markers
                    key={index}
                    map={map}
                    AdvancedMarkerElement={AdvancedMarkerElement}
                    busStop={busStop}
                  />
                ))}
              </>
            )}
          </>
        )}
      </GoogleMap>
    </div>
  )
}

export default GoogleMapView
