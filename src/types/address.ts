export interface Address {
  id: string;
  company: string;
  displayAs: string;
  address1: string;
  address2?: string;
  country: string;
  province: string;
  city: string;
  postalCode: string;
  attention: string;
  phone: string;
  email: string;
  taxId?: string;
  eoriNumber?: string;
  defaultInstructions?: string;
  notifyRecipient: boolean;
  residentialAddress: boolean;
  defaultShipFrom: boolean;
  defaultShipTo: boolean;
  confirmDelivery: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddressFormData {
  company: string;
  displayAs: string;
  address1: string;
  address2: string;
  country: string;
  province: string;
  city: string;
  postalCode: string;
  attention: string;
  phone: string;
  email: string;
  taxId: string;
  eoriNumber: string;
  defaultInstructions: string;
  notifyRecipient: boolean;
  residentialAddress: boolean;
  defaultShipFrom: boolean;
  defaultShipTo: boolean;
  confirmDelivery: boolean;
}