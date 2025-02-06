import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL as string,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define types for the data
export interface Quote {
  id: string;
  quoteDescription: string;
  validUntil: string; 
  author: string;
  sales: string;
  payment: string;
  taxIsIncluded: boolean;
  shippingDate?: string; // 可選，若有設定
  shippingMethod?: string; // 可選
  company: {
    id: number;
    name: string;
  };
  createdTimestamp: string;
  updatedTimestamp: string;
}

export interface Company {
  id: string;
  name: string;
  taxId: string;
  phoneNumber: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Item {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

// Fetch all quotes
export const fetchQuotes = async (): Promise<Quote[]> => {
  const response = await api.get<Quote[]>('/quotes');
  return response.data;
};

// Fetch a quote by ID
export const fetchQuoteById = async (id: string): Promise<Quote> => {
  const response = await api.get<Quote>(`/quotes/${id}`);
  return response.data;
};

// Create a new quote
export const createQuote = async (data: Quote): Promise<Quote> => {
  const response = await api.post<Quote>('/quotes', data);
  return response.data;
};

// Update an existing quote
export const updateQuote = async (
  id: string,
  data: Quote
): Promise<Quote> => {
  const response = await api.put<Quote>(`/quotes/${id}`, data);
  return response.data;
};

// Delete a quote
export const deleteQuote = async (id: string): Promise<void> => {
  await api.delete(`/quotes/${id}`);
};

// Fetch all companies
export const fetchCompanies = async (): Promise<Company[]> => {
  const response = await api.get<Company[]>('/companies');
  return response.data;
};

export const fetchCompanyById = async (companyId: string) => {
  const response = await api.get<Company>(`/companies/${companyId}`);
  return response.data
};

export const createCompany = async (companyData: Company): Promise<Company> => {
  const response = await api.post<Company>('/companies', companyData);
  return response.data;
};

export const updateCompany = async (
  companyId: string,
  companyData: Company
): Promise<Company> => {
  const response = await api.put<Company>(`/companies/${companyId}`, companyData);
  return response.data;
}

export const deleteCompany = async (id: string): Promise<void> => {
  await api.delete(`/companies/${id}`);
};

// Fetch all items
export const fetchItems = async (): Promise<Item[]> => {
  const response = await api.get<Item[]>('/items');
  return response.data;
};

export const fetchItemById = async (itemId: string) => {
  const response = await api.get<Company>(`/items/${itemId}`);
  return response.data
};

export const createItem = async (itemData: Item): Promise<Item> => {
  const response = await api.post<Item>('/items', itemData);
  return response.data;
};

export const updateItem = async (
  itemId: string,
  itemData: Item
): Promise<Item> => {
  const response = await api.put<Item>(`/items/${itemId}`, itemData);
  return response.data;
}

export const deleteItem = async (id: string): Promise<void> => {
  await api.delete(`/items/${id}`);
};