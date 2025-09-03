import { useEffect, useMemo, useState } from "react";
import { rate } from "../services/rating";
import { v4 as uuid } from "uuid";
import type { Quote, QuoteOption } from "../types/quote";
import { saveQuote } from "../lib/storage";
import { useNavigate } from "react-router-dom";

export default function ComposePage() {
  const nav = useNavigate();
  const [options, setOptions] = useState<QuoteOption[]>([]);
  const [loading, setLoading] = useState(false);
  const data = useMemo(()=> {
    const s = sessionStorage.getItem("zato_extracted");
    return s ? JSON.parse(s) as any : null;
  }, []);

  useEffect(() => {
    if (!data?.extracted) return;
    setLoading(true);
    rate(data.extracted).then(setOptions).finally(()=>setLoading(false));
  }, [data]);

  function onSend() {
    // create a quote object & persist locally (demo)
    const q: Quote = {
      id: uuid(),
      status: "SENT",
      validityUntil: new Date(Date.now()+1000*60*60*24*7).toISOString(),
      request: data.extracted,
      options
    };
    saveQuote(q);
    nav(`/quote/${q.id}`);
  }

  if (!data?.extracted) return <div>No extracted data found. Go back and paste a request.</div>;

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Compose Quote</h1>
      <div className="rounded-xl p-4 bg-neutral-900 border border-neutral-800">
        <div className="text-sm opacity-70 mb-2">Extracted (confidence {Math.round((data.confidence||0)*100)}%)</div>
        <pre className="text-xs overflow-auto">{JSON.stringify(data.extracted, null, 2)}</pre>
      </div>

      <h2 className="text-xl font-semibold">Options</h2>
      {loading && <div>Rating carriers…</div>}
      {!loading && options.length===0 && <div>No options yet.</div>}
      <div className="grid md:grid-cols-3 gap-4">
        {options.map(o=>(
          <div key={o.id} className="rounded-2xl p-4 bg-neutral-900 border border-neutral-800">
            <div className="text-lg font-semibold">{o.carrier}</div>
            <div className="text-sm opacity-70">{o.service} · {o.transitDays} days</div>
            <div className="mt-2 text-2xl font-bold">${o.total.toFixed(2)}</div>
            <div className="mt-2 text-xs opacity-70">Base ${o.base} · FSC ${o.fsc} · Acc ${o.accessorials} · Margin ${o.markup}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onSend} disabled={options.length===0}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50">
          Send / Share Quote
        </button>
        <button onClick={()=>nav("/")} className="px-4 py-2 rounded-xl border border-neutral-700">Back</button>
      </div>
    </div>
  );
}