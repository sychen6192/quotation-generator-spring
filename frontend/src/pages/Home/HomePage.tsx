import React, { useEffect, useState } from 'react';
import { fetchQuotes } from '../../services/api';
import Header from '../../components/Header';
import { Helmet } from "react-helmet-async";
import Layout from '../../layouts/Layout';
import QuoteTable from '../../components/QuoteTable';
import { Quote, Company } from "../../types/index";

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
      <Helmet>
        <title>Quote Gen - Home</title>
      </Helmet>
      <Header />
      <Layout>
        <QuoteTable quotes={quotes} setQuotes={setQuotes} />
      </Layout>
    </div>
  );
};

export default HomePage;