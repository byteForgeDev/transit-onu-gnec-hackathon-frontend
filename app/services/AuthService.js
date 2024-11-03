import axios from "axios";

const API_LOGIN_URL = `http://${process.env.REACT_APP_IP_PUBLIC}:8080/auth/login`;
const API_REGISTER_URL = `http://${process.env.REACT_APP_IP_PUBLIC}:8080/auth/register`;

export const login = async (username, password) => {
  try {
    const response = await axios.post(API_LOGIN_URL, { username, password })
    const { token, role, userfullname } = response.data

    localStorage.setItem('token', token)
    localStorage.setItem('role', role)
    localStorage.setItem('userfullname', userfullname)
    localStorage.setItem('email', username)

    return { token, role, userfullname }
  } catch (error) {
    console.error('Error logging in', error)
    throw error
  }
}

export const register = async (username, password, fullname) => {
  try {
    await axios.post(API_REGISTER_URL, { username, password, fullname })

    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('userfullname')
  } catch (error) {
    console.error('Error registering', error)
    throw error
  }
}