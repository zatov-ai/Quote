import React from 'react';
import { TrendingUp, Users, Globe, Award } from 'lucide-react';

export function StatsSection() {
  const stats = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      number: '50M+',
      label: 'Shipments Processed',
      description: 'Successfully delivered worldwide'
    },
    {
      icon: <Users className="w-8 h-8" />,
      number: '10K+',
      label: 'Happy Customers',
      description: 'Trust us with their logistics'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      number: '80+',
      label: 'Countries Served',
      description: 'Global shipping network'
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: '99.9%',
      label: 'On-Time Delivery',
      description: 'Reliable service guarantee'
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands of businesses who rely on our AI-powered logistics platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 p-8 text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl mb-6">
                <div className="text-purple-600">
                  {stat.icon}
                </div>
              </div>
              
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              
              <div className="text-lg font-semibold text-gray-900 mb-2">
                {stat.label}
              </div>
              
              <div className="text-gray-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}