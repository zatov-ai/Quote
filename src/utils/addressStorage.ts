import { Address } from '../types/address';

const STORAGE_KEY = 'zatov_addresses';

export function saveAddresses(addresses: Address[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
  } catch (error) {
    console.error('Failed to save addresses:', error);
  }
}

export function loadAddresses(): Address[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultAddresses();
    
    const parsed = JSON.parse(stored);
    return parsed.map((address: any) => ({
      ...address,
      createdAt: new Date(address.createdAt),
      updatedAt: new Date(address.updatedAt)
    }));
  } catch (error) {
    console.error('Failed to load addresses:', error);
    return getDefaultAddresses();
  }
}

function getDefaultAddresses(): Address[] {
  return [
    {
      id: '1',
      company: 'Zatov Group Inc.',
      displayAs: 'Zatov Group Inc.',
      address1: '2, Chemin Darnley',
      address2: '',
      country: 'Canada',
      province: 'Quebec',
      city: 'Mont-royal',
      postalCode: 'H4T 1M4',
      attention: 'Aron Ruttner',
      phone: '(514) 312-7920',
      email: 'dp@zatov.com',
      taxId: '',
      eoriNumber: '',
      defaultInstructions: '',
      notifyRecipient: true,
      residentialAddress: false,
      defaultShipFrom: true,
      defaultShipTo: false,
      confirmDelivery: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
}