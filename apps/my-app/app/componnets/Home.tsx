import React, { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

// A simple SVG icon for the user profile placeholder
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

interface User {
    name: string,
    image: string | null,
    id: string
    email: string
}

export function Home() {

    const [User, setUser] = useState<any>({ name: "none", image: "none", email: "none", id: "none" })
    const session = useSession()
    useEffect(() => {
        // Setting user data from session
        setUser({
            name: session.data?.user?.name,
            email: session.data?.user?.email,
            image: session.data?.user?.image
        });
        console.log(session)

        // Getting website data from backend
        async function fetchWebsites() {
            const res = await fetch('/api/getWebsites')
            const data = await res.json()
            console.log(data)

        }
        fetchWebsites()

    }, [])

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-gray-900/95">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
                                <div className="w-4 h-4 bg-white rounded-sm"></div>
                            </div>
                            <span className="text-xl font-bold text-white">WebWatch</span>
                        </div>

                        {/* Profile & Sign Out */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-700">
                                    {User.image && User.image !== "none" ? (
                                        <img className="w-full h-full rounded-full object-cover" src={User.image} alt="Profile" />
                                    ) : (
                                        <UserIcon />
                                    )}

                                </div>
                                <span className="hidden sm:block font-medium text-gray-300">{User.name}</span>
                            </div>
                            <button
                                // Add your signOut logic to this onClick handler
                                onClick={() => signOut()}
                                className="text-gray-300 hover:text-white font-medium transition-colors px-4 py-2 rounded-lg hover:bg-gray-800 border border-transparent hover:border-gray-700"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-left mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        Welcome back, <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">{User.name.split(' ')[0]}</span>
                    </h1>
                    <p className="mt-4 text-xl text-gray-400">Here's an overview of your monitored services.</p>
                </div>

                {/* Placeholder for dashboard content */}
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700 rounded-2xl p-8 shadow-2xl">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-white">Your Dashboard</h3>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                            <span className="text-sm text-gray-300">Live Data</span>
                        </div>
                    </div>
                    <div className="text-center text-gray-500 py-16">

                    </div>
                </div>
            </main>
        </div>
    );
}
