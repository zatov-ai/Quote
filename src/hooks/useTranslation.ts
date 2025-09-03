import { useState, useEffect } from 'react';
import { Language, getTranslation, Translations } from '../utils/translations';

const STORAGE_KEY = 'zatov_language';

export function useTranslation() {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const t = (key: keyof Translations): string => {
    return getTranslation(language, key);
  };

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return {
    language,
    t,
    changeLanguage
  };
}