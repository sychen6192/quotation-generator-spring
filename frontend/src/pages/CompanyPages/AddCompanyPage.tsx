import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Next.js 用 `useRouter`
import { createCompany } from "../../services/api";
import Layout from "../../layouts/Layout";
import Header from "../../components/Header";
export interface Company {
  id: string;
  name: string;
  taxId: string;
  phoneNumber: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

const AddCompanyPage: React.FC = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);

  const handleSave = async () => {
    if (!company) return;
    try {
      await createCompany(company);
      alert("Company create successfully!");
      navigate("/companies"); // 更新後跳回公司列表
    } catch (error) {
      console.error("Error creating company:", error);
      alert("Failed to create company.");
    }
  };

  return (
    <>
      <Header />
      <Layout>
        <div className="max-w-md mx-auto mt-8">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Add Company
          </h1>
          {/* 卡片式表單區塊：背景、圓角、陰影與內邊距 */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="space-y-4">
              <input
                className="border p-2 w-full rounded"
                type="text"
                placeholder="Company Name"
                onChange={(e) =>
                  setCompany({ ...company!, name: e.target.value })
                }
              />
              <input
                className="border p-2 w-full rounded"
                type="text"
                placeholder="Tax ID"
                onChange={(e) =>
                  setCompany({ ...company!, taxId: e.target.value })
                }
              />
              <input
                className="border p-2 w-full rounded"
                type="text"
                placeholder="Phone Number"
                onChange={(e) =>
                  setCompany({ ...company!, phoneNumber: e.target.value })
                }
              />
              <input
                className="border p-2 w-full rounded"
                type="text"
                placeholder="Address"
                onChange={(e) =>
                  setCompany({ ...company!, address: e.target.value })
                }
              />
              <div className="text-right">
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AddCompanyPage;
