import React from 'react';
import Layout from '../components/Layout';
import LandingPage from '../components/LandingPage';

export default function Index() {
  const title = 'Thuocsi.vn';

  return (
    <Layout title={title}>
      <LandingPage />
    </Layout>
  );
}
