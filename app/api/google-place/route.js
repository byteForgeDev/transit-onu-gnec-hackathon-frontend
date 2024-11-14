import axios from 'axios'
import { NextResponse } from 'next/server';

const API_STOP_URL = `http://${process.env.REACT_APP_IP_PUBLIC}:8080/api/stops`;
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const BASE_URL = 'https://maps.googleapis.com/maps/api/place';

export const getStops = async () => {
  try {
    const response = await axios.get(API_STOP_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error fetching stops', error)
    throw error
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const radius = searchParams.get('radius') || '100'

  try {
    // Try using text search with "bus stop" in the query
    const res = await fetch(
      `${BASE_URL}/textsearch/json?query=bus stop&location=${lat},${lng}&radius=${radius}&key=${GOOGLE_API_KEY}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await res.json()
    const userAddress = await getAddressFromCoordinates(lat, lng);
    console.log("--------------")
    console.log(userAddress)
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching bus stops:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bus stops' },
      { status: 500 }
    )
  }
}

export const getAddressFromCoordinates = async (lat, lng) => {
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`);
    const data = await response.json();
    
    if (data.status === 'OK' && data.results[0]) {
      return data.results[0].formatted_address;
    } else {
      console.error("Geocoding API error:", data.status);
      return "Address not found";
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return "Address not found";
  }
}