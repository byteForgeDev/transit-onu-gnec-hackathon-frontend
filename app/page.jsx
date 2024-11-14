// app/page.jsx

'use client' // Make sure this is a client-side component

import { useEffect } from 'react'
import { useRouter } from 'next/navigation' // Import useRouter from next/navigation

export default function HomePage() {
  const router = useRouter() // Initialize the router

  useEffect(() => {
    // Redirect to /auth/login as soon as the page is loaded
    router.push('/auth/login')
  }, [router]) // The router dependency ensures this effect runs once

  return null // Nothing needs to be rendered, since we're redirecting immediately
}
