import React, { useState } from 'react';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { TransportModeSelector } from './components/TransportModeSelector';
import { QuoteForm } from './components/QuoteForm';
import { QuoteResults } from './components/QuoteResults';
import { QuoteManagement } from './components/QuoteManagement';
import { ShipmentDashboard } from './components/ShipmentDashboard';
import { Analytics } from './components/Analytics';
import { Features } from './components/Features';
import { useAuth } from './hooks/useAuth';
import { useShipments } from './hooks/useShipments';
import { QuoteRequest, TransportMode, SavedQuote } from './types';

type ActiveTab = 'quote' | 'quotes' | 'shipments' | 'analytics';

function App() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>('quote');
  const [currentQuoteRequest, setCurrentQuoteRequest] = useState<QuoteRequest | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showTransportSelector, setShowTransportSelector] = useState(false);
  const [selectedTransportMode, setSelectedTransportMode] = useState<TransportMode | null>(null);
  
  const {
    shipments,
    savedQuotes,
    quotes,
    carriers,
    insights,
    isLoadingQuotes,
    currentQuoteRequest: hookCurrentQuoteRequest,
    requestQuotes,
    saveQuote,
    deleteSavedQuote,
    loadSavedQuote,
    bookShipment,
    clearQuotesAndInsights
  } = useShipments();

  const handleGetQuoteClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setShowTransportSelector(true);
  };

  const handleTransportModeSelect = (mode: TransportMode) => {
    setSelectedTransportMode(mode);
    setShowTransportSelector(false);
    setActiveTab('quote');
  };

  const handleGetStartedClick = () => {
    setShowTransportSelector(true);
  };

  const handleQuoteRequest = async (request: QuoteRequest) => {
    await requestQuotes(request);
  };

  const handleBookShipment = (rate: any) => {
    if (hookCurrentQuoteRequest) {
      bookShipment(rate, hookCurrentQuoteRequest);
      setActiveTab('shipments');
    }
  };

  const handleLoadQuote = (savedQuote: SavedQuote) => {
    loadSavedQuote(savedQuote);
    setActiveTab('quote');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as ActiveTab);
  };

  const handleLogoClick = () => {
    setActiveTab('quote');
    setSelectedTransportMode(null);
  };
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading Zatov AI...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'quote' as const, label: 'Get Quote', count: null },
    { id: 'quotes' as const, label: 'Quotes', count: savedQuotes.length },
    { id: 'shipments' as const, label: 'Shipments', count: shipments.length },
    { id: 'analytics' as const, label: 'Analytics', count: null }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30">
      <Header 
        onAuthClick={() => setShowAuthModal(true)}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onLogoClick={handleLogoClick}
      />
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      
      <TransportModeSelector
        isOpen={showTransportSelector}
        onSelect={handleTransportModeSelect}
        onClose={() => setShowTransportSelector(false)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isAuthenticated ? (
          <>
            {/* Navigation Tabs */}
            <div className="flex items-center space-x-1 mb-8 bg-white rounded-xl p-1 border border-gray-200 shadow-sm w-fit mx-auto lg:mx-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-700 text-white shadow-md'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== null && (
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      activeTab === tab.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-8">
              {activeTab === 'quote' && (
                <>
                  {selectedTransportMode ? (
                    <>
                      <div className="text-center py-16">
                        <div className="max-w-2xl mx-auto">
                          <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Welcome to Your Dashboard
                          </h2>
                          <p className="text-lg text-gray-600 mb-8">
                            You've selected {selectedTransportMode.toUpperCase()} transport. Ready to get quotes?
                          </p>
                          <button
                            onClick={() => {
                              // This will show the quote form
                              setCurrentQuoteRequest(null);
                              clearQuotesAndInsights();
                            }}
                            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold text-lg mr-4"
                          >
                            Create Quote
                          </button>
                          <button
                            onClick={() => setSelectedTransportMode(null)}
                            className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
                          >
                            Change Transport Mode
                          </button>
                        </div>
                      </div>
                      
                      {/* Show quote form when user clicks Create Quote */}
                      {currentQuoteRequest === null && quotes.length === 0 && (
                        <div className="mt-8">
                          <QuoteForm 
                            onSubmit={handleQuoteRequest} 
                            isLoading={isLoadingQuotes}
                          />
                        </div>
                      )}
                      
                      {(quotes.length > 0 || isLoadingQuotes) && (
                        <div className="space-y-6">
                          {isLoadingQuotes ? (
                            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI is analyzing your shipment</h3>
                              <p className="text-gray-600">Finding the best rates and routes from our carrier network...</p>
                            </div>
                          ) : (
                            <QuoteResults
                              rates={quotes}
                              carriers={carriers}
                              insights={insights}
                              onBookShipment={handleBookShipment}
                              onSaveQuote={saveQuote}
                            />
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-16">
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Ship?</h2>
                      <p className="text-lg text-gray-600 mb-8">Choose your transport mode to get started</p>
                      <button
                        onClick={handleGetQuoteClick}
                        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold text-lg"
                      >
                        Get Quote
                      </button>
                    </div>
                  )}
                </>
              )}

              {activeTab === 'quotes' && (
                <QuoteManagement
                  savedQuotes={savedQuotes}
                  onDeleteQuote={deleteSavedQuote}
                  onLoadQuote={handleLoadQuote}
                />
              )}

              {activeTab === 'shipments' && (
                <ShipmentDashboard shipments={shipments} />
              )}

              {activeTab === 'analytics' && (
                <Analytics shipments={shipments} />
              )}
            </div>

            {/* Features Section - only show on quote tab when no transport mode selected */}
            {activeTab === 'quote' && !selectedTransportMode && (
              <Features />
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-2xl mx-auto">
              <img 
                src="/Zatov logo (485 x 126 px) (1).png" 
                alt="Zatov AI" 
                className="h-16 w-auto mx-auto mb-8"
              />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to Zatov AI
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                AI-powered freight booking platform that revolutionizes transportation logistics
              </p>
              <button
                onClick={handleGetStartedClick}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold text-lg"
              >
                Get Started
              </button>
            </div>
            <Features />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;