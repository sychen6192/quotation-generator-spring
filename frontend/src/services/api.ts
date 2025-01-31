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
  text: string;
  author: string;
}

export interface Company {
  id: string;
  name: string;
  tax_id: string;
  phone_number: string;
  address: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateQuoteData {
  text: string;
  author: string;
}

export interface UpdateQuoteData {
  text?: string;
  author?: string;
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
export const createQuote = async (data: CreateQuoteData): Promise<Quote> => {
  const response = await api.post<Quote>('/quotes', data);
  return response.data;
};

// Update an existing quote
export const updateQuote = async (
  id: string,
  data: UpdateQuoteData
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

export const deleteCompany = async (id: string): Promise<void> => {
  await api.delete(`/companies/${id}`);
};