import React from 'react';

import {
  SliderComp,
  CommonQuestion,
  Partners,
  Template,
  NavBar,
  Media,
  Footer,
  Header,
  BannerSlider,
} from '../../components';

export default function LandingPage({ mostResearched = [], feedback = [], infoBanner = [] }) {
  const title = 'Thuocsi.vn';
  return (
    <Template title={title}>
      <Header />
      <NavBar mostResearched={mostResearched} />
      <BannerSlider infoBanner={infoBanner} />
      <CommonQuestion />
      <Partners />
      <SliderComp feedback={feedback} />
      <Media />
      <Footer />
    </Template>
  );
}
