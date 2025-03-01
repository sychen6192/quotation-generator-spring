import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuote } from "../../services/api";
import Layout from "../../layouts/Layout";
import Header from "../../components/Header";
import { Trash, Plus } from "lucide-react";
import { Quote, Company, Item, QuoteItem } from "../../types/index";
import { fetchCompanies, fetchItems } from "../../services/api";
import { SHIPPING_METHOD, SALES, AUTHORS, PAYMENT } from "../../constant";

const AddQuotePage: React.FC = () => {
  const navigate = useNavigate();

  const [quote, setQuote] = useState<Quote>({
    validUntil: new Date(),
    author: AUTHORS[0]?.value || "",
    sales: SALES[0]?.value || "",
    payment: PAYMENT[0]?.value || "",
    taxIsIncluded: false,
    shippingDate: new Date(),
    shippingMethod: SHIPPING_METHOD[0]?.value || "",
    quoteDescription: "",
    // 根據 Quote 型別補上其他必要的屬性
  });
  const [companies, setCompanies] = useState<Company[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const [loading, setLoading] = useState(true);

  // 動態品項表格的 state
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);

  const handleSave = async () => {
    if (!quote) return;
    try {
      console.log(quote);
      await createQuote(quote);
      alert("quote created successfully!");
      navigate("/quotes");
    } catch (error) {
      console.error("Error creating quote:", error);
      alert("Failed to create quote.");
    }
  };

  useEffect(() => {
    const fetchCompanyOptions = async () => {
      try {
        const data: Company[] = await fetchCompanies();
        setCompanies(data);
      } catch (error) {
        console.log("Failed to fetch companies:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchItemOptions = async () => {
      try {
        const data: Item[] = await fetchItems();
        setItems(data);
      } catch (error) {
        console.log("Failed to fetch items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyOptions();
    fetchItemOptions();
  }, []);

  // 處理動態品項表格的函數
  const handleAddItem = () => {
    setQuoteItems([...quoteItems, { name: "", unitPrice: 0, quantity: 1 }]);
  };

  const handleRemoveItem = (index: number) => {
    setQuoteItems(quoteItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (
    index: number,
    field: keyof QuoteItem,
    value: any
  ) => {
    setQuoteItems((prevItems) =>
      prevItems.map((itm, i) =>
        i === index ? { ...itm, [field]: value } : itm
      )
    );
  };

  return (
    <>
      <Header />
      <Layout>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="max-w-3xl mx-auto mt-8">
            <h1 className="text-2xl font-semibold mb-6 text-center">
              Add quote
            </h1>
            {/* 表單卡片 */}
            <div className="bg-white shadow-lg rounded-lg p-8">
              <div className="space-y-4">
                {/* 公司選擇 */}
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    Company
                  </label>
                  <select
                    value={selectedCompany}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      const companyId = e.target.value;
                      setQuote((prev) => ({
                        ...prev!,
                        company: { id: Number(companyId) },
                      }));
                    }}
                    className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  >
                    <option value="" disabled>
                      請選擇一間公司
                    </option>
                    {companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name} ({company.taxId})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 有效日期 */}
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    Valid Until
                  </label>
                  <input
                    className="border p-2 w-full rounded"
                    type="date"
                    placeholder="Valid Until"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    onChange={(e) =>
                      setQuote({
                        ...quote!,
                        validUntil: new Date(e.target.value),
                      })
                    }
                  />
                </div>

                {/* 作者 */}
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    Author
                  </label>
                  <select
                    value={quote?.author || ""}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setQuote({ ...quote!, author: e.target.value })
                    }
                    className="border p-2 w-full rounded"
                  >
                    {AUTHORS.map((author) => (
                      <option key={author.value} value={author.value}>
                        {author.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sales */}
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    Sales
                  </label>
                  <select
                    value={quote?.sales || ""}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setQuote({ ...quote!, sales: e.target.value })
                    }
                    className="border p-2 w-full rounded"
                  >
                    {SALES.map((sale) => (
                      <option key={sale.value} value={sale.value}>
                        {sale.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Payment */}
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    Payment
                  </label>
                  <select
                    value={quote?.payment || ""}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setQuote({ ...quote!, payment: e.target.value })
                    }
                    className="border p-2 w-full rounded"
                  >
                    {PAYMENT.map((payment) => (
                      <option key={payment.value} value={payment.value}>
                        {payment.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Items */}
                <div>
                  <table className="w-full mb-4 border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th
                          className="px-2 py-1 text-left"
                          style={{ width: "60%" }}
                        >
                          Item
                        </th>
                        <th
                          className="px-2 py-1 text-left"
                          style={{ width: "30%" }}
                        >
                          Unit price
                        </th>
                        <th
                          className="px-2 py-1 text-left"
                          style={{ width: "5%" }}
                        >
                          Qty.
                        </th>
                        <th
                          className="px-2 py-1 text-center"
                          style={{ width: "5%" }}
                        >
                          <button type="button" onClick={handleAddItem}>
                            <Plus className="w-5 h-5 text-green-600" />
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {quoteItems.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-2 py-1" style={{ width: "60%" }}>
                            <select
                              value={item.name}
                              onChange={(e) => {
                                const selectedItemName = e.target.value;
                                handleItemChange(
                                  index,
                                  "name",
                                  selectedItemName
                                );
                                const selectedOption = items.find(
                                  (item) => item.name === selectedItemName
                                );

                                if (selectedOption) {
                                  handleItemChange(
                                    index,
                                    "unitPrice",
                                    selectedOption.unitPrice
                                  );
                                } else {
                                  handleItemChange(index, "unitPrice", 0);
                                }
                              }}
                              className="border p-1 w-full rounded"
                            >
                              <option value="">請選擇品項</option>
                              {items.map((option) => (
                                <option key={option.name} value={option.name}>
                                  {option.name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-2 py-1" style={{ width: "30%" }}>
                            <input
                              type="text"
                              value={item.unitPrice}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "unitPrice",
                                  Number(e.target.value)
                                )
                              }
                              className="border p-1 w-full rounded"
                              placeholder="單價"
                            />
                          </td>
                          <td className="px-2 py-1" style={{ width: "5%" }}>
                            <input
                              type="text"
                              value={item.quantity}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "quantity",
                                  Number(e.target.value)
                                )
                              }
                              className="border p-1 w-full rounded"
                              placeholder="數量"
                            />
                          </td>
                          <td
                            className="px-2 py-1 text-center"
                            style={{ width: "5%" }}
                          >
                            <button
                              type="button"
                              className="p-2 rounded-full transition-all duration-500 cursor-pointer"
                              onClick={() => handleRemoveItem(index)}
                            >
                              <Trash className="w-5 h-5 text-red-600" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 是否含稅 */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="taxIsIncluded"
                    className="mr-2"
                    onChange={(e) =>
                      setQuote({ ...quote!, taxIsIncluded: e.target.checked })
                    }
                  />
                  <label htmlFor="taxIsIncluded" className="text-gray-700">
                    Tax is included
                  </label>
                </div>

                {/* 運送日期 */}
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    Shipping Date
                  </label>
                  <input
                    className="border p-2 w-full rounded"
                    type="date"
                    placeholder="Shipping Date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    onChange={(e) =>
                      setQuote({
                        ...quote!,
                        shippingDate: new Date(e.target.value),
                      })
                    }
                  />
                </div>

                {/* 運送方式 */}
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    Shipping
                  </label>
                  <select
                    value={quote?.shippingMethod || ""}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setQuote({ ...quote!, shippingMethod: e.target.value })
                    }
                    className="border p-2 w-full rounded"
                  >
                    {SHIPPING_METHOD.map((method) => (
                      <option key={method.value} value={method.value}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* quote Description */}
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    Remark
                  </label>
                  <textarea
                    className="border p-2 w-full rounded"
                    placeholder="Remark"
                    rows={4}
                    onChange={(e) =>
                      setQuote({ ...quote!, quoteDescription: e.target.value })
                    }
                  />
                </div>

                {/* 儲存按鈕 */}
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
        )}
      </Layout>
    </>
  );
};

export default AddQuotePage;
