import React, { useEffect, useState } from "react";
import { fetchItems } from "../../services/api";
import Header from "../../components/Header";
import ItemTable from "../../components/ItemTable";
import Layout from "../../layouts/Layout";
import { Item } from "../../types/index";

const CompanyPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
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
          <ItemTable items={items} setItems={setItems} />
        )}
      </Layout>
    </>
  );
};

export default CompanyPage;
