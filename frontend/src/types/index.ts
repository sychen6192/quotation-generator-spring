export interface Company {
  id: string;
  name: string;
  taxId: string;
  phoneNumber: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Quote {
  id: string;
  quoteDescription: string;
  validUntil: Date;
  author: string;
  sales: string;
  payment: string;
  taxIsIncluded: boolean;
  shippingDate?: Date;
  shippingMethod?: string;
  company: {
    id: number;
    name: string;
  };
  createdTimestamp: string;
  updatedTimestamp: string;
}

export interface Item {
  id: string;
  name: string;
  unitPrice: number;
}

export interface QuoteItem {
  name: string;
  unitPrice: number;
  quantity: number;
}