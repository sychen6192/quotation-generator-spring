import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePages/HomePage'
import CompanyPage from './pages/CompanyPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/company" element={<CompanyPage />} />
        {/* <Route path="/quotes/:id" element={<QuoteDetails />} /> */}
      </Routes>
    </Router>
  );
}

export default App;