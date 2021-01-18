import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Template, BannerSlider } from 'components';
import { NotifyUtils } from 'utils';

export default function LandingPage(props) {
  useEffect(() => {
    if (localStorage.getItem('total')) {
      NotifyUtils.info('Vui lòng đặt hàng trước khi thanh toán');
      localStorage.removeItem('total');
    }
  }, []);

  const { infoBanner = [], isMobile } = props;
  const title = 'Thuocsi.vn';
  const pageName = 'home';
  const DynamicWhyBuymed = dynamic(() => import('components/organisms/WhyBuymed'));
  const DynamicCommonQuestion = dynamic(() => import('components/mocules/CommonQuestion'));
  const DynamicPartners = dynamic(() => import('components/organisms/Partners'));
  const DynamicSliderComp = dynamic(() => import('components/organisms/SliderComp'));
  const DynamicMedia = dynamic(() => import('components/organisms/Media'));
  const DynamicHomeCTASection = dynamic(() => import('components/mocules/HomeCTASection'));

  return (
    <Template title={title} isMobile={isMobile} pageName={pageName}>
      <BannerSlider infoBanner={infoBanner} />
      <DynamicWhyBuymed />
      <DynamicHomeCTASection />
      <DynamicCommonQuestion />
      <DynamicPartners />
      <DynamicSliderComp />
      <DynamicMedia />
    </Template>
  );
}
