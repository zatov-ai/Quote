import { ShortenedURL } from '../types';

const DOMAIN = 'lazr.ly';
const STORAGE_KEY = 'lazr_urls';

export function generateShortCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function formatURL(url: string): string {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}

export function createShortURL(originalUrl: string): ShortenedURL {
  const formattedUrl = formatURL(originalUrl);
  const shortCode = generateShortCode();
  
  return {
    id: crypto.randomUUID(),
    originalUrl: formattedUrl,
    shortCode,
    shortUrl: `https://${DOMAIN}/${shortCode}`,
    createdAt: new Date(),
    clicks: 0,
    isActive: true,
  };
}

export function saveURLs(urls: ShortenedURL[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
}

export function loadURLs(): ShortenedURL[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return parsed.map((url: any) => ({
      ...url,
      createdAt: new Date(url.createdAt),
    }));
  } catch {
    return [];
  }
}

export function incrementClicks(shortCode: string): void {
  const urls = loadURLs();
  const urlIndex = urls.findIndex(url => url.shortCode === shortCode);
  
  if (urlIndex !== -1) {
    urls[urlIndex].clicks += 1;
    saveURLs(urls);
  }
}