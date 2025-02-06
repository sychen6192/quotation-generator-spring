import React, { useEffect, useState } from 'react';
import { fetchQuotes } from '../../services/api';
import Header from '../../components/Header';
import { Helmet } from "react-helmet-async";
import Layout from '../../layouts/Layout';
import QuotationTable from '../../components/QuotationTable';

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

const HomePage: React.FC = () => {
  const [quotations, setQuotations] = useState<Quote[]>([]);

  useEffect(() => {
    const loadQuotes = async () => {
      try {
        const data = await fetchQuotes(); 
        setQuotations(data);
      } catch (error) {
        console.error('Failed to fetch quotes:', error);
      }
    };
    loadQuotes();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Quote Gen - Home</title>
      </Helmet>
      <Header />
      <Layout>
        <QuotationTable quotations={quotations} setQuotations={setQuotations} />
      </Layout>
    </div>
  );
};

export default HomePage;