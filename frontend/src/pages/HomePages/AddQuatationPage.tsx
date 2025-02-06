import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Next.js 可用 useRouter
import { createQuote } from "../../services/api";
import Layout from "../../layouts/Layout";
import Header from "../../components/Header";

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

const AddQuotationPage: React.FC = () => {
  const navigate = useNavigate();

  // 初始值設定為 null，後續透過非 null 斷言 (company!) 更新屬性
  const [quotation, setQuotation] = useState<Quote | null>(null);

  const handleSave = async () => {
    if (!quotation) return;
    try {
      await createQuote(quotation);
      alert("Quotation created successfully!");
      navigate("/quotations"); // 新增成功後跳回報價單列表
    } catch (error) {
      console.error("Error creating quotation:", error);
      alert("Failed to create quotation.");
    }
  };

  return (
    <>
      <Header />
      <Layout>
        <div className="max-w-md mx-auto mt-8">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Add Quotation
          </h1>
          {/* 卡片式表單區塊：背景、圓角、陰影與內邊距 */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="space-y-4">
              {/* 報價單描述 */}
              <input
                className="border p-2 w-full rounded"
                type="text"
                placeholder="Quotation Description"
                onChange={(e) =>
                  setQuotation({ ...quotation!, quoteDescription: e.target.value })
                }
              />
              {/* 有效日期 */}
              <input
                className="border p-2 w-full rounded"
                type="date"
                placeholder="Valid Until"
                onChange={(e) =>
                  setQuotation({ ...quotation!, validUntil: new Date(e.target.value) })
                }
              />
              {/* 作者 */}
              <input
                className="border p-2 w-full rounded"
                type="text"
                placeholder="Author"
                onChange={(e) =>
                  setQuotation({ ...quotation!, author: e.target.value })
                }
              />
              {/* Sales */}
              <input
                className="border p-2 w-full rounded"
                type="text"
                placeholder="Sales"
                onChange={(e) =>
                  setQuotation({ ...quotation!, sales: e.target.value })
                }
              />
              {/* Payment */}
              <input
                className="border p-2 w-full rounded"
                type="text"
                placeholder="Payment"
                onChange={(e) =>
                  setQuotation({ ...quotation!, payment: e.target.value })
                }
              />
              {/* 是否含稅 */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="taxIsIncluded"
                  className="mr-2"
                  onChange={(e) =>
                    setQuotation({ ...quotation!, taxIsIncluded: e.target.checked })
                  }
                />
                <label htmlFor="taxIsIncluded">Tax is included</label>
              </div>
              {/* 運送日期 */}
              <input
                className="border p-2 w-full rounded"
                type="date"
                placeholder="Shipping Date"
                onChange={(e) =>
                  setQuotation({ ...quotation!, shippingDate: new Date(e.target.value) })
                }
              />
              {/* 運送方式 */}
              <input
                className="border p-2 w-full rounded"
                type="text"
                placeholder="Shipping Method"
                onChange={(e) =>
                  setQuotation({ ...quotation!, shippingMethod: e.target.value })
                }
              />
              {/* 公司 ID */}
              <input
                className="border p-2 w-full rounded"
                type="text"
                placeholder="Company ID"
                onChange={(e) =>
                  setQuotation({ ...quotation!, companyId: e.target.value })
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

export default AddQuotationPage;
