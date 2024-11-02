"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";
import Image from 'next/image';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    // Add signup logic
    console.log('Email:', email, 'Password:', password, 'Country:', country, 'City:', city);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <div className="flex flex-col lg:flex-row items-center bg-white p-6 rounded-lg shadow-lg max-w-2xl">
        <div className="w-full lg:w-full p-6">
          <h2 className="text-2xl font-semibold text-secondaryInteractive mb-6">Sign Up</h2>
          <p className="text-gray-600 mb-4">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-secondaryInteractive font-medium">
              Login
            </Link>
          </p>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondaryInteractive"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter 6 characters or more"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondaryInteractive"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondaryInteractive"
                required
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm text-gray-700">
                Country
              </label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter your country"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondaryInteractive"
                required
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondaryInteractive"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-secondaryInteractive text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 flex justify-center">
            <button className="w-full bg-white border border-secondaryInteractive text-secondaryInteractive py-2 rounded-lg hover:bg-green-100 flex items-center justify-center">
              <FcGoogle className="text-xl"/>
              <span className="ml-2">Sign up with Google</span>
            </button>
          </div>
        </div>

        <div className="hidden lg:block lg:w-full p-4">
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
  );
};

export default Signup;
