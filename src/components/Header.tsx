import React from 'react';
import { Bell, User, Menu, DollarSign, Globe } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  onAuthClick: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onLogoClick?: () => void;
}

export function Header({ onAuthClick, activeTab, onTabChange, onLogoClick }: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-6">
            <button 
              onClick={onLogoClick}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <img 
                src="/Zatov logo (485 x 126 px) (1).png" 
                alt="Zatov AI" 
                className="h-7 w-auto"
              />
            </button>
            
            {/* Breadcrumb */}
            {isAuthenticated && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Dashboard</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                {/* Currency Selector */}
                <div className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                  <DollarSign className="w-4 h-4" />
                  <span>$0.00 CAD</span>
                </div>
                
                {/* Language Selector */}
                <button className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-gray-900 rounded-lg transition-colors">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">English</span>
                </button>
                
                {/* Notifications */}
                <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
                
                {/* User Menu */}
                <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-gray-500">{user?.company || user?.email}</p>
                  </div>
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <button 
                onClick={onAuthClick}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}