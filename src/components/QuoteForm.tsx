import React, { useState } from 'react';
import { MapPin, Package, Calendar, Truck, Sparkles, Plane, Ship, Train } from 'lucide-react';
import { QuoteRequest, FreightType, EquipmentType, TransportMode } from '../types';
import { LocationSelector } from './LocationSelector';

interface QuoteFormProps {
  onSubmit: (request: QuoteRequest) => void;
  isLoading: boolean;
  transportMode?: TransportMode;
}

export function QuoteForm({ onSubmit, isLoading, transportMode }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    // Origin
    originCountry: '',
    originCustomCountry: '',
    originAddress: '',
    originCity: '',
    originState: '',
    originZip: '',
    // Destination
    destCountry: '',
    destCustomCountry: '',
    destAddress: '',
    destCity: '',
    destState: '',
    destZip: '',
    // Freight details
    pickupDate: '',
    freightType: 'ftl' as FreightType,
    weight: '',
    length: '',
    width: '',
    height: '',
    pieces: '1',
    description: '',
    value: '',
    hazmat: false,
    equipment: 'dry_van' as EquipmentType,
    serviceLevel: 'standard' as 'standard' | 'expedited' | 'white_glove'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const request: QuoteRequest = {
      origin: {
        id: crypto.randomUUID(),
        address: formData.originAddress,
        city: formData.originCity,
        state: formData.originState,
        zipCode: formData.originZip,
        country: formData.originCountry === 'INTL' ? formData.originCustomCountry : formData.originCountry
      },
      destination: {
        id: crypto.randomUUID(),
        address: formData.destAddress,
        city: formData.destCity,
        state: formData.destState,
        zipCode: formData.destZip,
        country: formData.destCountry === 'INTL' ? formData.destCustomCountry : formData.destCountry
      },
      pickupDate: new Date(formData.pickupDate),
      freight: {
        type: formData.freightType,
        weight: parseInt(formData.weight),
        dimensions: {
          length: parseInt(formData.length),
          width: parseInt(formData.width),
          height: parseInt(formData.height)
        },
        pieces: parseInt(formData.pieces),
        description: formData.description,
        value: formData.value ? parseInt(formData.value) : undefined,
        hazmat: formData.hazmat
      },
      serviceLevel: formData.serviceLevel
    };

    onSubmit(request);
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI-Powered Quote Request</h2>
          <p className="text-gray-600">Get instant rates from top carriers with AI optimization</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Origin & Destination */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LocationSelector
            title="Origin"
            icon={<div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-green-600 font-medium">From</span>
            </div>}
            country={formData.originCountry}
            address={formData.originAddress}
            city={formData.originCity}
            state={formData.originState}
            zipCode={formData.originZip}
            customCountry={formData.originCustomCountry}
            onCountryChange={(value) => updateField('originCountry', value)}
            onAddressChange={(value) => updateField('originAddress', value)}
            onCityChange={(value) => updateField('originCity', value)}
            onStateChange={(value) => updateField('originState', value)}
            onZipCodeChange={(value) => updateField('originZip', value)}
            onCustomCountryChange={(value) => updateField('originCustomCountry', value)}
          />

          <LocationSelector
            title="Destination"
            icon={<div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-red-600" />
              </div>
              <span className="text-red-600 font-medium">To</span>
            </div>}
            country={formData.destCountry}
            address={formData.destAddress}
            city={formData.destCity}
            state={formData.destState}
            zipCode={formData.destZip}
            customCountry={formData.destCustomCountry}
            onCountryChange={(value) => updateField('destCountry', value)}
            onAddressChange={(value) => updateField('destAddress', value)}
            onCityChange={(value) => updateField('destCity', value)}
            onStateChange={(value) => updateField('destState', value)}
            onZipCodeChange={(value) => updateField('destZip', value)}
            onCustomCountryChange={(value) => updateField('destCustomCountry', value)}
          />
        </div>

        {/* Freight Details */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <Package className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Freight Details</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Freight Type</label>
              <select
                value={formData.freightType}
                onChange={(e) => updateField('freightType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="ftl">Full Truckload (FTL)</option>
                <option value="ltl">Less Than Truckload (LTL)</option>
                <option value="partial">Partial Truckload</option>
                <option value="expedited">Expedited</option>
                <option value="white_glove">White Glove</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weight (lbs)</label>
              <input
                type="number"
                placeholder="10000"
                value={formData.weight}
                onChange={(e) => updateField('weight', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pieces</label>
              <input
                type="number"
                placeholder="1"
                value={formData.pieces}
                onChange={(e) => updateField('pieces', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Equipment</label>
              <select
                value={formData.equipment}
                onChange={(e) => updateField('equipment', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="dry_van">Dry Van</option>
                <option value="refrigerated">Refrigerated</option>
                <option value="flatbed">Flatbed</option>
                <option value="step_deck">Step Deck</option>
                <option value="container">Container</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Length (ft)</label>
              <input
                type="number"
                placeholder="48"
                value={formData.length}
                onChange={(e) => updateField('length', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Width (ft)</label>
              <input
                type="number"
                placeholder="8"
                value={formData.width}
                onChange={(e) => updateField('width', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height (ft)</label>
              <input
                type="number"
                placeholder="8"
                value={formData.height}
                onChange={(e) => updateField('height', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Pickup Date
              </label>
              <input
                type="date"
                value={formData.pickupDate}
                onChange={(e) => updateField('pickupDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Level</label>
              <select
                value={formData.serviceLevel}
                onChange={(e) => updateField('serviceLevel', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="standard">Standard</option>
                <option value="expedited">Expedited</option>
                <option value="white_glove">White Glove</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Freight Description</label>
            <textarea
              placeholder="Describe your freight (e.g., machinery, electronics, furniture)"
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Freight Value (Optional)</label>
              <input
                type="number"
                placeholder="50000"
                value={formData.value}
                onChange={(e) => updateField('value', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center space-x-3 cursor-pointer p-4">
                <input
                  type="checkbox"
                  checked={formData.hazmat}
                  onChange={(e) => updateField('hazmat', e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Hazardous Materials</span>
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-3">
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>AI is analyzing routes and rates...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Get AI-Optimized Quotes</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
}