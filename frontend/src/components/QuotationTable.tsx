import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash, MoreVertical } from "lucide-react";
import { deleteQuote } from "../services/api";

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

interface QuotationTableProps {
  quotations: Quote[];
  setQuotations: React.Dispatch<React.SetStateAction<Quote[]>>;
}

const QuotationTable: React.FC<QuotationTableProps> = ({
  quotations,
  setQuotations,
}) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleDelete = async (quoteId: string) => {
    if (!window.confirm("Are you sure you want to delete this quotation?"))
      return;

    try {
      await deleteQuote(quoteId);
      setQuotations(quotations.filter((quote) => quote.id !== quoteId));
    } catch (error) {
      console.error("Error deleting quotation:", error);
      alert("Failed to delete quotation. Please try again.");
    }
  };

  const filteredQuotations = quotations.filter((quote) =>
    quote.quoteDescription.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          {/* 搜尋與新增按鈕 */}
          <div className="flex items-center mb-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 17.5L15.4167 15.4167M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C11.0005 15.8333 12.6614 15.0929 13.8667 13.8947C15.0814 12.6872 15.8333 11.0147 15.8333 9.16667Z"
                    stroke="#9CA3AF"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="default-search"
                className="block w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                placeholder="Search for quotation"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer ml-4"
              onClick={() => navigate(`/quotations/new`)}
            >
              + Add New Quotation
            </button>
          </div>

          {/* 表格 */}
          <div className="overflow-hidden">
            <table className="min-w-full rounded-xl">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-5 text-left text-sm font-semibold text-gray-900 capitalize rounded-tl-xl">
                    Quotation
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900 capitalize">
                    Valid Until
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900 capitalize">
                    Author
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900 capitalize">
                    Company
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900 capitalize rounded-tr-xl">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {filteredQuotations.map((quote) => (
                  <tr
                    key={quote.id}
                    className="bg-white transition-all duration-500 hover:bg-gray-50"
                  >
                    <td className="p-5 whitespace-nowrap text-sm font-medium text-gray-900">
                      {quote.quoteDescription}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm font-medium text-gray-900">
                      {quote.validUntil}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm font-medium text-gray-900">
                      {quote.author}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm font-medium text-gray-900">
                      {quote.company?.name}
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded-full transition-all duration-500 cursor-pointer">
                          <Edit
                            className="w-5 h-5 text-indigo-500"
                            onClick={() =>
                              navigate(`/quotations/${quote.id}/edit`)
                            }
                          />
                        </button>
                        <button className="p-2 rounded-full transition-all duration-500 cursor-pointer">
                          <Trash
                            className="w-5 h-5 text-red-600"
                            onClick={() => handleDelete(quote.id)}
                          />
                        </button>
                        <button className="p-2 rounded-full transition-all duration-500 cursor-pointer">
                          <MoreVertical className="w-5 h-5 text-black" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredQuotations.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center p-5 text-gray-500">
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationTable;
