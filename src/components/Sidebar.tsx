import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Package, 
  BarChart3, 
  Brain,
  LogOut,
  Settings,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';
  activeTab: string;
  onTabChange: (tab: string) => void;
  quotesCount: number;
  shipmentsCount: number;
}

export function Sidebar({ activeTab, onTabChange, quotesCount, shipmentsCount }: SidebarProps) {
  const { logout } = useAuth();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      count: null
    },
    {
      id: 'quotes',
      label: 'Quotes',
      icon: <FileText className="w-5 h-5" />,
      count: quotesCount
    },
    {
      id: 'shipments',
      label: 'Shipments',
      icon: <Package className="w-5 h-5" />,
      count: shipmentsCount
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      count: null
    },
    {
      id: 'ai-quotes',
      label: 'AI Quotes',
      icon: <Brain className="w-5 h-5" />,
      count: null
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      count: null
    }
  ];

  return (
    <div className="fixed left-0 top-16 h-full w-64 bg-white border-r border-gray-200 z-40">
      <div className="flex flex-col h-full">
        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </div>
              {item.count !== null && item.count > 0 && (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  activeTab === item.id 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Menu */}
        <div className="px-4 py-4 border-t border-gray-200 space-y-2">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all duration-200">
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium">Support</span>
          </button>
          
          <button 
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}