import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Next.js 用 `useRouter`
import { fetchCompanyById, updateCompany } from "../../services/api";
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

const EditCompanyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // 從網址獲取 companyId
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCompany = async () => {
      try {
        const data = await fetchCompanyById(id!);
        setCompany(data);
      } catch (err) {
        setError("Failed to load company.");
      } finally {
        setLoading(false);
      }
    };
    if (id) loadCompany();
  }, [id]);

  const handleSave = async () => {
    if (!company) return;
    try {
      await updateCompany(company.id, company);
      alert("Company updated successfully!");
      navigate("/companies"); // 更新後跳回公司列表
    } catch (error) {
      console.error("Error updating company:", error);
      alert("Failed to update company.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <Header />
      <Layout>
        {/* 表單容器：限制最大寬度並水平置中 */}
        <div className="max-w-md mx-auto mt-8">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Edit Company
          </h1>
          {/* 卡片式表單：白色背景、陰影、圓角與內邊距 */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="space-y-4">
              {/* Company Name */}
              <div>
                <label htmlFor="companyName" className="block mb-1 font-medium">
                  Company Name
                </label>
                <input
                  id="companyName"
                  className="border p-2 w-full rounded"
                  type="text"
                  value={company?.name || ""}
                  onChange={(e) =>
                    setCompany({ ...company!, name: e.target.value })
                  }
                />
              </div>
              {/* Tax ID */}
              <div>
                <label htmlFor="taxId" className="block mb-1 font-medium">
                  Tax ID
                </label>
                <input
                  id="taxId"
                  className="border p-2 w-full rounded"
                  type="text"
                  value={company?.taxId || ""}
                  onChange={(e) =>
                    setCompany({ ...company!, taxId: e.target.value })
                  }
                />
              </div>
              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block mb-1 font-medium">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  className="border p-2 w-full rounded"
                  type="text"
                  value={company?.phoneNumber || ""}
                  onChange={(e) =>
                    setCompany({ ...company!, phoneNumber: e.target.value })
                  }
                />
              </div>
              {/* Address */}
              <div>
                <label htmlFor="address" className="block mb-1 font-medium">
                  Address
                </label>
                <input
                  id="address"
                  className="border p-2 w-full rounded"
                  type="text"
                  value={company?.address || ""}
                  onChange={(e) =>
                    setCompany({ ...company!, address: e.target.value })
                  }
                />
              </div>
              {/* 儲存按鈕 */}
              <div className="text-right">
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
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

export default EditCompanyPage;
