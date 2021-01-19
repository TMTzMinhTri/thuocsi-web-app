import React from 'react';
import dynamic from 'next/dynamic';
import Template from 'components/layout/Template';

export default function LandingPage(props) {
  const { infoBanner = [], isMobile, isAuthenticated } = props;
  const title = 'Thuocsi.vn';
  const pageName = 'home';
  const DynamicWhyBuymed = dynamic(() => import('components/organisms/WhyBuymed'));
  const DynamicCommonQuestion = dynamic(() => import('components/mocules/CommonQuestion'));
  const DynamicPartners = dynamic(() => import('components/organisms/Partners'));
  const DynamicSliderComp = dynamic(() => import('components/organisms/SliderComp'));
  const DynamicMedia = dynamic(() => import('components/organisms/Media'));
  const DynamicHomeCTASection = dynamic(() => import('components/mocules/HomeCTASection'));
  const DynamicBannerSlider = dynamic(() => import('components/organisms/BannerSlider'));

  return (
    <Template title={title} isMobile={isMobile} pageName={pageName}>
      <DynamicBannerSlider infoBanner={infoBanner} />
      <DynamicWhyBuymed />
      {!isAuthenticated ? <DynamicHomeCTASection /> : <></>}
      <DynamicCommonQuestion />
      <DynamicPartners />
      <DynamicSliderComp />
      <DynamicMedia />
    </Template>
  );
}
