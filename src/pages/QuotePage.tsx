import { useParams } from "react-router-dom";
import { getQuote, saveQuote } from "../lib/storage";
import { exportElementToPDF } from "../lib/pdf";
import { useRef } from "react";

export default function QuotePage() {
  const { id } = useParams();
  const q = id ? getQuote(id) : undefined;
  const ref = useRef<HTMLDivElement>(null);

  if (!q) return <div>Quote not found.</div>;

  function onAccept() {
    const updated = { ...q, status: "ACCEPTED" as const };
    saveQuote(updated);
    alert("Accepted! (In real life: create booking, generate BOL, notify.)");
  }

  async function onPdf() {
    if (ref.current) await exportElementToPDF(ref.current, `Quote-${q.id}.pdf`);
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">ZATO AI — Quote #{q.id.slice(0,8)}</h1>
        <div className={`text-xs px-2 py-1 rounded ${q.status==="ACCEPTED"?"bg-green-700":"bg-neutral-800"}`}>{q.status}</div>
      </div>

      <div ref={ref} className="rounded-2xl p-5 bg-neutral-900 border border-neutral-800">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">Options</div>
            <div className="text-sm opacity-70">Valid until {new Date(q.validityUntil ?? Date.now()).toLocaleDateString()}</div>
          </div>
          <img src="/Zatov logo (485 x 126 px) (1).png" alt="ZATO AI" className="h-10" />
        </div>
        <div className="mt-4 grid gap-3">
          {q.options.map(o=>(
            <div key={o.id} className="rounded-xl p-4 bg-neutral-950 border border-neutral-800">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold">{o.carrier}</div>
                  <div className="text-sm opacity-70">{o.service} · {o.transitDays} days</div>
                </div>
                <div className="text-2xl font-bold">${o.total.toFixed(2)}</div>
              </div>
              <div className="mt-2 text-xs opacity-70">
                Base ${o.base} · FSC ${o.fsc} · Acc ${o.accessorials} · Margin ${o.markup}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onAccept} className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500">Accept & Book</button>
        <button onClick={onPdf} className="px-4 py-2 rounded-xl border border-neutral-700">Download PDF</button>
      </div>
    </div>
  );
}