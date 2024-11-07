"use client" 
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react'; 
 import Navbar from './components/navbar';
import FindRoute from './Pages/FindRoute';

export default function Home() {
 

  return (
   <>
    <Navbar />
    
<FindRoute />
   </>
  );
}
