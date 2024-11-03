import axios from 'axios';

const API_STOP_URL = 'http://54.159.46.181:8080/api/stops';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJTYW1wbGUgVXNlciIsImlhdCI6MTczMDY1NzM5MCwiZXhwIjoxNzMwNzQzNzkwfQ.jX04IScAqsOr1fwFgJRLmfvxJ0Z1Gu3ogH7fwHUsaxE';

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