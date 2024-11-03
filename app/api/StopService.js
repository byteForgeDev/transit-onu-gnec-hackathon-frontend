import axios from 'axios';

const API_STOP_URL = 'http://localhost:8080/api/stops';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtaXphbWFyemVzIiwiaWF0IjoxNzMwMzQyMDYyLCJleHAiOjE3MzA0Mjg0NjJ9.NJJlOxeTAXrFAXvOujEpdDhGIPgcOmmZxee-hdF4OHA'

export const getStops = async() =>{
    try {
        const response = await axios.get(API_STOP_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching stops', error);
        throw error;
    }
};