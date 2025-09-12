import { signIn } from "next-auth/react";

export function Landing(){
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
                
                <nav className="hidden md:flex items-center space-x-8">
                  <a href="#features" className="text-gray-300 hover:text-white transition-colors font-medium">Features</a>
                  <a href="#pricing" className="text-gray-300 hover:text-white transition-colors font-medium">Pricing</a>
                  <a href="#docs" className="text-gray-300 hover:text-white transition-colors font-medium">Docs</a>
                  <a href="#support" className="text-gray-300 hover:text-white transition-colors font-medium">Support</a>
                </nav>
    
                <div className="flex items-center space-x-4">
                  <button onClick={()=>signIn()} className="text-gray-300 hover:text-white font-medium transition-colors px-4 py-2 rounded-lg hover:bg-gray-800">
                    Sign In
                  </button>
                  <button className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 hover:from-emerald-600 hover:to-blue-700">
                    Sign Up Free
                  </button>
                </div>
              </div>
            </div>
          </header>
    
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="absolute inset-0">
              <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
              <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 bg-emerald-900/50 text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-emerald-700/50">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span>Real-time monitoring • Always online</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                  Monitor Your
                  <span className="block bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                    Website Status
                  </span>
                  <span className="block text-4xl md:text-5xl text-gray-300 mt-2">24/7</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                  Get instant alerts when your website goes down. Monitor uptime, performance, and response times 
                  from multiple locations worldwide with millisecond precision.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
                  <button className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 group">
                    <span>Start Free Monitoring</span>
                    <div className="w-5 h-5 border-2 border-white border-l-0 border-b-0 transform rotate-45 group-hover:translate-x-1 transition-transform"></div>
                  </button>
                  <button className="border-2 border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:bg-gray-800">
                    View Live Demo
                  </button>
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span>Free 30-day trial</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span>Setup in 60 seconds</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
    
          {/* Status Dashboard Preview */}
          <section className="py-20 bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-white">Live Dashboard</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300">All systems operational</span>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-white">website.com</h4>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <span className="text-sm text-emerald-400">Online</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Response Time</span>
                        <span className="font-medium text-white">245ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Uptime</span>
                        <span className="font-medium text-emerald-400">99.99%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-white">api.website.com</h4>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <span className="text-sm text-emerald-400">Online</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Response Time</span>
                        <span className="font-medium text-white">156ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Uptime</span>
                        <span className="font-medium text-emerald-400">100%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-white">cdn.website.com</h4>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span className="text-sm text-yellow-400">Slow</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Response Time</span>
                        <span className="font-medium text-yellow-400">1,245ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Uptime</span>
                        <span className="font-medium text-emerald-400">99.95%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
    
          {/* Stats Section */}
          <section className="py-16 bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2">99.9%</div>
                  <div className="text-gray-400 font-medium">Uptime SLA</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2">250K+</div>
                  <div className="text-gray-400 font-medium">Sites Monitored</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2">30s</div>
                  <div className="text-gray-400 font-medium">Check Frequency</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2">24</div>
                  <div className="text-gray-400 font-medium">Global Locations</div>
                </div>
              </div>
            </div>
          </section>
    
          {/* Features Section */}
          <section id="features" className="py-20 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Monitor Everything That Matters
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Comprehensive monitoring tools to keep your digital presence always online and performing at its best
                </p>
              </div>
    
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-emerald-900/30 to-gray-800 p-8 rounded-2xl border border-emerald-700/30 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <div className="w-6 h-6 bg-white rounded-sm"></div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Real-Time Monitoring</h3>
                  <p className="text-gray-300">Get instant notifications when your website goes down with sub-second detection times.</p>
                </div>
    
                <div className="bg-gradient-to-br from-blue-900/30 to-gray-800 p-8 rounded-2xl border border-blue-700/30 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Global Network</h3>
                  <p className="text-gray-300">Monitor from 24+ locations worldwide to ensure your site is accessible everywhere.</p>
                </div>
    
                <div className="bg-gradient-to-br from-purple-900/30 to-gray-800 p-8 rounded-2xl border border-purple-700/30 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <div className="w-6 h-6 bg-white rounded-full border-2 border-purple-500"></div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Smart Alerts</h3>
                  <p className="text-gray-300">Receive notifications via email, SMS, Slack, and webhooks when issues are detected.</p>
                </div>
    
                <div className="bg-gradient-to-br from-orange-900/30 to-gray-800 p-8 rounded-2xl border border-orange-700/30 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <div className="w-6 h-6 bg-white"></div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Performance Analytics</h3>
                  <p className="text-gray-300">Track response times, uptime statistics, and performance trends over time.</p>
                </div>
    
                <div className="bg-gradient-to-br from-teal-900/30 to-gray-800 p-8 rounded-2xl border border-teal-700/30 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Status Pages</h3>
                  <p className="text-gray-300">Create beautiful public status pages to keep your customers informed automatically.</p>
                </div>
    
                <div className="bg-gradient-to-br from-indigo-900/30 to-gray-800 p-8 rounded-2xl border border-indigo-700/30 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <div className="w-6 h-6 bg-white transform rotate-45"></div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Detailed Reports</h3>
                  <p className="text-gray-300">Generate comprehensive uptime and performance reports for stakeholders.</p>
                </div>
              </div>
            </div>
          </section>
    
          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-br from-emerald-500 to-blue-600">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Start Monitoring in 60 Seconds
              </h2>
              <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
                Join thousands of businesses that trust WebWatch to keep their websites online and performing optimally.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg">
                  <span>Get Started Free</span>
                  <div className="w-5 h-5 border-2 border-emerald-600 border-l-0 border-b-0 transform rotate-45"></div>
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200">
                  Contact Sales
                </button>
              </div>
            </div>
          </section>
    
          {/* Footer */}
          <footer className="bg-gray-950 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-sm"></div>
                    </div>
                    <span className="text-xl font-bold">WebWatch</span>
                  </div>
                  <p className="text-gray-400 mb-6">
                    The most reliable website monitoring service trusted by thousands of businesses worldwide.
                  </p>
                  <div className="flex space-x-4">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                      <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                    </div>
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                      <div className="w-5 h-5 bg-gray-400"></div>
                    </div>
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                      <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-6">Product</h4>
                  <ul className="space-y-3 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-6">Company</h4>
                  <ul className="space-y-3 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-6">Support</h4>
                  <ul className="space-y-3 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Status Page</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Terms & Privacy</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400">© 2025 WebWatch. All rights reserved.</p>
                <div className="flex items-center space-x-6 mt-4 md:mt-0">
                  <span className="text-gray-400">Made with</span>
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-400">for reliable websites</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      );
}