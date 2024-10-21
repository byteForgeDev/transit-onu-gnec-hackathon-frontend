'use client';

import { GoogleMap, LoadScript } from '@react-google-maps/api'
import React from 'react'

const GoogleMapView = () => {
  const containerStyle = {
    width: '100%',
    height: '70vh',
  }

  const cordinate = { lat: 7.1193, lng: -73.1227 }

  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={cordinate}
          zoom={13}
        ></GoogleMap>
      </LoadScript>
    </div>
  )
}

export default GoogleMapView
