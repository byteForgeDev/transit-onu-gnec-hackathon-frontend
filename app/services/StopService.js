import axios from 'axios'

const API_STOP_URL = `http://${process.env.REACT_APP_IP_PUBLIC}:8080/api/stops`
// const token = 'eyJhbGcaaaaaaaaaaaaaaaMDh9.mj4YdhY82dasETa5o6E4vmuHswqxlutSaVf0y2fmGwQ';

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
