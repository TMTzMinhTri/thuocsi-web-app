import React from 'react';

import {
  SliderComp,
  CommonQuestion,
  Partners,
  Template,
  NavBar,
  Media,
  Header,
  BannerSlider,
  WhyBuymed,
} from 'components';

import { useAuth } from 'context';

export default function LandingPage(props) {
  const { mostResearched = [], infoBanner = [] } = props;
  const title = 'Thuocsi.vn';
  // example use useAuth
  const { user } = useAuth();
  if (user) {
    console.log('USer : ', user);
  }
  return (
    <Template title={title}>
      <Header />
      <NavBar mostResearched={mostResearched} />
      <BannerSlider infoBanner={infoBanner} />
      <WhyBuymed />
      <CommonQuestion />
      <Partners />
      <SliderComp />
      <Media />
    </Template>
  );
}
