import React, { useState } from 'react';
import { Carrier } from '../types';
import { Truck, Star, MapPin, Phone, Mail, Shield, Award, Search, Filter } from 'lucide-react';

interface CarrierDirectoryProps {
  carriers: Carrier[];
}

export function CarrierDirectory({ carriers }: CarrierDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('');
  const [selectedCoverage, setSelectedCoverage] = useState<string>('');

  const filteredCarriers = carriers.filter(carrier => {
    const matchesSearch = carrier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         carrier.mcNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEquipment = !selectedEquipment || carrier.equipment.includes(selectedEquipment as any);
    const matchesLocation = !selectedCoverage || carrier.coverage.includes(selectedCoverage);
    
    return matchesSearch && matchesEquipment && matchesLocation;
  });

  const equipmentTypes = [
    { value: 'dry_van', label: 'Dry Van' },
    { value: 'refrigerated', label: 'Refrigerated' },
    { value: 'flatbed', label: 'Flatbed' },
    { value: 'step_deck', label: 'Step Deck' },
    { value: 'container', label: 'Container' }
  ];

  const coverageAreas = [
    { value: 'US', label: 'United States' },
    { value: 'Canada', label: 'Canada' },
    { value: 'Mexico', label: 'Mexico' }
  ];

  if (carriers.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Truck className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Carriers Available</h3>
        <p className="text-gray-600">Carriers will appear here after you request quotes</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Carrier Directory</h2>
        <span className="text-sm text-gray-500">{filteredCarriers.length} carriers</span>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search carriers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <select
              value={selectedEquipment}
              onChange={(e) => setSelectedEquipment(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="">All Equipment Types</option>
              {equipmentTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedCoverage}
              onChange={(e) => setSelectedCoverage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="">All Coverage Areas</option>
              {coverageAreas.map(area => (
                <option key={area.value} value={area.value}>{area.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Carrier Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCarriers.map((carrier) => (
          <div
            key={carrier.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                  <Truck className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{carrier.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>MC: {carrier.mcNumber}</span>
                    <span>•</span>
                    <span>DOT: {carrier.dotNumber}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-semibold text-gray-900">{carrier.rating}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Truck className="w-4 h-4 mr-1" />
                  Equipment Types
                </h4>
                <div className="flex flex-wrap gap-2">
                  {carrier.equipment.map((equipment, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full"
                    >
                      {equipment.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Coverage Areas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {carrier.coverage.map((area, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Verified</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4 text-purple-600" />
                  <span>Premium</span>
                </div>
              </div>
              
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-700 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium text-sm">
                Request Quote
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCarriers.length === 0 && carriers.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No carriers match your filters</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
}