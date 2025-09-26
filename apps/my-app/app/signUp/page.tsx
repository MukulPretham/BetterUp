"use client"
import React, { useState, useRef } from 'react';

export default function SignUp() {
    const emailRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [message, setMessage] = useState<{ type: 'success' | 'error'; content: string } | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        const email = emailRef.current?.value;
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !username || !password) {
            setMessage({ type: 'error', content: 'All fields are required.' });
            setIsLoading(false);
            return;
        }

        try {
            // This fetch call corresponds to the app.post("/signUp", ...) endpoint you provided.
            const response = await fetch(`http://localhost:3001/signUp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Catches errors like "username already exist" from your backend
                throw new Error(data.error || 'Something went wrong');
            }
            
            // On successful account creation
            setMessage({ type: 'success', content: data.message || 'Account created successfully!' });
            if (emailRef.current) emailRef.current.value = "";
            if (usernameRef.current) usernameRef.current.value = "";
            if (passwordRef.current) passwordRef.current.value = "";

        } catch (error: any) {
            setMessage({ type: 'error', content: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header with Logo */}
                <div className="text-center mb-8">
                    <a href="/" className="inline-flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <div className="w-5 h-5 bg-white rounded-sm"></div>
                        </div>
                        <span className="text-2xl font-bold text-white">WebWatch</span>
                    </a>
                </div>

                {/* Sign-Up Card */}
                <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700 rounded-2xl p-8 shadow-2xl backdrop-blur-lg">
                    <h2 className="text-3xl font-bold text-center text-white mb-2">Create Your Account</h2>
                    <p className="text-center text-gray-400 mb-8">Start your 30-day free trial today.</p>

                    {/* Message Display */}
                    {message && (
                        <div className={`px-4 py-3 rounded-lg mb-6 text-sm text-center border ${
                            message.type === 'success' 
                                ? 'bg-emerald-900/50 border-emerald-700/50 text-emerald-300' 
                                : 'bg-red-900/50 border-red-700/50 text-red-300'
                        }`}>
                            {message.content}
                        </div>
                    )}
                    
                    <form onSubmit={submitHandler} className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <input
                                ref={emailRef}
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="w-full bg-gray-800 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                                required
                                disabled={isLoading}
                            />
                        </div>
                        
                        {/* Username Input */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                            <input
                                ref={usernameRef}
                                id="username"
                                type="text"
                                placeholder="yourusername"
                                className="w-full bg-gray-800 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                             <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <input
                                ref={passwordRef}
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-gray-800 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:from-emerald-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : 'Create Account'}
                        </button>
                    </form>
                </div>

                 <div className="text-center mt-8">
                    <p className="text-gray-400">
                        Already have an account?{' '}
                        <a href="/signIn" className="font-medium text-emerald-400 hover:text-emerald-300 hover:underline transition-colors">
                            Sign In
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
