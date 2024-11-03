'use client'

import { GoogleMap, LoadScript } from '@react-google-maps/api'
import React, { useContext, useEffect, useState } from 'react'
import { UserLocationContext } from '../context/UserLocationContext'
import { getStops } from '../api/StopService'

const GoogleMapView = () => {
  const { userLocation, setUserLocation } = useContext(UserLocationContext)
  const [map, setMap] = useState(null)
  const [advancedMarkerLib, setAdvancedMarkerLib] = useState(null)

  const getAllStops = async () => {
    try {
      const info = await getStops()
      console.log(info)
    } catch (error) {
      console.error('Error fetching stops:', error)
    }
  }

  useEffect(() => {
    getAllStops()
  }, [])

  const containerStyle = {
    width: '100%',
    height: '70vh',
  }

  const onLoadMap = async (mapInstance) => {
    setMap(mapInstance)
    if (userLocation) {
      try {
        // Import AdvancedMarkerElement library
        const { AdvancedMarkerElement } = await google.maps.importLibrary(
          'marker'
        )
        setAdvancedMarkerLib(() => AdvancedMarkerElement)

        // Creating a new marker instance if library loaded
        if (AdvancedMarkerElement) {
          const advancedMarker = new AdvancedMarkerElement({
            map: mapInstance,
            position: userLocation,
            title: 'User Location',
          })

          // Customize icon
          advancedMarker.element.innerHTML = `
            <img src="/user-location-icon.png" style="width: 50px; height: 50px;" alt="User Location Icon" />
          `
        }
      } catch (error) {
        console.error('Error loading AdvancedMarkerElement library', error)
      }
    }
  }

  return (
    <div>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        mapIds={['4cfa72a33bb70a22']}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation}
          options={{ mapId: '4cfa72a33bb70a22' }}
          zoom={17}
          onLoad={onLoadMap}
        />
      </LoadScript>
    </div>
  )
}

export default GoogleMapView
