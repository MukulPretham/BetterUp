"use client"
import { signIn } from "next-auth/react"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"

export default function SignIn() {
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const router = useRouter()

    const [msg, setMsg] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // This is a mock handler to replace the Next.js specific 'signIn' and 'useRouter'.
    const submitHandler = async () => {
        setIsLoading(true);
        setMsg(""); // Clear previous messages

        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const res = await signIn("credentials",{
            redirect: false,
            username: username,
            password: password
        }) 
        if (res?.error) {
            setMsg("Invalid username or password");
        } 
        else {
            router.push("/")
        }
        
        setIsLoading(false);
    }

    const githubLoginHandle = ()=>{
        signIn("github",{callbackUrl : "/"})
    }

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

                {/* Sign-In Card */}
                <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700 rounded-2xl p-8 shadow-2xl backdrop-blur-lg">
                    <h2 className="text-3xl font-bold text-center text-white mb-2">Welcome Back</h2>
                    <p className="text-center text-gray-400 mb-8">Sign in to access your dashboard.</p>

                    {/* Error Message Display */}
                    {msg && (
                        <div className="bg-red-900/50 border border-red-700/50 text-red-300 px-4 py-3 rounded-lg mb-6 text-sm text-center">
                            {msg}
                        </div>
                    )}
                    
                    <form onSubmit={(e) => { e.preventDefault(); submitHandler(); }} className="space-y-6">
                        {/* Username Input */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                                Username
                            </label>
                            <input
                                ref={usernameRef}
                                id="username"
                                type="text"
                                placeholder="e.g., yourusername"
                                className="w-full bg-gray-800 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                             <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
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
                            ) : 'Sign In'}
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-700" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-gray-800 px-2 text-gray-400 rounded-md">OR</span>
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={githubLoginHandle}
                            type="button"
                            className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500"
                        >
                            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.48A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                            </svg>
                            Sign in with GitHub
                        </button>
                    </div>

                    {/* Footer Links */}
                    <div className="text-center mt-6">
                        <a href="#" className="text-sm text-emerald-400 hover:text-emerald-300 hover:underline transition-colors">
                            Forgot your password?
                        </a>
                    </div>
                </div>

                 <div className="text-center mt-8">
                    <p className="text-gray-400">
                        Don't have an account?{' '}
                        <a href="#" className="font-medium text-emerald-400 hover:text-emerald-300 hover:underline transition-colors">
                            Sign Up Free
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}