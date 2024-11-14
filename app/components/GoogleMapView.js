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

  return (
    <div className="h-screen">
<<<<<<< HEAD
      <LoadScript
=======
      <LoadScript 
>>>>>>> upstream/dev
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation || { lat: 0, lng: 0 }}
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