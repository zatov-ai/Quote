import React from 'react';
import { Bell, User, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  onAuthClick: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onLogoClick?: () => void;
}

export function Header({ onAuthClick, activeTab, onTabChange, onLogoClick }: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth();

  const handleNavClick = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onLogoClick}
              className="flex items-center space-x-4 hover:opacity-80 transition-opacity"
            >
              <img 
                src="/Zatov logo (485 x 126 px) (1).png" 
                alt="Zatov AI" 
                className="h-8 w-auto"
              />
            </button>
            <div>
              <p className="text-xs text-gray-500 -mt-1">Smart Transportation Solutions</p>
            </div>
          </div>
          
          {isAuthenticated && (
            <nav className="hidden lg:flex items-center space-x-8">
              <button 
                onClick={() => handleNavClick('quote')}
                className={`transition-colors font-medium ${
                  activeTab === 'quote' 
                    ? 'text-purple-600 border-b-2 border-purple-600 pb-1' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => handleNavClick('ai-quotes')}
                className={`transition-colors font-medium ${
                  activeTab === 'ai-quotes' 
                    ? 'text-purple-600 border-b-2 border-purple-600 pb-1' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                AI Quotes
              </button>
              <button 
                onClick={() => handleNavClick('quotes')}
                className={`transition-colors font-medium ${
                  activeTab === 'quotes' 
                    ? 'text-purple-600 border-b-2 border-purple-600 pb-1' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                Quotes
              </button>
              <button 
                onClick={() => handleNavClick('shipments')}
                className={`transition-colors font-medium ${
                  activeTab === 'shipments' 
                    ? 'text-purple-600 border-b-2 border-purple-600 pb-1' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                Shipments
              </button>
              <button 
                onClick={() => handleNavClick('analytics')}
                className={`transition-colors font-medium ${
                  activeTab === 'analytics' 
                    ? 'text-purple-600 border-b-2 border-purple-600 pb-1' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                Analytics
              </button>
            </nav>
          )}

          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
                <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-gray-500">{user?.company || user?.email}</p>
                  </div>
                  <button 
                    onClick={logout}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    title="Sign Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <button 
                onClick={onAuthClick}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-700 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
              >
                Sign In
              </button>
            )}
            <button className="lg:hidden p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}