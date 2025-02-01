import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem } from "../../services/api";
import Layout from "../../layouts/Layout";
import Header from "../../components/Header";

export interface Item {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

const AddItemPage: React.FC = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState<Item>({
    id: "", // id 由後端生成
    name: "",
    quantity: 0,
    unitPrice: 0,
  });

  const handleSave = async () => {
    if (!item.name) {
      alert("Item Name is required.");
      return;
    }

    try {
      await createItem(item);
      alert("Item created successfully!");
      navigate("/items"); // 更新後跳回 Item 列表
    } catch (error) {
      console.error("Error creating item:", error);
      alert("Failed to create item.");
    }
  };

  return (
    <>
      <Header />
      <Layout>
        <div className="max-w-md mx-auto mt-8">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Add New Item
          </h1>
          {/* 卡片式表單區塊：背景、圓角、陰影與內邊距 */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="space-y-4">
              <input
                className="border p-2 w-full rounded"
                type="text"
                placeholder="Item Name"
                value={item.name}
                onChange={(e) => setItem({ ...item, name: e.target.value })}
              />
              <input
                className="border p-2 w-full rounded"
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) =>
                  setItem({ ...item, quantity: Number(e.target.value) })
                }
              />
              <input
                className="border p-2 w-full rounded"
                type="number"
                step="0.01"
                placeholder="Unit Price"
                value={item.unitPrice}
                onChange={(e) =>
                  setItem({ ...item, unitPrice: Number(e.target.value) })
                }
              />
              <div className="text-right">
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
                  onClick={handleSave}
                >
                  Save Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AddItemPage;
