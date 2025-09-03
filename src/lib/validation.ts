import { z } from "zod";

export const Location = z.object({
  city: z.string().optional(),
  state: z.string().optional(),
  postal: z.string().optional(),
  country: z.string().min(2).max(2).optional(),
  address1: z.string().optional(),
});

export const Commodity = z.object({
  desc: z.string(),
  nmfc: z.string().optional(),
  packaging: z.string().optional(),
  dims: z.object({ L: z.number(), W: z.number(), H: z.number() }).optional(),
  weight_lbs: z.number().positive(),
  pieces: z.number().int().positive().optional()
});

export const QuoteRequestSchema = z.object({
  intent: z.literal("quote_request"),
  mode: z.enum(["LTL","FTL","AIR","OCEAN","PARCEL"]).optional(),
  origin: Location,
  destination: Location,
  accessorials: z.array(z.string()).default([]),
  ready_date: z.string().optional(),
  incoterms: z.string().optional(),
  currency: z.enum(["CAD","USD"]).default((import.meta.env.VITE_CURRENCY ?? "CAD") as "CAD"|"USD"),
  contact: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional()
  }).optional(),
  commodities: z.array(Commodity).min(1)
});

export type Extracted = z.infer<typeof QuoteRequestSchema>;