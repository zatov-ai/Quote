import React, { useState } from 'react';
import { Plane, Ship, Truck, Train } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { Features } from './components/Features';
import { StatsSection } from './components/StatsSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { AuthModal } from './components/AuthModal';
import { TransportModeSelector } from './components/TransportModeSelector';
import { QuoteForm } from './components/QuoteForm';
import { QuoteResults } from './components/QuoteResults';
import { QuoteManagement } from './components/QuoteManagement';
import { ShipmentDashboard } from './components/ShipmentDashboard';
import { Analytics } from './components/Analytics';
import { Settings } from './components/Settings';
import { AIQuotesTab } from './components/AIQuotesTab';
import { QuotePage } from './components/QuotePage';
import { useAuth } from './hooks/useAuth';
import { useShipments } from './hooks/useShipments';
import { QuoteRequest, TransportMode, SavedQuote } from './types';

type ActiveTab = 'dashboard' | 'quotes' | 'shipments' | 'analytics' | 'ai-quotes' | 'settings' | 'quote-form';

function App() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
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
    setShowTransportSelector(true);
  };

  const handleTransportModeSelect = (mode: TransportMode) => {
    setSelectedTransportMode(mode);
    setShowTransportSelector(false);
    setActiveTab('quote-form'); // Go to dedicated quote page
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
    setActiveTab('dashboard');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as ActiveTab);
  };

  const handleLogoClick = () => {
    // Reset to home page (landing page)
    setActiveTab('dashboard');
    setSelectedTransportMode(null);
    // Force show landing page by logging out or resetting auth state
    window.location.href = '/';
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading Zatov AI...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
      
      {/* Always show dashboard/app interface */}
      {true ? (
        <div className="flex">
          <Sidebar 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            quotesCount={savedQuotes.length}
            shipmentsCount={shipments.length}
          />
          
          <main className="flex-1 p-6 ml-64">
            {/* Welcome Message */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-2">
                <div className="text-2xl">👋</div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isAuthenticated ? `Welcome back, ${user?.firstName} ${user?.lastName}` : 'Welcome to Zatov AI'}
                </h1>
              </div>
              <p className="text-gray-600">
                {isAuthenticated 
                  ? "Get started with your dashboard and let's set you up for success"
                  : "Explore our AI-powered freight platform and get instant quotes"
                }
              </p>
            </div>

            {/* Main Content */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Quick Actions Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                       onClick={handleGetQuoteClick}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">1</span>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Get a Quote</h3>
                    <p className="text-gray-600 text-sm">Start by getting instant quotes from verified carriers</p>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                       onClick={() => window.open('https://zatov-ai-2l6u.bolt.host', '_blank')}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600 font-semibold">2</span>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Quote Extraction</h3>
                    <p className="text-gray-600 text-sm">Paste freight requests and let AI extract the details</p>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                       onClick={() => setActiveTab('shipments')}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 font-semibold">3</span>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Shipments</h3>
                    <p className="text-gray-600 text-sm">Monitor your shipments and delivery status</p>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                       onClick={() => setActiveTab('quotes')}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <span className="text-orange-600 font-semibold">4</span>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Saved Quotes</h3>
                    <p className="text-gray-600 text-sm">Review and manage your saved freight quotes</p>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                       onClick={() => setActiveTab('analytics')}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <span className="text-indigo-600 font-semibold">5</span>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">View Analytics</h3>
                    <p className="text-gray-600 text-sm">Analyze your shipping performance and costs</p>
                  </div>
                </div>

                {/* Quote Form if transport mode selected */}
                {selectedTransportMode && (
                  <div className="mt-8">
                    <div className="mb-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                          {selectedTransportMode === 'air' && <Plane className="w-8 h-8 text-white" />}
                          {selectedTransportMode === 'ocean' && <Ship className="w-8 h-8 text-white" />}
                          {selectedTransportMode === 'otr' && <Truck className="w-8 h-8 text-white" />}
                          {selectedTransportMode === 'rail' && <Train className="w-8 h-8 text-white" />}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 capitalize">
                            {selectedTransportMode === 'otr' ? 'Over The Road' : selectedTransportMode} Freight Quote
                          </h2>
                          <p className="text-gray-600">
                            {selectedTransportMode === 'air' && 'Fast, reliable air cargo services worldwide'}
                            {selectedTransportMode === 'ocean' && 'Cost-effective sea freight solutions'}
                            {selectedTransportMode === 'otr' && 'Flexible trucking solutions across North America'}
                            {selectedTransportMode === 'rail' && 'Efficient rail transport for heavy cargo'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <QuoteForm 
                      onSubmit={handleQuoteRequest} 
                      isLoading={isLoadingQuotes}
                    />
                  </div>
                )}

                {/* Quote Results */}
                {(quotes.length > 0 || isLoadingQuotes) && (
                  <div className="space-y-6">
                    {isLoadingQuotes ? (
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
                        onBookShipment={handleBookShipment}
                        onSaveQuote={saveQuote}
                      />
                    )}
                  </div>
                )}
              </div>
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

            {activeTab === 'ai-quotes' && (
              <AIQuotesTab />
            )}

            {activeTab === 'settings' && (
              <Settings />
            )}

            {activeTab === 'quote-form' && selectedTransportMode && (
              <QuotePage
                transportMode={selectedTransportMode}
                onQuoteRequest={handleQuoteRequest}
                isLoading={isLoadingQuotes}
                quotes={quotes}
                carriers={carriers}
                insights={insights}
                onBookShipment={handleBookShipment}
                onSaveQuote={saveQuote}
                onBackToDashboard={() => setActiveTab('dashboard')}
              />
            )}
          </main>
        </div>
      ) : (
        <div>
          <Hero onGetStarted={handleGetStartedClick} />
          <ServicesSection />
          <Features />
          <StatsSection />
          <CTASection onGetStarted={handleGetStartedClick} />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;