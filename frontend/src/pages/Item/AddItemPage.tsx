import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem } from "../../services/api";
import Layout from "../../layouts/Layout";
import Header from "../../components/Header";
import { Item } from "../../types/index";

const AddItemPage: React.FC = () => {
  const navigate = useNavigate();

  const [item, setItem] = useState<Item>({
    id: "", // id 由後端生成
    name: "",
    unitPrice: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};

    if (!item.name.trim()) {
      tempErrors.name = "Item Name is required.";
    }
    if (item.unitPrice <= 0) {
      tempErrors.unitPrice = "Unit Price must be greater than 0.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: name === "name" ? value : Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await createItem(item);
      alert("Item created successfully!");
      navigate("/items");
    } catch (error) {
      console.error("Error creating item:", error);
      alert("Failed to create item.");
    } finally {
      setIsSubmitting(false);
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
          <div className="bg-white shadow-lg rounded-lg p-8">
            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-4">
                {/* Item Name */}
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium">
                    Item Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="border p-2 w-full rounded"
                    type="text"
                    placeholder="Enter item name"
                    value={item.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Unit Price */}
                <div>
                  <label htmlFor="unitPrice" className="block mb-1 font-medium">
                    Unit Price
                  </label>
                  <input
                    id="unitPrice"
                    name="unitPrice"
                    className="border p-2 w-full rounded"
                    type="number"
                    placeholder="Enter unit price"
                    value={item.unitPrice}
                    onChange={handleChange}
                    min="0"
                    step="1"
                  />
                  {errors.unitPrice && (
                    <p className="text-red-500 text-sm mt-1">{errors.unitPrice}</p>
                  )}
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 bg-indigo-600 text-white rounded-lg transition-colors cursor-pointer ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
                    }`}
                  >
                    {isSubmitting ? "Saving..." : "Save Item"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AddItemPage;
