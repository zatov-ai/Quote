import type { Extracted } from "../lib/validation";
import type { QuoteOption } from "../types/quote";
import { v4 as uuid } from "uuid";

function fscPercent(date = new Date()) {
  // placeholder 24% – in real life, derive by lane/carrier/date
  return 0.24;
}
function lookupSurcharge(name:string) {
  // tiny demo table
  const t: Record<string, number> = { liftgate: 60, residential: 45, appointment: 25, tailgate: 60 };
  return t[name.toLowerCase()] ?? 0;
}
function dynamicMargin() { return 35; } // placeholder

export async function rate(extracted: Extracted): Promise<QuoteOption[]> {
  // Simple base rate heuristic by total weight & distance proxy (postal string length… just demo)
  const totalWeight = extracted.commodities.reduce((s,c)=> s + c.weight_lbs, 0);
  const base = Math.max(145, Math.round(totalWeight * 0.55)); // pretend CWT-ish
  const fsc = Math.round(base * fscPercent());
  const acc = Math.round(extracted.accessorials.reduce((s,a)=> s + lookupSurcharge(a), 0));
  const markup = dynamicMargin();
  const total = base + fsc + acc + markup;

  return [
    {
      id: uuid(),
      carrier: "Day & Ross",
      service: "LTL Standard",
      base, fsc, accessorials: acc, markup, total,
      transitDays: 2, score: 0.82,
      breakdown: { rules: ["base", "fsc", "accessorials", "margin:STANDARD"] }
    },
    {
      id: uuid(),
      carrier: "GLS",
      service: "LTL Economy",
      base: Math.round(base*0.92), fsc: Math.round(fsc*0.96),
      accessorials: acc, markup, total: Math.round(total*0.97),
      transitDays: 3, score: 0.78,
      breakdown: { rules: ["slower, cheaper"] }
    },
    {
      id: uuid(),
      carrier: "Purolator",
      service: "LTL Express",
      base: Math.round(base*1.08), fsc: Math.round(fsc*1.04),
      accessorials: acc, markup: markup+10, total: Math.round(total*1.09),
      transitDays: 1, score: 0.75,
      breakdown: { rules: ["faster, premium"] }
    }
  ];
}