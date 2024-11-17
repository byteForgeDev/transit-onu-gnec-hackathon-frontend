import axios from 'axios'

const API_REVIEW_URL = `http://${process.env.NEXT_PUBLIC_IP_PUBLIC}:8080/api/reviews?sort=none`

const getToken = () => {
  return localStorage.getItem('token')
}

export const fetchReviews = async () => {
  try {
    const token = getToken()
    if (!token) {
      throw new Error('No token found')
    }

    const response = await axios.get(API_REVIEW_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const reviews = response.data
    return reviews
  } catch (error) {
    console.error('Error fetching reviews:', error)
    throw error
  }
}