'use client'  

import '@fortawesome/fontawesome-free/css/all.min.css'
import React from 'react'
import Navbar from '../components/navbar'  
import HomePage from '../Pages/HomePg'
import ProtectedRoute from '../components/ProtectedRoute' 

export default function Home() {
  return (
    <ProtectedRoute>  
      <Navbar />
      <HomePage />
    </ProtectedRoute>
  )
}
