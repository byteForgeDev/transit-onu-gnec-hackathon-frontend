import axios from 'axios'
import { NextResponse } from 'next/server';

const API_STOP_URL = `http://${process.env.REACT_APP_IP_PUBLIC}:8080/api/stops`;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
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
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching bus stops:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bus stops' },
      { status: 500 }
    )
  }
}
