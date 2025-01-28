import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchQuotes = async () => {
  const response = await api.get('/quotes');
  return response.data;
};

export const fetchQuoteById = async (id) => {
  const response = await api.get(`/quotes/${id}`);
  return response.data;
};

export const createQuote = async (data) => {
  const response = await api.post('/quotes', data);
  return response.data;
};

export const updateQuote = async (id, data) => {
  const response = await api.put(`/quotes/${id}`, data);
  return response.data;
};

export const deleteQuote = async (id) => {
  const response = await api.delete(`/quotes/${id}`);
  return response.data;
};
