import React, { useEffect, useState } from "react";
import { fetchItems } from "../../services/api";
import Header from "../../components/Header";
import ItemTable from "../../components/ItemTable";
import Layout from "../../layouts/Layout";

export interface Item {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

const CompanyPage: React.FC = () => {
  const [Items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  return (
    <>
      <Header />
      <Layout>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ItemTable items={Items} setItems={setItems} />
        )}
      </Layout>
    </>
  );
};

export default CompanyPage;
