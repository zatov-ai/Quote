import React from 'react';
import { Heart, Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Zatov AI</h3>
            <p className="text-gray-600 mb-4 max-w-md">
              AI-powered freight booking platform that revolutionizes transportation logistics 
              with intelligent route optimization and carrier matching.
            </p>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                <Github className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><button className="hover:text-blue-600 transition-colors">Features</button></li>
              <li><button className="hover:text-blue-600 transition-colors">Pricing</button></li>
              <li><button className="hover:text-blue-600 transition-colors">API</button></li>
              <li><button className="hover:text-blue-600 transition-colors">Enterprise</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><button className="hover:text-blue-600 transition-colors">Help Center</button></li>
              <li><button className="hover:text-blue-600 transition-colors">Contact Us</button></li>
              <li><button className="hover:text-blue-600 transition-colors">Status</button></li>
              <li><button className="hover:text-blue-600 transition-colors">Privacy</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-gray-500 flex items-center">
            Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> by Zatov AI Team
          </p>
          <p className="text-sm text-gray-500 mt-2 sm:mt-0">
            © 2025 Zatov AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}