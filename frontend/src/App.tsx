import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePages/HomePage";
import CompanyPage from "./pages/CompanyPages/CompanyPage";
import EditCompanyPage from "./pages/CompanyPages/EditCompanyPage";
import AddCompanyPage from "./pages/CompanyPages/AddCompanyPage";
import ItemPage from "./pages/ItemPages/ItemPage";
import EditItemPage from "./pages/ItemPages/EditItemPage";
import AddItemPage from "./pages/ItemPages/AddItemPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/companies" element={<CompanyPage />} />
        <Route path="/companies/:id/edit" element={<EditCompanyPage />} />
        <Route path="/companies/new" element={<AddCompanyPage />} />
        <Route path="/items" element={<ItemPage />} />
        <Route path="/items/:id/edit" element={<EditItemPage />} />
        <Route path="/items/new" element={<AddItemPage />} />

        {/* <Route path="/quotes/:id" element={<QuoteDetails />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
