import React from 'react';
import Layout from '../components/Layout';
import LandingPage from '../components/LandingPage';
import ProductClient from '../clients/ProductClient';

export async function getServerSideProps() {
  const resultMostResearched = await ProductClient.loadDataMostSearch();
  return { props: { mostResearched: resultMostResearched } };
}

export default function Index({ mostResearched }) {
  const title = 'Thuocsi.vn';
  return (
    <Layout title={title}>
      <LandingPage mostResearched={mostResearched} />
    </Layout>
  );
}
