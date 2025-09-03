import React, { useState } from 'react';
import { Rate, Carrier, AIInsight } from '../types';
import { Star, Clock, DollarSign, Truck, CheckCircle, Lightbulb, TrendingDown, Route, Award, Save, BookOpen } from 'lucide-react';

interface QuoteResultsProps {
  rates: Rate[];
  carriers: Carrier[];
  insights: AIInsight[];
  onBookShipment: (rate: Rate) => void;
  onSaveQuote: (name: string, notes?: string) => void;
}

export function QuoteResults({ rates, carriers, insights, onBookShipment, onSaveQuote }: QuoteResultsProps) {
  const [selectedRate, setSelectedRate] = useState<string | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [quoteName, setQuoteName] = useState('');
  const [quoteNotes, setQuoteNotes] = useState('');

  const getCarrierById = (carrierId: string) => {
    return carriers.find(c => c.id === carrierId);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'cost_optimization': return <TrendingDown className="w-5 h-5" />;
      case 'route_optimization': return <Route className="w-5 h-5" />;
      case 'carrier_recommendation': return <Award className="w-5 h-5" />;
      default: return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getInsightColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'low': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleSaveQuote = () => {
    if (quoteName.trim()) {
      onSaveQuote(quoteName.trim(), quoteNotes.trim() || undefined);
      setShowSaveModal(false);
      setQuoteName('');
      setQuoteNotes('');
    }
  };

  if (rates.length === 0) return null;

  return (
    <div className="space-y-8">
      {/* AI Insights */}
      {insights.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center space-x-2 mb-4">
            <Lightbulb className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">AI Insights</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border ${getInsightColor(insight.impact)}`}
              >
                <div className="flex items-start space-x-3">
                  {getInsightIcon(insight.type)}
                  <div>
                    <h4 className="font-semibold mb-1">{insight.title}</h4>
                    <p className="text-sm opacity-80">{insight.description}</p>
                    {insight.savings && (
                      <p className="text-sm font-semibold mt-2">
                        Potential savings: ${insight.savings}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quote Results */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Available Quotes</h3>
            <span className="text-sm text-gray-500">{rates.length} carriers found</span>
          </div>
          <button
            onClick={() => setShowSaveModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            <Save className="w-4 h-4" />
            <span>Save Quote</span>
          </button>
        </div>

        <div className="space-y-4">
          {rates.map((rate, index) => {
            const carrier = getCarrierById(rate.carrierId);
            if (!carrier) return null;

            const isRecommended = index === 0;
            const isSelected = selectedRate === rate.id;

            return (
              <div
                key={rate.id}
                className={`bg-white rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                  isSelected 
                    ? 'border-blue-500 shadow-lg' 
                    : isRecommended 
                      ? 'border-green-400' 
                      : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {isRecommended && (
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-t-xl">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-semibold">AI Recommended - Best Value</span>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                          <Truck className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">{carrier.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>MC: {carrier.mcNumber}</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{carrier.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Base Rate</span>
                          <p className="font-semibold text-gray-900">${rate.baseRate.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Fuel Surcharge</span>
                          <p className="font-semibold text-gray-900">${rate.fuelSurcharge.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Transit Time</span>
                          <p className="font-semibold text-gray-900">{rate.transitTime} days</p>
                        </div>
                        <div>
                          <span className="text-gray-500">AI Confidence</span>
                          <p className="font-semibold text-gray-900">{rate.confidence}%</p>
                        </div>
                      </div>

                      {rate.aiRecommendation && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-800">
                            <strong>AI Insight:</strong> {rate.aiRecommendation}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end space-y-4">
                      <div className="text-right">
                        <p className="text-3xl font-bold text-gray-900">
                          ${rate.totalRate.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">Total Cost</p>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedRate(rate.id);
                          onBookShipment(rate);
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold"
                      >
                        Book Shipment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Save Quote Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Save className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Save Quote</h3>
                  <p className="text-sm text-gray-600">Valid for 30 days</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quote Name *</label>
                  <input
                    type="text"
                    value={quoteName}
                    onChange={(e) => setQuoteName(e.target.value)}
                    placeholder="e.g., Chicago to LA - Electronics"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                  <textarea
                    value={quoteNotes}
                    onChange={(e) => setQuoteNotes(e.target.value)}
                    placeholder="Add any notes about this quote..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowSaveModal(false);
                    setQuoteName('');
                    setQuoteNotes('');
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveQuote}
                  disabled={!quoteName.trim()}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}