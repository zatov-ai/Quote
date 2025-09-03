import React, { useState } from 'react';
import { SavedQuote, QuoteStatus } from '../types';
import { Calendar, Clock, DollarSign, Truck, Search, Filter, Trash2, Eye, BookOpen, AlertTriangle, CheckCircle, Package } from 'lucide-react';

interface QuoteManagementProps {
  savedQuotes: SavedQuote[];
  onDeleteQuote: (id: string) => void;
  onLoadQuote: (quote: SavedQuote) => void;
}

export function QuoteManagement({ savedQuotes, onDeleteQuote, onLoadQuote }: QuoteManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'expires' | 'name'>('date');

  const getQuoteStatus = (quote: SavedQuote): QuoteStatus => {
    if (quote.status === 'booked') return 'booked';
    if (new Date() > quote.expiresAt) return 'expired';
    return 'active';
  };

  const filteredQuotes = savedQuotes
    .filter(quote => {
      const matchesSearch = quote.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           quote.quoteRequest.origin.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           quote.quoteRequest.destination.city.toLowerCase().includes(searchTerm.toLowerCase());
      const actualStatus = getQuoteStatus(quote);
      const matchesStatus = statusFilter === 'all' || actualStatus === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'expires':
          return a.expiresAt.getTime() - b.expiresAt.getTime();
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        default:
          return 0;
      }
    });

  const getStatusIcon = (status: QuoteStatus) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'expired': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'booked': return <Package className="w-4 h-4 text-blue-600" />;
    }
  };

  const getStatusColor = (status: QuoteStatus) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      case 'booked': return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getDaysUntilExpiry = (expiresAt: Date) => {
    const now = new Date();
    const diffTime = expiresAt.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getLowestRate = (quote: SavedQuote) => {
    return Math.min(...quote.rates.map(rate => rate.totalRate));
  };

  if (savedQuotes.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Saved Quotes</h3>
        <p className="text-gray-600">Your saved quotes will appear here. Create a quote and save it to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Quote Management</h2>
        <span className="text-sm text-gray-500">{filteredQuotes.length} of {savedQuotes.length} quotes</span>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search quotes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as QuoteStatus | 'all')}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="booked">Booked</option>
            </select>
          </div>

          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'expires' | 'name')}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="date">Sort by Date</option>
              <option value="expires">Sort by Expiry</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span>Active</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span>Expired</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span>Booked</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredQuotes.map((quote) => {
          const status = getQuoteStatus(quote);
          const daysUntilExpiry = getDaysUntilExpiry(quote.expiresAt);
          const lowestRate = getLowestRate(quote);

          return (
            <div
              key={quote.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {quote.name || 'Unnamed Quote'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {quote.quoteRequest.origin.city}, {quote.quoteRequest.origin.state} → {quote.quoteRequest.destination.city}, {quote.quoteRequest.destination.state}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
                    {getStatusIcon(status)}
                    <span className="ml-1 capitalize">{status}</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-500">Created</span>
                  <p className="font-semibold text-gray-900">{formatDate(quote.createdAt)}</p>
                </div>
                <div>
                  <span className="text-gray-500">
                    {status === 'expired' ? 'Expired' : 'Expires'}
                  </span>
                  <p className={`font-semibold ${status === 'expired' ? 'text-red-600' : daysUntilExpiry <= 7 ? 'text-orange-600' : 'text-gray-900'}`}>
                    {status === 'expired' ? formatDate(quote.expiresAt) : `${daysUntilExpiry} days`}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Best Rate</span>
                  <p className="font-semibold text-gray-900">${lowestRate.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-500">Carriers</span>
                  <p className="font-semibold text-gray-900">{quote.rates.length}</p>
                </div>
              </div>

              {quote.notes && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{quote.notes}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onLoadQuote(quote)}
                    className="flex items-center space-x-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">View</span>
                  </button>
                  
                  <button
                    onClick={() => onDeleteQuote(quote.id)}
                    className="flex items-center space-x-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Delete</span>
                  </button>
                </div>

                {status === 'active' && (
                  <div className="text-xs text-gray-500">
                    {daysUntilExpiry <= 7 && (
                      <span className="text-orange-600 font-medium">
                        Expires soon!
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredQuotes.length === 0 && savedQuotes.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No quotes match your filters</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
}