const { default: axios } = require("axios");

const getGooglePlaceBusStops = (lat, lng) =>
  axios.get(
    '/api/google-place?'+'&lat='+lat+'&lng='+lng+'&radius=100'
  )

export default {
  getGooglePlaceBusStops
}