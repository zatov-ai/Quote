import React, { useState, useEffect } from 'react';
import { X, Building } from 'lucide-react';
import { Address, AddressFormData } from '../types/address';
import { COUNTRIES, CANADIAN_PROVINCES, US_STATES, getStateOptions } from '../utils/locations';

interface AddressBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: Address) => void;
  editingAddress?: Address | null;
}

export function AddressBookModal({ isOpen, onClose, onSave, editingAddress }: AddressBookModalProps) {
  const [formData, setFormData] = useState<AddressFormData>({
    company: '',
    displayAs: '',
    address1: '',
    address2: '',
    country: 'Canada',
    province: '',
    city: '',
    postalCode: '',
    attention: '',
    phone: '',
    email: '',
    taxId: '',
    eoriNumber: '',
    defaultInstructions: '',
    notifyRecipient: true,
    residentialAddress: false,
    defaultShipFrom: false,
    defaultShipTo: false,
    confirmDelivery: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingAddress) {
      setFormData({
        company: editingAddress.company,
        displayAs: editingAddress.displayAs,
        address1: editingAddress.address1,
        address2: editingAddress.address2 || '',
        country: editingAddress.country,
        province: editingAddress.province,
        city: editingAddress.city,
        postalCode: editingAddress.postalCode,
        attention: editingAddress.attention,
        phone: editingAddress.phone,
        email: editingAddress.email,
        taxId: editingAddress.taxId || '',
        eoriNumber: editingAddress.eoriNumber || '',
        defaultInstructions: editingAddress.defaultInstructions || '',
        notifyRecipient: editingAddress.notifyRecipient,
        residentialAddress: editingAddress.residentialAddress,
        defaultShipFrom: editingAddress.defaultShipFrom,
        defaultShipTo: editingAddress.defaultShipTo,
        confirmDelivery: editingAddress.confirmDelivery
      });
    } else {
      // Reset form for new address
      setFormData({
        company: '',
        displayAs: '',
        address1: '',
        address2: '',
        country: 'Canada',
        province: '',
        city: '',
        postalCode: '',
        attention: '',
        phone: '',
        email: '',
        taxId: '',
        eoriNumber: '',
        defaultInstructions: '',
        notifyRecipient: true,
        residentialAddress: false,
        defaultShipFrom: false,
        defaultShipTo: false,
        confirmDelivery: false
      });
    }
    setErrors({});
  }, [editingAddress, isOpen]);

  const updateField = (field: keyof AddressFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.displayAs.trim()) newErrors.displayAs = 'Display As is required';
    if (!formData.address1.trim()) newErrors.address1 = 'Address is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.province) newErrors.province = 'Province/State is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal/ZIP Code is required';
    if (!formData.attention.trim()) newErrors.attention = 'Attention is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const address: Address = {
      id: editingAddress?.id || crypto.randomUUID(),
      company: formData.company.trim(),
      displayAs: formData.displayAs.trim(),
      address1: formData.address1.trim(),
      address2: formData.address2.trim() || undefined,
      country: formData.country,
      province: formData.province,
      city: formData.city.trim(),
      postalCode: formData.postalCode.trim(),
      attention: formData.attention.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      taxId: formData.taxId.trim() || undefined,
      eoriNumber: formData.eoriNumber.trim() || undefined,
      defaultInstructions: formData.defaultInstructions.trim() || undefined,
      notifyRecipient: formData.notifyRecipient,
      residentialAddress: formData.residentialAddress,
      defaultShipFrom: formData.defaultShipFrom,
      defaultShipTo: formData.defaultShipTo,
      confirmDelivery: formData.confirmDelivery,
      createdAt: editingAddress?.createdAt || new Date(),
      updatedAt: new Date()
    };

    onSave(address);
    onClose();
  };

  const stateOptions = getStateOptions(formData.country);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Building className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Company and Display As */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => updateField('company', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.company ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Company name"
                maxLength={50}
              />
              {errors.company && <p className="text-red-600 text-sm mt-1">{errors.company}</p>}
              <div className="text-right text-xs text-gray-500 mt-1">
                {formData.company.length}/50
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display As *
              </label>
              <input
                type="text"
                value={formData.displayAs}
                onChange={(e) => updateField('displayAs', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.displayAs ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Display name"
              />
              {errors.displayAs && <p className="text-red-600 text-sm mt-1">{errors.displayAs}</p>}
            </div>
          </div>

          {/* Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address 1 *
              </label>
              <input
                type="text"
                value={formData.address1}
                onChange={(e) => updateField('address1', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.address1 ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Street address"
              />
              {errors.address1 && <p className="text-red-600 text-sm mt-1">{errors.address1}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address 2
              </label>
              <input
                type="text"
                value={formData.address2}
                onChange={(e) => updateField('address2', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Apartment, suite, etc."
              />
            </div>
          </div>

          {/* Country, Province, City, Postal Code */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country *
              </label>
              <select
                value={formData.country}
                onChange={(e) => {
                  updateField('country', e.target.value);
                  updateField('province', ''); // Reset province when country changes
                }}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.country ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                {Object.entries(COUNTRIES).map(([code, name]) => (
                  <option key={code} value={name}>{name}</option>
                ))}
              </select>
              {errors.country && <p className="text-red-600 text-sm mt-1">{errors.country}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Province *
              </label>
              <select
                value={formData.province}
                onChange={(e) => updateField('province', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.province ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select Province</option>
                {stateOptions.map((option) => (
                  <option key={option.code} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
              {errors.province && <p className="text-red-600 text-sm mt-1">{errors.province}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => updateField('city', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.city ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="City"
              />
              {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postal/Zip Code *
              </label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) => updateField('postalCode', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.postalCode ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Postal code"
              />
              {errors.postalCode && <p className="text-red-600 text-sm mt-1">{errors.postalCode}</p>}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attention *
              </label>
              <input
                type="text"
                value={formData.attention}
                onChange={(e) => updateField('attention', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.attention ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Contact person"
              />
              {errors.attention && <p className="text-red-600 text-sm mt-1">{errors.attention}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.phone ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Phone number"
              />
              {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Email and Tax ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Email address"
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tax ID
              </label>
              <input
                type="text"
                value={formData.taxId}
                onChange={(e) => updateField('taxId', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Tax ID"
              />
            </div>
          </div>

          {/* EORI Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                EORI Number
              </label>
              <input
                type="text"
                value={formData.eoriNumber}
                onChange={(e) => updateField('eoriNumber', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="EORI Number"
              />
            </div>
          </div>

          {/* Default Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Instructions
            </label>
            <textarea
              value={formData.defaultInstructions}
              onChange={(e) => updateField('defaultInstructions', e.target.value)}
              rows={4}
              maxLength={400}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Special delivery instructions..."
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {formData.defaultInstructions.length}/400
            </div>
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.notifyRecipient}
                onChange={(e) => updateField('notifyRecipient', e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Notify Recipient</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.residentialAddress}
                onChange={(e) => updateField('residentialAddress', e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Residential Address</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.defaultShipFrom}
                onChange={(e) => updateField('defaultShipFrom', e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Default "Ship From" Address</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.defaultShipTo}
                onChange={(e) => updateField('defaultShipTo', e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Default "Ship To" Address</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.confirmDelivery}
                onChange={(e) => updateField('confirmDelivery', e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Confirm Delivery</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
            >
              {editingAddress ? 'Update' : 'Apply'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}