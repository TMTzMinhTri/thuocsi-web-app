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
  const { mostResearched = [], feedback = [], infoBanner = [] } = props;
  const title = 'Thuocsi.vn';
  // example use useAuth
  const { user } = useAuth();
  if (user) {
    // eslint-disable-next-line no-console
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
      <SliderComp feedback={feedback} />
      <Media />
    </Template>
  );
}
