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

// import { useAuth } from 'context';

export default function LandingPage(props) {
  const { mostResearched = [], data, infoBanner = [] } = props;
  const title = 'Thuocsi.vn';

  return (
    <Template title={title}>
      <Header {...props} />
      <NavBar mostResearched={mostResearched} />
      <BannerSlider infoBanner={infoBanner} />
      <WhyBuymed />
      <CommonQuestion />
      <Partners />
      <SliderComp feedback={data} />
      <Media />
    </Template>
  );
}
