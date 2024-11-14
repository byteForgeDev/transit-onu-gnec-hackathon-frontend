// app/home/page.jsx

'use client' // For Next.js client-side component

import '@fortawesome/fontawesome-free/css/all.min.css'
import React from 'react'
import Navbar from '../components/navbar' // Adjust the path if necessary
import HomePage from '../Pages/HomePg' // Adjust the path if necessary
import ProtectedRoute from '../components/ProtectedRoute' // Import the ProtectedRoute component

export default function Home() {
  return (
    <ProtectedRoute> {/* Protect the page content */}
      <Navbar />
      <HomePage />
    </ProtectedRoute>
  )
}
