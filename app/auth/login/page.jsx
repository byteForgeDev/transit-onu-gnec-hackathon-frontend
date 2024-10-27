"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";
import Image from 'next/image';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <div className="flex flex-col lg:flex-row items-center bg-white p-6 rounded-lg shadow-lg max-w-2xl">
        <div className="w-full lg:w-full p-6">
          <h2 className="text-2xl font-semibold text-secondaryInteractive mb-6">Login</h2>
          <p className="text-gray-600 mb-4">
            Don’t have an account?{" "}
            <Link href="/auth/signup" className="text-secondaryInteractive font-medium">
              Sign Up
            </Link>
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
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
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-secondaryInteractive"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-secondaryInteractive"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-secondaryInteractive text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Login
            </button>
          </form>

          <div className="mt-6 flex justify-center">
            <button className="w-full bg-white border border-secondaryInteractive py-2 rounded-lg hover:bg-green-100 flex items-center justify-center">
              <FcGoogle className="text-xl" />
            </button>
          </div>
        </div>


        <div className="hidden lg:block lg:w-full p-4">
          <Image
            src="/login-illustration.png"
            alt="Login Illustration"
            className="w-full rounded-lg"
            width={9000}
            height={1000}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
