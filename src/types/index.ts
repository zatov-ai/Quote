export interface Location {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Shipment {
  id: string;
  origin: Location;
  destination: Location;
  pickupDate: Date;
  deliveryDate?: Date;
  freight: FreightDetails;
  status: ShipmentStatus;
  carrier?: Carrier;
  rate?: Rate;
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FreightDetails {
  type: FreightType;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  pieces: number;
  description: string;
  value?: number;
  hazmat: boolean;
  temperature?: TemperatureRequirement;
}

export interface Carrier {
  id: string;
  name: string;
  mcNumber: string;
  dotNumber: string;
  rating: number;
  equipment: EquipmentType[];
  coverage: string[];
  logo?: string;
}

export interface Rate {
  id: string;
  carrierId: string;
  baseRate: number;
  fuelSurcharge: number;
  accessorials: Accessorial[];
  totalRate: number;
  transitTime: number;
  confidence: number;
  aiRecommendation?: string;
}

export interface SavedQuote {
  id: string;
  quoteRequest: QuoteRequest;
  rates: Rate[];
  carriers: Carrier[];
  insights: AIInsight[];
  createdAt: Date;
  expiresAt: Date;
  status: 'active' | 'expired' | 'booked';
  name?: string;
  notes?: string;
}

export type QuoteStatus = 'active' | 'expired' | 'booked';

export interface Accessorial {
  type: string;
  description: string;
  cost: number;
}

export type ShipmentStatus = 
  | 'quote_requested'
  | 'quoted'
  | 'booked'
  | 'in_transit'
  | 'delivered'
  | 'cancelled';

export type FreightType = 
  | 'ltl'
  | 'ftl'
  | 'partial'
  | 'expedited'
  | 'white_glove';

export type EquipmentType = 
  | 'dry_van'
  | 'refrigerated'
  | 'flatbed'
  | 'step_deck'
  | 'lowboy'
  | 'container';

export type TemperatureRequirement = {
  min: number;
  max: number;
  unit: 'F' | 'C';
};

export interface QuoteRequest {
  origin: Location;
  destination: Location;
  pickupDate: Date;
  freight: FreightDetails;
  serviceLevel: 'standard' | 'expedited' | 'white_glove';
}

export interface AIInsight {
  type: 'cost_optimization' | 'route_optimization' | 'carrier_recommendation' | 'market_trend';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  savings?: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type TransportMode = 'air' | 'ocean' | 'otr' | 'rail';

export interface Piece {
  id: string;
  type: 'pallet' | 'skid' | 'barrel' | 'roll' | 'box' | 'crate' | 'other';
  quantity: number;
  weight: number; // in lbs
  dimensions: {
    length: number; // in inches
    width: number;  // in inches
    height: number; // in inches
  };
  description?: string;
}