import React, { useEffect } from 'react'

function Markers({ map, AdvancedMarkerElement, busStop, userLocation }) {
  useEffect(() => {
    if (!map || !AdvancedMarkerElement) return

    let marker
    if (userLocation) {
      // Create the marker for the user's location
      marker = new AdvancedMarkerElement({
        map,
        position: userLocation,
        title: 'User Location',
      })

      marker.element.innerHTML = `
        <img src="/user-location-icon.png" style="width: 50px; height: 50px;" alt="User Location Icon" />
      `
    } else if (busStop) {
      // Create the marker for the bus stop
      marker = new AdvancedMarkerElement({
        map,
        position: busStop.geometry.location,
        title: 'Bus Stop',
      })

      marker.element.innerHTML = `
        <img src="/bus-stop.png" style="width: 30px; height: 30px;" alt="Bus Stop Icon" />
      `
    }

    // Clean up: Remove marker if component unmounts
    return () => {
      if (marker) marker.map = null
    }
  }, [map, AdvancedMarkerElement, busStop, userLocation])

  return null
}

export default Markers
