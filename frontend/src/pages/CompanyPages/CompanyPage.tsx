import React, { useEffect, useState } from 'react';
import { fetchCompanies, fetchQuotes } from '../../services/api';
import Header from '../../components/Header';
import CompanyTable from '../../components/CompanyTable';
import Layout from '../../layouts/Layout';
import { Helmet } from "react-helmet-async";

export interface Company {
  id: string;
  name: string;
  taxId: string;
  phoneNumber: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}


const CompanyPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCompanies = async () => {
        try {
          const data = await fetchCompanies(); 
          setCompanies(data);
        } catch (error) {
          console.error('Failed to fetch quotes:', error);
        } finally {
          setLoading(false);
        }
      };
      loadCompanies();
    }, []);
    

  return (
    <>
      <Helmet>
        <title>Quote Gen - Company</title>
      </Helmet>
      <Header />
      <Layout>
        {loading ? <p>Loading...</p> : <CompanyTable companies={companies} setCompanies={setCompanies} />}
      </Layout>
    </>
  );
};

export default CompanyPage;