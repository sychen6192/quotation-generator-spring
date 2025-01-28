import React, { useEffect, useState } from 'react';
import { fetchQuotes } from '../services/api';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const HomePage = () => {
  const [quotes, setQuotes] = useState([]);

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
      <ul>
        {quotes.map((quote) => (
          <li key={quote.id}>
            <Link to={`/quotes/${quote.id}`}>{quote.quoteDescription}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
