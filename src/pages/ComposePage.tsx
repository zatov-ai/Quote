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
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Compose Quote</h1>
        <p className="text-gray-600">Review extracted data and carrier options</p>
      </div>
      
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Extracted Data</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            (data.confidence || 0) > 0.8 
              ? 'bg-green-100 text-green-800' 
              : (data.confidence || 0) > 0.6 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-red-100 text-red-800'
          }`}>
            {Math.round((data.confidence||0)*100)}% confidence
          </span>
        </div>
        <pre className="text-sm overflow-auto bg-gray-50 p-4 rounded-lg text-gray-800">
          {JSON.stringify(data.extracted, null, 2)}
        </pre>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Carrier Options</h2>
        
        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">Rating carriers…</span>
            </div>
          </div>
        )}
        
        {!loading && options.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No options available yet.
          </div>
        )}
        
        <div className="grid md:grid-cols-3 gap-6">
        {options.map(o=>(
          <div key={o.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200">
            <div className="text-xl font-bold text-gray-900">{o.carrier}</div>
            <div className="text-sm text-gray-600 mb-4">{o.service} · {o.transitDays} days</div>
            <div className="text-3xl font-bold text-purple-600 mb-4">${o.total.toFixed(2)}</div>
            <div className="text-xs text-gray-500 space-y-1">
              <div>Base: ${o.base}</div>
              <div>FSC: ${o.fsc}</div>
              <div>Accessorials: ${o.accessorials}</div>
              <div>Margin: ${o.markup}</div>
            </div>
          </div>
        ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button onClick={onSend} disabled={options.length===0}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-700 text-white hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold disabled:opacity-50 disabled:transform-none">
          Send / Share Quote
        </button>
        <button 
          onClick={()=>nav("/")} 
          className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 hover:border-purple-400 hover:text-purple-600 transition-all duration-200 font-semibold"
        >
          Back
        </button>
      </div>
    </div>
  );
}