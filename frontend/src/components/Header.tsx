import { useState } from "react";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <header className="bg-white shadow-lg py-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <a href="/" className="flex items-center text-primary hover:text-secondary">
          <span className="text-2xl font-bold">Quote Generator</span>
        </a>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-800 hover:text-primary focus:outline-none transition-colors duration-300"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><a href="/" className="hover:text-primary transition-colors duration-300">Home</a></li>
            <li><a href="/companies" className="hover:text-primary transition-colors duration-300">Company List</a></li>
            <li><a href="/items" className="hover:text-primary transition-colors duration-300">Item List</a></li>

          </ul>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-gray-50 border-t border-gray-200 transition-height duration-300 ease-in-out">
          <ul className="px-4 py-2">
            <li><a href="/" className="block py-2 hover:text-primary">Home</a></li>
            <li><a href="/companies" className="block py-2 hover:text-primary">Company List</a></li>
            <li><a href="/items" className="block py-2 hover:text-primary">Item List</a></li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;