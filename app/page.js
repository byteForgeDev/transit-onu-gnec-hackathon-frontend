"use client" 
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react'; 
import HomePage from './Pages/HomePg';
import Navbar from './components/navbar';

export default function Home() {
 

  return (
   <>
    <Navbar />
    
   <HomePage />
   </>
  );
}
