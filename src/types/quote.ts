export type Location = {
  city?: string; state?: string; postal?: string; country?: string; address1?: string;
};
export type Commodity = {
  desc: string; nmfc?: string; packaging?: string;
  dims?: { L:number; W:number; H:number }; weight_lbs:number; pieces?:number;
};
export type QuoteRequest = {
  intent: "quote_request";
  mode?: "LTL"|"FTL"|"AIR"|"OCEAN"|"PARCEL";
  origin: Location; destination: Location;
  accessorials: string[]; ready_date?: string; incoterms?: string;
  currency: "CAD"|"USD"; contact?: { name?:string; email?:string; phone?:string };
  commodities: Commodity[];
};
export type QuoteOption = {
  id: string; carrier: string; service?: string;
  base:number; fsc:number; accessorials:number; markup:number; total:number;
  transitDays?: number; score?: number; breakdown?: Record<string,unknown>;
};
export type Quote = {
  id: string; status: "DRAFT"|"SENT"|"ACCEPTED"|"EXPIRED";
  validityUntil?: string; request: QuoteRequest; options: QuoteOption[];
};