import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Next.js 用 `useRouter`
import { fetchItemById, updateItem } from "../../services/api";
import Layout from "../../layouts/Layout";
import Header from "../../components/Header";
import { Item } from "../../types/index";

const EditItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // 從網址獲取 itemId
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadItem = async () => {
      try {
        const data = await fetchItemById(id!);
        setItem(data);
      } catch (err) {
        setError("Failed to load item.");
      } finally {
        setLoading(false);
      }
    };
    if (id) loadItem();
  }, [id]);

  const handleSave = async () => {
    if (!item) return;
    try {
      await updateItem(item.id, item);
      alert("Item updated successfully!");
      navigate("/items"); // 更新後跳回 Item 列表
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item.");
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
          <h1 className="text-2xl font-semibold mb-6 text-center">Edit Item</h1>
          {/* 卡片式表單：白色背景、陰影、圓角與內邊距 */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="space-y-4">
              <input
                className="border p-2 w-full rounded"
                type="text"
                placeholder="Item Name"
                value={item?.name || ""}
                onChange={(e) => setItem({ ...item!, name: e.target.value })}
              />
              <input
                className="border p-2 w-full rounded"
                type="number"
                placeholder="Quantity"
                value={item?.quantity || 0}
                onChange={(e) =>
                  setItem({ ...item!, quantity: Number(e.target.value) })
                }
              />
              <input
                className="border p-2 w-full rounded"
                type="number"
                step="0.01"
                placeholder="Unit Price"
                value={item?.unitPrice || 0}
                onChange={(e) =>
                  setItem({ ...item!, unitPrice: Number(e.target.value) })
                }
              />
              {/* 包裹按鈕的 div 加上 text-right，使按鈕靠右對齊 */}
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

export default EditItemPage;
