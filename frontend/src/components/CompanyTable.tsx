import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash, MoreVertical } from "lucide-react";
import { deleteCompany } from "../services/api";
import { Company } from "../types/index";

interface CompanyTableProps {
  companies: Company[];
  setCompanies: React.Dispatch<React.SetStateAction<Company[]>>;
}

const CompanyTable: React.FC<CompanyTableProps> = ({
  companies,
  setCompanies,
}) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate(); // React Router
  const handleDelete = async (companyId: string) => {
    if (!window.confirm("Are you sure you want to delete this company?"))
      return;

    try {
      await deleteCompany(companyId);
      setCompanies(companies.filter((company) => company.id !== companyId));
    } catch (error) {
      console.error("Error deleting company:", error);
      alert("Failed to delete company. Please try again.");
    }
  };

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          {/* 搜尋框 */}
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
                placeholder="Search for company"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
              onClick={() => navigate(`/companies/new`)}
            >
              + Add New Company
            </button>
          </div>

          {/* 表格 */}
          <div className="overflow-hidden">
            <table className="min-w-full rounded-xl">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-5 text-left text-sm font-semibold text-gray-900 capitalize rounded-t-xl">
                    Company
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900 capitalize">
                    Tax ID
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900 capitalize">
                    Phone Number
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900 capitalize">
                    Address
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900 capitalize rounded-t-xl">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {filteredCompanies.map((company) => (
                  <tr
                    key={company.id}
                    className="bg-white transition-all duration-500 hover:bg-gray-50"
                  >
                    <td className="p-5 whitespace-nowrap text-sm font-medium text-gray-900">
                      {company.name}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm font-medium text-gray-900">
                      {company.taxId}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm font-medium text-gray-900">
                      {company.phoneNumber}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm font-medium text-gray-900">
                      {company.address}
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded-full transition-all duration-500 cursor-pointer">
                          <Edit
                            className="w-5 h-5 text-indigo-500"
                            onClick={() =>
                              navigate(`/companies/${company.id}/edit`)
                            }
                          />
                        </button>

                        <button className="p-2 rounded-full transition-all duration-500 cursor-pointer">
                          <Trash
                            className="w-5 h-5 text-red-600"
                            onClick={() => handleDelete(company.id)}
                          />
                        </button>

                        <button className="p-2 rounded-full transition-all duration-500 cursor-pointer">
                          <MoreVertical className="w-5 h-5 text-black" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredCompanies.length === 0 && (
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

export default CompanyTable;
