import React from 'react';
import { Truck, Plane, Ship, Train, ArrowRight } from 'lucide-react';

export function ServicesSection() {
  const services = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'LTL & FTL Shipping',
      description: 'Less-than-truckload and full truckload solutions across North America',
      features: ['Competitive rates', 'Real-time tracking', 'Flexible scheduling'],
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: <Plane className="w-8 h-8" />,
      title: 'Air Freight',
      description: 'Fast, reliable air cargo services for time-sensitive shipments',
      features: ['Express delivery', 'Global coverage', 'Priority handling'],
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: <Ship className="w-8 h-8" />,
      title: 'Ocean Freight',
      description: 'Cost-effective sea freight solutions for international shipping',
      features: ['LCL & FCL options', 'Port-to-port service', 'Customs clearance'],
      color: 'from-teal-500 to-blue-600'
    },
    {
      icon: <Train className="w-8 h-8" />,
      title: 'Rail Freight',
      description: 'Efficient rail transport for heavy cargo and bulk shipments',
      features: ['Intermodal service', 'Eco-friendly', 'Cost-effective'],
      color: 'from-purple-500 to-indigo-600'
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Complete Freight Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From local deliveries to international shipping, we've got you covered with our comprehensive logistics network
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className={`p-4 bg-gradient-to-br ${service.color} rounded-2xl text-white group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                  {service.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}