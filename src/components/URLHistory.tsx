import React, { useState } from 'react';
import { Copy, ExternalLink, Trash2, Check, QrCode, BarChart3, Calendar } from 'lucide-react';
import { ShortenedURL } from '../types';
import { copyToClipboard } from '../utils/clipboard';
import { generateQRCodeURL } from '../utils/qrCode';

interface URLHistoryProps {
  urls: ShortenedURL[];
  onDelete: (id: string) => void;
}

export function URLHistory({ urls, onDelete }: URLHistoryProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showQR, setShowQR] = useState<string | null>(null);

  const handleCopy = async (url: ShortenedURL) => {
    const success = await copyToClipboard(url.shortUrl);
    if (success) {
      setCopiedId(url.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleVisit = (url: ShortenedURL) => {
    window.open(url.originalUrl, '_blank');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (urls.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No URLs yet</h3>
          <p className="text-gray-500">Start by shortening your first URL above</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Recent Links</h3>
        <span className="text-sm text-gray-500">{urls.length} links created</span>
      </div>

      <div className="space-y-4">
        {urls.map((url) => (
          <div
            key={url.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-lg font-mono text-blue-600 font-medium">
                    {url.shortUrl}
                  </span>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(url.createdAt)}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 break-all mb-3">
                  {url.originalUrl}
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <BarChart3 className="w-4 h-4" />
                    <span>{url.clicks} clicks</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${url.isActive ? 'bg-green-400' : 'bg-gray-400'}`} />
                    <span>{url.isActive ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 flex-shrink-0">
                <button
                  onClick={() => setShowQR(showQR === url.id ? null : url.id)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  title="Show QR Code"
                >
                  <QrCode className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => handleCopy(url)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  title="Copy URL"
                >
                  {copiedId === url.id ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                
                <button
                  onClick={() => handleVisit(url)}
                  className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                  title="Visit Original URL"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => onDelete(url.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  title="Delete URL"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {showQR === url.id && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <img
                      src={generateQRCodeURL(url.shortUrl)}
                      alt="QR Code"
                      className="w-32 h-32"
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="font-semibold text-gray-900 mb-2">QR Code</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Scan this code to quickly access your shortened URL
                    </p>
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = generateQRCodeURL(url.shortUrl);
                        link.download = `qr-${url.shortCode}.png`;
                        link.click();
                      }}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Download QR Code
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}