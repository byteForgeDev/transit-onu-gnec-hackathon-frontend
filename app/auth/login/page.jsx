'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import Image from 'next/image'
import Navbar from '@/app/components/navbar'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { login as apiLogin } from '../../api/AuthService'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
  const[username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const result = await apiLogin(username, password)
      console.log('Login successful:', result)

      login(result.token) // Call AuthContext's login function with the token

      // Redirect to /home after successful login
      router.push('/home')
    } catch (error) {
      setError('Failed to login. Please check your credentials.')
      console.error('Login error:', error)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-background px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row items-center bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
           <div className="w-full lg:w-1/2 p-6">
            <h2 className="text-2xl font-semibold text-primaryMain mb-6">
              Login
            </h2>
            <p className="text-gray-600 mb-4">
              Don’t have an account?{' '}
              <Link
                href="/auth/signup"
                className="text-primaryMain font-medium"
              >
                Sign Up
              </Link>
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryMain"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter 6 characters or more"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryMain"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-primaryMain"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-primaryMain"
                >
                  Forgot Password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full bg-primaryMain text-white py-2 rounded-lg hover:bg-primaryEmphasis transition"
              >
                Login
              </button>
            </form>

            <div className="mt-6 flex justify-center">
              <button className="w-full bg-white border border-primaryMain text-primaryMain py-2 rounded-lg hover:bg-blue-100 flex items-center justify-center">
                <FcGoogle className="text-xl" />
                <span className="ml-2">Login with Google</span>
              </button>
            </div>
          </div>

          {/* Right Side (Image Section) */}
          <div className="hidden lg:block lg:w-1/2 p-4">
            <Image
              src="/login-illustration.png"
              alt="Login Illustration"
              className="w-full h-auto rounded-lg"
              width={9000}
              height={1000}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
