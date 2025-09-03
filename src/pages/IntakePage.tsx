import { useState } from "react";
import { extractFromText } from "../services/extract";
import { useNavigate } from "react-router-dom";

export default function IntakePage() {
  const [raw, setRaw] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string|undefined>();
  const nav = useNavigate();

  async function onExtract() {
    setLoading(true); setErr(undefined);
    const { extracted, confidence, error } = await extractFromText(raw);
    setLoading(false);
    if (!extracted) { setErr(error ?? "Could not extract"); return; }
    sessionStorage.setItem("zato_extracted", JSON.stringify({ extracted, confidence }));
    nav("/compose");
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Quote Extraction</h1>
        <p className="text-gray-600">Paste your freight request and let AI extract the details</p>
      </div>
      
      <textarea 
        className="w-full min-h-64 p-4 rounded-xl bg-white border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-gray-900 placeholder-gray-500"
        placeholder="Paste an email or details: origin, destination, pallets/dims/weight, accessorials, ready date, etc."
        value={raw} 
        onChange={e=>setRaw(e.target.value)} 
      />
      
      <div className="flex items-center justify-between">
        <button onClick={onExtract} disabled={loading}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-700 text-white hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold disabled:opacity-50 disabled:transform-none">
          {loading ? "Extracting…" : "Extract with AI"}
        </button>
        {err && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg">
            {err}
          </div>
        )}
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Try this example:</h3>
        <p className="text-blue-800 text-sm">
          "1 pallet 48x40x60 300 lbs, liftgate pickup from Montreal H4Z1A1 to Vaughan L4K0A1, ready tomorrow"
        </p>
      </div>
    </div>
  );
}