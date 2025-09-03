import { useState, useEffect } from 'react';
import { ShortenedURL, URLStats } from '../types';
import { loadURLs, saveURLs } from '../utils/urlShortener';

export function useURLs() {
  const [urls, setUrls] = useState<ShortenedURL[]>([]);

  useEffect(() => {
    const loadedURLs = loadURLs();
    setUrls(loadedURLs);
  }, []);

  const addURL = (newURL: ShortenedURL) => {
    const updatedURLs = [newURL, ...urls];
    setUrls(updatedURLs);
    saveURLs(updatedURLs);
  };

  const deleteURL = (id: string) => {
    const updatedURLs = urls.filter(url => url.id !== id);
    setUrls(updatedURLs);
    saveURLs(updatedURLs);
  };

  const getStats = (): URLStats => {
    return {
      totalUrls: urls.length,
      totalClicks: urls.reduce((sum, url) => sum + url.clicks, 0),
      activeUrls: urls.filter(url => url.isActive).length,
    };
  };

  return {
    urls,
    addURL,
    deleteURL,
    stats: getStats(),
  };
}