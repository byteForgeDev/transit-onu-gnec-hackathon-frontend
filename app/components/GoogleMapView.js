'use client'

import { GoogleMap, DirectionsRenderer, useLoadScript, Marker} from '@react-google-maps/api'
import React, { useContext, useEffect, useState } from 'react'
import { UserLocationContext } from '../context/UserLocationContext'
// import { getStops } from '../api/google-place/route'
import Markers from './Markers'
// import { calculateOptimizedRoute } from '../utils/mapUtils'; // Import utilities


const GoogleMapView = ({
  destinationLocation,
  busStopsList,
  routeStopsList = [],
}) => {
  const { userLocation, setUserLocation } = useContext(UserLocationContext)
  const [map, setMap] = useState(null)
  const [AdvancedMarkerElement, setAdvancedMarkerElement] = useState(null)
  const [clickedLocation, setClickedLocation] = useState(null)
  const [directions, setDirections] = useState(null)
  const [directionsResponse, setDirectionsResponse] = useState([])

  const containerStyle = {
    width: '100%',
    height: '100vh',
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: ['places', 'marker'],
  })

  const onLoadMap = async (mapInstance) => {
    setMap(mapInstance)
    try {
      const { AdvancedMarkerElement } = await google.maps.importLibrary('marker')
      setAdvancedMarkerElement(() => AdvancedMarkerElement)
    } catch (error) {
      console.error('Error loading AdvancedMarkerElement library:', error)
    }
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
      // const fetchBusStops = async () => {
      //   try {
      //     const stops = await getStops(userLocation.lat, userLocation.lng)
      //     setLocalBusStopsList(stops)
      //   } catch (error) {
      //     console.error('Error fetching bus stops:', error)
      //   }
      // }
      // fetchBusStops()
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
    if (isLoaded && (!userLocation)) {
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
        center={userLocation || { lat: 0, lng: 0 }}
        zoom={17}
        onLoad={onLoadMap}
        onClick={handleMapClick}
        options={{ mapId: '4cfa72a33bb70a22' }}
      >
        {AdvancedMarkerElement && map && (
          <>
            {/* Primera opción: Si hay `routeStopsList` con más de un elemento y hay `directions` */}
            {routeStopsList.length > 1 && directions ? (
              <DirectionsRenderer directions={directions} />
            ) : destinationLocation ? (
              // Tercera opción: Si hay `userLocation` y `destinationLocation`, renderizar marcadores personalizados
              <>
                {userLocation && (
                  <Marker
                    position={userLocation}
                    title="Your Location"
                    icon={{
                      url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', // Marcador verde para la ubicación del usuario
                    }}
                  />
                )}
                {destinationLocation && (
                  <Marker
                    position={destinationLocation}
                    title="Destination Location"
                    icon={{
                      url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', // Marcador rojo para el destino
                    }}
                  />
                )}
              </>
            ) : (
              // Segunda opción: Renderizar marcadores para paradas de autobús y ubicación del usuario
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

            {/* Renderizar rutas con colores diferentes si hay `directionsResponse` */}
            {directionsResponse.length > 0 &&
              directionsResponse.map((route, index) => (
                <DirectionsRenderer
                  key={index}
                  directions={{ routes: [route] }}
                  options={{
                    polylineOptions: {
                      strokeColor: `hsl(${
                        (index * 360) / directionsResponse.length
                      }, 100%, 50%)`, // Colores distintos para cada ruta
                      strokeWeight: 5,
                    },
                  }}
                />
              ))}
          </>
        )}
      </GoogleMap>
    </div>
  )
}

export default GoogleMapView
