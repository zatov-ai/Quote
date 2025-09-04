import React from 'react';
import { Plane, Ship, Truck, Train, ArrowLeft } from 'lucide-react';
import { TransportMode, QuoteRequest, Rate, Carrier, AIInsight } from '../types';
import { QuoteForm } from './QuoteForm';
import { QuoteResults } from './QuoteResults';

interface QuotePageProps {
  transportMode: TransportMode;
  onQuoteRequest: (request: QuoteRequest) => void;
  isLoading: boolean;
  quotes: Rate[];
  carriers: Carrier[];
  insights: AIInsight[];
  onBookShipment: (rate: Rate) => void;
  onSaveQuote: (name: string, notes?: string) => void;
  onBackToDashboard: () => void;
}

export function QuotePage({
  transportMode,
  onQuoteRequest,
  isLoading,
  quotes,
  carriers,
  insights,
  onBookShipment,
  onSaveQuote,
  onBackToDashboard
}: QuotePageProps) {
  const getTransportIcon = () => {
    switch (transportMode) {
      case 'air': return <Plane className="w-8 h-8 text-white" />;
      case 'ocean': return <Ship className="w-8 h-8 text-white" />;
      case 'otr': return <Truck className="w-8 h-8 text-white" />;
      case 'rail': return <Train className="w-8 h-8 text-white" />;
    }
  };

  const getTransportTitle = () => {
    switch (transportMode) {
      case 'air': return 'Air Freight';
      case 'ocean': return 'Ocean Freight';
      case 'otr': return 'Over The Road';
      case 'rail': return 'Rail Freight';
    }
  };

  const getTransportDescription = () => {
    switch (transportMode) {
      case 'air': return 'Fast, reliable air cargo services worldwide';
      case 'ocean': return 'Cost-effective sea freight solutions';
      case 'otr': return 'Flexible trucking solutions across North America';
      case 'rail': return 'Efficient rail transport for heavy cargo';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBackToDashboard}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Transport Mode Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            {getTransportIcon()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {getTransportTitle()} Quote
            </h1>
            <p className="text-lg text-gray-600">
              {getTransportDescription()}
            </p>
          </div>
        </div>
      </div>

      {/* Quote Form */}
      <QuoteForm 
        onSubmit={onQuoteRequest} 
        isLoading={isLoading}
        transportMode={transportMode}
      />

      {/* Quote Results */}
      {(quotes.length > 0 || isLoading) && (
        <div className="space-y-6">
          {isLoading ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI is analyzing your shipment</h3>
              <p className="text-gray-600">Finding the best rates and routes from our carrier network...</p>
            </div>
          ) : (
            <QuoteResults
              rates={quotes}
              carriers={carriers}
              insights={insights}
              onBookShipment={onBookShipment}
              onSaveQuote={onSaveQuote}
            />
          )}
        </div>
      )}
    </div>
  );
}