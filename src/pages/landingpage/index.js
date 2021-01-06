import React from 'react';
import dynamic from 'next/dynamic';
import { Template, NavBar, Header, MobileHeader, BannerSlider } from 'components';

export default function LandingPage(props) {
  const { mostResearched = [], infoBanner = [], isMobile } = props;
  const title = 'Thuocsi.vn';
  const pageName = 'home';

  const DynamicWhyBuymed = dynamic(() => import('components/organisms/WhyBuymed'));
  const DynamicCommonQuestion = dynamic(() => import('components/mocules/CommonQuestion'));
  const DynamicPartners = dynamic(() => import('components/organisms/Partners'));
  const DynamicSliderComp = dynamic(() => import('components/organisms/SliderComp'));
  const DynamicMedia = dynamic(() => import('components/organisms/Media'));

  return (
    <Template title={title} isMobile={isMobile}>
      {isMobile ? <MobileHeader {...props} /> : <Header {...props} />}
      {!isMobile && <NavBar mostResearched={mostResearched} pageName={pageName} />}
      <BannerSlider infoBanner={infoBanner} />
      <DynamicWhyBuymed />
      <DynamicCommonQuestion />
      <DynamicPartners />
      <DynamicSliderComp />
      <DynamicMedia />
    </Template>
  );
}
