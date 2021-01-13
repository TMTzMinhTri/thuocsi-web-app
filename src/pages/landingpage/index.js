import React from 'react';
import dynamic from 'next/dynamic';
import { Template, BannerSlider, HomeCTASection } from 'components';

export default function LandingPage(props) {
  const { infoBanner = [], isMobile } = props;
  const title = 'Thuocsi.vn';
  const pageName = 'home';
  const DynamicWhyBuymed = dynamic(() => import('components/organisms/WhyBuymed'));
  const DynamicCommonQuestion = dynamic(() => import('components/mocules/CommonQuestion'));
  const DynamicPartners = dynamic(() => import('components/organisms/Partners'));
  const DynamicSliderComp = dynamic(() => import('components/organisms/SliderComp'));
  const DynamicMedia = dynamic(() => import('components/organisms/Media'));

  return (
    <Template title={title} isMobile={isMobile} pageName={pageName}>
      <BannerSlider infoBanner={infoBanner} />
      <DynamicWhyBuymed />
      <HomeCTASection />
      <DynamicCommonQuestion />
      <DynamicPartners />
      <DynamicSliderComp />
      <DynamicMedia />
    </Template>
  );
}
