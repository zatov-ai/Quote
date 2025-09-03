import React from 'react';
import { Brain, Zap, Shield, BarChart3, Globe, Clock, Truck, Route } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <Brain className="w-7 h-7" />,
      title: 'AI-Powered Optimization',
      description: 'Machine learning algorithms analyze millions of data points to find the best rates and routes for your freight',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: 'Instant Quotes',
      description: 'Get real-time quotes from thousands of verified carriers in seconds, not hours',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: <Route className="w-7 h-7" />,
      title: 'Smart Route Planning',
      description: 'AI analyzes traffic patterns, weather, and carrier performance to optimize delivery routes',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: 'Verified Carriers',
      description: 'All carriers are pre-screened with insurance verification and safety ratings',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: <BarChart3 className="w-7 h-7" />,
      title: 'Advanced Analytics',
      description: 'Track performance metrics, cost savings, and delivery times with detailed reporting',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      icon: <Globe className="w-7 h-7" />,
      title: 'Worldwide Coverage',
      description: 'Ship to and from over 80 countries with our global network of carriers and partners',
      color: 'from-teal-500 to-blue-600'
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Zatov AI?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionary AI technology meets decades of logistics expertise to transform how you ship freight
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className={`p-4 bg-gradient-to-br ${feature.color} rounded-2xl text-white group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}