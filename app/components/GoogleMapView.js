'use client'

import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import React, { useContext } from 'react'
import { UserLocationContext } from '../context/UserLocationContext'

const GoogleMapView = () => {
  const { userLocation, setUserLocation } = useContext(UserLocationContext)

  const containerStyle = {
    width: '100%',
    height: '70vh',
  }

  console.log(userLocation)
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
        >
          <MarkerF
            position={userLocation}
            icon={{
              url: '/user-location-icon.png',
              scaledSize: {
                width: 50,
                height: 50,
              },
            }}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default GoogleMapView
