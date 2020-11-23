import React from 'react';
import Image from 'next/image';
import { Footer } from '../components';

import Layout from '../components/Layout';
import LandingPage from '../components/LandingPage';

export default function Index() {
  const title = 'Thuocsi.vn';

  return (
    <Layout title={title}>
      <Image src="/images/logo_thuocsi.svg" width="200" height="200" />
      <h1>Landing page</h1>
      <Footer />
      <LandingPage />
    </Layout>
  );
}
