import React, { useState } from 'react';
import { Link, Copy, Check, AlertCircle } from 'lucide-react';
import { createShortURL, isValidURL } from '../utils/urlShortener';
import { copyToClipboard } from '../utils/clipboard';
import { ShortenedURL } from '../types';

interface URLShortenerProps {
  onURLShortened: (shortenedURL: ShortenedURL) => void;
}

export function URLShortener({ onURLShortened }: URLShortenerProps) {
  const [inputUrl, setInputUrl] = useState('');
  const [lastShortened, setLastShortened] = useState<ShortenedURL | null>(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!inputUrl.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!isValidURL(inputUrl)) {
      setError('Please enter a valid URL');
      return;
    }

    setIsLoading(true);
    
    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const shortenedURL = createShortURL(inputUrl);
    setLastShortened(shortenedURL);
    onURLShortened(shortenedURL);
    setInputUrl('');
    setIsLoading(false);
  };

  const handleCopy = async () => {
    if (!lastShortened) return;
    
    const success = await copyToClipboard(lastShortened.shortUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Shorten Your Links
          <span className="block text-2xl sm:text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Lightning Fast
          </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-lg mx-auto">
          Transform long, unwieldy URLs into clean, shareable links in seconds
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Link className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Enter your long URL here..."
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white shadow-sm text-lg"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Shortening...</span>
              </div>
            ) : (
              'Shorten'
            )}
          </button>
        </div>
        
        {error && (
          <div className="mt-3 flex items-center space-x-2 text-red-600 bg-red-50 px-4 py-2 rounded-lg">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </form>

      {lastShortened && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Your shortened URL</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Just created</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-lg font-mono text-blue-600 truncate mr-4">
                {lastShortened.shortUrl}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex-shrink-0"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span className="text-sm font-medium">
                  {copied ? 'Copied!' : 'Copy'}
                </span>
              </button>
            </div>
            
            <div className="text-sm text-gray-500">
              <span className="font-medium">Original:</span>{' '}
              <span className="break-all">{lastShortened.originalUrl}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}