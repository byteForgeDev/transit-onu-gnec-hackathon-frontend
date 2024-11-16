'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import Image from 'next/image'
import Navbar from '@/app/components/navbar'
import '@fortawesome/fontawesome-free/css/all.min.css'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { useAuth } from '../../context/AuthContext'
import { register } from '../../api/AuthService'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [countryName, setCountry] = useState('')
  const [cityName, setCity] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { setIsSignedIn } = useAuth()

  const options = countryList().getData()

  const handleSignup = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    try {
      await register(
        username,
        password,
        email,
        '',
        ['USER'],
        cityName,
        countryName.label
      )
      setIsSignedIn(true)
      router.push('/')
    } catch (error) {
      setError('Registration failed. Please try again.')
      console.error('Signup error:', error)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-background pt-4 px-4 sm:px-8 md:px-16">
        <div className="flex flex-col lg:flex-row items-center bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
          {/* Form Section */}
          <div className="w-full lg:w-1/2 p-6">
            <h2 className="text-2xl font-semibold text-primaryMain mb-6">
              Sign Up
            </h2>
            <p className="text-gray-600 mb-4">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primaryMain font-medium">
                Login
              </Link>
            </p>
            <form onSubmit={handleSignup} className="space-y-4">
              <div> 
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryMain"
                  required
                />
              </div>
              <div>
              
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mail@example.com"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryMain"
                  required
                />
              </div>
              <div>
               
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password of 6 characters or more"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryMain"
                  required
                />
              </div>
              <div>
               
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryMain"
                  required
                />
              </div>
              <div>
              
                <Select
                  options={options}
                  value={countryName}
                  onChange={setCountry}
                  placeholder="Select Country"
                  className="w-full"
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      border: '1px solid #e5e7ea',
                      borderRadius: '8px',
                      boxShadow: state.isFocused ? '0 0 0 2px #0056b3' : 'none',
                      padding: '4px 0',
                      backgroundColor: 'transparent',
                    }),
                    dropdownIndicator: (base) => ({
                      ...base,
                      color: '#6b7280',
                      padding: '0px 8px',
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: '#9ba3af',
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: '#111827',
                    }),
                    menu: (base) => ({
                      ...base,
                      zIndex: 10,
                    }),
                  }}
                />
              </div>
              <div>
               
                <input
                  type="text"
                  id="cityName"
                  value={cityName}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryMain"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primaryMain text-white py-2 rounded-lg hover:bg-primaryEmphasis transition"
              >
                Sign Up
              </button>
            </form>

            <div className="mt-6 flex justify-center">
              <button className="w-full bg-white border border-primaryMain text-primaryMain py-2 rounded-lg hover:bg-blue-100 flex items-center justify-center">
                <FcGoogle className="text-xl" />
                <span className="ml-2">Sign up with Google</span>
              </button>
            </div>
          </div>

          {/* Illustration Section ( It will be Hidden on small screens) */}
          <div className="hidden lg:block lg:w-1/2 p-4">
            <Image
              src="/signup-illustration.png"
              alt="SignUp Illustration"
              className="w-full rounded-lg"
              width={9000}
              height={1000}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
