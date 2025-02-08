import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuoteById, deleteQuote } from '../services/api';

const QuoteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const loadQuote = async () => {
      try {
        const data = await fetchQuoteById(id);
        setQuote(data);
      } catch (error) {
        console.error('Failed to fetch quote:', error);
      }
    };
    loadQuote();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteQuote(id);
      alert('Quote deleted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Failed to delete quote:', error);
    }
  };

  if (!quote) return <p>Loading...</p>;

  return (
    <div>
      <h1>{quote.quoteDescription}</h1>
      <p>Author: {quote.author}</p>
      <p>Sales: {quote.sales}</p>
      <p>Payment: {quote.payment}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default QuoteDetails;
