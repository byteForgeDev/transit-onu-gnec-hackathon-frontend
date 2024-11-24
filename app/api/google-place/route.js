import axios from 'axios';
import { NextResponse } from 'next/server';

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const BASE_URL = 'https://maps.googleapis.com/maps/api/place';
const API_COORDINATES_TO_ADDRESS_URL = `http://${process.env.NEXT_PUBLIC_IP_PUBLIC}:8080/api/maps/coordinates`;
const API_ADDRESS_TO_COORDINATES_URL = `http://${process.env.NEXT_PUBLIC_IP_PUBLIC}:8080/api/maps/address`;

const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Main GET handler
export async function GET(request) {


  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const radius = searchParams.get('radius') || '100';
  const token = request.headers.get('Authorization')?.replace('Bearer ', ''); // Extract the token from headers

  if (!token) {
    return NextResponse.json(
      { error: 'Authorization token is missing' },
      { status: 401 }
    );
  }

  try {
    // Fetch bus stops from Google Places API
    const res = await fetch(
      `${BASE_URL}/textsearch/json?query=bus stop&location=${lat},${lng}&radius=${radius}&key=${GOOGLE_API_KEY}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await res.json();


    // Fetch user address
    const userAddress = await getAddressFromCoordinates(lat, lng, token);


    return NextResponse.json({ data, userAddress });
  } catch (error) {
    console.error('Error fetching bus stops:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bus stops' },
      { status: 500 }
    );
  }
}

// Helper function to get address from coordinates
export const getAddressFromCoordinates = async (lat, lng, token) =>{
  try {
    const response = await axios.post(
      API_COORDINATES_TO_ADDRESS_URL,
      { lat, lng },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Pass the token in headers
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching address from coordinates:', error);
    throw error;
  }
}

export const getCoordinatesFromAddress = async (address) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No token found in localStorage');
    }
    const response = await axios.post(
      API_ADDRESS_TO_COORDINATES_URL,
      { address },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Pass the token in headers
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching address from coordinates:', error);
    throw error;
  }
};
