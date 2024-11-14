// components/ProtectedRoute.jsx

'use client'

import { useAuth } from '../context/AuthContext' // Import AuthContext
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useAuth() // Get the signed-in status from AuthContext
  const router = useRouter()

  useEffect(() => {
    // If the user is not signed in, redirect to login page
    if (!isSignedIn) {
      router.push('/auth/login')
    }
  }, [isSignedIn, router])

  // If the user is signed in, render the protected content
  if (!isSignedIn) {
    return null // Or a loading spinner while redirecting
  }

  return children
}

export default ProtectedRoute
