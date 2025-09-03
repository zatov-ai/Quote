import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import IntakePage from "../pages/IntakePage";
import ComposePage from "../pages/ComposePage";
import QuotePage from "../pages/QuotePage";

export function AIQuotesTab() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <BrowserRouter basename="/ai-quotes">
        <div className="max-w-6xl mx-auto p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-blue-700 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">AI</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">AI Quote System</h2>
                    <p className="text-purple-100">Intelligent freight quote extraction and rating</p>
                  </div>
                </div>
                <nav className="flex items-center space-x-4">
                  <Link 
                    to="/" 
                    className="text-white/80 hover:text-white transition-colors font-medium"
                  >
                    New Quote
                  </Link>
                </nav>
              </div>
            </div>
            
            <div className="p-6">
              <Routes>
                <Route path="/" element={<IntakePage />} />
                <Route path="/compose" element={<ComposePage />} />
                <Route path="/quote/:id" element={<QuotePage />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}