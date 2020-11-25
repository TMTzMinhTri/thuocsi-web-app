import React from 'react';
import Layout from '../components/Layout';
import LandingPage from '../components/LandingPage';
import ProductClient from '../clients/ProductClient';

export async function getServerSideProps() {
  const resultMostResearched = await ProductClient.loadDataMostSearch();
  const resultFeedback = await ProductClient.loadFeedback();
  return { props: { mostResearched: resultMostResearched, feedback: resultFeedback } };
}

export default function Index({ mostResearched, feedback }) {
  const title = 'Thuocsi.vn';
  return (
    <Layout title={title}>
      <LandingPage mostResearched={mostResearched} feedback={feedback} />
    </Layout>
  );
}
