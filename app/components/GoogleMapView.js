'use client'

import { GoogleMap, LoadScript } from '@react-google-maps/api'
import React, { useContext, useEffect, useState } from 'react'
import { UserLocationContext } from '../context/UserLocationContext'
import Markers from './Markers'

const GoogleMapView = ({ busStopsList }) => {
  const { userLocation, setUserLocation } = useContext(UserLocationContext)
  const [map, setMap] = useState(null)
  const [AdvancedMarkerElement, setAdvancedMarkerElement] = useState(null)

  const containerStyle = {
    width: '100%',
    height: '100vh',
  }

   const isValidLocation = (location) => {
    return location && !isNaN(location.lat) && !isNaN(location.lng)
  }

  const onLoadMap = async (mapInstance) => {
    setMap(mapInstance)
    try {
      const { AdvancedMarkerElement } = await google.maps.importLibrary(
        'marker'
      )
      setAdvancedMarkerElement(() => AdvancedMarkerElement)
    } catch (error) {
      console.error('Error loading AdvancedMarkerElement library:', error)
    }
  }

  useEffect(() => {
     if (!userLocation || !isValidLocation(userLocation)) {
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
             setUserLocation({ lat: 40.7128, lng: -74.0060 })
          }
        )
      } else {
        console.error('Geolocation is not supported by this browser.')
        setUserLocation({ lat: 40.7128, lng: -74.0060 }) 
      }
    }
  }, [userLocation, setUserLocation])

  return (
    <div className="h-screen">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={isValidLocation(userLocation) ? userLocation : { lat: 0, lng: 0 }}
          zoom={17}
          onLoad={onLoadMap}
          options={{ mapId: '4cfa72a33bb70a22' }}  
        >
          {AdvancedMarkerElement && map && (
            <>
              {/* User location marker */}
              <Markers
                map={map}
                AdvancedMarkerElement={AdvancedMarkerElement}
                userLocation={userLocation}
              />

              {/* Bus stop markers */}
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
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default GoogleMapView
