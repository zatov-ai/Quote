import React from 'react';
import { Plane, Ship, Truck, Train, ArrowRight } from 'lucide-react';
import { TransportMode } from '../types';

interface TransportModeSelectorProps {
  isOpen: boolean;
  onSelect: (mode: TransportMode) => void;
  onClose: () => void;
}

export function TransportModeSelector({ isOpen, onSelect, onClose }: TransportModeSelectorProps) {
  const transportModes = [
    {
      id: 'air' as TransportMode,
      title: 'Air Freight',
      description: 'Fast, reliable air cargo services worldwide',
      icon: <Plane className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-600',
      features: ['Express delivery', 'Global coverage', 'Time-sensitive cargo']
    },
    {
      id: 'ocean' as TransportMode,
      title: 'Ocean Freight',
      description: 'Cost-effective sea freight solutions',
      icon: <Ship className="w-8 h-8" />,
      color: 'from-teal-500 to-blue-600',
      features: ['LCL & FCL options', 'Port-to-port', 'Bulk cargo']
    },
    {
      id: 'otr' as TransportMode,
      title: 'Over The Road',
      description: 'Flexible trucking solutions across North America',
      icon: <Truck className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-600',
      features: ['LTL & FTL', 'Expedited service', 'White glove delivery']
    },
    {
      id: 'rail' as TransportMode,
      title: 'Rail Freight',
      description: 'Efficient rail transport for heavy cargo',
      icon: <Train className="w-8 h-8" />,
      color: 'from-purple-500 to-indigo-600',
      features: ['Intermodal service', 'Heavy freight', 'Eco-friendly']
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">Z</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Choose Transport Mode</h2>
            </div>
            <p className="text-lg text-gray-600">Select the best shipping method for your cargo</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {transportModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => onSelect(mode.id)}
                className="group p-6 bg-white border-2 border-gray-200 rounded-2xl hover:border-purple-300 hover:shadow-xl transition-all duration-300 text-left"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-4 bg-gradient-to-br ${mode.color} rounded-2xl text-white group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                    {mode.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{mode.title}</h3>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                    <p className="text-gray-600 mb-4">{mode.description}</p>
                    <div className="space-y-1">
                      {mode.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-500">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}