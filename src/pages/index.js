import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Footer } from '../components';

const Layout = dynamic(() => import('../components/Layout'));
// const { Footer } = dynamic(() => import('../components'));

export default function Index() {
  const title = 'Thuocsi.vn';

  return (
    <Layout title={title}>
      <Image src="/images/logo_thuocsi.svg" width="200" height="200" />
      <h1>Landing page</h1>
      <Footer />
    </Layout>
  );
}
