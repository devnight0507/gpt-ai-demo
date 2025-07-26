'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockAuthService } from '@/lib/mock-services';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isSignUp) {
        await mockAuthService.signUp(email, password);
      } else {
        await mockAuthService.signIn(email, password);
      }
      
      router.push('/');
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const demoUsers = [
    { email: 'demo@free.com', plan: 'Free Plan' },
    { email: 'demo@pro.com', plan: 'Pro Plan' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Demo Banner */}
        <div className="bg-yellow-400 text-black text-center py-2 px-4 text-sm font-medium rounded-t-lg">
          🚧 Demo Mode - Any email/password works
        </div>

        <div className="bg-white rounded-b-lg shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">👨‍🚀</div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isSignUp ? 'Join LaunchAI' : 'Welcome Back'}
            </h1>
            <p className="text-gray-600 mt-2">
              {isSignUp 
                ? 'Start building amazing apps with AI' 
                : 'Continue building your next big idea'
              }
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
                </div>
              ) : (
                isSignUp ? 'Create Account' : 'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-purple-600 hover:text-purple-800 font-medium"
            >
              {isSignUp 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Sign up"
              }
            </button>
          </div>

          {/* Demo Users */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Try Demo Users:</h3>
            <div className="space-y-2">
              {demoUsers.map((user, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setEmail(user.email);
                    setPassword('demo123');
                  }}
                  className="w-full text-left p-2 bg-white rounded border hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">{user.email}</span>
                    <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                      {user.plan}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/')}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}