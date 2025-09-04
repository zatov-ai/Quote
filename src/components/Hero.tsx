import React from 'react';
import { Sparkles, ArrowRight, Play, CheckCircle } from 'lucide-react';
import HeroBanner from './HeroBanner';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <HeroBanner />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Freight Platform
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                The Future of
                <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Freight is Intelligent
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Revolutionary AI technology meets decades of logistics expertise to transform how you ship freight. Get instant quotes, optimize routes, and book with confidence.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onGetStarted}
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-700 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold text-lg flex items-center justify-center"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-purple-400 hover:text-purple-600 transition-all duration-200 font-semibold text-lg flex items-center justify-center">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">No setup fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Graphic */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
              <div className="space-y-6">
                {/* Mock Quote Interface */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Get Instant Quote</h3>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">From</div>
                      <div className="font-medium text-gray-900">Toronto, ON</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">To</div>
                      <div className="font-medium text-gray-900">Vancouver, BC</div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Freight Details</div>
                    <div className="font-medium text-gray-900">2 pallets • 1,500 lbs</div>
                  </div>
                </div>

                {/* Mock Results */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div>
                      <div className="font-semibold text-gray-900">Day & Ross</div>
                      <div className="text-sm text-gray-600">2-3 days • AI Recommended</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">$485</div>
                      <div className="text-xs text-gray-500">Best Value</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-900">Purolator</div>
                      <div className="text-sm text-gray-600">1-2 days</div>
                    </div>
                    <div className="text-xl font-bold text-gray-900">$625</div>
                  </div>
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-700 text-white rounded-lg font-semibold">
                  Book Shipment
                </button>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </div>
  );
}