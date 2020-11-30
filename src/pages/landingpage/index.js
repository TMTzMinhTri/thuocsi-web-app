import React from 'react';
import Layout from '../../components/Layout';

import Header from '../../components/Header/index';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer/index';
import Media from '../../components/Media';
import { SliderComp, CommonQuestion, Partners, WhyBuymed } from '../../components';
import BannerSlider from '../../components/BannerSlider';

export default function LandingPage({ mostResearched = [], feedback = [], infoBanner = [] }) {
  const title = 'Thuocsi.vn';
  return (
    <Layout title={title}>
      <Header />
      <NavBar mostResearched={mostResearched} />
      <BannerSlider infoBanner={infoBanner} />
      <WhyBuymed />
      <CommonQuestion />
      <Partners />
      <SliderComp feedback={feedback} />
      <Media />
      <Footer />
    </Layout>
  );
}
