const { default: axios } = require("axios");

// Helper to retrieve the token from localStorage
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

const getGooglePlaceBusStops = (lat, lng) => {
  const token = getToken();

  if (!token) {
    throw new Error('No token found in localStorage');
  }

  return axios.get('/api/google-place', {
    params: {
      lat,
      lng,
      radius: 100,
    },
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in headers
    },
  });
};

export default {
  getGooglePlaceBusStops,
};