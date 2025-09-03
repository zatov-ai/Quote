import { useState, useEffect } from 'react';
import { Shipment, QuoteRequest, Rate, Carrier, AIInsight, SavedQuote } from '../types';
import { FreightAI } from '../utils/aiEngine';
import { saveShipments, loadShipments, saveSavedQuotes, loadSavedQuotes } from '../utils/storage';

export function useShipments() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>([]);
  const [quotes, setQuotes] = useState<Rate[]>([]);
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(false);
  const [currentQuoteRequest, setCurrentQuoteRequest] = useState<QuoteRequest | null>(null);

  useEffect(() => {
    const loadedShipments = loadShipments();
    const loadedQuotes = loadSavedQuotes();
    setShipments(loadedShipments);
    setSavedQuotes(loadedQuotes);
  }, []);

  const requestQuotes = async (quoteRequest: QuoteRequest) => {
    setCurrentQuoteRequest(quoteRequest);
    setIsLoadingQuotes(true);
    setQuotes([]);
    setInsights([]);

    try {
      // Simulate getting carriers
      const mockCarriers: Carrier[] = [
        {
          id: '1',
          name: 'Swift Transportation',
          mcNumber: 'MC-123456',
          dotNumber: 'DOT-789012',
          rating: 4.8,
          equipment: ['dry_van', 'refrigerated'],
          coverage: ['US', 'Canada']
        },
        {
          id: '2',
          name: 'Schneider National',
          mcNumber: 'MC-234567',
          dotNumber: 'DOT-890123',
          rating: 4.6,
          equipment: ['dry_van', 'flatbed'],
          coverage: ['US', 'Mexico']
        },
        {
          id: '3',
          name: 'J.B. Hunt Transport',
          mcNumber: 'MC-345678',
          dotNumber: 'DOT-901234',
          rating: 4.7,
          equipment: ['container', 'dry_van'],
          coverage: ['US']
        },
        {
          id: '4',
          name: 'Werner Enterprises',
          mcNumber: 'MC-456789',
          dotNumber: 'DOT-012345',
          rating: 4.5,
          equipment: ['dry_van', 'refrigerated', 'flatbed'],
          coverage: ['US', 'Canada', 'Mexico']
        }
      ];

      setCarriers(mockCarriers);

      // Get AI-generated quotes and insights
      const [generatedQuotes, aiInsights] = await Promise.all([
        FreightAI.generateQuotes(quoteRequest),
        FreightAI.getAIInsights(quoteRequest)
      ]);

      setQuotes(generatedQuotes);
      setInsights(aiInsights);
    } catch (error) {
      console.error('Failed to get quotes:', error);
    } finally {
      setIsLoadingQuotes(false);
    }
  };

  const saveQuote = (name: string, notes?: string) => {
    if (!currentQuoteRequest || quotes.length === 0) return;

    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 1); // 1 month validity

    const savedQuote: SavedQuote = {
      id: crypto.randomUUID(),
      quoteRequest: currentQuoteRequest,
      rates: quotes,
      carriers,
      insights,
      createdAt: new Date(),
      expiresAt,
      status: 'active',
      name,
      notes
    };

    const updatedQuotes = [savedQuote, ...savedQuotes];
    setSavedQuotes(updatedQuotes);
    saveSavedQuotes(updatedQuotes);
  };

  const deleteSavedQuote = (id: string) => {
    const updatedQuotes = savedQuotes.filter(quote => quote.id !== id);
    setSavedQuotes(updatedQuotes);
    saveSavedQuotes(updatedQuotes);
  };

  const loadSavedQuote = (savedQuote: SavedQuote) => {
    setCurrentQuoteRequest(savedQuote.quoteRequest);
    setQuotes(savedQuote.rates);
    setCarriers(savedQuote.carriers);
    setInsights(savedQuote.insights);
  };

  const bookShipment = (rate: Rate, quoteRequest: QuoteRequest) => {
    const carrier = carriers.find(c => c.id === rate.carrierId);
    if (!carrier) return;

    const newShipment: Shipment = {
      id: crypto.randomUUID(),
      origin: quoteRequest.origin,
      destination: quoteRequest.destination,
      pickupDate: quoteRequest.pickupDate,
      freight: quoteRequest.freight,
      status: 'booked',
      carrier,
      rate,
      trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updatedShipments = [newShipment, ...shipments];
    setShipments(updatedShipments);
    saveShipments(updatedShipments);

    // Update saved quote status if it exists
    const updatedQuotes = savedQuotes.map(quote => {
      if (quote.quoteRequest === quoteRequest) {
        return { ...quote, status: 'booked' as const };
      }
      return quote;
    });
    setSavedQuotes(updatedQuotes);
    saveSavedQuotes(updatedQuotes);

    // Clear quotes after booking
    setQuotes([]);
    setInsights([]);
  };

  const clearQuotesAndInsights = () => {
    setQuotes([]);
    setInsights([]);
  };

  return {
    shipments,
    savedQuotes,
    quotes,
    carriers,
    insights,
    isLoadingQuotes,
    currentQuoteRequest,
    requestQuotes,
    saveQuote,
    deleteSavedQuote,
    loadSavedQuote,
    bookShipment,
    clearQuotesAndInsights
  };
}