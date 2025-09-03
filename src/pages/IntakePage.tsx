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
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">New Quote — Paste Request</h1>
      <textarea className="w-full min-h-56 p-3 rounded-xl bg-neutral-900 border border-neutral-800"
        placeholder="Paste an email or details: origin, destination, pallets/dims/weight, accessorials, ready date, etc."
        value={raw} onChange={e=>setRaw(e.target.value)} />
      <div className="flex gap-3">
        <button onClick={onExtract} disabled={loading}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50">
          {loading ? "Extracting…" : "Extract with AI"}
        </button>
        {err && <div className="text-red-400">{err}</div>}
      </div>
      <p className="text-sm opacity-70">Tip: try "1 pallet 48x40x60 300 lbs, liftgate pickup from Montreal H4Z1A1 to Vaughan L4K0A1, ready tomorrow".</p>
    </div>
  );
}