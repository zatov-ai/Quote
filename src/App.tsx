import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import IntakePage from "./pages/IntakePage";
import ComposePage from "./pages/ComposePage";
import QuotePage from "./pages/QuotePage";
import { AIQuotesTab } from './components/AIQuotesTab';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-950 text-white">
        <header className="border-b border-neutral-800">
          <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img src="/Zatov_logo_icon_top_black_purple (2).png" alt="ZATO AI" className="h-8" />
              <span className="font-semibold">ZATO AI — Quotes</span>
            </Link>
            <nav className="text-sm opacity-80">
              <Link to="/" className="hover:opacity-100">New Quote</Link>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<IntakePage />} />
            <Route path="/compose" element={<ComposePage />} />
            <Route path="/quote/:id" element={<QuotePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}