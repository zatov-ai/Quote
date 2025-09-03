import { Shipment, SavedQuote } from '../types';

const STORAGE_KEYS = {
  SHIPMENTS: 'zatov_shipments',
  USER_PREFERENCES: 'zatov_preferences',
  SAVED_QUOTES: 'zatov_saved_quotes'
};

export function saveShipments(shipments: Shipment[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SHIPMENTS, JSON.stringify(shipments));
  } catch (error) {
    console.error('Failed to save shipments:', error);
  }
}

export function loadShipments(): Shipment[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SHIPMENTS);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return parsed.map((shipment: any) => ({
      ...shipment,
      pickupDate: new Date(shipment.pickupDate),
      deliveryDate: shipment.deliveryDate ? new Date(shipment.deliveryDate) : undefined,
      createdAt: new Date(shipment.createdAt),
      updatedAt: new Date(shipment.updatedAt)
    }));
  } catch (error) {
    console.error('Failed to load shipments:', error);
    return [];
  }
}

export function saveUserPreferences(preferences: any): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
  } catch (error) {
    console.error('Failed to save preferences:', error);
  }
}

export function loadUserPreferences(): any {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to load preferences:', error);
    return {};
  }
}

export function saveSavedQuotes(quotes: SavedQuote[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED_QUOTES, JSON.stringify(quotes));
  } catch (error) {
    console.error('Failed to save quotes:', error);
  }
}

export function loadSavedQuotes(): SavedQuote[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SAVED_QUOTES);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return parsed.map((quote: any) => ({
      ...quote,
      quoteRequest: {
        ...quote.quoteRequest,
        pickupDate: new Date(quote.quoteRequest.pickupDate)
      },
      createdAt: new Date(quote.createdAt),
      expiresAt: new Date(quote.expiresAt)
    }));
  } catch (error) {
    console.error('Failed to load saved quotes:', error);
    return [];
  }
}