import React from 'react';
import { MapPin, Globe } from 'lucide-react';
import { COUNTRIES, getStateOptions, getStateLabel, getZipLabel } from '../utils/locations';

interface LocationSelectorProps {
  title: string;
  icon: React.ReactNode;
  country: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  customCountry?: string;
  onCountryChange: (country: string) => void;
  onAddressChange: (address: string) => void;
  onCityChange: (city: string) => void;
  onStateChange: (state: string) => void;
  onZipCodeChange: (zipCode: string) => void;
  onCustomCountryChange?: (country: string) => void;
}

export function LocationSelector({
  title,
  icon,
  country,
  address,
  city,
  state,
  zipCode,
  customCountry,
  onCountryChange,
  onAddressChange,
  onCityChange,
  onStateChange,
  onZipCodeChange,
  onCustomCountryChange
}: LocationSelectorProps) {
  const stateOptions = getStateOptions(country);
  const stateLabel = getStateLabel(country);
  const zipLabel = getZipLabel(country);

  return (
    <div className="space-y-4">
      <div className="mb-4">
        {icon}
      </div>

      {/* Country Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Globe className="w-4 h-4 inline mr-1" />
          Country
        </label>
        <select
          value={country}
          onChange={(e) => {
            onCountryChange(e.target.value);
            onStateChange(''); // Reset state when country changes
          }}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          required
        >
          <option value="">Select Country</option>
          {Object.entries(COUNTRIES).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
      </div>

      {/* Custom Country Input for International */}
      {country === 'INTL' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country Name</label>
          <input
            type="text"
            placeholder="Enter country name"
            value={customCountry || ''}
            onChange={(e) => onCustomCountryChange?.(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>
      )}
      
      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <MapPin className="w-4 h-4 inline mr-1" />
          Street Address
        </label>
        <input
          type="text"
          placeholder="Street Address"
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          required
        />
      </div>
      
      {/* City and State/Province */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{stateLabel}</label>
          {(country === 'INTL' || stateOptions.length === 0) ? (
            <input
              type="text"
              placeholder={stateLabel}
              value={state}
              onChange={(e) => onStateChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          ) : (
            <select
              value={state}
              onChange={(e) => onStateChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
              disabled={!country}
            >
              <option value="">{country ? `Select ${stateLabel}` : 'Select Country First'}</option>
              {stateOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
      
      {/* ZIP/Postal Code */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{zipLabel}</label>
        <input
          type="text"
          placeholder={zipLabel}
          value={zipCode}
          onChange={(e) => onZipCodeChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          required
        />
      </div>
    </div>
  );
}