import Image from 'next/image';
import React from 'react';
import Layout from '../components/Layout';

export default function Index() {
  const title = 'Thuocsi.vn';

  return (
    <Layout title={title}>
      <Image src="/images/logo_thuocsi.svg" width="200" height="200" />
      <h1>Landing page</h1>
    </Layout>
  );
}
