import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import CompanyPage from "./pages/Company/CompanyPage";
import EditCompanyPage from "./pages/Company/EditCompanyPage";
import AddCompanyPage from "./pages/Company/AddCompanyPage";
import ItemPage from "./pages/Item/ItemPage";
import EditItemPage from "./pages/Item/EditItemPage";
import AddItemPage from "./pages/Item/AddItemPage";
import AddQuotePage from "./pages/Quote/AddQuotePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quotes/new" element={<AddQuotePage />} />
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
