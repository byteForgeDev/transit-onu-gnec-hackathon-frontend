// components/MapComponent.js
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import React from 'react';

const GoogleMapView = ({ userLocation }) => {
  const containerStyle = {
    width: '100%',
    height: '70vh',
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
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
            scaledSize: { width: 50, height: 50 },
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapView;
