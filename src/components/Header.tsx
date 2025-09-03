import React from 'react';
import { Bell, User, Menu, DollarSign, Globe, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';

interface HeaderProps {
  onAuthClick: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onLogoClick?: () => void;
}

export function Header({ onAuthClick, activeTab, onTabChange, onLogoClick }: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const { language, changeLanguage, t } = useTranslation();
  const [showLanguageDropdown, setShowLanguageDropdown] = React.useState(false);
  const [showUserDropdown, setShowUserDropdown] = React.useState(false);

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'fr' as const, name: 'Français', flag: '🇫🇷' },
    { code: 'es' as const, name: 'Español', flag: '🇪🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

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
                <div className="relative">
                  <button 
                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                  >
                    <span className="text-lg">{currentLanguage.flag}</span>
                    <span className="text-sm font-medium">{currentLanguage.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showLanguageDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showLanguageDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => {
                            changeLanguage(language.code);
                            setShowLanguageDropdown(false);
                          }}
                          className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                            language === language.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                          }`}
                        >
                          <span className="text-lg">{language.flag}</span>
                          <span className="font-medium">{language.name}</span>
                          {language === language.code && (
                            <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Notifications */}
                <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
                
                {/* User Menu */}
                <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
                  <div className="relative">
                    <button
                      onClick={() => setShowUserDropdown(!showUserDropdown)}
                      className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-all duration-200"
                    >
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs text-gray-500">{user?.company || user?.email}</p>
                      </div>
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                        </span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showUserDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showUserDropdown && (
                      <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                          {user?.company && <p className="text-xs text-gray-500">{user.company}</p>}
                        </div>
                        
                        <div className="py-2">
                          <button className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors text-gray-700">
                            <User className="w-4 h-4" />
                            <span className="text-sm">{t('profileSettings')}</span>
                          </button>
                          <button className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors text-gray-700">
                            <User className="w-4 h-4" />
                            <span className="text-sm">{t('accountSettings')}</span>
                          </button>
                          <button className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors text-gray-700">
                            <User className="w-4 h-4" />
                            <span className="text-sm">{t('helpSupport')}</span>
                          </button>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-2">
                          <button 
                            onClick={() => {
                              logout();
                              setShowUserDropdown(false);
                            }}
                            className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-red-50 transition-colors text-red-600"
                          >
                            <User className="w-4 h-4" />
                            <span className="text-sm font-medium">{t('signOut')}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <button 
                onClick={onAuthClick}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
              >
                {t('signIn')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Click outside handlers */}
      {(showLanguageDropdown || showUserDropdown) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowLanguageDropdown(false);
            setShowUserDropdown(false);
          }}
        />
      )}
    </header>
  );
}