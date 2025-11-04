"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, User, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      // Redirect to dashboard
        router.push('/admin/dashboard');
      } catch {
        setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-12">
          <h1 className="font-mono text-4xl uppercase tracking-wider mb-4">VOA Admin</h1>
          <div className="w-24 h-px bg-black mx-auto mb-4"></div>
          <p className="font-mono text-sm uppercase tracking-wider text-gray-600">
            Content Management System
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white border-4 border-black p-8 shadow-lg">
          <h2 className="font-mono text-xl uppercase tracking-wider mb-6">Admin Login</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-600 flex items-start gap-3">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <p className="font-mono text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block font-mono text-sm uppercase tracking-wider mb-2"
              >
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-black font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter username"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block font-mono text-sm uppercase tracking-wider mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-black font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter password"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 border-2 border-black font-mono text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-gray-50 border border-gray-300">
            <p className="font-mono text-xs uppercase tracking-wider text-gray-600 mb-2">
              Demo Credentials:
            </p>
            <p className="font-mono text-xs text-gray-700">
              Username: <span className="font-semibold">admin</span>
            </p>
            <p className="font-mono text-xs text-gray-700">
              Password: <span className="font-semibold">admin123</span>
            </p>
          </div>
        </div>

        {/* Back to Site */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="font-mono text-sm uppercase tracking-wider text-black hover:underline"
          >
            ← Back to Site
          </Link>
        </div>
      </div>
    </div>
  );
}
