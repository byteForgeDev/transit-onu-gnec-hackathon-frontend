// context/AuthContext.js

'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    // Check if the user is signed in, e.g., from localStorage or a session
    const token = localStorage.getItem('token')
    if (token) {
      setIsSignedIn(true)
    } else {
      setIsSignedIn(false)
    }
  }, [])

  const login = (token) => {
    localStorage.setItem('token', token)
    setIsSignedIn(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsSignedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
