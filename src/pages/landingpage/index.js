import React from 'react';
import Layout from '../../components/Layout';

import Header from '../../components/Header/index';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer/index';
import Media from '../../components/Media';
import { SliderComp, CommonQuestion, Partners } from '../../components';

export default function LandingPage({ mostResearched = [], feedback = [] }) {
  const title = 'Thuocsi.vn';
  return (
    <Layout title={title}>
      <Header />
      <NavBar mostResearched={mostResearched} />
      <div style={{ height: '800px' }} />
      <Partners />
      <CommonQuestion />
      <SliderComp feedback={feedback} />
      <Media />
      <Footer />
    </Layout>
  );
}
