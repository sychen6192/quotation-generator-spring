import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">My Website</h1>
        <nav className="space-x-4">
          <a href="#" className="hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">About</a>
          <a href="#" className="hover:text-gray-300">Services</a>
          <a href="#" className="hover:text-gray-300">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
