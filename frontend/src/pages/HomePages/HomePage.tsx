import React, { useEffect, useState } from 'react';
import { fetchQuotes } from '../../services/api';
import Header from '../../components/Header';
import CompanyTable from '../../components/CompanyTable';

interface Quote {
  id: string;
  quoteDescription: string;
}

const HomePage: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const loadQuotes = async () => {
      try {
        const data = await fetchQuotes(); 
        setQuotes(data);
      } catch (error) {
        console.error('Failed to fetch quotes:', error);
      }
    };
    loadQuotes();
  }, []);

  return (
    <div>
      <Header />
      <h1>Quotes</h1>
      <CompanyTable />
    </div>
  );
};

export default HomePage;