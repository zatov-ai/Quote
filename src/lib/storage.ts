import type { Quote } from "../types/quote";

const KEY = "zato_quotes_v1";
export function saveQuote(q: Quote) {
  const all = listQuotes(); const idx = all.findIndex(x=>x.id===q.id);
  if (idx>=0) all[idx]=q; else all.push(q);
  localStorage.setItem(KEY, JSON.stringify(all));
}
export function listQuotes(): Quote[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
export function getQuote(id:string): Quote|undefined {
  return listQuotes().find(q=>q.id===id);
}