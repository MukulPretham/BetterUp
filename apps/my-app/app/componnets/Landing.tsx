import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Landing() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gray-900">
      
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-gray-900/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-bold text-white">WebWatch</span>
            </div>

            <div className="flex items-center space-x-4">
              <button onClick={() => signIn()} className="text-gray-300 hover:text-white font-medium transition-colors px-4 py-2 rounded-lg hover:bg-gray-800">
                Sign In
              </button>
              <button onClick={() => router.push("/signUp")} className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 hover:from-emerald-600 hover:to-blue-700">
                Sign Up Free
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Monitor Your Website Status 24/7
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed">
            Get instant alerts when your website goes down. Monitor uptime, performance, and response times 
            from multiple locations worldwide with millisecond precision.
          </p>

          <div className="flex items-center justify-center space-x-6">
            <button onClick={() => signIn()} className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              Sign In
            </button>
            <button onClick={() => router.push("/signUp")} className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105">
              Sign Up Free
            </button>
          </div>
        </div>
      </section>

      {/* Monitoring Explanation Section */}
      <section className="py-20 bg-gray-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Why Monitor Your Website?</h2>
          <p className="text-lg mb-8">
            Monitoring your website ensures it stays online and performs at its best. 
            Detect downtimes instantly and get notified when your website response time slows or fails completely.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-gray-700 p-6 rounded-xl border border-gray-600">
              <h3 className="text-2xl font-semibold mb-4">Uptime Monitoring</h3>
              <p>
                Automatically check if your website is reachable every 30 seconds. 
                Receive real-time alerts via email, SMS, or webhooks whenever an issue occurs.
              </p>
            </div>

            <div className="bg-gray-700 p-6 rounded-xl border border-gray-600">
              <h3 className="text-2xl font-semibold mb-4">Latency Monitoring</h3>
              <p>
                Measure response times from multiple global locations.
                Ensure your site stays fast and responsive, and get insights when performance degrades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12 text-center">
        <p>© 2025 WebWatch. Monitoring uptime and performance worldwide. All rights reserved.</p>
      </footer>

    </div>
  );
}
